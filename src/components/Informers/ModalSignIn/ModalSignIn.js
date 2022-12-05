import React from 'react';
import Modal from '../Modal/Modal';
import InputLabel from '../../Common/InputLabel/InputLabel';
import Button from '../../Common/Button/Button';
import './ModalSignIn.css';
import useForm from '../../../hooks/useForm';

const ModalSignIn = ({show, handleClose, handleFormSwitcher}) => {

    const handleSubmitNative = () => {
        console.log('Parent submit. Form values:', values);
    }

    const fields = {
        email: {
            realtime: false,
            validators: {
                required: {
                    msg: 'Email is required field',
                    break: true
                },
                isEmail: {
                    msg: 'Syntax email is not valid',
                    break: true
                },
                custom: {
                    check: () => true,
                    msg: 'Email is already taken',
                    callback: val => {
                        console.log(`callback, email ${val} is already taken`);
                    }
                }
            }
        },
        password: {
            realtime: true,
            validators: {
                required: {
                    msg: 'Password is required field',
                    break: false
                },
                regex: {
                    pattern: /^[a-z0-9]{3,}$/i,
                    msg: 'At least 8 characters',
                    className: 'tip',
                    completedClassName: 'completed',
                    alwaysShow: true
                }
            }
        }
    }

    const {values, errors, handleSubmit, register} = useForm(handleSubmitNative, fields);

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
