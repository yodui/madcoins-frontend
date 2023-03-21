import react, { useState, useEffect } from 'react';
import Icon from '../../Common/Icon/Icon';

import Switch from '../../Common/Switch/Switch';

import './DropDownItem.css';

const DropDownItem = ({iconName, text, type = 'normal', callback, component}) => {

    const cls = ['dropDownItem'];

    let control = '';
    if(component) {
        control = <span className='control'>{component}</span>
    }

    const labelProps = {};
    if(typeof callback === 'function') {
        labelProps.onClick = callback;
    }

    return <label className={cls.join(' ')} { ...labelProps} >
        <Icon name={iconName} size={20} />
        <span className='text'>{text}</span>
        {control}
    </label>
}

export default DropDownItem;
