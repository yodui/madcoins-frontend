import { WS_SET_CONNECTION, WS_SUBSCRIBE_TO_DATA_SET, WS_UNSUBSCRIBE_TO_DATA_SET } from '../actions/WsActions';
import { WS_STATE_DISCONNECTED } from '../../constants/connection';

import * as STATE from '../../constants/connection';

export const initialState = {
    connectionState: STATE.DISCONNECTED, // state of connection
    subs: new Map() // set of subscriptions to data
};

// sign === false - decrement, sign === true - increment priority
const updatePriority = (subs, dataSet, sign = false) => {

    let priority = 1;

    if(subs.has(dataSet)) {
        if(sign === true) {
            priority = subs.get(dataSet) + 1;
        } else {
            priority = subs.get(dataSet) - 1;
        }
    }
    if(priority === 0) {
        // clear data set
        subs.delete(dataSet);
    } else {
        // update priority
        subs.set(dataSet, priority);
    }
    return subs;
}

const updateSubs = (state, action) => {

    const subs = new Map([...state.subs]);
    console.log('0:', subs);

    const sign = (action.type === WS_SUBSCRIBE_TO_DATA_SET) ? true : false;

    // processing action.payload
    const dataSet = new Set([...action.payload]);

    if(typeof action.payload === 'object' && action.payload.length) {
        dataSet.forEach(item => updatePriority(subs, item, sign));
    } else if(typeof action.payload === 'string') {
        updatePriority(subs, dataSet, sign);
    }
    console.log('1:', subs);
    return { ...state, ...{ subs: subs } }
}

export function wsReducer(state = initialState, action) {

    switch (action.type) {
        case WS_SET_CONNECTION:
            return { ...state, ...action.payload }

        case WS_SUBSCRIBE_TO_DATA_SET:
            return updateSubs(state, action, true);

        case WS_UNSUBSCRIBE_TO_DATA_SET:
            return updateSubs(state, action, false);

        default:
            return state;
    }
}
