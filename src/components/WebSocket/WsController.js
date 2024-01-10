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
    const [isConnected, setConnection] = useState(null);
    const [needToReconnect, setNeedToReconnect] = useState(null);

    const ws = useRef(null);
    const reconnect = useRef(null);
    const timeout = useRef(null);

    const staticSubs = useRef(subs);

    useEffect(() => {
        if(auth.isAuth === true && ws.current === null) {
            connect();
        } else if(auth.isAuth === false) {
            clearTimeout(timeout.current);
            disconnect();
        }
    }, [auth]);


    useEffect(() => {
        if(isConnected === false && auth.isAuth === true && reconnect.current === true) {
            reconnect.current = false;
            timeout.current = setTimeout(() => {
                connect();
            }, timeoutDelay);
        } else if(auth.isAuth === false) {
            reconnect.current = false;
        }
    }, [isConnected, auth]);

    const connect = () => {
        setConnection(null);
        clearTimeout(timeout.current);

        const uriWebSocket = URI_WS + ':' + WS_PORT;
        ws.current = new WebSocket(uriWebSocket);

        ws.current.onopen = handleOnOpen;
        ws.current.onmessage = handleOnMessage;
        ws.current.onclose = handleOnClose;
    }

    const handleOnOpen = () => {
        setConnection(true);
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
        clearTimeout(timeout.current);

        // set connection state in store
        dispatch(setConnectionState(STATE.DISCONNECTED));

        reconnect.current = true;
        setConnection(false);
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
