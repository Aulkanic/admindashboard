import { UpdateEmp } from "../../../../api/request";
import swal from "sweetalert";


export default function UpdateBmcc({updateStaff,setLoading,setBmcc,setModals,modals}) {
 
    let updatedstatus = updateStaff.newData.status || updateStaff.oldData.status;
    let updatedjob = updateStaff.newData.jobDes || updateStaff.oldData.jobDescription;
    let id = updateStaff.oldData.id;
    const formData = new FormData();
    formData.append('updatedstatus',updatedstatus)
    formData.append('updatedjob',updatedjob)
    formData.append('id',id)
    setLoading(true);
    UpdateEmp.UPDATE_EMP(formData)
    .then(res => {
      setBmcc(res.data.employees)
      setModals({
        ...modals,
        UpdateOpen:false
      })
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
