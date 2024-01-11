import React, { useEffect, useState } from 'react'
import PersonalInf from '../../../../container/UserDetails/personal'
import FamilyInf from '../../../../container/UserDetails/family'
import FormInf from '../../../../container/UserDetails/form'
import { Card } from '@mui/material'
import { CgProfile } from "react-icons/cg";
import Viewing from '../Actions/viewing'

export default function ApplicantDetails({userDetails}) {
  console.log(userDetails)
  const [loading,setLoading] = useState(false)
  const [active,setActive] = useState(0);
  const [selectedUser,setSelectedUser] = useState({
    personalInfo:[],
    familyInfo:[],
    form:[]
  })

  useEffect(() =>{
    async function Fetch(){
        setLoading(true)
        const res = await Viewing(userDetails.applicantNum)
        console.log(res)
        if(res){
        setSelectedUser((prev) =>({
            ...prev,
            personalInfo: {profile:res.data.profile,info:res.data.persona},
            familyInfo: res.data.family,
            form: res.data.form
        }))
      }
      setLoading(false)
    }
    Fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
    {loading ? (
      <>
        <p>Fetching Applicants Information...</p>
      </>
    ) : (
      <>
      <div>
      <Card elevation={2}>
          <div style={{width:'90%'}}>
            <h1 style={{margin:'10px 0px 0px 30px',fontSize:'25px',borderBottom:'5px solid #f1f3fa',color:'#7F7E7D',paddingBottom:'5px'}}>
              Applicant Profile
            </h1>
          </div>
          <div style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center',marginTop:'20px',position:'relative'}}>
            {userDetails.profile ? (
              <>
              <img 
              style={{width:'200px',height:'200px',borderRadius:'50%',objectFit:'cover',border:'2px solid black'}}
              src={userDetails.profile}
              alt="" />
              </>
            ) : (
              <CgProfile />
            )}
          </div>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'20px'}}>
            <h1 style={{fontSize:'18px',margin:'0px',fontWeight:'bold'}}>
              {userDetails.Name}
            </h1>
          </div>
      </Card>
      <Card elevation={2} style={{backgroundColor:'white',width:"75%",height:'max-content'}}>
         <div style={{width:'90%'}}>
            <h1 style={{margin:'10px 0px 0px 30px',fontSize:'20px',borderBottom:'5px solid #f1f3fa',color:'#7F7E7D',paddingBottom:'5px'}}>
              Applicant Information
            </h1>
          </div>
          <div style={{display:'flex',flexDirection:'column',padding:'15px'}}>
            <p><strong>Applicant Code:</strong> {userDetails.Name}</p>
            <p><strong>Scholarship Applied:</strong> {userDetails.ScholarshipApplied
               }</p>
            <p><strong>Date Applied:</strong> {userDetails.date}</p>
            <p><strong>Batch:</strong> {userDetails.Batch}</p>
          </div>
      </Card>
      </div>
      <div style={{width:'70%',backgroundColor:'#f1f3fa',display:'flex',flexDirection:'column',alignItems:'center',paddingTop:'2%'}}>
          <Card elevation={0} style={{backgroundColor:'transparent',width:'95%',height:'150px',marginBottom:'20px',padding:'15px 10px 30px 35px'}}>
          <h1>Applicant Information</h1>
          <p>You can see applicant information</p>
          </Card>
          <Card elevation={0} style={{backgroundColor:'transparent',width:'95%',height:'100%'}}>
              <div>
              <button
              onClick={() => setActive(0)}
              className={active === 0 ? 'evalActivepage' : 'evalPage'}
              >
                  Personal Info
              </button>
              <button
              style={{margin:'0px 10px 0px 10px'}}
              onClick={() => setActive(1)}
              className={active === 1 ? 'evalActivepage' : 'evalPage'}
              >
              Parents Info
              </button>
              <button
              onClick={() => setActive(2)}
              className={active === 2 ? 'evalActivepage' : 'evalPage'}
              >
                  Application Form
              </button>
              </div>
              <Card sx={{width:'100%',height:"maxContent",padding:'20px'}}>
                  {
                  active===0 && (
                    <PersonalInf
                      userInfo={selectedUser.personalInfo}
                    />
                  )
                  }
                  {
                  active === 1 && (
                    <FamilyInf
                      userInfo={selectedUser.familyInfo}
                    />
                  )
                  }
                  {
                  active === 2 && (
                     <FormInf
                       userInfo={selectedUser.form}
                     />
                  )
                  }
              </Card>
          </Card>
      </div>
      </>
    )}
    </>
  )
}
