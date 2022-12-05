import react, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import './styles.css';

import Box from '../../Containers/Box/Box';
import Separator from '../../Nav/Separator/Separator';

import Modal from '../../Informers/Modal/Modal';
import InputLabel from '../../Common/InputLabel/InputLabel';
import Button from '../../Common/Button/Button';

import ModalSignIn from '../../Informers/ModalSignIn/ModalSignIn';
import ModalSignUp from '../../Informers/ModalSignUp/ModalSignUp';


const NavMenu = () => {

    const LINK_TYPE = 0;
    const SEPARATOR_TYPE = 1;

    const menuItems = [
        { path: '/', name: 'Dashboard', type: LINK_TYPE},
        { path: '/exchanges', name: 'Exchanges', type: LINK_TYPE},
        { path: '/markets', name: 'Markets', type: LINK_TYPE },
        { path: '/trades', name: 'Trades', type: LINK_TYPE},
        { path: '/coins', name: 'Coins', type: LINK_TYPE},
        { type: SEPARATOR_TYPE},
        { path: '/users', name: 'Users', type: LINK_TYPE}
    ];

    const [modeSignIn, showSignIn] = useState(false);
    const [modeSignUp, showSignUp] = useState(false);

    const renderMenuItem = (menuItem) => {
        if(menuItem.type == LINK_TYPE) {
            const end = menuItem.path == '/' ? true : false;
            return <NavLink key={'MenuItem_' + menuItem.name} to={menuItem.path} end={end}><span>{menuItem.name}</span></NavLink>
        } else if (menuItem.type == SEPARATOR_TYPE) {
            return <Separator key={'MenuItem'} />
        }
    }

    const handleOpenSignInModal = () => showSignIn(true);
    const handleCloseSignInModal = () => showSignIn(false);
    const handleOpenSignUpModal = () => showSignUp(true);
    const handleCloseSignUpModal = () => showSignUp(false);

    const switchModals = () => {
        if(modeSignIn) {
            showSignIn(false);
            showSignUp(true);
        } else {
            showSignIn(true);
            showSignUp(false);
        }
    }

    return (
        <Box className='topMenuBar'>
            <ol className='navMenu'>
                {menuItems.map(menuItem => renderMenuItem(menuItem))}
            </ol>
            <ul className='userMenu'>
                <Button variant='text' className='white' leftIcon='login' onClick={handleOpenSignInModal} label='Sign In' />
                <Button variant='text' className='purple' leftIcon='account' onClick={handleOpenSignUpModal} label='Sign Up' />
            </ul>
            <ModalSignIn show={modeSignIn} handleClose={handleCloseSignInModal} handleFormSwitcher={switchModals} />
            <ModalSignUp show={modeSignUp} handleClose={handleCloseSignUpModal} handleFormSwitcher={switchModals} />
        </Box>
    )
}

export default NavMenu;
