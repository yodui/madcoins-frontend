import React from 'react';
import './InputLabel.css';
import Icon from '../Icon/Icon';
import {hasErrors} from '../../../hooks/useForm';

const InputLabel = ({name, label, value, type, onChange, alerts, opt}) => {

    const correctTypes = ['text','password','email','hidden'];

    if(correctTypes.indexOf(type) === -1) {
        type=correctTypes[0];
    }

    const clsInput = ['input'];

    const hasErr = hasErrors(alerts);
    console.log(alerts);

    console.log(opt, 'hasErr: ', hasErr);
    if(opt) {
        if(opt.highlight) {
            if (opt.isSubmitted) {
                //(hasErr) &&
                clsInput.push('hasErrors');
                //(!hasErr &&
                (Array.isArray(alerts) && alerts.length) && clsInput.push('hasAlerts');
            }
        }
        if(opt.isSubmitted) {
            clsInput.push('submitted');
        }
    }

    const filterAlerts = () => {
        // Show alerts in field when:
        // 1. Alert has 'alwaysShow' flag
        // 2. Alert is not walid and has 'realtime' flag
        // 3. If form was submitted and alert is not valid
        let filtered=[];
        if(Array.isArray(alerts)) {
            alerts.forEach(a => {
                if((opt.isSubmitted && !a.valid) || (a.realtime && !a.valid) || a.alwaysShow) {
                    filtered = [...filtered, a];
                }
            });
        }
        return filtered;
    }

    const showAlerts = () => {
        const showingAlerts = filterAlerts(alerts);
        if(!Array.isArray(showingAlerts) || !showingAlerts.length) {
            return;
        }

        return <div className='alerts'>
            { showingAlerts.map((a,i) => {
                let cls = ['aItem'];
                let icon;
                if(a.view && a.view.default) {
                    if(a.view.default.className) cls = [...cls, a.view.default.className];
                    if(a.view.default.iconName) icon = <Icon name={a.view.default.iconName} />;
                }
                if(a.view && a.view.completed && a.valid) {
                    if(a.view.completed.className) cls = [...cls, a.view.completed.className];
                    if(a.view.completed.iconName) icon = <Icon name={a.view.completed.iconName} />;
                }

                return <div key={i} className={cls.join(' ')}>{icon}<span>{a.msg}</span></div>
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
