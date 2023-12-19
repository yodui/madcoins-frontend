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
import { logOut } from '../../../store/actions/AuthActions';

import { uFetch } from '../../../functions/uFetch';
import DropDown from '../../Common/DropDown/DropDown';
import { S, M, BACKEND_HOST, BACKEND_PORT, API_URI_LOGOUT } from '../../../constants/common';

const UserMenu = () => {

    const dispatch = useDispatch();

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
        if(isSignInOpened) {
            dispatch(hideSignIn());
            dispatch(showSignUp());
        } else {
            dispatch(showSignIn());
            dispatch(hideSignUp());
        }
    }

    const renderAuthMenu = () => {
        return <>
            <Button variant='text' className='white' leftIcon='login' onClick={handleOpenSignInModal} label='Sign In' />
            <Button variant='text' className='purple' leftIcon='account' onClick={handleOpenSignUpModal} label='Sign Up' />
            <ModalSignIn handleClose={handleCloseSignInModal} handleFormSwitcher={switchModals} />
            <ModalSignUp handleClose={handleCloseSignUpModal} handleFormSwitcher={switchModals} />
        </>
    }

    const renderUserProfile = () => {

        const navigate = useNavigate();
        const [isOpened, setOpened] = useState(false);

        const userAva = <UserAva email={auth.user.email} size={M} />

        const handleToggleTheme = () => {
            console.log('toggle theme');
            return true;
        }

        const handleSettingsClick = () => {
            navigate('/account/settings');
        }

        const handleLogout = async () => {
            const logOutUrl = BACKEND_HOST + ':' + BACKEND_PORT + API_URI_LOGOUT;
            console.log('Call', logOutUrl);
            // Call backend endpoint for clear refreshToken
            const requestParams = {
                method: 'GET',
                cache: 'no-cache'
            };

            const objResponse = await uFetch(logOutUrl, requestParams);
            const response = await objResponse.json();

            // processing response
            if(response.result !== false) {
                // Local logout
                dispatch(logOut());
            }
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

        return <DropDown width='auto' isOpened={isOpened} trigger={userAva} menuItems={buttons} />
    }

    return <ul className='userMenu'>
        { auth.isAuth === true ? renderUserProfile() : renderAuthMenu() }
    </ul>
}


export default UserMenu;
