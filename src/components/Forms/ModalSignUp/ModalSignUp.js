import React from 'react';
import Modal from '../../Common/Modal/Modal';
import InputLabel from '../../Common/InputLabel/InputLabel';
import Button from '../../Common/Button/Button';
import './ModalSignUp.css';

const ModalSignUp = ({show, handleClose, handleFormSwitcher}) => {
    return <Modal name='SignUp' className='signUpModal' show={show} handleClose={handleClose}>
        <div className='cols'>
            <div className='col1'>
                <div className="alphaAttention">
                    <div className='content'>
                        <p>Project <strong>MadCoins</strong> currently in early alpha and for compliting registration you must have an invite from developers team.</p>
                        <p>If you want to be in first wave of testers - submit letter to <a href='mailto:support@madcoins.io'>support@madcoins.io</a></p></div>
                </div>
                <p>Create an account to gain dozens of free function and features!</p>
            </div>
            <div className='col2'>
                <div className='signUpForm'>
                    <InputLabel name='email' label='E-mail' />
                    <InputLabel name='invite' label='Invite code' />
                    <InputLabel name='password' label='Password' type='password' />
                    <InputLabel name='confirm' label='Confirm password' type='password' />
                    <div className='formAction'>
                        <Button label='SignUp' variant='primary' leftIcon='send' />
                    </div>
                    <div className='inUpSwitcher'>Already have an account? <a name='signIn' onClick={handleFormSwitcher}>SignIn</a></div>
                </div>
            </div>
        </div>
    </Modal>
}

export default ModalSignUp;
