import React from "react";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";

const AuthGuard = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const { isAuthenticated } = useSelector((state) => state.login)
    const Auth = isAuthenticated;

    if (!Auth) {
        // Display the swal alert
        swal({
          title: 'UnAuthorized Access!!',
          text: 'Please Login first to Continue',
          icon: 'error',
        }).then(() => {
          // After swal alert is closed, navigate to the login page
          navigate('/', { state: { from: location }, replace: true });
        });
    
        // Return null to prevent rendering while swal is open
        return null;
      }
    
      return <Outlet />;
    
}

export default AuthGuard