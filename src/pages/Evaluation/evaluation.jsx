import React, { useEffect, useState } from 'react'
import './evaluation.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { DataGrid,} from '@mui/x-data-grid';
import { Tabs, Tab, Box,Card,Button,Chip } from "@mui/material";  
import { ApplicantsRequest, FetchingApplicantsInfo, ListofSub,
   USERFRM_ID,SetApplicant,FailedUser,FetchingBmccSchoinfo,
      UpdatePassSlots,FetchPassSlots,DecrePassSlots,GrantAccess,ListAccess } from "../../api/request";
import TextField from '@mui/material/TextField';
import swal from 'sweetalert';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { useContext } from "react";
import { admininfo } from "../../App";
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import CustomNoRowsOverlay from '../Design/Norows';
import UserIcon from '../../Images/userrandom.png'

const CustomDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-columnHeaders': {
    color: 'white', 
    fontWeight:'bold',
    backgroundColor:'#0047a4',
    fontWeight:'bold',
    margin:"0px",
    borderTopLeftRadius:'0px',
    borderTopRightRadius:'0px'
  },

});

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Evaluation = () => {
    const { user } = useContext(admininfo);
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [data, setData] = useState([]);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const [userscore,setUserScore] = useState([]);
    const [applicantsInfo, setApplicantInfo] = useState([]);
    const [access,setAccess] = useState([])
    const [tabValue, setTabValue] = useState('one');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [passSlot,setPassSlot] = useState([]);
    const [siblings,setSiblings] = useState([]);
    const [passscore, setPassscore] = useState('');
    const [slots, setSlots] = useState('');
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const handleCloseDialog = () => setOpenDialog(false);
    const [activeState,setActiveState] = useState('All');
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [failedSelectionModel,setFailedSelectionModel] = useState([]);
    const [who,setWho] = useState('');
    const [isSend,setIsSend] = useState('No')
    const [checked, setChecked] = React.useState(false);
    const [active,setActive] = useState(0);

    const handleChange = (event, newValue) => {
      setTabValue(newValue);
    };

    const handleChangeCheckbox = (event) => {
      const check = event.target.checked
      if(check){
        setChecked(check);
        setIsSend('Yes')
      }else{
        setChecked(check);
        setIsSend('No')
      }

    };
    const handleOpenDialog = (data) => {
      setOpenDialog(true);
      setWho(data.applicantNum)
    }
    useEffect(() => {

        async function Fetch(){
          const response = await ApplicantsRequest.ALL_APPLICANTS();
          const pass = await FetchPassSlots.FETCH_PASSSLOTS()
          const ForEva = response.data.results?.filter(user => user.status === 'For Evaluation')
          let acc = await ListAccess.ACCESS()
          const empacc = acc.data.result?.filter(data => data.employeeName === user.name)
          setAccess(empacc)
          setData(ForEva);
          setPassSlot(pass.data.result[0])
        }
        Fetch();
      }, []);
      useEffect(() => {
        setIsButtonVisible(passscore !== '' || slots !== '');
      }, [passscore,slots]);
    
      const view = async (data) => {
        const applicantNum = data.applicantNum;
        const formData = new FormData();
        formData.append('applicantNum',applicantNum)
        try {
          setShowBackdrop(true);
          const response = await Promise.all([
            FetchingApplicantsInfo.FETCH_INFO(applicantNum),
            ListofSub.FETCH_SUB(applicantNum),
            USERFRM_ID.FORMUSR(applicantNum)
          ]);
          setSiblings(response[0].data.siblings)
          setApplicantInfo(response[0].data.results[0]);
          setUserScore(response[2].data)
          setShowBackdrop(false);
          handleOpen()
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    
      }
      const failed = async(data) =>{
        const res = await FetchingBmccSchoinfo.FETCH_SCHOLARSINFO(data.applicantNum);
        const schoapplied = res.data.ScholarInf.results1[0].SchoIarshipApplied;
        const batch = res.data.ScholarInf.results1[0].Batch;
        const reason = 'Score did not Meet Passing Score'
        const formData = new FormData();
        formData.append('applicantNum',data.applicantNum)
        formData.append('Name',data.Name)
        formData.append('ScholarshipApplied', schoapplied)
        formData.append('batch',batch)
        formData.append('Reason',reason)
        formData.append('email',res.data.ScholarInf.results1[0].email)
        setShowBackdrop(true);
        const response = await FailedUser.FAILED_USER(formData)
        if(response.data.success === 1){
          setShowBackdrop(false);
          swal({
            title: "Success",
            text: "Succes!",
            icon: "success",
            button: "OK",
          });
        }else{
          setShowBackdrop(false);
          swal({
            title: "Failed",
            text: "Something Went Wrong!",
            icon: "error",
            button: "OK",
          });
        }
      }
      const handleRowSelectionModelChange = (newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);

      };
      const handleFailedSelectionModelChange = (newFailedSelectionModel) => {
        console.log(newFailedSelectionModel)
        setFailedSelectionModel(newFailedSelectionModel);

      };
    const columns = [
        {
          field: 'SchoIarshipApplied',
          headerName: 'Scholarship Applied',
          width: 250,
          editable: false,
        },
        {
          field: 'Name',
          headerName: 'Name',
          width: 250,
          editable: false,
        },
        {
          field: 'DateApplied',
          headerName: 'Date Applied',
          width: 150,
          editable: false,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 100,
          editable: false,
        },
        {
          field: 'stat',
          headerName: 'Score',
          width: 90,
          editable: false,
          renderCell: (params) =>(
            <>
            <p style={{margin:'0px'}}>{params.row.score}/100</p>
            </>
          ),
        },
        {
            field: 'insert',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <>
                <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
                <button className='btnofficials1'
                onClick={() => view(params.row)}>View Details</button>
                </div>
              </>
            ),
          },
          {
            field: 'score',
            headerName: 'Details',
            width: 250,
            renderCell: (params) => {
              let status
              if(params.value >= passSlot.passingscore){
                status = 'Passed'
              }
              if(params.value < passSlot.passingscore){
                status = 'Failed'
              }
              return(
                <>
                <div style={{width:"100%",display:'flex',height:'100%',justifyContent:'center',alignItems:'center'}}>
              {status === 'Passed' && <button className="btnofficials"
              onClick={() => setFirsttoSecStat(params.row)}>
                Add to Applicants List
                </button>}
              {status === 'Failed' && (<>
                {params.row.grantedAccess === '' || !params.row.grantedAccess ? (<button className='btnofficials1'  
              onClick={() =>handleOpenDialog(params.row)}>
                Access</button>) : (<button className="btnofficials"
              onClick={() => setFirsttoSecStat(params.row)}>
                Add to Applicants List
                </button>)}
                <button className='btnofficials2' style={{marginLeft:'10px'}}
                onClick={() => failed(params.row)}>
                  Failed
                </button>
                </>)}
              </div>
              </>)
            },
          },
    
      ];
    const passedColumn = [
        {
          field: 'SchoIarshipApplied',
          headerName: 'Scholarship Applied',
          width: 250,
          editable: false,
        },
        {
          field: 'Name',
          headerName: 'Name',
          width: 250,
          editable: false,
        },
        {
          field: 'DateApplied',
          headerName: 'Date Applied',
          width: 150,
          editable: false,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 100,
          editable: false,
        },
        {
          field: 'stat',
          headerName: 'Score',
          width: 90,
          editable: false,
          renderCell: (params) =>(
            <>
            <p style={{margin:'0px'}}>{params.row.score}/100</p>
            </>
          ),
        },
        {
            field: 'insert',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <>
                <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
                <button className='myButton'
                onClick={() => view(params.row)}>View Details</button>
                </div>
              </>
            ),
          },
          {
            field: 'score',
            headerName: 'Details',
            width: 250,
            renderCell: (params) => {
              return(
                <>
                <div style={{width:"100%",display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
              <button className="btnofficials"
              onClick={() => setFirsttoSecStat(params.row)}>
                Add to Applicants List
                </button>
              </div>
              </>)
            },
          },
    
      ];
    const failedColumn = [
        {
          field: 'SchoIarshipApplied',
          headerName: 'Scholarship Applied',
          width: 250,
          editable: false,
        },
        {
          field: 'Name',
          headerName: 'Name',
          width: 250,
          editable: false,
        },
        {
          field: 'DateApplied',
          headerName: 'Date Applied',
          width: 150,
          editable: false,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 100,
          editable: false,
        },
        {
          field: 'stat',
          headerName: 'Score',
          width: 90,
          editable: false,
          renderCell: (params) =>(
            <>
            <p style={{margin:'0px'}}>{params.row.score}/100</p>
            </>
          ),
        },
        {
            field: 'insert',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <>
                <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
                <button className='btnofficials1'
                onClick={() => view(params.row)}>View Details</button>
                </div>
              </>
            ),
          },
          {
            field: 'grantedAccess',
            headerName: 'Details',
            width: 250,
            renderCell: (params) => {
              console.log(params.row)
              return(
                <>
                <div style={{width:"100%",display:'flex',height:'100%',justifyContent:'center',alignItems:'center'}}>
              {params.row.grantedAccess === '' || !params.row.grantedAccess ? (<button className='btnofficials1'
              onClick={() =>handleOpenDialog(params.row)}>
                Access</button>) : (<button className="btnofficials" 
              onClick={() => setFirsttoSecStat(params.row)}>
                Add to Applicants List
                </button>)}
                <button className='btnofficials2' style={{marginLeft:'5px'}}
              onClick={() => failed(params.row)}>
                Failed
                </button>
              </div>
              </>)
            },
          },
    
      ];

    const setFirsttoSecStat = async(data) =>{
        if (passSlot.slots === 0) {
          swal({
            text: 'No Slots Available',
            timer: 2000,
            buttons: false,
            icon: 'error',
          });
          return;
        }
        const decre = await DecrePassSlots.DECRE_PASSSLOTS();
        const formData = new FormData();
        formData.append('email',data.email);
        formData.append('applicantNum',data.applicantNum)
        formData.append('Name',data.Name)
        setShowBackdrop(true);
        SetApplicant.SET_APPLICANT(formData)
        .then(res => {
          if(res.data.success === 1){
            console.log(res)
            setPassSlot(decre.data.results[0]);
            setData(res.data.result);
            setPassscore(decre.data.results[0].passingscore);
            setSlots(decre.data.results[0].slots);
            setShowBackdrop(false);
            swal({
              text: 'Status Updated',
              timer: 2000,
              buttons: false,
              icon: "success",
            })
          }else{
            setShowBackdrop(false);
            swal({
              text: 'Something Went Wrong',
              timer: 2000,
              buttons: false,
              icon: "error",
            })
          }

          }
           )
          .catch(err => console.log(err));
    }
    const ScoreSlot = () =>{
      const data1 = passscore || passSlot.passingscore;
      const data2 = slots || passSlot.slots
      if(data1 < 0 || data2 < 0){
        swal({
          title: "Failed",
          text: "Not Accepted.It must not a negative number!",
          icon: "error",
          button: "OK",
        });
        return
      }
      if(data1 <= 49){
        swal({
          title: "Failed",
          text: "Score not Accepted.It must be equal or greater than 50!",
          icon: "error",
          button: "OK",
        });
        return
      }
      if(data1 > 100){
        swal({
          title: "Failed",
          text: "Score not Accepted.It must not greater than 100!",
          icon: "error",
          button: "OK",
        });
        return
      }
      const formData = new FormData();
      formData.append('passscore',data1);
      formData.append('slots',data2);
      setShowBackdrop(true);
      UpdatePassSlots.UPDATE_PASSSLOTS(formData)
      .then(res => {
        if(res.data.success === 1){
          setPassSlot(res.data.results[0])
          setShowBackdrop(false);
          swal({
            title: "Success",
            text: "Updated!",
            icon: "success",
            button: "OK",
          });
        }else{
          setShowBackdrop(false);
          swal({
            title: "Failed",
            text: "Something Went Wrong!",
            icon: "error",
            button: "OK",
          });
        }

        }
         )
        .catch(err => console.log(err));
    }
    const Addall = async () => {
      const selectedRows = rowSelectionModel.map((selectedRow) =>
        data.find((row) => row.applicantNum === selectedRow)
      );
      if(selectedRows.length === 0){
        swal({
          text: 'Please Select Users First',
          timer: 2000,
          buttons: false,
          icon: "warning",
        })
        return
      }
      if (passSlot.slots === 0) {
   
        swal({
          text: 'No Slots Available',
          timer: 2000,
          buttons: false,
          icon: 'error',
        });
        return;
      }else if(passSlot.slots < selectedRows.length){
        swal({
          text: 'Insufficient slots for Selected User',
          timer: 2000,
          buttons: false,
          icon: 'error',
        });
        return;
      }
    
      const decre = await DecrePassSlots.DECRE_PASSSLOTS();
      if (decre.data.success === 1) {
        try {
          setShowBackdrop(true);
          let counter = 0;
          for (let i = 0; i < selectedRows.length; i++) {
            const row = selectedRows[i];
    
            if (passSlot.slots === 0) {
              setShowBackdrop(false);
              swal({
                text: 'No Slots Available',
                timer: 2000,
                buttons: false,
                icon: 'error',
              });
              break; 
            }
            const formData = new FormData();
            formData.append('email', row.email);
            formData.append('applicantNum', row.applicantNum);
            const res = await SetApplicant.SET_APPLICANT(formData);
            if (res.data.success === 1) {
              setPassSlot(decre.data.results[0]);
              setData(res.data.result);
              setPassscore(decre.data.results[0].passingscore);
              setSlots(decre.data.results[0].slots);
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
            } else {
              setShowBackdrop(false);
              swal({
                title: "Failed",
                text: "Something Went Wrong!",
                icon: "error",
                button: "OK",
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setShowBackdrop(false);
        swal({
          text: 'No Slots Available',
          timer: 2000,
          buttons: false,
          icon: 'error',
        });
        return;
      }
    };
    const FailedAll = async() =>{
      const selectedRows = failedSelectionModel.map((selectedRow) =>
        data.find((row) => row.applicantNum === selectedRow));
        if(selectedRows.length === 0){
          swal({
            text: 'Please Select Users First',
            timer: 2000,
            buttons: false,
            icon: "warning",
          })
          return
        }
        setShowBackdrop(true);
        let counter = 0;
        for (let i=0 ;i<selectedRows.length;i++){
          const row = selectedRows[i];
          const schoapplied = row.SchoIarshipApplied
          const batch = row.Batch
          const reason = 'Score did not Meet Passing Score'
          const formData = new FormData();
          formData.append('applicantNum',row.applicantNum)
          formData.append('Name',row.Name)
          formData.append('ScholarshipApplied', schoapplied)
          formData.append('batch',batch)
          formData.append('Reason',reason)
          formData.append('email',row.email)
          formData.append('isSend',isSend)
          const response = await FailedUser.FAILED_USER(formData)
          if(response.data.success === 1){
            setData(response.data.result);
            setIsSend('No')
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
          }else{
            setShowBackdrop(false);
            swal({
              title: "Failed",
              text: "Something Went Wrong!",
              icon: "error",
              button: "OK",
            });
          }
        }
    }
    const Access = async() =>{
      const formData = new FormData();
      formData.append('email',email);
      formData.append('password',password);
      formData.append('applicantNum',who)
      setOpenDialog(false)
      setShowBackdrop(true);
      await GrantAccess.GRANT_ACCESS(formData)
      .then(res => {
        if(res.data.success === 1){
          const ForEva = res.data.result?.filter(user => user.status === 'For Evaluation')
          setData(ForEva);
          setEmail('')
          setPassword('')
          setShowBackdrop(false);
          swal({
            text: res.data.message,
            timer: 2000,
            buttons: false,
            icon: 'success',
          });
        }else{
          setShowBackdrop(false);
          swal({
            text: res.data.message,
            timer: 2000,
            buttons: false,
            icon: 'error',
          });
        }

        }
         )
        .catch(err => console.log(err));
      
    }
    
    const Passed = data && data.length > 0
    ? data.filter(user => user.score >= passSlot.passingscore)
    : '';
    const Failed = data && data.length > 0
    ? data.filter(user => user.score < passSlot.passingscore)
    : '';

    const userfrmeval = userscore?.map((data,index) =>{
      return(
      <div className='frmlistq' key={index}>
      <Chip sx={{width:'60px',position:'absolute',left:0,top:10}} label={data.score} color="primary" />
      <div style={{}}>
        <p style={{margin:'0px',fontSize:'20px',fontWeight:'700',backgroundColor:'#f1f3fa',padding:'10px',width:'100%',borderRadius:'10px'}}>
          <strong>{index + 1}.</strong> {data.question} 
        </p>
        <p style={{margin:'0px',fontSize:'18px',marginTop:'10px',marginLeft:'20px',fontStyle:'italic'}}>- {data.answer}</p>
      </div>
      </div>

    )})
    console.log(applicantsInfo)
  return (
    <>
              <StyledBackdrop open={showBackdrop}>
                <CircularProgress color="inherit" />
              </StyledBackdrop>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Login to Grant Access</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will use for the special case scenario if the Admin, Employee or Mayor wants an applicants with a failed score to be passed
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={password}
            onChange={(e) =>setPassword(e.target.value)}
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <button className='btnofficials1' onClick={handleCloseDialog}>Cancel</button>
          <button className="btnofficials" onClick={Access}>Submit</button>
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
              Applicant Information
            </Typography>
          </Toolbar>
        </AppBar>
      <Box sx={{width:'100%',height:'100%',display:'flex',backgroundColor:'whitesmoke',flexWrap:'wrap'}}>
         <div style={{width:'30%',backgroundColor:'#f1f3fa',display:'flex',flexDirection:'column',alignItems:'center',paddingTop:'2%'}}>
            <Card elevation={2} style={{backgroundColor:'white',width:"75%",height:'350px',marginBottom:'50px',display:'flex',flexDirection:'column',borderRadius:'5px'}}>
                <div style={{width:'90%'}}>
                  <h1 style={{margin:'10px 0px 0px 30px',fontSize:'25px',borderBottom:'5px solid #f1f3fa',color:'#7F7E7D',paddingBottom:'5px'}}>
                    Applicant Profile
                  </h1>
                </div>
                <div style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center',marginTop:'20px',position:'relative'}}>
                  {applicantsInfo.profile ? (
                    <>
                    <img 
                    style={{width:'200px',height:'200px',borderRadius:'50%',objectFit:'cover',border:'2px solid black'}}
                    src={applicantsInfo.profile}
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
                    {applicantsInfo.Name}
                  </h1>
                </div>
            </Card>
            <Card elevation={2} style={{backgroundColor:'white',width:"75%",height:'max-content'}}>
               <div style={{width:'90%'}}>
                  <h1 style={{margin:'10px 0px 0px 30px',fontSize:'20px',borderBottom:'5px solid #f1f3fa',color:'#7F7E7D',paddingBottom:'5px'}}>
                    Applicant Information
                  </h1>
                </div>
                <div style={{display:'flex',flexDirection:'column',padding:'15px'}}>
                  <p><strong>Applicant Code:</strong> {applicantsInfo.Name}</p>
                  <p><strong>Scholarship Applied:</strong> {applicantsInfo.ScholarshipApplied
                     }</p>
                  <p><strong>Date Applied:</strong> {applicantsInfo.date}</p>
                  <p><strong>Batch:</strong> {applicantsInfo.Batch}</p>
                </div>
            </Card>
         </div>
         <div style={{width:'70%',backgroundColor:'#f1f3fa',display:'flex',flexDirection:'column',alignItems:'center',paddingTop:'2%'}}>
            <Card elevation={0} style={{backgroundColor:'transparent',width:'95%',height:'150px',marginBottom:'20px',padding:'15px 10px 30px 35px'}}>
              <h1>Applicant Information</h1>
              <p>You can see applicant information</p>
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
                   Parents Info
                  </button>
                  <button
                  onClick={() => setActive(2)}
                  className={active === 2 ? 'evalActivepage' : 'evalPage'}
                  >
                    Application Form
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
                            value={applicantsInfo.Name} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <label htmlFor="">Barangay</label>
                            <input 
                            type="text" 
                            value={applicantsInfo.baranggay} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <label htmlFor="">Email</label>
                            <input 
                            type="text" 
                            value={applicantsInfo.email} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <label htmlFor="">Birthday</label>
                            <input 
                            type="text" 
                            value={applicantsInfo.birthday} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <label htmlFor="">Contact Number</label>
                            <input 
                            type="text" 
                            value={applicantsInfo.contactNum} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <div style={{display:'flex'}}>
                              <div style={{display:'flex',flexDirection:'column',marginRight:'10px'}}>
                                <label htmlFor="">Gender</label>
                                <input 
                                style={{width:"200px"}}
                                type="text" 
                                value={applicantsInfo.gender} disabled />
                              </div>
                              <div style={{display:'flex',flexDirection:'column'}}>
                                <label htmlFor="">Age</label>
                                <input 
                                style={{width:"200px"}}
                                type="text" 
                                value={applicantsInfo.age} disabled />
                              </div>
                            </div>
                          </div>
                          <div className='formpersonaChild1'>
                            <label htmlFor="">Place of Birth</label>
                            <input 
                            type="text" 
                            value={applicantsInfo.birthPlace} disabled />
                          </div>
                          <div className='formpersonaChild1'>
                            <label htmlFor="">Address</label>
                            <input 
                            type="text" 
                            value={applicantsInfo.address} disabled />
                          </div>
                        </div>
                      )
                    }
                    {
                      active === 1 && (
                        <>
                        <div className='famcon'>
                          <div>
                          <h1 style={{margin:'0px',fontSize:'25px',fontWeight:'bold'}}>Father Information</h1>
                          <div className='fdetails'>
                            <div>
                              <label htmlFor="">Full Name</label>
                              <input 
                              type="text" 
                              value={applicantsInfo.fatherName} disabled />
                            </div>
                            <div>
                              <label htmlFor="">Highest Educational Attaintment</label>
                              <input 
                              type="text" 
                              value={applicantsInfo.fatherEducation} disabled />
                            </div>
                            <div>
                              <label htmlFor="">Occupation</label>
                              <input 
                              type="text" 
                              value={applicantsInfo.fatherOccupation} disabled />
                            </div>
                          </div>
                          </div>
                          <div>
                          <h1 style={{margin:'0px',fontSize:'25px',fontWeight:'bold'}}>Mother Information</h1>
                          <div className='fdetails'>
                            <div>
                              <label htmlFor="">Full Name</label>
                              <input 
                              type="text" 
                              value={applicantsInfo.motherName} disabled />
                            </div>
                            <div>
                              <label htmlFor="">Highest Educational Attaintment</label>
                              <input 
                              type="text" 
                              value={applicantsInfo.motherEducation} disabled />
                            </div>
                            <div>
                              <label htmlFor="">Occupation</label>
                              <input 
                              type="text" 
                              value={applicantsInfo.motherOccupation} disabled />
                            </div>
                          </div>
                          </div>
                          <div style={{height:'max-content'}}>
                          <h1 style={{margin:'0px',fontSize:'25px',fontWeight:'bold'}}>Guardian Information</h1>
                          <div className='fdetails'>
                            <div>
                              <label htmlFor="">Full Name</label>
                              <input 
                              type="text" 
                              value={applicantsInfo.guardianName} disabled />
                            </div>
                            <div>
                              <label htmlFor="">Relationship</label>
                              <input 
                              type="text" 
                              value={applicantsInfo.relationship} disabled />
                            </div>
                            <div>
                              <label htmlFor="">Address</label>
                              <input 
                              type="text" 
                              value={applicantsInfo.guardianAddress} disabled />
                            </div>
                            <div>
                              <label htmlFor="">Contact Number</label>
                              <input 
                              type="text" 
                              value={applicantsInfo.guardianContact} disabled />
                            </div>
                          </div>
                          </div>
                          <div style={{height:'max-content'}}>
                          <h1 style={{margin:'0px',fontSize:'25px',fontWeight:'bold'}}>List of Siblings</h1>
                          {siblings.length > 0 ? (<div className='fdetails'>
                            {siblings?.map((data,index) =>{
                              return(
                                <div key={index}>
                                <label htmlFor="">Full Name</label>
                                <input 
                                type="text" 
                                value={data.siblingName} disabled />
                              </div>
                              )
                            })}

                          </div>) : (
                            <p style={{fontSize:'20px',fontWeight:'500',fontStyle:'italic',marginTop:'20px',marginLeft:'20px'}}>Only Child.</p>
                          )}
                          </div>
                        </div>
                        </>
                      )
                    }
                    {
                      active === 2 && (
                        <>
                        <div>
                          <h1 style={{fontSize:'27px',fontWeight:'bold',marginBottom:'15px'}}>
                            Total Score: {applicantsInfo.score}/100
                          </h1>
                         {userfrmeval}
                        </div>
                        </>
                      )
                    }
                </Card>
            </Card>
         </div>
      </Box>
    </Dialog>
    <div style={{width:'100%'}}>
           <div className="scholars">
        <Sidebar/>
        <div className="scholarsContainer" style={{backgroundColor:'#f1f3fa'}}>
            <Navbar/>
            <Card sx={{width:'97%',margin:'10px',padding:'10px',display:'flex',justifyContent:'flex-end',flexDirection:'column',alignItems:'flex-end'}} elevation={0}>
            <div className='evaluationcon'>
              <div style={{width:'100%',height: 100,display:'flex',justifyContent:'space-between',padding:10}}>
                  <div style={{width:'30%',display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
                  <p className="scorecardh">Registered Applicants</p>
                  </div>
                  <div style={{marginRight:5,height:'100%'}}>
                    <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',alignItems:'center'}}>
                      <div style={{width:'100%',alignItems:'center',justifyContent:'center',display:'flex',margin:10}}>
                    <TextField
                        id="outlined-number"
                        label="Passing Score"
                        type="number"
                        size='small'
                        placeholder={passSlot.passingscore}
                        sx={{width:'30%',marginRight:5}}
                        value={passscore}
                        onChange={(e) => setPassscore(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    <TextField
                        id="outlined-number"
                        label="Available Slot"
                        placeholder={passSlot.slots}
                        type="number"
                        size='small'
                        sx={{width:'30%'}}
                        onChange={(e) =>setSlots(e.target.value)}
                        value={slots}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      </div>
                      <div>
                      {isButtonVisible && <button className="btnofficials" onClick={ScoreSlot}>Save Changes</button>}
                      </div>
                    </div>
                  </div>
              </div>
              <Box sx={{ height: 'maxContent', width: '100%',marginTop:"10px" }}>
              <Breadcrumbs sx={{backgroundColor:'#0047a4',marginBottom:'0px'}} aria-label="breadcrumb">
                  <Button onClick={() => setActiveState('All')}>
                    <Link
                      underline="none"
                      sx={{
                        color: 'white' ,
                        borderBottom: activeState === 'All' ? '5px solid white' : 'none',
                        transition:'all 0.3s ease-in-out',
                        display:'flex',
                        alignItems:'center'
                      }}
                    >
                      <FormatListBulletedOutlinedIcon sx={{marginRight:'5px'}} fontSize='inherit' />
                      All({data.length})
                    </Link>
                  </Button>
                  <Button onClick={() => setActiveState('Passed')}>
                    <Link
                      underline="none"
                      sx={{
                        color: 'white',
                        borderBottom: activeState === 'Passed' ? '5px solid white' : 'none',
                        transition:'all 0.3s ease-in-out',
                        display:'flex',
                        alignItems:'center'
                      }}
                    >
                      <CheckCircleIcon sx={{marginRight:'5px'}} fontSize="inherit" />
                      Passed({Passed.length})
                    </Link>
                  </Button>
                  <Button onClick={() => setActiveState('Failed')}>
                    <Link
                      underline="none"
                      sx={{
                        color:'white',
                        borderBottom: activeState === 'Failed' ? '5px solid white' : 'none',
                        transition:'all 0.3s ease-in-out',
                        display:'flex',
                        alignItems:'center'
                      }}
                    >
                      <CancelIcon sx={{marginRight:'5px'}} fontSize="inherit" />
                      Failed({Failed.length})
                    </Link>
                  </Button>
              </Breadcrumbs>
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
      </div>) : (<Card sx={{height:'500px',borderRadius:'0px'}}>
                    {activeState === 'All' && (
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
                    sx={{minHeight:'300px',border:'none',borderRadius:'0px'}}
                    slots={{
                      noRowsOverlay: CustomNoRowsOverlay,
                    }}
                    pageSizeOptions={[25]}
                    disableRowSelectionOnClick
                  />
                )}
                  {activeState === 'Passed' && (
                    <CustomDataGrid
                      rows={Passed}
                      columns={passedColumn}
                      getRowId={(row) => row.applicantNum}
                      scrollbarSize={10}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      sx={{minHeight:'300px',border:'none',borderRadius:'0px'}}
                      slots={{
                        noRowsOverlay: CustomNoRowsOverlay,
                      }}
                      pageSizeOptions={[25]}
                      checkboxSelection
                      onRowSelectionModelChange={handleRowSelectionModelChange}
                      rowSelectionModel={rowSelectionModel}
                      disableRowSelectionOnClick
                    />
                  )}
                  {activeState === 'Failed' && (
                    <CustomDataGrid
                      rows={Failed}
                      columns={failedColumn}
                      getRowId={(row) => row.applicantNum}
                      scrollbarSize={10}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      sx={{minHeight:'300px',border:'none',borderRadius:'0px'}}
                      slots={{
                        noRowsOverlay: CustomNoRowsOverlay,
                      }}
                      pageSizeOptions={[25]}
                      checkboxSelection
                      onRowSelectionModelChange={handleFailedSelectionModelChange}
                      rowSelectionModel={failedSelectionModel}
                      disableRowSelectionOnClick
                    />
                  )}
                </Card>)}
              </Box>
              
            </div>
            {activeState === 'Passed' && <div sx={{width:'90%',margin:'10px',display:'flex',justifyContent:'flex-end',flexDirection:'column',alignItems:'flex-end'}}>
              <button className='btnofficials' onClick={Addall} >ADD ALL SELECTED TO APPLICANT LIST</button>
            </div>}
            {activeState === 'Failed' && <div sx={{width:'90%',margin:'10px',display:'flex',justifyContent:'flex-end',flexDirection:'column',alignItems:'flex-end'}}>
                  <Checkbox
                    checked={checked}
                    onChange={handleChangeCheckbox}
                    inputProps={{ 'aria-label': 'controlled' }}
                  /><span>Sent Notification</span>
                <button className='btnofficials2' onClick={FailedAll} style={{margin:'10px'}} >SET FAILED THE SELECTED USERS</button>
            </div>}
            </Card>
        </div>
    </div>
    </div>
    </>
  )
}

export default Evaluation