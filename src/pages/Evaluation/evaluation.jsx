import React, { useEffect, useState } from 'react'
import './evaluation.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { DataGrid} from '@mui/x-data-grid';
import { Tabs, Tab, Box, Modal,Card } from "@mui/material";  
import { ApplicantsRequest, FetchingApplicantsInfo, ListofSub,
    CheckingSubs, CheckingApplicants,UserScore,SetApplicant } from "../../api/request";
import TextField from '@mui/material/TextField';

const Evaluation = () => {
    const [data, setData] = useState([]);
    const [userscore,setUserScore] = useState([]);
    const [selectedInfo, setSelectedInfo] = useState({});
    const [applicantsInfo, setApplicantInfo] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {

        async function Fetch(){
          const response = await ApplicantsRequest.ALL_APPLICANTS()
          console.log(response)
          setData(response.data.results);
        }
        Fetch();
      }, []);
      const view = async (data) => {
        console.log(data)
        const applicantNum = data.applicantNum;
        const formData = new FormData();
        formData.append('applicantNum',applicantNum)
        try {
          const response = await Promise.all([
            FetchingApplicantsInfo.FETCH_INFO(applicantNum),
            ListofSub.FETCH_SUB(applicantNum),
            UserScore.USER_SCORE(applicantNum)
          ]);
          console.log(response)
          setApplicantInfo(response[0].data.results);
          setUserScore(response[2].data.result)
          handleOpen()
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    
      }
    const columns = [
        { 
          field: 'applicantNum', 
          headerName: 'Registry ID',
          width: 100
         },
         {
           field: 'applicantCode', 
            headerName: 'Applicant Code',
          width: 150
          },
        {
          field: 'SchoIarshipApplied',
          headerName: 'Scholarship Applied',
          width: 150,
          editable: false,
        },
        {
          field: 'Name',
          headerName: 'Name',
          width: 250,
          editable: false,
        },
        {
          field: 'DateApplied',
          headerName: 'Date Applied',
          width: 150,
          editable: false,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 150,
          editable: false,
        },
        {
            field: 'insert',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <>
              <button onClick={() => view(params.row)}>View</button>
              <button style={{marginLeft:'5px'}} onClick={() => setFirsttoSecStat(params.row)}>Add</button>
              </>
            ),
          },
    
      ];
      const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
      };
      const applicantInfoPA = applicantsInfo?.map((data) =>{
        return (
          <div className="PA">
            <div className="Pinfo">
              <div className="fstcolm">
                <div>
            <TextField
            disabled
            sx={{color:'black'}}
            id="outlined-disabled"
            label="First Name"
            defaultValue={data.firstName}
          />
          </div>
          <div>
            <TextField
            disabled
            id="outlined-disabled"
            label="Last Name"
            defaultValue={data.lastName}
          />
          </div>
          <div>
            <TextField
            disabled
            id="outlined-disabled"
            label="Middle Name"
            defaultValue={data.middleName}
          />
          </div>
          <div>
            <TextField
            disabled
            id="outlined-disabled"
            label="Gender"
            defaultValue={data.gender}
          />
          </div>
          </div>
          <div className="fstcolm">
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Citizenship"
            defaultValue={data.citizenship}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Birthday"
            defaultValue={data.birthday}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Age"
            defaultValue={data.age}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Birth of Place"
            defaultValue={data.birthPlace}
          />
          </div>
          </div>
          <div className="fstcolm">
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Contact Number"
            defaultValue={data.contactNum}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Email"
            defaultValue={data.email}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Permanent Address"
            defaultValue={data.paddress}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Current Address"
            defaultValue={data.caddress}
          />
          </div>
          </div>
            </div>
        </div>
            )});
  
  const applicantInfoFB = applicantsInfo?.map((data) =>{
    const score = userscore?.map((data) =>{
      return data
    })
      return (
        <>
        <div className="PA">
          <div className="Finfo">
          <h1>Mother Information</h1>
          <div className="fmbgconlisclmn">
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="First Name"
            defaultValue={data.motherName}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Last Name"
            defaultValue={data.motherlName}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Middle Name"
            defaultValue={data.mothermName}
          />
          </div>
          </div>
          <div className="fmbgconlisclmn">
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Occupation"
            defaultValue={data.mothermName}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Highest Educational Attainment"
            defaultValue={data.motherEduc}
          />
          </div>
          </div>
          <h1>Father Information</h1>
          <div className="fmbgconlisclmn">
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="First Name"
            defaultValue={data.fatherName}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Last Name"
            defaultValue={data.fatherlName}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Middle Name"
            defaultValue={data.fathermname}
          />
          </div>
          </div>
          <div className="fmbgconlisclmn">
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Occupation"
            defaultValue={data.fatherOccu}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Highest Educational Attainment"
            defaultValue={data.fatherEduc}
          />
          </div>
          </div>
          <div className="fmbgconlisclmn">
          <div className='withscore'>
          <span>Score</span>
          <input style={{width:'40px',height:'50px',textAlign:'center'}} type="number" disabled value={score[0].fntotal}/>
          <TextField
            disabled
            id="outlined-disabled"
            label="Number of Family Members"
            defaultValue={data.famNum}
          />
          </div>
          </div>
          <h1>Guardian Information</h1>
          <div className="fmbgconlisclmn">
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Full Name"
            defaultValue={data.guardianName}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Contact Name"
            defaultValue={data.guardianContact}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Relationship"
            defaultValue={data.relationship}
          />
          </div>
          </div>
          </div>
        </div>
        </>
          )})
    const applicantInfoEcB = applicantsInfo?.map((data) =>{
      const score = userscore?.map((data) =>{
        return data
      })
      return (
        <>
        <div className="PA">
          <div className="Einfo">
          <div className="fstcolm">
          <div className='withscore'>
          <span>Score</span>
            <input style={{width:'40px',height:'50px',textAlign:'center'}} type="number" disabled value={score[0].wltotal}/>
          <TextField
            disabled
            id="outlined-disabled"
            label="Where do you Live?"
            defaultValue={data.wereLive}
          />
          </div>
          <div className='withscore'>
          <span>Score</span>
            <input style={{width:'40px',height:'50px',textAlign:'center'}} type="number" disabled value={score[0].hltotal}/>
          <TextField
            disabled
            id="outlined-disabled"
            label="Living in Marilao"
            defaultValue={data.howLong}
          />
          </div>
          <div className='withscore'>
          <span>Score</span>
            <input style={{width:'40px',height:'50px',textAlign:'center'}} type="number" disabled value={score[0].ostotal}/>
          <TextField
            disabled
            id="outlined-disabled"
            label="House Ownership"
            defaultValue={data.ownerShip}
          />
          </div>
          <div className='withscore'>
          <span>Score</span>
            <input style={{width:'40px',height:'50px',textAlign:'center'}} type="number" disabled value={score[0].mitotal}/>
          <TextField
            disabled
            id="outlined-disabled"
            label="Parent/Guardian Monthly Income"
            defaultValue={data.monthIncome}
          />
          </div>
          <div className='withscore'>
          <TextField
            disabled
            id="outlined-disabled"
            label="Baranggay"
            defaultValue={data.baranggay}
          />
          </div>
          </div>
        </div>
        </div>
        </>
          )})
  
    const applicantInfoEdB = applicantsInfo?.map((data) =>{
      const score = userscore?.map((data) =>{
        return data
      })
      return (
        <>
        <div className="PA">
        <div className="fmbgconlisclmn">
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Year Level"
            defaultValue={data.currentYear}
          />
          </div>
          <div>
          <span>Score</span>
          <input style={{width:'40px',height:'50px',textAlign:'center'}} type="number" disabled value={score[0].tstotal}/>
          <TextField
            disabled
            id="outlined-disabled"
            label="Type of School"
            defaultValue={data.typeSchool}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Degree Program/Course(Priority Course)"
            defaultValue={data.course}
          />
          </div>
          </div><br />
          <div className="fmbgconlisclmn">
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="School Name"
            defaultValue={data.currentSchool}
          />
          </div>
          <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="School Address"
            defaultValue={data.address}
          />
          </div>
          </div>
          <div className="fmbgconlisclmn">
          <div>
          <span>Score</span>
          <input style={{width:'40px',height:'50px',textAlign:'center'}} type="number" disabled value={score[0].gwatotal}/>
          <TextField
            disabled
            id="outlined-disabled"
            label="General Weighted Average"
            defaultValue={data.gwa}
          />
          </div>
          <div>
          <span>Score</span>
          <input style={{width:'40px',height:'50px',textAlign:'center'}} type="number" disabled value={score[0].fatotal}/>
          <TextField
            disabled
            id="outlined-disabled"
            label="Financial Support"
            defaultValue={data.financialSupport}
          />
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

    const setFirsttoSecStat = (data) =>{
        console.log(data)
        const formData = new FormData();
        formData.append('email',data.email);
        formData.append('applicantNum',data.applicantNum)
        SetApplicant.SET_APPLICANT(formData)
        .then(res => {
            console.log(res)
            setData(res.data.result)
            setOpen(false)
          }
           )
          .catch(err => console.log(err));
    }
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
          height:'100%',
          overflow:'auto'
        }}>
       
           <div className="buttonclosed" >
            <button onClick={handleClose}> X </button>
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
      </Tabs>
      
      <TabPanel value={tabValue} index={0}>{applicantInfoPA}</TabPanel>
      <TabPanel value={tabValue} index={1}>{applicantInfoFB}</TabPanel>
      <TabPanel value={tabValue} index={2}>{applicantInfoEcB}</TabPanel>
      <TabPanel value={tabValue} index={3}>{applicantInfoEdB}</TabPanel>

        </Box>
    </Modal>
    <div style={{backgroundColor:'whitesmoke'}}>
           <div className="scholars">
        <Sidebar/>
        <div className="scholarsContainer">
            <Navbar/>
            <Card sx={{width:'95%',margin:'10px'}} elevation={3}>
            <div className='evluationcon'>
              <h1 style={{marginLeft:'10px'}}>Registered Applicants</h1>
              <Box sx={{ height: 400, width: '100%' }}>
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
        disableRowSelectionOnClick
      />
    </Box>
              
            </div>
            </Card>
        </div>
    </div>
    </div>
    </>
  )
}

export default Evaluation