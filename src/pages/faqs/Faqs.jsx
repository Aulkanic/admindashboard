import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './faqs.scss';
import './employeeaccs.css'
import React, {useEffect, useState} from 'react'
import { AddBMCC,FetchingBMCC,Activitylog,UpdateEmp,ListAccess,EmployeeAccess,WebSection,UpdateEmployeeAccess,
BmccAddroles,BmccRoles,BmccRemroles } from '../../api/request';
import { Box, Modal,Card,Button, Typography} from "@mui/material"; 
import TextField from '@mui/material/TextField';
import { DataGrid} from '@mui/x-data-grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import '../Button style/button.css'
import swal from 'sweetalert';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Select from 'react-select';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { MdClear } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";


const StyledButton = styled(Button)`
  && {
    float: right;
    background-color: red;
    transition: opacity 0.3s ease;
    width:'50px';

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
  const { admin  } = useSelector((state) => state.login)
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
  const [roles, setRoles] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [errors, setErrors] = useState({});
  const [accessEmp,setAccessEmp] = useState([])
  const [activeState,setActiveState] = useState('log');
  const [websection,setWebsection] = useState([])
  const [employeeAccess, setEmployeeAccess] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [sectionId, setSectionId] = useState([]);
  const [access,setAccess] = useState([])
  const [selectedModules, setSelectedModules] = useState([]);
  const [selectedModules1, setSelectedModules1] = useState([]);
  const [Administrator,setAdministrator] = useState([])
  const [Officer,setOfficer] = useState([])
  const [Coordinator,setCoordinator] = useState([])
  const [Manager,setManager] = useState([]);
  const [btnstaff,setBtnstaff] = useState(false)
  const [isrole,setIsRole] = useState([])

const CustomDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-columnHeaders': {
    color: 'black', 
    fontWeight:'bold',
    backgroundColor:'white',
    fontWeight:'bold',
    borderBottom:'2px solid black'
  },

});
  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '1070px',
    height: '486px',
    bgcolor: 'background.paper',
    padding:'70px 30px 50px 30px',
    borderRadius:'5px',
    
  };

  const handleClick = () => {
    setActiveState(activeState === 'log' ? 'admin' : 'log');
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Staff Name',
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
      width: 250,
      editable: false,
    },
    {
      field: 'date',
      headerName: 'When',
      width: 250,
      editable: false,
    }
  ];
  const columns1 = [
    {
      field: 'profile',
      headerName: 'Active Status',
      width: 200,
      renderCell: (params) => {
        const isOnline = params.row.isOnline;
        
        let chipColor = 'error'; 
        let status = 'Offline';
        let color = 'rgba(229, 226, 226, 1)';
        let font = 'black'
        if (isOnline === 'True') {
          chipColor = 'primary'; 
          status = 'Online';
          color = 'rgba(0, 255, 10, 1)';
          font = 'white'
        }
        
        return (
          <Chip 
            
            label={status}
            sx={{backgroundColor:color,color: font,fontWeight:'bold'}}
            avatar={
              <Avatar
                alt="No Image"
                src={params.value}
                sx={{ width: 35, height: 35 }}
              />}/>
        );},},

    {
      field: 'name',
      headerName: 'Staff Name',
      width: 250,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Staff Email',
      width: 250,
      editable: false,
    },
    {
      field: 'jobDescription',
      headerName: 'Role',
      width: 170,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Account Status',
      width: 200,
      editable: false,
    },
    {
      field: 'insert',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Button sx={{textTransform:'none',backgroundColor:'#043F97',color:'white',borderRadius:'10px'}} variant='contained' onClick={() => handleOpen1(params.row)}>Edit Details</Button>
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
    setJobdes(selected);
    const det = roles?.filter((data) => data.role === selected.value)
    console.log(det[0].accessList)
    setIsRole(det[0].accessList)
  };

  const handleChange3 = (selected) => {
    setUpJobdes(selected);
  };



  const handleClose1 = () => setOpen1(false);
  useEffect(() =>{
        async function Fetch(){
        setShowBackdrop(true);
        const list = await FetchingBMCC.FETCH_BMCC()
        const actlog = await Activitylog.ACTIVITY_LOG()
        const access = await ListAccess.ACCESS()
        const web = await WebSection.WEB_SEC()
        const rls = await BmccRoles.BMCC_ROLE()
        const rl1 = rls.data.roles.filter((data) => data.roleNum === 1);
        const rl2 = rls.data.roles.filter((data) => data.roleNum === 2);
        const rl3 = rls.data.roles.filter((data) => data.roleNum === 3);
        const rl4 = rls.data.roles.filter((data) => data.roleNum === 4);
    
        let acc = await ListAccess.ACCESS()
        const empacc = acc.data.result?.filter(data => data.employeeName === admin[0].name)
          setAccess(empacc)
          setRoles(rls.data.roles.sort((a, b) => a.role.localeCompare(b.role)))  
          setAdministrator(rl1);
          setManager(rl2);
          setOfficer(rl3);
          setCoordinator(rl4);  
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

if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
     errors.email = "Email is invalid";
  }

  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    console.log(errors)
    return;
  }
  const formData = new FormData();
  formData.append('email', email);
  formData.append('name', username);
  formData.append('jobdes', jobDes.value);
  setOpen(false);
  setShowBackdrop(true);
  setErrors('')
  AddBMCC.ADD_BMCC(formData)
  .then(res => {
    if(res.data.success === 0){
      setShowBackdrop(false);
      swal("Error!", res?.data?.message , "error");
    }else{
      setBmcc(res.data.message)
      setShowBackdrop(false);
      setEmail('')
      setUsername('')
      setJobdes('')
      setSectionId([])
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
const UpdateBMCC = (event) =>{
  event.preventDefault()
  let updatedstatus = status || olddata.status;
  let updatedjob = upjobDes || olddata.jobDescription;
  let id = olddata.id;
  const formData = new FormData();
  formData.append('updatedstatus',updatedstatus)
  formData.append('updatedjob',updatedjob.value)
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
const Authorization = () =>{
 
  if(!selectedModules){
    swal({
      title: "Warning",
      text: "Please select necessary Details!",
      icon: "warning",
      button: "OK",
    });
    return
  }
    const labels = selectedModules.map((option) => option).join(',');
    const formData = new FormData();
    formData.append('accessList',labels)
    formData.append('role',jobDes.value)
    setShowBackdrop(true);
    EmployeeAccess.EMP_ACCESS(formData)
    .then(res => {
      if(res.data.success === 0){
        swal({
          title: "Warning",
          text: res.data.message,
          icon: "warning",
          button: "OK",
        });
      }else{
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

    }
     )
    .catch(err => console.log(err));


}
const DeleteAuth = async(list,data) =>{
 
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
        setShowBackdrop(true);
        UpdateEmployeeAccess.EMP_UPTDACCESS(formData)
        .then(res => {
          console.log(res.data.result)
          setAccessEmp(res.data.result)
          setShowBackdrop(false);
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
const AddRoles = async() =>{
  
  if(selectedModules1.length === 0){
    swal({
      title: "Warning",
      text: "Please select staff first!",
      icon: "warning",
      button: "OK",
    });
    return
  }
    let counter = 0;
    for(let i = 0;i < selectedModules1.length;i++){
      const val = selectedModules1[i];
      const formData = new FormData();
      formData.append('role',val)
      setShowBackdrop(true);
      BmccAddroles.ADD_ROLE(formData)
      .then((res) =>{
        console.log(res)
        counter += 1;
        if(counter === selectedModules1.length){
          setShowBackdrop(false);
          const rl1 = res.data.roles.filter((data) => data.roleNum === 1);
          const rl2 = res.data.roles.filter((data) => data.roleNum === 2);
          const rl3 = res.data.roles.filter((data) => data.roleNum === 3);
          const rl4 = res.data.roles.filter((data) => data.roleNum === 4);
          setRoles(res.data.roles.sort((a, b) => a.role.localeCompare(b.role)))  
          setAdministrator(rl1);
          setManager(rl2);
          setOfficer(rl3);
          setCoordinator(rl4);  
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
const handleModuleCheckboxChange = (moduleId) => {

  if (selectedModules.includes(moduleId)) {
    setSelectedModules(selectedModules.filter((id) => id !== moduleId));
  } else {
    setSelectedModules([...selectedModules, moduleId]);
  }
};
const handleModuleCheckboxChange1 = (moduleId) => {

  if (selectedModules1.includes(moduleId)) {
    setSelectedModules1(selectedModules1.filter((id) => id !== moduleId));
  } else {
    setSelectedModules1([...selectedModules1, moduleId]);
  }
};
const weblist = websection.map((data,index) => {
  return(
    <>
  {isrole.includes(data.name) ? null : (<label key={index}>
    <input
      type="checkbox"
      className='checkaccess'
      value={data.id}
      checked={selectedModules.includes(data.name) || isrole.includes(data.name)}
      onChange={() => handleModuleCheckboxChange(data.name)}
    />
    {data.name}
  </label>)}
  </>)
})

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
            <div style={{margin:5,width:'100%',height:'30px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div>
                  <Typography sx={{fontSize:32,fontWeight:700,color:'#043F97',fontFamily:'Roboto Serif',lineHeight:'37px'}}>
                  Create Staff Accounts
                  </Typography>
                  <Typography sx={{fontSize:14,fontWeight:400,color:'#000000',fontFamily:'Roboto Serif',lineHeight:'16px'}}>
                  Fill up the necessary details.
                  </Typography>
                  </div>
                <div style={{width:'50px',marginRight:'15px',height:'50px',marginTop:'-35px'}}>
                <button style={{height:'100%',backgroundColor:'red',color:'white',padding:'0px',width:'100%',border:'none',borderRadius:'5px'}} onClick={handleClose}>
                  <MdClear style={{fontSize:'30px',fontWeight:'700'}}/>
                </button>
                </div>
              </div>
              <div>
                <TextField
                   label='Employee Name' 
                    margin='normal' 
                    variant='outlined'
                    size='small'
                    fullWidth
                    onChange={(e) =>setUsername(e.target.value)}  
                    color='secondary'
                    />
  
                <TextField
                   label='Email' 
                    margin='normal' 
                    variant='outlined'
                    size='small'
                    fullWidth
                    onChange={(e) =>setEmail(e.target.value)}  
                    color='secondary'
                    />
                  {errors.email && <p style={{color:'red',margin:'2px'}}>{errors.email}</p>}
                  <div style={{width:'100%',height:'50px',marginTop:'20px'}}> 
                    <Select
                      value={jobDes}
                      fullWidth
                      styles={{height:'100%'}}
                      onChange={handleChange}
                      placeholder="Select Role..."
                      options={roles.map((option) => ({
                        value: option.role,
                        label: `${option.role}(${option.total})`,
                      }))}
                    />
                  </div>
              <div>

            </div>
                <div className='modalbottombtn'>
                <Button sx={{textTransform:'none',backgroundColor:'red'}} className="myButton2" variant='contained' onClick={handleClose}>Cancel</Button>
                <Button sx={{marginLeft:'10px',textTransform:'none'}} className="myButton1" variant='contained' onClick={AddbMCC}>Add Employee</Button>
                </div>
                </div>
            </Box>
            </Modal>
            <Modal
                open={open1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                <div style={{margin:5,width:'100%',height:'30px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div>
                  <Typography sx={{fontSize:32,fontWeight:700,color:'#043F97',fontFamily:'Roboto Serif',lineHeight:'37px'}}>
                  Edit Staff Details
                  </Typography>
                  <Typography sx={{fontSize:14,fontWeight:400,color:'#000000',fontFamily:'Roboto Serif',lineHeight:'16px'}}>
                  Fill up the necessary details.
                  </Typography>
                  </div>
                <div style={{width:'50px',marginRight:'15px',height:'50px',marginTop:'-35px'}}>
                <button style={{height:'100%',backgroundColor:'red',color:'white',padding:'0px',width:'100%',border:'none',borderRadius:'5px'}} onClick={handleClose1}>
                  <MdClear style={{fontSize:'30px',fontWeight:'700'}}/>
                </button>
                </div>
                </div>

                <div style={{margin: '20px 0px 0px -10px'}} className="form">
                {olddata ? (
                  <>
                   <TextField 
                   variant='outlined' 
                   label='Staff Name'
                   size='small' 
                   fullWidth
                   sx={{marginBottom:'15px'}}
                   defaultValue={olddata.name}
                   />
                   <TextField 
                   variant='outlined' 
                   label='Staff Email' 
                   size='small'
                   fullWidth
                   defaultValue={olddata.email}
                   />
                  </>
                  ) : (null)}
                
                <div style={{marginTop:'10px',marginBottom:'10px'}}> 
                    {olddata.jobDescription !== 'Administrator' && (
                    <>
                    <label htmlFor="employee">Role:</label>
                    <Select
                      value={upjobDes}
                      fullWidth
                      onChange={handleChange3}
                      options={roles.map((option) => ({
                        value: option.role,
                        label: `${option.role}(${option.total})`,
                      }))}
                    /></>)}
                </div>
                {olddata.jobDescription !== 'Administrator' && (<div>
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
                </div>)}

                </div>
                <div className='modalbottombtn'>
                <Button sx={{textTransform:'none',marginRight:'15px',backgroundColor:'red'}} className="myButton2" variant='contained' onClick={handleClose1}>
                  Cancel
                </Button>
                <Button sx={{textTransform:'none'}} className="myButton1" variant='contained' onClick={UpdateBMCC}>Save Changes</Button>
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
                  <TiArrowBack />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1,fontWeight:'bold',textTransform:'capitalize' }} variant="h6" component="div">
                  Staff Role Management
                </Typography>
              </Toolbar>
            </AppBar>
              <Box sx={{padding:'15px',backgroundColor:'#f1f3fa'}}>
                <Card sx={{padding:'15px',display:'flex',justifyContent:'space-between'}}>
                  <div style={{width:'80%'}}>
                  <Typography sx={{color:'blue',fontWeight:'bold'}}>LIST OF ROLES</Typography>
                  <ul className='descript'>
                      <li><p><strong>Account Creation</strong> - Responsible for creating employee accounts and assigning access privileges to the MYDO website.</p></li>
                      <li><p><strong>Account Management</strong> - Responsible for editing employee details and status.</p></li>
                      <li><p><strong>Scholarship Programs</strong> - In charge of creating and managing scholarship programs and their statuses.</p></li>
                      <li><p><strong>Score Card</strong> - Responsible for configuring scoring criteria for specific questions and answers on application forms.</p></li>
                      <li><p><strong>Requirements Management</strong> - Responsible for creating lists of requirements for specific scholarship programs.</p></li>
                      <li><p><strong>Evaluation</strong> - Responsible for evaluating and determining the status of registered applicants.</p></li>
                      <li><p><strong>Passing Score and Slots</strong> -  In charge of setting and adjusting passing scores and available slots for specific scholarships.</p></li>
                      <li><p><strong>Requirements Verification</strong> - Responsible for checking and verifying documents submitted by applicants.</p></li>
                      <li><p><strong>Applicant Management</strong> - Responsible for adding and managing applicant profiles, including marking them as successful or unsuccessful.</p></li>
                      <li><p><strong>Appointment Scheduling</strong> -  Responsible for scheduling appointments for qualified applicants and evaluating their interview results.</p></li>
                      <li><p><strong>Appointment Management</strong> - Responsible for adding and managing appointments, including marking them as successful or unsuccessful.</p></li>
                      <li><p><strong>Scholarship Monitoring</strong> -  In charge of monitoring and managing the activities of scholars.</p></li>
                      <li><p><strong>News and Announcements</strong> -  Responsible for creating the latest news and announcements to inform scholars and applicants.</p></li>
                      <li><p><strong>Rule Implementation</strong> - Responsible for enforcing the rules and guidelines of the scholarship program.</p></li>
                      <li><p><strong>Website Maintenance</strong> - Responsible for regularly updating the content of the website for both applicants and scholars.</p></li>
                      <li><p><strong>Reporting</strong> - Responsible for generating summaries and reports on scholarship program data.</p></li>
                  </ul>
                  </div>
                  <div style={{width:'20%'}}>
                    <Typography sx={{color:'blue',fontWeight:'bold'}}>LIST OF STAFFS</Typography>
                    <div className='listofrole'>
                      <div className='rolesect'>
                        <div>
                        {Administrator?.map((data) =>{
                          return(
                            <>
                            <li>{data.role}</li>
                            </>
                          ) 
                        })}
                        </div>
                        <div>
                        {Officer?.map((data) =>{
                          return(
                            <>
                            <li>{data.role}</li>
                            </>
                          )
                          
                        })}
                        
                        </div>
                      </div>
                      <div className='rolesect'>
                        <div>
                        {Manager?.map((data) =>{
                          return(
                            <>
                            <li>{data.role}</li>
                            </>
                          )
                          
                        })}
                        
                        </div>
                        <div>
                        {Coordinator?.map((data) =>{
                          return(
                            <>
                            <li>{data.role}</li>
                            </>
                          )
                          
                        })}
                      
                        </div>
                      </div>
                    </div>
                    {!btnstaff && <Button onClick={() =>setBtnstaff(true)} sx={{fontSize:'12px',textTransform:'none'}}><AddIcon sx={{fontSize:'12px'}}/>Add Staff</Button>}
                    {btnstaff && <Button onClick={() =>setBtnstaff(false)} sx={{fontSize:'12px',textTransform:'none'}}>Close</Button>}

                    {btnstaff && (
                    <>
                    <Typography sx={{fontSize:'14px',fontStyle:'italic'}}>Select  staff you want to add</Typography>
                    <div className='roleaddbtn'>
                      {roles.map((data,index) => (
                        <>
                        {data.role === 'Administrator' ? (null) : (<label key={index}>
                          <input
                            type="checkbox"
                            className='checkaccess'
                            value={data.id}
                            checked={selectedModules1.includes(data.role)}
                            onChange={() => handleModuleCheckboxChange1(data.role)}
                          />
                          {data.role}
                        </label>)}
                        </>
                      ))}
                    </div>
                    <Button sx={{backgroundColor:'blue',color:'white',textTransform:'none'}} variant='contained' onClick={AddRoles}>Add Staff</Button>
                    </>
                    )}
                    
                  </div>
                </Card>
              <div style={{marginTop:'20px'}}> 
                <label style={{color:'blue',fontWeight:'bold',fontSize:'16px'}} htmlFor="employee">ROLE</label>
                <Select
                  value={jobDes}
                  fullWidth
                  placeholder='Select roles here ...'
                  onChange={handleChange}
                  options={roles.map((option) => ({
                    value: option.role,
                    label: `${option.role}(${option.total})`,
                  }))}
                />
              </div>
                <div style={{margin:'15px'}}>
                  <div style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center',margin:'5px'}}>
                  <label style={{marginLeft:'-15px',color:'blue',fontWeight:'bold',fontSize:'16px',textTransform:'uppercase'}} htmlFor="section">Choose Roles Access here</label>
                </div>
                        <div>
            <div className='websacc'>
            {weblist}
            </div>
          </div>
                  <div style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end',margin:'10px'}}>
                  <Button sx={{textTransform:'none',backgroundColor:'blue'}} variant='contained' onClick={Authorization}>
                  Save Role Access
                </Button>
                  </div>

                </div>

                <div className='authlist'>
                {accessEmp?.map((data) => {
                  const lists = data.accessList?.split(',').map(list => list.trim());
                  return (
                    <>
                    {data.role === 'Administrator' ? null : (<div className='roleacclist' style={{width:'100%',height:'100%'}} key={data.id}>
                      <p style={{textTransform:'uppercase',marginTop:'10px'}}>{data.role} access list</p>
                      <div className='staffacclist'>
                      <ul>
                        {lists?.map((list, index) => {
                          if (list === '') return null; 
                          return (
                            <>
                            <li key={index}>
                            {list} <button style={{ backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer',marginLeft:'25px',width:'20px' }} onClick={() => DeleteAuth(list, data)}>x</button>
                            </li>
                            
                            </>
                          );
                        })}
                      </ul>
                      </div>

                    </div>)}
                    </>
                  );
                })}
                </div>
              </Box>
            </Dialog>
            <div className="top">
              <Card elevation={0} style={{width:'100%',display:'flex',justifyContent:'space-between',height:100,alignItems:'center',border:'none',paddingRight:'15px'}}>
              <h1 style={{color:'#043F97',textTransform:'uppercase'}}>Staff Accounts</h1>
              </Card>             
              <div className="containeremaccs">
                    {activeState === 'log' && 
                    <div className="emacsslist">
                      <div style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
                        <div>
                          <p className='stafflish'>Staff List</p>
                        </div>
                        <div>
                              <Button 
                              sx={{height:'35px',textTransform:'none',color:'blue',backgroundColor:'rgba(246, 246, 246, 1)',fontWeight:'bold',marginRight:'10px',
                              '&:hover': {
                                backgroundColor: '#043F97',
                                color:'white',
                                cursor: 'pointer',
                              },
                            }}
                              onClick={handleClick}
                              variant='contained' size='small'>
                                {activeState === 'admin' && 'Manage Employee'}
                                {activeState === 'log' && 'View Activity Log'}
                              </Button>
                              <Button sx={{height:'35px',textTransform:'none',color:'blue',backgroundColor:'rgba(246, 246, 246, 1)',fontWeight:'bold',marginRight:'10px',
                                '&:hover': {
                                  backgroundColor: '#043F97',
                                  color:'white',
                                  cursor: 'pointer',
                                },  
                            }}
                               variant='contained' onClick={handleOpen2}> Manage staffs </Button>
                              <Button sx={{height:'35px',textTransform:'none',color:'blue',backgroundColor:'rgba(246, 246, 246, 1)',fontWeight:'bold',marginRight:'8px',
                                '&:hover': {
                                  backgroundColor: '#043F97',
                                  color:'white',
                                  cursor: 'pointer',
                                },  
                            }}
                               variant='contained' onClick={handleOpen}> Add staffs </Button>
                        </div>
                      </div>
                      <div className='dataGridCon'>
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
                      </div>
                      
                    </div>}

                    {activeState === 'admin' && 
                    <Card sx={{backgroundColor:'white'}}>
                    <div className="emaccsact">
                      <div style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
                      <p className='stafflish'>Activity Log</p>
                      <Button 
                              sx={{height:'35px',textTransform:'none',color:'blue',backgroundColor:'rgba(246, 246, 246, 1)',fontWeight:'bold',marginRight:'10px',
                              '&:hover': {
                                backgroundColor: '#043F97',
                                color:'white',
                                cursor: 'pointer',
                              },
                            }}
                              onClick={handleClick}
                              variant='contained' size='small'>
                                {activeState === 'admin' && 'Manage Employee'}
                                {activeState === 'log' && 'View Activity Log'}
                      </Button>
                      </div>

                      <div className='dataGridCon' style={{width:'100%'}}>
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
                      </div>
                    </div>
                    </Card>
                    }
              </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Faqs