import react, { useState, useEffect } from 'react';
import './UserMenu.css';

import { useNavigate } from "react-router-dom";

import ModalSignIn from '../../Forms/ModalSignIn/ModalSignIn';
import ModalSignUp from '../../Forms/ModalSignUp/ModalSignUp';

import Button from '../../Common/Button/Button';
import Switch from '../../Common/Switch/Switch';

import { useDispatch, useSelector } from 'react-redux';
// actions
import { showSignIn, hideSignIn, showSignUp, hideSignUp } from '../../../store/actions/ModalActions';

import { uFetch } from '../../../functions/uFetch';

import UserProfile from './UserProfile/UserProfile';


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
        return <UserProfile />
    }

    return <ul className='userMenu'>
        { auth.isAuth === true ? renderUserProfile() : renderAuthMenu() }
    </ul>
}


export default UserMenu;
