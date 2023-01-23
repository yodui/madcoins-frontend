import react from 'react';
import './DropDown.css';

const DropDown = ({open, trigger, menuItems, placement}) => {

    const cls = ['dropDown', open ? 'opened' : 'closed'];

    return <div className='dropDownWrapper'>
        <span className='trigger'>{trigger}</span>
        <div className={ cls.join(' ') }>
            <ul className='menuItems'>
                { menuItems.map((menuItem, index) => <li key={index}>{menuItem}</li>) }
            </ul>
        </div>
    </div>
}

export default DropDown;
