import React, { useState, useEffect } from 'react';

const useForm = (handleSubmitCallback, fields) => {

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({});
    const [options, setOptions] = useState(fields);
    const [isSubmitted, setSubmitted] = useState(false);

    const validators = {
        required: fieldName => (!values[fieldName]) ? false : true,
        regex: fieldName => {
            if(options[fieldName].validators.regex.pattern) {
                const pattern = options[fieldName].validators.regex.pattern;
                return pattern.test(values[fieldName]);
            }
            return false;
        },
        isEmail: fieldName => {
            const emailPattern = /^([a-z0-9\-_]+(\.)?)+@(([a-z0-9\-]+(\.)?)+\.[a-z]{2,})$/i;
            return emailPattern.test(values[fieldName]);
        },
        custom: fieldName => {
            const checkFn = options[fieldName].validators.custom.check;
            if(typeof checkFn === 'function') {
                return checkFn(values[fieldName]);
            }
            return false;
        }
    }

    useEffect(() => {
        // init field values
        const cacheValues = {};
        Object.keys(options).forEach(fieldName => cacheValues[fieldName] = '');
        setValues(cacheValues);
    }, []);

    const handleChange = (e) => {
        e.persist();
        setSubmitted(false);
        let fieldName = e.target.name;
        let val = e.target.value;
        setValues({...values,[fieldName]:val});
    }

    useEffect(() => {
        // calculate errors, depends on values
        let rErrors = {};
        Object.keys(values).forEach(fieldName => {
            rErrors = {...rErrors, ...validate(fieldName)};
        });
        console.log('E:', rErrors);
        setErrors(rErrors);
    }, [values]);

    const validate = function (fieldName) {
        if(options[fieldName]) {
            const cErrors = {};
            const opt = options[fieldName];

            // check validators chain
            for(let vName in opt.validators) {
                let isValid = true;
                let conditionCheck = true;
                const validator = opt.validators[vName];
                // check exists validator
                if(validators[vName]) {
                    // check exists condition
                    const conditionFn = opt.validators[vName]['condition'];
                    if(typeof conditionFn === 'function') {
                        conditionCheck = conditionFn(values[fieldName]);
                        console.log('conditionCheck:', conditionCheck);
                    }
                    if(conditionCheck) {
                        if(!validators[vName](fieldName)) {
                            isValid = false;
                            if(!cErrors[fieldName]) cErrors[fieldName] = [];
                            cErrors[fieldName] = [...cErrors[fieldName], validator.msg];
                        } else {
                            // call callback if exists
                            (typeof validator.callback === 'function') && validator.callback(values[fieldName]);
                            if(cErrors.hasOwnProperty(fieldName)) {
                                delete cErrors[fieldName];
                            }
                        }
                    }

                } else {
                    // unknown validator
                    console.log(`Unknown validator type: ${vName}`);
                }
                if(!isValid && validator.break) break;
            }
            return cErrors;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        handleSubmitCallback();
    }

    const register = (fieldName) => {
        const opt = options[fieldName];
        return {
            name: fieldName,
            onChange: handleChange,
            errors: (isSubmitted || opt.realtime) && errors[fieldName]
        }
    }

    return {
        values,
        errors,
        handleSubmit,
        register
    }
}

export default useForm;
