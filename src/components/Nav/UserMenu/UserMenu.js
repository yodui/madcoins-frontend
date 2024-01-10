import react, { useState, useEffect } from 'react';
import './UserMenu.css';

import { useNavigate } from "react-router-dom";

import ModalSignIn from '../../Forms/ModalSignIn/ModalSignIn';
import ModalSignUp from '../../Forms/ModalSignUp/ModalSignUp';

import Button from '../../Common/Button/Button';
import Switch from '../../Common/Switch/Switch';
import UserAva from '../../Common/UserAva/UserAva';

import DropDownItem from '../../Common/DropDown/DropDownItem';
import DropDownSeparator from '../../Common/DropDown/DropDownSeparator';

import { connect, useDispatch, useSelector } from 'react-redux';
// actions
import { showSignIn, hideSignIn, showSignUp, hideSignUp } from '../../../store/actions/ModalActions';
import { logOut, signIn } from '../../../store/actions/AuthActions';

import { uFetch } from '../../../functions/uFetch';
import DropDown from '../../Common/DropDown/DropDown';
import { S, M, BACKEND_HOST, BACKEND_PORT, API_URI_LOGOUT } from '../../../constants/common';

import AuthService from '../../../services/auth.service';

const UserMenu = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSignInOpened = useSelector(state => state.modal.signIn);
    const isSignUpOpened = useSelector(state => state.modal.signUp);

    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if(auth.isAuth === true) {
            // hide all modals
            dispatch(hideSignIn());
            dispatch(hideSignUp());
        }
    }, [auth]);


    const handleOpenSignInModal = () => dispatch(showSignIn());
    const handleCloseSignInModal = () => dispatch(hideSignIn());

    const handleOpenSignUpModal = () => dispatch(showSignUp());
    const handleCloseSignUpModal = () => dispatch(hideSignUp());

    const switchModals = () => {
        /*
        if(isSignInOpened) {
            dispatch(hideSignIn());
            dispatch(showSignUp());
        } else {
            dispatch(showSignIn());
            dispatch(hideSignUp());
        }

        */
    }


    const handleClickSignIn = () => {
        handleOpenSignInModal();
        /*
        const response = await AuthService.login('_rebel@inbox.ru','123456a');
        if(response.result === true) {
            dispatch(signIn(response.user, response.accessToken));
        }
        */
    }

    const handleClickSignOut = () => {
        handleOpenSignUpModal();
        /*
        const response = await AuthService.logout();
        if(response.result === true) {
            dispatch(logOut());
        }
        */
    }

    const renderAuthMenu = () => {
        return <>
            <Button variant='text' className='white' leftIcon='login' onClick={handleClickSignIn} label='Sign In' />
            <Button variant='text' className='white' leftIcon='account' onClick={handleClickSignOut} label='Sign Up' />
            <ModalSignIn handleClose={handleCloseSignInModal} handleFormSwitcher={switchModals} />
            <ModalSignUp handleClose={handleCloseSignUpModal} handleFormSwitcher={switchModals} />
        </>
    }

    const renderUserProfile = () => {

        const userAva = <UserAva email={auth.user.email} size={M} />

        const handleLogout = async () => {
            console.log('logout');
            const response = await AuthService.logout();
            console.log(response);
            if(response.result === true) {
                dispatch(logOut());
            }
        }

        const handleToggleTheme = () => {
            console.log('toggle theme');
            return true;
        }

        const handleSettingsClick = () => {
            navigate('/account/settings');
        }

        const logOutProps = {
            callback: handleLogout
        };

        const buttons = [
            <DropDownItem iconName='moon' text='Dark Theme' component=<Switch checked={true} callback={handleToggleTheme} /> />,
            <DropDownItem iconName='cog-outline' text='Settings' callback={handleSettingsClick} closeTrigger={true} />,
            <DropDownSeparator />,
            <DropDownItem iconName='logout' text='LogOut' { ...logOutProps } />,
        ];

        return <DropDown width='auto' trigger={userAva} menuItems={buttons} />;
    }

    const renderMenu = () => {
        return (auth.isAuth !== true) ? renderAuthMenu() : renderUserProfile();
    }

    return <ul className='userMenu'>
        { renderMenu() }
    </ul>
}


export default UserMenu;
