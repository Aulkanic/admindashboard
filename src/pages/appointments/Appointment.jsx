import "./appointment.scss";
import * as React from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";    
import { Tabs, Tab, Box, Button, Typography, Modal,Card,Chip, InputLabel} from "@mui/material"; 
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
import UserIcon from '../../Images/userrandom.png'
import { useSelector } from "react-redux";
import CustomNoRowsOverlay from "../Design/Norows";

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




const Appointment = () => {
  const { admin  } = useSelector((state) => state.login)
  const [Qualified, setQualified] = useState([]);
  const [appointedList, setAppointedList] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState(dayjs());
  const [Agenda, setAgenda] = useState('');
  const [Location, setLocation] = useState('');
  const initialStartTime = dayjs().set('hour', 9).set('minute', 0);
  const initialEndTime = dayjs().set('hour', 17).set('minute', 0);
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);
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
  const [active,setActive] = useState(0)

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
      const response = await FetchingQualified.FETCH_QUALIFIED();
      const listing  = await FetchingAppointList.FETCH_LISTAPPOINT();
      const list = response.data.List.filter(user => user.isAppointed === 'No');
      setQualified(list);
      setAppointedList(listing.data.AppointmentList)
    }
    Fetch();
    const intervalId = setInterval(Fetch, 5000);
    return () => {
      clearInterval(intervalId);
    };
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
    
    const officeHourStart = moment('08:59 AM', 'hh:mm A');
    const officeHourEnd = moment('05:00 PM', 'hh:mm A');
    const date = new Date(appointmentDate).toDateString();
  
    const value = { $d: new Date(startTime) };
    const start = value.$d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const value1 = { $d: new Date(endTime) };
    const end = value1.$d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    const startcheck = moment(start, 'hh:mm A'); 
    const endcheck = moment(end, 'hh:mm A');
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
    if(start === end){
      errors.end ='The End Time and Start Time should not match!';
    }
    console.log(errors)
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log(errors)
      return;
    }
    setAppDetails({start,end,date})
    console.log(appDetails)
    setStep(1)
    setErrors('')
  }

  const handleSave = (e) => {
    e.preventDefault()
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
      const adminName = admin[0].name;
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
          console.log(res.data)
          const list = res.data.List.results.filter(user => user.isAppointed === 'No');
          setQualified(list);
          setAppointedList(res.data.List.results1)
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
    const applicantNum = data.applicantNum;
    setShowBackdrop(true);
    const email = data.Email
    const adminName = admin[0].name;
    const applicantCode = data.applicantCode;
    const schedDate = data.schedDate
    const formData = new FormData();
    formData.append('adminName',adminName);
    formData.append('applicantNum',applicantNum);
    formData.append('applicantCode',applicantCode);
    formData.append('schedDate',schedDate);
    formData.append('email',email);
    formData.append('Name',data.Name);
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
    try {
      const response = await Promise.all([
        FetchingApplicantsInfo.FETCH_INFO(data.applicantNum)
      ]);
      const dataappinfo = response[0].data.results[0];
      const adminName = admin[0].name;
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
      formData.append('gradeLevel',dataappinfo.gradeLevel)
      formData.append('school',dataappinfo.school)
      formData.append('gender',dataappinfo.gender)
      formData.append('schoolAddress',dataappinfo.schoolAddress)
      formData.append('guardian',dataappinfo.guardianName)
      SetApproved.SET_APPROVE(formData)
    .then(res => {
      setQualified(res.data.results.results)
      setAppointedList(res.data.results.results1)
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
      const formData = new FormData()
      formData.append('isPassed',data)
      formData.append('applicantNum',userFulldet.applicantNum)
      formData.append('schedDate',userAppsched.schedDate)
      setShowBackdrop(true);
      SetInterview.SET_INTERVIEW(formData)
      .then((res) => {
        if(res.data.success === 1){
          setAppointedList(res.data.result)
          setShowBackdrop(false);
          setUserOpen(false)
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
  setOpenDialog1(false)
  setShowBackdrop(true);
  await GrantAccess1.GRANT_ACCESS1(formData)
  .then(res => {
    if(res.data.success === 1){
      setEmail('')
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
        const adminName = admin[0].name;
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
        formData.append('gradeLevel',dataappinfo.gradelevel)
        formData.append('school',dataappinfo.school)
        formData.append('gender',dataappinfo.gender)
        formData.append('schoolAddress',dataappinfo.schoolAddress)
        formData.append('guardian',dataappinfo.guardianName)
        SetApproved.SET_APPROVE(formData)
      .then(res => {
        setQualified(res.data.results.results);
        setAppointedList(res.data.results.results1)
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
          cancelFormData.append('Name', data.Name);
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
      const adminName = admin[0].name;
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
          const list = res.data.List.results.filter(user => user.isAppointed === 'No');
          setQualified(list);
          setAppointedList(res.data.List.results1)
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
              cancelFormData.append('Name', data.Name);
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
        <p style={{margin:'0px'}}>{time}</p>
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
          <button className='btnofficials1'
          onClick={() => appointUserInfo(params.row)}>View Details</button>
          </div>
        </>
      ),
    },

  
  ];
  const Passedcolumns = [
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
        <p style={{margin:'0px'}}>{time}</p>
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
        <button className="btnofficials" sx={{width:'100%'}}
        onClick={() => Approved(params.row)}>
          SET QUALIFIED
          </button>
        </div>
        </>)
      },
    },
  
  ];
  const Rejectcolumns = [
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
        <p style={{margin:'0px'}}>{time}</p>
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
        {params.row.grantedAccess === '' || params.row.grantedAccess === 'No' ? (<button className='btnofficials1'
        onClick={() =>handleOpenDialog1(params.row)}>
          Access</button>) : (<button className="btnofficials"
        onClick={() => Approved(params.row)}>
          SET QUALIFIED
          </button>)}
          <button className='btnofficials2'
        onClick={() => handleOpenDialog2(params.row)}>
          Failed
          </button>
        </div>
        </>)
      },
    },
  
  ];
  const ReAppcolumns = [
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
        <p style={{margin:'0px'}}>{time}</p>
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
            <button className="btnofficials"
              onClick={() => Reapp(params.row)}>
                  Reappoint
            </button>
        </div>
        </>)
      },
    },
  
  ];
  const Norescolumns = [
    {
      field: 'Name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'Reason',
      headerName: 'Agenda',
      width: 170,
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
        <p style={{margin:'0px'}}>{time}</p>
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
      width: 200,
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
        {params.row.grantedAccess === '' || params.row.grantedAccess === 'No' ? (<button className='btnofficials1'
        onClick={() =>handleOpenDialog1(params.row)}>
          Access</button>) : (<button className="btnofficials"
        onClick={() => Approved(params.row)}>
          SET QUALIFIED
          </button>)}
          <button style={{marginLeft:'5px'}} className='btnofficials2'
        onClick={() => handleOpenDialog2(params.row)}>
          Failed
          </button>
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
  ? appointedList.filter(user => user.canGo === 'No' && user.isInterview !== 'Reappoint' && user.Status === 'Qualified')
  : '';
  const Noresponse = appointedList && appointedList.length > 0
  ? appointedList.filter(user => user.canGo === 'Pending' &&  user.Status === 'Qualified')
  : '';
  const userApplicationFrm = userForm?.map((data,index)=>{
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
        <button className='btnofficials1' onClick={closeImageModal}>Close</button>
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
            <button className='btnofficials1' onClick={handleCloseDialog1}>Cancel</button>
            <button className="btnofficials" onClick={Access}>Submit</button>
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
          <button className='btnofficials1' onClick={handleCloseDialog}>Cancel</button>
          <button className="btnofficials" onClick={Failed}>Submit</button>
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
              <button className='btnofficials2' onClick={handleClose}> X </button>
            </div> 
          <div style={{margin:'10px',width:'100%'}}>
          <button className="btnofficials" onClick={addOtherUser}>
            ADD TO LIST
          </button>
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
        <AppBar sx={{ position: 'relative',backgroundColor:'#043F97' }}>
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
            <button className='btnofficials2' style={{marginRight:'10px'}} onClick={() =>InterviewResult('False')}>
              REJECT
            </button>
            <button className="btnofficials" sx={{marginLeft:'15px'}} autoFocus color="inherit" onClick={() =>InterviewResult('True')}>
              PASS
            </button>
          </Toolbar>
        </AppBar>
      <Box sx={{width:'100%',padding:'10px',height:'maxContent',display:'flex',backgroundColor:'whitesmoke'}}>
        <div style={{width:'30%',backgroundColor:'#f1f3fa',display:'flex',flexDirection:'column',alignItems:'center',paddingTop:'2%'}}>
            <Card elevation={2} style={{backgroundColor:'white',width:"75%",height:'350px',marginBottom:'50px',display:'flex',flexDirection:'column',borderRadius:'5px'}}>
                <div style={{width:'90%'}}>
                  <h1 style={{margin:'10px 0px 0px 30px',fontSize:'25px',borderBottom:'5px solid #f1f3fa',color:'#7F7E7D',paddingBottom:'5px'}}>
                    Applicant Profile
                  </h1>
                </div>
                <div style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center',marginTop:'20px',position:'relative'}}>
                  {userFulldet.profile ? (
                    <>
                    <img 
                    style={{width:'200px',height:'200px',borderRadius:'50%',objectFit:'cover',border:'2px solid black'}}
                    src={userFulldet.profile}
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
                    {userFulldet.Name}
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
                  <p><strong>Applicant Code:</strong> {userFulldet.Name}</p>
                  <p><strong>Scholarship Applied:</strong> {userFulldet.ScholarshipApplied
                     }</p>
                  <p><strong>Date Applied:</strong> {userFulldet.date}</p>
                  <p><strong>Batch:</strong> {userFulldet.Batch}</p>
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
                  className={active === 0 ? 'evalActivepage1' : 'evalPage1'}
                  >
                    Personal Info
                  </button>
                  <button
                  style={{margin:'0px 10px 0px 10px'}}
                  onClick={() => setActive(1)}
                  className={active === 1 ? 'evalActivepage1' : 'evalPage1'}
                  >
                    Parents Info
                  </button>
                  <button
                  onClick={() => setActive(2)}
                  className={active === 2 ? 'evalActivepage1' : 'evalPage1'}
                  style={{marginRight:'10px'}}
                  >
                    Application Form
                  </button>
                  <button
                  onClick={() => setActive(3)}
                  className={active === 3 ? 'evalActivepage1' : 'evalPage1'}
                  >
                    Documents
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
                            value={userFulldet.Name} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <label htmlFor="">Barangay</label>
                            <input 
                            type="text" 
                            value={userFulldet.baranggay} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <label htmlFor="">Email</label>
                            <input 
                            type="text" 
                            value={userFulldet.email} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <label htmlFor="">Birthday</label>
                            <input 
                            type="text" 
                            value={userFulldet.birthday} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <label htmlFor="">Contact Number</label>
                            <input 
                            type="text" 
                            value={userFulldet.contactNum} disabled />
                          </div>
                          <div className='formpersonaChild'>
                            <div style={{display:'flex'}}>
                              <div style={{display:'flex',flexDirection:'column',marginRight:'10px'}}>
                                <label htmlFor="">Gender</label>
                                <input 
                                style={{width:"200px"}}
                                type="text" 
                                value={userFulldet.gender} disabled />
                              </div>
                              <div style={{display:'flex',flexDirection:'column'}}>
                                <label htmlFor="">Age</label>
                                <input 
                                style={{width:"200px"}}
                                type="text" 
                                value={userFulldet.age} disabled />
                              </div>
                            </div>
                          </div>
                          <div className='formpersonaChild1'>
                            <label htmlFor="">Place of Birth</label>
                            <input 
                            type="text" 
                            value={userFulldet.birthPlace} disabled />
                          </div>
                          <div className='formpersonaChild1'>
                            <label htmlFor="">Address</label>
                            <input 
                            type="text" 
                            value={userFulldet.address} disabled />
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
                              value={userFulldet.fatherName} disabled />
                            </div>
                            <div>
                              <label htmlFor="">Highest Educational Attaintment</label>
                              <input 
                              type="text" 
                              value={userFulldet.fatherEducation} disabled />
                            </div>
                            <div>
                              <label htmlFor="">Occupation</label>
                              <input 
                              type="text" 
                              value={userFulldet.fatherOccupation} disabled />
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
                              value={userFulldet.motherName} disabled />
                            </div>
                            <div>
                              <label htmlFor="">Highest Educational Attaintment</label>
                              <input 
                              type="text" 
                              value={userFulldet.motherEducation} disabled />
                            </div>
                            <div>
                              <label htmlFor="">Occupation</label>
                              <input 
                              type="text" 
                              value={userFulldet.motherOccupation} disabled />
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
                              value={userFulldet.guardianName} disabled />
                            </div>
                            <div>
                              <label htmlFor="">Relationship</label>
                              <input 
                              type="text" 
                              value={userFulldet.relationship} disabled />
                            </div>
                            <div>
                              <label htmlFor="">Address</label>
                              <input 
                              type="text" 
                              value={userFulldet.guardianAddress} disabled />
                            </div>
                            <div>
                              <label htmlFor="">Contact Number</label>
                              <input 
                              type="text" 
                              value={userFulldet.guardianContact} disabled />
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
                            Total Score: {userFulldet.score}/100
                          </h1>
                         {userApplicationFrm}
                        </div>
                        </>
                      )
                    }
                    {
                      active === 3 && (
                        <>
                        <div className="appDocs">
                          {userFulldocs.map((data,index) =>{
                            return (
                              <div key={index} className="docslistapp">
                                <p style={{position:'absolute'}}>{data.requirement_Name}</p>
                                <img 
                                src={data.File} 
                                alt="" />
                              </div>
                            )
                          })}
                        </div>
                        </>
                      )
                    }
                </Card>
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
          <p className="scorecardh"> Appointments </p>
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
          <div style={{ fontSize: 20,fontWeight:'900',color:'white',lineHeight:'17.57px',fontFamily:'Roboto Serif',textAlign:'center',backgroundColor:'#043F97',padding:'15px 0px 15px 0px',borderTopRightRadius:'10px',borderTopLeftRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center' }}>
        <h2 style={{color:'white'}}>Set Appointment Schedule</h2>
        </div>
        <div className="frmappoint">
        <div className="datagloc">
            <div className="dateAppoint">
              <InputLabel sx={{ fontSize: 20,fontWeight:'900',color:'white',lineHeight:'17.57px',fontFamily:'Roboto Serif',textAlign:'center',backgroundColor:'#043F97',padding:'15px 0px 15px 0px',borderTopRightRadius:'10px',borderTopLeftRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center' }}>Select Appointment Date</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem>
          <Card elevation={1}>
          <DateCalendar
            sx={{
              width:'100%',
              backgroundColor: 'whitesmoke',
              borderRadius: '5px',
              padding: '16px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '18px',
            }}
            value={appointmentDate}
            onChange={(newValue) => setAppointmentDate(newValue)}
            defaultValue={dayjs()}
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
          <h3 style={{ fontSize: 20,fontWeight:'900',color:'black',lineHeight:'17.57px',fontFamily:'Roboto Serif',textAlign:'left',margin:'20px 0px 20px 0px' }}>Set Appointment Details</h3>
            
            <div className="appinf">
            <InputLabel sx={{color:'black',fontWeight:'bold',marginBottom:'10px'}}>Agenda:</InputLabel>
            <TextField 
            fullWidth
            id="outlined-basic" 
            value={Agenda}
            size="small"
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
            <InputLabel sx={{color:'black',fontWeight:'bold',marginBottom:'10px'}}>Location:</InputLabel>
          <TextField 
            fullWidth
            id="outlined-basic" 
            value={Location}
            size="small"
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
            <div style={{marginRight:'20px',width:'50%'}}>
            <InputLabel sx={{color:'black',fontWeight:'bold'}}>Time start:</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
              <TimeField 
                          slotProps={{
                            textField: {
                              size: "small",
                              error: false,
                            },
                          }}
                value={startTime}
                fullWidth
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
            <div style={{width:'55%'}}>
            <InputLabel sx={{color:'black',fontWeight:'bold'}}>Time end:</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
              <TimeField
            slotProps={{
              textField: {
                size: "small",
                error: false,
              },
            }} 
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
            <div style={{marginTop:'10px'}}>
                  <Typography sx={{color:'black',fontWeight:'bold',marginBottom:'10px'}} gutterBottom>
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
            </div>
            </div>
        </div>
      </div>
      <div style={{display:'flex',width:'95%',alignItems:'flex-end',justifyContent:'flex-end',margin:10}}>
      <Button onClick={handleNext} variant="contained">Next</Button>
      </div>
        </Card>
        }

        {step === 1 && <div className="cards">
      <div className="applicalist">
        <div style={{width:'100%',display:'flex'}}>

            <Card style={{width:'100%',height:'max-content'}}>
            <div style={{ fontSize: 20,fontWeight:'900',color:'white',lineHeight:'17.57px',fontFamily:'Roboto Serif',textAlign:'center',backgroundColor:'#043F97',padding:'15px 0px 15px 0px',borderTopRightRadius:'10px',borderTopLeftRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center' }}>
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
                            pageSize: 10,
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
        </div>}
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
                                <button className='btnofficials2' onClick={cancelAppointment}>Cancel Schedule</button>
                                </Card>
                                </div>
                                {Object.entries(timeBatch).map(([timeRange, data]) => {
                                  if (timeRange) {
                                    return (
                                      <>
                                      <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',margin:'10px',height:"maxContent"}}>
                                      <Card elevation={2} sx={{width:'100%',display:'flex',justifyContent:'space-around',alignItems:'center',padding:'10px',height:'maxContent'}}>
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
                                      <button className='btnofficials1' onClick={() => cancelBatch(selectedAppointment.selectedDate,timeRange, data)}>Cancel Batch</button>
                                      <button className="btnofficials" onClick={() => handleOpen(selectedAppointment.selectedDate,timeBatch, data)}>Add User</button>
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
        </Box>
        }
        {value === 2 &&
        <Box sx={{display:'flex',height:'100%',padding:'10px',width:'auto'}}>
        <Card style={{height:'100%',width:'100%',borderRadius:'0px'}}>
        <Breadcrumbs sx={{backgroundColor:'#0047a4',marginBottom:'0px'}} aria-label="breadcrumb">
                  <Button onClick={() => setActiveState('All')}>
                    <Link
                      underline="none"
                      sx={{
                        color:'white',
                        borderBottom: activeState === 'All' ? '5px solid white' : 'none',
                        transition:'all 0.3s ease-in-out',
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
                        color: 'white',
                        borderBottom: activeState === 'Passed' ? '5px solid white' : 'none',
                        transition:'all 0.3s ease-in-out',
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
                        color: 'white',
                        borderBottom: activeState === 'Reject' ? '5px solid white' : 'none',
                        transition:'all 0.3s ease-in-out',
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
                        color: 'white',
                        borderBottom: activeState === 'Reapp' ? '5px solid white' : 'none',
                        transition:'all 0.3s ease-in-out',
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
                        color: 'white',
                        borderBottom: activeState === 'Nores' ? '5px solid white' : 'none',
                        transition:'all 0.3s ease-in-out',
                        display:'flex',
                        alignItems:'center'
                      }}
                    >
                      <CancelIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                      No Response({Noresponse.length})
                    </Link>
                  </Button>
         </Breadcrumbs>  
            <Card sx={{width:'100%',height:'500px',borderRadius:'0px'}}>
                  {activeState === 'All' && (
              <CustomDataGrid
              sx={{minHeight:'300px',border:'none',borderRadius:'0px'}}
              slots={{
                noRowsOverlay: CustomNoRowsOverlay,
              }}
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
                )}
                  {activeState === 'Passed' && (
                    <CustomDataGrid
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
                  {activeState === 'Reject' && (
                    <CustomDataGrid
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
                  {activeState === 'Reapp' && (
                    <CustomDataGrid
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
                      sx={{minHeight:'300px',border:'none',borderRadius:'0px'}}
                      slots={{
                        noRowsOverlay: CustomNoRowsOverlay,
                      }}
                      pageSizeOptions={[25]}
                    />
                  )}
                  {activeState === 'Nores' && (
                    <CustomDataGrid
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
                      sx={{minHeight:'300px',border:'none',borderRadius:'0px'}}
                      slots={{
                        noRowsOverlay: CustomNoRowsOverlay,
                      }}
                      onRowSelectionModelChange={handleReappSelectionModelChange}
                      rowSelectionModel={reappSelectionModel}
                      disableRowSelectionOnClick
                    />
                  )}
            </Card>
            <div style={{width:'97%',margin:'10px',display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}}>
            {activeState === 'Passed' && <div sx={{width:'90%',margin:'10px',display:'flex',justifyContent:'flex-end',flexDirection:'column',alignItems:'flex-end'}}>
              <button className="btnofficials" onClick={Addall} sx={{margin:'10px'}} variant='contained'>SET ALL SELECTED TO SCHOLARS</button>
            </div>}
            {activeState === 'Reject' && <div sx={{width:'90%',margin:'10px',display:'flex',justifyContent:'flex-end',flexDirection:'column',alignItems:'flex-end'}}>
                <button className='btnofficials2' onClick={FailedAll} >SET FAILED THE SELECTED USERS</button>
            </div>}
            {activeState === 'Nores' && <div sx={{width:'90%',margin:'10px',display:'flex',justifyContent:'flex-end',flexDirection:'column',alignItems:'flex-end'}}>
                <button className='btnofficials2' onClick={FailedAll} style={{margin:'10px'}}>SET FAILED THE SELECTED USERS</button>
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