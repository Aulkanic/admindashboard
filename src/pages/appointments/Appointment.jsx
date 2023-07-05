import "./appointment.scss";
import * as React from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";    
import { Tabs, Tab,Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper, Box, Button, Typography, Modal,Card} from "@mui/material"; 
import { FetchingQualified, CreateAppointment,FetchingAppointList
  , Reaapointed, SetApproved,FetchingApplicantsInfo,SetApplicant,Addusertolistapp,UpdateScheduleApp,FetchingBmccSchoinfo,FailedUser,
    CancelApp,CancelBatch,FetchingApplist,FetchingBatchlist,FetchingUserAppdetails } from "../../api/request";
import FormControlLabel from '@mui/material/FormControlLabel';
import dayjs from 'dayjs';
import CardContent from '@mui/material/CardContent';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import swal from "sweetalert";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { styled } from '@mui/material/styles';
import { admininfo } from "../../App";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Calendar, momentLocalizer } from "react-big-calendar";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TextField from '@mui/material/TextField';
import MuiAlert from '@mui/material/Alert';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import './appointment.css'
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
const localizer = momentLocalizer(moment);

const columns = [
  { field: 'applicantNum', headerName: 'ID', width: 90 },
  {
    field: 'Name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
    editable: true,
  },
  {
    field: 'contactNum',
    headerName: 'Contact Number',
    width: 150,
    editable: true,
  },
  {
    field: 'yearLevel',
    headerName: 'Year Level',
    width: 150,
    editable: true,
  },
  {
    field: 'DateApplied',
    headerName: 'Date Applied',
    width: 150,
    editable: true,
  },

];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height:'90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
};
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


