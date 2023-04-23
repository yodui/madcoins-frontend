import { BACKEND_HOST, BACKEND_PORT, API_URI_REFRESH_TOKEN } from '../constants/common.js';
import { signIn } from '../store/actions/AuthActions';

//const dispatch = useDispatch();

const uFetch = async (url, options, lastCall = false, timeLimit = 10000) => {

    // Add Authorization header, if exists accessToken
    const accessToken = localStorage.getItem('accessToken');

    if(!options) options = {};
    if(accessToken) {
        if(!options.hasOwnProperty('headers')) options.headers = {};
        options.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Add cridentials option for send cookie
    if(!options.hasOwnProperty('credentials')) {
        options.credentials = 'include';
    }

    const response = await Promise.race([
        fetch(url, options),
        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Fetch timeout'));
            }, timeLimit)
        })
    ]);

    // Check accessToken validation
    if(response.status === 401) {

        // Unauthorized
        // Try to update accessToken and resend query
        console.log('Unauthorized!');
        const uriRefreshToken = BACKEND_HOST + ':' + BACKEND_PORT + API_URI_REFRESH_TOKEN;
        console.log('Call: ', uriRefreshToken);

        const requestParams = {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'include'
        };

        // Call refresh method
        const raw = await fetch(uriRefreshToken, requestParams);
        const refreshResponse = await raw.json();
        console.log('REF2:',refreshResponse);

        // 1. update local storage: access token
        signIn(refreshResponse.user, refreshResponse.accessToken);
        // recall
        return uFetch(url, options, true);
    }

    return response;
}

export { uFetch };
