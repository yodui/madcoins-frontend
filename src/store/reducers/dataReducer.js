import { UPDATE_TRADE_STAT, INSERT_TRADE } from '../actions/DataActions';

const initialDataState = {
    tradeStat: { trades: false, markets: false }
}


const insertTrade = (state, trade) => {
    return { ...state, trades: trade }
}


export function dataReducer(state = initialDataState, action) {
    switch (action.type) {
        case UPDATE_TRADE_STAT:
            return { ...state, tradeStat: {...action.payload} }
        case INSERT_TRADE:
            return insertTrade(state, action.payload);
        default:
            return state;
    }
}
