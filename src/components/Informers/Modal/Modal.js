import React from 'react';
import Icon from '../../Common/Icon/Icon';
import './Modal.css';

const Modal = ({children, name, show, className, handleClose}) => {

    let wrapperCls = ['modalWrapper'];
    let modalCls = ['modal'];
    let backdropCls = ['backdrop'];

    (className) && wrapperCls.push(className);

    if(show) {
        modalCls = [...modalCls, 'show'];
        backdropCls = [...backdropCls, 'show'];
    }

    return <div className={wrapperCls.join(' ')}>
        <div className={modalCls.join(' ')}>
            <div className='modalHeader'>
                <span className='modalName'>{name}</span>
                <span onClick={handleClose} className='closeModal'><Icon name='close' /></span>
            </div>
            <div className='modalBody'>
                {children}
            </div>
        </div>
        <div className={backdropCls.join(' ')} onClick={handleClose} />
    </div>
}

export default Modal;
