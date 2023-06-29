import './scholars.scss';
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { Tabs, Tab, Box, Modal, Card } from "@mui/material"; 
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DataGrid} from '@mui/x-data-grid';
import React, {useEffect, useState} from 'react'
import { FetchingBmccScho, FetchingBmccSchoinfo,ScholarStand ,ListofReq} from '../../api/request';
import './scholar.css'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { green, red } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import swal from 'sweetalert';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

const OnlineBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.mode === 'light' ? green[500] : green[700], // Green color when online
    color: theme.palette.mode === 'light' ? green[500] : green[700],
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    width: '30px',
    height: '30px',
    borderRadius: '50%'
  },
}));

const OfflineBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.mode === 'light' ? red[500] : red[700], // Red color when offline
    color: theme.palette.mode === 'light' ? red[500] : red[700],
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    width: '30px',
    height: '30px',
    borderRadius: '50%'
  },
}));

const Scholars = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState(0);
  const [schoinf1,setSchoInf1] = useState([]);
  const [schoinf2,setSchoInf2] = useState([]);
  const [schoinf3,setSchoInf3] = useState([]);
  const [schodocs,setSchodocs] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [reason,setReason] = useState('');
  const [status,setStatus] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    async function Fetch(){
      const scholars = await FetchingBmccScho.FETCH_SCHOLARS()
      console.log(scholars)
      setData(scholars.data.Scholars)
    }
    Fetch();
  }, []);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '100%%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow:'auto'
  };
  const stylediv = {
    width: '100%',
    fontSize:'20px',
    textAlign:'center'
  };
  
  const view = async(data) =>{
    console.log(data)
    setOpen(true)
    const applicantNum = data.applicantNum
    const response = await FetchingBmccSchoinfo.FETCH_SCHOLARSINFO(applicantNum)
    const req = await ListofReq.FETCH_REQUIREMENTS()
    console.log(response.data.ScholarInf.results1[0])
    setSchodocs(req.data.Requirements.results1)
    setSchoInf1(response.data.ScholarInf.results1[0])
    setSchoInf2(response.data.ScholarInf.results2[0])
    setSchoInf3(response.data.ScholarInf.results3)
  }

  const columns = [
    { 
      field: 'scholarId', 
      headerName: 'ID',
      width: 79
     },
     {
       field: 'scholarCode', 
        headerName: 'Scholar Code',
      width: 100
      },
    {
      field: 'scholarshipApplied',
      headerName: 'Scholarship Applied',
      width: 165,
      editable: false,
    },
    {
      field: 'Name',
      headerName: 'Name',
      width: 200,
      editable: false,
    },
    {
      field: 'yearLevel',
      headerName: 'Year Level',
      width: 120,
      editable: false,
    },
    {
      field: 'Baranggay',
      headerName: 'Baranggay',
      width: 120,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 80,
      editable: false,
    },
    {
      field: 'Batch',
      headerName: 'Batch',
      width: 80,
      editable: false,
    },
    {
      field: 'insert',
      headerName: 'Actions',
      width: 90,
      renderCell: (params) => (
        <button className="viewBtnScholars" onClick={() => view(params.row)}>View</button>
      ),
    },
    {
      field: 'standing',
      headerName: 'Standing',
      width: 110,
    },

  ];
  const handleTabClick = (newValue) => {
    setValue(newValue);
  };
  const OnlineAvatar = ({ user}) => {
    console.log(user)
    return (
      <>
        {user.isOnline === 'True' ? (
          <OnlineBadge overlap="circular" variant="dot" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Avatar sx={{ width: '150px', height: '150px', borderRadius: '50%' }} alt={user.Name} src={user.profile} />
          </OnlineBadge>
        ) : (
          <OfflineBadge overlap="circular" variant="dot" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Avatar sx={{ width: '150px', height: '150px', borderRadius: '50%',border:'2px solid black' }} alt={user.Name} src={user.profile} />
          </OfflineBadge>
        )}
      </>
    );
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const requirements = schoinf3?.map((docu, index) => {
      return (
          <>
          <div className='doclistschocont'>
          <Box sx={{width:'100%', height:'100%'}}>
            <Card elevated={15}>
          <div className='reqlistcontainer' key={index}>
          <div className="requirelist">
            <div className="requireprev">   
            <img style={{width:'50px'}} src={docu.File} alt='No Image'/>
            </div>
            <div className='userlistreq'>
          <label htmlFor="">{docu.requirement_Name}</label>
          </div>
          </div>
          {(index + 1) % 4 === 0 && <br />}
          </div>
          </Card>
          </Box>
          </div>
          </>
          )    

    });
    const requirementsListed = schodocs?.map((docu, index) => {
      const valueToCheck = docu.requirementName;
      const hassubmit = schoinf3.some((item) => item.requirement_Name === valueToCheck);
      const deadline = new Date(docu.deadline); // Convert the deadline string to a Date object
      const currentDate = new Date(); // Get the current date
    
      const isPastDue = currentDate > deadline && !hassubmit;
    
      return (
        <React.Fragment key={index}>
          <Box>
            <Card elevated={15} sx={{height:'100%'}}>
              <div className='reqlistcontainer'>
                <div className="requirelist">
                  <div className='userlistreq'>
                    <label htmlFor="">{docu.requirementName}</label>
                    <span>Deadline: {docu.deadline}</span>
                    {isPastDue ? (
                      <p>Past due: Document submission is no longer possible.</p>
                    ) : (
                       !hassubmit ? (
                        <input
                          type="text"
                          name={`${docu.requirementName}`}
                        />
                      ) : (
                        <p>Already Submitted</p>
                      )
                    )}
                  </div>
                </div>
                {(index + 1) % 4 === 0 && <br />}
              </div>
            </Card>
          </Box>
        </React.Fragment>
      );
    });

    const handleButtonOpenDialog = async () => {
      console.log(status)
      if (status === 'Hold' || status === 'Disqualified') {
        setOpenDialog(true);
      } else {
        await handleButtonClick();
      }
    };
    const handleDialogSubmit = async () => {
      await handleButtonClick();
      setOpenDialog(false);
    };
    const handleCloseDialog = async () => {
      setOpenDialog(false);
    };
    const handleButtonClick = async () => {
      const applicantNum = schoinf1.applicantNum
        const res = await FetchingBmccSchoinfo.FETCH_SCHOLARSINFO(applicantNum)
        console.log(res)
        const email = res.data.ScholarInf.results1[0].email;
        const standing = status
        console.log(status,applicantNum,reason,email)
        const formData = new FormData();
        formData.append('status',standing);
        formData.append('applicantNum',applicantNum);
        formData.append('reason',reason)
        formData.append('email',email)
       const response = await ScholarStand.UPDATE_SCHOSTAND({status,applicantNum,reason,email});
        console.log(response);
        if(response.data.success === 1){
          swal('Standing Update')
          setData(response.data.result)
        }
        else{
          swal('Something went Wrong')
        }
    }

  return (
    <>
         <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Failed</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter the Reason for Failing
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Reason"
            type="text"
            value={reason}
            fullWidth
            onChange={(e) => setReason(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDialogSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
      <Box sx={style}>
        <div className='hbtnschocon'>
          <button onClick={handleClose}>X</button>
        </div>
        <div className="schoinfocon">
          <div className="leftshco">
            <div className="profilescho">
              <div className="schopic">
              <OnlineAvatar user={schoinf2} />
              </div>
              <div className="schopicdet">
                <p>{schoinf1.Name}</p>
                <p>{schoinf1.email}</p>
              </div>
            </div>
            <div className="scholog">
            <List sx={stylediv} component="nav" aria-label="mailbox folders">
              <ListItem button onClick={() => handleTabClick(0)}>
                <ListItemText primary="Personal Information" />
              </ListItem>
              <Divider />
              <ListItem button onClick={() => handleTabClick(1)}>
                <ListItemText primary="Scholar Information" />
              </ListItem>
              <Divider light />
              <ListItem button onClick={() => handleTabClick(2)}>
                <ListItemText primary="Documents List" />
              </ListItem>
            </List>
            <div className="status">
                <FormLabel id="demo-row-radio-buttons-group-label" className="stat"> Standing </FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={status}
                    sx={{justifyContent: 'center'}}
                    onChange={(e) =>{
                     const stat = e.target.value;
                      setStatus(stat);
                    }}>

                
                <FormControlLabel value="Active" control={<Radio />} label="Active" className="edtstatus"/>
                <FormControlLabel value="Hold" control={<Radio />} label="Hold" className="edtstatus"/>
                <FormControlLabel value="Disqualified" control={<Radio />} label="Disqualified" className="edtstatus"/>
               
                </RadioGroup>
                </div>
                <Button variant='contained' fullWidth onClick={handleButtonOpenDialog}>Save</Button>
          </div>
          </div>

          <div className="rigthscho">
            {value === 0 && <div>
                <h1 style={{textAlign: 'center'}}>PERSONAL INFORMATION</h1>
                <div className='peschocoon'>
              <Card elevation={5} sx={{ width:'90%', margin:'10px', height:'100%' }}>
              <CardContent>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Name: {schoinf1.Name}
                </Typography>
                <Typography variant="h5" component="div">
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Age: {schoinf1.age}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Birthday: {schoinf1.birthday}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Birth of Place: {schoinf1.birthPlace}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Citizenship: {schoinf1.citizenship}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Contact Number: {schoinf1.contactNum}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Address: {schoinf1.caddress}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary" gluttterBottom>
                  Baranggay: {schoinf1.baranggay}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Current School Enrolled: {schoinf1.currentSchool}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Year Level: {schoinf1.currentYear}
                </Typography>
              </CardContent>
              </Card>
                </div>
              </div>}
              {value === 1 && 
              
              <div>
                <h1 style={{textAlign: 'center'}}>SCHOLAR INFORMATION</h1>
                <div className='peschocoon'>
              <Card elevation={5} sx={{ width:'90%', margin:'10px', height:'100%' }}>
              <CardContent>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Name: {schoinf1.Name}
                </Typography>
                <Typography variant="h5" component="div">
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Applicant Code: {schoinf2.applicantCode}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Scholar Code: {schoinf2.scholarCode}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Birth of Place: {schoinf1.birthPlace}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Batch: {schoinf2.Batch}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Contact Number: {schoinf1.contactNum}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Email: {schoinf2.email}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary" gluttterBottom>
                  Baranggay: {schoinf1.baranggay}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Status: {schoinf2.status}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Year Level: {schoinf1.currentYear}
                </Typography>
              </CardContent>
              </Card>
                </div>
              </div>}

              {value === 2 && <><h1>DOCUMENTS</h1><div className='doculistscho'>
                <div style={{width:'100%',display:'flex',height:'150px'}}>
              {requirementsListed}
              </div>
                {requirements}

                </div></>}
          </div>
        </div>
      </Box>
    </Modal>

    <Modal             
    open={open1}
    onClose={handleClose1}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">
      <Box sx={style}>
      <div className='hbtnschocon'>
          <button onClick={handleClose1}>X</button>
        </div>

      </Box>
    </Modal>
    <div className="scholars">
        <Sidebar/>
        <div className="scholarsContainer">
            <Navbar/>
            <div className="top">
            
    <h1>Scholars</h1>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.scholarId}
        scrollbarSize={10}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[25]}
        checkboxSelection
        disableRowSelectionOnClick
      />
              </Box>

            </div>
        </div>
    </div>
    </>
  )
}

export default Scholars