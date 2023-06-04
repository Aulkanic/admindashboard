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


const Appointment = () => {
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

  const handleFilter = async (filterValue) => {
    const filtered = Qualified.filter(item =>
      Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(filterValue.toLowerCase())
      )
    );
    setFilteredData(filtered);
    
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };
  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };
  const handleUserSelection = (userId,name,email,scho,date) => {
    const currentIndex = selectedUsers.indexOf(userId);
    const newChecked = [...selectedUsers];
    const isSelected = selectedUsers.includes({userId,name,email,scho,date});
    console.log(currentIndex)
    if (currentIndex === -1) {
      newChecked.push({userId,name,email,scho,date});
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
      const applicantNum = data.userId || data.applicantNum;
      const Name = data.name || data.Name;
      const Email = data.email || data.email;
      const Status = data.scho || data.status;
      CreateAppointment.CREATE_APPOINT({applicantNum,Name,Email,Status,endTime,startTime,appointmentDate,Location,Agenda})
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
      Reaapointed.RE_APPOINT(data)
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
      const Name = `${dataappinfo.firstName} ${dataappinfo.middleName} ${dataappinfo.lastName}`;
      const applicantNum = dataappinfo.applicantNum;
      const yearLevel =dataappinfo.currentYear;
      const baranggay = dataappinfo.baranggay;
      const scholarshipApplied = dataappinfo.SchoIarshipApplied;
      console.log(dataappinfo)
      SetApproved.SET_APPROVE({data,Name,applicantNum,yearLevel,baranggay,scholarshipApplied})
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
            onChange={() => handleUserSelection(data.applicantNum,data.Name,data.email,data.status,data.DateApplied)} />}/></TableCell> 
              <TableCell className="tableCell"> {data.applicantNum} </TableCell>  
              <TableCell className="tableCell"> {data.SchoIarshipApplied} </TableCell>  
              <TableCell className="tableCell"> {data.Name} </TableCell>
              <TableCell className="tableCell"> {data.DateApplied} </TableCell>
              <TableCell className="tableCell"> {data.email} </TableCell>
              <TableCell className="tableCell"> {data.status} </TableCell>
        </TableRow>) : null}
      </>
    )
  })
  const appointmentList = appointedList?.map((data,index) =>{
    console.log(data.isInterview)
    return(
      <>
       {!data.isInterview || data.isInterview === 'No' || data.isInterview === '' ? (<TableRow key ={index}>  
              <TableCell className="tableCell"> {data.applicantNum} </TableCell>  
              <TableCell className="tableCell"> {data.Name} </TableCell>
              <TableCell className="tableCell"> {data.Status} </TableCell>
              <TableCell className="tableCell"> {data.Email} </TableCell>
              <TableCell className="tableCell"> {data.schedDate} </TableCell>
              <TableCell className="tableCell"> {data.timeStart} - {data.timeEnd} </TableCell>
              <TableCell className="tableCell"> {data.Location} </TableCell>
              <TableCell className="tableCell"> {data.Reason} </TableCell>
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
          onChange={(e) => setAppointmentDate(e.target.value)}
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
              <TableCell className="tableCell">  </TableCell>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentList}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
        </div>
    </div>
  )
}

export default Appointment