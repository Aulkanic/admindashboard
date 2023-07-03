import "./appointment.scss";
import * as React from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";    
import { Tabs, Tab,Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper, Box, Button, Typography, Modal,Card} from "@mui/material"; 
import { FetchingQualified, CreateAppointment,FetchingAppointList
  , Reaapointed, SetApproved,FetchingApplicantsInfo,SetApplicant,Addusertolistapp,UpdateScheduleApp,FetchingBmccSchoinfo,FailedUser } from "../../api/request";
import FormControlLabel from '@mui/material/FormControlLabel';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import Checkbox from '@mui/material/Checkbox';
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
import './appointment.css'
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
  const [appointmentDate1, setAppointmentDate1] = useState('');
  const [Agenda1, setAgenda1] = useState('');
  const [Location1, setLocation1] = useState('');
  const [startTime1, setStartTime1] = useState(dayjs('2022-04-17T15:30'));
  const [endTime1, setEndTime1] = useState(dayjs('2022-04-17T15:30'));
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [datarows,setDatarows] = useState([]);
  const [dialog, setDialog] = React.useState(false);
  const [reason,setReason] = useState('');
  const [failinf,setFailInf] = useState([]);
  const [value, setValue] = React.useState(0);
  const [step,setStep] = useState(0)
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const currentDate = dayjs();
  const [selectedAppointment, setSelectedAppointment] = useState(null);



  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  const groupAppointmentsByDate = () => {
    const groupedAppointments = {};
  
    appointedList.forEach((appointment) => {
      const { schedDate, Name, Reason, Location, applicantCode, timeStart, timeEnd, applicantNum } = appointment;
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
  
      groupedAppointments[schedDate][time].push({ Name, Reason, Location, applicantCode, timeStart, timeEnd, applicantNum });
    });
  
    return groupedAppointments;
  };
  const timeGroup = groupAppointmentsByDate()
  console.log(groupAppointmentsByDate())
  // const RenderAppointmentsByDate = selectedAppointment?.map((data,index) =>{
  //     return(
  //       <>
  //               {Object.keys(timeGroup).map((timeRange) => (
  //       <div key={timeRange}>
  //               <h1></h1>
  //               <h3>{timeRange}</h3>
  //         <ul>
  //           {timeGroup[timeRange].map((item, index) => (
  //           <>
  //             <li key={index}>
  //               {item.Name}
  //             </li>
  //           </>
  //           ))}
  //         </ul>
  //       </div>
  //     ))}
  //       </>
  //     )
  // })

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
      const Email = data.email
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
      formData.append('endTime',end)

      CreateAppointment.CREATE_APPOINT(formData)
      .then((res) => {
        if(res.data.success === 1){
          console.log(res)
          const list = res.data.List.data1.filter(user => user.isAppointed === 'No');
          setQualified(list);
          setAppointedList(res.data.List.data2)
          swal(res.data.message)
          setErrors('')
          
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
  const AddtoApp = async(data) =>{
    console.log(data)
    const selectedRowsData = selectedRows.map((rowId) => {
      return Qualified.find((row) => row.applicantNum === rowId);
    });
    setDatarows(selectedRowsData)
    selectedRowsData.forEach((row) => {
      const  applicantCode = data.deta.applicantCode
      const applicantNum = row.applicantNum;
      const Name = data.deta.Name
      const Email = row.email;
      const Status = row.status;
      const Location = data.deta.Location
      const Agenda = data.deta.Reason;
      const date = data.data;
      const start = data.deta.timeStart;
      const end = data.deta.timeEnd
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
      formData.append('endTime',end)
      Addusertolistapp.ADD_USEAPP(formData)
      .then((res) => {
        if(res.data.success === 1){
          console.log(res)
          setQualified(res.data.List.data1);
          setAppointedList(res.data.List.data2)
          swal(res.data.message)
          setErrors('')
        }
        swal(res.data.message)
        setErrors('')
      }
       )
      .catch(err => console.log(err));

    });
  }


  const EditSched = async(data) =>{
    console.log(data)
    let errors = {}
    data.deta.forEach((des,index) =>{
      console.log(data)
      const currentDate = moment();
      const officeHourStart = moment('08:00 AM', 'hh:mm A');
      const officeHourEnd = moment('05:00 PM', 'hh:mm A');
      const appointmenDate1 = appointmentDate1 || data.data
      const date = new Date(appointmenDate1).toDateString();
      const targetDate = moment(date);
      const startTime2 = startTime1 || data.timeStart
      const value = { $d: new Date(startTime2) };
      const start = value.$d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      const endTime2 = endTime1 || data.timeEnd
      const value1 = { $d: new Date(endTime2) };
      const end = value1.$d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      const startcheck = moment(start, 'hh:mm A'); 
      const endcheck = moment(end, 'hh:mm A');
      const startTimemin = endcheck.clone().subtract(1, 'hour');
      if(!date || date === ''){
        errors.date1 = 'Select A Scheduled Date First'
      }
      if (targetDate.isBefore(currentDate)) {
        errors.date1 ='Selected date is less than the current date!';
      }
      if (endcheck.isBefore(startcheck)) {
        errors.end1 = 'End time cannot be before the start time!'
      } else if (!endcheck.isBetween(officeHourStart, officeHourEnd, undefined, "(]")) {
        errors.end1 = 'Please select a time within office hours!(9AM-5PM)';
      }
     if (!startcheck.isBetween(officeHourStart, officeHourEnd, undefined, "(]")) {
        errors.start1 = 'Please select a time within office hours!(9AM-5PM)';
      }
      console.log(errors)
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        console.log(errors)
        return;
      }
      const applicantCode = data.applicantCode
      const applicantNum = data.applicatNum
      const adminName = user.name;
      const agen = Agenda1 || data.Reason;
      const loc = Location1 || data.Location

      const formData = new FormData();
      formData.append('applicantCode',applicantCode);
      formData.append('adminName',adminName)
      formData.append('applicantNum',applicantNum)
      formData.append('Location',loc)
      formData.append('Agenda',agen)
      formData.append('appointmentDate',date);
      formData.append('startTime',start)
      formData.append('endTime',end)
      UpdateScheduleApp.UPDATE_SCHEDULE(formData)
      .then((res) => {
        if(res.data.success === 1){
          console.log(res)
          setQualified(res.data.List.data1);
          setAppointedList(res.data.List.data2)
          swal(res.data.message)
          setErrors('')
        }
        swal(res.data.message)
        setErrors('')
      }
       )
      .catch(err => console.log(err));
    })
  }
  const events = appointedList.map((appointment) => {
    const { Reason, schedDate, end } = appointment;
    return {
      title:Reason,
      start: new Date(schedDate),
      end: new Date(schedDate),
    };
  });
  const handleEventSelect = (event) => {
    const date = new Date(event.start).toDateString();
    const list = appointedList.filter(user => user.schedDate === date);
    console.log(list)
    const Agenda = list[0].Reason;
    const selectedDate = list[0].schedDate; 
    const selectedTime =  `${list[0].timeStart} - ${list[0].timeEnd}`;
    setSelectedAppointment({selectedDate,selectedTime,Agenda});
  };

  const appointmentList = appointedList?.map((data,index) =>{
    console.log(data.isInterview)
    return(
      <>
       {!data.isInterview || data.isInterview === 'No' || data.isInterview === '' || data.isInterview === 'Appointed' ? (<TableRow key ={index}>  
              <TableCell className="tableCell"> {data.applicantNum} </TableCell>  
              <TableCell className="tableCell"> {data.Name} </TableCell>
              <TableCell className="tableCell"> {data.Status} </TableCell>
              <TableCell className="tableCell"> {data.Email} </TableCell>
              <TableCell className="tableCell"> {data.schedDate} </TableCell>
              <TableCell className="tableCell"> {data.timeStart} - {data.timeEnd} </TableCell>
              <TableCell className="tableCell"> {data.Location} </TableCell>
              <TableCell className="tableCell"> {data.Reason} </TableCell>
              <TableCell className="tableCell"> {data.appointedBy} </TableCell>
              <TableCell className="tableCell"><button onClick={() => Reapp(data)}>View</button></TableCell>
              <TableCell className="tableCell"><button onClick={() => Reapp(data)}>Re-appoint</button> <button onClick={() => Approved(data)}>Approved</button><button onClick={() =>handleClickOpenDialog(data)}>Failed</button>  </TableCell>
        </TableRow>) : null}
      </>
    )
  })
  const cancelAppointment = (timeBatch, selectedAppointment) => {
    console.log(timeBatch)
    // setSelectedAppointment(null);
  };

  const addOtherUser = (timeBatch) => {
    console.log(timeBatch)
  };

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
        {value === 0 && <Box>
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
          <h3 style={{color:'green'}}>Set Appointment Details</h3>
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
            <div className="appinf">
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
                    width: '90%', 
                    marginTop: '10px', 
                    color:'white', 
                    fontSize:'15px', }}              
                    variant="filled" severity="error" 
              elevation={0}>
              {errors.start}
              </MuiAlert>}
            </DemoContainer>
            </LocalizationProvider>
            </div>
            <div className="appinf">
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
                      width: '90%', 
                      marginTop: '10px', 
                      color:'white', 
                      fontSize:'15px',
                }} 
                variant="filled" severity="error" 
                elevation={0}>
                {errors.end}
              </MuiAlert></>}
            </DemoContainer>
            </LocalizationProvider>
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
        <div>
            <Card>
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
                                <Button variant="contained" onClick={() => cancelAppointment(timeGroup[selectedAppointment.selectedDate], date)}>Cancel Schedule</Button>
                                </Card>
                                </div>
                                {Object.entries(timeBatch).map(([timeRange, data]) => {
                                  if (timeRange) {
                                    return (
                                      <>
                                      <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',margin:'10px'}}>
                                      <Card elevation={2} sx={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',padding:'10px'}}>
                                      <div key={timeRange}>
                                        <h3>{data[0].Reason}</h3>
                                        <h4>{timeRange}</h4>
                                        <p>{data[0].Location}</p>
                                        <ul>
                                          {data.map((item, index) => (
                                            <li key={index}>
                                              {item.Name}
                                            </li>
                                          ))}
                                        </ul>
                                        <button onClick={() => addOtherUser(timeGroup)}>Add User</button>
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
                events={events} 
                startAccessor="start" 
                endAccessor="end"
                onSelectEvent={handleEventSelect} />
                </Card>
            </div>
        </Box>}
       </div>

      </div>
    </div>
    </>
  )
}

export default Appointment