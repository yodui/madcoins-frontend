export const UPDATE_TRADE_STAT = 'data/UPDATE_TRADE_STAT';
export const INSERT_TRADE = 'data/INSERT_TRADE';

const updateTradeStat = (payload) => {
    const {trades, markets} = payload;
    return {
        type: UPDATE_TRADE_STAT,
        payload: {
            trades: trades,
            markets: markets
        }
    }
}

const insertTrade = (trade) => {
    return {
        type: INSERT_TRADE,
        payload: trade
    }
}

export { updateTradeStat, insertTrade }
