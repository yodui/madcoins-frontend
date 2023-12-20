import { uFetch } from '../functions/uFetch';
import { BACKEND_HOST, BACKEND_PORT, API_URI_SIGNIN, API_URI_LOGOUT } from '../constants/common';

export default class AuthService {

    static async login(email, password) {
        return new Promise(async (doResolve, doReject) => {
            try {
                const urlSignIn = BACKEND_HOST + ':' + BACKEND_PORT + API_URI_SIGNIN;
                const requestParams = {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({'email':email,'password':password})
                };
                const objResponse = await uFetch(urlSignIn, requestParams);
                const response = await objResponse.json();
                doResolve(response);
            } catch(e) {
                doReject({'message':'Authorisation service is unavailable'});
            }
        });
    }

    static async logout() {
        return new Promise(async (doResolve, doReject) => {
            try {
                const logOutUrl = BACKEND_HOST + ':' + BACKEND_PORT + API_URI_LOGOUT;
                console.log(logOutUrl);
                // Call backend endpoint for clear refreshToken
                const requestParams = {
                    method: 'GET',
                    cache: 'no-cache'
                };
                const objResponse = await uFetch(logOutUrl, requestParams);
                const response = await objResponse.json();
                doResolve(response);
            } catch(e) {
                doReject({'message':'Service is unavailable'});
            }
        });
    }

}
