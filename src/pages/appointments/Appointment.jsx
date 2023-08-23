import "./appointment.scss";
import * as React from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";    
import { Tabs, Tab, Box, Button, Typography, Modal,Card,Chip} from "@mui/material"; 
import { FetchingQualified, CreateAppointment,FetchingAppointList
  , Reaapointed, SetApproved,FetchingApplicantsInfo,SetApplicant,Addusertolistapp,FetchingBmccSchoinfo,FailedUser,
    CancelApp,CancelBatch,FetchingApplist,FetchingUserAppdetails,ListofSub, SetInterview,GrantAccess1,ListAccess,USERFRM_ID } from "../../api/request";
import dayjs from 'dayjs';
import CardContent from '@mui/material/CardContent';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import swal from "sweetalert";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
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
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import './appointment.css'
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { styled, createTheme } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';


const theme = createTheme();
const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));
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


const CustomTabs = styled(Tabs)({
  '& .MuiTabs-flexContainer': {
    color: 'white', 
    backgroundColor:'#252525',
    margin:'10px 10px 0px 0px',
    borderRadius: '0px 15px 0 0',
  },
});
const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 100,
  color:'white',
  [theme.breakpoints.up('sm')]: {
    minWidth: 120,
  },
}));
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
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [failinf,setFailInf] = useState([]);
  const [value, setValue] = React.useState(0);
  const [value1, setValue1] = React.useState(0);
  const [step,setStep] = useState(0)
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [failedSelectionModel,setFailedSelectionModel] = useState([]);
  const [reappSelectionModel,setReappSelectionModel] = useState([]);
  const currentDate = dayjs();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [adduserAppoint,setAdduserApp] = useState('');
  const [Useropen, setUserOpen] = React.useState(false);
  const [userFulldet,setUserFulldet] = useState([]);
  const [userForm,setUserForm] = useState([]);
  const [userFulldocs,setUserFulldocs] = useState([]);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const [access,setAccess] = useState([])
  const [who,setWho] = useState('');
  const [isSend,setIsSend] = useState('No');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('')
  const [openDialog1, setOpenDialog1] = useState(false);
  const handleCloseDialog1 = () => setOpenDialog1(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const handleOpenDialog2 = (data) => setOpenDialog2(true);
  const [activeState,setActiveState] = useState('All');
  const [userAppsched,setUserAppsched] = useState([]);
  const [siblings,setSiblings] = useState([]);

  const handleOpenDialog1 = (data) => {
    setOpenDialog1(true);
    setWho(data.applicantNum)
  }

  const handleCloseUserDetails = () => {
    setUserOpen(false);
  };
  const handleOpen = (day,timeBatch,date) => 
  {
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
  const openImageModal = (image,name) => {
    setSelectedImage({image,name});
    setImageModalOpen(true);
  };
  
  const closeImageModal = () => {
    setSelectedImage('');
    setImageModalOpen(false);
  };


  const handleCloseDialog = () => {
    setDialog(false);
  };


  const handleRowSelectionModelChange = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);

  };
  const handleFailedSelectionModelChange = (newFailedSelectionModel) => {
    
    setFailedSelectionModel(newFailedSelectionModel);

  };
  const handleReappSelectionModelChange = (newFailedSelectionModel) => {
    
    setReappSelectionModel(newFailedSelectionModel);

  };

  useEffect(() => {
    async function Fetch(){
      setShowBackdrop(true);
      const response = await FetchingQualified.FETCH_QUALIFIED();
      const listing  = await FetchingAppointList.FETCH_LISTAPPOINT();
      const list = response.data.List.filter(user => user.isAppointed === 'No');
      let acc = await ListAccess.ACCESS()
      const empacc = acc.data.result?.filter(data => data.employeeName === user.name)
      setAccess(empacc)
      setQualified(list);
      setAppointedList(listing.data.AppointmentList)
      setShowBackdrop(false);
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
    const officeHourStart = moment('08:59 AM', 'hh:mm A');
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
    const isValueIncluded = access[0]?.sectionId.includes('Create Appointment');
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
    Qualified.find((row) => row.applicantNum === selectedRow)
  );
  if(selectedRows.length === 0){
    swal({
      text: 'Please Select Users to be Appointed',
      timer: 2000,
      buttons: false,
      icon: "warning",
    })
    return
  }
  setShowBackdrop(true);
  let counter = 0;
  selectedRows.forEach((data,index) =>{
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
          const list = res.data.List.data1.filter(user => user.isAppointed === 'No');
          setQualified(list);
          setAppointedList(res.data.List.data2)
          setErrors('')
          setRowSelectionModel([])
          counter++;
          if (counter === selectedRows.length) {
            setShowBackdrop(false);
            swal({
              title: "Success",
              text: "Appointed Successfully!",
              icon: "success",
              button: "OK",
            });
          }
        }
        else{
          setShowBackdrop(false);
          swal({
            title: "Error",
            text: res.data.message,
            icon: "error",
            button: "OK",
          });
          setErrors('')
        }

      }
       )
      .catch(err => console.log(err));
    })
  };

  const Reapp = async(data) => {
    const isValueIncluded = access[0]?.sectionId.includes('Appointment');
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
    setShowBackdrop(true);
    const res = await FetchingUserAppdetails.FETCH_USERDET(applicantNum);
    const info = res.data.result[0];
    const email = data.Email
    const adminName = user.name;
    const applicantCode = data.applicantCode;
    const schedDate = data.schedDate
    const formData = new FormData();
    formData.append('adminName',adminName);
    formData.append('applicantNum',applicantNum);
    formData.append('applicantCode',applicantCode);
    formData.append('schedDate',schedDate);
    formData.append('email',email)
      Reaapointed.RE_APPOINT(formData)
      .then(res => {
        setQualified(res.data.results.data1);
        setAppointedList(res.data.results.data2);
        setSelectedUsers([]);
        setShowBackdrop(false);
        swal('Success')
      }
       )
      .catch(err => console.log(err));
  };

  const Approved = async (data) => {
    const isValueIncluded = access[0]?.sectionId.includes('Appointment');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    try {
      const response = await Promise.all([
        FetchingApplicantsInfo.FETCH_INFO(data.applicantNum)
      ]);
      const dataappinfo = response[0].data.results[0];
      const adminName = user.name;
      setShowBackdrop(true);
      const formData = new FormData()
      formData.append('email',data.Email)
      formData.append('contactNum',dataappinfo.contactNum)
      formData.append('applicantCode',data.applicantCode)
      formData.append('adminName',adminName)
      formData.append('Name',data.Name)
      formData.append('applicantNum',data.applicantNum)
      formData.append('yearLevel',data.yearLevel)
      formData.append('baranggay',dataappinfo.baranggay)
      formData.append('scholarshipApplied',dataappinfo.SchoIarshipApplied)
      SetApproved.SET_APPROVE(formData)
    .then(res => {
      setQualified(res.data.results.data1);
      setAppointedList(res.data.results.data2)
      setShowBackdrop(false);
      swal({
        title: "Success",
        text: "Approved Successfully!",
        icon: "success",
        button: "OK",
      });
    }
     )
    .catch(err => console.log(err));
    } catch (error) {
      console.error('Error fetching data:', error);
    }

};

