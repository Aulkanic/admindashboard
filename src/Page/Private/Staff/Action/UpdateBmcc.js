import React from 'react'

export default function UpdateBmcc({event}) {
    event.preventDefault()
    let updatedstatus = status || olddata.status;
    let updatedjob = upjobDes || olddata.jobDescription;
    let id = olddata.id;
    const formData = new FormData();
    formData.append('updatedstatus',updatedstatus)
    formData.append('updatedjob',updatedjob.value)
    formData.append('id',id)
    setShowBackdrop(true);
    UpdateEmp.UPDATE_EMP(formData)
    .then(res => {
      console.log(res)
      setBmcc(res.data.employees);
      setOpen1(false)
      setShowBackdrop(false);
      swal({
        title: "Success",
        text: "Created Successfully!",
        icon: "success",
        button: "OK",
      });
    }
     )
    .catch(err => console.log(err));
}
