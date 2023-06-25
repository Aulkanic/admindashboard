import "./applicant.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { Tabs, Tab, Box, Modal, Card } from "@mui/material"; 
import { DataGrid} from '@mui/x-data-grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ApplicantsRequest, FetchingApplicantsInfo, ListofSub,
          CheckingSubs, CheckingApplicants,UserScore,ListofReq } from "../../api/request";
import swal from "sweetalert";
import { styled } from '@mui/material/styles';
import { useContext } from "react";
import { admininfo } from "../../App";
import TextField from '@mui/material/TextField';
import './applicant.css'

const Applicant = () => {
  const { loginUser,user } = useContext(admininfo);
  const [open, setOpen] = useState(false);
  const [post , setPost] = useState([]);
  const [reqlist,setReqlist] = useState([]);
  const [userscore,setUserScore] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState({});
  const [applicantsInfo, setApplicantInfo] = useState([]);
  const [applicantsDocs, setApplicantDocs] = useState([]);
  const [Comments,setComments] = useState('');
  const [status,setStatusCheck] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [datarows,setDatarows] = useState([]);

  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectedRows(newSelectionModel);

  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const CustomDataGrid = styled(DataGrid)({
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: 'green', 
      color: 'white', 
    },
  });
  const style = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'max-content',
    height: '80%',
    border: '2px solid #000',
    boxShadow: 24,
  };

  useEffect(() => {

    async function Fetch(){
      const response = await ApplicantsRequest.ALL_APPLICANTS()
      const docreq = await ListofReq.FETCH_REQUIREMENTS()
      setPost(response.data.results);
      console.log(docreq)
      const sub = docreq.data.Requirements.results2
      const list = docreq.data.Requirements.results1
      const totalsubdiv = `${sub.length}/${list.length}`
      setReqlist(totalsubdiv)
    }
    Fetch();
  }, []);

// fucntions
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
      setApplicantDocs(response[1].data.Document);
      setUserScore(response[2].data.result)
      setSelectedInfo(data)
      handleOpen()
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }
  const check = async (data,index) =>{
    console.log(status)
    const requirement_Name = data.requirement_Name;
    const applicantNum = applicantsInfo[0].applicantNum;   
    const adminName = user.name;
    const applicantCode = selectedInfo.applicantCode;
    const formData = new FormData();
    formData.append(`Comments`, Comments[index]);
    formData.append(`requirement_Name`, requirement_Name);
    formData.append(`applicantNum`, applicantNum);
    formData.append(`status`, status[index]);
    formData.append(`adminName`, adminName);
    CheckingSubs.CHECK_SUB({requirement_Name,applicantNum,status,Comments,adminName,applicantCode})
    .then(res => {
      console.log(res)
      setComments('');
      setStatusCheck('');
      swal('Save')
    }
     )
    .catch(err => console.log(err));
  }
  const ApplicantCheck = async (data) =>{
    console.log(data)
    const applicantNum = data.applicantNum;
    const applicantCode = selectedInfo.applicantCode;
    const status = 'Qualified';
    const adminName = user.name;
    const email = data.email
    CheckingApplicants.CHECK_APP({email,adminName,applicantNum,status,applicantCode})
    .then(res => {
      console.log(res)
      setPost(res.data.Applicants)
      setOpen(false)
      swal('Added Successfully')
    }
     )
    .catch(err => console.log(err));
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const checkedrows = async () => {
    const selectedRowsData = selectedRows.map((rowId) => {
      return post.find((row) => row.applicantNum === rowId);
    });
    setDatarows(selectedRowsData)
    selectedRowsData.forEach((row) => {
      const paramName = row.applicantNum; // Replace "paramName" with the actual parameter name
      const paramValue = row;

    });

    // ...
  };
  const columns = [
    { field: 'applicantNum', headerName: 'Applicant ID', width: 100 },
    {
      field: 'SchoIarshipApplied',
      headerName: 'Scholarship Applied',
      width: 150,
      editable: true,
    },
    {
      field: 'Name',
      headerName: 'Name',
      width: 250,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: false,
    },
    {
      field: (reqlist),
      headerName: 'Documents',
      width: 110,
      editable: false,
      valueGetter: () => reqlist,
    },
    {
      field: 'Batch',
      headerName: 'Batch',
      width: 100,
      editable: false,
    },
    {
      field: 'insert',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
        <button onClick={() => view(params.row)}>View</button>
        <button style={{marginLeft:'5px'}} onClick={() => ApplicantCheck(params.row)}>Add</button>
        </>
      ),
    },
  ];

  const applicantInfoPA = applicantsInfo?.map((data) =>{
      return (
        <div className="PA">
          <div className="Pinfo">
            <div className="fstcolm">
              <div>
          <TextField
          disabled
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


  const docusubmitted = applicantsDocs?.map((data,index) =>{
    return (
      <>
      <div className="PA">
      <div className="Docuinfo">
        <div>
          <Card elevation={5}>
        <div className="sublist" key={index}>
        <div>
        <div className="actions">
        <h1>{data.requirement_Name}</h1>
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
        <div className="subdocsprev">
          <img style={{width: '70%',height:'80%'}} src={data.File} alt="" />
        </div>
        </div>
        </Card>
        </div>
        </div>
      </div>
      </>
    )})

      const filteredRows = post.filter((row) => row.status === 'Applicants');
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
          height:'90%',
          overflow:'auto',
          width:'90%'
        }}>
          <div className="docusersub">
           <div className="buttonclosed" >
            <button onClick={handleClose}> X </button>
            </div>  
            <h1>Documents:{reqlist}</h1>
            <div className="clas"> 
          {docusubmitted}
          </div>
          </div>
        </Box>
    </Modal>
     

    <div className="applicant">
      <Sidebar/>
    <div className="applicantContainer">
      <Navbar/>
      <div className="top" >
      <h1> Applicants </h1>      

      <Box sx={{ height: 400, width: '100%' }}>
      <CustomDataGrid
        rows={filteredRows}
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
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={handleSelectionModelChange}
      />

    </Box>

      </div>
    </div>
  </div>
    </>
  )
  
}

export default Applicant