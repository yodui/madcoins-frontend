import React, { useState } from 'react';
import './styles.css';
import NavMenu from '../../Nav/NavMenu/NavMenu';
import BottomBar from '../../Informers/BottomBar/BottomBar';

import useSubscribes from '../../../hooks/useSubscribes';
import * as SUB from '../../../constants/subscribes';


const PageLayout = ({children}) => {

    return (
        <div className='pageLayout'>
            <NavMenu />
            <WatchTickers />
            <div className='contentPage'>
                {children}
            </div>
            <BottomBar />
        </div>
    )
}

const WatchTickers = () => {

    useSubscribes([SUB.TEST]);

    return <div className='watchTickers'>
        <div className='asset'>
            <div className='item'>BTC</div>
            <div className='ticker'>
                <span className='exIcon'>ICO</span>
                <span className='pair'>BTC/USDT</span>
                <span className='price'>27,793.20</span>
                <span className='change'>-0.56%</span>
            </div>
        </div>
    </div>
}


export default PageLayout;
