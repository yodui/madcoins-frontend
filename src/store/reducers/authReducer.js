import { AUTH_SIGN_IN, AUTH_LOGOUT } from '../actions/AuthActions';
import { LS_USER } from '../../constants/common';

const user = JSON.parse(localStorage.getItem(LS_USER));

export const initialState = {
    isAuth: user ? true : false,
    user: user
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SIGN_IN:
            return { ...state, ...action.payload }
        case AUTH_LOGOUT:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}
