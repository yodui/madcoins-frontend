import React from 'react';
import Box from '../Containers/Box/Box';

import TradesList from '../Trades/TradesList/TradesList';
import TradesCounter from '../Trades/TradesCounter/TradesCounter';

const TradesPage = () => {
    return (
        <Box>
            <h1>Trades</h1>
            <TradesList />
        </Box>
    )
}

export default TradesPage;
