import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { RouteUrl } from '../Routes/routes';
import _ from 'lodash';
import { useSelector } from 'react-redux';

const Public = () => {
  const admin = useSelector((state) => state.login)
  return (admin.admin.length > 0) ? (
    <Navigate to={RouteUrl.DASHBOARD} replace />
  ) : (
    <Outlet />
  )
}

export default Public