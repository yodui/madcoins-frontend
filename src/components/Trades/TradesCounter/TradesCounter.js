import React, { useState, useEffect, useRef } from 'react';
import './TradesCounter.css';

const TradesCounter = () => {

    const [totalTrades, setTotalTrades] = useState(0);
    const [data, setData] = useState();
    const [status, setStatus] = useState();

    const API_TRADES_COUNT = 'http://localhost:3000/api/trades/count';

    const WS_TRADES_FEED_COUNTER = 'ws://localhost:3037';

    const ws = useRef(null);

    useEffect(() => {
        subscribeToTradesCounter()
    }, []);

    const subscribeToTradesCounter = () => {
        console.log('Subscribe to...');
        ws.current = new WebSocket(WS_TRADES_FEED_COUNTER);
        ws.current.onopen = () => setStatus("Connection opened");
        ws.current.onclose = (e) => {
            if(e.wasClean) {
                setStatus("Connection clean closed");
            } else {
                setStatus("Connection interrupted");
            }
        };
        ws.current.onerror = (e) => {
            console.log(`Socket error: ${e.message}`);
        };

        ws.current.onmessage = e => {
            const message = JSON.parse(e.data);
            console.log(message);
            //setData(message);
        }
    }

    const fetchTradesCount = async () => {
        const response = await fetch(API_TRADES_COUNT);
        const json = await response.json();
        setTotalTrades(json.totalTrades);
    }

    return (
        <div className='tradesCounter'>Data: {data}</div>
    )
}

export default TradesCounter;
