import swal from "sweetalert"
import { Addrequirements } from "../../../../api/request"

export default function Addreq({
    data,
    setLoading,
    setReqList,
    event
}) {
    const isDataComplete = Object.values(data).every(value => value !== '' && value !== undefined)
    if(!isDataComplete){
    event.preventDefault()
    swal({
        text: 'Please Provide necessary Information',
        timer: 2000,
        buttons: false,
        icon: "warning",
        })
        return        
    }
    const formData = new FormData();
    formData.append('schoName',data.scholarshipCategory)
    formData.append('requirementName',data.requirementName)
    formData.append('batch',data.batch)
    formData.append('deadline',data.deadline)
    formData.append('docsfor',data.requirementFor)
    setLoading(true);
    Addrequirements.ADD_REQUIREMENTS(formData)
    .then(res => {
        setReqList(res.data.Requirements);
        setLoading(false)
        swal({
        title: "Success",
        text: "Created Successfilly!",
        icon: "success",
        button: "OK",
        });
    }
        )
    .catch(err => console.log(err));
}
