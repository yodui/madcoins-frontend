import React, { useState, useEffect, useRef } from 'react';
import './TradesCounter.css';

import { connect } from 'react-redux';
import { subscribeToDataSet, unsubscribeToDataSet } from '../../../store/actions/WsActions';

import useSubscribes from '../../../hooks/useSubscribes';
import * as SUB from '../../../constants/subscribes';

const TradesCounter = ({totalTrades, subscribe, unsubscribe}) => {

    const subscribeGroup = [SUB.TRADES_STAT];

    useSubscribes(subscribeGroup);

    return (
        <div className='tradesCounter'>{totalTrades}</div>
    )
}

export default TradesCounter;
