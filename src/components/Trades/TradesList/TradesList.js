import React, { useState, useEffect } from 'react';
import DataGrid from '../../Containers/DataGrid/DataGrid';
import {IPaginationsOption} from '../../Containers/DataGrid/DataGrid';

import Modal from '../../Common/Modal/Modal';
import { uFetch } from '../../../functions/uFetch';
import './TradesList.css';

import { useSelector, useDispatch } from 'react-redux';
import { unsubscribeToDataSet, subscribeToDataSet } from '../../../store/actions/WsActions';

import useSubscribes from '../../../hooks/useSubscribes';
import * as SUB from '../../../constants/subscribes';


const columns = [
    { id: 'tradeid', label: 'Trade Id', width: '10%' },
    { id: 'market', label: 'Market', width: '15%' },
    { id: 'amountCell', label: 'Amount', width: '20%' },
    { id: 'rateCell', label: 'Rate', width: '20%' },
    { id: 'fTime', label: 'Time', width: '20%' }
];

const TradesList = () => {

    const COMPONENT_NAME = 'TradesList';

    const [trades, setTrades] = useState([]);
    const [offset, setOffset] = useState(0);

    const [loading, setLoading] = useState(false);

    const [activePage, setActivePage] = useState(1);
    const [totalTrades, setTotalTrades] = useState(false);
    const [lastLoadedTradeId, setLastLoadedTradeId] = useState(false);

    const subscribes = [SUB.TRADE_STAT, SUB.LAST_TRADES];
    useSubscribes(subscribes, COMPONENT_NAME);

    const dispatch = useDispatch();

    const tradeStat = useSelector(state => state.data.tradeStat);
    const lastTrade = useSelector(state => state.data.trades);

    useEffect(() => {
        if(activePage !== 1) {
            // show last trades only on first page
            // unsubscribe from last trades, SUB.LAST_TRADES
            dispatch(unsubscribeToDataSet([SUB.LAST_TRADES], COMPONENT_NAME));
        } else {
            // subscribe to last trades
            dispatch(subscribeToDataSet([SUB.LAST_TRADES], COMPONENT_NAME));
        }
    }, [activePage]);


    useEffect(() => {
        if(loading === true || !lastTrade) return;
        const tradeData = formatTrades([lastTrade]);
        console.log('LT:', lastTrade);
        const updatedTrades = [lastTrade, ...trades];
        updatedTrades.splice(20);
        setTrades(updatedTrades);
    }, [lastTrade]);


    const TRADES_LIMIT = 20;
    const API_LIST_TRADES = 'http://localhost:3000/api/trades';

    const fetchTradesData = async () => {

        setLoading(true);

        const params = new URLSearchParams({limit: TRADES_LIMIT, offset: offset}).toString();
        const response = await uFetch(API_LIST_TRADES + '?' + params);

        const rawTrades = await response.json();
        console.log(rawTrades);

        // update total trades
        setTotalTrades(rawTrades.count);

        const tradeRows = formatTrades(rawTrades.rows);
        if(tradeRows && tradeRows.length) {
            // get last trade id on page
            setLastLoadedTradeId(tradeRows[0].tradeid);
        }

        // update list of trades
        setTrades(tradeRows);
        setLoading(false);

    }

    useEffect(() => {
        setTotalTrades(tradeStat.trades);
    }, [tradeStat]);

    useEffect(() => { fetchTradesData(); }, [offset]);

    const handlePageClick = async (page) => {
        const newOffset = (page - 1) * TRADES_LIMIT;
        setActivePage(page);
        setOffset(newOffset);
    }

    const MarketTicker = ({marketId, exTicker, baseTicker, quoteTicker}) => <div className='market'>
        <div className='tradingPair'><span className='baseTicker'>{baseTicker}</span><span className='quoteTicker'> / {quoteTicker}</span></div>
        <div className='exTicker'>{exTicker}</div>
    </div>;

    const LastTrade = ({trade}) => {
        if(!trade) return null;
        return <div className='lastTrade'>
            <div>Last loaded trade id: <strong>{lastLoadedTradeId}</strong></div>
            <div>Last trade id: <strong>{trade.tradeid}</strong> [{trade.exticker}]</div>
            <div>marketId: {trade.marketid} Amount: {trade.amount} rate: {trade.rate}</div>
        </div>
    }

    const TradeAmount = ({amount}) => {
        const cls = (amount > 0) ? 'buy' : 'sell';
        return <div className={['amount', cls].join(' ')}>{amount}</div>;
    }

    const Rate = ({rate, amount, ticker}) => {
        const sum = rate * amount;
        return <div className='rate'><span className='value'>{rate}</span><div className='tradeSum'>{sum} {ticker}</div></div>
    }

    const formatTrades = (trades) => {
        trades.map(row => {
            // format trade time
            const d = new Date(parseInt(row.mts));
            let fDate = [('0' + d.getDate()).slice(-2), ('0' + (d.getMonth() + 1)).slice(-2), d.getFullYear()].join('.');
            let fTime = [('0' + d.getHours()).slice(-2), ('0' + d.getMinutes()).slice(-2), ('0' + d.getSeconds()).slice(-2)].join(':');
            row['fTime'] = [fDate, fTime].join(', ');
            // splice tickers
            const [baseTicker, quoteTicker] = row.marketticker.split('/');
            // format market
            row['market'] = <MarketTicker marketId={row.marketid} exTicker={row.exticker} baseTicker={baseTicker} quoteTicker={quoteTicker} />
            // format amount
            row['amountCell'] = <TradeAmount amount={row.amount} />
            // format rate
            row['rateCell'] = <Rate rate={row.rate} amount={row.amount} ticker={quoteTicker} />
        })
        return trades;
    };

    const options = {
        dense:true,
        pagination: {
            limit: TRADES_LIMIT,
            pagesNumber: 5
        },
        handlePageClick: handlePageClick
    };

    return (
        <div className='tradesList'>
            <LastTrade trade={lastTrade} />
            <DataGrid rows={trades} columns={columns} count={totalTrades} activePage={activePage} options={options} />
        </div>
    )
}


export default TradesList;
