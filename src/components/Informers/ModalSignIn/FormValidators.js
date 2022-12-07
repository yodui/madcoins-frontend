const formValidators = {
    email: {
        realtime: false,
        validators: {
            required: {
                msg: 'Email is required field',
                break: true
            },
            isEmail: {
                msg: 'Syntax email is not valid',
                break: true
            },
            custom: {
                check: () => false,
                msg: 'Email is already taken',
                callback: val => {
                    console.log(`callback, email ${val} is already taken`);
                }
            }
        }
    },
    password: {
        highlight: true, // [false,true] - enabled/disabled highlight field, default true
        highlightWhenSubmitted: true, // [false,true] - true - highlight field only when form was submitted
        validators: {
            regex: [
                {
                    pattern: /^[^\s]{7,}$/i,
                    msg: 'At least 7 characters',
                    alwaysShow: true,
                    default: {
                        className: 'tip',
                        iconName: 'close',
                    },
                    completed: {
                        className: 'completed',
                        iconName: 'check'
                    }
                },
                {
                    pattern: /[\d]+/i,
                    msg: 'At least one number',
                    alwaysShow: true,
                    realtime: true,
                    default: {
                        className: 'tip',
                        iconName: 'close',
                    },
                    completed: {
                        className: 'completed',
                        iconName: 'check'
                    }
                },
                {
                    pattern: /[a-z]+/i,
                    msg: 'At least one letter',
                    realtime: true,
                    alwaysShow: true,
                    default: {
                        className: 'tip',
                        iconName: 'close',
                    },
                    completed: {
                        className: 'completed',
                        iconName: 'check'
                    }
                }
            ]
        }
    }
}

export default formValidators;
