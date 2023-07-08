import React, { useEffect, useState } from 'react'
import './evaluation.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { DataGrid,} from '@mui/x-data-grid';
import { Tabs, Tab, Box, Modal,Card,Button } from "@mui/material";  
import { ApplicantsRequest, FetchingApplicantsInfo, ListofSub,
    CheckingSubs, CheckingApplicants,UserScore,SetApplicant,FailedUser,FetchingBmccSchoinfo,
      UpdatePassSlots,FetchPassSlots,DecrePassSlots,GrantAccess } from "../../api/request";
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
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';

const Evaluation = () => {
  const { loginUser,user } = useContext(admininfo);
    const [data, setData] = useState([]);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const [userscore,setUserScore] = useState([]);
    const [selectedInfo, setSelectedInfo] = useState({});
    const [applicantsInfo, setApplicantInfo] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [passSlot,setPassSlot] = useState([]);
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
          console.log(response)
          const ForEva = response.data.results?.filter(user => user.status === 'For Evaluation')
          console.log(ForEva)
          setData(ForEva);
          setPassSlot(pass.data.result[0])
        }
        Fetch();
      }, []);
      useEffect(() => {
        setIsButtonVisible(passscore !== '' || slots !== '');
      }, [passscore,slots]);
    
      const view = async (data) => {
        console.log(data)
        const applicantNum = data.applicantNum;
        const formData = new FormData();
        formData.append('applicantNum',applicantNum)
        try {
          const response = await Promise.all([
            FetchingApplicantsInfo.FETCH_INFO(applicantNum),
            ListofSub.FETCH_SUB(applicantNum),
            UserScore.USER_SCORE(applicantNum)
          ]);
          console.log(response)
          setApplicantInfo(response[0].data.results);
          setUserScore(response[2].data.result)
          handleOpen()
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    
      }
      const failed = async(data) =>{
        console.log(data)
        const res = await FetchingBmccSchoinfo.FETCH_SCHOLARSINFO(data.applicantNum);
        console.log(res)
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
        const response = await FailedUser.FAILED_USER(formData)
        if(response.data.success === 1){
          swal('Status Updated')
        }else{
          swal('Something Went Wrong')
        }
      }
      const handleRowSelectionModelChange = (newRowSelectionModel) => {
        console.log(newRowSelectionModel)
        setRowSelectionModel(newRowSelectionModel);

      };
      const handleFailedSelectionModelChange = (newFailedSelectionModel) => {
        console.log(newFailedSelectionModel)
        setFailedSelectionModel(newFailedSelectionModel);

      };
    const columns = [
        { 
          field: 'applicantNum', 
          headerName: 'Registry ID',
          width: 100
         },
         {
           field: 'applicantCode', 
            headerName: 'Applicant Code',
          width: 150
          },
        {
          field: 'SchoIarshipApplied',
          headerName: 'Scholarship Applied',
          width: 150,
          editable: false,
        },
        {
          field: 'Name',
          headerName: 'Name',
          width: 150,
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
          width: 70,
          editable: false,
          renderCell: (params) =>(
            <>
            <p>{params.row.score}</p>
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
                <button style={{marginLeft:'5px',backgroundColor:'blue',border:'none',padding:'3px',width:'100%',margin:'2px',color:'white',borderRadius:'5px',cursor:'pointer'}}
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
                <div style={{width:"100%",display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
              {status === 'Passed' && <button style={{marginLeft:'5px',backgroundColor:'green',border:'none',padding:'3px',width:'100%',margin:'2px',color:'white',borderRadius:'5px',cursor:'pointer'}} 
              onClick={() => setFirsttoSecStat(params.row)}>
                Add to Applicants List
                </button>}
              {status === 'Failed' && (<>
                {params.row.grantedAccess === '' || !params.row.grantedAccess ? (<button style={{marginLeft:'5px',backgroundColor:'yellow',color:'green',border:'none',padding:'3px',width:'100%',margin:'2px',borderRadius:'5px',cursor:'pointer'}}  
              onClick={() =>handleOpenDialog(params.row)}>
                Access</button>) : (<button style={{marginLeft:'5px',backgroundColor:'green',border:'none',padding:'3px',width:'100%',margin:'2px',color:'white',borderRadius:'5px',cursor:'pointer'}} 
              onClick={() => setFirsttoSecStat(params.row)}>
                Add to Applicants List
                </button>)}
                <button style={{marginLeft:'5px',backgroundColor:'red',border:'none',padding:'3px',width:'100%',margin:'2px',color:'white',borderRadius:'5px',cursor:'pointer'}} 
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
          field: 'applicantNum', 
          headerName: 'Registry ID',
          width: 100
         },
         {
           field: 'applicantCode', 
            headerName: 'Applicant Code',
          width: 150
          },
        {
          field: 'SchoIarshipApplied',
          headerName: 'Scholarship Applied',
          width: 150,
          editable: false,
        },
        {
          field: 'Name',
          headerName: 'Name',
          width: 150,
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
          width: 70,
          editable: false,
          renderCell: (params) =>(
            <>
            <p>{params.row.score}</p>
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
                <button style={{marginLeft:'5px',backgroundColor:'blue',border:'none',padding:'3px',width:'100%',margin:'2px',color:'white',borderRadius:'5px',cursor:'pointer'}}
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
              <button style={{marginLeft:'5px',backgroundColor:'green',border:'none',padding:'3px',width:'100%',margin:'2px',color:'white',borderRadius:'5px',cursor:'pointer'}} 
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
          field: 'applicantNum', 
          headerName: 'Registry ID',
          width: 100
         },
         {
           field: 'applicantCode', 
            headerName: 'Applicant Code',
          width: 150
          },
        {
          field: 'SchoIarshipApplied',
          headerName: 'Scholarship Applied',
          width: 150,
          editable: false,
        },
        {
          field: 'Name',
          headerName: 'Name',
          width: 150,
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
          width: 70,
          editable: false,
          renderCell: (params) =>(
            <>
            <p>{params.row.score}</p>
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
                <button style={{marginLeft:'5px',backgroundColor:'blue',border:'none',padding:'3px',width:'100%',margin:'2px',color:'white',borderRadius:'5px',cursor:'pointer'}}
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
                <div style={{width:"100%",display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
              {params.row.grantedAccess === '' || !params.row.grantedAccess ? (<button style={{marginLeft:'5px',backgroundColor:'yellow',color:'green',border:'none',padding:'3px',width:'100%',margin:'2px',borderRadius:'5px',cursor:'pointer'}}  
              onClick={() =>handleOpenDialog(params.row)}>
                Access</button>) : (<button style={{marginLeft:'5px',backgroundColor:'green',border:'none',padding:'3px',width:'100%',margin:'2px',color:'white',borderRadius:'5px',cursor:'pointer'}} 
              onClick={() => setFirsttoSecStat(params.row)}>
                Add to Applicants List
                </button>)}
                <button style={{marginLeft:'5px',backgroundColor:'red',border:'none',padding:'3px',width:'100%',margin:'2px',color:'white',borderRadius:'5px',cursor:'pointer'}} 
              onClick={() => failed(params.row)}>
                Failed
                </button>
              </div>
              </>)
            },
          },
    
      ];
      const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
      };
    const applicantInfoPA = applicantsInfo?.map((data) =>{
        return (
          <div className="PA">
            <div className="Pinfo">
              <div className="fstcolm">
                <div>
            <TextField
            disabled
            sx={{color:'black'}}
            id="outlined-disabled"
            label="First Name"
            defaultValue={data.firstName}
          />
          </div>
          <div>
            <TextField
            disabled
            id="outlined-disabled"
            label="Last Name"
            defaultValue={data.lastName}
          />
          </div>
          <div>
            <TextField
            disabled
            id="outlined-disabled"
            label="Middle Name"
            defaultValue={data.middleName}
          />
          </div>
          <div>
            <TextField
            disabled
            id="outlined-disabled"
            label="Gender"
            defaultValue={data.gender}
          />
          </div>
          </div>
          <div className="fstcolm">
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Citizenship"
            defaultValue={data.citizenship}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Birthday"
            defaultValue={data.birthday}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Age"
            defaultValue={data.age}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Birth of Place"
            defaultValue={data.birthPlace}
          />
          </div>
          </div>
          <div className="fstcolm">
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Contact Number"
            defaultValue={data.contactNum}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Email"
            defaultValue={data.email}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Permanent Address"
            defaultValue={data.paddress}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Current Address"
            defaultValue={data.caddress}
          />
          </div>
          </div>
            </div>
        </div>
          )});
  
    const applicantInfoFB = applicantsInfo?.map((data) =>{
    const score = userscore?.map((data) =>{
      return data
    })
      return (
        <>
        <div className="PA">
          <div className="Finfo">
          <h1>Mother Information</h1>
          <div className="fmbgconlisclmn">
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="First Name"
            defaultValue={data.motherName}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Last Name"
            defaultValue={data.motherlName}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Middle Name"
            defaultValue={data.mothermName}
          />
          </div>
          </div>
          <div className="fmbgconlisclmn">
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Occupation"
            defaultValue={data.mothermName}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Highest Educational Attainment"
            defaultValue={data.motherEduc}
          />
          </div>
          </div>
          <h1>Father Information</h1>
          <div className="fmbgconlisclmn">
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="First Name"
            defaultValue={data.fatherName}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Last Name"
            defaultValue={data.fatherlName}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Middle Name"
            defaultValue={data.fathermname}
          />
          </div>
          </div>
          <div className="fmbgconlisclmn">
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Occupation"
            defaultValue={data.fatherOccu}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Highest Educational Attainment"
            defaultValue={data.fatherEduc}
          />
          </div>
          </div>
          <div className="fmbgconlisclmn">
          <div className='withscore'>
          <span>Score</span>
          <input style={{width:'40px',height:'50px',textAlign:'center'}} type="number" disabled value={score[0].fntotal}/>
          <TextField
            disabled
            id="outlined-disabled"
            label="Number of Family Members"
            defaultValue={data.famNum}
          />
          </div>
          </div>
          <h1>Guardian Information</h1>
          <div className="fmbgconlisclmn">
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Full Name"
            defaultValue={data.guardianName}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Contact Name"
            defaultValue={data.guardianContact}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Relationship"
            defaultValue={data.relationship}
          />
          </div>
          </div>
          </div>
        </div>
        </>
          )})
    const applicantInfoEcB = applicantsInfo?.map((data) =>{
      const score = userscore?.map((data) =>{
        return data
      })
      return (
        <>
        <div className="PA">
          <div className="Einfo">
          <div className="fstcolm">
          <div className='withscore'>
          <span>Score</span>
            <input style={{width:'40px',height:'50px',textAlign:'center'}} type="number" disabled value={score[0].wltotal}/>
          <TextField
            disabled
            id="outlined-disabled"
            label="Where do you Live?"
            defaultValue={data.wereLive}
          />
          </div>
          <div className='withscore'>
          <span>Score</span>
            <input style={{width:'40px',height:'50px',textAlign:'center'}} type="number" disabled value={score[0].hltotal}/>
          <TextField
            disabled
            id="outlined-disabled"
            label="Living in Marilao"
            defaultValue={data.howLong}
          />
          </div>
          <div className='withscore'>
          <span>Score</span>
            <input style={{width:'40px',height:'50px',textAlign:'center'}} type="number" disabled value={score[0].ostotal}/>
          <TextField
            disabled
            id="outlined-disabled"
            label="House Ownership"
            defaultValue={data.ownerShip}
          />
          </div>
          <div className='withscore'>
          <span>Score</span>
            <input style={{width:'40px',height:'50px',textAlign:'center'}} type="number" disabled value={score[0].mitotal}/>
          <TextField
            disabled
            id="outlined-disabled"
            label="Parent/Guardian Monthly Income"
            defaultValue={data.monthIncome}
          />
          </div>
          <div className='withscore'>
          <TextField
            disabled
            id="outlined-disabled"
            label="Baranggay"
            defaultValue={data.baranggay}
          />
          </div>
          </div>
        </div>
        </div>
        </>
          )})
  
    const applicantInfoEdB = applicantsInfo?.map((data) =>{
      const score = userscore?.map((data) =>{
        return data
      })
      return (
        <>
        <div className="PA">
        <div className="fmbgconlisclmn">
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Year Level"
            defaultValue={data.currentYear}
          />
          </div>
          <div>
          <span>Score</span>
          <input style={{width:'40px',height:'50px',textAlign:'center'}} type="number" disabled value={score[0].tstotal}/>
          <TextField
            disabled
            id="outlined-disabled"
            label="Type of School"
            defaultValue={data.typeSchool}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Degree Program/Course(Priority Course)"
            defaultValue={data.course}
          />
          </div>
          </div><br />
          <div className="fmbgconlisclmn">
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="School Name"
            defaultValue={data.currentSchool}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="School Address"
            defaultValue={data.address}
          />
          </div>
          </div>
          <div className="fmbgconlisclmn">
          <div>
          <span>Score</span>
          <input style={{width:'40px',height:'50px',textAlign:'center'}} type="number" disabled value={score[0].gwatotal}/>
          <TextField
            disabled
            id="outlined-disabled"
            label="General Weighted Average"
            defaultValue={data.gwa}
          />
          </div>
          <div>
          <span>Score</span>
          <input style={{width:'40px',height:'50px',textAlign:'center'}} type="number" disabled value={score[0].fatotal}/>
          <TextField
            disabled
            id="outlined-disabled"
            label="Financial Support"
            defaultValue={data.financialSupport}
          />
          </div>
          </div>
        </div>
        </>
          )})

    const TabPanel = ({ children, value, index }) => (
            <div role="tabpanel" hidden={value !== index}>
              {value === index && <Box p={3}>{children}</Box>}
            </div>
          );

    const setFirsttoSecStat = async(data) =>{
        console.log(data)
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
        SetApplicant.SET_APPLICANT(formData)
        .then(res => {
          if(res.data.success === 1){
            console.log(res)
            setPassSlot(decre.data.results[0]);
            setData(res.data.result);
            setPassscore(decre.data.results[0].passingscore);
            setSlots(decre.data.results[0].slots);
            swal('Status Updated');
          }else{
            swal('Something Went Wrong')
          }

          }
           )
          .catch(err => console.log(err));
    }
    const ScoreSlot = () =>{
      console.log(user)
      if(user.name !== 'Admin'){
        swal({
          text: 'UnAuthorized Access',
          timer: 2000,
          buttons: false,
          icon: "error",
        })
        setPassscore(passSlot.passingscore)
        setSlots(passSlot.slots)
        return
      }
      const data1 = passscore || passSlot.passingscore;
      const data2 = slots || passSlot.slots
      const formData = new FormData();
      formData.append('passscore',data1);
      formData.append('slots',data2)
      UpdatePassSlots.UPDATE_PASSSLOTS(formData)
      .then(res => {
        if(res.data.success === 1){
          console.log(res)
          
          setPassSlot(res.data.results[0])
          swal('Updated')
        }else{
          swal('Something Went Wrong')
        }

        }
         )
        .catch(err => console.log(err));
    }
    const Addall = async () => {
      const selectedRows = rowSelectionModel.map((selectedRow) =>
        data.find((row) => row.applicantNum === selectedRow)
      );
    
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
      console.log(decre);
    
      if (decre.data.success === 1) {
        try {
          for (let i = 0; i < selectedRows.length; i++) {
            const row = selectedRows[i];
    
            if (passSlot.slots === 0) {
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
              console.log(res);
              setPassSlot(decre.data.results[0]);
              setData(res.data.result);
              setPassscore(decre.data.results[0].passingscore);
              setSlots(decre.data.results[0].slots);
              swal('Status Updated');
            } else {
              swal('Something Went Wrong');
            }
          }
        } catch (error) {
          console.log(error);
        }
      } else {
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
        for (let i=0 ;i<selectedRows.length;i++){
          const row = selectedRows[i];
          console.log(row)
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
            swal('Status Updated')
            setData(response.data.result);
            setIsSend('No')
          }else{
            swal('Something Went Wrong')
          }
        }
    }
    const Access = async() =>{
      const formData = new FormData();
      formData.append('email',email);
      formData.append('password',password);
      formData.append('applicantNum',who)
      await GrantAccess.GRANT_ACCESS(formData)
      .then(res => {
        if(res.data.success === 1){
          console.log(res)
          const ForEva = res.data.result?.filter(user => user.status === 'For Evaluation')
          console.log(ForEva)
          setData(ForEva);
          setEmail('')
          setOpenDialog(false)
          setPassword('')
          swal({
            text: res.data.message,
            timer: 2000,
            buttons: false,
            icon: 'success',
          });
        }else{
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
  return (
    <>
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
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={Access}>Submit</Button>
        </DialogActions>
      </Dialog>
    <Modal className="modalContainer"
        open={open}
        onClose={handleClose}
      >
        <Box sx={{
          margin: 'auto',
          padding: 2,
          backgroundColor: 'white',
          border: 1 ,
          color: '#005427',
          borderRadius: 5,
          height:'100%',
          overflow:'auto'
        }}>
       
           <div className="buttonclosed" >
            <button onClick={handleClose}> X </button>
            </div>
        
        <Tabs
          value={tabValue} 
          onChange={handleTabChange}   
          variant="scrollable"
          scrollButtons="auto">
        
        <Tab label="Personal Information" />
        <Tab label="Family Background" />
        <Tab label="Economic Background" />
        <Tab label="Educational Background" />
      </Tabs>
      
      <TabPanel value={tabValue} index={0}>{applicantInfoPA}</TabPanel>
      <TabPanel value={tabValue} index={1}>{applicantInfoFB}</TabPanel>
      <TabPanel value={tabValue} index={2}>{applicantInfoEcB}</TabPanel>
      <TabPanel value={tabValue} index={3}>{applicantInfoEdB}</TabPanel>

        </Box>
    </Modal>
    <div style={{width:'100%'}}>
           <div className="scholars">
        <Sidebar/>
        <div className="scholarsContainer">
            <Navbar/>
            <Card sx={{width:'97%',margin:'10px',padding:'10px',display:'flex',justifyContent:'flex-end',flexDirection:'column',alignItems:'flex-end'}} elevation={3}>
            <div className='evluationcon'>
              <div style={{width:'100%',height: 50,display:'flex',justifyContent:'space-between',padding:10}}>
                  <div style={{width:'30%',display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
                  <h1>Registered Applicants</h1>
                  </div>
                  <div style={{marginRight:5,height:'100%'}}>
                    <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',alignItems:'center'}}>
                      <div style={{width:'100%',alignItems:'center',justifyContent:'center',display:'flex',margin:10}}>
                    <TextField
                        id="outlined-number"
                        label="Passing Score"
                        type="text"
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
                        type="text"
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
                      {isButtonVisible && <Button onClick={ScoreSlot} variant='contained' size='small'>Save Changes</Button>}
                      </div>
                    </div>
                  </div>
              </div>
              <Box sx={{ height: 400, width: '100%' }}>
                <Card sx={{height:'100%'}}>
                <Breadcrumbs sx={{backgroundColor:'green'}} aria-label="breadcrumb">
                  <Button onClick={() => setActiveState('All')}>
                    <Link
                      underline="none"
                      sx={{
                        color: activeState === 'All' ? 'white' : 'black',
                      }}
                    >
                      <FormatListBulletedOutlinedIcon fontSize="inherit" />
                      All({data.length})
                    </Link>
                  </Button>
                  <Button onClick={() => setActiveState('Passed')}>
                    <Link
                      underline="none"
                      sx={{
                        color: activeState === 'Passed' ? 'white' : 'black',
                      }}
                    >
                      <CheckCircleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                      Passed({Passed.length})
                    </Link>
                  </Button>
                  <Button onClick={() => setActiveState('Failed')}>
                    <Link
                      underline="none"
                      sx={{
                        color: activeState === 'Failed' ? 'white' : 'black',
                      }}
                    >
                      <CancelIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                      Failed({Failed.length})
                    </Link>
                  </Button>
                  </Breadcrumbs>
                    {activeState === 'All' && (data && data.length > 0 ? (
                  <DataGrid
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
                    pageSizeOptions={[25]}
                    checkboxSelection
                    disableRowSelectionOnClick
                  />
                ) : (
                  <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'whitesmoke'}}>
                  <p style={{ textAlign: 'center',fontSize:30,fontWeight:700,fontStyle:'italic' }}>No records</p>
                  </div>
                ))}
                  {activeState === 'Passed' && (Passed && Passed.length > 0 ? (
                    <DataGrid
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
                      pageSizeOptions={[25]}
                      checkboxSelection
                      onRowSelectionModelChange={handleRowSelectionModelChange}
                      rowSelectionModel={rowSelectionModel}
                      disableRowSelectionOnClick
                    />
                  ) : (
                    <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'whitesmoke'}}>
                    <p style={{ textAlign: 'center',fontSize:30,fontWeight:700,fontStyle:'italic' }}>No records</p>
                    </div>
                  ))}
                  {activeState === 'Failed' && (Failed && Failed.length > 0 ? (
                    <DataGrid
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
                      pageSizeOptions={[25]}
                      checkboxSelection
                      onRowSelectionModelChange={handleFailedSelectionModelChange}
                      rowSelectionModel={failedSelectionModel}
                      disableRowSelectionOnClick
                    />
                  ) : (
                    <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'whitesmoke'}}>
                    <p style={{ textAlign: 'center',fontSize:30,fontWeight:700,fontStyle:'italic' }}>No records</p>
                    </div>
                  ))}
                </Card>
              </Box>
              
            </div>
            {activeState === 'Passed' && <div sx={{width:'90%',margin:'10px',display:'flex',justifyContent:'flex-end',flexDirection:'column',alignItems:'flex-end'}}>
              <Button onClick={Addall} sx={{margin:'10px'}} variant='contained'>ADD ALL SELECTED TO APPLICANT LIST</Button>
            </div>}
            {activeState === 'Failed' && <div sx={{width:'90%',margin:'10px',display:'flex',justifyContent:'flex-end',flexDirection:'column',alignItems:'flex-end'}}>
                  <Checkbox
                    checked={checked}
                    onChange={handleChangeCheckbox}
                    inputProps={{ 'aria-label': 'controlled' }}
                  /><span>Sent Notification</span>
                <Button onClick={FailedAll} sx={{margin:'10px'}} variant='contained'>SET FAILED THE SELECTED USERS</Button>
            </div>}
            </Card>
        </div>
    </div>
    </div>
    </>
  )
}

export default Evaluation