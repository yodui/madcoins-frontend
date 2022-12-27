import React, { useState, useEffect } from 'react';
import './InputLabel.css';
import Icon from '../Icon/Icon';
import {hasErrors} from '../../../hooks/useForm';
import Loader from '../Loader/Loader';
import {isPromise} from '../../../functions/Utilites';

const InputLabel = ({name, label, value, type, onChange, alerts, opt}) => {

    const correctTypes = ['text','password','email','hidden'];

    let hasErr = false;

    if(correctTypes.indexOf(type) === -1) {
        type=correctTypes[0];
    }

    const clsInput = ['input'];

    useEffect(() => {
        hasErr = hasErrors(alerts);
    }, []);

    if(opt) {
        if(opt.highlight) {
            if (opt.isSubmitted) {
                hasErr && clsInput.push('hasErrors');
                (!hasErr && Array.isArray(alerts) && alerts.length) && clsInput.push('hasAlerts');
            }
        }
        if(opt.isSubmitted) {
            clsInput.push('submitted');
        }
    }

    const showAlerts = () => {

        if(!Array.isArray(alerts) || !alerts.length) {
            return;
        }

        return <div className='alerts'>
            { alerts.map((a,i) => {
                let cls = ['aItem'];
                let box;
                let msg = a.msg;
                if(a.responseMsg) {
                    msg = a.responseMsg;
                }
                if(a.view && a.view.default) {
                    if(a.view.default.className) cls = [...cls, a.view.default.className];
                    if(a.loading === false) {
                        if(a.view.default.iconName) box = <Icon name={a.view.default.iconName} />;
                    } else {
                        box = <span className="loaderWrapper"><Loader size="small" /></span>;
                    }
                }
                if(a.view) {
                    if(a.valid === true && a.view.success) {
                        if(a.view.success.className) cls = [...cls, a.view.success.className];
                        if(a.view.success.iconName) box = <Icon name={a.view.success.iconName} />;
                    } else if (a.valid === false && a.view.error) {
                        if(a.view.error.className) cls = [...cls, a.view.error.className];
                        if(a.view.error.iconName) box = <Icon name={a.view.error.iconName} />;
                    }
                }
                return <div key={i} className={cls.join(' ')}>{box}<span>{msg}</span></div>
            }) }
        </div>

    }

    return <div className='inputLabel'>
        {(alerts) && showAlerts()}
        <input className={ clsInput.join(' ') } name={name} value={value} type={type} onChange={onChange} />
        <label>{label}</label>
    </div>
}

export default InputLabel;
