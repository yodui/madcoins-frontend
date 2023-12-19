import { combineReducers } from 'redux';
import { pageReducer } from './pageReducer';
import { authReducer } from './authReducer';
import { wsReducer } from './wsReducer';
import { modalReducer } from './modalReducer';
import { dataReducer } from './dataReducer';

export const rootReducer = combineReducers({
    page: pageReducer,
    modal: modalReducer,
    auth: authReducer,
    ws: wsReducer,
    data: dataReducer
});
