import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './faqs.scss';
import './employeeaccs.css'
import React, {useEffect, useState} from 'react'
import { AddBMCC,FetchingBMCC,Activitylog,UpdateEmp,ListAccess,EmpAuthorized } from '../../api/request';
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
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';


const StyledButton = styled(Button)`
  && {
    float: right;
    background-color: red;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const [open2, setOpen2] = useState(false);
  const [errors, setErrors] = useState({});
  const [emp1,setEmp1] = useState('');
  const [emp2,setEmp2] = useState('');
  const [scho,setScho] = useState('');
  const [score,setScore] = useState('');
  const [require,setRequire] = useState('');
  const [eva1,setEva1] = useState('');
  const [eva2,setEva2] = useState('');
  const [app1,setApp1] = useState('');
  const [app2,setApp2] = useState('');
  const [appoint1,setAppoint1] = useState('');
  const [appoint2,setAppoint2] = useState('');
  const [appoint3,setAppoint3] = useState('');
  const [scholar,setScholar] = useState('');
  const [newan,setNewan] = useState('');
  const [rule,setRule] = useState('');
  const [web,setWeb] = useState('');
  const [report,setReport] = useState(null);
  const [accessEmp,setAccessEmp] = useState([])
  const [activeState,setActiveState] = useState('log');

const CustomDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-columnHeaders': {
    color: 'black', 
    backgroundColor:'white'
  },

});
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800',
    height: '400',
    bgcolor: 'background.paper',

    overflow: 'auto',
    padding:'10px',
    borderRadius:'10px'
  };

  const handleClick = () => {
    if(user.jobDescription !== accessEmp.empSec1){
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
        <Button className='myButton1' variant='contained' onClick={() => handleOpen1(params.row)}>Edit Details</Button>
      ),
    },
  ];
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleOpen1 = (data) => {
    setOlddata(data)
        setOpen1(true);
  } 

  const handleClose1 = () => setOpen1(false);
  useEffect(() =>{
        async function Fetch(){
        const list = await FetchingBMCC.FETCH_BMCC()
        const actlog = await Activitylog.ACTIVITY_LOG()
        const access = await ListAccess.ACCESS()
          setBmcc(list.data.message)
          setAccessEmp(access.data.result[0])
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
const Authorization = (e) =>{
  e.preventDefault()
  const formData = new FormData();
  formData.append('emp1',emp1 || accessEmp.empSec1)
  formData.append('emp2',emp2 || accessEmp.empSec2)
  formData.append('scho',scho || accessEmp.schoSec)
  formData.append('score',score || accessEmp.scoreSec)
  formData.append('require',require || accessEmp.requireSec)
  formData.append('eva1',eva1 || accessEmp.evaSec1)
  formData.append('eva2',eva2 || accessEmp.evaSec2)
  formData.append('app1',app1 || accessEmp.appSec1)
  formData.append('app2',app2 || accessEmp.appSec2)
  formData.append('appoint1',appoint1 || accessEmp.appointSec1)
  formData.append('appoint2',appoint2 || accessEmp.appointSec2)
  formData.append('appoint3',appoint3 || accessEmp.appointSec3)
  formData.append('scholar',scholar || accessEmp.scholarSec)
  formData.append('newan',newan || accessEmp.newanSec)
  formData.append('rule',rule || accessEmp.ruleSec)
  formData.append('web',web || accessEmp.webSec)
  formData.append('report',report || accessEmp.repSec)
  EmpAuthorized.AUTHORIZATION(formData)
  .then(res => {
    console.log(res)
    setAccessEmp(res.data.result)
    swal('Success')
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
              <StyledButton onClick={handleClose}>X</StyledButton>
                </div>

              <div className="form">
                <Typography sx={{fontSize:35,color:'#666'}}>
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
                <Button className="myButton" variant='contained' onClick={handleClose}>Cancel</Button>
                <Button className="myButton1" variant='contained' onClick={AddbMCC}>Add Employee</Button>
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
                <Typography sx={{fontSize:35,fontWeight:700,color:'#666'}}>Edit Employee Details</Typography>
                <StyledButton variant='contained' style={{padding:10,height:'100%',float:'right',marginRight:20}} onClick={handleClose1}>
                  X</StyledButton>
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
                <Button className="myButton" variant='contained' onClick={handleClose1}>Cancel</Button>
                <Button className="myButton1" variant='contained' onClick={UpdateBMCC}>Save Changes</Button>
                </div>
                </Box>
            </Modal>
        <Dialog
        fullScreen
        open={open2}
        onClose={handleClose2}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose2}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Manage Employee Access
            </Typography>
            <Button variant='none' onClick={Authorization}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
            <Box sx={{width:'100%',padding:'10px',height:'100%',display:'flex',backgroundColor:'whitesmoke',justifyContent:'space-around'}}>
                    <div style={{width:'30%',height:'auto'}}>
                    <Card sx={{width:'100%%',height:'auto',display:'flex',flexDirection:'column',padding:'10px',margin:'10px'}} elevation={5}>
                      <Typography>Employee Section</Typography>
                      <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                      <Typography>Creation Of Accounts:</Typography>
                      <TextField value={emp1} placeholder={accessEmp.empSec1} onChange={(e) => setEmp1(e.target.value)}/>
                      <Typography>Managing Of Accounts:</Typography>
                      <TextField value={emp2} placeholder={accessEmp.empSec2} onChange={(e) => setEmp2(e.target.value)}/>
                      </div>
                    </Card>
                    <Card sx={{width:'100%%',height:'auto',display:'flex',flexDirection:'column',padding:'10px',margin:'10px'}} elevation={5}>
                      <Typography>Scholarship Program Section</Typography>
                      <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                      <Typography>Creation and Managing Scholarship Program:</Typography>
                      <TextField value={scho} placeholder={accessEmp.schoSec} onChange={(e) => setScho(e.target.value)}/>
                      </div>
                    </Card>
                    <Card sx={{width:'100%%',height:'auto',display:'flex',flexDirection:'column',padding:'10px',margin:'10px'}} elevation={5}>
                      <Typography>Score Card Section</Typography>
                      <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                      <Typography>Set Score Card Scoring:</Typography>
                      <TextField value={score} placeholder={accessEmp.scoreSec} onChange={(e) => setScore(e.target.value)}/>
                      </div>
                    </Card>
                    <Card sx={{width:'100%%',height:'auto',display:'flex',flexDirection:'column',padding:'10px',margin:'10px'}} elevation={5}>
                      <Typography>Requirement Section</Typography>
                      <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                      <Typography>Adding and Managing List of Requirements:</Typography>
                      <TextField value={require} placeholder={accessEmp.requireSec} onChange={(e) =>setRequire(e.target.value)}/>
                      </div>
                    </Card>
                    </div>
                    <div style={{width:'30%',height:'auto'}}>
                    <Card sx={{width:'100%%',height:'auto',display:'flex',flexDirection:'column',padding:'10px',margin:'10px'}} elevation={5}>
                      <Typography>Evaluation of Registered Applicants Section</Typography>
                      <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                      <Typography>Approval and Rejecting Registered Applicants:</Typography>
                      <TextField value={eva1} placeholder={accessEmp.evaSec1} onChange={(e) => setEva1(e.target.value)}/>
                      <Typography>Setup Passing Score and Available Slots:</Typography>
                      <TextField value={eva2} placeholder={accessEmp.evaSec2} onChange={(e) => setEva2(e.target.value)}/>
                      </div>
                    </Card>
                    <Card sx={{width:'100%%',height:'auto',display:'flex',flexDirection:'column',padding:'10px',margin:'10px'}} elevation={5}>
                      <Typography>Applicants Section</Typography>
                      <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                      <Typography>Checking Documents/Requirements Of Applicants:</Typography>
                      <TextField value={app1} placeholder={accessEmp.appSec1} onChange={(e) => setApp1(e.target.value)}/>
                      <Typography>Approval and Failing Of Applicants:</Typography>
                      <TextField value={app2} placeholder={accessEmp.appSec2} onChange={(e) => setApp2(e.target.value)}/>
                      </div>
                    </Card>
                    <Card sx={{width:'100%%',height:'auto',display:'flex',flexDirection:'column',padding:'10px',margin:'10px'}} elevation={5}>
                      <Typography>Appointment Section</Typography>
                      <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                      <Typography>Creation Of Appointment:</Typography>
                      <TextField value={appoint1} placeholder={accessEmp.appointSec1} onChange={(e) => setAppoint1(e.target.value)}/>
                      <Typography>Interviewer:</Typography>
                      <TextField value={appoint2} placeholder={accessEmp.appointSec2} onChange={(e) => setAppoint2(e.target.value)}/>
                      <Typography>Approval and Failing Of Appointed Applicants:</Typography>
                      <TextField value={appoint3} placeholder={accessEmp.appointSec3} onChange={(e) => setAppoint3(e.target.value)}/>
                      </div>
                    </Card>
                    </div>
                    <div style={{width:'30%',height:'auto'}}>
                    <Card sx={{width:'100%%',height:'auto',display:'flex',flexDirection:'column',padding:'10px',margin:'10px'}} elevation={5}>
                      <Typography>Scholars Section</Typography>
                      <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                      <Typography>Managing Scholars Status:</Typography>
                      <TextField value={scholar} placeholder={accessEmp.scholarSec} onChange={(e) =>setScholar(e.target.value)}/>
                      </div>
                    </Card>
                    <Card sx={{width:'100%%',height:'auto',display:'flex',flexDirection:'column',padding:'10px',margin:'10px'}} elevation={5}>
                      <Typography>New and Announcement Section</Typography>
                      <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                      <Typography>Creation of News and Annoucement:</Typography>
                      <TextField value={newan} placeholder={accessEmp.newanSec} onChange={(e) =>setNewan(e.target.value)}/>
                      </div>
                    </Card>
                    <Card sx={{width:'100%%',height:'auto',display:'flex',flexDirection:'column',padding:'10px',margin:'10px'}} elevation={5}>
                      <Typography>Scholarship Rules Section</Typography>
                      <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                      <Typography>Setting up the Rules of the Scholarship Program:</Typography>
                      <TextField value={rule} placeholder={accessEmp.ruleSec} onChange={(e) =>setRule(e.target.value)}/>
                      </div>
                    </Card>
                    <Card sx={{width:'100%%',height:'auto',display:'flex',flexDirection:'column',padding:'10px',margin:'10px'}} elevation={5}>
                      <Typography>Website Maintenance Section</Typography>
                      <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                      <Typography>Setting up the Design of the Website:</Typography>
                      <TextField value={web} placeholder={accessEmp.webSec} onChange={(e) =>setWeb(e.target.value)}/>
                      </div>
                    </Card>
                    <Card sx={{width:'100%%',height:'auto',display:'flex',flexDirection:'column',padding:'10px',margin:'10px'}} elevation={5}>
                      <Typography>Reports Section</Typography>
                      <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                      <Typography>Generating Reports:</Typography>
                    <TextField value={report} placeholder={accessEmp.repSec} onChange={(e) => setReport(e.target.value)}/>
                      </div>
                    </Card>
                    </div>
            </Box>
        </Dialog>

            <div className="top">
              <Card elevation={0} style={{width:'100%',display:'flex',justifyContent:'space-around',height:100,alignItems:'center',border:'none'}}>
              <h1 style={{color:'#666'}}>Employee Accounts</h1>
              <button  className='myButton'
              onClick={handleClick}
              variant='contained' size='small'>
                {activeState === 'log' && 'Manage Employee'}
                {activeState === 'admin' && 'View Activity Log'}
              </button>
              </Card>
              
              <div className="containeremaccs">
                    {activeState === 'admin' && 
                    <Card><div className="emacsslist">
                      <div style={{width:'90%',display:'flex',justifyContent:'space-between',padding:10,alignItems:'center'}}>
                      <h1 style={{color:'#666'}}>Employee List</h1>
                      <div>
                      <Button sx={{backgroundColor:'green',height:'50%',marginRight:'10px'}}
                       className="myButton1" variant='contained' onClick={handleOpen2}> MANAGE ACCESS </Button>
                      <Button sx={{backgroundColor:'green',height:'50%'}}
                       className="myButton1" variant='contained' onClick={handleOpen}> ADD EMPLOYEE </Button>
                       </div>
                      </div>
                      <div className='bmccEmp'>
                        <Card>
                      <CustomDataGrid    
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
                        </Card>
                      </div>
                      
                    </div></Card>}

                    {activeState === 'log' && 
                    <Card sx={{backgroundColor:'white'}}>
                    <div className="emaccsact">
                      <h1 style={{color:'#666'}}>Activity Log</h1>
                      <div className='dataGridCon' style={{width:'100%'}}>
                        <Card sx={{margin:'10px'}}>
                      <CustomDataGrid 
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
                      </Card>
                      </div>
                    </div>
                    </Card>}
              </div>
          
            </div>
        </div>
    </div>
  )
}

export default Faqs