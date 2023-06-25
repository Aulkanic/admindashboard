import "./appointment.scss";
import * as React from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";    
import { Tabs, Tab,Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper, Box, Button, Typography, Modal,Card} from "@mui/material"; 
import { FetchingQualified, CreateAppointment,FetchingAppointList
  , Reaapointed, SetApproved,FetchingApplicantsInfo,SetApplicant } from "../../api/request";
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
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TextField from '@mui/material/TextField';
import MuiAlert from '@mui/material/Alert';
import './appointment.css'
const localizer = momentLocalizer(moment);

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
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectDate = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
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
      const officeHourStart = moment('09:00 AM', 'hh:mm A');
      const officeHourEnd = moment('05:00 PM', 'hh:mm A');
      if(!appointmentDate || appointmentDate === ''){
        errors.date = 'Select A Scheduled Date First'
      }
      if (appointmentDate.isBefore(currentDate)) {
        errors.date ='Selected date is less than the current date!';
      }
      if (endTime.isAfter(endTime)) {
        errors.end = 'End time cannot be before the start time!'
      } else if (!endTime.isBetween(officeHourStart, officeHourEnd, 'minute', '[]')) {
        errors.end = 'Please select a time within office hours!(9AM-5PM)';
      }
      if (startTime.isAfter(startTime)) {
        errors.start = 'Start time cannot be after the end time!';
      } else if (!startTime.isBetween(officeHourStart, officeHourEnd, 'minute', '[]')) {
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
      const date = new Date(appointmentDate).toDateString();
      const value = { $d: new Date(startTime) };
      const start = value.$d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      const value1 = { $d: new Date(endTime) };
      const end = value1.$d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
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
        }
        swal(res.data.message)
      }
       )
      .catch(err => console.log(err));
    })
  };
  const Reapp = (data) => {
    console.log(data)
    const adminName = user.name;
    const applicantNum = data.applicantNum;
    const applicantCode = data.applicantCode;
    const formData = new FormData();
    formData.append('adminName',adminName);
    formData.append('applicantNum',applicantNum);
    formData.append('applicantCode',applicantCode)
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
      const applicantCode = data.applicantCode
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
  useEffect(() => {
    async function Fetch(){
      const response = await FetchingQualified.FETCH_QUALIFIED();
      const listing  = await FetchingAppointList.FETCH_LISTAPPOINT();
      setQualified(response.data.List);
      setAppointedList(listing.data.AppointmentList)
    }
    Fetch();

  }, []);

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
              <TableCell className="tableCell"><button onClick={() => Reapp(data)}>Re-appoint</button> <button onClick={() => Approved(data)}>Approved</button>  </TableCell>
        </TableRow>) : null}
      </>
    )
  })
  return (
    <>
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div >
            <button onClick={handleClose}> X </button>
        </div> 
        <div className="appoiintedlistsed">
        <div>
            <h3>Appointed List</h3>
            <div className="appointedListContainer">
          {selectedDate && (
            <p>
              Total Appointments on {moment(selectedDate).format("YYYY-MM-DD")}:
              {getAppointedUsersCount(selectedDate)}
            </p>
          )}
          <ul>
            {appointedList.map((appointment, index) => (
              <li key={index}>
                {appointment.Name} - {appointment.Status}
              </li>
            ))}
          </ul>
        </div>
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
          <h1 style={{margin:'0',fontSize:'15px'}}>Calendar View</h1>
          <Calendar
            localizer={localizer}
            events={eventList}
            startAccessor="start"
            endAccessor="end"
            selectable
            style={{ height: 500 ,margin:'10px'}}
            defaultView="month"
            onSelectSlot={handleSelectDate}
          />
        </div>
        </Box>
      </Modal>
    <div className="appointment">
        <Sidebar/>
        <div className="appointmentContainer">
            <Navbar />
            <div style={{width:'90%',display:'flex',justifyContent:'space-between',
          margin:'10px'}}>
            <h1> Appointments </h1>
            <Button variant="contained" onClick={handleOpen}>View Appointed Applicants</Button>
            </div>
            <div className="top">

              <Card style={{width:'95%',height:'100%',padding:'10px',margin:'10px'}} elevation={3}>
              <div className="frmappoint">
                <h1 style={{marginBottom:'10px',fontSize:'15px'}}>Set Appointment Schedule</h1>
                <div className="datagloc">
                <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField 
          label="Appointment Date"
          value={appointmentDate}
          size='small'
          onChange={(newValue) => setAppointmentDate(newValue)}
          format="MMM DD, YYYY"
        />
            {errors.date && <MuiAlert variant='outlined' 
    style={{ 
      width: '70%', 
      marginTop: '10px', 
      color:'red', 
      fontSize:'10px',
      height:'auto',
      background:'white' }} elevation={0} severity="error">
          {errors.date}
        </MuiAlert>}
        </LocalizationProvider>
        </div>
        <div>
        <TextField 
        id="outlined-basic" 
        label="Agenda"
        size='small'
        value={Agenda}
        onChange={(e) => setAgenda(e.target.value)} 
        variant="outlined" />     
      </div>
      <div>
      <TextField 
        id="outlined-basic" 
        label="Location"
        size='small'
        value={Location}
        onChange={(e) => setLocation(e.target.value)}
        variant="outlined" /> 
      </div>
        </div>
      <div className="timestend">
        <div style={{marginRight:'20px'}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
        <TimeField size='small'
          label="Time Start"
          value={startTime}
          onChange={(newValue) => setStartTime(newValue)}
          format="hh:mm A"
        />
        {errors.start && <MuiAlert variant='outlined' 
    style={{ 
      width: '80%', 
      marginTop: '10px', 
      color:'red', 
      fontSize:'10px',
      height:'auto',
      background:'white' }} elevation={0} severity="error">
          {errors.start}
        </MuiAlert>}
      </DemoContainer>
      </LocalizationProvider>
      </div>
      <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
        <TimeField size='small'
          label="Time End"
          value={endTime}
          onChange={(newValue) => setEndTime(newValue)}
          format="hh:mm A"
        />
                    {errors.end && <MuiAlert variant='outlined' 
    style={{ 
      width: '70%', 
      marginTop: '10px', 
      color:'red', 
      fontSize:'10px',
      height:'auto',
      background:'white' }} elevation={0} severity="error">
          {errors.end}
        </MuiAlert>}
      </DemoContainer>
      </LocalizationProvider>
      </div>
      </div>
      </div>
              </Card>
              <Card style={{width:'95%',height:'100%',padding:'10px',margin:'10px'}} elevation={3}>
              <div className="applicalist">
                <div className="heaaplpli">
      <h3>Applicants List</h3>
      <div>
      <label htmlFor="">Search:</label>
      <input type="text" onChange={(e) => handleFilter(e.target.value)} />  
      </div>
      </div>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
              )
            })
          ) : (<TableBody>
            {listqua}
          </TableBody>)}
        </Table>
      </TableContainer>
            <div style={{width:'100%',display:'flex',justifyContent:'space-around',margin:'10px'}}>
            <Button onClick={handleSave} variant="contained">APPOINT</Button>
            <Button onClick={() => setSelectedUsers([])} variant="contained">DESELECT</Button>
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