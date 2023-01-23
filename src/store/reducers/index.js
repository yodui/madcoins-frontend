import { combineReducers } from 'redux';
import { pageReducer } from './pageReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
    page: pageReducer,
    auth: authReducer
});
