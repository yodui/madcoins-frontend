import { uFetch } from '../../../functions/uFetch';
import { HOST, API_URI_EMAIL_EXISTS } from '../../../constants/common';

const asyncTest = async (value, stateIndex) => new Promise((resolve, reject) => {
    const min = 500;
    const max = 5000;
    const timing = Math.floor(Math.random() * (max - min) + min);
    setTimeout(() => {
        const result = (Math.round(Math.random())) ? true : false;
        resolve({
            valid: result,
            stateIndex: stateIndex,
            responseMsg: (result) ? `Valid! ${timing} / ${stateIndex}` : `Nott valid! :( ${timing} / ${stateIndex}`
        });
    }, timing);
});

const emailExists = async (value, stateIndex) => new Promise(async (resolve, reject) => {
    const uriEmailExists = HOST + API_URI_EMAIL_EXISTS;
    const requestParams = {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: value})
    };
    const objResponse = await uFetch(uriEmailExists, requestParams);
    const response = await objResponse.json();
    if(response.hasOwnProperty('userExists')) {
        if (response.userExists === true) {
            // user with current email is exists
            if(response.hasOwnProperty('active') && response.active) {
                // active user
                resolve({valid: false, stateIndex: stateIndex, responseMsg: 'Email is already taken'});
            }
        }
        // user with current email is not exists, or email is not activated
        resolve({valid: true, stateIndex: stateIndex, responseMsg: 'Email is available'});
    }
});


export { emailExists };
