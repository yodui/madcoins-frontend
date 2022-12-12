const formValidators = {
    email: {
        validators: {
            required: {
                msg: 'Email is required field',
                realtime: true,
                break: true,
                callback: val => {
                    console.log('call!');
                }
            },
            isEmail: {
                msg: 'Syntax email is not valid',
                break: true
            },
            custom: {
                check: () => new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log('checked');
                        resolve(true);
                    }, 2000);
                }),
                realtime: true,
                msg: 'Email is already taken',
                callback: val => {
                    console.log(`callback, email ${val} is already taken`);
                }
            }
        }
    },
    password: {
        highlight: true, // enabled/disabled highlighting input field, default true
        highlightWhenSubmitted: true, // highlight input field only when form was submitted
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
                        completed: {
                            className: 'completed',
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
                        completed: {
                            className: 'completed',
                            iconName: 'check'
                        }
                    }
                },
                {
                    pattern: /[a-z]+/i,
                    msg: 'At least one letter',
                    alwaysShow: true,
                    view: {
                        default: {
                            className: 'tip',
                            iconName: 'close',
                        },
                        completed: {
                            className: 'completed',
                            iconName: 'check'
                        }
                    }
                }
            ]
        }
    }
}

export default formValidators;
