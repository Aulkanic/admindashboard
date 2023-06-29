import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './faqs.scss';
import './employeeaccs.css'
import { useEffect, useState } from 'react';
import { AddBMCC,FetchingBMCC,Activitylog,UpdateEmp } from '../../api/request';
import { Box, Modal,Card,Button, Typography} from "@mui/material"; 
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
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { purple } from '@mui/material/colors';
import '../Button style/button.css'
import swal from 'sweetalert';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const Faqs = () => {
  const { loginUser,user } = useContext(admininfo);
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [jobDes, setJobdes] = useState('');
  const [upjobDes, setUpJobdes] = useState('');
  const[status,setStatus] = useState('');
  const[olddata,setOlddata] = useState([]);
  const [bmcc,setBmcc] = useState([]);
  const [actlog,setActlog] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeState,setActiveState] = useState('log');

const CustomDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-columnHeaders': {
    color: '#005427', 
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
    overflow: 'auto',
    padding:'10px',
    borderRadius:'10px'
  };

  const handleClick = () => {
    if(user.name !== 'Admin'){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    setActiveState(activeState === 'log' ? 'admin' : 'log');
  };

  const columns = [
    { field: 'activityLog', headerName: 'Log ID', width: 100 },
    {
      field: 'name',
      headerName: 'Employee Name',
      width: 350,
      editable: false,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 270,
      editable: false,
    },
    {
      field: 'applicantNum',
      headerName: 'Applicant Code',
      width: 200,
      editable: false,
    },
    {
      field: 'date',
      headerName: 'When',
      width: 170,
      editable: false,
    }
  ];
  const columns1 = [
    { field: 'id', headerName: 'Employee ID', width: 100 },
    {
      field: 'profile',
      headerName: 'Profile',
      width: 120,
      headerAlign: 'center',

      renderCell: (params) => {

        console.log(params)
        const isOnline = params.row.isOnline;
        
        let chipColor = 'error'; 
        let status = 'Offline';
        if (isOnline === 'True') {
          chipColor = 'success'; 
          status = 'Online'
        }
        
        return (
          <Chip 
            color={chipColor}
            label={status}
            avatar={
              <Avatar
                alt="No Image"
                src={params.value}
                sx={{ width: 35, height: 35 }}
              />}/>
        );},},

    {
      field: 'name',
      headerName: 'Employee Name',
      width: 250,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Employee Email',
      width: 250,
      editable: false,
    },
    {
      field: 'jobDescription',
      headerName: 'Job Description',
      width: 170,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Account Status',
      width: 150,
      editable: false,
    },
    {
      field: 'insert',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button style={{backgroundColor:'yellow',color:'blue',border:'2px solid blue'}} variant='contained' onClick={() => handleOpen1(params.row)}>Edit Details</Button>
      ),
    },
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
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    console.log(errors)
    return;
  }
  const formData = new FormData();
  formData.append('email', email);
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
              <Button onClick={handleClose}>X</Button>
                </div>

              <div className="form">
                <Typography sx={{fontSize:35}}>
                  Create Employee Accounts.
                </Typography>
                <Typography>
                  Please input necessary Details
                </Typography>
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
                   label='Job Description' 
                    margin='normal' 
                    variant='outlined'
                    size='large'
                    fullWidth
                    onChange={(e) =>setJobdes(e.target.value)}  
                    color='secondary'
                    />
                <div style={{margin:10,width:'100%',height:'30px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <Button variant='contained' onClick={handleClose}>Cancel</Button>
                <Button variant='contained' onClick={AddbMCC}>Add Employee</Button>
                </div>
                </div>

               
                </Box>
            </Modal>
            <Modal
                open={open1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                <div style={{margin:10,width:'100%',height:'30px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <Typography sx={{fontSize:35,fontWeight:700}}>Edit Employee Details</Typography>
                <Button variant='contained' style={{padding:10,height:'100%',float:'right',marginRight:20}} onClick={handleClose1}>X</Button>
                </div>

                <div style={{margin: 20}} className="form">
                {olddata ? (<h1 style={{fontWeight:'lighter'}}>Name: {olddata.name}</h1>) : (null)}
                {olddata ? (<h1 style={{fontWeight:'lighter'}}>Email: {olddata.email}</h1>) : (null)}
                <TextField
                   label='Job Description' 
                    margin='normal' 
                    variant='outlined'
                    size='large'
                    fullWidth
                    onChange={(e) =>setUpJobdes(e.target.value)}  
                    color='primary'
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
                <div style={{width:'100%',display:'flex',justifyContent:'space-around'}}>
                <Button variant='contained' onClick={handleClose1}>Cancel</Button>
                <Button variant='contained' onClick={UpdateBMCC}>Save Changes</Button>
                </div>
                </Box>
            </Modal>

            <div className="top">
              <Card elevation={0} style={{width:'100%',display:'flex',justifyContent:'space-around',height:100,alignItems:'center',border:'none'}}>
              <h1>Employee Accounts</h1>
              <button  className='buttonStyle'
              onClick={handleClick}
              variant='contained' size='small'>
                {activeState === 'log' && 'Manage Employee'}
                {activeState === 'admin' && 'View Activity Log'}
              </button>
              </Card>
              
              <div className="containeremaccs">
                    {activeState === 'admin' && <div className="emacsslist">
                      <div style={{width:'90%',display:'flex',justifyContent:'space-between',padding:10,alignItems:'center'}}>
                      <h1>Employee List</h1>
                      <Button sx={{backgroundColor:'green',height:'50%'}}
                       className="addBtnEmp" variant='contained' onClick={handleOpen}> ADD EMPLOYEE </Button>
                      </div>
                      <div className='bmccEmp'>
                      <CustomDataGrid 
                      className='dataGrid'
                        rows={bmcc}
                        columns={columns1}
                        autoHeight 
                        autoPageSize
                        getRowId={(row) => row.id}
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
                      
                    </div>}

                    {activeState === 'log' && <div className="emaccsact">
                      <h1>Activity Log</h1>
                      <div className='dataGridCon' style={{width:'100%'}}>
                      <CustomDataGrid 
                      className='dataGrid'
                        rows={actlog}
                        columns={columns}
                        autoHeight 
                        autoPageSize
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
                    </div>}
              </div>
            </div>
        </div>
    </div>
  )
}

export default Faqs