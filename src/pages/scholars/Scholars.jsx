import './scholars.scss';
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { Tabs, Tab, Box, Modal, Card } from "@mui/material"; 
import { Container, Row, Col, Form } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DataGrid} from '@mui/x-data-grid';
import React, {useEffect, useState} from 'react'
import { FetchingBmccScho, FetchingBmccSchoinfo,ScholarStand ,ListofReq,UserActivity,ListAccess} from '../../api/request';
import './scholar.css'
import Divider from '@mui/material/Divider';
import swal from 'sweetalert';
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
import { useContext } from "react";
import { admininfo } from "../../App";

const theme = createTheme();
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
  const { loginUser,user } = useContext(admininfo);
  const [access,setAccess] = useState([])
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
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

  useEffect(() => {
    async function Fetch(){
      setShowBackdrop(true);
      const scholars = await FetchingBmccScho.FETCH_SCHOLARS()
      const req = await ListofReq.FETCH_REQUIREMENTS()
      let acc = await ListAccess.ACCESS()
      const empacc = acc.data.result?.filter(data => data.employeeName === user.name)
      setAccess(empacc)
      const data = scholars.data.Scholars.filter(data => data.status === 'Active' || data.status === 'Hold')
      setData(data)
      setComplete(req.data.Requirements)
      setShowBackdrop(false);
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

  const openImageModal = (image,name) => {
    setSelectedImage({image,name});
    setImageModalOpen(true);
  };
  
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
    console.log(response)
    setUserlog(userAct.reverse());
    setSchoInf1(response.data.ScholarInf.results1[0]);
    setSchoInf2(response.data.ScholarInf.results2[0]);
    setShowBackdrop(false);
    setOpen(true);
  };
  
  const columns = [
     {
       field: 'scholarCode', 
        headerName: 'Scholar Code',
      width: 150
      },
    {
      field: 'scholarshipApplied',
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
      field: 'Baranggay',
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
      field: 'Batch',
      headerName: 'Batch',
      width: 80,
      editable: false,
    },
    {
      field: 'insert',
      headerName: 'Details',
      width: 90,
      renderCell: (params) => (
        <ViewButton className="myButton" onClick={() => view(params.row)}>View</ViewButton>
      ),
    },
    // {
    //   field: 'k',
    //   headerName: 'Actions',
    //   width: 170,
    //   renderCell: (params) =>{ 
    //     const currentDate = new Date();
    //     const renewal = isComplete.results1.filter(docs => docs.schoName === params.row.scholarshipApplied && docs.batch === params.row.Batch)
    //     const renewal1 = renewal.filter(docs => docs.docsfor === 'Renewal')
    //     const renewalSubmitted = isComplete.results2.filter(docs => 
    //     docs.applicantId === parseFloat(params.row.applicantNum) && docs.docsFor === 'Renewal');
    //     const isdeadline = renewal1.filter(item =>
    //       new Date(item.deadline) > currentDate
    //       );
    //     const Status = renewalSubmitted.length === renewal1.length
    //     params.row.k = {
    //       Status: Status,
    //     };
    //     return (
    //       <>
    //       {Status && isdeadline.length === 0 && <><p>Updated</p></>}
    //       {!Status && isdeadline.length > 0 &&
    //       (<>
    //       <StyledButton className="myButton2" onClick={() =>RemoveGrant(params.row)}> REMOVE GRANT </StyledButton>
    //       </>)}
    //       </>
    //     )   
    //   }
    // },

  ];
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setOpen1(false);

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
      const sections = access[0].sectionId.split(', '); 
      const isValueIncluded = sections.includes('Scholars');
      if(!isValueIncluded){
        swal({
          text: 'UnAuthorized Access',
          timer: 2000,
          buttons: false,
          icon: "error",
        })
        return
      }
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
      const sections = access[0].sectionId.split(', '); 
      const isValueIncluded = sections.includes('Scholars');
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
          const data = res.data.result?.filter(data => data.status === 'Active' || data.status === 'Hold')
          setData(data)
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

    }
    const NotifyAll = () =>{
      const sections = access[0].sectionId.split(', '); 
      const isValueIncluded = sections.includes('Scholars');
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
      <Card>
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
        onRowSelectionModelChange={handleRowSelectionModelChange}
        rowSelectionModel={rowSelectionModel}
        disableRowSelectionOnClick
        isRowSelectable={(params) => !params.row.k || !params.row.k.Status}
      /></Card>
              </Box>
            {/* <div style={{width:'100%',display:'flex',justifyContent:'space-around',margin:'15px'}}>
          <StyledButtonEdit className="myButton1" onClick={NotifyAll}>Notify All Selected Scholars</StyledButtonEdit>
          <StyledButton className="myButton2" onClick={RemoveGrantAll}>Revoke Grant To All Selected Scholars</StyledButton>
          </div> */}
            </div>
        </div>
    </div>
    </>
  )
}

export default Scholars