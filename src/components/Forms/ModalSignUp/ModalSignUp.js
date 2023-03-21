import React from 'react';
import Modal from '../../Common/Modal/Modal';
import InputLabel from '../../Common/InputLabel/InputLabel';
import Button from '../../Common/Button/Button';
import './ModalSignUp.css';

import Icon from '../../Common/Icon/Icon';
import { useForm, registerSubmit } from '../../../hooks/useForm';

import validatorsSignUp from './validatorsSignUp';


const ModalSignUp = ({show, handleClose, handleFormSwitcher}) => {

    const handleSubmitNative = () => {
        console.log('Submit form!');
    }

    const {values, handleSubmit, inputProps, submitProps} = useForm(handleSubmitNative, validatorsSignUp);

    return <Modal name='SignUp' className='signUpModal' show={show} handleClose={handleClose}>
        <div className='cols'>
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
                        <Button label='SignUp' variant='primary' leftIcon='send' />
                    </div>
                    <div className='inUpSwitcher'>Already have an account? <a name='signIn' onClick={handleFormSwitcher}>SignIn</a></div>
                </form>
            </div>
        </div>
    </Modal>
}

export default ModalSignUp;
