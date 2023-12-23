import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'
const Private = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <Navbar />
    </div>
  )
}

export default Private