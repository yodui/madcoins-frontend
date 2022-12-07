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

    if(opt) {
        if(opt.highlight) {
            if ((opt.highlightWhenSubmitted && opt.isSubmitted) || !opt.highlightWhenSubmitted) {
                (hasErr) && clsInput.push('hasErrors');
                (!hasErr && Array.isArray(alerts) && alerts.length) && clsInput.push('hasAlerts');
            }
        }
        if(opt.isSubmitted) {
            clsInput.push('submitted');
        }
    }

    const showAlerts = () => {
        return <div className='alerts'>
            { Array.isArray(alerts) && alerts.map((a,i) => {
                let cls = ['aItem'];
                let icon;
                if(a.default) {
                    if(a.default.className) cls = [...cls, a.default.className];
                    if(a.default.iconName) icon = <Icon name={a.default.iconName} />;
                }
                if(a.valid && a.completed) {
                    if(a.completed.className) cls = [...cls, a.completed.className];
                    if(a.completed.iconName) icon = <Icon name={a.completed.iconName} />;
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
