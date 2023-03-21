import React, { useState, useEffect, useRef } from 'react';
import './InputLabel.css';
import Icon from '../Icon/Icon';
import { hasErrors } from '../../../hooks/useForm';
import Loader from '../Loader/Loader';
import { isPromise } from '../../../functions/Utilites';

const correctTypes = ['text','password','email','hidden'];


const InputLabel = ({name, label, value, type, autoFocus, rightIcon, leftIcon, onChange, highlight, alerts}) => {

    // input type
    const [inputType, setInputType] = useState();
    // focus state of field
    const [focus, setFocus] = useState(false);

    // visibility characters in text field (actual for password type)
    const [textVisibility, setTextVisibility] = useState(false);

    const [containerStyles, setContainerStyles] = useState(['containerInput']);

    const inputElement = useRef(null);

    let hasErr = false;

    useEffect(() => {
        // set input type
        if(!correctTypes.includes(type)) {
            type=correctTypes[0];
        }
        setInputType(type);
    }, []);

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

                if(a.view) {
                    if(a.view.default) {
                        if(a.view.default.className) cls = [...cls, a.view.default.className];
                        if(a.loading === false) {
                            if(a.view.default.iconName) box = <Icon name={a.view.default.iconName} />;
                        } else {
                            box = <span className="loaderWrapper"><Loader size="small" /></span>;
                        }
                    }
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

    useEffect(() => {
        // actual only from password type
        if(type === 'password') {
            (textVisibility) ? setInputType('text') : setInputType('password');
        }
    }, [textVisibility]);

    const toggleContainerStyle = (flag, cls) => {
        const actualStyles = new Set([...containerStyles]);
        (flag) ? actualStyles.add(cls) : actualStyles.delete(cls);
        // update styles
        setContainerStyles([...actualStyles]);
    }

    useEffect(() => {
        toggleContainerStyle(focus, 'focus');
    }, [focus]);

    useEffect(() => {
        const hasErr = hasErrors(alerts);
        if(highlight && hasErr) {
            // toggle highlight
            toggleContainerStyle(true, 'errors');
        } else {
            toggleContainerStyle(false, 'errors');
        }
    }, [alerts, highlight])

    const renderRightIcon = () => {
        if(rightIcon) {
            return <span className='iconDest rightIcon'><Icon name={rightIcon} /></span>
        } else if(type == 'password') {
            return <button className='iconDest rightIcon switcher' type='button' onClick={ () => setTextVisibility(!textVisibility) }><Icon name={(textVisibility) ? 'eye' : 'eye-off'} /></button>
        }
    }

    const renderLeftIcon = () => {
        if(leftIcon) {
            return <span className='iconDest leftIcon'><Icon name={leftIcon} /></span>
        }
    }

    const eventHandlers = () => {

        const handleBlur = () => setFocus(false);
        const handleFocus = () => setFocus(true);

        return {
            onChange: onChange,
            onFocus: handleFocus,
            onBlur: handleBlur
        }
    }

    return <div className={ containerStyles.join(' ') }>
        <label>
            <span className='labelText'>{label}</span>
            <div className="fieldWrapper">
                {renderLeftIcon()}
                <input autoComplete='Off' ref={inputElement} {...eventHandlers()} className='input' name={name} value={value} type={inputType} />
                {renderRightIcon()}
            </div>
        </label>
        {(alerts) && showAlerts()}
    </div>
}

export default InputLabel;
