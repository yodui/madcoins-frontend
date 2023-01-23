import React, { useState } from 'react';
import Modal from '../../Common/Modal/Modal';
import InputLabel from '../../Common/InputLabel/InputLabel';
import Button from '../../Common/Button/Button';
import './ModalSignIn.css';
import { useForm, registerSubmit } from '../../../hooks/useForm';
import validatorsSignIn from './validatorsSignIn';
import Loader from '../../Common/Loader/Loader';
import { uFetch } from '../../../functions/uFetch';

// redux
import { connect } from 'react-redux';
// actions
import { signIn } from '../../../store/actions/AuthActions';


const ModalSignIn = ({show, handleClose, handleFormSwitcher, auth, signIn}) => {

    const HOST = 'http://localhost:3000';
    const URI_AUTH = '/api/login';

    const handleSubmitNative = () => {
        return new Promise(async (resolve, reject) => {
            const url = HOST+URI_AUTH;
            console.log('Request:', values);
            try {
                const objResponse = await uFetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                });
                const response = await objResponse.json();
                console.log('Response: ', response);
                // processing
                if(response.result !== false) {
                    // valid
                    localStorage.setItem('token', response.accessToken);
                    // save user data
                    localStorage.setItem('user', JSON.stringify(response.user));
                    // save state in to store
                    const authData = { isAuth: true, user: response.user };
                    console.log('Sign in...', authData);
                    signIn(authData);
                }
                resolve(response);
            } catch(e) {
                console.log(e);
            }
            /*
            setTimeout(() => {
                console.log('Was submitted, processing...');
                resolve( JSON.stringify({
                    result: false,
                    errors: {
                        email: [
                            {valid: false, msg: 'Error\'s in email'},
                            {valid: false, msg: 'Suntax error'}
                        ],
                        password: [
                            {valid: false, msg: 'Wrong password!'}
                        ]
                    }
                }) );
            }, 2000)
            */
        })
    }

    const {values, handleSubmit, inputProps, submitProps} = useForm(handleSubmitNative, validatorsSignIn);

    return <Modal name='SignIn' className='signInModal' show={show} handleClose={handleClose}>
        { auth.isAuth ? 'Authorized' : 'Unauthorized' }
        <form className='signInForm' onSubmit={handleSubmit}>
            <InputLabel label='E-mail' autoFocus={true} rightIcon='email-outline' { ...inputProps('email') } />
            <InputLabel label='Password' { ...inputProps('password') } type='password' />
            <div className='formAction'>
                <Button label='SignIn' { ...submitProps() }  variant='primary' leftIcon='login' />
            </div>
            <div className='inUpSwitcher'>You don't have an account? <a name='signUp' onClick={handleFormSwitcher}>SignUp</a></div>
        </form>
    </Modal>
}

const mapStateToProps = (store) => {
    return {
        auth: store.auth
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (data) => dispatch(signIn(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSignIn);
