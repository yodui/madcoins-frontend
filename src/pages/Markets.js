import React from 'react';
import Box from '../components/Containers/Box/Box';

import MarketsList from '../components/Markets/MarketsList/MarketsList';

const MarketsPage = () => {
    return (
        <Box>
            <h1>Markets</h1>
            <MarketsList />
        </Box>
    )
}

export default MarketsPage;
