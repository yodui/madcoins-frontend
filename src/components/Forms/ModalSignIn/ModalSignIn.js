import React, { useState } from 'react';
import Modal from '../../Common/Modal/Modal';
import InputLabel from '../../Common/InputLabel/InputLabel';
import Button from '../../Common/Button/Button';

import './ModalSignIn.css';

import { useForm, registerSubmit } from '../../../hooks/useForm';
import validatorsSignIn from './validatorsSignIn';
import AuthService from '../../../services/auth.service';

import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../../store/actions/AuthActions';

import { BACKEND_HOST, BACKEND_PORT, API_URI_SIGNIN } from '../../../constants/common';

import AlertItem from '../../Common/AlertItem/AlertItem';

const ModalSignIn = ({handleClose, handleFormSwitcher}) => {

    const dispatch = useDispatch();

    const handleSubmitNative = async (values, dispatch) => {
        const response = await AuthService.login(values.email, values.password);
        console.log('RES:', response);
        if(response.result === true) {
            let a = dispatch(signIn(response.user, response.accessToken));
            console.log(a);
        }
        /*
        promise.then(
            (response) => {
                dispatch(signIn(response.user, response.accessToken))
            }
        ).catch(
            (e) => {
                console.log('Authorisation service error', e);
            }
        );
        */
        return promise;
    }

    const showMode = useSelector((state) => state.modal.signIn);

    const {values, handleSubmit, inputProps, submitProps, generalAlert} = useForm(handleSubmitNative, validatorsSignIn, dispatch);

    const GeneralAlert = ({msg}) => {
        if(!msg) return <></>;
        return <div><AlertItem msg={msg} iconName={'alert-outline'} /></div>;
    }

    return <Modal name='SignIn' className='signInModal' show={showMode} handleClose={handleClose}>
        <form className='signInForm' onSubmit={handleSubmit}>
            <GeneralAlert msg={generalAlert} />
            <InputLabel label='E-mail' rightIcon='email-outline' { ...inputProps('email') } />
            <InputLabel label='Password' { ...inputProps('password') } type='password' />
            <div className='formAction'>
                <Button label='SignIn' { ...submitProps() }  variant='primary' leftIcon='login' />
            </div>
            <div className='inUpSwitcher'>You don't have an account? <a name='signUp' onClick={handleFormSwitcher}>SignUp</a></div>
        </form>
    </Modal>
}

export default ModalSignIn;

