import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './faqs.scss';
import './employeeaccs.css'
import { useEffect, useState } from 'react';
import { AddBMCC,FetchingBMCC,Activitylog,UpdateEmp } from '../../api/request';
import { Box, Modal} from "@mui/material"; 
import TextField from '@mui/material/TextField';
import { useContext } from "react";
import { admininfo } from "../../App";
import { DataGrid} from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import BMCC from '../../Images/logo.jpg';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const Faqs = () => {
  const { loginUser,user } = useContext(admininfo);
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [jobDes, setJobdes] = useState('');
  const [upjobDes, setUpJobdes] = useState('');
  const[status,setStatus] = useState('');
  const[olddata,setOlddata] = useState([]);
  const [bmcc,setBmcc] = useState([]);
  const [actlog,setActlog] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [errors, setErrors] = useState({});
console.log(user)

const CustomDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'green', 
    color: 'white', 
  },
});
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '700',
    height: '400',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow: 'auto',
  };
  const columns = [
    { field: 'activityLog', headerName: 'ID', width: 50 },
    {
      field: 'name',
      headerName: 'Employee Name',
      width: 150,
      editable: true,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      editable: true,
    },
    {
      field: 'applicantNum',
      headerName: 'Applicant Code',
      width: 150,
      editable: true,
    },
    {
      field: 'date',
      headerName: 'When',
      width: 170,
      editable: false,
    }
  ];
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen1 = (data) => {
    console.log(data)
    setOlddata(data)
        setOpen1(true);
  } 

  const handleClose1 = () => setOpen1(false);
  useEffect(() =>{
        async function Fetch(){
        const list = await FetchingBMCC.FETCH_BMCC()
        const actlog = await Activitylog.ACTIVITY_LOG()
        console.log(list)
        console.log(actlog)
          setBmcc(list.data.message)
          const activitylog = actlog.data.Log
          setActlog(activitylog.reverse())
        }
        Fetch();
  },[])
 const bmccemp = bmcc?.map((data) =>{
    return (
      <>
      <div className='emplycon'>
        <div className="profemp">
          {data.profile === '' ? (<img style={{width:'50px'}} src={BMCC} alt="" />) : (<img src={data.profile} alt="" />)}
        </div>
        <div className="detemp">
          <p>Name:{data.name}</p>
          <p>Email:{data.email}</p>

        </div>
        <div>
        <p>Job:{data.jobDescription}</p>
        <p>Status:{data.status}</p>
        </div>
        <div>
          <button onClick={() =>{handleOpen1(data)}}>Edit</button>
        </div>
      </div>
      </>
    )
 })
 const AddbMCC = (event) =>{
  event.preventDefault();
  const errors = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!/^[A-Za-z0-9._%+-]+@gmail\.com$/.test(email)) {
     errors.email = "Email is invalid";
  }
  if (!username) {
    errors.username = "Username is required";
  } else if (!/^[A-Za-z0-9._%+-]+@gmail\.com$/.test(email)) {
     errors.username = "Username is invalid";
  }
  if (!password) {
    errors.password = "Email is required";
  } else if (!/^[A-Za-z0-9._%+-]+@gmail\.com$/.test(email)) {
     errors.password = "Email is invalid";
  }
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    console.log(errors)
    return;
  }
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('name', username);
  formData.append('jobdes', jobDes);
  AddBMCC.ADD_BMCC(formData)
  .then(res => {
    console.log(res)
    setBmcc(res.data.message)
  }
   )
  .catch(err => console.log(err));
}
const UpdateBMCC = (event) =>{
  event.preventDefault()
  let updatedstatus = status || olddata.status;
  let updatedjob = upjobDes || olddata.jobDescription;
  let id = olddata.id;
  const formData = new FormData();
  formData.append('updatedstatus',updatedstatus)
  formData.append('updatedjob',updatedjob)
  formData.append('id',id)
  UpdateEmp.UPDATE_EMP(formData)
  .then(res => {
    console.log(res)
    setBmcc(res.data.employees);
    setOpen1(false)
  }
   )
  .catch(err => console.log(err));
}

 console.log(open)
  return (
    <div className="faqs">
        <Sidebar/>
        <div className="faqsContainer">
            <Navbar/>
            <Modal
                      open={open}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description">
                <Box sx={style}>
                <div className="buttonclosed">
                <button onClick={handleClose}>X</button>

                </div>
                <div style={{margin: 20}} className="form">
                <TextField
                   label='Username' 
                    margin='normal' 
                    variant='outlined'
                    size='large'
                    fullWidth
                    onChange={(e) =>setUsername(e.target.value)}  
                    color='secondary'
                    />
                <TextField
                   label='Email' 
                    margin='normal' 
                    variant='outlined'
                    size='large'
                    fullWidth
                    onChange={(e) =>setEmail(e.target.value)}  
                    color='secondary'
                    />
                <TextField
                   label='Password' 
                    margin='normal' 
                    variant='outlined'
                    size='large'
                    fullWidth
                    onChange={(e) =>setPassword(e.target.value)}  
                    color='secondary'
                    />
                <TextField
                   label='Job Description' 
                    margin='normal' 
                    variant='outlined'
                    size='large'
                    fullWidth
                    onChange={(e) =>setJobdes(e.target.value)}  
                    color='secondary'
                    />
                </div>
                <button onClick={handleClose}>Cancel</button>
                <button onClick={AddbMCC}>Add</button>
                </Box>
            </Modal>
            <Modal
                      open={open1}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description">
                <Box sx={style}>
                <div className="buttonclosed">
                <button onClick={handleClose1}>X</button>
                </div>
                {olddata ? (<h1>Name: {olddata.name}</h1>) : (null)}
                <div style={{margin: 20}} className="form">
                <TextField
                   label='Job Description' 
                    margin='normal' 
                    variant='outlined'
                    size='large'
                    fullWidth
                    onChange={(e) =>setUpJobdes(e.target.value)}  
                    color='secondary'
                    />
                <FormLabel id="demo-row-radio-buttons-group-label">Account Status</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) =>{
                     const stat = e.target.value;
                      setStatus(stat);
                    }}  
                  >
                <FormControlLabel value="Active" control={<Radio />} label="Active" />
                <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
                </RadioGroup>
                </div>
                <button onClick={handleClose1}>Cancel</button>
                <button onClick={UpdateBMCC}>Save Changes</button>
                </Box>
            </Modal>
            <div className="top">
              <div>
              <h1>Employee Accounts</h1>
              </div>
              <div className="containeremaccs">
                <div className="emacsslist">
                  <h1>Employee List</h1>
                  <div>
                    {bmccemp}
                  </div>
                  <button onClick={handleOpen}>Add</button>
                </div>
                <div className="emaccsact">
                  <h1>Activity Log</h1>
                  <div>
                  <CustomDataGrid width={200}
        rows={actlog}
        columns={columns}
        getRowId={(row) => row.activityLog}
        scrollbarSize={10}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[25]}  
        disableRowSelectionOnClick
      />
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Faqs