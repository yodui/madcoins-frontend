import React from 'react';
import Icons from '../../../assets/icons.svg';

const Icon = ({name, size = 20, hanldeClick}) => {

    return <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-${name}`} width={size+'px'} height={size+'px'}>
        <use xlinkHref={`${Icons}#icon-${name}`} />
    </svg>
}

export default Icon;
