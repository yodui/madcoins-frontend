import React from 'react';
import './Loader.css';

const Loader = (props) => {

    const {size} = props;

    const sizes = ['small','medium'];

    if(sizes.indexOf(size) === -1) {
        console.log('Wrong loader size settings');
        size = sizes[1]; // medium
    }

    const renderOutline = () => {
        return <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" >
            <rect width="24" height="24" stroke="#344549" strokeWidth="12" />
        </svg>
    }

    const cls = ['loader', size];
    return <div className={ cls.join(' ') }>
        <div className='cavern'>
            { renderOutline() }
            <div className='worm'></div>
        </div>
    </div>
}

export default Loader;
