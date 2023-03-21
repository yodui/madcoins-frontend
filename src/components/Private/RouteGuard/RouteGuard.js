import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RouteGuard = ({children, redirect = '/signin'}) => {

    const auth = useSelector(store => store.auth);

    return auth.isAuth ? children : <Navigate to={redirect} />
}

export default RouteGuard;
