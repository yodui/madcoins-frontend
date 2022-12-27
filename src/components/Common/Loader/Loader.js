import React from 'react';
import './Loader.css';

const Loader = (props) => {

    let {size, theme} = props;

    const sizes = ['small', 'medium'];
    const themes = ['white', 'dark'];

    if(!size || !sizes.includes(size)) size = sizes[1]; // medium size by default
    if(!theme || !themes.includes(theme)) theme = themes[1]; // dark theme by default

    const cls = ['loader', size, theme];

    return <svg className={ cls.join(' ') } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21" >
        <g transform="translate(1.5,1.5)">
            <rect className="cavern" width="18" height="18" strokeWidth="3" />
            <rect className="worm" width="18" height="18" strokeWidth="3" />
        </g>
    </svg>
}

export default Loader;
