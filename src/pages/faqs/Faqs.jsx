import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './faqs.scss';
import './employeeaccs.css'
import React, {useEffect, useState} from 'react'
import { AddBMCC,FetchingBMCC,Activitylog,UpdateEmp,ListAccess,EmployeeAccess,WebSection } from '../../api/request';
import { Box, Modal,Card,Button, Typography} from "@mui/material"; 
import TextField from '@mui/material/TextField';
import { useContext } from "react";
import { admininfo } from "../../App";
import { DataGrid} from '@mui/x-data-grid';
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
import { styled, ThemeProvider, createTheme } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(data, sectionId, theme) {
  return {
    fontWeight:
      sectionId.indexOf(data.name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const theme = createTheme();

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
const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));


const Faqs = () => {
  const theme = useTheme();
  const { loginUser,user } = useContext(admininfo);
  const [showBackdrop, setShowBackdrop] = useState(false);
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
  const [accessEmp,setAccessEmp] = useState([])
  const [activeState,setActiveState] = useState('log');
  const [websection,setWebsection] = useState([])
  const [employeeAccess, setEmployeeAccess] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [defaultval,setDefault] = useState([])
  const [sectionId, setSectionId] = useState([]);
  const [access,setAccess] = useState([])
  const animatedComponents = makeAnimated();

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
    const sections = access[0].sectionId.split(', '); 
    const isValueIncluded = sections.includes('Create Accounts') || user.jobDescription === 'Admin';
    if(!isValueIncluded){
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
  const handleChange = (selected) => {
    setEmployeeId(selected);
  };
  const handleChange1 = (selected) => {
    setSectionId(selected);
  };
  const handleSelectAll = () => {
    const allOptions = websection.map((option) => ({
      value: option.id,
      label: option.name,
    }));
    setSectionId(allOptions);

  };


  const handleClearSelection = () => {
    setSectionId([]);
  };

  const handleClose1 = () => setOpen1(false);
  useEffect(() =>{
        async function Fetch(){
        setShowBackdrop(true);
        const list = await FetchingBMCC.FETCH_BMCC()
        const actlog = await Activitylog.ACTIVITY_LOG()
        const access = await ListAccess.ACCESS()
        const web = await WebSection.WEB_SEC()
        let acc = await ListAccess.ACCESS()
        const empacc = acc.data.result?.filter(data => data.employeeName === user.name)
          setAccess(empacc)
          setWebsection(web.data.result)
          setBmcc(list.data.message)
          setAccessEmp(access.data.result)
          setEmployeeAccess(access.data.result)
          const activitylog = actlog.data.Log
          setActlog(activitylog.reverse())
          setShowBackdrop(false);
        }
        Fetch();
  },[])

 const AddbMCC = (event) =>{
  const isValueIncluded = access[0]?.sectionId.includes('Create Accounts');
  if(!isValueIncluded){
    swal({
      text: 'UnAuthorized Access',
      timer: 2000,
      buttons: false,
      icon: "error",
    })
    return
  }
  if(email === '' || username === '' || jobDes === ''){
    swal({
      text: 'Please Provide necessary Information',
      timer: 2000,
      buttons: false,
      icon: "warning",
    })
    return
  }
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
  setShowBackdrop(true);
  AddBMCC.ADD_BMCC(formData)
  .then(res => {
    setBmcc(res.data.message)
    setShowBackdrop(false);
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
const UpdateBMCC = (event) =>{
  const sections = access[0].sectionId.split(', '); 
  const isValueIncluded = sections.includes('Manage Accounts') || user.jobDescription === 'Admin';
  if(!isValueIncluded){
    swal({
      text: 'UnAuthorized Access',
      timer: 2000,
      buttons: false,
      icon: "error",
    })
    return
  }
  event.preventDefault()
  let updatedstatus = status || olddata.status;
  let updatedjob = upjobDes || olddata.jobDescription;
  let id = olddata.id;
  const formData = new FormData();
  formData.append('updatedstatus',updatedstatus)
  formData.append('updatedjob',updatedjob)
  formData.append('id',id)
  setShowBackdrop(true);
  UpdateEmp.UPDATE_EMP(formData)
  .then(res => {
    console.log(res)
    setBmcc(res.data.employees);
    setOpen1(false)
    setShowBackdrop(false);
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
const Authorization = (e) =>{
  const sections = access[0].sectionId.split(', '); 
  const isValueIncluded = sections.includes('Manage Accounts') || user.jobDescription === 'Admin';
  if(!isValueIncluded){
    swal({
      text: 'UnAuthorized Access',
      timer: 2000,
      buttons: false,
      icon: "error",
    })
    return
  }
  e.preventDefault()
    const labels = sectionId.map((option) => option.label).join(', ');
    const formData = new FormData();
    formData.append('accesslist',labels)
    formData.append('employee',employeeId.value)
    formData.append('employeeName',employeeId.label)
    setShowBackdrop(true);
    EmployeeAccess.EMP_ACCESS(formData)
    .then(res => {
      console.log(res)
      setAccessEmp(res.data.result)
      setShowBackdrop(false);
      swal({
        title: "Success",
        text: "Done Successfully!",
        icon: "success",
        button: "OK",
      });
     setEmployeeId('')
     setSectionId([])
    }
     )
    .catch(err => console.log(err));


}
const DeleteAuth = (list,data) =>{
  const sections = access[0].sectionId.split(', '); 
  const isValueIncluded = sections.includes('Manage Accounts') || user.jobDescription === 'Admin';
  if(!isValueIncluded){
    swal({
      text: 'UnAuthorized Access',
      timer: 2000,
      buttons: false,
      icon: "error",
    })
    return
  }
  const updatedSectionId = data.sectionId.replace(list, '').trim();
  const formData = new FormData();
  formData.append('accesslist',updatedSectionId)
  formData.append('employee',data.employeeId)
  setShowBackdrop(true);
  EmployeeAccess.EMP_ACCESS(formData)
  .then(res => {
    setAccessEmp(res.data.result)
    setShowBackdrop(false);
    swal({
      title: "Success",
      text: "Done Successfully!",
      icon: "success",
      button: "OK",
    });
   setEmployeeId('')
   setSectionId([])

  }
   )
  .catch(err => console.log(err));
}

  return (
    <>
    <StyledBackdrop open={showBackdrop}>
    <CircularProgress color="inherit" />
  </StyledBackdrop>
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
           <Box sx={{padding:'15px',backgroundColor:'#f1f3fa'}}>
            <Card sx={{padding:'15px'}}>
              <Typography>Notes: Website Section Descriptions</Typography>
              <ul>
                  <li><Typography>Create Accounts - Responsible for Creating an Accounts of Employee and assigning List of Access to the BMCC Website.</Typography></li>
                  <li><Typography>Manage Accounts - The one who responsible for editing the details and status of the Employee.</Typography></li>
                  <li><Typography>Scholarship Programs - Incharge of Creating Scholarship Program and managing the status of it.</Typography></li>
                  <li><Typography>Score Card - person who set up the score of the specified questions and answer in Application Form.</Typography></li>
                  <li><Typography>Requirements - responsible for Creating Lists of Requirements for the specific Scholarship Program.</Typography></li>
                  <li><Typography>Evaluation - The one who evaluate and set the Registered Applicants to be an Applicants.</Typography></li>
                  <li><Typography>Passing Score and Slots - Incharge of Limiting and Changing the Passing Score and the Available Slots for a Certain Scholarship.</Typography></li>
                  <li><Typography>Documents Checking - The one who will check the submitted Documents of the Applicants.</Typography></li>
                  <li><Typography>Applicants - Responsible for Adding and Failing the Applicants.</Typography></li>
                  <li><Typography>Create Appointment - The one who will Scheduled the Appointment of the Qualified Applicants and also evaluate if the Qualified Applicants passed the Interview.</Typography></li>
                  <li><Typography>Appointment - Responsible for Adding and Failing the Qualified Applicants.</Typography></li>
                  <li><Typography>Scholars - Incharge of Monitoring the Scholars.</Typography></li>
                  <li><Typography>News and Announcement - The one who will create A Latest News/Announcement for Informing the Scholars and Applicants.</Typography></li>
                  <li><Typography>Rules - Person who Implement Rules of the Scholarship Program.</Typography></li>
                  <li><Typography>Website Maintenance - Responsible for regularly updating the content of The Website For Applicants and Scholars.</Typography></li>
                  <li><Typography>Reports - The one who will create a Summary of Data for Scholarship Program .</Typography></li>

              </ul>
            </Card>
           <div style={{margin:'15px'}}> 
        <label htmlFor="employee">Employee:</label>
        <Select
          value={employeeId}
          fullWidth
          onChange={handleChange}
          options={bmcc.map((option) => ({
            value: option.id,
            label: option.name,
          }))}
        />
           </div>
            <div style={{margin:'15px'}}>
              <div style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center',margin:'5px'}}>
              <label htmlFor="section">Website Section can Employee Accessed:</label>
              <div>
              <Button sx={{fontSize:'9px',marginRight:'10px'}} className='myButton1' variant="contained" onClick={handleSelectAll}>
              Select All
            </Button>
            <Button sx={{fontSize:'9px'}} className='myButton2' variant="contained" onClick={handleClearSelection}>
              Clear Selection
            </Button>
            </div>
            </div>
              <Select
                closeMenuOnSelect={false}
                isMulti
                fullWidth
                value={sectionId}
                onChange={handleChange1}
                components={animatedComponents}
                input={<OutlinedInput label="Section:" />}
                renderValue={(selected) => {
                  console.log(selected)
                  return(
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}}
                MenuProps={MenuProps}
                options={websection.map((option) => ({
                  value: option.id,
                  label: option.name,
                }))}
              />
            </div>
            <div className='authlist'>
            {accessEmp?.map((data) => {
              const lists = data.sectionId.split(',').map(list => list.trim());
              return (
                <Card sx={{width:'max-Content',height:'max-Content',padding:'10px'}} key={data.id}>
                  <p>{data.employeeName} Access list</p>
                  <ul>
                    {lists?.map((list, index) => {
                      if (list === '') return null; // Skip rendering empty list values
                      return (
                        <li style={{ backgroundColor: '#77a809', margin: '2px', width: 'max-Content', padding: '5px', borderRadius: '5px', color: 'white' }} key={index}>
                          {list} <button style={{ backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }} onClick={() => DeleteAuth(list, data)}>X</button>
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              );
            })}
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
    </>
  )
}

export default Faqs