const Appointment = () => {
  const { loginUser,user } = useContext(admininfo);
  const [Qualified, setQualified] = useState([]);
  const [appointedList, setAppointedList] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [Agenda, setAgenda] = useState('');
  const [Location, setLocation] = useState('');
  const [startTime, setStartTime] = useState(dayjs(null));
  const [endTime, setEndTime] = useState(dayjs(null));
  const [appDetails,setAppDetails] = useState({})
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);
  const [reminder,setReminders] = useState('');
  const [reason,setReason] = useState('');
  const [failinf,setFailInf] = useState([]);
  const [value, setValue] = React.useState(0);
  const [value1, setValue1] = React.useState(0);
  const [step,setStep] = useState(0)
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const currentDate = dayjs();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [adduserAppoint,setAdduserApp] = useState('');
  const [Useropen, setUserOpen] = React.useState(false);
  const [userFulldet,setUserFulldet] = useState([]);

  const handleClickOpenUserDetails = () => {
    setUserOpen(true);
  };

  const handleCloseUserDetails = () => {
    setUserOpen(false);
  };
  const handleOpen = (day,timeBatch,date) => 
  {
    console.log(day)
    console.log(date[0])
    const location = date[0].Location;
    const reason = date[0].Reason;
    const reminders = date[0].reminders;
    const timeEnd = date[0].timeEnd;
    const timeStart = date[0].timeStart;
    const appAdd = {location,reason,reminders,timeEnd,timeStart,day};
    setAdduserApp(appAdd)
  setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };

  const handleClickOpenDialog = (data) => {
    console.log(data)
    setDialog(true);
    setFailInf(data)
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };


  const handleRowSelectionModelChange = (newRowSelectionModel) => {
    console.log(newRowSelectionModel)
    setRowSelectionModel(newRowSelectionModel);

  };

  useEffect(() => {
    async function Fetch(){
      const response = await FetchingQualified.FETCH_QUALIFIED();
      const listing  = await FetchingAppointList.FETCH_LISTAPPOINT();
      console.log(response)
      const list = response.data.List.filter(user => user.isAppointed === 'No');
      setQualified(list);
      setAppointedList(listing.data.AppointmentList)
    }
    Fetch();

  }, []);

  const handleNext = (e) =>{
    e.preventDefault();
    let errors = {}

    if(!startTime || startTime === null){
      errors.start = 'This Field is Required'
    }
    if(!endTime || endTime === null){
      errors.start = 'This Field is Required'
    }
    
    const currentDate = moment();
    const officeHourStart = moment('08:00 AM', 'hh:mm A');
    const officeHourEnd = moment('05:00 PM', 'hh:mm A');
    const date = new Date(appointmentDate).toDateString();
    const targetDate = moment(date);
    const value = { $d: new Date(startTime) };
    const start = value.$d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const value1 = { $d: new Date(endTime) };
    const end = value1.$d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    const startcheck = moment(start, 'hh:mm A'); 
    const endcheck = moment(end, 'hh:mm A');

    console.log(start,end)
    if(Agenda === ''){
      errors.agenda = 'This Field is Required'
    }
    if(Location === ''){
      errors.location = 'This Field is Required'
    }
    if (endcheck.isBefore(startcheck)) {
      errors.end = 'End time cannot be before the start time!'
    } else if (!endcheck.isBetween(officeHourStart, officeHourEnd, undefined, "(]")) {
      errors.end = 'Please select a time within office hours!(9AM-5PM)';
    }
   if (!startcheck.isBetween(officeHourStart, officeHourEnd, undefined, "(]")) {
      errors.start = 'Please select a time within office hours!(9AM-5PM)';
    }
    console.log(errors)
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log(errors)
      return;
    }
    setAppDetails({start,end,date})
    setStep(1)
    setErrors('')
  }

  const handleSave = (e) => {
    e.preventDefault()
    const selectedRows = rowSelectionModel.map((selectedRow) =>
    Qualified.find((row) => row.applicantNum === selectedRow)
  );
  selectedRows.forEach((data,index) =>{
      console.log(data)
      const applicantCode = data.applicantCode
      const applicantNum = data.applicantNum
      const Name = data.Name;
      const Email = data.email;
      const yearLevel = data.yearLevel;
      const Status = data.status;
      const start = appDetails.start;
      const end = appDetails.end;
      const date = appDetails.date
      const adminName = user.name;
      const formData = new FormData();
      formData.append('applicantCode',applicantCode);
      formData.append('adminName',adminName)
      formData.append('applicantNum',applicantNum)
      formData.append('Name',Name);
      formData.append('Email',Email)
      formData.append('Status',Status)
      formData.append('Location',Location)
      formData.append('Agenda',Agenda)
      formData.append('appointmentDate',date);
      formData.append('startTime',start)
      formData.append('endTime',end);
      formData.append('reminders',reminder);
      formData.append('yearLevel',yearLevel);

      CreateAppointment.CREATE_APPOINT(formData)
      .then((res) => {
        if(res.data.success === 1){
          console.log(res)
          const list = res.data.List.data1.filter(user => user.isAppointed === 'No');
          setQualified(list);
          setAppointedList(res.data.List.data2)
          swal(res.data.message)
          setErrors('')
          setRowSelectionModel([])
          
        }
        swal(res.data.message)
        setErrors('')
      }
       )
      .catch(err => console.log(err));
    })
  };

  const Reapp = async(data) => {
    console.log(data)
    const res = await FetchingBmccSchoinfo.FETCH_SCHOLARSINFO(data.applicantNum);
    console.log(res)
    const email = res.data.ScholarInf.results1[0].email
    const adminName = user.name;
    const applicantNum = data.applicantNum;
    const applicantCode = data.applicantCode;
    const formData = new FormData();
    formData.append('adminName',adminName);
    formData.append('applicantNum',applicantNum);
    formData.append('applicantCode',applicantCode)
    formData.append('email',email)
      Reaapointed.RE_APPOINT(formData)
      .then(res => {
        console.log(res)
        setQualified(res.data.results.data1);
        setAppointedList(res.data.results.data2);
        setSelectedUsers([]);
        swal('Success')
      }
       )
      .catch(err => console.log(err));
  };

  const Approved = async (data) => {
    console.log(data)
    try {
      const response = await Promise.all([
        FetchingApplicantsInfo.FETCH_INFO(data.applicantNum)
      ]);
      console.log(response)
      const dataappinfo = response[0].data.results[0];
      console.log(dataappinfo)
      const Name = `${dataappinfo.firstName} ${dataappinfo.middleName} ${dataappinfo.lastName}`;
      const applicantNum = data.applicantNum;
      const applicantCode = data.applicantCode;
      const yearLevel =dataappinfo.currentYear;
      const baranggay = dataappinfo.baranggay;
      const email = dataappinfo.email;
      const scholarshipApplied = dataappinfo.SchoIarshipApplied;
      const adminName = user.name;
      console.log(dataappinfo)
      SetApproved.SET_APPROVE({email,applicantCode,adminName,data,Name,applicantNum,yearLevel,baranggay,scholarshipApplied})
    .then(res => {
      console.log(res)
      setQualified(res.data.results.data1);
      setAppointedList(res.data.results.data2)
      swal('Success')
    }
     )
    .catch(err => console.log(err));
    } catch (error) {
      console.error('Error fetching data:', error);
    }

};

