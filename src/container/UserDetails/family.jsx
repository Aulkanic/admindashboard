import React from 'react'

export default function FamilyInf({userInfo}) {
  return (
    <div className='famcon'>
    <div>
    <h1 style={{margin:'0px',fontSize:'25px',fontWeight:'bold'}}>Father Information</h1>
    <div className='fdetails'>
        <div>
        <label htmlFor="">Full Name</label>
        <input 
        type="text" 
        value={userInfo.fatherName} disabled />
        </div>
        <div>
        <label htmlFor="">Highest Educational Attaintment</label>
        <input 
        type="text" 
        value={userInfo.fatherEducation} disabled />
        </div>
        <div>
        <label htmlFor="">Occupation</label>
        <input 
        type="text" 
        value={userInfo.fatherOccupation} disabled />
        </div>
    </div>
    </div>
    <div>
    <h1 style={{margin:'0px',fontSize:'25px',fontWeight:'bold'}}>Mother Information</h1>
    <div className='fdetails'>
        <div>
        <label htmlFor="">Full Name</label>
        <input 
        type="text" 
        value={userInfo.motherName} disabled />
        </div>
        <div>
        <label htmlFor="">Highest Educational Attaintment</label>
        <input 
        type="text" 
        value={userInfo.motherEducation} disabled />
        </div>
        <div>
        <label htmlFor="">Occupation</label>
        <input 
        type="text" 
        value={userInfo.motherOccupation} disabled />
        </div>
    </div>
    </div>
    <div style={{height:'max-content'}}>
    <h1 style={{margin:'0px',fontSize:'25px',fontWeight:'bold'}}>Guardian Information</h1>
    <div className='fdetails'>
        <div>
        <label htmlFor="">Full Name</label>
        <input 
        type="text" 
        value={userInfo.guardianName} disabled />
        </div>
        <div>
        <label htmlFor="">Relationship</label>
        <input 
        type="text" 
        value={userInfo.relationship} disabled />
        </div>
        <div>
        <label htmlFor="">Address</label>
        <input 
        type="text" 
        value={userInfo.guardianAddress} disabled />
        </div>
        <div>
        <label htmlFor="">Contact Number</label>
        <input 
        type="text" 
        value={userInfo.guardianContact} disabled />
        </div>
    </div>
    </div>
    <div style={{height:'max-content'}}>
    <h1 style={{margin:'0px',fontSize:'25px',fontWeight:'bold'}}>List of Siblings</h1>
    {userInfo.siblings.length > 0 ? (<div className='fdetails'>
        {userInfo.siblings?.map((data,index) =>{
        return(
            <div key={index}>
            <label htmlFor="">Full Name</label>
            <input 
            type="text" 
            value={data.siblingName} disabled />
        </div>
        )
        })}

    </div>) : (
        <p style={{fontSize:'20px',fontWeight:'500',fontStyle:'italic',marginTop:'20px',marginLeft:'20px'}}>Only Child.</p>
    )}
    </div>
    </div>
  )
}
