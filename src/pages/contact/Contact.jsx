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
import swal from 'sweetalert';

const Contact = () => {
  const [reqlist, setReqlist] = useState([]);
  const [submitted, setSublist] = useState([]);
  const [open, setOpen] = useState(false);
  const [schocat, setSchocat] = useState([]);
  const[schoName,setSchoname] = useState('');
  const[requirementName,setReqname] = useState('');
  const[batch,setBatch] = useState('');

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
    height: '400',
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
    const { requirementID, requirementName, schoName, Status,batch } = requirement;

    const submissions = submitted.filter((submission) => submission.requirement_Name === requirementName);

    return {
      requirementID,
      requirementName,
      schoName,
      batch,
      Status,
      numSubmissions: submissions.length,
    };
  });
  console.log(mergedData)
  const handleChange = async (event) => {
    const value = await event.target.value;
    setSchoname(value);

  };

  const AddReq = () =>{
      Addrequirements.ADD_REQUIREMENTS({schoName,requirementName,batch})
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
      width: 100
     },
     {
      field: 'schoName', 
       headerName: 'Scholraship Category',
     width: 300
     },
     {
       field: 'requirementName', 
        headerName: 'Requirements',
      width: 300
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
      width: 150,
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
                <button onClick={handleClose}>X</button>

                </div>
                <div style={{margin: 20}} className="form">
                <div className="selectschoreqadd">
                <FormControl sx={{ minWidth: 400 }}>
            <InputLabel sx={{color:'green'}} id="demo-simple-select-label">Choose Scholarship Category</InputLabel>
            <Select
                 MenuProps={{
                  getContentAnchorEl: null,
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
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
                <TextField
                   label='Requirement Name' 
                    margin='normal' 
                    variant='outlined'
                    size='large'
                    fullWidth
                    onChange={(e) =>setReqname(e.target.value)}  
                    color='secondary'/>
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
                <button onClick={handleClose}>Cancel</button>
                <button onClick={AddReq}>Add</button>
                </Box>
              </Modal>
              <h1>Requirements</h1>
              <button onClick={handleOpen}>Add</button>
              <DataGrid
        rows={mergedData}
        columns={columns}
        getRowId={(row) => row.requirementID}
        scrollbarSize={10}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[25]}
        checkboxSelection
        disableRowSelectionOnClick
      />
            </div>
        </div>
    </div>
  )
}

export default Contact