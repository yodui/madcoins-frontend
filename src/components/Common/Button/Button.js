import React from 'react';
import Icon from '../Icon/Icon';
import './Button.css';
import Loader from '../Loader/Loader';

const Button = ({name, label, value, variant = 'primary', disabled, className, onClick, isValidationCompleted = true, isFormValid = true, isLoading, leftIcon = false, rightIcon = false}) => {

    const icon = {
        left: (isLoading) ? <span className='loaderWrapper'><Loader size='small' theme='white' /></span> : (leftIcon) ? <Icon name={leftIcon} /> : null,
        right: (rightIcon) ? <Icon name={rightIcon} /> : null
    };

    const correctVariants = ['contained','outlined','primary','text'];
    if(correctVariants.indexOf(variant) === -1) {
        variant = correctVariants[0];
    }

    let buttonCls = ['button', variant];
    (className) && buttonCls.push(className);

    return <button onClick={onClick} className={buttonCls.join(' ')} name={name} value={value}>
        <span className='content'>{icon.left}{label}{icon.right}</span>
    </button>
}

export default Button;
