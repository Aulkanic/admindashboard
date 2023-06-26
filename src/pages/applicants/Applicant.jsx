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
          CheckingSubs, CheckingApplicants,UserScore,ListofReq,FailedUser } from "../../api/request";
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
const check = async (data, index) => { 
  console.log(data)
  console.log(applicantsInfo)
  const requirement_Name = data.requirement_Name;
  console.log(status[requirement_Name])
  console.log(Comments[requirement_Name])
  const applicantNum = applicantsInfo[0].applicantCode;
  const adminName = user.name;
  const applicantCode = selectedInfo.applicantCode;
  const formData = new FormData();
  formData.append('Comments', Comments[requirement_Name]);
  formData.append('requirement_Name', requirement_Name);
  formData.append('applicantCode', applicantNum);
  formData.append('status', status[requirement_Name]);
  formData.append('adminName', adminName);

  try {
    const res = await CheckingSubs.CHECK_SUB(formData);

    console.log(res);
    swal('Save');
  } catch (err) {
    console.log(err);
  }
};
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

console.log(applicantsDocs)
 const docusubmitted = applicantsDocs?.map((data, index) => {
  const { requirement_Name, File } = data;
  const handleStatusChange = (e) => {
    const { value } = e.target;
    setStatusCheck((prevStatus) => ({
      ...prevStatus,
      [requirement_Name]: value || prevStatus[requirement_Name] || 'Unchecked',
    }));
  };

  const handleCommentsChange = (e) => {
    const { value } = e.target;
    setComments((prevComments) => ({
      ...prevComments,
      [requirement_Name]: value || prevComments[requirement_Name] || 'No comments'
    }));
  };

  return (
    <>
      <div className="PA">
        <div className="Docuinfo">
          <div>
            <Card elevation={5}>
              <div className="sublist" key={index}>
                <div>
                  <div className="actions">
                    <h1>{requirement_Name}</h1>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Status
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={status[requirement_Name] || 'Unchecked'}
                        onChange={handleStatusChange}
                      >
                        <FormControlLabel
                          value="Approved"
                          control={<Radio checked={status[requirement_Name] === 'Approved'}/>}
                          label="Approved"
                        />
                        <FormControlLabel
                          value="Reject"
                          control={<Radio checked={status[requirement_Name] === 'Reject'} />}
                          label="Reject"
                        />
                        <FormControlLabel
                          value="For Further Evaluation"
                          control={<Radio checked={status[requirement_Name] === 'For Further Evaluation'} />}
                          label="For Further Evaluation"
                        />
                      </RadioGroup>
                    </FormControl>
                    <br />
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Comments
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={Comments[requirement_Name] || 'No comments'}
                        onChange={handleCommentsChange}
                      >
                        <FormControlLabel
                          value="Blurred Images"
                          control={<Radio checked={Comments[requirement_Name] === 'Blurred Images'} />}
                          label="Blurred Images"
                        />
                        <FormControlLabel
                          value="Invalid File Image"
                          control={<Radio checked={Comments[requirement_Name] === 'Invalid File Image'} />}
                          label="Invalid File Image"
                        />
                        <FormControlLabel
                          value="No Comments"
                          control={<Radio checked={Comments[requirement_Name] === 'No Comments'} />}
                          label="No Comments"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div>
                    <button onClick={() => check(data, index)}> Save </button>
                  </div>
                </div>
                <div className="subdocsprev">
                  <img
                    style={{ width: '70%', height: '80%' }}
                    src={File}
                    alt=""
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
});
      console.log(post)
      const filteredRows = post?.filter((row) => row.status === 'Applicants' || row.status ==='Applicant');
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