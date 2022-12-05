import React from 'react';
import './box.css';


const Box = ({children, className}) => {
    return (
        <div className={['box',className].join(' ')}>
            {children}
        </div>
    )
}

export default Box;
