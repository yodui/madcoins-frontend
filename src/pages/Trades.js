import React from 'react';
import Box from '../components/Containers/Box/Box';
import './Trades.css';

import TradesList from '../components/Trades/TradesList/TradesList';
import TradesCounter from '../components/Trades/TradesCounter/TradesCounter';

const TradesPage = () => {
    return (
        <Box>
            <div className='pageHeader'>
                <h1>Trades</h1>
                <div className='stat'>
                    <TradesCounter />
                </div>
            </div>
            <TradesList />
        </Box>
    )
}

export default TradesPage;
