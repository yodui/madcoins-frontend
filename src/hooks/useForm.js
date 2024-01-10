import React, { useState, useEffect, useRef } from 'react';
import { isPromise, flatCopy } from '../functions/Utilites';

const useForm = (handleSubmitCallback, options, dispatch) => {

    const fields = Object.keys(options);
    // last checked indexes in chain of falidators
    const lastCheckedInChain = {};
    // validation state of chain
    const isChainValid = {};
    // unique state index of chain
    const chainStateIndex = useRef();

    const [validators, setValidators] = useState({});
    const [alerts, setAlerts] = useState({});
    const [generalAlert, setGeneralAlert] = useState(false);

    const [values, setValues] = useState({});

    // Form states
    // 1. isFormSubmitted - form was submitted, but this is not mean sended
    const [isFormSubmitted, setFormSubmitted] = useState(false);
    // 2. isFormSending - form is sending currently to backend endpoint
    const [isFormSending, setFormSending] = useState(false);

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
        resetValues();
        setValidators(initValidators());
    }, []);

    const resetValues = () => {
        const initialValues = {};
        fields.forEach(fieldName => initialValues[fieldName] = '');
        setValues(initialValues);
    }

    useEffect(() => {
        setGeneralAlert(false);
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
    }, [validators, isFormSubmitted]);

    const handleChange = (e) => {
        e.persist();
        setFormSubmitted(false);
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
                    result.promise.then((response) => validatorResponse(response, v));
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

    const validatorResponse = (response, v) => {
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
                    if(v.options.alwaysShow || (v.valid === false && isFormSubmitted) || (v.loading === true)) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormSubmitted(true);
        const state = validationState();

        try {
            if(state.completed && state.valid && !isFormSending) {
                // disable submit buttons when request is sending
                setFormSending(true);
                const response = await handleSubmitCallback(values, dispatch);
                // enable submit buttons
                if(response.hasOwnProperty('result') && response.result === false) {
                    // parse errors if exists
                    if(response.hasOwnProperty('errors')) {
                        parseBackendErrors(response.errors);
                    }
                }
            }
            setFormSending(false);

        } catch(err) {
            if(err.hasOwnProperty('message')) {
                setGeneralAlert(err.message);
            }
            setFormSending(false);
            return false;
        }
    }

    const parseBackendErrors = (fields) => {
        let backendAlerts = {};
        for(const [k, f] of Object.entries(fields)) {
            if(!backendAlerts[f.field]) backendAlerts[f.field] = [];
            for(let error of f.errors) {
                backendAlerts[f.field].push({ msg: error });
            }
        }
        setAlerts(backendAlerts);
    }

    const inputProps = (fieldName) => {
        const opt = options[fieldName];

        const highlight = opt.hasOwnProperty('highligh') && opt.highligh;
        const highlightOnSubmit = opt.hasOwnProperty('highlightOnSubmit') && opt.highlightOnSubmit;

        let needHighlight = false;
        if((highlightOnSubmit && isFormSubmitted) || highlight) {
            needHighlight = true;
        }

        return {
            name: fieldName,
            onChange: handleChange,
            alerts: alerts[fieldName],
            highlight: needHighlight
        }
    }

    const submitProps = () => {
        const state = validationState();
        return {
            isValidationCompleted: state.completed,
            isFormValid: state.valid,
            isLoading: isFormSending
        }
    }

    const handleReset = () => {
        resetValues();
        setFormSending(false);
        setFormSubmitted(false);
    }

    return {
        values,
        validators,
        alerts,
        handleSubmit,
        inputProps,
        submitProps,
        handleReset,
        generalAlert
    }
}

// Alert - object with message for showing in form. It's contains result of validation (true/false), view options etc.
// Some times we need to show tips, conditions for accepting and state of complete this conditions.
// Alert is not same as error.
// This method check exists errors in list of alerts for one field, alerts must be an array.
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
