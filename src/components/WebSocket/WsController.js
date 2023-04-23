import react, { useState, useRef, useEffect } from 'react';

import { connect, useDispatch, useSelector } from 'react-redux';
import * as STATE from '../../constants/connection';
import { URI_WS, WS_PORT, BACKEND_HOST, BACKEND_PORT, API_URI_REFRESH_TOKEN } from '../../constants/common';

import { setConnectionState } from '../../store/actions/WsActions';
import { signIn } from '../../store/actions/AuthActions';

import { uFetch } from '../../functions/uFetch';


// reconnection timeout, ms
const timeoutDelay = 4000;

const WsController = () => {

    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const connectionState = useSelector(state => state.ws.connectionState);
    const subs = useSelector(state => state.ws.subs);

    const [isInitialSubs, setInitialSubs] = useState(true);
    const [reconnection, setReconnection] = useState(false);

    const ws = useRef(null);
    const timeout = useRef(null);

    useEffect(() => {
        if(reconnection === false && auth.isAuth === true) {
            connect();
        }
    }, [reconnection, auth]);

    const connect = () => {

        console.log('Connection...');
        (ws.current) && ws.current.close();
        (timeout.current) && clearTimeout(timeout.current);

        const uriWebSocket = URI_WS + ':' + WS_PORT;
        ws.current = new WebSocket(uriWebSocket);

        ws.current.onopen = handleOnOpen;
        ws.current.onmessage = handleOnMessage;
        ws.current.onclose = handleOnClose;
    }

    const handleOnOpen = () => {
        dispatch(setConnectionState(STATE.NEED_AUTH));
        console.log('WebSocket connected');
    }

    const handleOnMessage = (e) => {
        const msg = JSON.parse(e.data);
        console.log('\t<-',msg);
        // processing state
        switch(msg.state) {
            case STATE.NEED_AUTH:
                // need to authenticate
                authenticate();
                break;

            case STATE.WRONG_ACCESS_TOKEN:
                // access token deprecated/wrong
                dispatch(setConnectionState(STATE.WRONG_ACCESS_TOKEN));
                refreshAccessToken();
                break;

            case STATE.ACTIVE:
                dispatch(setConnectionState(STATE.ACTIVE));
                break;

        }
    }

    const handleOnClose = () => {
        // set state in store
        dispatch(setConnectionState(STATE.DISCONNECTED));
        console.log('Connection closed');
        if(reconnection === false) {
            setReconnection(true);
            setInitialSubs(true);
            timeout.current = setTimeout(() => setReconnection(false), timeoutDelay);
        }
    }

    useEffect(() => {
        return () => {
            disconnect();
        }
    }, []);

    useEffect(() => {
        console.log('Change auth:', auth.isAuth);
        if(auth.isAuth === true) {
            connect();
        } else {
            disconnect();
        }
    }, [auth]);

    const authenticate = () => {
        // need to send authentication data
        console.log('-> Send authenticate token...');
        ws.current.send( JSON.stringify({ state: STATE.AUTH, accessToken: localStorage.accessToken }) );
    }

    const refreshAccessToken = async () => {

        console.log('Refresh access token...');
        // send request to
        const uriRefreshToken = BACKEND_HOST + ':' + BACKEND_PORT + API_URI_REFRESH_TOKEN;
        console.log(uriRefreshToken);

        const requestParams = {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'include'
        };

        const raw = await fetch(uriRefreshToken, requestParams);
        const response = await raw.json();
        console.log('REF.WS:',response);

        signIn(response.user, response.accessToken);
        // resend token
        authenticate();
    }

    const subscribe = async () => {
        // send subscriptions to data set
        dispatch(setConnectionState(STATE.SUBS));
        console.log('-> Send subs:', [...subs.keys()]);
        await ws.current.send( JSON.stringify({ state: STATE.SUBS, subs: [...subs.keys()]}) );
    }

    const disconnect = () => {
        dispatch(setConnectionState(STATE.DISCONNECTED));
        clearTimeout(timeout.current);
        setReconnection(false);
        (ws.current) && ws.current.close();
    }

    console.log('Render WS Controller...');

    useEffect(() => {
        if(connectionState === STATE.ACTIVE && isInitialSubs === true) {
            // send initial subscribes
            subscribe();
            setInitialSubs(false);
        }
    }, [subs, connectionState]);

    useEffect(() => {
        if(connectionState === STATE.ACTIVE) subscribe();
    }, [subs])

}

export default WsController;
