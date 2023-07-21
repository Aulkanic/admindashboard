import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './contact.scss';
import { Box, Modal,Button,Card} from "@mui/material"; 
import { DataGrid} from '@mui/x-data-grid';
import { ListofReq, FetchingSchoProg, Addrequirements,NewDeadline,DeleteReq,ListAccess } from '../../api/request';
import { useState } from 'react';
import { useEffect } from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import MuiAlert from '@mui/material/Alert';
import swal from 'sweetalert';
import moment from "moment";
import '../Button style/button.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useContext } from "react";
import { admininfo } from "../../App";
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled, ThemeProvider, createTheme } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';

const theme = createTheme();
const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));

const StyledButton = styled(Button)`
  && {
    float: right;
    background-color: red;
    transition: opacity 0.3s ease;
    color:white;

    &:hover {
      opacity: 0.8;
    }
  }
`;
const StyledButtonEdit = styled(Button)`
  && {
    float: right;
    background-color: green;
    transition: opacity 0.3s ease;
    color:white;
    margin-right:10px;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const Contact = () => {
  const { loginUser,user } = useContext(admininfo);
  const [reqlist, setReqlist] = useState([]);
  const [submitted, setSublist] = useState([]);
  const [open, setOpen] = useState(false);
  const [schocat, setSchocat] = useState([]);
  const[schoName,setSchoname] = useState('');
  const[requirementName,setReqname] = useState('');
  const [showBackdrop, setShowBackdrop] = useState(false);
  const[batch,setBatch] = useState('');
  const [deadline,setDeadline] = useState('');
  const [newDeadline,setNewDeadline] = useState('');
  const [errors, setErrors] = useState({});
  const [docsfor,setDocsfor] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selected,setSelected] = useState([])
  const [access,setAccess] = useState([])
  const handleCloseDialog = () => setOpenDialog(false);
  const [accessList,setAccesslist] = useState([]);
  const handleOpenDialog = (data) => {
    if (user.jobDescription === 'Admin' || user.jobDescription === accessList.reqSec) {
      setOpenDialog(true);
      setSelected(data)
    } 
    else{
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      });
      return;
    }
  }

  const handleYearChange = (event) => {
    setBatch(event.target.value);
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let year = currentYear; year >= 1900; year--) {
      years.push(year);
    }

    return years;
  };
  const handleOpen = () => {
    const isValueIncluded = access[0]?.sectionId.includes('Requirements');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '80%',
    bgcolor: 'background.paper',
    overflow: 'auto',
    padding:'10px',
    borderRadius:'10px'
  };

  useEffect(() => {

    async function Fetch(){
      setShowBackdrop(true);
      const req = await ListofReq.FETCH_REQUIREMENTS()
      const scho = await FetchingSchoProg.FETCH_SCHOPROG()
      const res = await ListAccess.ACCESS()
      let acc = await ListAccess.ACCESS()
      const empacc = acc.data.result?.filter(data => data.employeeName === user.name)
      setAccess(empacc)
      setAccesslist(res.data.result[0])
      setReqlist(req.data.Requirements.results1);
      setSublist(req.data.Requirements.results2);
      setSchocat(scho.data.SchoCat);
      setShowBackdrop(false);
    }
    Fetch();
  }, []);

  const mergedData = reqlist.map((requirement) => {
    const { requirementID, requirementName, schoName, Status,batch,deadline,docsfor } = requirement;

    const submissions = submitted.filter((submission) => submission.requirement_Name === requirementName);

    return {
      requirementID,
      requirementName,
      schoName,
      batch,
      Status,
      deadline,
      docsfor,
      numSubmissions: submissions.length,
    };
  });
  const handleChange = async (event) => {
    const value = await event.target.value;
    setSchoname(value);

  };
  const AddReq = (e) =>{
    const isValueIncluded = access[0]?.sectionId.includes('Requirements');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    if(schoName === '' || requirementName === '' || batch === '' || deadline === '' || docsfor === ''){
      swal({
        text: 'Please Provide necessary Information',
        timer: 2000,
        buttons: false,
        icon: "warning",
      })
      return
    }
    e.preventDefault();
    let errors = {};
    const currentDate = moment();
    const date = new Date(deadline).toDateString();
    const targetDate = moment(date);
    
    if(!date || date === ''){
      errors.date = 'Select A Deadline Date First'
    }
    if (targetDate.isBefore(currentDate)) {
      errors.date ='Selected Deadline is less than the current date!';
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log(errors)
      return;
    }
    const formData = new FormData();
    formData.append('schoName',schoName)
    formData.append('requirementName',requirementName)
    formData.append('batch',batch)
    formData.append('deadline',date)
    formData.append('docsfor',docsfor)
    setOpen(false)
    setShowBackdrop(true);
      Addrequirements.ADD_REQUIREMENTS(formData)
      .then(res => {
        console.log(res)
        setReqlist(res.data.Requirements);
        setShowBackdrop(false);
        setOpen(true)
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
  const Edit = () =>{
    let errors = {};
    const isValueIncluded = access[0]?.sectionId.includes('Requirements');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    const currentDate = moment();
    if(!newDeadline || newDeadline === ''){
      errors.newdate = 'Select A Deadline Date First'
      swal({
        text: 'Select A Deadline Date First',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    else{
    const date = new Date(newDeadline).toDateString();
    const targetDate = moment(date);
    if (targetDate.isBefore(currentDate)) {
      swal({
        text: 'Selected Deadline is less than the current date!',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    const formData = new FormData();
    formData.append('newDeadline',date);
    formData.append('reqid',selected.requirementID)
    setShowBackdrop(true);
    NewDeadline.NEW_DEADLINE(formData)
    .then(res => {
      console.log(res)
      setReqlist(res.data.Requirements.results1);
      setOpenDialog(false)
      setShowBackdrop(false);
      swal({
        text: 'Updated Successfully',
        timer: 2000,
        buttons: false,
        icon: "success",
      })
      setErrors('')

    }
     )
    .catch(err => console.log(err));
  }
  }
  const Delete = (data) =>{
    const isValueIncluded = access[0]?.sectionId.includes('Requirements');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    const formData = new FormData();
    formData.append('reqID',data.requirementID)
    setShowBackdrop(true);
    DeleteReq.DELETE_REQ(formData)
    .then(res => {
      setReqlist(res.data.Requirements.results1);
      setShowBackdrop(false);
      setOpenDialog(false)
      swal({
        text: 'Deleted Successfully',
        timer: 2000,
        buttons: false,
        icon: "success",
      })
      setErrors('')

    }
     )
    .catch(err => console.log(err));
  }
  const columns = [
    { 
      field: 'requirementID', 
      headerName: 'ID',
      width: 50
     },
     {
      field: 'schoName', 
       headerName: 'Scholraship Category',
     width: 200
     },
     {
       field: 'requirementName', 
        headerName: 'Requirements',
      width: 200
      },
    {
      field: 'batch',
      headerName: 'Batch',
      width: 100,
      editable: false,
    },
    {
      field: 'docsfor',
      headerName: 'Requirements For',
      width: 150,
      editable: false,
    },
    {
      field: 'deadline',
      headerName: 'Deadline',
      width: 150,
      editable: false,
    },
    {
      field: 'numSubmissions',
      headerName: 'Total Submitted',
      width: 100,
      editable: false,
    },
    {
    field: 'insert',
    headerName: 'Actions',
    width: 250,
    renderCell: (params) => {

      return(
        <>
      <StyledButtonEdit className='myButton1' onClick={() => handleOpenDialog(params.row)}>Edit Deadline</StyledButtonEdit>
      <StyledButton className='myButton2' onClick={() => Delete(params.row)}>Delete</StyledButton>
      </>
    )},
    },

  ];
  return (
    <>
    <StyledBackdrop open={showBackdrop}>
    <CircularProgress color="inherit" />
  </StyledBackdrop>
    <div className="contact">
      <Sidebar/>
    <div className="contactContainer">
      <Navbar />

    <div className="top">
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
            <div className="buttonclosed">
              <StyledButton onClick={handleClose}> X </StyledButton>
            </div>
            <div className="form">
              <div style={{margin:10,width:'90%'}}>
              <h1 style={{color:'#666',fontWeight:1000}}>Create Requirements For Scholarship Program</h1>
              </div>
                    <div style={{width:'100%'}}>
                    <FormControl sx={{ width:'100%'}}>
                      <InputLabel id="demo-simple-select-label" className='inputlbl'>
                        Choose Scholarship Category
                      </InputLabel>
                        <Select
                            
                            MenuProps={{
                              getContentAnchorEl: null,
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',},
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',},
                              PaperProps: {
                                style: {
                                width: '50%',
                                maxHeight: 250,// Adjust the maximum height of the menu
                                },
                              },
                            }}
                          autoWidth
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label='Choose Scholarship Category'
                          value={schoName} 
                          onChange={handleChange}
                        >
                          {schocat?.map((item) => (
                              <MenuItem key={item.schoProgId} value={item.name} disabled={item.status === 'closed'}>
                                {item.name}
                              </MenuItem>
                            ))}
                        </Select>
                      
                        </FormControl> 
                    </div>
                    <div style={{width:'100%',}}>
                    <FormControl sx={{width:'100%',marginTop:'10px'}}>
                    <InputLabel id="demo-simple-select-autowidth-label">Requirements For:</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={docsfor}
                      onChange={(e) => setDocsfor(e.target.value)}
                      fullWidth
                      label="Requirements For"
                    >
                      <MenuItem value={'Renewal'}>Renewal</MenuItem>
                      <MenuItem value={'Application'}>Application</MenuItem>
                    </Select>
                  </FormControl>
                    </div>
                    <div>
                            <TextField 
                                label='Requirement Name' 
                                margin='normal' 
                                variant='outlined'
                                size='large'
                                fullWidth
                                onChange={(e) =>setReqname(e.target.value)}  
                                color='secondary'/>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField 
                    sx={{marginBottom:'10px'}}
                      className="dataField"
                      label="Deadline"
                      value={deadline}
                      fullWidth
                      onChange={(newValue) => setDeadline(newValue)}
                      format="MMM DD, YYYY"
                    />

                    {errors.date && <MuiAlert 
                    elevation={0} severity="error">
                    {errors.date}
                    </MuiAlert>}
                    </LocalizationProvider>
                    <div style={{marginTop:'10px'}}>
                            <TextField
                                select
                                label="Select a Year Batch"
                                value={batch}
                                onChange={handleYearChange}
                                fullWidth
                                color='secondary'
                              >
            
                                {generateYearOptions().map((year) => (
                                  <MenuItem key={year} value={year}>
                                    {year}
                                  </MenuItem>
                                ))}
                            
                            </TextField> 
                            </div>
                    </div>
                    <div style={{width:'100%',display:'flex',justifyContent:'space-around',margin:10}}>
                      <button className="myButton" onClick={handleClose}>Cancel</button>
                      <button className="myButton1" onClick={AddReq}>Add</button>
                    </div>
            </div>
        </Box>
      </Modal>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{color:'#666'}}>Edit Requirements Deadline of Submission</DialogTitle>
        <DialogContent>
          <div style={{margin:10}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField 
                    sx={{marginBottom:'10px'}}
                      className="dataField"
                      label="Set New Deadline"
                      value={newDeadline}
                      fullWidth
                      onChange={(newValue) => setNewDeadline(newValue)}
                      format="MMM DD, YYYY"
                    />

                    {errors.newdate && <MuiAlert 
                    elevation={0} severity="error">
                    {errors.newdate}
                    </MuiAlert>}
                    </LocalizationProvider>
                    </div>
        </DialogContent>
        <DialogActions>
          <Button sx={{color:'white'}} className='myButton' onClick={handleCloseDialog}>Cancel</Button>
          <Button sx={{color:'white'}} className='myButton1' onClick={Edit}>Save</Button>
        </DialogActions>
      </Dialog>
          <Card style={{padding:5,display:'flex',justifyContent:'space-between',margin:10}}>
        <h1>Requirements</h1>
          <button className="myButton1" onClick={handleOpen}> Add </button>
          </Card>
          <Card>
         <DataGrid style={{width: "100%", padding: 0.5,fontSize:12}}
            rows={mergedData}
            columns={columns}
            getRowId={(row) => row.requirementID}
            scrollbarSize={10}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },},}}
                  pageSizeOptions={[25]}
                checkboxSelection
              disableRowSelectionOnClick/>
              </Card>
         </div>
      </div>
    </div>
    </>
  )
}

export default Contact