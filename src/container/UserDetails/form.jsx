import React from 'react'
import { Chip } from '@mui/material'

export default function FormInf({userInfo}) {
    const userfrmeval = userInfo.userscore?.map((data,index) =>{
        return(
        <div className='frmlistq' key={index}>
        <Chip sx={{width:'60px',position:'absolute',left:0,top:10}} label={data.score} color="primary" />
        <div style={{}}>
          <p style={{margin:'0px',fontSize:'20px',fontWeight:'700',backgroundColor:'#f1f3fa',padding:'10px',width:'100%',borderRadius:'10px'}}>
            <strong>{index + 1}.</strong> {data.question} 
          </p>
          <p style={{margin:'0px',fontSize:'18px',marginTop:'10px',marginLeft:'20px',fontStyle:'italic'}}>- {data.answer}</p>
        </div>
        </div>
  
      )})    
  return (
    <div>
    <h1 style={{fontSize:'27px',fontWeight:'bold',marginBottom:'15px'}}>
        Total Score: {userInfo.score}/100
    </h1>
    {userfrmeval}
    </div>
  )
}
