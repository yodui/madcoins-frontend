import Loader from '../Loader/Loader';
import Icon from '../Icon/Icon';

import './AlertItem.css';

const AlertItem = ({itemKey, msg, cls, iconName = false, loading = false}) => {
    console.log('itemKey:', itemKey);
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
    return <div key={itemKey} className={styles.join(' ')}>{box}<span>{msg}</span></div>
}

export default AlertItem;
