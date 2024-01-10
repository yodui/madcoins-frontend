import Loader from '../Loader/Loader';
import Icon from '../Icon/Icon';

import './AlertItem.css';

const AlertItem = ({msg, cls, iconName = false, loading = false}) => {
    let styles = ['aItem'];
    if(cls && Array.isArray(cls)) {
        styles = [...styles, ...cls];
    }
    let box;
    if(loading === true) {
        box = <span className="loaderWrapper"><Loader size="small" /></span>;
    } else {
        if(iconName) box = <Icon name={iconName} />;
    }
    return <div className={styles.join(' ')}>{box}<span>{msg}</span></div>
}

export default AlertItem;
