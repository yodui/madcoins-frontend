import React from 'react';
import '../BottomBar/BottomBar.css';
import { connect } from 'react-redux';

const BottomInformer = ({auth}) => {

    const renderUserInfo = () => {
        if(auth.isAuth) {
            return <div className='userData'>Authorized <span className='email'>{auth.user.email}</span></div>
        } else {
            return <>Unauthorized</>
        }
    }

    return <div className='bottomBar'>
        <div className='barItem connection'>Connection state: <span>?</span></div>
        <div className='barItem'>Auth: <span>{ renderUserInfo() }</span></div>
    </div>
}

const mapStateToProps = (store) => {
    console.log(store); // let's see what we have in store
    return {
        auth: store.auth
    }
}

export default connect(mapStateToProps)(BottomInformer);
