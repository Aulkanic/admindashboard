import React from 'react'

export default function Authorization() {
    if(!selectedModules || !jobDes || !jobDes.value){
        swal({
          title: "Warning",
          text: "Please select necessary details!",
          icon: "warning",
          button: "OK",
        });
        return
      }
        const labels = selectedModules.map((option) => option).join(',');
        const formData = new FormData();
        formData.append('accessList',labels)
        formData.append('role',jobDes.value)
        setShowBackdrop(true);
        EmployeeAccess.EMP_ACCESS(formData)
        .then(res => {
          if(res.data.success === 0){
            swal({
              title: "Warning",
              text: res.data.message,
              icon: "warning",
              button: "OK",
            });
          }else{
            setAccessEmp(res.data.result)
            setShowBackdrop(false);
            swal({
              title: "Success",
              text: "Done Successfully!",
              icon: "success",
              button: "OK",
            });
           setJobdes('')
           setSelectedModules([[]])
          }
    
        }
         )
        .catch(err => console.log(err));
}
