import React from 'react'

export const Email = ({name,value,onChange,error}) => {
  return (
    <div>
        <label for="email" classNae="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input type="email" id="email" name={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="john.doe@company.com" value={value} onChange={onChange} required  />
    </div> 
  )
}
