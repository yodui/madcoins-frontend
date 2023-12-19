import react, { useRef, useState, useEffect } from 'react';
import { useOutsideClick } from '../../../hooks/useOutsideClick';

import './DropDown.css';

const DropDown = ({isOpened, trigger, menuItems, placement}) => {

    console.log('Redner DropDown');
    const [opened, setOpened] = useState(isOpened);

    const cls = ['dropDown', opened ? 'opened' : 'closed'];

    const closeDropDown = () => toggleDropDown(false);

    const toggleDropDown = (mode) => setOpened(mode);

    // listen outside clicks for close dropdown menu
    const ref = useRef();
    useOutsideClick(ref, closeDropDown);

    return <div className='dropDownWrapper' ref={ref}>
        <span className='trigger' onClick={() => toggleDropDown(!opened)}>{trigger}</span>
        <div className={ cls.join(' ') }>
            <ul className='menuItems'>
                { menuItems.map((menuItem, index) => {
                    return <li key={index} onClick={ () => { (menuItem.props.closeTrigger === true) && closeDropDown() } }>{menuItem}</li>
                }) }
            </ul>
        </div>
    </div>
}

export default DropDown;
