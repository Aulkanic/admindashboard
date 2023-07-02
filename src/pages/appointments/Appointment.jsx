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
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TextField from '@mui/material/TextField';
import MuiAlert from '@mui/material/Alert';
import { DataGrid } from '@mui/x-data-grid';
import './appointment.css'
const localizer = momentLocalizer(moment);

const columns = [
  { field: 'applicantNum', headerName: 'ID', width: 90 },
  { field: 'applicantCode', headerName: 'Applicant Code', width: 150 },
  {
    field: 'Name',
    headerName: 'Name',
    width: 250,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
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
  const [appointmentDate, setAppointmentDate] = useState('');
  const [Agenda, setAgenda] = useState('');
  const [Location, setLocation] = useState('');
  const [startTime, setStartTime] = useState(dayjs('2022-04-17T15:30'));
  const [endTime, setEndTime] = useState(dayjs('2022-04-17T15:30'));
  const [appointmentDate1, setAppointmentDate1] = useState('');
  const [Agenda1, setAgenda1] = useState('');
  const [Location1, setLocation1] = useState('');
  const [startTime1, setStartTime1] = useState(dayjs('2022-04-17T15:30'));
  const [endTime1, setEndTime1] = useState(dayjs('2022-04-17T15:30'));
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [datarows,setDatarows] = useState([]);
  const [dialog, setDialog] = React.useState(false);
  const [reason,setReason] = useState('');
  const [failinf,setFailInf] = useState([]);

  const handleClickOpenDialog = (data) => {
    console.log(data)
    setDialog(true);
    setFailInf(data)
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };

  const handleSelectDate = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
  };
  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectedRows(newSelectionModel);

  };

  useEffect(() => {
    async function Fetch(){
      const response = await FetchingQualified.FETCH_QUALIFIED();
      const listing  = await FetchingAppointList.FETCH_LISTAPPOINT();
      setQualified(response.data.List);
      setAppointedList(listing.data.AppointmentList)
    }
    Fetch();

  }, []);

  const groupAppointmentsByDate = () => {
    const groupedAppointments = {};

    appointedList.forEach((appointment) => {
      const { schedDate, Name,Reason,Location,applicantCode,timeStart,timeEnd,applicantNum } = appointment;

      if (!groupedAppointments[schedDate]) {
        groupedAppointments[schedDate] = [];
      }

      groupedAppointments[schedDate].push({Name,Reason,Location,applicantCode,timeStart,timeEnd,applicantNum});
    });

    return groupedAppointments;
  };
  const RenderAppointmentsByDate = () => {
    const groupedAppointments = groupAppointmentsByDate();
    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => {
      setOpen2(true);
    };
  
    const handleClose2 = () => {
      setOpen2(false);
    };
    return Object.keys(groupedAppointments).map((date) => {
      console.log(groupedAppointments)
      const appointments = groupedAppointments[date];
      const { Reason, Location,timeStart,timeEnd,applicantNum } = appointments[0];
  
      return (
        <>
        <Card sx={{padding:'10px'}}>
        <div key={date}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <div>
            <h3>Date: {date}</h3>
            <p>Agenda: {Reason}</p>
          <p>Location: {Location}</p>
          <p>Time: {timeStart}-{timeEnd}</p>
            </div>

          <div style={{display:'flex',justifyContent:'space-between',height:'30px'}}>
          <ChildModalEdit
                 open={open2}
                 handleOpen={handleOpen2}
                 handleClose={handleClose2}
          data={date} deta={appointments}/>
            <ChildModal data={date} deta={appointments[0]}/>
          </div>
          </div>
          <div className="listuserapp">
          <ul>
            {appointments.map((user) => (
              
              <li key={user.id}>
                <p>ApplicantCode:{user.applicantCode}</p>
                <p>Name: {user.Name}</p>
              </li>
             
            ))}
          </ul>
          </div>
        </div>
        </Card>
        </>
      );
    });
  };
  
  const getAppointedUsersCount = (date) => {
    console.log(date)
    console.log(appointedList)
    return appointedList.filter(
      (appointment) =>
        moment(appointment.schedDate).isSame(date, "day")
    ).length;
  };
  const eventList = appointedList.map((appointment) => ({
    title: `${appointment.Reason} - ${appointment.Name}`,
    start: moment(appointment.schedDate).toDate(),
    end: moment(appointment.schedDate).toDate(),
  }));

  const handleFilter = async (filterValue) => {
    const filtered = Qualified.filter(item =>
      Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(filterValue.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleUserSelection = (userId,name,email,scho,date,code) => {
    const currentIndex = selectedUsers.indexOf(userId);
    const newChecked = [...selectedUsers];
    const isSelected = selectedUsers.includes({userId,name,email,scho,date,code});
    console.log(currentIndex)
    if (currentIndex === -1) {
      newChecked.push({userId,name,email,scho,date,code});
    } else {
      newChecked.splice(currentIndex, 1);
    }

    if (isSelected) {
      setSelectedUsers(selectedUsers.filter((id,uname) => id !== userId && uname !== name));
    } else {
      setSelectedUsers(newChecked)
    }
  };

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);

    if (isChecked) {
    
      setSelectedUsers([...Qualified]);
    } else {
      
      setSelectedUsers([]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault()
    let errors = {}
    selectedUsers.forEach((data,index) =>{
      console.log(data)
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
      const startTimemin = endcheck.clone().subtract(1, 'hour');
      if(!date || date === ''){
        errors.date = 'Select A Scheduled Date First'
      }
      if (targetDate.isBefore(currentDate)) {
        errors.date ='Selected date is less than the current date!';
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
      const applicantCode = data.code || data.code;
      const applicantNum = data.userId
      const Name = data.name || data.Name;
      const Email = data.email || data.email;
      const Status = data.scho || data.status;

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

  function ChildModal(props) {
    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => {
      setOpen1(true);
    };
    const handleClose1 = () => {
      setOpen1(false);
    };
    console.log(props)

    return (
      <React.Fragment>
        <Button variant="contained" onClick={handleOpen1}>Add</Button>
        <Modal
          open={open1}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ height:'85%' }}>
            <button onClick={handleClose1}>X</button>

            <div style={{display:'flex',justifyContent:'space-between'}}>
            <h1>Applicant List</h1>

            <Button onClick={() =>AddtoApp(props)}>Add</Button>
            </div>

          <DataGrid
          sx={{height:'70%'}}
          rows={Qualified}
          columns={columns}
          getRowId={(row) => row.applicantNum}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          rowSelectionModel={selectedRows}
          onRowSelectionModelChange={handleSelectionModelChange}
        />

          </Box>
        </Modal>
      </React.Fragment>
    );
  }

  function ChildModalEdit(props) {
    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = (event) => {
      event.stopPropagation();
      setOpen2(true);
    };
    const handleClose2 = (event) => {
      event.stopPropagation();
      setOpen2(false);
    };

    console.log(open2)
    return (
      <React.Fragment>
        <Button variant="contained" onClick={handleOpen2}>Edit</Button>
        {open2 && <Modal
          open={open2}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{height:'55%' }}>
            <button onClick={handleClose2}>X</button>
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <Button onClick={() =>EditSched(props)}>Edit</Button>
            </div>

      <Card style={{height:'100%'}} elevation={3}>
        <div className="frmappoint">
          <h1 style={{marginBottom:'10px',fontSize:'15px'}}>Update Appointment Schedule</h1>
        <div className="datagloc">
      <div>

{/* APPOINTMENT DATE */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField 
          label="Appointment Date"
          value={appointmentDate1}
          size='small'
          onChange={(newValue) => setAppointmentDate1(newValue)}
          format="MMM DD, YYYY"
        />
          {errors.date1 && 
          <MuiAlert 
          elevation={0} severity="error">
          {errors.date1}
        </MuiAlert>}
      </LocalizationProvider>
    </div>

{/* AGENDA */}
    <div>
      <TextField 
        id="outlined-basic" 
        label="Agenda"
        size='small'
        value={Agenda1}
        onChange={(e) => setAgenda1(e.target.value)} 
        variant="outlined" />     
      </div>

{/* LOCATION */}
    <div>
      <TextField 
        id="outlined-basic" 
        label="Location"
        size='small'
        value={Location1}
        onChange={(e) => setLocation1(e.target.value)}
        variant="outlined" /> 
      </div>
    </div>

{/* TIMESTART */}
    <div className="timestend">

      <div >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
          <TimeField size='small'
            label="Time Start"
            value={startTime1}
            onChange={(newValue) => setStartTime1(newValue)}
            format="hh:mm A"
          />

      {errors.start1 && 
      <MuiAlert 
        variant='outlined' 
        elevation={0} severity="error">
          {errors.start1}
        </MuiAlert>}
      </DemoContainer>
      </LocalizationProvider>
      </div>

{/* TIME END      */}
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
          <TimeField size='small'
            label="Time End"
            value={endTime1}
            onChange={(newValue) => setEndTime1(newValue)}
            format="hh:mm A"
          />
            {errors.end1 && <MuiAlert variant='outlined' 
             elevation={0} severity="error">
            {errors.end1}
            </MuiAlert>}
          </DemoContainer>
          </LocalizationProvider>
        </div>

      </div>
    </div>
            </Card>
          </Box>
        </Modal>}
      </React.Fragment>
    );}

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

  const listqua = Qualified?.map((data,index)=>{
    return(
      <>
       {!data.isAppointed || data.isAppointed === 'No' ? (<TableRow key ={data.applicantNum}>  
              <TableCell className="tableCell"><FormControlLabel required control={<Checkbox
            checked={selectedUsers.some((item) => item.userId === data.applicantNum) || selectAll}
            onChange={() => handleUserSelection(data.applicantNum,data.Name,data.email,data.status,data.DateApplied,data.applicantCode)} />}/></TableCell> 
              <TableCell className="tableCell"> {data.applicantNum} </TableCell>  
              <TableCell className="tableCell"> {data.SchoIarshipApplied} </TableCell>  
              <TableCell className="tableCell"> {data.Name} </TableCell>
              <TableCell className="tableCell"> {data.DateApplied} </TableCell>
              <TableCell className="tableCell"> {data.email} </TableCell>
              <TableCell className="tableCell"> {data.status} </TableCell>
              <TableCell className="tableCell"> {data.checkedBy} </TableCell>
        </TableRow>) : null}
      </>
    )
  })

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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div >
            <button onClick={handleClose}> X </button>
        </div> 
        
        <div className="listAppointed">
        <div>
            <h3>Appointed List</h3>
        </div>

      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell"> Applicant Number </TableCell>
              <TableCell className="tableCell"> Name </TableCell>
              <TableCell className="tableCell"> Status </TableCell>  
              <TableCell className="tableCell"> Email </TableCell>
              <TableCell className="tableCell"> Date Scheduled </TableCell>
              <TableCell className="tableCell"> Time </TableCell>
              <TableCell className="tableCell"> Location </TableCell>
              <TableCell className="tableCell"> Agenda </TableCell>
              <TableCell className="tableCell"> Appointed By </TableCell>
              <TableCell className="tableCell"> Details </TableCell>
              <TableCell className="tableCell"> Action </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentList}
          </TableBody>
        </Table>
      </TableContainer>
        </div>
        <div className="calendarContainer">
        {RenderAppointmentsByDate()}
        </div>
        </Box>
      </Modal>

{/* APPOINTMENT CONTAINER */}
    <div className="appointment">
        <Sidebar/>
        <div className="appointmentContainer">
          <Navbar />
          <div className="top">

          <div className="headerAppoint">
          <h1> Appointments </h1>
          <button className="viewAppointbtn" onClick={handleOpen}> View Appointed Applicants </button>
          </div>

        <Card className="cards">
        <div className="frmappoint">
              <h2>Set Appointment Schedule</h2>

        <div className="datagloc">

        <div className="dateAppoint">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField 
          className="dataField"
          label="Appointment Date"
          value={appointmentDate}
          onChange={(newValue) => setAppointmentDate(newValue)}
          format="MMM DD, YYYY"
        />

        {errors.date && <MuiAlert 
        elevation={0} severity="error">
        {errors.date}
        </MuiAlert>}
        </LocalizationProvider>
        </div>

      <div className="agenda">
        <TextField 
        className="dataField"
        id="outlined-basic" 
        label="Agenda"
        value={Agenda}
        onChange={(e) => setAgenda(e.target.value)} 
        variant="outlined" />     
      </div>
      
      <div className="location">
      <TextField 
        className="dataField"
        id="outlined-basic" 
        label="Location"
        value={Location}
        onChange={(e) => setLocation(e.target.value)}
        variant="outlined" /> 
      </div>
        </div>

      <div className="timestend">

      <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
        <TimeField 
          className="timeField"
          label="Time Start"
          value={startTime}
          onChange={(newValue) => setStartTime(newValue)}
          format="hh:mm A"
        />
        {errors.start && <MuiAlert variant='outlined' 
        elevation={0} severity="error">
        {errors.start}
        </MuiAlert>}
      </DemoContainer>
      </LocalizationProvider>
      </div>

      <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
        <TimeField 
          className="timeField"
          label="Time End"
          value={endTime}
          onChange={(newValue) => setEndTime(newValue)}
          format="hh:mm A"
        />
          {errors.end && <MuiAlert variant='outlined' 
          elevation={0} severity="error">
          {errors.end}
        </MuiAlert>}
      </DemoContainer>
      </LocalizationProvider>
      </div>
      </div>
      </div>
      </Card>

    <Card className="cards">
      <div className="applicalist">
        <div className="dataList">

 {/* APPLICANT */}

    <div className="appHead">
     <h2>Applicants List</h2>
      <label className="searchBox"> Search </label>
      <input type="text" onChange={(e) => handleFilter(e.target.value)} />  
      </div>
    </div>

      <TableContainer component={Paper} className="table">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell className="tableCell">
              <FormControlLabel required control={<Checkbox 
              checked={selectAll}
              onChange={handleSelectAllChange} />}/>
            </TableCell>

              <TableCell className="tableCell"> Applicant Number </TableCell>
              <TableCell className="tableCell"> Scholarship Applied </TableCell>
              <TableCell className="tableCell"> Full Name </TableCell>
              <TableCell className="tableCell"> Date Applied </TableCell>
              <TableCell className="tableCell"> Email </TableCell>
              <TableCell className="tableCell"> Status </TableCell>  
              <TableCell className="tableCell"> Added By </TableCell>
            </TableRow>
          </TableHead>

          {filteredData.length > 0 ? (
            filteredData?.map((data,index) =>{
              return (
                <>
                <TableBody>
                {!data.isAppointed || data.isAppointed === 'No' ? (<TableRow key ={index}>  
            <TableCell className="tableCell"><FormControlLabel required control={<Checkbox
            checked={selectedUsers.some((item) => item.userId === data.applicantNum) || selectAll}
            onChange={() => handleUserSelection(data.applicantNum,data.Name,data.email,data.status,data.DateApplied)} />}/></TableCell> 
              <TableCell className="tableCell"> {data.applicantNum} </TableCell>  
              <TableCell className="tableCell"> {data.SchoIarshipApplied} </TableCell>  
              <TableCell className="tableCell"> {data.Name} </TableCell>
              <TableCell className="tableCell"> {data.DateApplied} </TableCell>
              <TableCell className="tableCell"> {data.email} </TableCell>
              <TableCell className="tableCell"> {data.status} </TableCell>
        </TableRow>) : null}                  
                </TableBody>
                </>
              )})
          ) : (<TableBody>
            {listqua}
          </TableBody>)}
        </Table>
      </TableContainer>

          <div className="applicantList">
            <Button className="appointBtn" onClick={handleSave} variant="contained">APPOINT</Button>
            <Button className="dselectBtn" onClick={() => setSelectedUsers([])} variant="contained">DESELECT</Button>
          </div>
         </div>
      </Card>
  </div>

      </div>
    </div>
    </>
  )
}

export default Appointment