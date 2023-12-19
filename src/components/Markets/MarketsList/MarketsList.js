import React, { useState, useEffect } from 'react';

import useSubscribes from '../../../hooks/useSubscribes';
import DataGrid from '../../Containers/DataGrid/DataGrid';
import * as SUB from '../../../constants/subscribes';
import { uFetch } from '../../../functions/uFetch';

import './MarketsList.css';

const MarketsList = () => {

    const COMPONENT_NAME = 'MarketsList';
    const API_LIST_MARKETS = 'http://localhost:3000/api/market';
    const MARKETS_LIMIT = 20;

    const [loading, setLoading] = useState(null);

    const [totalMarkets, setTotalMarkets] = useState(null);
    const [offset, setOffset] = useState(0);

    const subs = [SUB.ONLINE_MARKETS];
    useSubscribes(subs, COMPONENT_NAME);

    useEffect(() =>{
        fetchMarketsData();
    },[]);


    const fetchMarketsData = async () => {
        setLoading(true);

        const params = new URLSearchParams({limit: MARKETS_LIMIT, offset: offset}).toString();
        console.log(params);
        const response = await uFetch(API_LIST_MARKETS + '?' + params);

        const rawMarkets = await response.json();
        console.log(rawMarkets);

        setLoading(false);
    }

    return (
        <>MarketsList</>
    )
}

export default MarketsList;
