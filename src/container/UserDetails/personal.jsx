import React from 'react'

export default function PersonalInf({userInfo}) {
  return (
    <div className='formpersona' style={{width:'100%',height:'100%',padding:'20px'}}>
    <div className='formpersonaChild'>
        <label htmlFor="">Name</label>
        <input 
        type="text" 
        value={userInfo.Name} disabled />
    </div>
    <div className='formpersonaChild'>
        <label htmlFor="">Barangay</label>
        <input 
        type="text" 
        value={userInfo.baranggay} disabled />
    </div>
    <div className='formpersonaChild'>
        <label htmlFor="">Email</label>
        <input 
        type="text" 
        value={userInfo.email} disabled />
    </div>
    <div className='formpersonaChild'>
        <label htmlFor="">Birthday</label>
        <input 
        type="text" 
        value={userInfo.birthday} disabled />
    </div>
    <div className='formpersonaChild'>
        <label htmlFor="">Contact Number</label>
        <input 
        type="text" 
        value={userInfo.contactNum} disabled />
    </div>
    <div className='formpersonaChild'>
        <div style={{display:'flex'}}>
        <div style={{display:'flex',flexDirection:'column',marginRight:'10px'}}>
            <label htmlFor="">Gender</label>
            <input 
            style={{width:"200px"}}
            type="text" 
            value={userInfo.gender} disabled />
        </div>
        <div style={{display:'flex',flexDirection:'column'}}>
            <label htmlFor="">Age</label>
            <input 
            style={{width:"200px"}}
            type="text" 
            value={userInfo.age} disabled />
        </div>
        </div>
    </div>
    <div className='formpersonaChild1'>
        <label htmlFor="">Place of Birth</label>
        <input 
        type="text" 
        value={userInfo.birthPlace} disabled />
    </div>
    <div className='formpersonaChild1'>
        <label htmlFor="">Address</label>
        <input 
        type="text" 
        value={userInfo.address} disabled />
    </div>
    </div>
  )
}
