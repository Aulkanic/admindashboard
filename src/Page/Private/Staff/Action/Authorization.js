import swal from "sweetalert";
import { EmployeeAccess } from "../../../../api/request";

export default function Authorization({setSelectedRole,selectedRole,setOfficials,officials,setLoading}) {
    if(!selectedRole.checked || !selectedRole.value){
        swal({
          title: "Warning",
          text: "Please select necessary details!",
          icon: "warning",
          button: "OK",
        });
        return
      }
        const labels = selectedRole.checked.map((option) => option).join(',');
        const formData = new FormData();
        formData.append('accessList',labels)
        formData.append('role',selectedRole.value)
        setLoading(true);
        EmployeeAccess.EMP_ACCESS(formData)
        .then(res => {
          if(res.data.success === 0){
            setLoading(false);
            swal({
              title: "Warning",
              text: res.data.message,
              icon: "warning",
              button: "OK",
            });
          }else{
            setOfficials({
              ...officials,
              List:[...officials.List,...res.data.result]
            })
            setLoading(false);
            swal({
              title: "Success",
              text: "Done Successfully!",
              icon: "success",
              button: "OK",
            });
            setSelectedRole({
              ...selectedRole,
                value:'',
                list:[],
                checked:[]
            })
          }
    
        }
         )
        .catch(err => console.log(err));
}
