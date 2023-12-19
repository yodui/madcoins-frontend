import react, { useState, useRef, useEffect } from 'react';

import { connect, useDispatch, useSelector } from 'react-redux';
import * as STATE from '../../constants/connection';

import { URI_WS, WS_PORT, BACKEND_HOST, BACKEND_PORT, API_URI_REFRESH_TOKEN } from '../../constants/common';
import * as SUB from '../../constants/subscribes';

import { setConnectionState } from '../../store/actions/WsActions';
import { signIn } from '../../store/actions/AuthActions';
import { updateTradeStat, insertTrade } from '../../store/actions/DataActions';

import { uFetch } from '../../functions/uFetch';


// reconnection timeout, ms
const timeoutDelay = 4000;

const WsController = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const connectionState = useSelector(state => state.ws.connectionState);
    const subs = useSelector(state => state.ws.subs);

    const [isInitialSubs, setInitialSubs] = useState(true);
    const [isConnected, setConnection] = useState(false);
    const [isReconnection, setReconnection] = useState(false);

    const ws = useRef(null);
    const timeout = useRef(null);

    const staticSubs = useRef(subs);

    useEffect(() => {
        console.log('Change auth...');
        console.log(auth.isAuth, isConnected, isReconnection);
        if(auth.isAuth === true && isConnected === false && isReconnection === false) {
            connect();
        } else if(auth.isAuth === false && isConnected === true) {
            disconnect();
        } else if(auth.isAuth === false) {
            // reset reconnection state
            setReconnection(false);
        }
    }, [auth]);

    useEffect(() => {
        if(isConnected === false && auth.isAuth === true && isReconnection === true) {
            timeout.current = setTimeout(() => {
                connect();
            }, timeoutDelay);
        } else if(auth.isAuth === false && isConnected === false) {
            // reset reconnection state
            setReconnection(false);
        }
    }, [auth, isReconnection])


    const connect = () => {

        console.log('Connection...', auth.isAuth, isReconnection, isConnected, ws.current);

        (ws.current) && ws.current.close();
        (timeout.current) && clearTimeout(timeout.current);
        setReconnection(false);

        const uriWebSocket = URI_WS + ':' + WS_PORT;
        ws.current = new WebSocket(uriWebSocket);

        ws.current.onopen = handleOnOpen;
        ws.current.onmessage = handleOnMessage;
        ws.current.onclose = handleOnClose;
    }

    const handleOnOpen = () => {
        dispatch(setConnectionState(STATE.NEED_AUTH));
        setConnection(true);
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
                // set connection active
                dispatch(setConnectionState(STATE.ACTIVE));
                break;

            case STATE.DATA:
                // data
                dataProcessing(msg.subscribe, JSON.parse(msg.payload));
                break;

        }
    }

    const handleOnClose = () => {

        console.log('Close connection...');
        // set connection state in store
        dispatch(setConnectionState(STATE.DISCONNECTED));

        // set disconnected state in component state
        setConnection(false);
        console.log('set reconnection TRUE');
        setReconnection(true);
        setInitialSubs(true);

        ws.current = null;
    }

    useEffect(() => {
        return () => {
            disconnect();
        }
    }, []);


    const authenticate = () => {
        // need to send authentication data
        console.log('-> Send authenticate token... state: ', STATE.AUTH);
        ws.current.send( JSON.stringify({ state: STATE.AUTH, accessToken: localStorage.accessToken }) );
    }

    const dataProcessing = (subscribe, payload) => {
        // processing recieved data
        switch(subscribe) {
            case SUB.TRADE_STAT:
                dispatch(updateTradeStat(payload));
                break;
            case SUB.TRADE_INSERT:
                dispatch(insertTrade(payload));
                break;
        }
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
        clearTimeout(timeout.current);

        console.log('[disconnect] isAuth = ', auth.isAuth);
        setReconnection(false);

        (ws.current) && ws.current.close();
    }

    useEffect(() => {
        if(connectionState === STATE.ACTIVE && isInitialSubs === true) {
            // send initial subscribes
            subscribe();
            setInitialSubs(false);
        }
    }, [subs, connectionState]);

    useEffect(() => {
        staticSubs.current = subs;
        if(connectionState === STATE.ACTIVE) subscribe();
    }, [subs]);

}

export default WsController;
