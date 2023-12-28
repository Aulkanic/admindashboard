import Swal from "sweetalert2";
import { UpdateEmployeeAccess } from "../../../../api/request";

export default function DeleteAuth({setLoading,data,list,officials,setOfficials,setSelectedRole,selectedRole}) {
    try {  
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          reverseButtons: true
        }).then(async(result) => {
          if (result.isConfirmed) {
            const updatedSectionId = data.accessList.replace(list, '').trim();
            const filteredArray = updatedSectionId.split(',').filter((str) => str.trim() !== "");
            const resultObject = filteredArray.join(',')
          
            const formData = new FormData();
            formData.append('accessList',resultObject)
            formData.append('role',data.role)
            setLoading(true);
            UpdateEmployeeAccess.EMP_UPTDACCESS(formData)
            .then(res => {
              setOfficials({
                ...officials,
                List:[...officials.List,...res.data.result]
              })
              setSelectedRole({
                ...selectedRole,
                  value:'',
                  list:[],
                  checked:[]
              })
              setLoading(false);
              Swal.fire(
                'Deleted!',
                'The selected role has been deleted from staff.',
                'success'
              )
            }
             )
            .catch(err => console.log(err));
      
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            Swal.fire(
              'Cancelled',
              'The Selected role deletion has cancelled. :)',
              'error'
            )
          }
        })  
    } catch (error) {
      console.error('Error in DeleteAuth:', error);
    }
}
