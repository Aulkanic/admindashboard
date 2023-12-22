import React, { useState } from 'react'
import { LazyImage } from '../../../components/Images/image'
import MYDO from '../../../Images/mydo.jpg';
import { Email } from '../../../components/InputFields/email';
import { Password } from '../../../components/InputFields/password';
import CustomButton from '../../../components/Buttons/button';
import HandleSubmit from './Actions/login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [showPassword,setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginDetails,setLoginDetails] = useState({
        email:'',
        password: ''
    })
  const handleChange = (event) =>{
    setLoginDetails({...loginDetails,[event.target.name]: event.target.value})
  }
  const handleLogin = async(e) =>{
    e.preventDefault();
    const { email,password } = loginDetails;
    await HandleSubmit(email,password,setLoading,dispatch,navigate)
  }
  return (
    <div className='bg-linearColor w-screen h-screen flex justify-center items-center'>
       <div className='bg-white w-4/6 h-2/3 rounded-md flex flex-nowrap'>
         <div className='hidden md:flex bg-mydo-logo h-full w-1/2'>
            <LazyImage
             images={MYDO}
            />
         </div>
         <div className='w-full h-full gap-4 md:w-1/2 flex flex-col justify-center items-center p-4'>
            <div className='flex flex-col justify-start items-start'>
              <h2 className='text-4xl font-extrabold'>Welcome Admin</h2>
              <p className='mb-6 truncate text-md font-normal text-gray-500'>Sign in to your Account</p>
            </div>
            <div className='w-full flex flex-col gap-2'>
                <div className='w-full'>
                    <Email
                    value={loginDetails.email}
                    onChange={handleChange}
                    name={'email'}
                     />
                </div>
                <div>
                    <Password 
                    name={'password'}
                    value={loginDetails.password}
                    onChange={handleChange}
                    onClick={(e) => setShowPassword(!showPassword)}
                    show={showPassword}
                    />
                </div>
                <div>
                    <CustomButton
                     label={'Signin'}
                     color={'blue'}
                     loading={loading}
                     onClick={handleLogin}
                     loadingLabel={'Signing...'}
                    />
                </div>
            </div>
         </div>
       </div>
    </div>
  )
}
