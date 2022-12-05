import React, { useState } from 'react';
import './styles.css';
import NavMenu from '../../Nav/NavMenu/NavMenu';
import BottomBar from '../../Informers/BottomBar/BottomBar';


const PageLayout = ({children}) => {

    return (
        <div className='pageLayout'>
            <NavMenu />
            <div className='contentPage'>
                {children}
            </div>
            <BottomBar />
        </div>
    )
}


export default PageLayout;