const Failed = async() =>{
  const isValueIncluded = access[0]?.sectionId.includes('Appointment');
  if(!isValueIncluded){
    swal({
      text: 'UnAuthorized Access',
      timer: 2000,
      buttons: false,
      icon: "error",
    })
    return
  }
  const res = await FetchingBmccSchoinfo.FETCH_SCHOLARSINFO(failinf.applicantNum);
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
  .then(res => {
    setShowBackdrop(false);
    swal({
      title: "Success",
      text: "Success!",
      icon: "success",
      button: "OK",
    });
  }
   )
  .catch(err => console.log(err));

}
 const InterviewResult = (data) =>{
        const isValueIncluded = access[0]?.sectionId.includes('Create Appointment');
        if(!isValueIncluded){
          swal({
            text: 'UnAuthorized Access',
            timer: 2000,
            buttons: false,
            icon: "error",
          })
          return
        }
      
      const formData = new FormData()
      formData.append('isPassed',data)
      formData.append('applicantNum',userFulldet.applicantNum)
      formData.append('schedDate',userAppsched.schedDate)
      setShowBackdrop(true);
      SetInterview.SET_INTERVIEW(formData)
      .then((res) => {
        if(res.data.success === 1){
          console.log(res)
          setAppointedList(res.data.result)
          setShowBackdrop(false);
          swal({
            title: "Success",
            text: "Done!",
            icon: "success",
            button: "OK",
          });
        }else{
          setShowBackdrop(false);
          swal({
            title: "Failed",
            text: "Somthing Went Wrong!",
            icon: "error",
            button: "OK",
          });
        }

      }
       )
      .catch(err => console.log(err));

 }
 const Access = async() =>{
  const formData = new FormData();
  formData.append('email',email);
  formData.append('password',password);
  formData.append('applicantNum',who)
  setShowBackdrop(true);
  await GrantAccess1.GRANT_ACCESS1(formData)
  .then(res => {
    if(res.data.success === 1){
      setEmail('')
      setOpenDialog1(false)
      setAppointedList(res.data.result)
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
const FailedAll = async() =>{
  const isValueIncluded = access[0]?.sectionId.includes('Appointment');
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
    appointedList.find((row) => row.applicantNum === selectedRow));
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
      console.log(row)
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
        counter++;
        if (counter === selectedRows.length) {
          setShowBackdrop(false);
          swal({
            title: "Success",
            text: "Appointed Successfully!",
            icon: "success",
            button: "OK",
          });
        }
      }else{
        setShowBackdrop(false);
        swal({
          text: 'Something Went Wrong',
          timer: 2000,
          buttons: false,
          icon: 'error',
        });
      }
    }
}
const Addall = async () => {
  const isValueIncluded = access[0]?.sectionId.includes('Appointment');
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
    appointedList.find((row) => row.applicantNum === selectedRow)
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
  setShowBackdrop(true);
    try {
      let counter = 0;
      for (let i = 0; i < selectedRows.length; i++) {
        const row = selectedRows[i];
        const applicantNum = row.applicantNum;
        const response = await Promise.all([
          FetchingApplicantsInfo.FETCH_INFO(applicantNum)
        ]);
        const dataappinfo = response[0].data.results[0];
        const adminName = user.name;
        const formData = new FormData()
        formData.append('email',row.Email)
        formData.append('contactNum',dataappinfo.contactNum)
        formData.append('applicantCode',row.applicantCode)
        formData.append('adminName',adminName)
        formData.append('Name',row.Name)
        formData.append('applicantNum',row.applicantNum)
        formData.append('yearLevel',row.yearLevel)
        formData.append('baranggay',dataappinfo.baranggay)
        formData.append('scholarshipApplied',dataappinfo.SchoIarshipApplied)
        SetApproved.SET_APPROVE(formData)
      .then(res => {
        setQualified(res.data.results.data1);
        setAppointedList(res.data.results.data2)
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
    } catch (error) {
      console.log(error);
    }
};

  const events = {};
  const ongoingEvents = appointedList.filter((data) =>{
    return data.statusApp === 'Ongoing' && data.isInterview === 'No'
  })
  ongoingEvents.forEach((appointment) => {
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
    return {
      ...event,
      end: new Date(event.end),
    };
  });
  const handleEventSelect = (event) => {
    const date = new Date(event.start).toDateString();
    const list = ongoingEvents.filter(user => user.schedDate === date);
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
      const date = schedDate.split('T')[0];
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
      const isValueIncluded = access[0]?.sectionId.includes('Create Appointment');
      if(!isValueIncluded){
        swal({
          text: 'UnAuthorized Access',
          timer: 2000,
          buttons: false,
          icon: "error",
        })
        return
      }
      const formData = new FormData();
      formData.append('schedDate', selectedAppointment.selectedDate);
      const res = await FetchingApplist.FETCH_APP(formData);
      const userlist = res.data.AppointedList;
try {
  setShowBackdrop(true);
  let counter = 0;
  for (let i=0 ;i<userlist.length;i++){
          const data = userlist[i];
          console.log(data);
          const cancelFormData = new FormData();
          cancelFormData.append('schedDate', selectedAppointment.selectedDate);
          cancelFormData.append('Email', data.Email);
          cancelFormData.append('applicantNum', data.applicantNum);
          const response = await CancelApp.CANCEL_APP(cancelFormData)
          if(response.data.success === 1){
            setAppointedList(response.data.AppointmentList)
            counter++;
            if (counter === userlist.length) {
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
              text: 'Something Went Wrong',
              timer: 2000,
              buttons: false,
              icon: 'error',
            });
          }
        }
} catch (error) {
  console.error('Error fetching data:', error);
}

  };

  const addOtherUser = (e) => {
    e.preventDefault()
    const isValueIncluded = access[0]?.sectionId.includes('Create Appointment');
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
    Qualified.find((row) => row.applicantNum === selectedRow)
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
  setShowBackdrop(true);
  let counter = 0;
  selectedRows.forEach((data,index) =>{
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
          const list = res.data.List.data1.filter(user => user.isAppointed === 'No');
          setQualified(list);
          setAppointedList(res.data.List.data2)
          setErrors('')
          setRowSelectionModel([])
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
        else{
          setShowBackdrop(false);
          swal({
            text: 'Something Went Wrong',
            timer: 2000,
            buttons: false,
            icon: 'error',
          });
          setErrors('')
        }

      }
       )
      .catch(err => console.log(err));
    })
  };
  const cancelBatch = async(date,time,data3) =>{
    const isValueIncluded = access[0]?.sectionId.includes('Create Appointment');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    try {
      setShowBackdrop(true);
      let counter = 0;
      for (let i=0 ;i<data3.length;i++){
              const data = data3[i];
              const cancelFormData = new FormData();
              cancelFormData.append('schedDate', date);
              cancelFormData.append('timeStart', data.timeStart);
              cancelFormData.append('timeEnd', data.timeEnd);
              cancelFormData.append('Email', data.Email);
              cancelFormData.append('applicantNum', data.applicantNum);
              const response = await CancelBatch.CANCEL_BATCH(cancelFormData)
              if(response.data.success === 1){
                setAppointedList(response.data.AppointmentList)
                counter++;
                if (counter === data3.length) {
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
                  text: 'Something Went Wrong',
                  timer: 2000,
                  buttons: false,
                  icon: 'error',
                });
                setErrors('')
              }
            }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const appointUserInfo = async(data) =>{
      setUserOpen(true);
      setUserAppsched(data)
      const applicantNum = data.applicantNum
      const res = await FetchingUserAppdetails.FETCH_USERDET(applicantNum);
      const docs = await ListofSub.FETCH_SUB(applicantNum)
      const frm = await USERFRM_ID.FORMUSR(applicantNum)
      const info = res.data.result[0];
      const sib = res.data.siblings
      const sub = docs.data.Document
      setSiblings(sib)
      setUserForm(frm.data)
      setUserFulldet(info)
      setUserFulldocs(sub)
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
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
          <>
          <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
          <ViewButton className="myButton"
          onClick={() => appointUserInfo(params.row)}>View Details</ViewButton>
          </div>
        </>
      ),
    },

  
  ];
  const Passedcolumns = [
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
      field: 'score',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => {
        return(
          <>
          <div style={{width:"100%",display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
        <StyledButtonEdit className="myButton1" sx={{width:'100%'}}
        onClick={() => Approved(params.row)}>
          SET QUALIFIED
          </StyledButtonEdit>
        </div>
        </>)
      },
    },
  
  ];
  const Rejectcolumns = [
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
      field: 'grantedAccess',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => {
        console.log(params.row)
        return(
          <>
          <div style={{display:'flex'}}>
        {params.row.grantedAccess === '' || params.row.grantedAccess === 'No' ? (<StyledButtonAccess sx={{color:'white'}} className="myButton"
        onClick={() =>handleOpenDialog1(params.row)}>
          Access</StyledButtonAccess>) : (<StyledButtonEdit sx={{color:'white'}} className="myButton1"
        onClick={() => Approved(params.row)}>
          SET QUALIFIED
          </StyledButtonEdit>)}
          <StyledButton className="myButton2"
        onClick={() => handleOpenDialog2(params.row)}>
          Failed
          </StyledButton>
        </div>
        </>)
      },
    },
  
  ];
  const ReAppcolumns = [
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
      field: 'excuse',
      headerName: 'Reason ',
      width: 150,
      editable: true,
    },
    {
      field: 'score',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => {
        return(
          <>
          <div style={{width:"100%",display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
            <StyledButtonEdit sx={{width:'100%'}} className="myButton1"
              onClick={() => Reapp(params.row)}>
                  Reappoint
            </StyledButtonEdit>
        </div>
        </>)
      },
    },
  
  ];
  const Norescolumns = [
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
      field: 'grantedAccess',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => {
        console.log(params.row)
        return(
          <>
          <div style={{display:'flex'}}>
        {params.row.grantedAccess === '' || params.row.grantedAccess === 'No' ? (<StyledButtonAccess className="myButton"
        onClick={() =>handleOpenDialog1(params.row)}>
          Access</StyledButtonAccess>) : (<StyledButtonEdit className="myButton1"
        onClick={() => Approved(params.row)}>
          SET QUALIFIED
          </StyledButtonEdit>)}
          <StyledButton className="myButton2"
        onClick={() => handleOpenDialog2(params.row)}>
          Failed
          </StyledButton>
        </div>
        </>)
      },
    },
  
  ];
  const appointList = appointedList && appointedList.length > 0
  ? appointedList.filter(user => user.canGo === 'Yes' && user.isPassed === 'Pending' && user.Status === 'Qualified')
  : '';
  const PassedInterview = appointedList && appointedList.length > 0
  ? appointedList.filter(user => user.isPassed === 'True' && user.Status === 'Qualified')
  : '';
  const RejectInterview = appointedList && appointedList.length > 0
  ? appointedList.filter(user => user.isPassed === 'False')
  : '';
  const ReappointList = appointedList && appointedList.length > 0
  ? appointedList.filter(user => user.canGo === 'No' && user.isInterview !== 'Reappoint')
  : '';
  const Noresponse = appointedList && appointedList.length > 0
  ? appointedList.filter(user => user.canGo === 'Pending')
  : '';

  const userApplicationFrm = userForm?.map((data,index)=>{
    return(
      <div style={{display:'flex',alignItems:'center',margin:'10px'}} key={index}>
      <Chip sx={{width:'50px',marginRight:'5px'}} label={data.score} color="primary" />
      <p><strong>{index + 1}.</strong> {data.question} {data.answer}</p>
      </div>
    )
  })

  return (
    <>
      <StyledBackdrop open={showBackdrop}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>
      {/* Dialog for Image Expandin */}
      <Dialog fullScreen open={imageModalOpen} onClose={closeImageModal}>
      <DialogTitle>{selectedImage.name}</DialogTitle>
      <DialogContent>
        <img src={selectedImage.image} alt="Full Image" style={{ width: '100%', height: '100%' }} />
      </DialogContent>
      <DialogActions>
        <Button className="myButton" sx={{color:'white'}} onClick={closeImageModal}>Close</Button>
      </DialogActions>
      </Dialog>
      {/* End of Dialog for Image Expandin */}
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
            <Button sx={{color:'white'}} className="myButton" onClick={handleCloseDialog1}>Cancel</Button>
            <Button sx={{color:'white'}} className="myButton1" onClick={Access}>Submit</Button>
          </DialogActions>
      </Dialog>
      {/* End of Dialog for Access */}
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
          <Button className="myButton" onClick={handleCloseDialog}>Cancel</Button>
          <Button className="myButton1" onClick={Failed}>Submit</Button>
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
              <StyledButton className="myButton2" onClick={handleClose}> X </StyledButton>
            </div> 
          <div style={{margin:'10px',width:'100%'}}>
          <Button variant="contained" className="myButton1" onClick={addOtherUser}>
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
            <StyledButton className="myButton2" autoFocus color="inherit" onClick={() =>InterviewResult('False')}>
              REJECT
            </StyledButton>
            <StyledButtonEdit className="myButton1" sx={{marginLeft:'15px'}} autoFocus color="inherit" onClick={() =>InterviewResult('True')}>
              PASS
            </StyledButtonEdit>
          </Toolbar>
        </AppBar>
      <Box sx={{width:'98.5%',padding:'10px',height:'100%',display:'flex',backgroundColor:'whitesmoke'}}>
         <div style={{width:'35%',marginLeft:'20px'}}>
            <div className="imgprofatp">
            <img
                alt="Remy Sharp"
                src={userFulldet.profile}
              />
            </div>
            <div style={{width:'100%',height:'30%'}}>
              <div className="aptuserdetails">
                <p>Name:{userFulldet.Name}</p>
                <p>Age:{userFulldet.age}</p>
                <p>Applicant Code: {userFulldet.applicantCode}</p>
                <p>Status: {userFulldet.status}</p>
                <p>Date Applied: {userFulldet.DateApplied}</p>
                <p>Scholarship Applied: {userFulldet.SchoIarshipApplied}</p>
              </div>
            </div>
         </div>
         <div style={{width:'65%'}}>

            <CustomTabs
            value={value1}
            onChange={handleChange1}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <CustomTab label="User Information" />
            <CustomTab label="Application Form" />
            <CustomTab label="Documents Submitted" />
          </CustomTabs>
          {value1 === 0 && <>
           
            <div className="appuserfrm">
              <div>
                <h2>Personal Information</h2>
                <div className="aptuser">
                <p><strong>Name: </strong>{userFulldet.Name}</p>
                <p><strong>Gender: </strong>{userFulldet.gender}</p>
                <p><strong>Address: </strong>{userFulldet.address}</p>
                <p><strong>Baranggay: </strong>{userFulldet.baranggay}</p>
                <p><strong>Citizenship: </strong>{userFulldet.citizenship}</p>
                <p><strong>Birthday: </strong>{userFulldet.birthday}</p>
                <p><strong>Place of Birth: </strong>{userFulldet.birthPlace}</p>
                </div>

              </div>
              <div className="aptuser">
                <p><strong>Email: </strong>{userFulldet.email}</p>
                <p><strong>Contact Number: </strong>{userFulldet.contactNum}</p>
                <p><strong>School: </strong>{userFulldet.school}</p>
                <p><strong>School Address: </strong>{userFulldet.schoolAddress}</p>
                <p><strong>Year Level: </strong>{userFulldet.yearLevel}</p>
                <p><strong>Grade/Year: </strong>{userFulldet.yearLevel}</p>
                <p><strong>Course: </strong>{userFulldet.course}</p>
                </div>
              <div className="aptuser">
                <h2>Family Information</h2>
                <h3 className="aptheader">Father</h3>
                <p><strong>Name: </strong>{userFulldet.fatherName}</p>
                <p><strong>Highest Educational Attaintment: </strong>{userFulldet.fatherEducation}</p>
                <p><strong>Occupation: </strong>{userFulldet.fatherOccupation}</p>
                <h3 className="aptheader">Mother</h3>
                <p><strong>Name: </strong>{userFulldet.motherName}</p>
                <p><strong>Highest Educational Attaintment: </strong>{userFulldet.motherEducation}</p>
                <p><strong>Occupation: </strong>{userFulldet.motherOccupation}</p>

              </div>
              <div className="aptuser">
                <h3 className="aptheader">Guardian</h3>
                <p><strong>Name: </strong>{userFulldet.guardianName}</p>
                <p><strong>Address: </strong>{userFulldet.guardianAddress}</p>
                <p><strong>Contact Number: </strong>{userFulldet.guardianContact}</p>
                <h3 className="aptheader">Siblings</h3>
                {siblings.length > 0 ? (<ul>
                  {siblings?.map((data,index) =>{
                    return(
                      <li key={index}>{data.siblingName}</li>
                    )
                  })}
                </ul>) : (<p>Only Child</p>)}
              </div>
            </div>
          </>}
          {value1 === 1 && <>
          <div className="aptfrmuserscore">
            {userApplicationFrm}
          </div>
          </>}
          {value1 === 2 && <>
            <div className="subdocsappdet">
            {userFulldocs?.map((data) =>{
              return (
                <div className="imgdocuapt">
                  <button onClick={() => openImageModal(data.File,data.requirement_Name)}>
                    <p>{data.requirement_Name}</p>
                  <img
                    src={data.File}
                    alt=""
                  />
                  </button>
                </div>
              )
            })}
        </div>
          </>}

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
          <Box sx={{ width:'90%' }}>
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
        <Box sx={{display:'flex',height:'100%',width:'90%'}}>
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
                                <StyledButton className="myButton2" variant="contained" onClick={cancelAppointment}>Cancel Schedule</StyledButton>
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
                                      <StyledButton className="myButton" variant="contained" size="small" onClick={() => cancelBatch(selectedAppointment.selectedDate,timeRange, data)}>Cancel Batch</StyledButton>
                                      <Button className="myButton1" variant="contained" size="small" onClick={() => handleOpen(selectedAppointment.selectedDate,timeBatch, data)}>Add User</Button>
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
        <Box sx={{display:'flex',height:'100%',padding:'10px',width:'auto'}}>
        <Card style={{height:'100%',width:'100%'}}>
        <Breadcrumbs sx={{backgroundColor:'green'}} aria-label="breadcrumb">
                  <Button onClick={() => setActiveState('All')}>
                    <Link
                      underline="none"
                      sx={{
                        color: activeState === 'All' ? 'white' : 'black',
                        display:'flex',
                        alignItems:'center'
                      }}
                    >
                      <FormatListBulletedOutlinedIcon fontSize="inherit" />
                      All({appointList.length})
                    </Link>
                  </Button>
                  <Button onClick={() => setActiveState('Passed')}>
                    <Link
                      underline="none"
                      sx={{
                        color: activeState === 'Passed' ? 'white' : 'black',
                        display:'flex',
                        alignItems:'center'
                      }}
                    >
                      <CheckCircleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                      Passed Interview({PassedInterview.length})
                    </Link>
                  </Button>
                  <Button onClick={() => setActiveState('Reject')}>
                    <Link
                      underline="none"
                      sx={{
                        color: activeState === 'Reject' ? 'white' : 'black',
                        display:'flex',
                        alignItems:'center'
                      }}
                    >
                      <CancelIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                      Interview Failed({RejectInterview.length})
                    </Link>
                  </Button>
                  <Button onClick={() => setActiveState('Reapp')}>
                    <Link
                      underline="none"
                      sx={{
                        color: activeState === 'Reapp' ? 'white' : 'black',
                        display:'flex',
                        alignItems:'center'
                      }}
                    >
                      <CancelIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                      Reappoint List({ReappointList.length})
                    </Link>
                  </Button>
                  <Button onClick={() => setActiveState('Nores')}>
                    <Link
                      underline="none"
                      sx={{
                        color: activeState === 'Nores' ? 'white' : 'black',
                        display:'flex',
                        alignItems:'center'
                      }}
                    >
                      <CancelIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                      No Response({Noresponse.length})
                    </Link>
                  </Button>
         </Breadcrumbs>  
            <Card sx={{width:'100%'}}>
                  {activeState === 'All' && (appointList && appointList.length > 0 ? (
              <DataGrid
                sx={{width:'100%'}}
                rows={appointList}
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
                disableRowSelectionOnClick
                />
                ) : (
                  <div style={{width:'100%',height:'400px',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'whitesmoke',flexDirection:'column'}}>
                  <NoAccountsIcon sx={{width:'200px',height:'200px'}}/>
                <p style={{ textAlign: 'center',fontSize:30,fontWeight:700,fontStyle:'italic' }}>No records</p>
                </div>
                  ))}
                  {activeState === 'Passed' && (PassedInterview && PassedInterview.length > 0 ? (
                    <DataGrid
                      rows={PassedInterview}
                      columns={Passedcolumns}
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
                    <div style={{width:'100%',height:'400px',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'whitesmoke',flexDirection:'column'}}>
                      <NoAccountsIcon sx={{width:'200px',height:'200px'}}/>
                    <p style={{ textAlign: 'center',fontSize:30,fontWeight:700,fontStyle:'italic' }}>No records</p>
                    </div>
                  ))}
                  {activeState === 'Reject' && (RejectInterview && RejectInterview.length > 0 ? (
                    <DataGrid
                      rows={RejectInterview}
                      columns={Rejectcolumns}
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
                    <div style={{width:'100%',height:'400px',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'whitesmoke',flexDirection:'column'}}>
                      <NoAccountsIcon sx={{width:'200px',height:'200px'}}/>
                    <p style={{ textAlign: 'center',fontSize:30,fontWeight:700,fontStyle:'italic' }}>No records</p>
                    </div>
                  ))}
                  {activeState === 'Reapp' && (ReappointList && ReappointList.length > 0 ? (
                    <DataGrid
                      rows={ReappointList}
                      columns={ReAppcolumns}
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
                      onRowSelectionModelChange={handleReappSelectionModelChange}
                      rowSelectionModel={reappSelectionModel}
                      disableRowSelectionOnClick
                    />
                  ) : (
                    <div style={{width:'100%',height:'400px',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'whitesmoke',flexDirection:'column'}}>
                      <NoAccountsIcon sx={{width:'200px',height:'200px'}}/>
                    <p style={{ textAlign: 'center',fontSize:30,fontWeight:700,fontStyle:'italic' }}>No records</p>
                    </div>
                  ))}
                  {activeState === 'Nores' && (Noresponse && Noresponse.length > 0 ? (
                    <DataGrid
                      rows={Noresponse}
                      columns={Norescolumns}
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
                      onRowSelectionModelChange={handleReappSelectionModelChange}
                      rowSelectionModel={reappSelectionModel}
                      disableRowSelectionOnClick
                    />
                  ) : (
                    <div style={{width:'100%',height:'400px',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'whitesmoke',flexDirection:'column'}}>
                      <NoAccountsIcon sx={{width:'200px',height:'200px'}}/>
                    <p style={{ textAlign: 'center',fontSize:30,fontWeight:700,fontStyle:'italic' }}>No records</p>
                    </div>
                  ))}
            </Card>
            <div style={{width:'97%',margin:'10px',display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}}>
            {activeState === 'Passed' && <div sx={{width:'90%',margin:'10px',display:'flex',justifyContent:'flex-end',flexDirection:'column',alignItems:'flex-end'}}>
              <Button className="myButton1" onClick={Addall} sx={{margin:'10px'}} variant='contained'>SET ALL SELECTED TO SCHOLARS</Button>
            </div>}
            {activeState === 'Reject' && <div sx={{width:'90%',margin:'10px',display:'flex',justifyContent:'flex-end',flexDirection:'column',alignItems:'flex-end'}}>
                <Button className="myButton2" onClick={FailedAll} sx={{margin:'10px'}} variant='contained'>SET FAILED THE SELECTED USERS</Button>
            </div>}
            {activeState === 'Nores' && <div sx={{width:'90%',margin:'10px',display:'flex',justifyContent:'flex-end',flexDirection:'column',alignItems:'flex-end'}}>
                <Button className="myButton2" onClick={FailedAll} sx={{margin:'10px'}} variant='contained'>SET FAILED THE SELECTED USERS</Button>
            </div>}
            </div>
        </Card>          
        </Box>}
       </div>

      </div>
    </div>
    </>
  )
}

export default Appointment