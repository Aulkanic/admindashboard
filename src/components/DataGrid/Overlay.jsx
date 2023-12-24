import React from 'react'
import GIF from '../../Images/giphy.gif'
export const LoadingOverlay = () => {
  return (
    <div className='flex justify-top flex-col items-center h-full'>
    <div>
        <img className='w-40 h-40' src={GIF} alt="" />
    </div>
    <div className="flex items-center justify-top space-x-2">
        <p className='text-3xl font-semibold'>Loading</p>
        <div className="w-4 bg-black h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
        <div className="w-4 bg-black h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
        <div className="w-4 bg-black h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
    </div>
  </div>
  )
}
