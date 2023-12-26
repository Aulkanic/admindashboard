import { AddBMCC } from "../../../../api/request";
import swal from "sweetalert";

export default function AddBmcc({setErrors,handleModalOpenClose,setBmcc,setCreateStaff,setLoading,data}) {
    if(data.email === '' || data.username === '' || data.jobDes === ''){
        swal({
          text: 'Please Provide necessary Information',
          timer: 2000,
          buttons: false,
          icon: "warning",
        })
        return
      }
      const errors = {};
    
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data.email)) {
         errors.email = "Email is invalid";
      }
    
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        console.log(errors)
        return;
      }
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('name', data.username);
      formData.append('jobdes', data.jobDes);
      handleModalOpenClose('CreateOpen',false);
      setLoading(true);
      setErrors('')
      AddBMCC.ADD_BMCC(formData)
      .then(res => {
        if(res.data.success === 0){
          setLoading(false);
          swal("Error!", res?.data?.message , "error");
        }else{
          setBmcc(res.data.message)
          setLoading(false);
          setCreateStaff({
            username: '',
            email: '',
            jobDes: ''          
          })
          swal({
            title: "Success",
            text: "Created Successfully!",
            icon: "success",
            button: "OK",
          });
        }
    
      }
       )
      .catch(err => console.log(err));
}
