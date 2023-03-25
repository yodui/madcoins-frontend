import React, { useState } from 'react';
import Modal from '../../Common/Modal/Modal';
import InputLabel from '../../Common/InputLabel/InputLabel';
import Button from '../../Common/Button/Button';
import './ModalSignUp.css';

import Icon from '../../Common/Icon/Icon';
import { useForm, registerSubmit } from '../../../hooks/useForm';

import validatorsSignUp from './validatorsSignUp';
import { uFetch } from '../../../functions/uFetch';

import { HOST, API_URI_SIGNUP } from '../../../constants/common';


const ModalSignUp = ({show, handleClose, handleFormSwitcher}) => {

    const [submitResult, setSubmitResult] = useState(true);
    const [modalTitle, setModalTitle] = useState('Sign Up');

    let userEmail = false;

    const handleSubmitNative = () => {
        return new Promise(async (resolve, reject) => {

            const urlSignUp = HOST + API_URI_SIGNUP;

            try {
                const requestParams = {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                };
                const objResponse = await uFetch(urlSignUp, requestParams);
                const response = await objResponse.json();
                console.log('R: ', response);
                if(response.hasOwnProperty('userId')) {
                    setModalTitle('Congratulations!');
                    // success
                    setSubmitResult(true);
                }
                resolve(response);
            } catch (e) {
                reject(e);
            }

            /*
            setTimeout(() => {
                resolve( {
                    result: false,
                    errors: [
                        {field: 'email', errors: ['Error\'s in email']},
                        {field: 'password', errors: ['Too easy!']}
                    ]
                } );
            }, 2000);
            */
        });
    }

    const handleBackToForm = () => {
        setSubmitResult(false);
        handleReset();
    }

    const {values, handleSubmit, inputProps, submitProps, handleReset} = useForm(handleSubmitNative, validatorsSignUp);

    const renderForm = () => (<div className='cols'>
        <div className='col1'>
            <div className="alphaAttention">
                <div className='content'>
                    <p>Project <strong>MadCoins</strong><sup>α</sup> currently in early alpha and for compliting registration you must have an invite code.</p>
                    <p>If you want to be in first wave of testers - submit letter to <a href='mailto:support@madcoins.io'>support@madcoins.io</a></p></div>
            </div>
            <div className='signUpBenefits'>
                <div className='item'>
                    <div className='iconCell'><Icon name='update' size={24} /></div>
                    <p>Gain access to trade data and instantly updates!</p>
                </div>
                <div className='item'>
                    <div className='iconCell'><Icon name='tune-variant' size={24} /></div>
                    <p>Save and custom your preferences</p>
                </div>
            </div>
        </div>
        <div className='col2'>
            <form className='signUpForm' onSubmit={handleSubmit}>
                <InputLabel name='email' rightIcon='email-outline' label='E-mail' { ...inputProps('email') } />
                <InputLabel name='invite' rightIcon='invite' label='Invite code' { ...inputProps('invite') } />
                <InputLabel name='password' label='Password' type='password' { ...inputProps('password') } />
                <div className='formAction'>
                    <Button label='SignUp' { ...submitProps() } variant='primary' leftIcon='send' />
                </div>
                <div className='inUpSwitcher'>Already have an account? <a name='signIn' onClick={handleFormSwitcher}>SignIn</a></div>
            </form>
        </div>
    </div>);

    const renderSubmitResults = () => (<div className='submitResults'>
        <strong>Your registration is almost complete.<br />Please check your email and follow the link in the email.</strong>
        <p>After activating with email, you will be automatically logged in.</p>
        <div className='resultsBar'>
            <Button label={'Ok, i\'ll go checked email'} variant='contained' leftIcon='email-outline' onClick={handleClose} />
            <Button label={'Back to form'} variant='outlined' onClick={handleBackToForm} />
        </div>
    </div>);

    return <Modal name={modalTitle} className='signUpModal' show={show} handleClose={handleClose}>
        { !submitResult ? renderForm() : renderSubmitResults() }
    </Modal>
}

export default ModalSignUp;
