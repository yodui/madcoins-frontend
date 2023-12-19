export const WS_SET_CONNECTION = 'ws/CONNECTION';
export const WS_SUBSCRIBE_TO_DATA_SET = 'ws/SUBSCRIBE_TO_DATA_SET';
export const WS_UNSUBSCRIBE_TO_DATA_SET = 'ws/UNSUBSCRIBE_TO_DATA_SET';

const setConnectionState = (connectionState) => {
    return {
        type: WS_SET_CONNECTION,
        payload: { connectionState: connectionState }
    }
}

const subscribeToDataSet = (dataSetArray, componentName) => {
    return {
        type: WS_SUBSCRIBE_TO_DATA_SET,
        payload: {'dataSets': dataSetArray, 'componentName': componentName}
    }
}

const unsubscribeToDataSet = (dataSetArray, componentName) => {
    return {
        type: WS_UNSUBSCRIBE_TO_DATA_SET,
        payload: {'dataSets': dataSetArray, 'componentName': componentName}
    }
}

export { setConnectionState, subscribeToDataSet, unsubscribeToDataSet }
