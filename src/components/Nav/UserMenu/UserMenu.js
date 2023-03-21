import react, { useState, useEffect } from 'react';
import './UserMenu.css';

import ModalSignIn from '../../Forms/ModalSignIn/ModalSignIn';
import ModalSignUp from '../../Forms/ModalSignUp/ModalSignUp';

import Button from '../../Common/Button/Button';
import Switch from '../../Common/Switch/Switch';
import UserAva from '../../Common/UserAva/UserAva';

import DropDownItem from '../../Common/DropDown/DropDownItem';
import DropDownSeparator from '../../Common/DropDown/DropDownSeparator';

import { useDispatch, useSelector } from 'react-redux';
import { logOut  } from '../../../store/actions/AuthActions';

import { uFetch } from '../../../functions/uFetch';
import DropDown from '../../Common/DropDown/DropDown';
import { S, M, HOST, API_URI_LOGOUT } from '../../../constants/common';

const UserMenu = () => {

    const dispatch = useDispatch();

    const [openSignIn, setSignIn] = useState(false);
    const [openSignUp, setSignUp] = useState(false);

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if(auth.isAuth === true) {
            // hide all modals
            setSignIn(false);
            setSignUp(false);
        }
    }, [auth]);

    const handleOpenSignInModal = () => setSignIn(true);
    const handleCloseSignInModal = () => setSignIn(false);
    const handleOpenSignUpModal = () => setSignUp(true);
    const handleCloseSignUpModal = () => setSignUp(false);

    const switchModals = () => {
        if(openSignIn) {
            setSignIn(false);
            setSignUp(true);
        } else {
            setSignIn(true);
            setSignUp(false);
        }
    }

    const renderAuthMenu = () => {
        return <>
            <Button variant='text' className='white' leftIcon='login' onClick={handleOpenSignInModal} label='Sign In' />
            <Button variant='text' className='purple' leftIcon='account' onClick={handleOpenSignUpModal} label='Sign Up' />
            <ModalSignIn show={openSignIn} handleClose={handleCloseSignInModal} handleFormSwitcher={switchModals} />
            <ModalSignUp show={openSignUp} handleClose={handleCloseSignUpModal} handleFormSwitcher={switchModals} />
        </>
    }

    const renderUserProfile = () => {

        const userAva = <UserAva email={auth.user.email} size={M} />

        const handleToggleTheme = () => {
            console.log('toggle theme');
            return true;
        }

        const handleTestToggle = () => {
        }

        const handleLogout = async () => {
            const logOutUrl = HOST + API_URI_LOGOUT;
            // Call backend endpoint for clear refreshToken
            console.log(logOutUrl);
            const requestParams = {
                method: 'GET',
                cache: 'no-cache'
            };
            const objResponse = await uFetch(logOutUrl, requestParams);

            const response = await objResponse.json();

            console.log('LogOut endpoint response: ', response);
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
            <DropDownItem iconName='moon' text='Test toggle' component=<Switch checked={false} callback={handleTestToggle} /> />,
            <DropDownSeparator />,
            <DropDownItem iconName='logout' text='LogOut' { ...logOutProps } />,
        ];

        return <DropDown width='auto' isOpened={true} trigger={userAva} menuItems={buttons} />
    }

    return <ul className='userMenu'>
        { auth.isAuth === true ? renderUserProfile() : renderAuthMenu() }
    </ul>
}

export default UserMenu;
