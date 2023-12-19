import { react, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { subscribeToDataSet, unsubscribeToDataSet } from '../store/actions/WsActions';


const useSubscribes = (subscribes, componentName) => {

    const dispatch = useDispatch();

    useEffect(() => {
        // subscribe
        dispatch(subscribeToDataSet(subscribes, componentName));
        return () => {
            // unsubscribe
            dispatch(unsubscribeToDataSet(subscribes, componentName));
        }
    }, []);
}


export default useSubscribes;
