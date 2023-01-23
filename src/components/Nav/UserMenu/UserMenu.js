import react, { useState, useEffect } from 'react';
import './UserMenu.css';

import ModalSignIn from '../../Forms/ModalSignIn/ModalSignIn';
import ModalSignUp from '../../Forms/ModalSignUp/ModalSignUp';

import Button from '../../Common/Button/Button';
import UserAva from '../../Common/UserAva/UserAva';

import { useSelector } from 'react-redux';
import DropDown from '../../Common/DropDown/DropDown';
import { S, M } from '../../../constants/common';

const UserMenu = () => {

    const [openSignIn, setSignIn] = useState(false);
    const [openSignUp, setSignUp] = useState(false);

    const [openUserMenu, setOpenUserMenu] = useState(false);

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

    const toggleUserMenu = () => {
        console.log('toggle drop down!', !openUserMenu);
        setOpenUserMenu(!openUserMenu);
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

        return <div onClick={() => toggleUserMenu()}>
            <DropDown open={openUserMenu} trigger={userAva} menuItems={['User name','Theme','Log out']} />
        </div>
    }

    return <ul className='userMenu'>
        { auth.isAuth === true ? renderUserProfile() : renderAuthMenu() }
    </ul>
}

export default UserMenu;
