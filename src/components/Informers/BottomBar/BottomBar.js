import React from 'react';
import '../BottomBar/BottomBar.css';
import { connect, useSelector } from 'react-redux';

import * as STATE from '../../../constants/connection';

import Icon from '../../Common/Icon/Icon';

const BottomInformer = () => {


    const connectionState = useSelector(state => state.ws.connectionState);
    const auth = useSelector(state => state.auth);

    const renderUserInfo = () => {
        if(auth.isAuth === true) {
            return <span className='userState'><Icon name='check-all' size={16} /></span>
        } else {
            return <>Unauthorized</>
        }
    }

    const renderConnectionState = () => {

        let state = { name: false, cls: false };

        if(connectionState === STATE.DISCONNECTED) {
            state.cls = 'disconnected';
            state.name = 'Disconnected';
        } else if(connectionState === STATE.NEED_AUTH) {
            state.cls = 'authorization';
            state.name = 'Authorization...';
        } else if(connectionState === STATE.WRONG_ACCESS_TOKEN) {
            state.cls = 'wrongAccessToken';
            state.name = 'Access denied';
        } else {
            state.cls = 'connected';
            state.name = 'Connected';
        }

        return <span className={['state','value',state.cls].join(' ')}><span className='bullet'></span>{state.name}</span>
    }

    return <div className='bottomBar'>
        <div className='barItem connection'><span className='name'>Connection:</span> { renderConnectionState() }</div>
        <div className='barItem'><span className='name'>Auth:</span> <span className='value'>{ renderUserInfo() }</span></div>
    </div>
}


export default BottomInformer;
