import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const { status } = useSelector((state) => state.auth);

    return status ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
