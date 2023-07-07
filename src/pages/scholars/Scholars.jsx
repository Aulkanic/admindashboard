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
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledButton = styled(Button)`
  && {
    float: right;
    background-color: red;
    color:white;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;
const StyledButtonEdit = styled(Button)`
  && {
    background-color: green;
    color:white;
    margin-right:10px;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;
const StyledButtonAccess = styled(Button)`
  && {
    background-color: yellow;
    color:green;
    margin-right:10px;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;
const ViewButton = styled(Button)`
  && {
    background-color: blue;
    color:white;
    margin-right:10px;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;


const Scholars = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState(0);
  const [schoinf1,setSchoInf1] = useState([]);
  const [schoinf2,setSchoInf2] = useState([]);
  const [schoinf3,setSchoInf3] = useState([]);
  const [schoinf4,setSchoInf4] = useState([]);
  const [schodocs,setSchodocs] = useState([]);
  const [isComplete,setComplete] = useState('');
  const [questions, setQuestions] = useState([]);
  const [reason,setReason] = useState('');
  const [status,setStatus] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});

  useEffect(() => {
    async function Fetch(){
      const scholars = await FetchingBmccScho.FETCH_SCHOLARS()
      const req = await ListofReq.FETCH_REQUIREMENTS()
      setData(scholars.data.Scholars)
      setComplete(req.data.Requirements)
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };
  const openImageModal = (image,name) => {
    setSelectedImage({image,name});
    setImageModalOpen(true);
  };
  
  const closeImageModal = () => {
    setSelectedImage('');
    setImageModalOpen(false);
  };
  
  const view = async(data) =>{
    setOpen(true)
    const applicantNum = data.applicantNum
    const response = await FetchingBmccSchoinfo.FETCH_SCHOLARSINFO(applicantNum)
    const req = await ListofReq.FETCH_REQUIREMENTS()
    setSchodocs(req.data.Requirements.results1)
    setSchoInf1(response.data.ScholarInf.results1[0])
    setSchoInf2(response.data.ScholarInf.results2[0])
    const RequireDocs = req.data.Requirements.results1?.filter(docs => docs.schoName === schoinf2.scholarshipApplied)
    const renewalReq = RequireDocs?.filter((data) => data.docsfor === 'Renewal')
    const application = response.data.ScholarInf.results3?.filter((data) => data.docsFor === 'Application')
    const renewal = response.data.ScholarInf.results3?.filter((data) => data.docsFor === 'Renewal')
    const combinedData = renewalReq.map(requirement => {
      const requirementName = requirement.requirementName;
      const matchingApplicantData = renewal.filter(applicant => applicant.requirement_Name === requirementName);
      return { ...requirement, applicantData: matchingApplicantData };
    });
    setSchoInf3(application)
    setSchoInf4(combinedData)
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
      renderCell: (params) =>{
        const renewal = isComplete.results1.filter(docs => docs.schoName === params.row.scholarshipApplied)
        const renewal1 = renewal.filter(docs => docs.docsfor === 'Renewal')
        const renewalSubmitted = isComplete.results2.filter(docs => docs.applicantId === parseFloat(params.row.applicantNum) && docs.docsFor === 'Renewal');
        const Status = `${renewalSubmitted.length}/${renewal1.length}`
        return (
          <>
          <p>{Status}</p>
          </>
        )
      }
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


    const handleButtonOpenDialog = async () => {
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
        const email = res.data.ScholarInf.results1[0].email;
        const standing = status
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
    const renewalStatus = schoinf4.map((data) => {
      console.log(data)
      const imageFile = data.applicantData.length > 0 ? data.applicantData[0].File : 'https://drive.google.com/uc?id=1EXWK8SeamLARC7wnCTj4YXQhT74Z-zIn';
      const deadline = new Date(data.deadline);
      const currentDate = new Date();
    
      function getStatus() {
        if (currentDate > deadline) {
          return 'No response';
        } else if (data.applicantData.length > 0) {
          const submissionDate = new Date(data.deadline);
          if (currentDate > submissionDate) {
            return 'Submitted Late';
          } else {
            return 'Passed on Time';
          }
        } else {
          return 'Pending Submission';
        }
      }
    
      const status = getStatus();
    
      return (
        <Card>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <button onClick={() => openImageModal(imageFile, data.requirementName)}>
                <p>{data.requirementName}</p>
                <img
                  style={{ width: '200px', height: '200px' }}
                  src={imageFile}
                  alt="No Submitted"
                />
              </button>
            </div>
            <div>
              <Typography>Requirement: {data.requirementName}</Typography>
              <Typography>Deadline: {data.deadline}</Typography>
              <Typography   sx={{
                  color:
                    status === 'Submitted Late' || status === 'Pending Submission'
                      ? 'yellow'
                      : status === 'Passed on Time'
                      ? 'green'
                      : 'red',
                }}
              >Status: {status}</Typography>
            </div>
          </div>
        </Card>
      );
    });
    
  return (
    <>
      <Dialog fullScreen open={imageModalOpen} onClose={closeImageModal}>
      <DialogTitle>{selectedImage.name}</DialogTitle>
      <DialogContent>
        <img src={selectedImage.image} alt="Full Image" style={{ width: '100%', height: '100%' }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeImageModal}>Close</Button>
      </DialogActions>
      </Dialog>
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
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Scholar Information
            </Typography>
            <StyledButton autoFocus color="inherit">
              REJECT
            </StyledButton>
            <StyledButtonEdit sx={{marginLeft:'15px'}} autoFocus color="inherit">
              PASS
            </StyledButtonEdit>
          </Toolbar>
        </AppBar>
      <Box sx={{width:'100%',padding:'10px',height:'100%',display:'flex',backgroundColor:'whitesmoke'}}>
         <div style={{width:'35%'}}>
            <div style={{width:'95%',padding:'10px',height:'100%',backgroundColor:'grey'}}>
              <Card elevation={5}>
            <img
                alt="Remy Sharp"
                src={schoinf2.profile}
                style={{objectFit:'cover',width:'100%',height:'400px'}}
              />
              <Card sx={{height:'30px',position:'relative',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}
               className='spancho'>
                <Typography>Scholar Code: {schoinf2.scholarCode}</Typography>
              </Card>
              </Card>
              <Card sx={{margin:'10px',height:'250px'}}>
                <div style={{textAlign:'center'}}>
                <Typography sx={{fontSize:'18px',fontWeight:'700'}}>
                  Activity Log
                </Typography>
                </div>
              </Card>
            </div>
         </div>
         <div style={{width:'65%',padding:'10px'}}>
            <Card>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Personal Information" />
              <Tab label="Scholar Information" />
              <Tab label="Documents" />
            </Tabs>             
            </Card>
            <Card>
              {value === 0 && <>
                <div>
                  <Card>
                    <Typography>Name: {schoinf1.Name}</Typography>
                    <Typography>Age: {schoinf1.age}</Typography>
                    <Typography>Gender: {schoinf1.gender}</Typography>
                    <Typography>Contact Number: {schoinf1.contactNum}</Typography>
                    <Typography>Email: {schoinf1.email}</Typography>
                    <Typography>Baranggay: {schoinf1.baranggay}</Typography>
                    <Typography>Address: {schoinf1.caddress}</Typography>
                    <Typography>Year Level: {schoinf1.currentYear}</Typography>
                  </Card>
                </div>
              </>}
              {value === 1 && <>
              <div>
                <Card>
                <Typography>Name: {schoinf1.Name}</Typography>
                <Typography>Applicant Code: {schoinf2.applicantCode}</Typography>
                <Typography>Scholar Code: {schoinf2.scholarCode}</Typography>
                <Typography>Scholarship Applied: {schoinf2.scholarshipApplied}</Typography>
                <Typography>Date Applied: {schoinf1.DateApplied}</Typography>
                <Typography>Date Approved: {schoinf1.DateApproved}</Typography>

                </Card>
              </div>
              </>}
              {value === 2 && <>
                <Card>
                <Tabs
              value={value1}
              onChange={handleChange1}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Application Requirements" />
              <Tab label="Renewal Requirements" />
            </Tabs>             
                </Card>
              {value1 === 0 && <>
                <div className="subdocsappdet">
            {schoinf3?.map((data) =>{
              return (
                <>

                <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <button onClick={() => openImageModal(data.File,data.requirement_Name)}>
                    <p>{data.requirement_Name}</p>
                  <img
                    style={{ width: '300px', height: '300px' }}
                    src={data.File}
                    alt=""
                  />
                  </button>
                </div>

                </>
              )
            })}
        </div>              
              </>}
              {value1 === 1 && <>
                <div className="subdocsappdet">
                {renewalStatus}
        </div>              
              </>}
              </>}
            </Card>
         </div>
      </Box>
      </Dialog>

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