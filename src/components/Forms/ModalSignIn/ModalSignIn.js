import React, { useState } from 'react';
import Modal from '../../Common/Modal/Modal';
import InputLabel from '../../Common/InputLabel/InputLabel';
import Button from '../../Common/Button/Button';
import './ModalSignIn.css';
import { useForm, registerSubmit } from '../../../hooks/useForm';
import validatorsSignIn from './validatorsSignIn';
import Loader from '../../Common/Loader/Loader';
import { uFetch } from '../../../functions/uFetch';

import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../../../store/actions/AuthActions';

import { HOST, API_URI_SIGNIN } from '../../../constants/common';

const ModalSignIn = ({show, handleClose, handleFormSwitcher}) => {

    const dispatch = useDispatch();

    const handleSubmitNative = () => {
        return new Promise(async (resolve, reject) => {
            const urlSignIn = HOST + API_URI_SIGNIN;

            try {
                const requestParams = {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                };
                const objResponse = await uFetch(urlSignIn, requestParams);
                const response = await objResponse.json();

                // processing
                if(response.result !== false) {
                    // save state in to store
                    dispatch(signIn(response.user, response.accessToken));
                }
                resolve(response);
            } catch(e) {
                console.log(e);
            }

        })
    }

    const {values, handleSubmit, inputProps, submitProps} = useForm(handleSubmitNative, validatorsSignIn);

    return <Modal name='SignIn' className='signInModal' show={show} handleClose={handleClose}>
        <form className='signInForm' onSubmit={handleSubmit}>
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
