export const SHOW_SIGN_IN = 'modal/SHOW_SIGN_IN';
export const HIDE_SIGN_IN = 'modal/HIDE_SIGN_IN';

export const SHOW_SIGN_UP = 'modal/SHOW_SIGN_UP';
export const HIDE_SIGN_UP = 'modal/HIDE_SIGN_UP';


const showSignIn = () => {
    console.log('Show sign in!');
    return {
        type: SHOW_SIGN_IN,
        payload: { signIn: true }
    }
}

const hideSignIn = () => {
    console.log('Hide sign in!');
    return {
        type: HIDE_SIGN_IN,
        payload: { signIn: false }
    }
}

const showSignUp = () => {
    console.log('Show sign up!');
    return {
        type: SHOW_SIGN_UP,
        payload: { signUp: true }
    }
}

const hideSignUp = () => {
    console.log('Hide sign up!');
    return {
        type: HIDE_SIGN_UP,
        payload: { signUp: false }
    }
}

export { showSignIn, hideSignIn, showSignUp, hideSignUp }
