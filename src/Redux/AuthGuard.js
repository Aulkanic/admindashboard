import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";

const AuthGuard = () => {
    const location = useLocation();
    const { Auth } = useSelector((state) => state.login)
    const isAuthenticated = Auth;

    return (
        isAuthenticated === true ? <Outlet/> :  
        swal({
            title: 'UnAuthorized Access!!',
            text: 'Please Login first to Continue',
            icon: "error",
          }) && <Navigate to='/' state={{ from: location }} replace/>
    )
    
}

export default AuthGuard