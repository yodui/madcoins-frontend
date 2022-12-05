import React from 'react';
import './InputLabel.css';

const InputLabel = ({name, label, value, type, onChange, errors}) => {

    const correctTypes = ['text','password','email','hidden'];

    if(correctTypes.indexOf(type) === -1) {
        type=correctTypes[0];
    }

    const clsInput = ['input'];
    if(typeof errors === 'object') { clsInput.push('error'); }

    const showErrors = () => {
        console.log(errors);
        return <div className='errors'>
            { typeof errors === 'object' && errors.map((e,i) => <div key={i} className='errorMsg'>{e}</div>) }
        </div>
    }

    return <div className='inputLabel'>
        {(errors) && showErrors()}
        <input className={ clsInput.join(' ') } name={name} value={value} type={type} onChange={onChange} />
        <label>{label}</label>
    </div>
}

export default InputLabel;
