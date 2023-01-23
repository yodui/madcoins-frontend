import react, { useState, useEffect } from 'react';
import { NavLink, Link } from "react-router-dom";
import './styles.css';

import Box from '../../Containers/Box/Box';
import Separator from '../../Nav/Separator/Separator';

import UserMenu from '../UserMenu/UserMenu';

import { useSelector } from 'react-redux';

import { REQUIRED, NOT_REQUIRED } from '../../../constants/common';

const NavMenu = () => {

    const LINK_TYPE = 0;
    const SEPARATOR_TYPE = 1;

    const auth = useSelector(state => state.auth);

    const menuItems = [
        { path: '/', name: 'Dashboard', type: LINK_TYPE },
        { path: '/exchanges', name: 'Exchanges', type: LINK_TYPE },
        { path: '/markets', name: 'Markets', type: LINK_TYPE },
        { path: '/trades', name: 'Trades', type: LINK_TYPE },
        { path: '/coins', name: 'Coins', type: LINK_TYPE },
        { type: SEPARATOR_TYPE, auth: REQUIRED },
        { path: '/users', name: 'Users', type: LINK_TYPE, auth: REQUIRED }
    ];

    const renderMenuItem = (menuItem) => {
        if(!auth.isAuth && menuItem.auth) {
            return null;
        }
        if(menuItem.type == LINK_TYPE) {
            const end = menuItem.path == '/' ? true : false;
            return <NavLink key={'MenuItem_' + menuItem.name} to={menuItem.path} end={end}><span>{menuItem.name}</span></NavLink>
        } else if (menuItem.type == SEPARATOR_TYPE) {
            return <Separator key={'MenuItem'} />
        }
    }

    return (
        <Box className='topMenuBar'>
            <ol className='navMenu'>
                { menuItems.map(menuItem => renderMenuItem(menuItem)) }
            </ol>
            <UserMenu />
        </Box>
    )
}


export default NavMenu;
