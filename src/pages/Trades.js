import React from 'react';
import Box from '../components/Containers/Box/Box';

import TradesList from '../components/Trades/TradesList/TradesList';
import TradesCounter from '../components/Trades/TradesCounter/TradesCounter';

const TradesPage = () => {
    return (
        <Box>
            <h1>Trades</h1>
            <TradesList />
        </Box>
    )
}

export default TradesPage;
