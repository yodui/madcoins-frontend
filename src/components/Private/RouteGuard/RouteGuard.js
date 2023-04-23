import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RouteGuard = ({component, redirect = '/signin'}) => {

    const auth = useSelector(store => store.auth);

    return auth.isAuth ? component : <Navigate to={redirect} />
}

export default RouteGuard;
