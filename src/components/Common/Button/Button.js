import React from 'react';
import Icon from '../Icon/Icon';
import './Button.css';

const Button = ({name, label, value, variant, className, onClick, isValidationCompleted = true, isFormValid = true, leftIcon = false, rightIcon = false}) => {

    const icon = {
        left: (leftIcon) ? <Icon name={leftIcon} /> : null,
        right: (rightIcon) ? <Icon name={rightIcon} /> : null
    };

    const correctVariants = ['contained','outlined','primary','text'];
    if(correctVariants.indexOf(variant) === -1) {
        variant = correctVariants[0];
    }

    let buttonCls = ['button'];
    buttonCls.push(variant);
    (className) && buttonCls.push(className);

    return <button onClick={onClick} className={buttonCls.join(' ')} name={name} value={value}>
        <span className='content'>{icon.left}{label} {(isValidationCompleted === true) ? '✓' : '?'} {(isFormValid === true) ? '✓' : '?'} {icon.right}</span>
    </button>
}

export default Button;
