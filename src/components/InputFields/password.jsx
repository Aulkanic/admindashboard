import React from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export const Password = ({name,onChange,value,onClick,show,label}) => {
  return (
    <div className="mb-6">
        <label for="password" classNae="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label ? label : "Password"}</label>
        <div className='relative'>
            <input type={show ? 'text' : 'password'} id="password" name={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com" value={value} onChange={onChange} required  />
            <button className='border-0 bg-transparent absolute right-2 top-3'
                onClick={onClick}
                type='button'
                >
                  { show ? <FaEye className='text-lg'/> 
                         : <FaEyeSlash className='text-lg'/>}
            </button>
        </div>

    </div> 
  )
}
