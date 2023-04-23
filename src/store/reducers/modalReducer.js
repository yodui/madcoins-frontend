import { SHOW_SIGN_IN, HIDE_SIGN_IN, SHOW_SIGN_UP, HIDE_SIGN_UP } from '../actions/ModalActions';

export const initialState = {
    signIn: false,
    signUp: false
};

export function modalReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_SIGN_IN:
            return { ...state, ...action.payload }
        case HIDE_SIGN_IN:
            return { ...state, ...action.payload }
        case SHOW_SIGN_UP:
            return { ...state, ...action.payload }
        case HIDE_SIGN_UP:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}
