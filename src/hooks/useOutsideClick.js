import React, { useRef, useEffect } from 'react';

const useOutsideClick = (ref, callback) => {

    useEffect(() => {

        const listener = (event) => {
            if(ref.current && !ref.current.contains(event.target)) {
                callback(event);
            }
        };

        document.addEventListener('click', listener);
        document.addEventListener('touchstart', listener)

        return () => {
            document.removeEventListener('click', listener);
            document.removeEventListener('touchstart', listener);
        }
    }, [ref, callback]);
}

export {useOutsideClick}
