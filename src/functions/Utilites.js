const flatCopy = (obj, props) => {
    let result = {};

    const fields = props.fields;
    const children = props.children;

    for(let f of fields) {
        if(typeof obj[f] !== 'undefined') {
            if(typeof obj[f] === 'object') {
                result[f] = structuredClone(obj[f]);
            } else {
                result[f] = obj[f];
            }
        }
    }

    // check children
    if(typeof children === 'object') {
        Object.keys(children).forEach(k => {
            if(obj[k]) {
                result = {...result, ...flatCopy(obj[k], children[k])};
            }
        });
    }

    return result;
};


const isPromise = p => (typeof p === 'object' && typeof p.then === 'function') ? true : false;


export {isPromise, flatCopy};
