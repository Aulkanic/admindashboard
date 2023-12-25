import React, { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'
import { RouteUrl } from '../Routes/routes'
import _ from 'lodash'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Private = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const admin = useSelector((state) => state.login)
   console.log(admin)
  return  (admin.admin.length === 0) ? (<Navigate replace to={RouteUrl.LOGIN} />) : (
    <div className='flex'>
      <Sidebar />
      <div className='w-full overflow-x-hidden flex flex-col flex-wrap'>
      <Navbar />
      <div className='w-full'>
       <Outlet />
      </div>
      </div>

    </div>
  )
}

export default Private