import React, { useState } from 'react'
import { CustomModal } from '../../components/Modal/CustomModal'
import CustomFields from '../../components/InputFields/CustomFields'
import CustomButton from '../../components/Buttons/button'
import { GrantAccess } from '../../api/request'

export default function GrantUserAccess({open,onClose,user}) {
  const [login,setLogin] = useState({
    email:'',
    password:''
  })
  const handleInputChange = (event) =>{
    setLogin({...login,[event.target.name]: event.target.value});
  }
  const Access = async() =>{
    const formData = new FormData();
    formData.append('email',login.email);
    formData.append('password',login.password);
    formData.append('applicantNum',user)
    await GrantAccess.GRANT_ACCESS(formData)
    .then(res => {
      if(res.data.success === 1){
        setLogin({
          email:'',
          password:''
        })
      }
    })
    .catch(err => console.log(err));
    
  }
  return (
   <CustomModal
    title={'ogin to Grant Access'}
    open={open}
    onClose={onClose}
    content={
        <div>
           <h3> This will use for the special case scenario if the Admin, Employee or Mayor wants an applicants with a failed score to be passed</h3>
            <form onSubmit={Access}>
                <CustomFields
                 label={'Email Address'}
                 name={'email'}
                 value={login.email}
                 onChange={handleInputChange}
                />
                <CustomFields
                 label={'Password'}
                 name={'password'}
                 value={login.password}
                 onChange={handleInputChange}
                />
                <div>
                    <CustomButton
                    label={'Submit'}
                    type={'submit'}
                    />
                </div>
            </form>
        </div>
    }
   />
  )
}  
