import './UserAva.css';
import { M, S } from '../../../constants/common';


const UserAva = ({email, size = M}) => {
    const cls = ['userAva', size];
    // get two first characters for ava
    const sign = email.slice(0,2);
    return <div className={cls.join(' ')}>{sign}</div>
}

export default UserAva;
