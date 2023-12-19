export const SHOW_SIGN_IN = 'modal/SHOW_SIGN_IN';
export const HIDE_SIGN_IN = 'modal/HIDE_SIGN_IN';

export const SHOW_SIGN_UP = 'modal/SHOW_SIGN_UP';
export const HIDE_SIGN_UP = 'modal/HIDE_SIGN_UP';


const showSignIn = () => {
    return {
        type: SHOW_SIGN_IN,
        payload: { signIn: true }
    }
}

const hideSignIn = () => {
    return {
        type: HIDE_SIGN_IN,
        payload: { signIn: false }
    }
}

const showSignUp = () => {
    return {
        type: SHOW_SIGN_UP,
        payload: { signUp: true }
    }
}

const hideSignUp = () => {
    return {
        type: HIDE_SIGN_UP,
        payload: { signUp: false }
    }
}

export { showSignIn, hideSignIn, showSignUp, hideSignUp }
