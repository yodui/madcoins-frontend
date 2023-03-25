import React, { useRef, useEffect } from 'react';

import { URI_WS, WS_PORT } from '../constants/common';

const useWebsocket = () => {

    const ws = useRef(null);
    const reconnectionTimer = useRef();

    const connect = () => {

        const uriWebSocket = URI_WS + ':' + WS_PORT;

        ws.current = new WebSocket(uriWebSocket);
        ws.current.onopen = () => {
            clearTimeout(reconnectionTimer.current);
            console.log('WebSocket opened');
            
        }

        ws.current.onmessage = (e) => {
            const message = JSON.parse(e.data);
            console.log(message);
        }

        ws.current.onclose = () => {
            console.log('WebSocket closed. Trying to reconnect after 3 sec...');
            reconnectionTimer.current = setTimeout(connect, 3000);
        }
    }

    useEffect(() => {

        connect();

        return () => {
            if (ws.current.readyState === 1) {
                ws.current.close();
            }
        }
    }, []);

    return ws.current;
}

export default useWebsocket;