const Failed = async() =>{
  console.log(failinf)
  const res = await FetchingBmccSchoinfo.FETCH_SCHOLARSINFO(failinf.applicantNum);
  console.log(res)
  const schoapplied = res.data.ScholarInf.results1[0].SchoIarshipApplied;
  const batch = res.data.ScholarInf.results1[0].Batch;
  const formData = new FormData();
  formData.append('applicantNum',failinf.applicantNum)
  formData.append('Name',failinf.Name)
  formData.append('ScholarshipApplied', schoapplied)
  formData.append('batch',batch)
  formData.append('Reason',reason)
  formData.append('email',failinf.Email)
  FailedUser.FAILED_USER(formData)

}

  const events = {};
  const ongoingEvents = appointedList.filter((data) =>{
    return data.statusApp === 'Ongoing'
  })
  ongoingEvents.forEach((appointment) => {
    console.log(appointment)
    const { Reason, schedDate, end } = appointment;
    const startDate = new Date(schedDate);
    
    if (!events[Reason]) {
      // Create a new event if the title is not already in the events object
      events[Reason] = {
        title: Reason,
        start: startDate,
        end: new Date(end),
      };
    } else {
      // Update the end date if the title already exists in the events object
      const event = events[Reason];
      if (startDate > event.end) {
        event.end = new Date(end);
      }
    }
  });

  const uniqueEvents = Object.keys(events).map((key) => {
    const event = events[key];
    console.log(event)
    return {
      ...event,
      end: new Date(event.end),
    };
  });
  const handleEventSelect = (event) => {
    const date = new Date(event.start).toDateString();
    const list = ongoingEvents.filter(user => user.schedDate === date);
    console.log(list)
    const Agenda = list[0].Reason;
    const email = list[0].Email;
    const selectedDate = list[0].schedDate; 
    const selectedTime =  `${list[0].timeStart} - ${list[0].timeEnd}`;
    setSelectedAppointment({selectedDate,selectedTime,Agenda,email});
  };
  const groupAppointmentsByDate = () => {
    const groupedAppointments = {};
  
    ongoingEvents.forEach((appointment) => {
      const { schedDate, Name, Reason, Location, applicantCode, timeStart, timeEnd, applicantNum,reminders,Email } = appointment;
      console.log(schedDate)
      const date = schedDate.split('T')[0];
      console.log(date)
      const time = `${timeStart} - ${timeEnd}`;
  
      if (!groupedAppointments[schedDate]) {
        groupedAppointments[schedDate] = {};
      }
  
      if (!groupedAppointments[schedDate][time]) {
        groupedAppointments[schedDate][time] = [];
      }
  
      groupedAppointments[schedDate][time].push({ Name, Reason, Location, applicantCode, timeStart, timeEnd, applicantNum,reminders,Email });
    });
  
    return groupedAppointments;
  };
  const timeGroup = groupAppointmentsByDate()

  const cancelAppointment = async(e) => {
      e.preventDefault()
      console.log(selectedAppointment);
      const formData = new FormData();
      formData.append('schedDate', selectedAppointment.selectedDate);
      const res = await FetchingApplist.FETCH_APP(formData);
      const userlist = res.data.AppointedList;
      console.log(userlist)
try {
  for (let i=0 ;i<userlist.length;i++){
          const data = userlist[i];
          console.log(data);
          const cancelFormData = new FormData();
          cancelFormData.append('schedDate', selectedAppointment.selectedDate);
          cancelFormData.append('Email', data.Email);
          cancelFormData.append('applicantNum', data.applicantNum);
          const response = await CancelApp.CANCEL_APP(cancelFormData)
          if(response.data.success === 1){
            console.log(response)
            swal(response.data.message)
            setAppointedList(response.data.AppointmentList)
          }else{
            swal('Something Went Wrong')
          }
        }
} catch (error) {
  console.error('Error fetching data:', error);
}

  };

  const addOtherUser = (e) => {
    e.preventDefault()

    const selectedRows = rowSelectionModel.map((selectedRow) =>
    Qualified.find((row) => row.applicantNum === selectedRow)
  );
  selectedRows.forEach((data,index) =>{
      console.log(data)
      console.log(adduserAppoint)
      const applicantCode = data.applicantCode
      const applicantNum = data.applicantNum
      const Name = data.Name;
      const Email = data.email
      const Status = data.status;
      const start = adduserAppoint.timeStart;
      const end = adduserAppoint.timeEnd;
      const date = adduserAppoint.day;
      const reminders = adduserAppoint.reminders;
      const adminName = user.name;
      const Agenda = adduserAppoint.reason;
      const Location = adduserAppoint.location;
      const formData = new FormData();
      formData.append('applicantCode',applicantCode);
      formData.append('adminName',adminName)
      formData.append('applicantNum',applicantNum)
      formData.append('Name',Name);
      formData.append('Email',Email)
      formData.append('Status',Status)
      formData.append('Location',Location)
      formData.append('Agenda',Agenda)
      formData.append('appointmentDate',date);
      formData.append('startTime',start)
      formData.append('endTime',end);
      formData.append('reminders',reminders);

      CreateAppointment.CREATE_APPOINT(formData)
      .then((res) => {
        if(res.data.success === 1){
          console.log(res)
          const list = res.data.List.data1.filter(user => user.isAppointed === 'No');
          setQualified(list);
          setAppointedList(res.data.List.data2)
          swal(res.data.message)
          setErrors('')
          setRowSelectionModel([])
          
        }
        swal(res.data.message)
        setErrors('')
      }
       )
      .catch(err => console.log(err));
    })
  };
  const cancelBatch = async(date,time,data3) =>{
    try {
      for (let i=0 ;i<data3.length;i++){
              const data = data3[i];
              console.log(data);
              const cancelFormData = new FormData();
              cancelFormData.append('schedDate', date);
              cancelFormData.append('timeStart', data.timeStart);
              cancelFormData.append('timeEnd', data.timeEnd);
              cancelFormData.append('Email', data.Email);
              cancelFormData.append('applicantNum', data.applicantNum);
              const response = await CancelBatch.CANCEL_BATCH(cancelFormData)
              if(response.data.success === 1){
                console.log(response)
                swal(response.data.message)
                setAppointedList(response.data.AppointmentList)
              }else{
                swal('Something Went Wrong')
              }
            }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const appointUserInfo = async(data) =>{
      setUserOpen(true);
      console.log(data)
      const applicantNum = data.applicantNum
      const res = await FetchingUserAppdetails.FETCH_USERDET(applicantNum)
      console.log(res)
      const info = res.data.result[0];
      setUserFulldet(info)
  }
  const Appointedcolumns = [
    { field: 'applicantNum', headerName: 'ID', width: 70 },
    {
      field: 'Name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'Status',
      headerName: 'Status',
      width: 100,
      editable: true,
    },
    {
      field: 'Reason',
      headerName: 'Agenda',
      width: 150,
      editable: true,
    },
    {
      field: 'schedDate',
      headerName: 'Appointment Date',
      width: 150,
      editable: true,
    },
    {
      field: 'Time',
      headerName: 'Time',
      width: 150,
      renderCell: (params) => {
        const time = `${params.row.timeStart} - ${params.row.timeEnd}`
        return(
        <>
        <p>{time}</p>
        </>
      )},
    },
    {
      field: 'Location',
      headerName: 'Location',
      width: 150,
      editable: true,
    },
    {
      field: 'yearLevel',
      headerName: 'Year Level',
      width: 150,
      editable: true,
    },
    {
      field: 'insert',
      headerName: 'Details',
      width: 150,
      renderCell: (params) => (
          <>
          <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
          <ViewButton style={{marginLeft:'5px',backgroundColor:'blue',border:'none',padding:'3px',width:'100%',margin:'2px',color:'white',borderRadius:'5px',cursor:'pointer'}}
          onClick={() => appointUserInfo(params.row)}>View Details</ViewButton>
          </div>
        </>
      ),
    },
  
  ];

  return (
    <>
      <Dialog open={dialog} onClose={handleCloseDialog}>
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
          <Button onClick={Failed}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Modal
      open={open}
      onClose={handleClose}
      >
      <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        margin: 'auto',
        padding: 2,
        backgroundColor: 'white',
        border: 1 ,
        color: '#005427',
        borderRadius: 5,
        height:'80%',
        overflow:'auto',
        width:'80%'
      }}>
        <Card style={{padding:'10px',height:'90%',overflow:'auto'}}>
          <h3>Select User To be Added in Appointed Schedule</h3>
        <div style={{width:'100%'}}>
              <StyledButton onClick={handleClose}> X </StyledButton>
            </div> 
          <div style={{margin:'10px',width:'100%'}}>
          <Button variant="contained" onClick={addOtherUser}>
            ADD TO LIST
          </Button>
          </div>  
      <DataGrid
                      rows={Qualified}
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
                    /> 
    </Card>
      </Box>
      </Modal>
            <Dialog
        fullScreen
        open={Useropen}
        onClose={handleCloseUserDetails}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseUserDetails}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Applicant Information
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
      <Box sx={{width:'100%',padding:'10px',height:'100%',display:'flex',backgroundColor:'whitesmoke'}}>
         <div style={{width:'35%'}}>
            <div style={{width:'95%',padding:'10px',height:'60%'}}>
              <Card elevation={5}>
            <img
                alt="Remy Sharp"
                src={userFulldet.profile}
                style={{objectFit:'cover',width:'100%',height:'400px'}}
              />
              </Card>
            </div>
            <div style={{width:'95%',padding:'10px',height:'35%'}}>
              <Card sx={{width:'96%',height:'95%',padding:'10px'}}>
                <Typography>Name:{userFulldet.Name}</Typography>
                <Typography>Age:{userFulldet.age}</Typography>
                <Typography>Applicant Code: {userFulldet.applicantCode}</Typography>
                <Typography>Status: {userFulldet.status}</Typography>
                <Typography>Date Applied: {userFulldet.DateApplied}</Typography>
                <Typography>Scholarship Applied: {userFulldet.SchoIarshipApplied}</Typography>
              </Card>
            </div>
         </div>
         <div style={{width:'60%',padding:'10px'}}>
          <Card sx={{width:'100%',height:'100%',overflow:'auto'}}>
            <Tabs
            value={value1}
            onChange={handleChange1}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Application Form" />
            <Tab label="Documents Submitted" />
          </Tabs>
          {value1 === 0 && <>
           <Card sx={{display:'flex',justifyContent:'center',alignItems:'center',margin:'5px',backgroundColor:'blue',color:'white'}}><h1>APPLICATION FORM </h1></Card>
           <Card>
            <Typography sx={{paddingLeft:'60px',fontSize:'20px',fontWeight:'700'}}>Personal Information</Typography>
            <div style={{display:'flex',width:'95%',padding:'10px'}}>
              <div style={{width:'30%'}}>
                <Typography>
                  First Name:{userFulldet.firstName}
                </Typography>
                <Typography>
                  Last Name:{userFulldet.lastName}
                </Typography>
                <Typography>
                  Middle Name:{userFulldet.middleName}
                </Typography>
                <Typography>
                  Gender:{userFulldet.gender}
                </Typography>
              </div>
              <div style={{width:'30%'}}>
              <Typography>Citizenship: {userFulldet.citizenship}</Typography>
              <Typography>Date of Birth: {userFulldet.birthday}</Typography>
              <Typography>Age: {userFulldet.age}</Typography>
              <Typography>Birth Of Place: {userFulldet.birthPlace}</Typography>
              </div>
              <div style={{width:'37%'}}>
              <Typography>Contact Number: {userFulldet.contactNum}</Typography>
              <Typography>Email: {userFulldet.Email}</Typography>
              <Typography>Permanent Address: {userFulldet.caddress}</Typography>
              <Typography>Current Address: {userFulldet.paddress}</Typography>
              </div>
            </div>
            <Typography sx={{paddingLeft:'60px',fontSize:'20px',fontWeight:'700'}}>Economic Background</Typography>
            <div style={{display:'flex',width:'95%',padding:'10px'}}>
              <div style={{width:'100%'}}>
                <Typography>
                  Where Do you Live:{userFulldet.wereLive}
                </Typography>
                <Typography>
                  How Long you Live in Marilao:{userFulldet.howLong}
                </Typography>
                <Typography>
                  House Ownership:{userFulldet.ownerShip}
                </Typography>
              </div>
              <div style={{width:'100%'}}>
                <Typography>
                  Parent(s)/Guardian Annual Gross Income:{userFulldet.monthIncome}
                </Typography>
                <Typography>
                  Baranggay:{userFulldet.baranggay}
                </Typography>
              </div>
            </div>
            <Typography sx={{paddingLeft:'60px',fontSize:'20px',fontWeight:'700'}}>Family Information</Typography>
            <div style={{width:'100%',display:'flex'}}>
            <div style={{width:'30%',padding:'10px'}}>
            <Typography sx={{paddingLeft:'20px',fontSize:'18px',fontWeight:'500',textDecoration:'underline'}}>Mother Information</Typography>
            <div>
              <div style={{width:'100%'}}>
                <Typography>
                  First Name:{userFulldet.motherName}
                </Typography>
                <Typography>
                  Last Name:{userFulldet.motherlName}
                </Typography>
                <Typography>
                  Middle Name:{userFulldet.mothermName}
                </Typography>
              </div>
              <div style={{width:'100%'}}>
                <Typography>
                  Occupation:{userFulldet.motherOccu}
                </Typography>
                <Typography>
                  Highest Educational Attainment:{userFulldet.motherEduc}
                </Typography>
              </div>
            </div>
            </div>
            <div style={{width:'30%',padding:'10px'}}>
            <Typography sx={{paddingLeft:'20px',fontSize:'18px',fontWeight:'500',textDecoration:'underline'}}>Father Information</Typography>
            <div style={{width:'95%',padding:'10px'}}>
              <div style={{width:'100%'}}>
                <Typography>
                  First Name:{userFulldet.fatherName}
                </Typography>
                <Typography>
                  Last Name:{userFulldet.fatherlName}
                </Typography>
                <Typography>
                  Middle Name:{userFulldet.fathermName}
                </Typography>
              </div>
              <div style={{width:'100%'}}>
                <Typography>
                  Occupation:{userFulldet.fatherOccu}
                </Typography>
                <Typography>
                  Highest Educational Attainment:{userFulldet.fatherEduc}
                </Typography>
              </div>
            </div>
            </div>
            <div style={{width:'30%',padding:'10px'}}>
            <Typography sx={{paddingLeft:'20px',fontSize:'18px',fontWeight:'500',textDecoration:'underline'}}>Other Information</Typography>
              <Typography>Number of Family Members: {userFulldet.famNum}</Typography>
              <Typography>Guardian: {userFulldet.guardianName}</Typography>
              <Typography>Contact Number: {userFulldet.guardianContact}</Typography>
              <Typography>Relationship: {userFulldet.relationship}</Typography>
            </div>
            </div>
            <Typography sx={{paddingLeft:'60px',fontSize:'20px',fontWeight:'700'}}>Educational Background</Typography>
            <div style={{display:'flex',width:'95%',padding:'10px'}}>
              <div style={{width:'100%'}}>
                <Typography>
                  Year Level:{userFulldet.currentYear}
                </Typography>
                <Typography>
                  Type of School:{userFulldet.typeSchool}
                </Typography>
                <Typography>
                  School Name:{userFulldet.currentSchool}
                </Typography>
                <Typography>
                  School Address:{userFulldet.address}
                </Typography>
              </div>
              <div style={{width:'100%'}}>
                <Typography>
                  Degree Program/Course(Priority Course):{userFulldet.course}
                </Typography>
                <Typography>
                  General Weighted Average:{userFulldet.gwa}
                </Typography>
                <Typography>
                  Financial Support:{userFulldet.financialSupport}
                </Typography>
              </div>
            </div>
            <div style={{display:'flex',width:'95%',padding:'10px',justifyContent:'space-between'}}>
              <div style={{width:'30%'}}>
                <Typography sx={{paddingLeft:'20px',fontSize:'18px',fontWeight:'500',textDecoration:'underline'}}>Elementary Background</Typography>
                <Typography>
                  School Name:{userFulldet.elemSchool}
                </Typography>
                <Typography>
                  Address:{userFulldet.elemAddress}
                </Typography>
                <Typography>
                  School Year:{userFulldet.elemYear}
                </Typography>
                <Typography>
                  Award:{userFulldet.elemAward}
                </Typography>
              </div>
              <div style={{width:'30%'}}>
              <Typography sx={{paddingLeft:'20px',fontSize:'18px',fontWeight:'500',textDecoration:'underline'}}>Highschool Background</Typography>
              <Typography>
                  School Name:{userFulldet.highSchool}
                </Typography>
                <Typography>
                  Address:{userFulldet.highAddress}
                </Typography>
                <Typography>
                  School Year:{userFulldet.highYear}
                </Typography>
                <Typography>
                  Award:{userFulldet.highAward}
                </Typography>
              </div>
              <div style={{width:'30%'}}>
              <Typography sx={{paddingLeft:'20px',fontSize:'18px',fontWeight:'500',textDecoration:'underline'}}>College Background</Typography>
              <Typography>
                  School Name:{userFulldet.collegeSchool}
                </Typography>
                <Typography>
                  Address:{userFulldet.collegeAddress}
                </Typography>
                <Typography>
                  School Year:{userFulldet.collegeYear}
                </Typography>
                <Typography>
                  Award:{userFulldet.collegeAward}
                </Typography>
              </div>
            </div>
           </Card>
          </>}
          </Card>
         </div>
      </Box>
      </Dialog>
    <div className="appointment">
        <Sidebar/>
        <div className="appointmentContainer">
          <Navbar />
          <div className="top">

          <div className="headerAppoint">
          <h1> Appointments </h1>
          </div>
          <Box sx={{ width:'100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Create Appointment" />
        <Tab label="View and Edit Appointed Schedule" />
        <Tab label="User Appointment" />
      </Tabs>
          </Box>
        {value === 0 && 
        <Box>
        {step === 0 && <Card className="cards">
          <div style={{width:'100%',backgroundColor:'blue',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <h2 style={{color:'white'}}>Set Appointment Schedule</h2>
        </div>
        <div className="frmappoint">
        <div className="datagloc">
            <div className="dateAppoint">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem label={'Select Appointment Date'}>
          <Card elevation={3}>
          <DateCalendar
            sx={{
              width:'100%',
              backgroundColor: 'whitesmoke',
              borderRadius: '8px',
              padding: '16px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '18px',
            }}
            value={appointmentDate}
            onChange={(newValue) => setAppointmentDate(newValue)}
            defaultValue={dayjs('2022-04-17')}
            views={['year', 'month', 'day']}
            minDate={currentDate}
          />
          </Card>
        </DemoItem>
            {errors.date && <MuiAlert 
                  style={{ 
                    width: '90%', 
                    marginTop: '10px', 
                    color:'white', 
                    fontSize:'15px' }}  
                    variant="filled" severity="error" 
            elevation={0}>
            {errors.date}
            </MuiAlert>}
            </LocalizationProvider>
            </div>
        </div>
        <div className="timestend">
          <h3 style={{color:'green',margin:'10px'}}>Set Appointment Details</h3>
            
            <div className="appinf">
            <TextField 
            fullWidth
            id="outlined-basic" 
            label="Agenda"
            value={Agenda}
            onChange={(e) => setAgenda(e.target.value)} 
            variant="outlined" /> 
          {errors.agenda && <MuiAlert 
                  style={{ 
                    width: '90%', 
                    marginTop: '10px', 
                    color:'white', 
                    fontSize:'15px', }}              
                    variant="filled" severity="error" 
              elevation={0}>
              {errors.agenda}
              </MuiAlert>}    
            </div>
            <div className="appinf">
          <TextField 
            fullWidth
            id="outlined-basic" 
            label="Location"
            value={Location}
            onChange={(e) => setLocation(e.target.value)}
            variant="outlined" /> 
              {errors.location && <MuiAlert 
                  style={{ 
                    width: '90%', 
                    marginTop: '10px', 
                    color:'white', 
                    fontSize:'15px', }}              
                    variant="filled" severity="error" 
              elevation={0}>
              {errors.location}
              </MuiAlert>}
            </div>
            <div style={{display:'flex'}}>
            <div style={{marginRight:'20px'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
              <TimeField 
                label="Time Start"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                format="hh:mm A"
              />
              {errors.start && <MuiAlert 
                  style={{ 
                    width: '79%', 
                    marginTop: '10px', 
                    color:'white', 
                    fontSize:'13px', }}              
                    variant="filled" severity="error" 
              elevation={0}>
              {errors.start}
              </MuiAlert>}
            </DemoContainer>
            </LocalizationProvider>
            </div>
            <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
              <TimeField 
                label="Time End"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                format="hh:mm A"
              />
                {errors.end && <><MuiAlert
                    style={{ 
                      width: '79%', 
                      marginTop: '10px', 
                      color:'white', 
                      fontSize:'13px',
                }} 
                variant="filled" severity="error" 
                elevation={0}>
                {errors.end}
              </MuiAlert></>}
            </DemoContainer>
            </LocalizationProvider>
            </div>
            </div>
            <div>
            <CardContent>
                  <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                    Reminders:
                  </Typography>
                  <Typography variant="h5" component="div">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <TextField multiline
                    onChange={(e) => setReminders(e.target.value)}
                    value={reminder}
                    rows={10} fullWidth id="input-with-sx" label="" variant="outlined" />
                </Box>
                  </Typography>
                </CardContent>
            </div>
        </div>
      </div>
      <div style={{display:'flex',width:'95%',alignItems:'flex-end',justifyContent:'flex-end',margin:10}}>
      <Button onClick={handleNext} variant="contained">Next</Button>
      </div>
        </Card>
        }

        {step === 1 && <Card className="cards">
      <div className="applicalist">
        <div style={{width:'100%',display:'flex'}}>

            <Card style={{width:'100%'}}>
            <div style={{width:'100%',backgroundColor:'blue',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <h2 style={{color:'white'}}>Select User to be Appointed</h2>
            </div>
            <DataGrid
                      rows={Qualified}
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
                    />
            </Card>
       </div>
          <div className="applicantList">
          <Button className="dselectBtn" onClick={() => setStep(0)} variant="contained">BACK</Button>
            <Button className="appointBtn" onClick={handleSave} variant="contained">APPOINT</Button>
          </div>
         </div>
        </Card>}
        </Box>}
        {value === 1 && 
        <Box sx={{display:'flex',height:'100%',padding:'10px',width:'98%'}}>
            <div style={{width:'45%',height:'500px',margin:'10px'}}>
            <Card sx={{width:'96%',height:'96%',overflow:'auto',padding:'10px',backgroundColor:'transparent'}} elevation={0}>
                    {selectedAppointment && (
                      <div>
                        {Object.entries(timeGroup).map(([date, timeBatch]) => {
                          if (date === selectedAppointment.selectedDate) {
                            return (
                              <>
                              <div key={date} 
                              style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                                <div style={{width:'100%',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                                <Card style={{width:'100%',display:'flex',justifyContent:'space-around',alignItems:'center',padding:'10px'}}>
                                <h3>{date}</h3>
                                <StyledButton variant="contained" onClick={cancelAppointment}>Cancel Schedule</StyledButton>
                                </Card>
                                </div>
                                {Object.entries(timeBatch).map(([timeRange, data]) => {
                                  if (timeRange) {
                                    return (
                                      <>
                                      <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',margin:'10px'}}>
                                      <Card elevation={2} sx={{width:'100%',display:'flex',justifyContent:'space-around',alignItems:'center',padding:'10px',height:'100px'}}>
                                      <div key={timeRange}>
                                        <h3>{data[0].Reason}</h3>
                                        <h4>{timeRange}</h4>
                                        <p>{data[0].Location}</p>
                                        <p>Total Appointed Users:{data.length}</p>
                                        {/* <ul>
                                          {data.map((item, index) => (
                                            <li key={index}>
                                              {item.Name}
                                            </li>
                                          ))}
                                        </ul> */}
                                        
                                      </div>
                                      <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around',height:'100%'}}>
                                      <StyledButton variant="contained" size="small" onClick={() => cancelBatch(selectedAppointment.selectedDate,timeRange, data)}>Cancel Batch</StyledButton>
                                      <Button variant="contained" size="small" onClick={() => handleOpen(selectedAppointment.selectedDate,timeBatch, data)}>Add User</Button>
                                      </div>
                                      </Card>
                                      </div>
                                      </>
                                    );
                                  }
                                  return null;
                                })}
                              </div>
                              </>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}
            </Card>
            </div>
            {/* Calendar */}
            <div style={{ height: '500px',width:'52%',margin:'10px' }}>
                <Card sx={{width:'100%',height:'100%'}}>
                <Calendar 
                localizer={localizer} 
                events={uniqueEvents} 
                startAccessor="start" 
                endAccessor="start"
                onSelectEvent={handleEventSelect} />
                </Card>
            </div>
        </Box>}
        {value === 2 &&
        <Box sx={{display:'flex',height:'100%',padding:'10px',width:'100%'}}>
        <Card style={{height:'100%',width:'100%',padding:'10px'}}>
            <h3>Select User To be Added in Appointed Schedule</h3>
            <div style={{width:'100%'}}>
                  <StyledButton onClick={handleClose}> X </StyledButton>
            </div> 
            <div style={{margin:'10px',width:'100%'}}>
            <Button variant="contained" onClick={addOtherUser}>
              ADD TO LIST
            </Button>
            </div>  
            <Card sx={{width:'100%'}}>
              <DataGrid
                rows={appointedList}
                columns={Appointedcolumns}
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
            </Card>
        </Card>          
        </Box>}
       </div>

      </div>
    </div>
    </>
  )
}

export default Appointment