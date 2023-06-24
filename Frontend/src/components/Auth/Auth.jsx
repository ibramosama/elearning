import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext";
import React from 'react'

const Auth = ({ allowedRoles }) => {
    const {authUser} = useContext(AuthContext);
    const location = useLocation();
    
    console.log(authUser);
    return (
        // 
        authUser.role.find(role => allowedRoles?.includes(role))
        ? <Outlet/>
        : authUser?.name
            ? <Navigate to="/unauthorized" state={{ from: location}} replace/>
            : <Navigate to="/register" state={{from: location}} replace/>
    )
}

export default Auth;