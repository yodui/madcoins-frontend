export const AUTH_SIGN_IN = 'auth/SIGN_IN';
export const AUTH_LOGOUT = 'auth/LOGOUT';

import { LS_USER, LS_ACCESS_TOKEN } from '../../constants/common';

const signIn = (userData, accessToken) => {
    // save in local storage
    localStorage.setItem(LS_ACCESS_TOKEN, accessToken);
    localStorage.setItem(LS_USER, JSON.stringify(userData));
    return {
        type: AUTH_SIGN_IN,
        payload: { isAuth: true, user: userData }
    }
}

const logOut = () => {
    // clear local storage
    localStorage.removeItem(LS_USER);
    localStorage.removeItem(LS_ACCESS_TOKEN);
    return {
        type: AUTH_LOGOUT,
        payload: { isAuth: false, user: null }
    }
}

export { signIn, logOut }
