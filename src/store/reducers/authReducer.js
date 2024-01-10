import { AUTH_SIGN_IN, AUTH_LOGOUT } from '../actions/AuthActions';
import { LS_USER } from '../../constants/common';


const userData = localStorage.getItem(LS_USER);
let user = null;

if(userData && userData !== 'undefined') {
    console.log('UserData:', userData);
    user = JSON.parse(userData);
}

export const initialState = {
    isAuth: user ? true : false,
    user: user
};

export function authReducer(state = initialState, action) {
    //console.log(action);
    switch (action.type) {
        case AUTH_SIGN_IN:
            return { ...state, ...action.payload }
        case AUTH_LOGOUT:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}
