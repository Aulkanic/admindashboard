import React from 'react';
import clsx from 'clsx';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CustomButton = ({label,addClass,loading,onClick,disabled,color,loadingLabel}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
          addClass,
          'transition-all cursor-pointer flex gap-2 items-center justify-center duration-300 ease-in-out px-6 py-2 rounded w-max h-max text-white font-semibold',
          {
            'bg-blue-500 hover:bg-blue-700': color === 'blue',
            'bg-green-500 hover:bg-green-700': color === 'green',
            'bg-red-500 hover:bg-red-700': color === 'red',
            'bg-gray-300 hover:bg-gray-700 opacity-50 cursor-not-allowed' : color === 'gray'
            // Add more colors as needed
          }
        )}
    >
     <AiOutlineLoading3Quarters className={clsx(loading ? 'animate-spin' : 'hidden')} />   
        {loading ? loadingLabel : label}
    </button>
  );
};

export default CustomButton;