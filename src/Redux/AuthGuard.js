import React from "react";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";

const AuthGuard = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const { isAuthenticated,admin  } = useSelector((state) => state.login)
    const Auth = isAuthenticated;


    if (!Auth) {
      swal({
        title: 'Unauthorized Access!!',
        text: 'Please login first to continue.',
        icon: 'error',
      }).then(() => {
        navigate('/', { state: { from: location }, replace: true });
      });
  
      // Return a placeholder while redirecting
      return null;
    }
  
    
      return <Outlet />;
    
}

export default AuthGuard