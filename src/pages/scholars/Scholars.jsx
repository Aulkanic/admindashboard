import './scholars.scss';
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { Tabs, Tab, Box, Modal, Card } from "@mui/material"; 
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DataGrid} from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { FetchingBmccScho, FetchingBmccSchoinfo,ScholarStand } from '../../api/request';
import './scholar.css'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { green, red } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import swal from 'sweetalert';


const OnlineBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.mode === 'light' ? green[500] : green[700], // Green color when online
    color: theme.palette.mode === 'light' ? green[500] : green[700],
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    width: '30px',
    height: '30px',
    borderRadius: '50%'
  },
}));

const OfflineBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.mode === 'light' ? red[500] : red[700], // Red color when offline
    color: theme.palette.mode === 'light' ? red[500] : red[700],
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    width: '30px',
    height: '30px',
    borderRadius: '50%'
  },
}));

const Scholars = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState(0);
  const [schoinf1,setSchoInf1] = useState([]);
  const [schoinf2,setSchoInf2] = useState([]);
  const [schoinf3,setSchoInf3] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [reason,setReason] = useState('');

  useEffect(() => {
    async function Fetch(){
      const scholars = await FetchingBmccScho.FETCH_SCHOLARS()
      console.log(scholars)
      setData(scholars.data.Scholars)
    }
    Fetch();
  }, []);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '75%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
  };
  const stylediv = {
    width: '100%',
    fontSize:'20px',
    textAlign:'center'
  };
  
  const view = async(data) =>{
    console.log(data)
    setOpen(true)
    const applicantNum = data.applicantNum
    const response = await FetchingBmccSchoinfo.FETCH_SCHOLARSINFO(applicantNum)
    console.log(response)
    setSchoInf1(response.data.ScholarInf.results1[0])
    setSchoInf2(response.data.ScholarInf.results2[0])
    setSchoInf3(response.data.ScholarInf.results3)
  }

  const columns = [
    { 
      field: 'scholarId', 
      headerName: 'Scholar ID',
      width: 79
     },
     {
       field: 'scholarCode', 
        headerName: 'Scholar Code',
      width: 100
      },
    {
      field: 'scholarshipApplied',
      headerName: 'Scholarship Applied',
      width: 165,
      editable: false,
    },
    {
      field: 'Name',
      headerName: 'Name',
      width: 230,
      editable: false,
    },
    {
      field: 'yearLevel',
      headerName: 'Year Level',
      width: 120,
      editable: false,
    },
    {
      field: 'Baranggay',
      headerName: 'Baranggay',
      width: 120,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 80,
      editable: false,
    },
    {
      field: 'Batch',
      headerName: 'Batch',
      width: 80,
      editable: false,
    },
    {
      field: 'insert',
      headerName: 'Actions',
      width: 90,
      renderCell: (params) => (
        <button className="viewBtnScholars" onClick={() => view(params.row)}>View</button>
      ),
    },
    {
      field: 'renewdocs',
      headerName: 'Renewal Submitted',
      width: 160,
    },
    {
      field: 'remarks',
      headerName: 'Account Status',
      width: 110,
      renderCell: (params) => (
        <>
        <div style={{display:'flex',flexDirection:'column'}}>
        <button onClick={() => handleButtonClick(params.row.applicantNum)}>
          Active
        </button>
        <button onClick={() => handleButtonClick(params.row.applicantNum)}>
          Hold
        </button>
        <button onClick={() => handleButtonClick(params.row.applicantNum)}>
          Dsiqualified
        </button>
        </div>
        </>
      ),
    },
    {
      field: 'renewdocs',
      headerName: 'Renewal Submitted',
      width: 160,
    },
    {
      field: 'remarks',
      headerName: 'Account Status',
      width: 110,
      renderCell: (params) => (
        <>
        <div style={{display:'flex',flexDirection:'column'}}>
        <button onClick={() => handleButtonClick(params.row.applicantNum)}>
          Active
        </button>
        <button onClick={() => handleButtonClick(params.row.applicantNum)}>
          Hold
        </button>
        <button onClick={() => handleButtonClick(params.row.applicantNum)}>
          Dsiqualified
        </button>
        </div>
        </>
      ),
    },

  ];
  const handleTabClick = (newValue) => {
    setValue(newValue);
  };
  const OnlineAvatar = ({ user}) => {
    console.log(user)
    return (
      <>
        {user.isOnline === 'True' ? (
          <OnlineBadge overlap="circular" variant="dot" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Avatar sx={{ width: '150px', height: '150px', borderRadius: '50%' }} alt={user.Name} src={user.profile} />
          </OnlineBadge>
        ) : (
          <OfflineBadge overlap="circular" variant="dot" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Avatar sx={{ width: '150px', height: '150px', borderRadius: '50%',border:'2px solid black' }} alt={user.Name} src={user.profile} />
          </OfflineBadge>
        )}
      </>
    );
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const requirements = schoinf3?.map((docu, index) => {
      return (
          <>
          <div className='doclistschocont'>
          <Box sx={{width:'100%', height:'100%'}}>
            <Card elevated={15}>
          <div className='reqlistcontainer' key={index}>
          <div className="requirelist">
            <div className="requireprev">   
            <img style={{width:'50px'}} src={docu.File} alt='No Image'/>
            </div>
            <div className='userlistreq'>
          <label htmlFor="">{docu.requirement_Name}</label>
          </div>
          </div>
          {(index + 1) % 4 === 0 && <br />}
          </div>
          </Card>
          </Box>
          </div>
          </>
          )
 

    });
    const handleButtonClick = async (data) => {
        const res = await FetchingBmccSchoinfo.FETCH_SCHOLARSINFO(applicantNum)
        console.log(res)
        const email = res.data.ScholarInf.results1[0].email;
        const standing = 'Active'
        const applicantNum = data.applicantNum
        console.log(standing,applicantNum,reason,email)
        const formData = new FormData();
        formData.append('standing',standing);
        formData.append('applicantNum',applicantNum);
        formData.append('reason',reason)
        formData.append('email',email)
       const response = await ScholarStand.UPDATE_SCHOSTAND(formData);
        console.log(response);
        if(response.data.success === 1){
          swal('Standing Update')
          setData(response.data.result)
        }
        else{
          swal('Something went Wrong')
        }
    }

  return (
    <>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
      <Box sx={style}>
        <div className='hbtnschocon'>
          <button onClick={handleClose}>X</button>
        </div>
        <div className="schoinfocon">
          <div className="leftshco">
            <div className="profilescho">
              <div className="schopic">
              <OnlineAvatar user={schoinf2} />
              </div>
              <div className="schopicdet">
                <p>{schoinf1.Name}</p>
                <p>{schoinf1.email}</p>
              </div>
            </div>
            <div className="scholog">
            <List sx={stylediv} component="nav" aria-label="mailbox folders">
              <ListItem button onClick={() => handleTabClick(0)}>
                <ListItemText primary="Personal Information" />
              </ListItem>
              <Divider />
              <ListItem button onClick={() => handleTabClick(1)}>
                <ListItemText primary="Scholar Information" />
              </ListItem>
              <Divider light />
              <ListItem button onClick={() => handleTabClick(2)}>
                <ListItemText primary="Documents List" />
              </ListItem>
            </List>
          </div>
          </div>

          <div className="rigthscho">
            {value === 0 && <div>
                <h1 style={{textAlign: 'center'}}>PERSONAL INFORMATION</h1>
                <div className='peschocoon'>
              <Card elevation={5} sx={{ width:'90%', margin:'10px', height:'100%' }}>
              <CardContent>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Name: {schoinf1.Name}
                </Typography>
                <Typography variant="h5" component="div">
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Age: {schoinf1.age}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Birthday: {schoinf1.birthday}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Birth of Place: {schoinf1.birthPlace}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Citizenship: {schoinf1.citizenship}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Contact Number: {schoinf1.contactNum}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Address: {schoinf1.caddress}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary" gluttterBottom>
                  Baranggay: {schoinf1.baranggay}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Current School Enrolled: {schoinf1.currentSchool}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Year Level: {schoinf1.currentYear}
                </Typography>
              </CardContent>
              </Card>
                </div>
              </div>}
              {value === 1 && 
              
              <div>
                <h1 style={{textAlign: 'center'}}>SCHOLAR INFORMATION</h1>
                <div className='peschocoon'>
              <Card elevation={5} sx={{ width:'90%', margin:'10px', height:'100%' }}>
              <CardContent>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Name: {schoinf1.Name}
                </Typography>
                <Typography variant="h5" component="div">
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Applicant Code: {schoinf2.applicantCode}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Scholar Code: {schoinf2.scholarCode}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Birth of Place: {schoinf1.birthPlace}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Batch: {schoinf2.Batch}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Contact Number: {schoinf1.contactNum}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Email: {schoinf2.email}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary" gluttterBottom>
                  Baranggay: {schoinf1.baranggay}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Status: {schoinf2.status}
                </Typography>
                <Typography sx={{ fontSize: 23 }} color="text.secondary">
                  Year Level: {schoinf1.currentYear}
                </Typography>
              </CardContent>
              </Card>
                </div>
              </div>}

              {value === 2 && <><h1>DOCUMENTS</h1><div className='doculistscho'>
                {requirements}
                </div></>}
          </div>
        </div>
      </Box>
    </Modal>

    <Modal             
    open={open1}
    onClose={handleClose1}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">
      <Box sx={style}>
      <div className='hbtnschocon'>
          <button onClick={handleClose1}>X</button>
        </div>

      </Box>
    </Modal>
    <div className="scholars">
        <Sidebar/>
        <div className="scholarsContainer">
            <Navbar/>
            <div className="top">
            
    <h1>Scholars</h1>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.scholarId}
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
        </div>
    </div>
    </>
  )
}

export default Scholars