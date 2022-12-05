import React from 'react';
import { Navigate } from 'react-router-dom';

const RouteGuard = ({children, redirect = '/signin'}) => {
    const isAuth = null;

    return isAuth ? children : <Navigate to={redirect} />
}

export default RouteGuard;
