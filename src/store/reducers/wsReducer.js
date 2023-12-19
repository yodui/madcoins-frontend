import { WS_SET_CONNECTION, WS_SUBSCRIBE_TO_DATA_SET, WS_UNSUBSCRIBE_TO_DATA_SET } from '../actions/WsActions';
import { WS_STATE_DISCONNECTED } from '../../constants/connection';

import * as STATE from '../../constants/connection';

export const initialState = {
    connectionState: STATE.DISCONNECTED, // state of connection
    subs: new Map() // set of subscriptions to data
};

// subs - current subscriptions
// dataSet - name of subscribe data set
// componentName - component name (subscriber)
// inc - false - clear subscribe from component, true - add subscribe from component
const updateSubscribe = (subs, dataSet, componentName, inc = false) => {

    // subscribers to data set
    let subscribers;

    if(subs.has(dataSet)) {
        subscribers = new Set([...subs.get(dataSet)]);
        if (inc === true) {
            subscribers.add(componentName);
        } else {
            subscribers.delete(componentName);
        }
    } else {
        subscribers = new Set();
        if(inc === true) {
            subscribers.add(componentName);
        }
    }

    if(subscribers.size) {
        subs.set(dataSet, subscribers);
    } else {
        if(subs.has(dataSet)) subs.delete(dataSet);
    }

    return subs;
}

const updateSubs = (state, payload, componentName, inc = false) => {

    // create a Map from state.subs
    const subs = new Map([...state.subs]);

    [...payload].forEach(ds => {
        updateSubscribe(subs, ds, componentName, inc);
    });

    return { ...state, ...{ subs: subs } }
}

export function wsReducer(state = initialState, action) {

    switch (action.type) {
        case WS_SET_CONNECTION:
            return { ...state, ...action.payload }

        case WS_SUBSCRIBE_TO_DATA_SET:
            return updateSubs(state, action.payload.dataSets, action.payload.componentName, true);

        case WS_UNSUBSCRIBE_TO_DATA_SET:
            return updateSubs(state, action.payload.dataSets, action.payload.componentName, false);

        default:
            return state;
    }
}
