import React, { useState, useEffect } from 'react';
import DataGrid from '../../Containers/DataGrid/DataGrid';
import {IPaginationsOption} from '../../Containers/DataGrid/DataGrid';
import TradesCounter from '../TradesCounter/TradesCounter';
import Modal from '../../Common/Modal/Modal';
import './TradesList.css';

const columns = [
    { id: 'tradeid', label: 'Trade Id', width: '10%' },
    { id: 'market', label: 'Market', width: '15%' },
    { id: 'amountCell', label: 'Amount', width: '20%' },
    { id: 'rateCell', label: 'Rate', width: '20%' },
    { id: 'fTime', label: 'Time', width: '20%' }
];

const TradesList = () => {

    const [trades, setTrades] = useState([]);
    const [offset, setOffset] = useState(0);
    const [activePage, setActivePage] = useState(1);
    const [totalTrades, setTotalTrades] = useState(false);

    const TRADES_LIMIT = 20;
    const API_LIST_TRADES = 'http://localhost:3000/api/trades';

    const fetchTradesData = async () => {

        const params = new URLSearchParams({limit: TRADES_LIMIT, offset: offset}).toString();
        const response = await fetch(API_LIST_TRADES + '?' + params);

        const trades = await response.json();
        // update total trades
        setTotalTrades(trades.count);

        const tradesData = formatTrades(trades.rows);
        // update list of trades
        setTrades(tradesData);
    }

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
            const [baseTicker, quoteTicker] = row.tickers.split('/');
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
            <DataGrid rows={trades} columns={columns} count={totalTrades} activePage={activePage} options={options} />
        </div>
    )
}

export default TradesList;
