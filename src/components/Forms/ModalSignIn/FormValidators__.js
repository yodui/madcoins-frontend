const formValidators__ = {
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
            }
        }
    }
}

export default formValidators;
