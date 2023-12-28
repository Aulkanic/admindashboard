import { BmccAddroles } from "../../../../api/request";
import swal from "sweetalert";

export default function AddMYDORole({addRole,setOfficials,officials,setLoading}) {
  if(addRole.length === 0){
    swal({
      title: "Warning",
      text: "Please select staff first!",
      icon: "warning",
      button: "OK",
    });
    return
  }
    let counter = 0;
    for(let i = 0;i < addRole.length;i++){
      const val = addRole[i];
      const formData = new FormData();
      formData.append('role',val)
      setLoading(true);
      BmccAddroles.ADD_ROLE(formData)
      .then((res) =>{
        console.log(res)
        counter += 1;
        if(counter === addRole.length){
          setLoading(false);
          const roleData = res.data.roles;
          setOfficials({
            ...officials,
            List: roleData.sort((a,b) => a.role.localeCompare(b.role)),
            Administrator: roleData.filter(data => data.roleNum === 1),
            Officer: roleData.filter(data => data.roleNum === 3),
            Coordinator: roleData.filter(data=> data.roleNum === 4),
            Manager: roleData.filter(data => data.roleNum === 2)
          }) 
          swal({
            title: "Success",
            text: "Added Successfully!",
            icon: "success",
            button: "OK",
          });
          return
        }

      })
    }
}
