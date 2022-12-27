import React, { useState, useEffect, useRef } from 'react';
import { isPromise, flatCopy } from '../functions/Utilites';

const useForm = (handleSubmitCallback, options) => {

    const fields = Object.keys(options);
    // last checked indexes in chain of falidators
    const lastCheckedInChain = {};
    // validation state of chain
    const isChainValid = {};
    // unique state index of chain
    const chainStateIndex = useRef();

    const [validators, setValidators] = useState({});
    const [alerts, setAlerts] = useState({});

    const [values, setValues] = useState({});
    const [isSubmitted, setSubmitted] = useState(false);

    const pValues = useRef();

    const processors = {
        required: (v) => {
            return { valid: (!values[v.fieldName]) ? false : true }
        },
        regex: (v) => {
            if(v.options.pattern) {
                return { valid: v.options.pattern.test(values[v.fieldName]) };
            }
            return { valid: false };
        },
        isEmail: (v) => {
            const emailPattern = /^([a-z0-9\-_]+(\.)?)+@(([a-z0-9\-]+(\.)?)+\.[a-z]{2,})$/i;
            return { valid: emailPattern.test(values[v.fieldName]) };
        },
        custom: (v) => {
            if(typeof v.options.check === 'function') {
                return {
                    valid: null,
                    requestId: chainStateIndex[v.fieldName],
                    promise: v.options.check(values[v.fieldName], chainStateIndex[v.fieldName])
                };
            }
            return { valid: null };
        }
    }

    useEffect(() => {
        const initialValues = {};
        fields.forEach(fieldName => initialValues[fieldName] = '');
        setValues(initialValues);
        setValidators(initValidators());
    }, []);

    useEffect(() => {
        fields.forEach(fieldName => {
            // validatate only if value has been changed
            if(!pValues.current || values[fieldName] != pValues.current[fieldName]) {
                // rest state of last checked index of validators in chain
                lastCheckedInChain[fieldName] = 0;
                // reset validation state of chain
                isChainValid[fieldName] = true;
                // change state index of chain
                chainStateIndex[fieldName]++;

                validateField(fieldName);
            }
        });
    }, [values]);

    useEffect(() => {
        updateAlerts();
    }, [validators, isSubmitted]);

    const handleChange = (e) => {
        e.persist();
        setSubmitted(false);
        let fieldName = e.target.name;
        let val = e.target.value;
        // save previous values for compare in future
        pValues.current = {...values};
        setValues({...values,[fieldName]:val});
    }

    const initValidators = () => {

        let validatorIndex = 0;
        let validators = {};

        fields.forEach(field => {

            validators[field] = [];

            if(options[field] && options[field].validators) {
                // we have validators for field
                // init last checked validator index in chain
                lastCheckedInChain[field] = 0;
                // init chain validation state for field
                isChainValid[field] = true;
                // init state index of chain
                chainStateIndex[field] = 0;

                const fieldValidators = options[field].validators;
                const types = Object.keys(fieldValidators);
                types.forEach(type => {
                    // check exists validator processor by type in hook
                    if(!processors[type]) return;

                    let validatorsByType = fieldValidators[type];
                    if(!Array.isArray(validatorsByType)) {
                        validatorsByType = [validatorsByType];
                    }
                    // save validator in checkList
                    validatorsByType.forEach(options => {
                        validators[field].push({
                            index: validatorIndex, // validator index
                            fieldName: field, // field name
                            type: type, // type of validator
                            loading: false, // loading state, for promises
                            valid: null, // valid state, deafult null
                            options: options, // validator options
                        });
                        validatorIndex++;
                    })
                });
            }
        });
        return validators;
    }

    const validateField = (fieldName) => {

        if(validators[fieldName]) {

            for(const v of validators[fieldName] ) {

                if(lastCheckedInChain[fieldName] > v.index) continue;

                const result = processors[v.type](v);

                let isValid = false;
                let loading = false;

                if(result.hasOwnProperty('promise') && isPromise(result.promise)) {
                    // set loading state of validator
                    loading = true;
                    result.promise.then((response) => processingResponse(response, v));
                } else {
                    // change validators by index, set result of validation
                    isValid = result.valid;
                }

                if(!result.valid) {
                    isChainValid[fieldName] = false;
                }

                updateValidator(fieldName, v.index, { ...result, loading: loading });
                lastCheckedInChain[fieldName] = v.index;

                if((v.options.break && !isValid) || (v.options.requiredAllChecks && !isChainValid[fieldName])) {
                    break;
                }
            }
        }

    }

    const processingResponse = (response, v) => {
        // if current response deprecated - drop it
        if(response.stateIndex == chainStateIndex[v.fieldName]) {
            updateValidator(v.fieldName, v.index, {...response, loading: false});
            // run remains in chain of validators
            lastCheckedInChain[v.fieldName] += 1;
            if(response.valid) {
                validateField(v.fieldName);
            }
        }
    }

    const updateAlerts = () => {

        let actualAlerts = {};

        fields.forEach(fieldName => {
            if(validators[fieldName]) {
                const fieldAlerts = [];
                let validChain = true;
                for(const v of validators[fieldName]) {
                    // Add alert when:
                    // 1. alwaysShow flag is true
                    // 2. validator state is false and form was submitted
                    if(v.options.alwaysShow || (v.valid === false && isSubmitted) || (v.loading === true)) {
                        fieldAlerts.push(mapValidatorToAlert(v));
                    }
                    if(v.valid !== true) validChain = false;
                    if((v.options.break && !v.valid) || (v.options.requiredAllChecks && !validChain)) break;
                }

                if(fieldAlerts.length) {
                    actualAlerts = {...actualAlerts, [fieldName]: fieldAlerts};
                }
            }
        });

        setAlerts(actualAlerts);
    }

    const updateValidator = (fieldName, index, result) => {
        const newValidators = {...validators};
        let validator = newValidators[fieldName].find(v => v.index === index);

        // required field
        validator.valid = result.valid;

        // optional fields
        // request Id
        if(result.hasOwnProperty('stateIndex')) {
            validator.stateIndex = parseInt(result.stateIndex);
        }

        // message
        if(result.hasOwnProperty('responseMsg')) {
            validator.options.responseMsg = result.responseMsg;
        } else {
            // remove field
            delete validator.options.responseMsg;
        }
        // loading
        if(result.hasOwnProperty('loading')) {
            validator.loading = result.loading;
        }

        setValidators(newValidators);
    }

    // forward properties from validator to alert
    const mapValidatorToAlert = (validator) => {

        let forwardedProps = {
            fields: ['valid','loading'],
            children: {
                options: {
                    fields: ['view','msg','responseMsg']
                }
            }
        };

        const alert = {...flatCopy(validator, forwardedProps)};

        return alert;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        handleSubmitCallback();
    }

    const inputProps = (fieldName) => {
        const opt = options[fieldName];
        return {
            name: fieldName,
            onChange: handleChange,
            alerts: alerts[fieldName],
            opt: {
                highlight: (!opt || opt.highlight || typeof opt.highlight === 'undefined') ? true : false,
                isSubmitted: isSubmitted
            }
        }
    }

    const validationState = () => {
        const state = {
            completed: true,
            valid: true
        }
        for(let field of fields) {
            // check completing for field
            if(Array.isArray(validators[field])) {
                for(let v of validators[field]) {
                    if(v.valid === null) {
                        state.completed = false;
                    }
                    if(v.valid !== true) {
                        state.valid = false;
                    }
                    if(!state.valid && !state.completed) break;
                }
                if(!state.valid && !state.completed) break;
            }
        }
        return state;
    }

    const submitProps = () => {
        const state = validationState();
        console.log(validators);
        console.log(state);
        return {
            isValidationCompleted: state.completed,
            isFormValid: state.valid
        }
    }

    return {
        values,
        validators,
        alerts,
        handleSubmit,
        inputProps,
        submitProps
    }
}

// Alert - structure with message for showing in form. It's contains result of validation (true/false), view options and other info
// some times we need to show tips, conditions for accepting a password and state of complete this conditions
// this method check exists errors in list of alerts for one field, alerts must be an array
const hasErrors = (alerts) => {

    if(typeof alerts !== 'object') {
        return false;
    }
    if(!Array.isArray(alerts)) {
        console.log('Error. Argument of method hasErrors must been array of alerts');
        return true;
    }
    const isValid = a => a.valid === true;
    return !alerts.every(isValid);
}

export {useForm, hasErrors};
