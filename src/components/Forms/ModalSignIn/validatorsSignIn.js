const validatorsSignIn = {
    email: {
        validators: {
            required: {
                msg: 'Email is required field',
                break: true
            },
            isEmail: {
                msg: 'Syntax email is not valid',
                break: true
            }
        }
    },
    password: {
        highlight: true,
        validators: {
            required: {
                msg: 'Password is required field',
                break: true
            }
        }
    }
}

export default validatorsSignIn;
