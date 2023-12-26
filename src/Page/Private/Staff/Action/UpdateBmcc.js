import { UpdateEmp } from "../../../../api/request";

export default function UpdateBmcc({updateStaff,setLoading,setBmcc}) {
    let updatedstatus = updateStaff.newData.status || updateStaff.oldData.status;
    let updatedjob = updateStaff.newData.jobDes || updateStaff.oldData.jobDescription;
    let id = updateStaff.oldData.id;
    const formData = new FormData();
    formData.append('updatedstatus',updatedstatus)
    formData.append('updatedjob',updatedjob)
    formData.append('id',id)
    setShowBackdrop(true);
    UpdateEmp.UPDATE_EMP(formData)
    .then(res => {
      setBmcc(res.data.employees);
      setOpen1(false)
      setLoading(false);
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
