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
import { FetchingBmccScho, FetchingBmccSchoinfo,ScholarStand ,ListofReq,UserActivity, GenerateRenewal,FetchRenewal,
FetchRenewalDet,SetRenewalDetails,FetchRenewalCode,SetSchoRenewDetails,RenewedScho,DeclinedRenewal,SchoinfOld,
ScholarRenewallist} from '../../api/request';
import './scholar.css'
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
import { styled } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputDateTimeRangeField';
import Figure from 'react-bootstrap/Figure';
import { GrUserNew } from "react-icons/gr";
import { IoSchool } from "react-icons/io5";
import { FcRight } from "react-icons/fc";
import { RiPassPendingFill } from "react-icons/ri";
import CustomNoRowsOverlay from '../Design/Norows';
import UserIcon from '../../Images/userrandom.png'
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



const Scholars = () => {
  const [data, setData] = useState([]);
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
  const [fullscreenImage, setFullscreenImage] = useState([]);
  const [inf,setInf] = useState([]);
  const [screen,setScreen] = useState(0);
  const [old,setOld] = useState([]);
  const [active,setActive] = useState(0);
  const [renewalScho,setRenewalscho] = useState([])

  const openFullscreen = (imageSrc) => {
    setFullscreenImage(imageSrc);
    setImageModalOpen(true);
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
      const scholars = await FetchingBmccScho.FETCH_SCHOLARS()
      const req = await ListofReq.FETCH_REQUIREMENTS()
      const re =  await FetchRenewal.FETCH_RENEW()
      setRenew(re.data)
      const data = scholars.data.Scholars
      setData(data)
      setComplete(req.data.Requirements)
    }
    Fetch();
    // const intervalId = setInterval(Fetch, 5000);
    // return () => {
    //   clearInterval(intervalId);
    // };
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
    formData.append('scholarCode',data.scholarCode)
    const response = await FetchingBmccSchoinfo.FETCH_SCHOLARSINFO(applicantNum);
   
    const log = await UserActivity.USER_LOG(formData);
    const rrn = await ScholarRenewallist.RENEWAL(formData)
    const userAct = log.data.result;
    setUserlog(userAct.reverse());
    setRenewalscho(rrn.data)
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
    const scholarCode = data.scholarCode;
    const formData = new FormData()
    formData.append('renewTitle',renewTitle)
    formData.append('tablename',tablename)
    formData.append('scholarCode',scholarCode)
    const response = await SetSchoRenewDetails.FETCH_SCHORE(formData);
    console.log(response)
    const re= await SchoinfOld.SCHO_OLD(scholarCode)
    setOld(re.data.inf[0])
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
      width: 150,
      editable: false,
    },
    {
      field: 'insert',
      headerName: 'Action',
      width: 90,
      renderCell: (params) => (
        <>
        <button className='btnofficials1' onClick={() => view1(params.row)}>View</button>
        </>
        
      ),
    },

  ];

  const RenewalDecline = async(val) =>{
    setOpen2(false)
    const result = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Enter the reason of not accpeting the renewal update',
      inputPlaceholder: 'Type here...',
      inputAttributes: {
        'aria-label': 'Type here',
        maxlength: 255, // Set the maximum length of input
        rows: 4, 
      },
      focusConfirm: false,
      confirmButtonText: 'Submit',
      showCancelButton:true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage('Please input a First!!');
          return false; // Prevent the dialog from closing
        }
        if(value.length > 255){
          Swal.showValidationMessage("The field can contain up to a maximum of 255 characters.")
          return false;
        }
        return value; 
      }
    }).then(async(results) =>{
      if(results.isConfirmed){
        const formData = new FormData();
        formData.append('applicantNum',old.applicantNum)
        formData.append('scholarCode',old.scholarCode)
        formData.append('reasons',results.value)
        formData.append('renewTitle',renewDet[0].renewTitle)
        await DeclinedRenewal.DECLINED(formData)
        .then((res) =>{
          setSchore(res.data);
          setInf([])
        })
      }else if (results.dismiss === Swal.DismissReason.cancel) {
        setOpen2(true);
      }
    })
  }
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
      const total = schore?.filter(dat => dat.Status === 'Renewed').length;
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
              <p><strong>Total Scholar renewed:</strong> {total}</p>
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

    const SetSchoRenewed = async(data) =>{
      const formData = new FormData()
      formData.append('yearLevel',data.yearLevel)
      formData.append('applicantNum',old.applicantNum)
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
    const documentaryDocs = renewalScho?.doc2?.map((data,index) =>{
      if(!data){return null;}else{
        return(
          <div onClick={() => openFullscreen(data)} style={{cursor:'pointer'}} key={index} className='formpersonaChild3'>
            <p style={{position:'absolute',margin:0,top:'-10px',fontWeight:'700'}}>
              {data.requirement_Name}
            </p>
            <img
            style={{height:'100%',width:'100%',objectFit:'contain'}} 
            src={data.File} 
            alt="" />
          </div>
        )}
    })
    const renewalDocs = renewalScho?.doc1?.map((data,index) =>{
      if(!data){return null;}else{
        return(
          <div onClick={() => openFullscreen(data)} style={{cursor:'pointer'}} key={index} className='formpersonaChild3'>
            <p style={{position:'absolute',margin:0,top:'-10px',fontWeight:'700'}}>
              {data.reqName}
            </p>
            <img
            style={{height:'100%',width:'100%',objectFit:'contain'}} 
            src={data.files} 
            alt="" />
          </div>
        )}
    })
    const renewalDocs1 = renewScho?.File?.map((data,index) =>{
      if(!data){return null;}else{
        return(
          <div onClick={() => openFullscreen(data)} style={{cursor:'pointer'}} key={index} className='formpersonaChild4'>
            <p style={{position:'absolute',margin:0,top:'-18px',fontWeight:'700'}}>
              {data.reqName}
            </p>
            <img
            style={{height:'100%',width:'100%',objectFit:'contain'}} 
            src={data.files} 
            alt="" />
          </div>
        )}
    })
  return (
    <>
      <StyledBackdrop open={showBackdrop}>
          <CircularProgress color="inherit" />
      </StyledBackdrop>
      <Dialog fullScreen open={imageModalOpen} onClose={closeImageModal}>
      <DialogTitle>{fullscreenImage.requirement_Name ||  fullscreenImage.reqName}</DialogTitle>
      <DialogContent>
        <img src={fullscreenImage.File || fullscreenImage.files} alt="Full Image" style={{ width: '100%', height: '100%',objectFit:'contain' }} />
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
      <Box sx={{width:'100%',height:'100%',display:'flex',backgroundColor:'whitesmoke',flexWrap:'wrap'}}>
      <div style={{width:'30%',backgroundColor:'#f1f3fa',display:'flex',flexDirection:'column',alignItems:'center',paddingTop:'2%'}}>
            <Card elevation={2} style={{backgroundColor:'white',width:"75%",height:'350px',marginBottom:'50px',display:'flex',flexDirection:'column',borderRadius:'5px'}}>
                <div style={{width:'90%'}}>
                  <h1 style={{margin:'10px 0px 0px 30px',fontSize:'25px',borderBottom:'5px solid #f1f3fa',color:'#7F7E7D',paddingBottom:'5px'}}>
                    Scholar Profile
                  </h1>
                </div>
                <div style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center',marginTop:'20px',position:'relative'}}>
                  {schoinf2.profile ? (
                    <>
                    <img 
                    style={{width:'200px',height:'200px',borderRadius:'50%',objectFit:'cover',border:'2px solid black'}}
                    src={schoinf2.profile}
                    alt="" />
                    </>
                  ) : (
                    <>
                    <img 
                    style={{width:'200px',height:'200px',borderRadius:'50%',objectFit:'cover',border:'2px solid black'}}
                    src={UserIcon} 
                    alt="" />
                    </>
                  )}
                </div>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'20px'}}>
                  <h1 style={{fontSize:'18px',margin:'0px',fontWeight:'bold'}}>
                    {schoinf2.Name}
                  </h1>
                </div>
            </Card>
            <Card elevation={2} style={{backgroundColor:'white',width:"75%",height:'max-content'}}>
               <div style={{width:'90%'}}>
                  <h1 style={{margin:'10px 0px 0px 30px',fontSize:'20px',borderBottom:'5px solid #f1f3fa',color:'#7F7E7D',paddingBottom:'5px'}}>
                    Scholar Information
                  </h1>
                </div>
                <div style={{display:'flex',flexDirection:'column',padding:'15px'}}>
                  <p><strong>Scholar Code:</strong> {schoinf2.scholarCode}</p>
                  <p><strong>Scholarship Applied:</strong> {schoinf2.ScholarshipApplied
                     }</p>
                  <p><strong>Date Applied:</strong> {schoinf2.date}</p>
                  <p><strong>Batch:</strong> {schoinf2.Batch}</p>
                </div>
            </Card>
         </div>
         <div style={{width:'70%',backgroundColor:'#f1f3fa',display:'flex',flexDirection:'column',alignItems:'center',paddingTop:'2%'}}>
            <Card elevation={0} style={{backgroundColor:'transparent',width:'95%',height:'150px',marginBottom:'10px',padding:'15px 10px 30px 35px'}}>
              <h1>Scholar Information</h1>
              <p>You can see scholar information</p>
            </Card>
            <Card elevation={0} style={{backgroundColor:'transparent',width:'95%',height:'100%'}}>
                <div>
                  <button
                  onClick={() => setActive(0)}
                  className={active === 0 ? 'evalActivepage' : 'evalPage'}
                  >
                    Personal Info
                  </button>
                  <button
                  style={{margin:'0px 10px 0px 10px'}}
                  onClick={() => setActive(1)}
                  className={active === 1 ? 'evalActivepage' : 'evalPage'}
                  >
                   Documents
                  </button>
                  <button
                  onClick={() => setActive(2)}
                  className={active === 2 ? 'evalActivepage' : 'evalPage'}
                  >
                    Renewal history
                  </button>
                </div>
                <Card sx={{width:'100%',height:"maxContent",padding:'20px'}}>
                    {
                      active===0 && (
                        <div className='formpersona' style={{width:'100%',height:'100%',padding:'20px'}}>
                          <div className='formpersonaChild'>
                            <label htmlFor="">Name</label>
                            <input 
                            type="text" 
                            value={schoinf2.Name} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <label htmlFor="">Barangay</label>
                            <input 
                            type="text" 
                            value={schoinf2.baranggay} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <label htmlFor="">Email</label>
                            <input 
                            type="text" 
                            value={schoinf2.email} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <label htmlFor="">Birthday</label>
                            <input 
                            type="text" 
                            value={schoinf1.birthday} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <label htmlFor="">Year Level</label>
                            <input 
                            type="text" 
                            value={schoinf2.yearLevel} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <label htmlFor="">Grade Level</label>
                            <input 
                            type="text" 
                            value={schoinf1.gradeLevel} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <label htmlFor="">Guardian</label>
                            <input 
                            type="text" 
                            value={schoinf2.guardian} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <label htmlFor="">Status</label>
                            <input 
                            type="text" 
                            value={schoinf2.remarks} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <label htmlFor="">Contact Number</label>
                            <input 
                            type="text" 
                            value={schoinf1.contactNum} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <div style={{display:'flex'}}>
                              <div style={{display:'flex',flexDirection:'column',marginRight:'10px'}}>
                                <label htmlFor="">Gender</label>
                                <input 
                                style={{width:"200px"}}
                                type="text" 
                                value={schoinf2.gender} disabled />
                              </div>
                              <div style={{display:'flex',flexDirection:'column'}}>
                                <label htmlFor="">Age</label>
                                <input 
                                style={{width:"200px"}}
                                type="text" 
                                value={schoinf1.age} disabled />
                              </div>
                            </div>
                          </div>
                          <div className='formpersonaChild1'>
                            <label htmlFor="">Place of Birth</label>
                            <input 
                            type="text" 
                            value={schoinf1.birthPlace} disabled />
                          </div>
                          <div className='formpersonaChild1'>
                            <label htmlFor="">Address</label>
                            <input 
                            type="text" 
                            value={schoinf1.address} disabled />
                          </div>
                        </div>
                      )
                    }
                    {
                      active === 1 && (
                        <>
                          <div>
                            <h1 style={{fontSize:'25px',fontWeight:'900'}}>Application:</h1>
                            <div className='formpersona' style={{width:'100%',height:'100%',backgroundColor:'whitesmoke',padding:'5px 15px 15px 15px',marginBottom:'15px'}}>
                              {documentaryDocs}
                            </div>
                            <h1 style={{fontSize:'25px',fontWeight:'900'}}>Renewal:</h1>
                            <div className='formpersona' style={{width:'100%',height:'100%',backgroundColor:'whitesmoke',padding:'5px 15px 15px 15px',marginBottom:'15px'}}>
                              {renewalDocs}
                            </div>
                          </div>
                        </>
                      )
                    }
                    {
                      active === 2 && (
                        <>
                       {renewalScho?.list?.map((data,index) =>{
                        const date = new Date(data.updated);
                        const redate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                        return (
                          <>
                          <div>
                            <p style={{margin:0}}>Renewed on {redate}</p>
                            <p style={{margin:0}}>Details:</p>
                            <div className='formpersona' style={{width:'100%',height:'100%',backgroundColor:'whitesmoke',padding:'5px 15px 15px 15px',marginBottom:'15px'}}>
                            <div className='formpersonaChild2'>
                              <label htmlFor="">Address</label>
                              <input 
                              type="text" 
                              value={data.Baranggay} disabled />
                            </div>
                            <div className='formpersonaChild2'>
                              <label htmlFor="">Contact Number</label>
                              <input 
                              type="text" 
                              value={data.phoneNum} disabled />
                            </div>
                            <div className='formpersonaChild2'>
                              <label htmlFor="">Guardian</label>
                              <input 
                              type="text" 
                              value={data.guardian} disabled />
                            </div>
                            <div className='formpersonaChild2'>
                              <label htmlFor="">School</label>
                              <input 
                              type="text" 
                              value={data.school} disabled />
                            </div>
                            <div className='formpersonaChild2'>
                              <label htmlFor="">Year Level</label>
                              <input 
                              type="text" 
                              value={data.yearLevel} disabled />
                            </div>
                            <div className='formpersonaChild2'>
                              <label htmlFor="">Grade Level</label>
                              <input 
                              type="text" 
                              value={data.gradeLevel} disabled />
                            </div>
                            </div>
                          </div>
                          </>
                        )
                       })}
                        </>
                      )
                    }
                </Card>
            </Card>
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
            {inf.Status === 'Renewed' ? null : (
            <>
            <button className="btnofficials2" style={{marginRight:'15px'}} autoFocus color="inherit"
            onClick={() =>RenewalDecline(inf)}
            >
              NOT ACCEPTED
            </button>
            <button className="btnofficials" sx={{marginLeft:'15px'}} autoFocus color="inherit"
            onClick={() =>SetSchoRenewed(inf)}
            >
              PASS THE RENEW
            </button>
            </>)}
          </Toolbar>
        </AppBar>
      <Box sx={{width:'100%',padding:'10px',height:'max-content',display:'flex',backgroundColor:'whitesmoke',flexWrap:'wrap',position:'relative',flexDirection:'column'}}>
        <h1 style={{position:'absolute',left:'25px',top:'20px',fontSize:'20px',fontWeight:'bold',lineHeight:'17.57px',color:'#043F97'}}>
          Requirements Submitted
        </h1>
        <div style={{width:'100%'}}>
        <div className='formpersona3' style={{height:'max-content',padding:'20px',backgroundColor:'white',borderRadius:'5px',paddingTop:'40px'}}>
         {renewalDocs1}
        </div>
        </div>

        <div style={{width:'100%',backgroundColor:'white',display:'flex',flexWrap:'wrap',justifyContent:'space-between',marginBottom:'50px',position:'relative'}}>
          <h1 style={{position:'absolute',top:'-10px',fontSize:'20px',fontWeight:'bold',lineHeight:'17.57px',backgroundColor:'#043F97',color:'white',padding:'10px',borderRadius:'5px'}}>
            OLD SCHOLAR DATA
          </h1>
          <div className='formpersona4' style={{height:'max-content',backgroundColor:'white',borderRadius:'5px',paddingTop:'15px'}}>
              <div className='formpersonaChild5'>
                  <label htmlFor="">Name</label>
                  <input 
                  type="text" 
                  value={old.Name} disabled />
              </div>
              <div className='formpersonaChild5'>
                  <label htmlFor="">Barangay</label>
                  <input 
                  type="text" 
                  value={old.Baranggay} disabled />
              </div>
              <div className='formpersonaChild5'>
                  <label htmlFor="">Batch</label>
                  <input 
                  type="text" 
                  value={old.Batch} disabled />
              </div>
              <div className='formpersonaChild5'>
                  <label htmlFor="">Gender</label>
                  <input 
                  type="text" 
                  value={old.gender} disabled />
              </div>
              <div className='formpersonaChild5'>
                  <label htmlFor="">Email</label>
                  <input 
                  type="text" 
                  value={old.email} disabled />
              </div>
              <div className='formpersonaChild5'>
                  <label htmlFor="">Phone Number</label>
                  <input 
                  type="text" 
                  value={old.phoneNum} disabled />
              </div>
              <div className='formpersonaChild5'>
                  <label htmlFor="">Year Level</label>
                  <input 
                  type="text" 
                  value={old.yearLevel} disabled />
              </div>
              <div className='formpersonaChild5'>
                  <label htmlFor="">Grade Level</label>
                  <input 
                  type="text" 
                  value={old.gradeLevel} disabled />
              </div>
          </div>
          <div style={{position:'relative',display:'flex',justifyContent:'center',alignItems:'center'}}>
              <FcRight style={{fontSize:'65px'}}/>
          </div>
          <h1 style={{position:'absolute',top:'-10px',right:'26%',fontSize:'20px',fontWeight:'bold',lineHeight:'17.57px',backgroundColor:'#043F97',color:'white',padding:'10px',borderRadius:'5px'}}>
            UPDATED SCHOLAR DATA
          </h1>
          <div className='formpersona4' style={{height:'max-content',backgroundColor:'white',borderRadius:'5px',paddingTop:'15px'}}>
          <div className='formpersonaChild5'>
                  <label htmlFor="">Name</label>
                  <input 
                  type="text" 
                  value={inf.Name} disabled />
          </div>
              <div className='formpersonaChild5'>
                  <label htmlFor="">Barangay</label>
                  <input 
                  type="text" 
                  value={inf.Baranggay} disabled />
              </div>
              <div className='formpersonaChild5'>
                  <label htmlFor="">Batch</label>
                  <input 
                  type="text" 
                  value={inf.Batch} disabled />
              </div>
              <div className='formpersonaChild5'>
                  <label htmlFor="">Gender</label>
                  <input 
                  type="text" 
                  value={old.gender} disabled />
              </div>
              <div className='formpersonaChild5'>
                  <label htmlFor="">Email</label>
                  <input 
                  type="text" 
                  value={inf.email} disabled />
              </div>
              <div className='formpersonaChild5'>
                  <label htmlFor="">Phone Number</label>
                  <input 
                  type="text" 
                  value={inf.phoneNum} disabled />
              </div>
              <div className='formpersonaChild5'>
                  <label htmlFor="">Year Level</label>
                  <input 
                  type="text" 
                  value={inf.yearLevel} disabled />
              </div>
              <div className='formpersonaChild5'>
                  <label htmlFor="">Grade Level</label>
                  <input 
                  type="text" 
                  value={inf.gradeLevel} disabled />
              </div>
          </div>
        </div>
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
    {screen === 0 && 
    <Box sx={{ width: '100%',backgroundColor:'transparent',minHeight:'300px',height: 'maxContent' }}>
    {data.length === 0 ? (
        <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <CircularProgress />
        </div>
        <div>
          <p>Loading...</p>
          <div className="loading-animation"></div>
        </div>
      </div>) : (<CustomDataGrid
        style={{backgroundColor:'white'}}
        rows={data}
        columns={columns}
        getRowId={(row) => row.applicantNum}
        scrollbarSize={10}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        sx={{minHeight:'300px'}}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        pageSizeOptions={[25]}
      />)}
    </Box>}
    {screen === 1 && <Box sx={{width: '100%',backgroundColor:'white',minHeight:'300px',height: 'maxContent'}}>
        <CustomDataGrid
        sx={{minHeight:'300px'}}
        rows={NewScholar}
        columns={columns}
        getRowId={(row) => row.applicantNum}
        scrollbarSize={10}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        pageSizeOptions={[25]}
      />
    </Box>}
    {screen === 2 && <Box sx={{ width: '100%',backgroundColor:'white',minHeight:'300px',height: 'maxContent' }}>
        <CustomDataGrid
        rows={ExistingScholar}
        columns={columns}
        getRowId={(row) => row.applicantNum}
        scrollbarSize={10}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
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
    <Box sx={{width: '100%',backgroundColor:'white',minHeight:'300px',height: 'maxContent'}}>
        <CustomDataGrid
        rows={PendingRenewal}
        columns={columns}
        getRowId={(row) => row.applicantNum}
        scrollbarSize={10}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
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