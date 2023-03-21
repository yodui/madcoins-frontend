import react, { useState } from 'react';

const Switch = ({checked, callback}) => {

    const [isChecked, setChecked] = useState(checked);

    const onChangeHandler = async () => {
        let result = await callback();
        if(typeof result === 'undefined') {
            result = !isChecked;
        }
        setChecked(result);
    }

    return <div className='switch'><input checked={isChecked} type="checkbox" onChange={onChangeHandler} /><span className=''></span></div>
}

export default Switch;
