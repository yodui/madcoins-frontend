import React, { useState, useEffect, useRef } from 'react';

const useForm = (handleSubmitCallback, options) => {

    const initialValues = {};
    Object.keys(options).forEach(fieldName => initialValues[fieldName] = '');

    const [alerts, setAlerts] = useState({});
    const [values, setValues] = useState(initialValues);
    const [isSubmitted, setSubmitted] = useState(false);

    const pValues = useRef();

    const validators = {
        required: fieldName => (!values[fieldName]) ? false : true,
        regex: (fieldName, params) => {
            if(params.pattern) {
                return params.pattern.test(values[fieldName]);
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

    const handleChange = (e) => {
        e.persist();
        setSubmitted(false);
        let fieldName = e.target.name;
        let val = e.target.value;
        // save previous values for compare in future
        pValues.current = {...values};
        setValues({...values,[fieldName]:val});
    }

    useEffect(() => {
        // calculate and collected alerts, depends on values
        let collectedAlerts = alerts;
        Object.keys(values).forEach(fieldName => {
            // validatate only if value has been changed
            if(!pValues.current || values[fieldName] != pValues.current[fieldName]) {
                let fieldAlerts = validate(fieldName);
                if(fieldAlerts.length) {
                    collectedAlerts = {...collectedAlerts, [fieldName]: fieldAlerts};
                } else {
                    // clear old field alerts
                    delete collectedAlerts[fieldName];
                }
            }
        });
        console.log(collectedAlerts);
        setAlerts(collectedAlerts);
    }, [values]);

    const validate = function (fieldName) {

        if(options[fieldName]) {
            let fieldAlerts = [];
            const opt = options[fieldName];
            // check validators chain
            for(let vName in opt.validators) {
                let isValid = true;
                // check exists validator in hook
                if(validators[vName]) {
                    // collect alerts by validator
                    let vAlerts = [];
                    let setOfValidators;
                    // wrap one validator in array
                    if(Array.isArray(opt.validators[vName])) {
                        setOfValidators = opt.validators[vName];
                    } else {
                        setOfValidators = [opt.validators[vName]];
                    }

                    // this is set of validators
                    setOfValidators.map(params => {
                        const alert = run(vName, fieldName, params);
                        if(alert) {
                            if(!alert.valid) {
                                isValid = false;
                            }
                            vAlerts = [...vAlerts, alert];
                        }
                    });

                    if(vAlerts.length) {
                        fieldAlerts = [...fieldAlerts, ...vAlerts];
                    }

                } else {
                    // unknown validator
                    console.log(`Unknown validator type: ${vName}`);
                }
                if(!isValid && opt.validators[vName].break) break;
            }
            return fieldAlerts;
        }
    }

    const run = function (vName, fieldName, params) {

        const opt = options[fieldName];
        const validator = params;
        let conditionCheck = true;

        // check exists condition for validation
        const conditionFn = validator['condition'];
        if(typeof conditionFn === 'function') conditionCheck = conditionFn(values[fieldName]);

        if(conditionCheck) {
            // validate
            const validationResult = validators[vName](fieldName, params);

            if(!validationResult || validator.alwaysShow) {
                const alert = {'msg': validator.msg};
                if(validator.default) {
                    // we have view options, copy it for render later
                    alert.default = structuredClone(validator.default);
                }
                if(validator.completed) {
                    // we have view options, copy it for render later
                    alert.completed = structuredClone(validator.completed);
                }
                // add validation result if we have always show error
                if(validator.alwaysShow) alert.valid = validationResult;

                return alert;
            } else {
                // call callback if exists and validation is successfully
                (typeof validator.callback === 'function') && validator.callback(values[fieldName]);
            }

        }
        return false;
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
            alerts: alerts[fieldName],
            opt: {
                highlight: (opt.highlight || typeof opt.highlight === 'undefined') ? true : false,
                isSubmitted: isSubmitted,
                highlightWhenSubmitted: (opt.highlightWhenSubmitted) ? true : false
            }
        }
    }

    return {
        values,
        alerts,
        handleSubmit,
        register
    }
}

// alert - not same as error
// we can get a list of alerts, but not errors
// this method check exists errors in form
const hasErrors = (alerts) => {

    if(typeof alerts !== 'object') {
        return false;
    }
    if(!Array.isArray(alerts)) {
        console.log('Error. Argument of method hasErrors must been array of alerts');
        return true;
    }
    let check = false;
    alerts.every(a => {
        if(!a.valid) {
            check = true;
            return false;
        }
    });
    return check;
}

export {useForm, hasErrors};
