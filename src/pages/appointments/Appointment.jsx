import "./appointment.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";    
import { Tabs, Tab,Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper, Box, Button, Typography, Modal} from "@mui/material"; 
import { FetchingQualified, CreateAppointment,FetchingAppointList
  , Reaapointed, SetApproved,FetchingApplicantsInfo } from "../../api/request";
import FormControlLabel from '@mui/material/FormControlLabel';
import DatePicker from 'react-datepicker';
import Checkbox from '@mui/material/Checkbox';
import swal from "sweetalert";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { admininfo } from "../../App";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

const Appointment = () => {
  const { loginUser,user } = useContext(admininfo);
  const [Qualified, setQualified] = useState([]);
  const [appointedList, setAppointedList] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [Agenda, setAgenda] = useState('');
  const [Location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };
  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleStartTimeChange = (e) => {
    const selectedTime = e.target.value;
    const timeWithAMPM = addAMPM(selectedTime);
    setStartTime(timeWithAMPM);
  };

  const handleEndTimeChange = (e) => {
    const selectedTime = e.target.value;
    const timeWithAMPM = addAMPM(selectedTime);
    setEndTime(timeWithAMPM);
  };

  const addAMPM = (time) => {
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour, 10);
    const ampm = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = hourInt % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  const handleDateChange = (e) => {
    const formattedDate = formatDateString(e.target.value);
    setAppointmentDate(formattedDate);
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
    title: `${appointment.Name} - ${appointment.Status}`,
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
  const handleSave = () => {
    selectedUsers.forEach((data,index) =>{
      console.log(data)
      const applicantCode = data.code || data.code;
      const applicantNum = data.userId
      const Name = data.name || data.Name;
      const Email = data.email || data.email;
      const Status = data.scho || data.status;
      console.log(user)
      const adminName = user.name;
      CreateAppointment.CREATE_APPOINT({applicantCode,adminName,applicantNum,Name,Email,Status,endTime,startTime,appointmentDate,Location,Agenda})
      .then(res => {
        console.log(res)
        setQualified(res.data.List.data1);
        setAppointedList(res.data.List.data2)
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
      const scholarshipApplied = dataappinfo.SchoIarshipApplied;
      const adminName = user.name;
      console.log(dataappinfo)
      SetApproved.SET_APPROVE({applicantCode,adminName,data,Name,applicantNum,yearLevel,baranggay,scholarshipApplied})
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
      console.log(response);
      console.log(listing)
      setQualified(response.data.List);
      setAppointedList(listing.data.AppointmentList)
    }
    Fetch();

  }, []);

  const listqua = Qualified?.map((data,index)=>{
    console.log(data.isAppointed)
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
    <div className="appointment">
        <Sidebar/>
        <div className="appointmentContainer">
            <Navbar />
            <div className="top">
              <h1> Appointments </h1>
              <div>
        <label>Date:</label>
        <input
          type="date"
          value={appointmentDate}
          onChange={handleDateChange}
        />
      </div>

      <div>
       <label>Start Time</label>
       <input type="time" value={startTime} onChange={handleStartTimeChange} />

      <label>End Time</label>
      <input type="time" value={endTime} onChange={handleEndTimeChange} />
      </div>
      <div>
       <label>Agenda</label>
       <input type="text"
      value={Agenda}
      onChange={(e) => setAgenda(e.target.value)}/>
       
      </div>
      <div>
       <label>Location</label>
       <input type="text"      
       value={Location}
      onChange={(e) => setLocation(e.target.value)}/>
      </div>

      <h3>Applicants List</h3>
      <label htmlFor="">Search:</label>
      <input type="text" onChange={(e) => handleFilter(e.target.value)} />  
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell className="tableCell">
              <FormControlLabel required control={<Checkbox 
              checked={selectAll}
              onChange={handleSelectAllChange} />}/>Select All
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
            </div>
            <button onClick={handleSave}>APPOINT</button>
            <button onClick={() => setSelectedUsers([])}>Deselect All</button>
      <div className="top">
            <h3>Appointed List</h3>
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
      <div className="appointedListContainer">
          <h3>Appointed Users</h3>
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
      <div className="calendarContainer">
          <Calendar
            localizer={localizer}
            events={eventList}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectDate}
          />
        </div>

        </div>
    </div>
  )
}

export default Appointment