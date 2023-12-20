import { uFetch } from '../functions/uFetch';
import { BACKEND_HOST, BACKEND_PORT, API_URI_SIGNIN } from '../constants/common';

export default class AuthService {

    static async login(email, password) {
        return new Promise(async (resolve, reject) => {
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
                resolve(response);
            } catch(e) {
                reject({'message':'Authorisation service is unavailable'});
            }
        });
    }

    static async logout() {
    }

}
