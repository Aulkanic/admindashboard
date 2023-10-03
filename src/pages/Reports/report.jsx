import React, { useEffect, useState } from 'react'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"


const Report = () => {
  const [tabs,setTabs] = useState(0);


  return (
    <>
    <div className="scholarships" style={{backgroundColor:'whitesmoke'}}>
        <Sidebar/>
    <div className="scholarshipsContainer">
        <Navbar/>
        <div>
          <h2>Reports</h2>
        </div>
        </div>
    </div>
    </>
  )
}

export default Report