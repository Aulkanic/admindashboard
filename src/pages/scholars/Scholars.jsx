import './scholars.scss';
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { Tabs, Tab, Box, Modal, Card } from "@mui/material"; 
import { Container, Row, Col, Form } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DataGrid} from '@mui/x-data-grid';
import React, {useEffect, useState} from 'react'
import { FetchingBmccScho, FetchingBmccSchoinfo,ScholarStand ,ListofReq,UserActivity,ListAccess, GenerateRenewal,FetchRenewal,
FetchRenewalDet,SetRenewalDetails,FetchRenewalCode,SetSchoRenewDetails,RenewedScho} from '../../api/request';
import './scholar.css'
import Divider from '@mui/material/Divider';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { styled, createTheme } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputDateTimeRangeField';
import { useSelector } from 'react-redux';
import Figure from 'react-bootstrap/Figure';
import { GrUserNew } from "react-icons/gr";
import { IoSchool } from "react-icons/io5";
import { RiPassPendingFill } from "react-icons/ri";
import CustomNoRowsOverlay from '../Design/Norows';
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);


const CustomDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-columnHeaders': {
    color: 'white', 
    fontWeight:'bold',
    backgroundColor:'#0047a4',
    fontWeight:'bold'
  },

});

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
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
  const { admin  } = useSelector((state) => state.login)
  const [access,setAccess] = useState([])
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [schoinf1,setSchoInf1] = useState([]);
  const [schoinf2,setSchoInf2] = useState([]);
  const [isComplete,setComplete] = useState('');
  const [reason,setReason] = useState('');
  const [status,setStatus] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const [userLog,setUserlog] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [page,setPage] = useState(0);
  const [renew,setRenew] = useState([]);
  const [schore,setSchore] = useState([])
  const [renewDet,setRenewDet] = useState([])
  const [renewScho,setRenewScho] = useState([])
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [inf,setInf] = useState([]);
  const [screen,setScreen] = useState(0)

  const openFullscreen = (imageSrc) => {
    setFullscreenImage(imageSrc);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };
  const [value, setValue] = React.useState(() => [
    dayjs('2022-04-17T15:30'),
    dayjs('2022-04-21T18:30'),
  ]);
  const [selectedRenewTitle, setSelectedRenewTitle] = useState(null);

  const handleDropdownChange = async (eventKey, event) => {
    try {
        setSelectedRenewTitle(eventKey);
        const formData = new FormData();
        formData.append('renewTitle', eventKey);

        const renewalDetailsResponse = await FetchRenewalDet.FETCH_RENEWINF(formData);
        const renew = renewalDetailsResponse.data?.filter((data) => {
            return data.renewTitle === eventKey;
        });
        setRenewDet(renew);
        const renewalCodeResponse = await FetchRenewalCode.FETCH_RENEWCODE(eventKey);
        setSchore(renewalCodeResponse.data);

        setPage(1);
    } catch (error) {
        console.error('An error occurred while handling dropdown change:', error);
    
    }
};

  const handleSetonoff = async(data) =>{
        if(data === 'Extend'){
        return
      }
      const formData = new FormData()
      formData.append('remarks',data)
      formData.append('renewTitle',selectedRenewTitle)
      SetRenewalDetails.SET_RENEWINF(formData)
      .then((res) =>{
        setRenewDet(res.data)
      })
  }

  useEffect(() => {
    async function Fetch(){
      setShowBackdrop(true);
      const scholars = await FetchingBmccScho.FETCH_SCHOLARS()
      const req = await ListofReq.FETCH_REQUIREMENTS()
      const re =  await FetchRenewal.FETCH_RENEW()
      let acc = await ListAccess.ACCESS()
      const empacc = acc.data.result?.filter(data => data.employeeName === admin[0].name)
      setAccess(empacc)
      setRenew(re.data)
      const data = scholars.data.Scholars
      setData(data)
      setComplete(req.data.Requirements)
      setShowBackdrop(false);
    }
    Fetch();
    const intervalId = setInterval(Fetch, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: 'maxContent',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding:'10px',
    borderRadius:'10px'

  };
  let PendingRenewal = data?.filter((data) => data.remarks === 'Pending Renewal')
  let NewScholar = data?.filter((data) => data.remarks === 'New Scholar')
  let ExistingScholar = data?.filter((data) => data.remarks === 'Existing Scholar')
  const closeImageModal = () => {
    setSelectedImage('');
    setImageModalOpen(false);
  };
  
  const view = async (data) => {
    setShowBackdrop(true);
    const applicantNum = data.applicantNum;
    const formData = new FormData()
    formData.append('applicantNum',applicantNum)
    const response = await FetchingBmccSchoinfo.FETCH_SCHOLARSINFO(applicantNum);
    const log = await UserActivity.USER_LOG(formData);
    const userAct = log.data.result;
    setUserlog(userAct.reverse());
    setSchoInf1(response.data.ScholarInf.results1[0]);
    setSchoInf2(response.data.ScholarInf.results2[0]);
    setShowBackdrop(false);
    setOpen(true);
  };
  const view1 = async (data) => {
    setInf(data)
    setShowBackdrop(true);
    const renewTitle = renewDet[0].renewTitle;
    const tablename = renewDet[0].reqtable;
    const scholarCode = data.scholarCode
    const formData = new FormData()
    formData.append('renewTitle',renewTitle)
    formData.append('tablename',tablename)
    formData.append('scholarCode',scholarCode)
    const response = await SetSchoRenewDetails.FETCH_SCHORE(formData);
    setRenewScho(response.data)
    setShowBackdrop(false);
    setOpen2(true);
  };
  
  const columns = [
     {
       field: 'scholarCode', 
        headerName: 'Scholar Code',
      width: 150
      },
    {
      field: 'ScholarshipApplied',
      headerName: 'Scholarship Applied',
      width: 200,
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
      field: 'baranggay',
      headerName: 'Baranggay',
      width: 200,
      editable: false,
    },
    {
      field: 'remarks',
      headerName: 'Status',
      width: 130,
      editable: false,

    },
    {
      field: 'batch',
      headerName: 'Batch',
      width: 80,
      editable: false,
    },
    {
      field: 'insert',
      headerName: 'Action',
      width: 90,
      renderCell: (params) => (
        <button className='btnofficials1' onClick={() => view(params.row)}>View</button>
      ),
    },

  ];
  const columns1 = [
     {
       field: 'scholarCode', 
        headerName: 'Scholar Code',
      width: 150
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
      field: 'remarks',
      headerName: 'Status',
      width: 130,
      editable: false,

    },
    {
      field: 'Batch',
      headerName: 'Batch',
      width: 80,
      editable: false,
    },
    {
      field: 'updated',
      headerName: 'Updated',
      width: 250,
      editable: false,
    },
    {
      field: 'Status',
      headerName: 'Status',
      width: 100,
      editable: false,
    },
    {
      field: 'insert',
      headerName: 'Action',
      width: 90,
      renderCell: (params) => (
        <button className='btnofficials1' onClick={() => view1(params.row)}>View</button>
      ),
    },

  ];
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setOpen1(false);
  const handleClose2 = () => setOpen2(false);

  const handleRowSelectionModelChange = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);

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
    const RemoveGrant = (data) =>{
        const status = 'Revoke'
        const reason = 'Inactive'
        const formData = new FormData();
        formData.append('batch',data.Batch)
        formData.append('ScholarshipApplied',data.scholarshipApplied)
        formData.append('applicantNum',data.applicantNum)
        formData.append('Name',data.Name)
        formData.append('Reason',reason)
        formData.append('status',status)
        formData.append('email',data.email)
        setShowBackdrop(true);
        ScholarStand.UPDATE_SCHOSTAND(formData)
        .then(res => {
          const data = res.data.result?.filter(data => data.status === 'Active' || data.status === 'Hold')
          setData(data)
          setShowBackdrop(false);
          swal('Successfully Revoke')
        }
         )
        .catch(err => console.log(err));

    }
    const RemoveGrantAll = () =>{
      const selectedRows = rowSelectionModel.map((selectedRow) =>
      data.find((row) => row.applicantNum === selectedRow)
    );
    if(selectedRows.length === 0){
      swal({
        text: 'Please Select Scholars First',
        timer: 2000,
        buttons: false,
        icon: "warning",
      })
      return
    }
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
        setShowBackdrop(true);
        let counter = 0;
        for (let i = 0; i < selectedRows.length; i++) {
          const row = selectedRows[i];
          const status = 'Revoke'
          const reason = 'Inactive'
          const formData = new FormData();
          formData.append('batch',row.Batch)
          formData.append('ScholarshipApplied',row.scholarshipApplied)
          formData.append('applicantNum',row.applicantNum)
          formData.append('Name',row.Name)
          formData.append('Reason',reason)
          formData.append('status',status)
          formData.append('email',row.email)
          ScholarStand.UPDATE_SCHOSTAND(formData)
          .then(res => {
            PendingRenewal = res.data.result?.filter((data) => data.remarks === 'Pending Renewal')
            setData(res.data.result)
            counter++;
            if (counter === selectedRows.length) {
              setShowBackdrop(false);
              swal({
                title: "Success",
                text: "Done!",
                icon: "success",
                button: "OK",
              });
            }
          }
           )
          .catch(err => console.log(err));
        }
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelled',
          'The Selected Scholar actions has cancelled. :)',
          'error'
        )
      }
    })      


    }
    const NotifyAll = () =>{
      const selectedRows = rowSelectionModel.map((selectedRow) =>
      data.find((row) => row.applicantNum === selectedRow)
    );
    if(selectedRows.length === 0){
      swal({
        text: 'Please Select Scholars First',
        timer: 2000,
        buttons: false,
        icon: "warning",
      })
      return
    }
    setShowBackdrop(true);
    let counter = 0;
      for (let i = 0; i < selectedRows.length; i++) {
        const row = selectedRows[i];
        const status = 'Hold'
        const formData = new FormData();
        formData.append('applicantNum',row.applicantNum)
        formData.append('status',status)
        formData.append('email',row.email)
        ScholarStand.UPDATE_SCHOSTAND(formData)
        .then(res => {
          const data = res.data.result?.filter(data => data.status === 'Active' || data.status === 'Hold')
          setData(data)
          counter++;
          if (counter === selectedRows.length) {
            setShowBackdrop(false);
            swal({
              title: "Success",
              text: "Successfully Sent and Notify the Selected Users",
              icon: "success",
              button: "OK",
            });
          }
        }
         )
        .catch(err => console.log(err));
      }

    }
    const AddQuestions = async() =>{
      const { value: formValues } = await Swal.fire({
        title: 'Add Questions',
        html:
          '<input id="swal-input2" class="swal2-input" placeholder="Question">',
        focusConfirm: false,
        confirmButtonText: 'Submit',
        showCancelButton:true,
        preConfirm: () => {
          const question2 = document.getElementById('swal-input2').value;
          if (!question2) {
            Swal.showValidationMessage('Please input a Question First!!');
            return false; // Prevent the dialog from closing
          }
          if(question2.length > 255){
            Swal.showValidationMessage("The Question field can contain up to a maximum of 255 characters.")
            return false;
          }
          return [ question2];
        },
      })
      if (formValues) {
        
        const question2 = formValues[1];

      }
    }
    const generateRenew = async() =>{
      const start = value[0].format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (zz)')
      const end = value[1].format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (zz)')
      const startcheck = new Date(start)
      const endcheck = new Date(end)
      const date = new Date();
      const year1 = startcheck.getFullYear();
      const month1 = startcheck.getMonth();
      const day1 = startcheck.getDate();

      const year2 = endcheck.getFullYear();
      const month2 = endcheck.getMonth();
      const day2 = endcheck.getDate();
      if(startcheck < date || endcheck < date){
        swal({
          text: 'The provided date is less than the current date.',
          timer: 2000,
          buttons: false,
          icon: "error",
        })
        return
      }
      if(year1 === year2 && month1 === month2 && day1 === day2){
        swal({
          text: 'The start Date and end Date must not be same',
          timer: 2000,
          buttons: false,
          icon: "error",
        })
        return
      }
      const year = date.getFullYear()
      let formData = new FormData();
      formData.append('start',startcheck)
      formData.append('deadline',endcheck)
      formData.append('year',year)
      setOpen1(false)
      GenerateRenewal.GENERATE_RENEW(formData)
      .then((res) =>{
        if(res.data.success === 0){
          Swal.fire("Error!", res.data.message,"warning");
          return
        }else{
          Swal.fire("",`Successfully Generated`,"success")
          console.log(res)
          setRenew(res.data.list)
        }
      })
    }
    const RenewalInformation = renewDet?.map((value,index) =>{
      const dateObject = new Date(value.start);
      const day = dateObject.getDate();
      const month = dateObject.toLocaleString('default', { month: 'short' }); 
      const year = dateObject.getFullYear();
      const formattedDate = `${month} ${day}, ${year}`;
      const dateObject1 = new Date(value.deadline);
      const day1 = dateObject1.getDate();
      const month1 = dateObject1.toLocaleString('default', { month: 'short' }); 
      const year1 = dateObject1.getFullYear();
      const formattedDate1 = `${month1} ${day1}, ${year1}`;
      return (
        <>
          <div key={index} className='renewdetcont'>
            <div>
            <p><strong>Title:</strong> {value.renewTitle}</p>
            <p><strong>Start:</strong> {formattedDate}</p>
            <p><strong>End:</strong> {formattedDate1}</p>
            </div>
            <div>
              <p><strong>Year:</strong> {value.year}</p>
              <p><strong>Status:</strong> {value.remarks}</p>
              <p><strong>Total Scholar renewed:</strong> {value.total}</p>
            </div>
          </div>
          <Box sx={{ width: '100%', height: 400,backgroundColor:'white' }}>
          <CustomDataGrid
        rows={schore}
        columns={columns1}
        getRowId={(row) => row.renewId}
        scrollbarSize={10}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[25]}
      />
          </Box>
        </>
      )
    })
    const FullscreenImagePopup = ({ imageSrc, onClose }) => {
      return (
        <div className="fullscreen-image-popup" onClick={onClose}>
          <div className="fullscreen-image">
            <img src={imageSrc.files} alt="Fullscreen Image" />
          </div>
        </div>
      );
    };
    const SetSchoRenewed = async(data) =>{

      const formData = new FormData()
      formData.append('yearLevel',data.yearLevel)
      formData.append('Baranggay',data.Baranggay)
      formData.append('phoneNum',data.phoneNum)
      formData.append('gradeLevel',data.gradeLevel)
      formData.append('school',data.school)
      formData.append('guardian',data.guardian)
      formData.append('scholarCode',data.scholarCode)
      formData.append('renewTitle',renewDet[0].renewTitle)
      formData.append('Name',data.Name)
      setOpen2(false)
      setShowBackdrop(true)
      await RenewedScho.RENEWED(formData)
      .then((res) =>{
        setSchore(res.data);
        setInf([])
        setShowBackdrop(false)
      })
    }

  return (
    <>
      <StyledBackdrop open={showBackdrop}>
                <CircularProgress color="inherit" />
      </StyledBackdrop>
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
          </Toolbar>
        </AppBar>
      <Box sx={{width:'98.5%',padding:'10px',height:'100%',display:'flex',backgroundColor:'whitesmoke'}}>
         <div style={{width:'35%'}}>
            <div style={{width:'95%',padding:'10px',height:'100%'}}>
              <Card elevation={1}>
            <img
                alt="Remy Sharp"
                src={schoinf2.profile}
                style={{objectFit:'cover',width:'100%',height:'350px'}}
              />
              <Card sx={{height:'30px',position:'relative',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'black',color:'white'}}
               className='spancho'>
                <Typography>Scholar Code: {schoinf2.scholarCode}</Typography>
              </Card>
              </Card>
              <Card sx={{margin:'10px',height:'250px',overflow:'auto'}}>
                <div style={{textAlign:'left'}}>
                <Typography sx={{fontSize:'18px',fontWeight:'700',textAlign:'center'}}>
                  Activity Log
                </Typography>
                <div>
                {userLog?.map((data) =>{
                  return (
                    <>
                    <p style={{margin:'10px 0px 5px 15px'}}>{data.actions} on {data.date}</p>
                    <Divider />
                    </>
                  )
                })}
                </div>
                </div> 
              </Card>
            </div>
         </div>
         <div className='schodivuser'>
            <div className='schoinfuser'>
              <h2 style={{color:'#676',padding:'10px 0px 20px 10px'}}>Scholar Information</h2>
              <div className='Schorenewfrm'>
              <Form.Group as={Col}>
                  <Form.Label > Name</Form.Label>
                  <Form.Control
                  type="text"  
                  value={schoinf2.Name}
                  disabled
                  />
              </Form.Group>
              <Form.Group as={Col}>
                  <Form.Label >Age</Form.Label>
                  <Form.Control
                  type="text"  
                  value={schoinf1.age}
                  disabled
                  />
              </Form.Group>
              <Form.Group as={Col}>
                  <Form.Label >Gender</Form.Label>
                  <Form.Control
                  type="text"  
                  value={schoinf2.gender}
                  disabled
                  />
              </Form.Group>
              <Form.Group as={Col}>
                  <Form.Label >Baranggay</Form.Label>
                  <Form.Control
                  type="text"  
                  value={schoinf2.Baranggay}
                  disabled
                  />
              </Form.Group>
              <Form.Group as={Col}>
                  <Form.Label >School Name</Form.Label>
                  <Form.Control
                  type="text"  
                  value={schoinf2.school}
                  disabled
                  />
              </Form.Group>
              <Form.Group as={Col}>
                  <Form.Label >YearLevel</Form.Label>
                  <Form.Control
                  type="text"  
                  value={schoinf2.yearLevel}
                  disabled
                  />
              </Form.Group>
              <Form.Group as={Col}>
                  <Form.Label >Grade/Year</Form.Label>
                  <Form.Control
                  type="text"  
                  value={schoinf2.gradeLevel}
                  disabled
                  />
              </Form.Group>
              <Form.Group as={Col}>
                  <Form.Label >Status</Form.Label>
                  <Form.Control
                  type="text"  
                  value={schoinf2.remarks}
                  disabled
                  />
              </Form.Group>
              <Form.Group as={Col}>
                  <Form.Label >Scholarship Applied</Form.Label>
                  <Form.Control
                  type="text"  
                  value={schoinf2.ScholarshipApplied}
                  disabled
                  />
              </Form.Group>
              <Form.Group as={Col}>
                  <Form.Label >Batch</Form.Label>
                  <Form.Control
                  type="text"  
                  value={schoinf2.Batch}
                  disabled
                  />
              </Form.Group>
              <Form.Group as={Col}>
                  <Form.Label >Date Applied</Form.Label>
                  <Form.Control
                  type="text"  
                  value={schoinf1.DateApplied}
                  disabled
                  />
              </Form.Group>
              <Form.Group as={Col}>
                  <Form.Label >Date Approved</Form.Label>
                  <Form.Control
                  type="text"  
                  value={schoinf1.DateApproved}
                  disabled
                  />
              </Form.Group>
              </div>
            </div>
         </div>
      </Box>
      </Dialog>
      <Dialog
        fullScreen
        open={open2}
        onClose={handleClose2}
        TransitionComponent={Transition}
        className="my-mui-dialog"
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
              Scholar Updated Information
            </Typography>
            <button className="btnofficials" sx={{marginLeft:'15px'}} autoFocus color="inherit"
            onClick={() =>SetSchoRenewed(inf)}
            >
              PASS THE RENEW
            </button>
          </Toolbar>
        </AppBar>
      <Box sx={{width:'98.5%',padding:'10px',height:'100%',display:'flex',backgroundColor:'whitesmoke',flexDirection:'column'}}>
      <div className='renewscho'>
          {renewScho.details?.map((data) =>{
           
            return(
              <>
                <Form.Group as={Col}>
                      <Form.Label className='frmlabel'>Scholar Code</Form.Label>
                      <Form.Control
                        type="text" 
                        name='Name'
                        value={data.scholarCode} 
                      disabled
                      />
                </Form.Group>
                <Form.Group as={Col}>
                      <Form.Label className='frmlabel'>Batch</Form.Label>
                      <Form.Control
                        type="text" 
                        name='Name'
                        value={data.Batch} 
                      disabled
                      />
                </Form.Group>
                <Form.Group as={Col}>
                      <Form.Label className='frmlabel'>Scholarship Program</Form.Label>
                      <Form.Control
                        type="text" 
                        name='Name'
                        value={data.scholarshipApplied} 
                      disabled
                      />
                </Form.Group>
                <Form.Group as={Col}>
                      <Form.Label className='frmlabel'>Name</Form.Label>
                      <Form.Control
                        type="text" 
                        name='Name'
                        value={data.Name} 
                      disabled
                      />
                </Form.Group>
                <Form.Group as={Col}>
                      <Form.Label className='frmlabel'>Email</Form.Label>
                      <Form.Control
                        type="text" 
                        name='Name'
                        value={data.email} 
                      disabled
                      />
                </Form.Group>
                <Form.Group as={Col}>
                      <Form.Label className='frmlabel'>Phone Number</Form.Label>
                      <Form.Control
                        type="text" 
                        name='Name'
                        value={data.phoneNum} 
                      disabled
                      />
                </Form.Group>
                <Form.Group as={Col}>
                      <Form.Label className='frmlabel'>School</Form.Label>
                      <Form.Control
                        type="text" 
                        name='Name'
                        value={data.school} 
                      disabled
                      />
                </Form.Group>
                <Form.Group as={Col}>
                      <Form.Label className='frmlabel'>Year Level</Form.Label>
                      <Form.Control
                        type="text" 
                        name='Name'
                        value={data.yearLevel} 
                      disabled
                      />
                </Form.Group>
                <Form.Group as={Col}>
                      <Form.Label className='frmlabel'>Grade/Year</Form.Label>
                      <Form.Control
                        type="text" 
                        name='Name'
                        value={data.gradeLevel} 
                      disabled
                      />
                </Form.Group>
                <Form.Group as={Col}>
                      <Form.Label className='frmlabel'>Guardian</Form.Label>
                      <Form.Control
                        type="text" 
                        name='Name'
                        value={data.guardian} 
                      disabled
                      />
                </Form.Group>
                <Form.Group as={Col}>
                      <Form.Label className='frmlabel'>Baranggay</Form.Label>
                      <Form.Control
                        type="text" 
                        name='Name'
                        value={data.Baranggay} 
                      disabled
                      />
                </Form.Group>
                <Form.Group as={Col}>
                      <Form.Label className='frmlabel'>Remarks</Form.Label>
                      <Form.Control
                        type="text" 
                        name='Name'
                        value={data.remarks} 
                      disabled
                      />
                </Form.Group>
              </>
            )
          })}
        </div>
        <h3>Files:</h3>
        <div className='renewscho1'>
          {renewScho.File?.map((data,index) =>{
            console.log(data)
            return(
              <div key={index}>
              <Form.Label className='frmlabel'>{data.reqName}</Form.Label>
              <Col xs={6} md={4}>
              <Figure onClick={() => openFullscreen(data)}>
                <Figure.Image
                  width={171}
                  height={180}
                  alt="171x180"
                  src={data.files}
                />
              </Figure>
              </Col>
              </div>
            )
          })}
        </div>
        
        {fullscreenImage && (
        <FullscreenImagePopup
          imageSrc={fullscreenImage}
          onClose={closeFullscreen}
        />
      )}
      </Box>
      </Dialog>
    <Modal             
    open={open1}
    onClose={handleClose1}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">
      <Box sx={style}>
      <div>
        <h1>Set the Date Range for Renewal of Scholarship</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'MultiInputDateTimeRangeField'
        ]}
      >
        <MultiInputDateTimeRangeField
            slotProps={{
              textField: ({ position }) => ({
                label: position === 'start' ? 'Start' : 'End',
                size: "small",
                error: false,
              }),
            }}
          disablePast
          label="Start "
          views={['year', 'month', 'day']}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'15px'}}>
    <button className="btnofficials" onClick={generateRenew}>Generate</button>
    </div>

      </div>
      </Box>
    </Modal>
    <div className="scholars">
        <Sidebar/>
        <div className="scholarsContainer">
            <Navbar/>
            <div className="top">
            
    <p className="scorecardh">Scholars</p>

    {page === 0 && (
    <>

    <div style={{display:'flex',justifyContent:'space-between',margin:'10px'}}>
    <Dropdown onSelect={handleDropdownChange}>
      <Dropdown.Toggle variant="success" id="dropdown-basic" >
        Select Renewal
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {renew?.map((data) =>{
          return (
            <Dropdown.Item 
             key={data.renewTitle} 
             value={data.renewTitle}
             eventKey={data.renewTitle}
             >
              {data.renewTitle}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
    <button className="btnofficials" onClick={() =>setOpen1(true)}>Generate Renewal</button>
    </div>
    <Box
      sx={{
        margin:'10px',
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '30%',
          height: 70,
          backgroundColor:"#FFFFFF",
          borderRadius:'10px'
        },
      }}>

    <Card elevation={0} sx={{ minWidth: 200,display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 15px 10px 10px'}}>
      <Typography sx={{ fontSize: 20,fontWeight:'900',color:'black',lineHeight:'17.57px',fontFamily:'Roboto Serif',textAlign:'center' }} gutterBottom>
          New <br/>
          Scholars
      </Typography>
      <div className="totalicon">
      <Typography variant="h5" component="div" sx={{borderRight:'2px solid black',width:'80%',color:'#043F97',fontFamily:'Roboto Serif',fontWeight:'700',lineHeight:'23.42px'}}>
          {NewScholar.length}
      </Typography>
      <GrUserNew style={{width:'20px',color:'blue'}} />
      </div>
      <Button onClick={(e) => setScreen(1)} size="small" sx={{color:'#666',fontFamily:'Roboto Serif',fontWeight:'400',lineHeight:'11.42px',fontStyle:'italic',textTransform:'none'}}>
        View <br /> all
      </Button>
    </Card>

    <Card elevation={0} sx={{ minWidth: 200,display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 15px 10px 30px'}}>
        <Typography sx={{ fontSize: 20,fontWeight:'900',color:'black',lineHeight:'17.57px',fontFamily:'Roboto Serif' ,textAlign:'center'}} gutterBottom>
          Existing <br/> Scholars
        </Typography>
        <div className="totalicon">
        <Typography variant="h5" component="div" sx={{borderRight:'2px solid black',width:'80%',color:'#043F97',fontFamily:'Roboto Serif',fontWeight:'700',lineHeight:'23.42px'}}>
          {ExistingScholar.length}
        </Typography>
        <IoSchool style={{width:'20px',color:'blue'}} />
        </div>
        <Button onClick={(e) => setScreen(2)} size="small" sx={{color:'#666',fontFamily:'Roboto Serif',fontWeight:'400',lineHeight:'11.42px',fontStyle:'italic',textTransform:'none'}}>
        View <br /> all
        </Button>
    </Card>

    <Card elevation={0} sx={{ minWidth: 200,display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 15px 10px 30px'}}>
    <Typography sx={{ fontSize: 20,fontWeight:'900',color:'black',lineHeight:'17.57px',fontFamily:'Roboto Serif',textAlign:'center' }} gutterBottom>
          Pending <br/> Renewal
        </Typography>
        <div className="totalicon">
        <Typography variant="h5" component="div" sx={{borderRight:'2px solid black',width:'80%',color:'#043F97',fontFamily:'Roboto Serif',fontWeight:'700',lineHeight:'23.42px'}}>
          {PendingRenewal.length}
        </Typography>
        <RiPassPendingFill style={{width:'20px',color:'blue'}} />
        </div>
        <Button onClick={(e) => setScreen(3)} size="small" sx={{color:'#666',fontFamily:'Roboto Serif',fontWeight:'400',lineHeight:'11.42px',fontStyle:'italic',textTransform:'none'}}>
        View <br /> all
        </Button>
    </Card>

    </Box>
    {screen === 0 && <Box sx={{ width: '100%',backgroundColor:'white',minHeight:'300px',height: 400 }}>
        <CustomDataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.applicantNum}
        scrollbarSize={10}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        sx={{minHeight:'300px'}}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        pageSizeOptions={[25]}
      />
    </Box>}
    {screen === 1 && <Box sx={{width: '100%',backgroundColor:'white',minHeight:'300px',height: 400}}>
        <CustomDataGrid
        sx={{minHeight:'300px'}}
        rows={NewScholar}
        columns={columns}
        getRowId={(row) => row.applicantNum}
        scrollbarSize={10}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        pageSizeOptions={[25]}
      />
    </Box>}
    {screen === 2 && <Box sx={{ width: '100%',backgroundColor:'white',minHeight:'300px',height: 400 }}>
        <CustomDataGrid
        rows={ExistingScholar}
        columns={columns}
        getRowId={(row) => row.applicantNum}
        scrollbarSize={10}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        sx={{minHeight:'300px'}}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        pageSizeOptions={[25]}
      />

    </Box>}
    {screen === 3 && 
    <>
    <Box sx={{width: '100%',backgroundColor:'white',minHeight:'300px',height: 400}}>
        <CustomDataGrid
        rows={PendingRenewal}
        columns={columns}
        getRowId={(row) => row.applicantNum}
        scrollbarSize={10}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        sx={{minHeight:'300px'}}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        pageSizeOptions={[25]}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelectionModelChange}
        rowSelectionModel={rowSelectionModel}
        disableRowSelectionOnClick
        isRowSelectable={(params) => !params.row.k || !params.row.k.Status}
      />
    </Box>
    <div style={{width:'100%',display:'flex',justifyContent:'space-around',margin:'15px'}}>
          <button className="btnofficials" onClick={NotifyAll}>Notify All Selected Scholars</button>
          <button className="btnofficials2" onClick={RemoveGrantAll}>Revoke Grant To All Selected Scholars</button>
    </div>
    </>
    }
    </>
    )}
    {page === 1 && (
      <>
      <div>
        <div style={{display:'flex',justifyContent:'space-between',margin:'10px'}}>
        <button className="btnofficials2" onClick={() =>setPage(0)}>Back</button>
        {renewDet[0].remarks === 'Pending' && (<button className="btnofficials" onClick={() =>handleSetonoff('Ongoing')}>Start</button>)}
        {renewDet[0].remarks === 'Ongoing' || renewDet[0].remarks === 'Continue' ? (<button className="btnofficials" onClick={() =>handleSetonoff('Pause')}>Pause</button>) : null}
        {renewDet[0].remarks === 'Pause' && (<button className="btnofficials" onClick={() =>handleSetonoff('Continue')}>Resume</button>)}
        {renewDet[0].remarks === 'Done' && (<button className="btnofficials" onClick={() =>handleSetonoff('Extend')}>Extend</button>)}
        </div>
        <div>
          {RenewalInformation}
        </div>
      </div>
      </>
    )}
            </div>
        </div>
    </div>
    </>
  )
}

export default Scholars