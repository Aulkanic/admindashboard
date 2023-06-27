import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './contact.scss';
import { Box, Modal} from "@mui/material"; 
import { DataGrid} from '@mui/x-data-grid';
import { ListofReq, FetchingSchoProg, Addrequirements } from '../../api/request';
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

const Contact = () => {
  const [reqlist, setReqlist] = useState([]);
  const [submitted, setSublist] = useState([]);
  const [open, setOpen] = useState(false);
  const [schocat, setSchocat] = useState([]);
  const[schoName,setSchoname] = useState('');
  const[requirementName,setReqname] = useState('');
  const[batch,setBatch] = useState('');
  const [deadline,setDeadline] = useState('');
  const [errors, setErrors] = useState({});
  const [docsfor,setDocsfor] = useState('');

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '700',
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow: 'auto',
  };
  useEffect(() => {

    async function Fetch(){
      const req = await ListofReq.FETCH_REQUIREMENTS()
      const scho = await FetchingSchoProg.FETCH_SCHOPROG()
      console.log(req)
      setReqlist(req.data.Requirements.results1);
      setSublist(req.data.Requirements.results2);
      setSchocat(scho.data.SchoCat);
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
  console.log(mergedData)
  const handleChange = async (event) => {
    const value = await event.target.value;
    setSchoname(value);

  };

  const AddReq = (e) =>{
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
      Addrequirements.ADD_REQUIREMENTS(formData)
      .then(res => {
        console.log(res)
        setReqlist(res.data.Requirements);
        swal('Success');
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
      field: 'Status',
      headerName: 'Status',
      width: 150,
      editable: false,
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
      width: 200,
      editable: false,
    },
    {
      field: 'numSubmissions',
      headerName: 'Total Submitted',
      width: 250,
      editable: false,
    },

  ];
  return (
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
          <button onClick={handleClose}> X </button>
        </div>

        <div className="form">
        <div className="selectschoreqadd">
        <FormControl sx={{ minWidth: 500}}>
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
                    width: 500,
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
                    label="Select a year"
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
                <div className="modalBtn">
                  <button className="cnclBttn" onClick={handleClose}>Cancel</button>
                  <button className="addBttn" onClick={AddReq}>Add</button>
                </div>

                </div>
                
              
                </Box>
      </Modal>

        <h1>Requirements</h1>
          <button className="addBtn" onClick={handleOpen}> Add </button>

         <DataGrid sx={{width: 1200, padding: 0.5}} className="dataTbl"
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
         </div>
      </div>
    </div>
  )
}

export default Contact