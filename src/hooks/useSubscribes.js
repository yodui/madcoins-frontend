import { react, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { subscribeToDataSet, unsubscribeToDataSet } from '../store/actions/WsActions';


const useSubscribes = (subscribes) => {

    const dispatch = useDispatch();

    useEffect(() => {
        // subscribe
        dispatch(subscribeToDataSet(subscribes));
        return () => {
            // unsubscribe
            dispatch(unsubscribeToDataSet(subscribes));
        }
    }, []);
}


export default useSubscribes;
