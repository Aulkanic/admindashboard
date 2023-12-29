import React from 'react';
import clsx from 'clsx';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CustomButton = ({label,addClass,loading,onClick,disabled,color,loadingLabel,type,icon,iconPosition}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={clsx(
          addClass,
          'transition-all cursor-pointer w-max text-white inline-flex items-center focus:ring-4 focus:outline-none font-medium rounded-md text-sm px-5 py-2 text-center',
          {
            'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300': color === 'blue',
            'bg-green-700 hover:bg-green-800 focus:ring-green-300': color === 'green',
            'bg-red-700 hover:bg-red-800 focus:ring-red-300': color === 'red',
            'bg-gray-300 hover:bg-gray-700 opacity-50 cursor-not-allowed' : color === 'gray'
            // Add more colors as needed
          }
        )}
    >
    {loading && (
      <div className='flex gap-2 items-center'>
        {iconPosition === 'start' && (
          <>
            <span>{loadingLabel}</span>
            <AiOutlineLoading3Quarters className='animate-spin' />
          </>
        )}
        {iconPosition === 'end' && (
          <>
            <AiOutlineLoading3Quarters className='animate-spin' />
            <span>{loadingLabel}</span>
          </>
        )}
      </div>
    )}
    {!loading && (
      <div className='flex gap-2 items-center'>
        {iconPosition === 'start' && (
          <>
            {icon && <span className='text-xl'>{icon}</span>}
            <span className='text-md'>{label}</span>
          </>
        )}
        {iconPosition === 'end' && (
          <>
            <span className='text-md'>{label}</span>
            {icon && <span className='text-xl'>{icon}</span>}
          </>
        )}

      </div>
    )}
    </button>
  );
};

export default CustomButton;