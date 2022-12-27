const formValidators = {
    email: {
        validators: {
            required: {
                msg: 'Email is required field',
                realtime: true,
                break: true,
                callback: val => {
                    console.log('Callback required call!');
                }
            },
            isEmail: {
                msg: 'Syntax email is not valid',
                realtime: true,
                break: true
            },
            custom: {
                check: (value, stateIndex) => new Promise((resolve, reject) => {
                    const min = 500;
                    const max = 5000;
                    const timing = Math.floor(Math.random() * (max - min) + min);
                    setTimeout(() => {
                        const result = (Math.round(Math.random())) ? true : false;
                        resolve({
                            valid: result,
                            stateIndex: stateIndex,
                            responseMsg: (result) ? `Valid! ${timing} / ${stateIndex}` : `Not valid! :( ${timing} / ${stateIndex}`
                        });
                    }, timing);
                }),
                alwaysShow: true,
                msg: 'Checking email...',
                view: {
                    default: { className: 'tip' },
                    success: { className: 'success', iconName: 'check' },
                    error: { className: 'error', iconName: 'close' }
                },
                callback: val => {
                    console.log(`callback, email ${val} is already taken`);
                }
            }
        }
    },
    password: {
        highlight: true, // enabled/disabled highlighting input field, default true
        validators: {
            regex: [
                {
                    pattern: /^[^\s]{7,}$/i,
                    msg: 'At least 7 characters',
                    alwaysShow: true,
                    view: {
                        default: {
                            className: 'tip',
                            iconName: 'close',
                        },
                        success: {
                            className: 'success',
                            iconName: 'check'
                        }
                    }
                },
                {
                    pattern: /[\d]+/i,
                    msg: 'At least one number',
                    alwaysShow: true,
                    view: {
                        default: {
                            className: 'tip',
                            iconName: 'close',
                        },
                        success: {
                            className: 'success',
                            iconName: 'check'
                        }
                    }
                },
                {
                    pattern: /[a-z]+/i,
                    msg: 'At least one letter',
                    alwaysShow: true,
                    break: true,
                    requiredAllChecks: true, // for continue validation after this validator need all successfully checks of previous
                    view: {
                        default: {
                            className: 'tip',
                            iconName: 'close',
                        },
                        success: {
                            className: 'success',
                            iconName: 'check'
                        }
                    }
                }
            ],
            custom: [
                {
                    check: (value, stateIndex) => new Promise((resolve, reject) => {
                        const min = 500;
                        const max = 5000;
                        const timing = Math.floor(Math.random() * (max - min) + min);
                        setTimeout(() => {
                            const isValid = (Math.round(Math.random())) ? true : false;
                            resolve({
                                valid: isValid,
                                stateIndex: stateIndex,
                                responseMsg: (isValid) ? 'valid!' : 'Not valid ;(('
                            });
                        }, timing);
                    }),
                    msg: 'Checking password...',
                    alwaysShow: true,
                    break: true,
                    view: {
                        default: { className: 'tip' },
                        success: { className: 'success', iconName: 'check' },
                        error: { iconName: 'close' }
                    },
                    callback: val => {
                        console.log(`callback, password is strong!`);
                    }
                },
                {
                    check: (value, stateIndex) => new Promise((resolve, reject) => {
                        const min = 500;
                        const max = 5000;
                        const timing = Math.floor(Math.random() * (max - min) + min);
                        setTimeout(() => {
                            const isValid = (Math.round(Math.random())) ? true : false;
                            resolve({
                                valid: isValid,
                                stateIndex: stateIndex,
                                responseMsg: (isValid) ? 'Last check is valid!' : 'Last fail...'
                            });
                        }, timing);
                    }),
                    msg: 'Last check...',
                    alwaysShow: true,
                    view: {
                        default: { className: 'tip' },
                        success: { className: 'success', iconName: 'check' },
                        error: { className: 'error', iconName: 'account' }
                    },
                    callback: val => {
                        console.log(`callback, last checking!`);
                    }
                },
            ]
        }
    }
}

export default formValidators;
