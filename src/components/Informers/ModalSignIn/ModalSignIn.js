import React from 'react';
import Modal from '../Modal/Modal';
import InputLabel from '../../Common/InputLabel/InputLabel';
import Button from '../../Common/Button/Button';
import './ModalSignIn.css';
import {useForm} from '../../../hooks/useForm';
import formValidators from './FormValidators';
import Loader from '../../Common/Loader/Loader';

const ModalSignIn = ({show, handleClose, handleFormSwitcher}) => {

    const handleSubmitNative = () => {
        console.log('Parent submit. Form values:', values);
    }

    const {values, handleSubmit, register} = useForm(handleSubmitNative, formValidators);

    return <Modal name='SignIn' className='signInModal' show={show} handleClose={handleClose}>
        <form className='signInForm' onSubmit={handleSubmit}>
            <InputLabel label='E-mail' {...register('email')} />
            <InputLabel label='Password' {...register('password')} type='password' />
            <div className='formAction'>
                <Button label='SignIn' variant='primary' leftIcon='login' />
            </div>
            <div className='inUpSwitcher'>You don't have an account? <a name='signUp' onClick={handleFormSwitcher}>SignUp</a></div>
        </form>
    </Modal>
}

export default ModalSignIn;
