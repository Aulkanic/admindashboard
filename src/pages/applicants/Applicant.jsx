import "./applicant.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { Tabs, Tab,Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper, Box, Typography, Modal } from "@mui/material"; 

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ApplicantsRequest, FetchingApplicantsInfo, ListofSub,
          CheckingSubs, CheckingApplicants } from "../../api/request";
import swal from "sweetalert";


const Applicant = () => {

  const [open, setOpen] = useState(false);
  const [post , setPost] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState({});
  const [applicantsInfo, setApplicantInfo] = useState([]);
  const [applicantsDocs, setApplicantDocs] = useState([]);
  const [Comments,setComments] = useState('');
  const [status,setStatusCheck] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = async (filterValue) => {
    const filtered = post.filter(item =>
      Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(filterValue.toLowerCase())
      )
    );
    setFilteredData(filtered);
    
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const style = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'max-content',
    height: '80%',
    border: '2px solid #000',
    boxShadow: 24,
  };

  useEffect( async () => {
    const response = await ApplicantsRequest.ALL_APPLICANTS()
    console.log(response)
    setPost(response.data.results);
  }, []);

// fucntions
  const view = async (data) => {
    const applicantNum = data.applicantNum;
    try {
      const response = await Promise.all([
        FetchingApplicantsInfo.FETCH_INFO(applicantNum),
        ListofSub.FETCH_SUB(applicantNum)
      ]);
      console.log(response)
      setApplicantInfo(response[0].data.results);
      setApplicantDocs(response[1].data.Document);
      setSelectedInfo(data)
      handleOpen()
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }
  const check = async (data,index) =>{
    const requirement_Name = data.requirement_Name;
    const applicantNum = applicantsInfo[0].applicantNum;
    const formData = new FormData();
    formData.append(`Comments`, Comments[index]);
    formData.append(`requirement_Name`, requirement_Name);
    formData.append(`applicantNum`, applicantNum);
    formData.append(`status`, status[index]);
    CheckingSubs.CHECK_SUB({requirement_Name,applicantNum,status,Comments})
    .then(res => {
      console.log(res)
      setComments('');
      setStatusCheck('');
      swal('Save')
    }
     )
    .catch(err => console.log(err));
  }

  const ApplicantCheck = async () =>{
    const applicantNum = applicantsInfo[0].applicantNum;
    console.log(applicantNum)
    const status = 'Qualified';
    CheckingApplicants.CHECK_APP({applicantNum,status})
    .then(res => {
      console.log(res)
      setOpen(false)
      setPost(res.data.Applicants);
      swal('Added Successfully')
    }
     )
    .catch(err => console.log(err));
  }
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(filteredData)
  const list = post?.map((f) =>{
    return (
      <> 
          <TableRow key ={f.applicantNum}>  
              <TableCell className="tableCell"> {f.applicantNum} </TableCell>  
              <TableCell className="tableCell"> {f.SchoIarshipApplied} </TableCell>  
              <TableCell className="tableCell"> {f.Name} </TableCell>
              <TableCell className="tableCell"> {f.DateApplied} </TableCell>
              <TableCell className="tableCell"> {f.email} </TableCell>
              <TableCell className="tableCell"> {f.score} </TableCell>
              <TableCell className="tableCell"> {f.status}</TableCell>
              <TableCell className="tableCell">
              <div className='cellAction'>
                <div className="viewButton" onClick={() => view(f)}> View </div>
            </div>
            </TableCell>
          </TableRow>
      </>
      )})

  const applicantInfoPA = applicantsInfo?.map((data) =>{
      return (
        <div className="PA">
          <div className="Pinfo">
            <p>Applicant Number: {data.date}{data.applicantNum} </p>
            <p>Name: {data.firstName} {data.middleName} {data.lastName}</p>
            <p>Gender: {data.gender}</p>
            <p>Citizenship: {data.citizenship}</p>
            <p>Birthday: {data.birthday}</p>
            <p>Age: {data.age}</p>
            <p>Birth of Place: {data.birthPlace}</p>
            <p>Contact Number: {data.contactNum}</p>
            <p>Email: {data.email}</p>
            <p>Current Address: {data.caddress}</p>
            <p>Permanent Address: {data.paddress}</p>
          </div>
      </div>
          )});

const applicantInfoFB = applicantsInfo?.map((data) =>{
    return (
      <>
      <div className="PA">
        <div className="Finfo">
          <p>Mother Name:{data.motherName} {data.mothermName} {data.motherlName} </p>
          <p>Occupation: {data.motherOccu}</p>
          <p>Highest Educational Attainment: {data.motherEduc}</p>
          <p>Father Name:{data.fatherName} {data.fathermName} {data.fatherlName} </p>
          <p>Occupation: {data.fatherOccu}</p>
          <p>Highest Educational Attainment: {data.fatherEduc}</p>
          <p>Guardian Name: {data.guardianName}</p>
          <p>Contact Number: {data.guardianContact}</p>
          <p>Relationship: {data.relationship}</p>
          <p>Number of Family Members: {data.famNum}</p>
        </div>
      </div>
      </>
        )})

  const applicantInfoEcB = applicantsInfo?.map((data) =>{
    return (
      <>
      <div className="PA">
        <div className="Einfo">
          <p>Baranggay: {data.baranggay}</p>
          <p>How Long living in Marilao: {data.howLong}</p>
          <p>Living Type: {data.wereLive}</p>
          <p>House Ownership: {data.ownerShhip}</p>
          <p>Monthly Income of Parents/Guardian: {data.monthIncome}</p>
      </div>
      </div>
      </>
        )})

  const applicantInfoEdB = applicantsInfo?.map((data) =>{
    return (
      <>
      <div className="PA">
        <div className="Eduinfo">
          <p>Current Year: {data.currentYear}</p>
          <p>Course: {data.course}</p>
          <p>Current School: {data.currentSchool}</p>
          <p>Type of School: {data.typeSchool}</p>
          <p>School Award: {data.elemAward},{data.highAward}</p>
        </div>
      </div>
      </>
        )})

  const docusubmitted = applicantsDocs?.map((data,index) =>{
    return (
      <>
      <div className="PA">
      <div className="Docuinfo">
        <h1>{data.requirement_Name}</h1>
        <div className="sublist" key={index}>
        <div className="subdocsprev">
          <img style={{width: 100}} src={data.File} alt="" />
        </div>
        </div>

        <div className="actions">
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label"> Status </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={status[index]}
          onChange={(e) =>{
            const stat = [...status];
            stat[index] = e.target.value;
            setStatusCheck(stat);
          }}>

        <FormControlLabel value="Approved" control={<Radio />} label="Approved" />
        <FormControlLabel value="Reject"   control={<Radio />} label="Reject" />
        <FormControlLabel value="For Further Evaluation" control={<Radio />} label="For Further Evaluation" />
          </RadioGroup>
         </FormControl><br/>
         <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label"> Comments </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={Comments[index]}
          onChange={(e) =>{
            const comm = [...Comments];
            comm[index] = e.target.value;
            setComments(comm);
          }}>

        <FormControlLabel value="Blurred Images" control={<Radio />} label="Blurred Images" />
        <FormControlLabel value="Invalid File Image" control={<Radio />} label="Invalid File Image" />
        <FormControlLabel value="No Comments" control={<Radio />} label="No Comments" />
          </RadioGroup>
         </FormControl>
          </div>
          <div>
            <button onClick={() =>check(data,index)}> Save </button>
          </div>
        </div>
      </div>
      </>
    )})

      const TabPanel = ({ children, value, index }) => (
        <div role="tabpanel" hidden={value !== index}>
          {value === index && <Box p={3}>{children}</Box>}
        </div>
      );
      const sortedData = [...post].sort((a, b) => a.applicantNum - b.applicantNum);
      console.log(sortedData);
      const sortedDataNumericReverse = [...post].sort((a, b) => b.applicantNum - a.applicantNum);
console.log(sortedDataNumericReverse);
  return (
    <>
    <Modal className="modalContainer"
        open={open}
        onClose={handleClose}
      >
        <Box sx={{
          margin: 'auto',
          padding: 2,
          backgroundColor: 'white',
          border: 1 ,
          color: '#005427',
          borderRadius: 5,
        }}>
       
           <div className="buttonclosed" >
            <button onClick={handleClose}> X </button>
            </div>

  {/* Header of Modal */}
            <div className="header">
            <label> PERSONAL INFO </label> 
            <br/>
            <span> Name: {selectedInfo?.Name}</span>
            <br/>
            <span> Email: {selectedInfo.email} </span>
            </div>
          

        <Tabs
          value={tabValue} 
          onChange={handleTabChange}   
          variant="scrollable"
          scrollButtons="auto">
        
        <Tab label="Personal Information" />
        <Tab label="Family Background" />
        <Tab label="Economic Background" />
        <Tab label="Educational Background" />
        <Tab label="Documents" />
      </Tabs>
      
      <TabPanel value={tabValue} index={0}>{applicantInfoPA}</TabPanel>
      <TabPanel value={tabValue} index={1}>{applicantInfoFB}</TabPanel>
      <TabPanel value={tabValue} index={2}>{applicantInfoEcB}</TabPanel>
      <TabPanel value={tabValue} index={3}>{applicantInfoEdB}</TabPanel>
      <TabPanel value={tabValue} index={4}>{docusubmitted}</TabPanel>

      <div className="buttonbacapp">
        <button onClick={handleClose}> CANCEL </button>
        <button onClick={() => ApplicantCheck()}> ADD </button>
      </div>

        </Box>
      </Modal>
     

    <div className="applicant">
      <Sidebar/>
      <div className="applicantContainer">
      <Navbar/>
      <div className="top" >
      <h1> Applicants </h1>  
      <label htmlFor="">Search:</label>
      <input type="text" onChange={(e) => handleFilter(e.target.value)} />       
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell className="tableCell"> Applicant Number </TableCell>
              <TableCell className="tableCell"> Scholarship Applied </TableCell>
              <TableCell className="tableCell"> Full Name </TableCell>
              <TableCell className="tableCell"> Date Applied </TableCell>
              <TableCell className="tableCell"> Email </TableCell>
              <TableCell className="tableCell"> Score </TableCell>  
              <TableCell className="tableCell"> Status </TableCell>  
              <TableCell className="tableCell">  </TableCell>
            </TableRow>
          </TableHead>

          {filteredData.length > 0 ? (
            filteredData?.map((data,index) =>{
              return (
                <>
                <TableBody>
              <TableRow key ={index}>  
              <TableCell className="tableCell"> {data.applicantNum} </TableCell>  
              <TableCell className="tableCell"> {data.SchoIarshipApplied} </TableCell>  
              <TableCell className="tableCell"> {data.Name} </TableCell>
              <TableCell className="tableCell"> {data.DateApplied} </TableCell>
              <TableCell className="tableCell"> {data.email} </TableCell>
              <TableCell className="tableCell"> {data.score} </TableCell>
              <TableCell className="tableCell"> {data.status}</TableCell>
              <TableCell className="tableCell">
              <div className='cellAction'>
                <div className="viewButton" onClick={() => view(data)}> View </div>
            </div>
            </TableCell>
          </TableRow>   
          </TableBody>             
                </>
              )
            })
          ) : (<TableBody>
            {list}
          </TableBody>)}
        </Table>
      </TableContainer>

        </div>
      </div>
    </div>

    </>
  )
  
}

export default Applicant