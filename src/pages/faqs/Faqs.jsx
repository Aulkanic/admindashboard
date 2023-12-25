import './faqs.scss';
import './employeeaccs.css'
import React, {useEffect, useState} from 'react'
import { AddBMCC,FetchingBMCC,Activitylog,UpdateEmp,ListAccess,EmployeeAccess,WebSection,UpdateEmployeeAccess,
BmccAddroles,BmccRoles } from '../../api/request';
import { Box, Modal,Card,Button, Typography, InputLabel} from "@mui/material"; 
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
import Select from 'react-select';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { CustomModal } from '../../components/Modal/CustomModal';
import { CreateStaff } from '../../Page/Private/Staff/Modal.jsx/CreateStaff';
import AddBmcc from '../../Page/Private/Staff/Action/AddBmcc';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));


const Faqs = () => {
  const { admin  } = useSelector((state) => state.login)
  const [loading, setLoading] = useState(false);
  const [createStaff,setCreateStaff] = useState({
    username: '',
    email: '',
    jobDes: ''
  })
  const [updateStaff,setUpdateStaff] = useState({
    oldData: [],
    newData:{
      jobDes: '',
      status: '',
    }
  })
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
    fontWeight:'bold'
  },

});
  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '1070px',
    height: 'maxContent',
    bgcolor: 'background.paper',
    padding:'70px 30px 20px 30px',
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
      width: 300,
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
        <button className='btnofficials1' onClick={() => handleOpen1(params.row)}>Edit Details</button>
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
    setCreateStaff({
      ...createStaff,
      jobDes: selected
    })
    const det = accessEmp?.filter((data) => data.role === selected.value)
    setIsRole(det[0].accessList)
  };
  const handleInputChange = (event) =>{
     const { name,value,id } = event.target;
     if(id === 'Create'){
      setCreateStaff({...createStaff,[name]: value})
     }else{
      setUpdateStaff((prev) =>({
        ...prev,
        newData:{
          ...prev.newData,
          [name]: value
        }
      }))
     }

  }
  const handleOptionChange = (data)=>{
    const { name,value,id } = data;
    if(id === 'Create'){
      setCreateStaff({...createStaff,[name]: value})
     }else{
      setUpdateStaff((prev) =>({
        ...prev,
        newData:{
          ...prev.newData,
          [name]: value
        }
      }))
     }
  }
  const handleChange3 = (selected) => {
    setUpJobdes(selected);
  };

  const handleClose1 = () => setOpen1(false);
  useEffect(() =>{
        async function Fetch(){
        const list = await FetchingBMCC.FETCH_BMCC()
        const actlog = await Activitylog.ACTIVITY_LOG()
        const web = await WebSection.WEB_SEC()
        const rls = await BmccRoles.BMCC_ROLE()
        const rl1 = rls.data.roles.filter((data) => data.roleNum === 1);
        const rl2 = rls.data.roles.filter((data) => data.roleNum === 2);
        const rl3 = rls.data.roles.filter((data) => data.roleNum === 3);
        const rl4 = rls.data.roles.filter((data) => data.roleNum === 4);
          setRoles(rls.data.roles.sort((a, b) => a.role.localeCompare(b.role)))  
          setAdministrator(rl1);
          setManager(rl2);
          setOfficer(rl3);
          setCoordinator(rl4);  
          setWebsection(web.data.result)
          setBmcc(list.data.message)
          const activitylog = actlog.data.Log
          setActlog(activitylog.reverse())
        }
        Fetch();
        const intervalId = setInterval(Fetch, 5000);
        return () => {
          clearInterval(intervalId);
        };
  },[])

  const handleAddBmcc = () => {
    AddBmcc({
      setErrors,
      setOpen,
      setBmcc,
      setCreateStaff,
      setLoading,
      createStaff
    });
  };


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
    <div className="faqs">
        <div className="faqsContainer">
           <CustomModal
            open={open}
            title={'Add Staff'}
            onClose={handleClose}
            content={<CreateStaff
            data={createStaff}
            options={roles}
            onSubmit={handleAddBmcc}
            handleInput={handleInputChange}
            handleSelect={handleOptionChange}
              />}
           />

            {/* <Modal
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
                  <div>
                    <InputLabel>Staff Name</InputLabel>
                    <TextField 
                   variant='outlined' 
                   size='small' 
                   fullWidth
                   sx={{marginBottom:'15px'}}
                   defaultValue={olddata.name}
                   />
                  </div>
                  <div>
                    <InputLabel>Staff Email</InputLabel>
                    <TextField 
                   variant='outlined' 
                   size='small'
                   fullWidth
                   defaultValue={olddata.email}
                   />
                  </div>
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
                      options={roles
                        .filter(data => data.role !== 'Administrator')
                        .map((option) => ({
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
                <button style={{marginRight:'10px'}} className='btnofficials2' onClick={handleClose1}>
                  Cancel
                </button>
                <button className="btnofficials" onClick={UpdateBMCC}>Save Changes</button>
                </div>
                </Box>
            </Modal> */}
            {/* <Dialog
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
                  options={roles
                    .filter(data => data.role !== 'Administrator')
                    .map((option) => ({
                    value: option.role,
                    label: `${option.role}(${option.total})`
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
                  <button className='btnofficials1' onClick={Authorization}>
                  Save Role Access
                </button>
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
            </Dialog> */}
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
                              <button
                              className='btnofficials1'
                              onClick={handleClick}
                              variant='contained' size='small'>
                                {activeState === 'admin' && 'Manage Employee'}
                                {activeState === 'log' && 'View Activity Log'}
                              </button>
                              <button style={{margin:'0px 10px 0px 10px'}} className='btnofficials1'
                               onClick={handleOpen2}>
                                 Manage staffs 
                              </button>
                              <button className='btnofficials1'
                               onClick={handleOpen}>
                                 Add staffs 
                            </button>
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
                    <Card sx={{backgroundColor:'white',padding:'10px'}}>
                    <div className="emaccsact">
                      <div style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
                      <p className='stafflish'>Activity Log</p>
                      <button
                              className='btnofficials1'
                              onClick={handleClick}
                              >
                                {activeState === 'admin' && 'Manage Employee'}
                                {activeState === 'log' && 'View Activity Log'}
                      </button>
                      </div>

                      <div style={{padding:'0px 20px 30px 40px'}} className='dataGridCon'>
                      <CustomDataGrid 
                        rows={actlog}
                        sx={{height:'100%'}}
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