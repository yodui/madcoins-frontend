import { emailExists } from './validationFunctions.js';

const validatorsSignUp = {
    email: {
        highlightOnSubmit: true,
        validators: {
            required: {
                msg: 'Email is required field',
                realtime: true,
                break: true
            },
            isEmail: {
                msg: 'Syntax email is not valid',
                realtime: true,
                break: true
            },
            custom: {
                check: emailExists,
                alwaysShow: true,
                msg: 'Checking email...',
                view: {
                    default: { className: 'tip' },
                    success: { className: 'success', iconName: 'check' },
                    error: { className: 'error', iconName: 'close' }
                }
            }
        }
    },
    invite: {
        highlightOnSubmit: true,
        validators: {
            required: {
                msg: 'Invite is required field in α',
                realtime: true,
                break: true
            },
            regex: {
                pattern: /^[a-fx][\d]{3,7}$/i,
                msg: 'Syntax invite code is not valid',
                realtime: true
            }
        }
    },
    password: {
        highlightOnSubmit: true,
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
            ]
        }
    }
}

export default validatorsSignUp;
