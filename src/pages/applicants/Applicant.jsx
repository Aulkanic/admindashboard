import "./applicant.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { Tabs, Tab, Box, Modal, Card,Button, Typography } from "@mui/material"; 
import { DataGrid} from '@mui/x-data-grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ApplicantsRequest, FetchingApplicantsInfo, ListofSub,
          CheckingSubs, CheckingApplicants,UserScore,ListofReq,FailedUser,FetchingBmccSchoinfo
        ,Documentary,GrantAccess,ListAccess } from "../../api/request";
import swal from "sweetalert";
import { styled, ThemeProvider, createTheme } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import { useContext } from "react";
import { admininfo } from "../../App";
import TextField from '@mui/material/TextField';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Link from '@mui/material/Link';
import './applicant.css'
import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AssignmentLateRoundedIcon from '@mui/icons-material/AssignmentLateRounded';

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
    color:white;
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
const StyledRadioGroup = styled(RadioGroup)`

  && {
    & .MuiFormControlLabel-root {
      margin-right: 3px;
      display: flex;
      flex-direction: column;
    }
  }
`;
const theme = createTheme();
const StyledBackdrop = styled(Backdrop)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;

const Applicant = () => {
  const { loginUser,user } = useContext(admininfo);
  const [open, setOpen] = useState(false);
  const [post , setPost] = useState([]);
  const [reqlist,setReqlist] = useState([]);
  const [userscore,setUserScore] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState({});
  const [applicantsInfo, setApplicantInfo] = useState([]);
  const [applicantsDocs, setApplicantDocs] = useState([]);
  const [Comments,setComments] = useState('');
  const [status,setStatusCheck] = useState('');
  const [dialog, setDialog] = useState(false);
  const [reason,setReason] = useState('');
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [docslisted,setDocsListed] = useState([]);
  const [documentaryListed,setDocumentaryListed] = useState([]);
  const [activeState,setActiveState] = useState('All');
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [failedSelectionModel,setFailedSelectionModel] = useState([]);
  const [who,setWho] = useState('');
  const [isSend,setIsSend] = useState('No');
  const [isSend1,setIsSend1] = useState('No');
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('')
  const [access,setAccess] = useState([])
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const handleCloseDialog1 = () => setOpenDialog1(false);
  const handleCloseDialog2 = () => setOpenDialog2(false);
  const handleOpenDialog1 = (data) => {
    setOpenDialog1(true);
    setWho(data.applicantNum)
  }
  const handleOpenDialog2 = (data) => {
    setOpenDialog2(true);
  }
  

  const openImageModal = (image) => {
    setSelectedImage(image);
    setImageModalOpen(true);
  };
  
  const closeImageModal = () => {
    setSelectedImage('');
    setImageModalOpen(false);
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
  const handleChangeCheckbox1 = (event) => {
    const check = event.target.checked
    if(check){
      setChecked1(check);
      setIsSend1('Yes')
    }else{
      setChecked1(check);
      setIsSend1('No')
    }
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };

  const handleRowSelectionModelChange = (newRowSelectionModel) => {
    console.log(newRowSelectionModel)
    setRowSelectionModel(newRowSelectionModel);

  };
  const handleFailedSelectionModelChange = (newFailedSelectionModel) => {
    console.log(newFailedSelectionModel)
    setFailedSelectionModel(newFailedSelectionModel);

  };


  const CustomDataGrid = styled(DataGrid)({
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: 'green', 
      color: 'white', 
    },
  });


  useEffect(() => {

    async function Fetch(){
      setShowBackdrop(true);
      const response = await ApplicantsRequest.ALL_APPLICANTS()
      const docreq = await ListofReq.FETCH_REQUIREMENTS();
      const subdoc = await Documentary.FETCH_DOCUMENTARY()
      let acc = await ListAccess.ACCESS()
      const empacc = acc.data.result?.filter(data => data.employeeName === user.name)
      setAccess(empacc)
      setDocumentaryListed(subdoc.data.Documentary)
      setPost(response.data.results);
      const sub = docreq.data.Requirements.results2
      const list = docreq.data.Requirements.results1
      setDocsListed(list)
      const totalsubdiv = `${sub.length}/${list.length}`
      setReqlist(totalsubdiv)
      setShowBackdrop(false);
    }
    Fetch();
  }, []);

// fucntions
  const view = async (data) => {
    setShowBackdrop(true);
    const applicantNum = data.applicantNum;
    const formData = new FormData();
    formData.append('applicantNum',applicantNum)
    try {
      const response = await Promise.all([
        FetchingApplicantsInfo.FETCH_INFO(applicantNum),
        ListofSub.FETCH_SUB(applicantNum),
        UserScore.USER_SCORE(applicantNum)
      ]);
      setApplicantInfo(response[0].data.results);
      setApplicantDocs(response[1].data.Document);
      setUserScore(response[2].data.result)
      setSelectedInfo(data)
      setShowBackdrop(false);
      handleOpen()
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }
const check = async (data, index) => { 
  const isValueIncluded = access[0]?.sectionId.includes('Documents Checking');
  if(!isValueIncluded){
    swal({
      text: 'UnAuthorized Access',
      timer: 2000,
      buttons: false,
      icon: "error",
    })
    return
  }
  const requirement_Name = data.requirement_Name;
  const applicantNum = applicantsInfo[0].applicantCode;
  const adminName = user.name;
  const formData = new FormData();
  formData.append('Comments', Comments[requirement_Name]);
  formData.append('requirement_Name', requirement_Name);
  formData.append('applicantCode', applicantNum);
  formData.append('status', status[requirement_Name]);
  formData.append('applicantNum', data.applicantId);
  formData.append('adminName', adminName);

  try {
    setShowBackdrop(true);
    const res = await CheckingSubs.CHECK_SUB(formData);
    if(res.data.success === 1){
      setDocumentaryListed(res.data.Documentary)
      setShowBackdrop(false);
      swal({
        text: 'Checked',
        timer: 2000,
        buttons: false,
        icon: "success",
      })
    }else{
      setShowBackdrop(false);
      swal({
        text: 'Failed To Check',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
    }

  } catch (err) {
    console.log(err);
  }
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '95%',
  bgcolor: 'whitesmoke',
  border: '2px solid #000',
  overflow: 'auto',
  padding:'10px',
  borderRadius:'10px'
};
  const ApplicantCheck = async (data) =>{
    const isValueIncluded = access[0]?.sectionId.includes('Applicants');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    const applicantNum = data.applicantNum;
    const applicantCode = data.applicantCode;
    const status = 'Qualified';
    const adminName = user.name;
    const email = data.email
    setShowBackdrop(true);
    CheckingApplicants.CHECK_APP({email,adminName,applicantNum,status,applicantCode})
    .then(res => {

      setPost(res.data.Applicants)
      setOpen(false)
      setShowBackdrop(false);
      swal('Added Successfully')
    }
     )
    .catch(err => console.log(err));
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const failed = async(data) =>{
    const isValueIncluded = access[0]?.sectionId.includes('Applicants');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    const res = await FetchingBmccSchoinfo.FETCH_SCHOLARSINFO(data.applicantNum);
    const schoapplied = res.data.ScholarInf.results1[0].SchoIarshipApplied;
    const batch = res.data.ScholarInf.results1[0].Batch;
    const formData = new FormData();
    formData.append('applicantNum',data.applicantNum)
    formData.append('Name',data.Name)
    formData.append('ScholarshipApplied', schoapplied)
    formData.append('batch',batch)
    formData.append('Reason',reason)
    formData.append('isSend',isSend1)
    formData.append('email',res.data.ScholarInf.results1[0].email)
    setShowBackdrop(true);
    const response = await FailedUser.FAILED_USER(formData)
    if(response.data.success === 1){
      setShowBackdrop(false);
      swal('Status Updated')
      setIsSend1('No')
    }else{
      setShowBackdrop(false);
      swal('Something Went Wrong')
    }
  }
  const Access = async() =>{
    const formData = new FormData();
    formData.append('email',email);
    formData.append('password',password);
    formData.append('applicantNum',who)
    setShowBackdrop(true);
    await GrantAccess.GRANT_ACCESS(formData)
    .then(res => {
      if(res.data.success === 1){
        setPost(res.data.result);
        setEmail('')
        setOpenDialog1(false)
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
  const Addall = async () => {
    const isValueIncluded = access[0]?.sectionId.includes('Applicants');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    const selectedRows = rowSelectionModel.map((selectedRow) =>
      filteredRows.find((row) => row.applicantNum === selectedRow)
    );
    setShowBackdrop(true);
      try {
        for (let i = 0; i < selectedRows.length; i++) {
          const row = selectedRows[i];
          const applicantNum = row.applicantNum;
          const applicantCode = row.applicantCode;
          const status = 'Qualified';
          const adminName = user.name;
          const email = row.email
          CheckingApplicants.CHECK_APP({email,adminName,applicantNum,status,applicantCode})
          .then(res => {
            console.log(res)
            setPost(res.data.Applicants)
          }
           )
          .catch(err => console.log(err));
        }
      } catch (error) {
        console.log(error);
      }
      setOpen(false)
      setShowBackdrop(false);
      swal('Added Successfully')
  };
  const FailedAll = async() =>{
    const isValueIncluded = access[0]?.sectionId.includes('Applicants');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    const selectedRows = failedSelectionModel.map((selectedRow) =>
      filteredRows.find((row) => row.applicantNum === selectedRow));
      setShowBackdrop(true);
      for (let i=0 ;i<selectedRows.length;i++){
        const row = selectedRows[i];
        const res = await FetchingBmccSchoinfo.FETCH_SCHOLARSINFO(row.applicantNum);
        const schoapplied = res.data.ScholarInf.results1[0].SchoIarshipApplied;
        const batch = res.data.ScholarInf.results1[0].Batch;
        const formData = new FormData();
        formData.append('applicantNum',row.applicantNum)
        formData.append('Name',row.Name)
        formData.append('ScholarshipApplied', schoapplied)
        formData.append('batch',batch)
        formData.append('Reason',reason)
        formData.append('isSend',isSend)
        formData.append('email',res.data.ScholarInf.results1[0].email)
        const response = await FailedUser.FAILED_USER(formData)
        if(response.data.success === 1){
          
          setIsSend('No')
        }else{
          setShowBackdrop(false);
          swal('Something Went Wrong')
        }
      }
      setShowBackdrop(false);
      swal('Status Updated')
  }
  const columns = [
    { field: 'applicantNum', headerName: 'Applicant ID', width: 100 },
    {
      field: 'SchoIarshipApplied',
      headerName: 'Scholarship Applied',
      width: 200,
      editable: true,
    },
    {
      field: 'Name',
      headerName: 'Name',
      width: 200,
      editable: true,
    },
    {
      field: 'yearLevel',
      headerName: 'Year Level',
      width: 150,
      editable: false,
    },
    {
      field: 'stat',
      headerName: 'Submitted',
      width: 100,
      editable: false,
      renderCell: (params) => {
        const ForEva = docslisted.filter(user => user.schoName === params.row.SchoIarshipApplied && user.batch === params.row.Batch && user.docsfor === 'Application');
        const Subuser = documentaryListed.filter(user => user.applicantId === params.row.applicantNum && user.docsFor === 'Application');
        const approve = Subuser.filter(user => user.Status === 'Approved');
        const pval = `${Subuser.length}/${ForEva.length}`

        return(
        <>
        <p>{pval}</p>
        </>
      )},
    },
    {
      field: 'stat1',
      headerName: 'Approved',
      width: 100,
      editable: false,
      renderCell: (params) => {
        const ForEva = docslisted.filter(user => user.schoName === params.row.SchoIarshipApplied && user.batch === params.row.Batch && user.docsfor === 'Application');
        const Subuser = documentaryListed.filter(user => user.applicantId === params.row.applicantNum && user.docsFor === 'Application');
        const approve = Subuser.filter(user => user.Status === 'Approved');
        const pval = `${approve.length}/${ForEva.length}`
        return(
        <>
        <p>{pval}</p>
        </>
      )},
    },
    {
      field: 'Batch',
      headerName: 'Batch',
      width: 100,
      editable: false,
    },
    {
      field: 'insert',
      headerName: 'Details',
      width: 100,
      renderCell: (params) => (
        <>
        <ViewButton className='myButton' onClick={() => view(params.row)}>View</ViewButton>
        </>
      ),
    },
    {
      field: 'insert1',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => {
        const ForEva = docslisted.filter(user => user.schoName === params.row.SchoIarshipApplied && user.batch === params.row.Batch && user.docsfor === 'Application');
        const Subuser = documentaryListed.filter(user => user.applicantId === params.row.applicantNum && user.docsFor === 'Application');
        const approve = Subuser.filter(user => user.Status === 'Approved');
        let isApproved = false;
        if(approve.length === ForEva.length){
          isApproved = true;
        }
        return(
        <>
        <div style={{display:'flex'}}>
      {isApproved && <StyledButtonEdit className='myButton1' onClick={() => ApplicantCheck(params.row)}>Set Qualified</StyledButtonEdit>}
      {!isApproved && (<>
                {params.row.grantedAccess === '' || !params.row.grantedAccess ? (<StyledButtonAccess sx={{color:'white'}} className='myButton'
              onClick={() =>handleOpenDialog1(params.row)}>
                Access</StyledButtonAccess>) : (<StyledButtonEdit sx={{color:'white'}} className='myButton1'
              onClick={() => ApplicantCheck(params.row)}>
                SET QUALIFIED
                </StyledButtonEdit>)}
                <StyledButton className='myButton2'
              onClick={() => setDialog(true)}>
                Failed
                </StyledButton>
                </>)}
      </div>
        </>
      )},
    },
  ];
  const completeColumn = [
    { 
      field: 'applicantNum', 
      headerName: 'Registry ID',
      width: 100
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
      headerName: 'Submitted',
      width: 100,
      editable: false,
      renderCell: (params) => {
        const ForEva = docslisted.filter(user => user.schoName === params.row.SchoIarshipApplied && user.batch === params.row.Batch && user.docsfor === 'Application');
        const Subuser = documentaryListed.filter(user => user.applicantId === params.row.applicantNum && user.docsFor === 'Application');
        const approve = Subuser.filter(user => user.Status === 'Approved');
        const pval = `${Subuser.length}/${ForEva.length}`
        return(
        <>
        <p>{pval}</p>
        </>
      )},
    },
    {
      field: 'stat1',
      headerName: 'Approved',
      width: 100,
      editable: false,
      renderCell: (params) => {
        const ForEva = docslisted.filter(user => user.schoName === params.row.SchoIarshipApplied && user.batch === params.row.Batch && user.docsfor === 'Application');
        const Subuser = documentaryListed.filter(user => user.applicantId === params.row.applicantNum && user.docsFor === 'Application');
        const approve = Subuser.filter(user => user.Status === 'Approved');
        const pval = `${approve.length}/${ForEva.length}`
        return(
        <>
        <p>{pval}</p>
        </>
      )},
    },
    {
        field: 'insert',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
            <>
            <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
            <ViewButton className='myButton'
            onClick={() => view(params.row)}>View Details</ViewButton>
            </div>
          </>
        ),
      },
      {
        field: 'score',
        headerName: 'Details',
        width: 150,
        renderCell: (params) => {
          return(
            <>
            <div style={{width:"100%",display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
          <StyledButtonEdit sx={{width:'100%'}} className='myButton1'
          onClick={() => ApplicantCheck(params.row)}>
            SET QUALIFIED
            </StyledButtonEdit>
          </div>
          </>)
        },
      },

  ];
  const incompleteColumn = [
    { 
      field: 'applicantNum', 
      headerName: 'Registry ID',
      width: 100
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
      headerName: 'Submitted',
      width: 100,
      editable: false,
      renderCell: (params) => {
        const ForEva = docslisted.filter(user => user.schoName === params.row.SchoIarshipApplied && user.batch === params.row.Batch && user.docsfor === 'Application');
        const Subuser = documentaryListed.filter(user => user.applicantId === params.row.applicantNum && user.docsFor === 'Application');
        const approve = Subuser.filter(user => user.Status === 'Approved');
        const pval = `${Subuser.length}/${ForEva.length}`
        return(
        <>
        <p>{pval}</p>
        </>
      )},
    },
    {
      field: 'stat1',
      headerName: 'Approved',
      width: 100,
      editable: false,
      renderCell: (params) => {
        const ForEva = docslisted.filter(user => user.schoName === params.row.SchoIarshipApplied && user.batch === params.row.Batch && user.docsfor === 'Application');
        const Subuser = documentaryListed.filter(user => user.applicantId === params.row.applicantNum && user.docsFor === 'Application');
        const approve = Subuser.filter(user => user.Status === 'Approved');
        const pval = `${approve.length}/${ForEva.length}`
        return(
        <>
        <p>{pval}</p>
        </>
      )},
    },
    {
        field: 'insert',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
            <>
            <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
            <ViewButton className='myButton'
            onClick={() => view(params.row)}>View Details</ViewButton>
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
            <div style={{display:'flex'}}>
          {params.row.grantedAccess === '' || !params.row.grantedAccess ? (<StyledButtonAccess className='myButton'
          onClick={() =>handleOpenDialog1(params.row)}>
            Access</StyledButtonAccess>) : (<StyledButtonEdit className='myButton1' 
          onClick={() => ApplicantCheck(params.row)}>
            SET QUALIFIED
            </StyledButtonEdit>)}
            <StyledButton className='myButton2'
          onClick={() => handleOpenDialog2(params.row)}>
            Failed
            </StyledButton>
          </div>
          </>)
        },
      },

  ];

 const docusubmitted = applicantsDocs?.map((data, index) => {
  const { requirement_Name, File,Status } = data;
  const handleStatusChange = (e) => {
    const { value } = e.target;
    setStatusCheck((prevStatus) => ({
      ...prevStatus,
      [requirement_Name]: value || prevStatus[requirement_Name] || 'Unchecked',
    }));
  };

  const handleCommentsChange = (e) => {
    const { value } = e.target;
    setComments((prevComments) => ({
      ...prevComments,
      [requirement_Name]: value || prevComments[requirement_Name] || 'No comments'
    }));
  };
  return (
    <>
        <div className="Docuinfo">
            <Card elevation={5}>
              <div className="sublist"  key={index}>
                <div className="actions">
                  <div >
                    
                    <FormControl style={{fontSize:15}}>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Status:{Status}
                      </FormLabel>
                      <RadioGroup
                        size='small'
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={
                          status[Status] === 'Approved'
                            ? 'Approved'
                            : status[Status] === 'Reject'
                            ? 'Reject'
                            : status[Status] === 'For Further Evaluation'
                            ? 'For Further Evaluation'
                            : 'Unchecked'
                        }
                        onChange={handleStatusChange}
                      >
                        <FormControlLabel
                          value="Approved"
                          control={<Radio checked={status[requirement_Name] === 'Approved'}/>}
                          label="Approved"
                        />
                        <FormControlLabel
                          value="Reject"
                          control={<Radio checked={status[requirement_Name] === 'Reject'} />}
                          label="Reject"
                        />
                        <FormControlLabel
                          value="For Further Evaluation"
                          control={<Radio checked={status[requirement_Name] === 'For Further Evaluation'} />}
                          label="For Further Evaluation"
                        />
                      </RadioGroup>
                    </FormControl>
                    <br />
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Comments
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={Comments[requirement_Name] || 'No comments'}
                        onChange={handleCommentsChange}
                      >
                        <FormControlLabel
                          value="Blurred Images"
                          control={<Radio checked={Comments[requirement_Name] === 'Blurred Images'} />}
                          label="Blurred Images"
                        />
                        <FormControlLabel
                          value="Invalid File Image"
                          control={<Radio checked={Comments[requirement_Name] === 'Invalid File Image'} />}
                          label="Invalid File Image"
                        />
                        <FormControlLabel
                          value="No Comments"
                          control={<Radio checked={Comments[requirement_Name] === 'No Comments'} />}
                          label="No Comments"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div>
                    <StyledButtonEdit onClick={() => check(data, index)}><CheckCircleOutlineRoundedIcon/> Check </StyledButtonEdit>
                  </div>
                </div>
                <div className="subdocsprev">
                  <button onClick={() => openImageModal(File)}>
                  <img
                    style={{ width: '200px', height: '300px' }}
                    src={File}
                    alt=""
                  />
                  <span className="requirement-name">{requirement_Name}</span>
                  </button>
                </div>
              </div>
            </Card>
        </div>
    </>
  );
});

      const filteredRows = post?.filter((row) => row.status === 'Applicants' || row.status ==='Applicant');
      const getDocumentsByApplicant = (applicantId) => {
        return documentaryListed.filter(doc => doc.applicantId === applicantId);
      };
      const getRequiredDocuments = (scholarshipName) => {
        return docslisted.filter(req => req.schoName === scholarshipName.SchoIarshipApplied && req.batch === scholarshipName.Batch && req.docsfor === 'Application');
      };
    
      const isRequirementCompleted = (applicantId, requirementName) => {
        const applicantDocuments = getDocumentsByApplicant(applicantId);
        return applicantDocuments.some(doc => doc.requirement_Name === requirementName && doc.Status === 'Approved');
      };
    
      const groupedUsers = filteredRows.reduce((groups, user) => {
        const requiredDocuments = getRequiredDocuments(user);
        console.log(requiredDocuments)
        const completed = requiredDocuments.every(req =>
          isRequirementCompleted(user.applicantNum, req.requirementName)
        );
    
        if (completed) {
          groups.completed.push(user);
        } else {
          groups.incomplete.push(user);
        }
    
        return groups;
      }, { completed: [], incomplete: [] });

  return (
    <>
    <StyledBackdrop open={showBackdrop}>
      <CircularProgress color="inherit" />
    </StyledBackdrop>
  {/* Dialog for Image Expandin */}
    <Dialog open={imageModalOpen} onClose={closeImageModal} fullScreen>
  <DialogTitle>Full Image</DialogTitle>
  <DialogContent>
    <img src={selectedImage} alt="Full Image" style={{ width: '100%', height: '100%' }} />
  </DialogContent>
  <DialogActions>
    <Button className='myButton' sx={{color:'white'}} onClick={closeImageModal}>Close</Button>
  </DialogActions>
    </Dialog>
  {/* End of Dialog for Image Expandin */}
  {/* Modal For Viewing */}
    <Modal className="modalContainer"
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <div className="docusersub">
          <div style={{width:'100%'}}>
              <StyledButton className='myButton2' onClick={handleClose}> X </StyledButton>
          </div> 
          <Typography sx={{fontSize:'25px'}}>Check the Submitted Requirements/Documents if it valid and viewable</Typography>
            {docusubmitted.length > 0 ? (<div className="clas"> 
          {docusubmitted}
          </div>) : (<div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%',flexDirection:'column'}}>
             <AssignmentLateRoundedIcon style={{fontSize:100}}/><br />
            <p style={{fontSize:30,fontStyle:'italic'}}>No Submitted Requirement/Documents</p></div>)}
          </div>
        </Box>
    </Modal>
  {/* End of Modal For Viewing */}
  {/* Dialog for Failed User */}
    <Dialog open={dialog} onClose={handleCloseDialog}>
      <div style={{display:'flex',alignItems:'center'}}>
        <div>
        <DialogTitle>Failed</DialogTitle>
        </div>
      </div>
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
        <div style={{display:'flex',alignItems:'center',marginLeft:'10px'}}>
        <Checkbox
                    checked={checked1}
                    onChange={handleChangeCheckbox1}
                    inputProps={{ 'aria-label': 'controlled' }}
                  /><span>Sent Notification</span>
        </div>
        <DialogActions>
          <Button className='myButton' onClick={handleCloseDialog}>Cancel</Button>
          <Button className='myButton1' onClick={failed}>Submit</Button>
        </DialogActions>
    </Dialog>
  {/* End of Dialog for Failed User */}
  {/* Dialog for All Failed User */}
  <Dialog open={openDialog2} onClose={handleCloseDialog2}>
      <div style={{display:'flex',alignItems:'center'}}>
        <div>
        <DialogTitle>Failed</DialogTitle>
        </div>
      </div>
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
        <div style={{display:'flex',alignItems:'center',marginLeft:'10px'}}>
        <Checkbox
                    checked={checked}
                    onChange={handleChangeCheckbox}
                    inputProps={{ 'aria-label': 'controlled' }}
                  /><span>Sent Notification</span>
        </div>
        <DialogActions>
          <Button className='myButton' onClick={handleCloseDialog}>Cancel</Button>
          <Button className='myButton1' onClick={failed}>Submit</Button>
        </DialogActions>
    </Dialog>
  {/* End of Dialog for All Failed User */}
  {/* Dialog for Access */}
    <Dialog open={openDialog1} onClose={handleCloseDialog1}>
        <DialogTitle>Login to Grant Access</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will use for the special case scenario if the Admin, Employee or Mayor wants an applicants with an incomplete Documents to be proceed to the next step
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
          <Button className='myButton' onClick={handleCloseDialog1}>Cancel</Button>
          <Button className='myButton1' onClick={Access}>Submit</Button>
        </DialogActions>
    </Dialog>
  {/* End of Dialog for Access */}
    <div style={{width:'100%'}}>
    <div className="applicant">
      <Sidebar/>
          <div className="applicantContainer">
      <Navbar/>

      <div className="top">
        <div style={{width:'98.5%',padding:10}}>
      <Card>
      <h1> Applicants </h1>
      <Breadcrumbs sx={{backgroundColor:'green'}} aria-label="breadcrumb">
                  <Button onClick={() => setActiveState('All')}>
                    <Link
                      underline="none"
                      sx={{
                        color: activeState === 'All' ? 'white' : 'black',
                      }}
                    >
                      <FormatListBulletedOutlinedIcon fontSize="inherit" />
                      All({filteredRows.length})
                    </Link>
                  </Button>
                  <Button onClick={() => setActiveState('Complete')}>
                    <Link
                      underline="none"
                      sx={{
                        color: activeState === 'Complete' ? 'white' : 'black',
                      }}
                    >
                      <CheckCircleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                      Complete and Approved Documents({groupedUsers.completed.length})
                    </Link>
                  </Button>
                  <Button onClick={() => setActiveState('Incomplete')}>
                    <Link
                      underline="none"
                      sx={{
                        color: activeState === 'Incomplete' ? 'white' : 'black',
                      }}
                    >
                      <CancelIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                      Incomplete Approved Documents({groupedUsers.incomplete.length})
                    </Link>
                  </Button>
      </Breadcrumbs>      
      <Box sx={{ height: 400, width: '100%'}}>
                {activeState === 'All' && (filteredRows && filteredRows.length > 0 ? (
                  <DataGrid
                    rows={filteredRows}
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
                  {activeState === 'Complete' && (groupedUsers.completed && groupedUsers.completed.length > 0 ? (
                    <DataGrid
                      rows={groupedUsers.completed}
                      columns={completeColumn}
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
                  {activeState === 'Incomplete' && (groupedUsers.incomplete && groupedUsers.incomplete.length > 0 ? (
                    <DataGrid
                      rows={groupedUsers.incomplete}
                      columns={incompleteColumn}
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
    </Box>
    </Card>
      </div>
      <div style={{width:'97%',margin:'10px',display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}}>
      {activeState === 'Complete' && 
      <div>
              <Button className="myButton" onClick={Addall} sx={{margin:'10px'}} variant='contained'>ADD ALL SELECTED TO QUALIFIED LIST</Button>
      </div>}
      {activeState === 'Incomplete' && <div sx={{width:'90%',margin:'10px',display:'flex',justifyContent:'flex-end',flexDirection:'column',alignItems:'flex-end'}}>
                  <Checkbox
                    checked={checked}
                    onChange={handleChangeCheckbox}
                    inputProps={{ 'aria-label': 'controlled' }}
                  /><span>Sent Notification</span>
                <Button className="myButton2" onClick={FailedAll} sx={{margin:'10px'}} variant='contained'>SET FAILED ALL SELECTED USERS</Button>
            </div>}
      </div>
    </div>
    </div>
    </div>
  </div>
    </>
  )
  
}

export default Applicant