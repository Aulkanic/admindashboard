import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./scholarships.scss"
import { Box, Modal,Button,TextField, Typography, InputLabel} from "@mui/material"; 
import './scholarship.css'
import { FetchingSchoProg, CreateSchoProg, UpdateSchoProg, GenerateRenewalAcademicYear, ListOfRenewal } from "../../api/request";
import { useEffect } from "react";
import { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import swal from "sweetalert";
import {
  DataGrid, gridClasses,
} from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import '../Button style/button.css'
import { styled } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import CustomNoRowsOverlay from "../Design/Norows";
import { MdClear } from "react-icons/md";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { academicOptions } from "../../utility/academicOptions";
import { CustomModal } from '../../components/modal/customModal';
import createFormData from "../../utility/formData";

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));

const CustomDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-columnHeaders': {
    fontWeight:'bold',
    fontSize:'18px'
  },
});



const Scholarships = () => {
    const [schocat, setSchocat] = useState([]);
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [icon, setSchoimg] = useState(null);
    const [title, setSchotitle] = useState('');
    const [academicYear,setAcademicYear] = useState('')
    const [description, setSchodesc] = useState('');
    const [status, setStatusCheck] = useState('');
    const [icon1, setSchoimg1] = useState(null);
    const [titleu, setSchotitle1] = useState('');
    const [descriptionu, setSchodesc1] = useState('');
    const [statusu, setStatusCheck1] = useState('');
    const [olddata, setOlddata] = useState([]);
    const [iconprev, setSchoprev] = useState();
    const [iconprev1, setSchoprev1] = useState();
    const currentDate = dayjs();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedTabs,setSelectedTabs] = useState('')
    const [value, setValue] = useState('1');
    const [openModal,setOpenModal] = useState(false)
    const [inputValue, setInputValue] = useState('');
    const [renewFrm,setRenewFrm] = useState({
      academicYear:'',
      title:'',
      dateStart:'',
      dateEnd:'',
      status:'',
      requirements:[]
    })
    const [oldData,setOldData] = useState({
      title:'',
      dateStart:'',
      dateEnd:'',
      status:'',
      scholars:[],
      requirements:[]
    })
    const [listAcademicRenewal,setListAcademicRenewal] = useState([])

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  const handleOpen = () => {
    setOpen(true)
  };
  const handleClose = () => {
    setEndDate(null);
    setStartDate(null)
    setOpen(false)
  };
  const handleOpen1 = (data) => {
    setOlddata(data)
    setOpen1(true);
  }
  const handleClose1 = () => {
    setEndDate(null);
    setStartDate(null)
    setOpen1(false)
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: 'maxContent',
    bgcolor: 'background.paper',
    padding:'50px 10px 10px 20px',
    borderRadius:'5px'
  };
  async function fetchData() {
    try {
      setShowBackdrop(true);
      const response = await FetchingSchoProg.FETCH_SCHOPROG()
      const res = await ListOfRenewal.FETCH()
      const list = response.data.SchoCat?.map((data) =>{
        const start = dayjs(data.startDate).format('MMMM DD, YYYY');
        const end = dayjs(data.endDate).format('MMMM DD, YYYY');

        return({
          ...data,
          startDate: start,
          endDate: end
        })
      })
      setSchocat(list);
      setListAcademicRenewal(res.data)
      setShowBackdrop(false);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {

  
    fetchData()
  }, []);

  useEffect(() => {
    if (!icon) {
      setSchoprev(undefined)
        return
    }
    const objectUrl = URL.createObjectURL(icon);
    setSchoprev(objectUrl)
  
    return () => URL.revokeObjectURL(objectUrl)
  }, [icon])
  useEffect(() => {
    if (!icon1) {
      setSchoprev1(undefined)
        return
    }
    const objectUrl = URL.createObjectURL(icon1);
    setSchoprev1(objectUrl)
  
    return () => URL.revokeObjectURL(objectUrl)
  }, [icon1])

  function Create(event){
    event.preventDefault();
    if(title === '' || description === '' || status === ''){
      swal({
        text: 'Please Provide necessary Information',
        timer: 2000,
        buttons: false,
        icon: "warning",
      })
      return
    }
    if(icon === null){
      swal("Error!", "Image must be selected and have a valid file format(PNG or JPEG only).", "error");
      return
    }
    const fileExtension = icon.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg')  {
      swal({
        text: 'Please upload a PNG or JPG image only.',
        timer: 2000,
        buttons: false,
        icon: "error",
      });
      setSchoimg(null)
      return false;
    }
    const start = dayjs(startDate).format('YYYY-MM-DD')
    const end = dayjs(endDate).format('YYYY-MM-DD')
    const formData = new FormData();
    formData.append('icon',icon)
    formData.append('title',title)
    formData.append('description',description)
    formData.append('status',status)
    formData.append('startDate',start)
    formData.append('endDate',end)
    setOpen(false)
    setShowBackdrop(true);
    CreateSchoProg.CREATE_SCHOPROG(formData)
    .then(res => {
      const list = res.data.SchoCat?.map((data) =>{
        const start = dayjs(data.startDate).format('MMMM DD, YYYY');
        const end = dayjs(data.endDate).format('MMMM DD, YYYY');
        return({
          ...data,
          startDate: start,
          endDate: end
        })
      })
      setSchocat(list)
      setSchodesc('')
      setSchoimg('')
      setStatusCheck('');
      setSchotitle('')
      setStartDate(null)
      setEndDate(null)
      setShowBackdrop(false);
      swal({
        title: "Success",
        text: "Scholarship Program has been Added!",
        icon: "success",
        button: "OK",
      });
    }
     )
    .catch(err => console.log(err));
}

function Edit(event){
  event.preventDefault();

  if(icon1){
    const fileExtension = icon1.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg')  {
      swal({
        text: 'Please upload a PNG or JPG image only.',
        timer: 2000,
        buttons: false,
        icon: "error",
      });
    
      return false;
    }
  }
  const start = dayjs(startDate || olddata.startDate).format('YYYY-MM-DD')
  const end = dayjs(endDate || olddata.endDate).format('YYYY-MM-DD')
  const schoid =  olddata.schoProgId;
  const icon = icon1 || olddata.icon;
  const title1 = titleu || olddata.name;
  const description1 = descriptionu || olddata.description;
  const status1 = statusu || olddata.status; 
  const formData = new FormData();
  formData.append('title',title1);
  formData.append('description',description1);
  formData.append('status',status1);
  formData.append('icon',icon);
  formData.append('schoid',schoid);
  formData.append('academicYear',academicYear || olddata.academicYear)
  formData.append('startDate',start)
  formData.append('endDate',end)
  setOpen1(false)
  setShowBackdrop(true);
  UpdateSchoProg.UPDATE_SCHOPROG(formData)
  .then(res => {
    const list = res.data.SchoCat?.map((data) =>{
      const start = dayjs(data.startDate).format('MMMM DD, YYYY');
      const end = dayjs(data.endDate).format('MMMM DD, YYYY');
      return({
        ...data,
        startDate: start,
        endDate: end
      })
    })
    setSchocat(list)
    setStartDate(null)
    setEndDate(null)
    setShowBackdrop(false);
    swal({
      title: "Success",
      text: "Scholarship Program has been Changed!",
      icon: "success",
      button: "OK",
    });

  }
   )
  .catch(err => console.log(err));
}

const handleFileChange = (e) => {
  const file = e.target.files[0]; 
  if (file) {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg')  {
      setSchoimg(file)
    } else {
      swal({
        text: 'Please upload a PNG or JPG image only.',
        timer: 2000,
        buttons: false,
        icon: "warning",
      });
      setSchoimg(null)
      return false;
    }
  }
};
const handleEditFileChange = (e) => {
  const file = e.target.files[0]; 

  if (file) {
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
      setSchoimg1(file)
    } else {
      swal({
        text: 'Please upload a PNG or JPG image only.',
        timer: 2000,
        buttons: false,
        icon: "warning",
      });
      setSchoimg1(null)
      return false;
    }
  }
};
const handleCreateRenewal = async(e) =>{
  e.preventDefault();
  const formData = createFormData(renewFrm)
  const res =await GenerateRenewalAcademicYear.CREATE(formData)
  if(res.data){
    alert('Created Success')
    fetchData()
  }
}
let rowData;
const handleChangeTabsAca = (event,data) =>{
  setSelectedTabs(data)
  rowData= listAcademicRenewal[data]
  const req = JSON.parse(rowData?.requirements);
  setOldData({
    ...oldData,
    title:rowData?.title,
    dateStart: new Date(rowData?.dateStart).toLocaleDateString(),
    dateEnd:new Date(rowData?.dateEnd).toLocaleDateString(),
    status: rowData?.status,
    scholars: rowData?.Scholars,
    requirements: req
  })
}
const addReq = () =>{
  setRenewFrm(prev =>({...prev,requirements:[...prev.requirements,inputValue]}))
  setInputValue('');
}
const removeReq = (value) =>{
  let requirements = [...renewFrm.requirements];
  setRenewFrm(prev=> ({...prev ,requirements : requirements.filter((req)=> req !== value)}));
}
const handleInputChange = (event) => {
  setInputValue(event.target.value);
};


const columns = [
  {
    field: 'icon',
    headerName: 'Program Logo',
    width: 150, 
    renderCell: (params) => {     
      return (
            <Avatar
              alt="No Image"
              src={params.value}
              sx={{ width: 35, height: 35 }}
            />
      );},},
  {
    field: 'name',
    headerName: 'Scholarship Name',
    width: 250,
    editable: false,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 200,
    editable: false,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    editable: false,
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    width: 150,
    editable: false,
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    width: 150,
    editable: false,
  },
  {
    field: 'academicYear',
    headerName: 'Academic Year',
    width: 150,
    editable: false,
  },
  {
    field: 'insert',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <button className="btnofficials1" onClick={() => handleOpen1(params.row)}>
        Edit Details
      </button>
    ),
  },
];
const columns1 =[
  {
    field: 'Name',
    headerName: 'Name',
    width: 150,
    renderCell: (params) => (
      <p style={{margin:0}}>
        {params.row.profile[0].Name}
      </p>
    ),
  },
  {
    field: 'Scho',
    headerName: 'Scholarship',
    width: 150,
    renderCell: (params) => (
      <p style={{margin:0}}>
        {params.row.profile[0].ScholarshipApplied}
      </p>
    ),
  },
  {
    field: 'acad',
    headerName: 'Academic Year',
    width: 150,
    renderCell: (params) => (
      <p style={{margin:0}}>
        {params.row.profile[0].academicYear}
      </p>
    ),
  },
  {
    field: 'yearLevel',
    headerName: 'Year Level',
    width: 150,
    renderCell: (params) => (
      <p style={{margin:0}}>
        {params.row.profile[0].yearLevel}
      </p>
    ),
  },
  {
    field: 'gradeLevel',
    headerName: 'Grade Level',
    width: 150,
    renderCell: (params) => (
      <p style={{margin:0}}>
        {params.row.profile[0].gradeLevel}
      </p>
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    renderCell: (params) => (
      <div>
        <p style={{margin:0}}>{params.row.status}</p>
      </div>
    ),
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 150,
    renderCell: (params) => (
      <div>
        {params.row.status === 'Respond' ? 
        <button>
          View Details
        </button> : <button>Notify Scholar</button>}
      </div>
    ),
  },
]

  console.log(oldData)
  return (
    <>
  <StyledBackdrop open={showBackdrop}>
    <CircularProgress color="inherit" />
  </StyledBackdrop>
{/* Modal for Add button */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
        <div style={{margin:5,width:'100%',height:'30px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div>
                  <Typography sx={{fontSize:22,fontWeight:700,color:'#043F97',fontFamily:'Roboto Serif',lineHeight:'27px'}}>
                  Create Scholarship Program
                  </Typography>
                  <Typography sx={{fontSize:14,fontWeight:400,color:'#000000',fontFamily:'Roboto Serif',lineHeight:'16px'}}>
                  Fill up the necessary details.
                  </Typography>
                </div>
                <div style={{width:'50px',marginRight:'15px',height:'50px',marginTop:'-35px'}}>
                <button style={{height:'100%',backgroundColor:'red',color:'white',padding:'0px',width:'100%',border:'none',borderRadius:'5px'}} onClick={handleClose}>
                  <MdClear style={{fontSize:'30px',fontWeight:'700'}}/>
                </button>
                </div>
         </div>
        <div style={{width:'100%',height:'80%',display:'flex',marginTop:'20px'}}>
              
              <div style={{width:'40%',height:'100%'}}>
              <div style={{border:'2px solid #dcdcdc',height:'300px',display:'flex',borderRadius:'5px',justifyContent:'center',alignItems:'center'}}>
                {!iconprev ? (
                  <Typography sx={{textAlign:'center',marginBottom:'20px',fontSize:'25px',fontWeight:'bold'}}>
                    Scholarship Logo<br/> Preview
                  </Typography>
                ) : (
                <img style={{width: '100%',minHeight:'150px',objectFit:'contain',height:'100%'}} className='previmg' src={iconprev} alt=""/>
                )}
              </div>
                  <Button sx={{padding:'10px 0px 10px 0px',width:'100%'}}>
                  <TextField sx={{backgroundColor:'whitesmoke',border:'none',width:'100%'}}
                  type='file' accept=".jpg, .jpeg, .png" id="input-with-sx" label="" variant="outlined" fullWidth
                  onChange={handleFileChange}/>
                  </Button>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Typography sx={{fontSize:'20px',fontWeight:'bold'}}>Scholarship Logo</Typography>
                </div>
              </div>
              <Card sx={{width:'55%',marginLeft:'10px',height:'100%'}} elevation={0}>
                <div style={{width:'100%',display:'flex',flexDirection:'column',gap:'10px'}}>
                  <Box sx={{ display: 'flex'}}>
                  <div style={{width:'110px',display:'flex',justifyContent:'center',alignItems:'center',height:'59px',flexDirection:'column',marginRight:'5px'}}>
                  <InputLabel sx={{color:'black',fontWeight:'bold'}}>Scholarship</InputLabel>
                  <InputLabel sx={{color:'black',fontWeight:'bold'}}>Name</InputLabel>
                  </div> 
                  <div style={{width:'100%'}}>
                  <TextField fullWidth id="input-with-sx" variant="outlined" size="large"
                    onChange={(e) => setSchotitle(e.target.value)}/>
                  </div>
                  </Box>
                  <Box sx={{ display: 'flex',flexWrap:'nowrap'}}>
                  <div style={{width:'110px',display:'flex',justifyContent:'center',alignItems:'center',height:'59px',flexDirection:'column',marginRight:'5px'}}>
                  <InputLabel sx={{color:'black',fontWeight:'bold'}}>Start-End</InputLabel>
                  <InputLabel sx={{color:'black',fontWeight:'bold'}}>Date</InputLabel>
                  </div> 
                  <div style={{width:'100%',display:'felx',flexWrap:'wrap',gap:'2px'}}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateField', 'DateField']}>
                    <DateField
                      label="Start Date"
                      sx={{flex:1}}
                      slotProps={{
                        textField: {
                          size: "large",
                          error: false,
                        },
                      }}
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      minDate={currentDate}
                      format="YYYY-MM-DD"
                    />
                    <DateField
                      label="End Date"
                      sx={{flex:1}}
                      slotProps={{
                        textField: {
                          size: "large",
                          error: false,
                        },
                      }}
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      minDate={currentDate}
                      format="YYYY-MM-DD"
                    />
                  </DemoContainer>
                </LocalizationProvider>
                  </div>
                  </Box>
                  <Box sx={{ display: 'flex',flexWrap:'nowrap'}}>
                    <div style={{width:'110px',display:'flex',justifyContent:'center',alignItems:'center',height:'59px',flexDirection:'column',marginRight:'5px'}}>
                    <InputLabel sx={{color:'black',fontWeight:'bold'}}>Academic</InputLabel>
                    <InputLabel sx={{color:'black',fontWeight:'bold'}}>Year</InputLabel>
                    </div> 
                    <div style={{width:'100%'}}>
                    <TextField fullWidth id="input-with-sx" variant="outlined" size="large"
                      onChange={(e) => setAcademicYear(e.target.value)}/>
                    </div>
                  </Box>
                  <div style={{display: 'flex',margin:'10px 0px 10px 0px'}}>
                  <div style={{width:'110px',display:'flex',justifyContent:'center',alignItems:'center',marginRight:'5px'}}>
                  <InputLabel sx={{color:'black',fontWeight:'bold'}}>Status</InputLabel>
                  </div>
                  <div style={{border:'2px solid #dcdcdc',width:'100%',paddingLeft:'20px',borderRadius:'5px',height:'58px',paddingTop:'6px'}}>
                  <RadioGroup
                      row
                      sx={{width:'100%'}}
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={olddata.status}
                      value={status}
                      onChange={(e) =>{
                      const stat = e.target.value;
                        setStatusCheck(stat);
                      }}  
                    >
                
                  <FormControlLabel value="Open" control={<Radio />} label="Open"/>
                  <FormControlLabel value="Under Evaluation" control={<Radio />} label="Under Evaluation" sx={{margin:'0px 50px 0px 50px'}}/>
                  <FormControlLabel value="Paused" control={<Radio />} label="Paused"/>
                  </RadioGroup>
                  </div>

                  </div>
                  <div style={{ display: 'flex'}}>
                  <div style={{width:'110px',display:'flex',justifyContent:'center',alignItems:'center',height:'59px',flexDirection:'column',marginRight:'5px'}}>
                  <InputLabel sx={{color:'black',fontWeight:'bold'}}>Description</InputLabel>
                  </div> 
                  <div  style={{width:'100%'}}>
                  <TextField multiline
                  onChange={(e) => setSchodesc(e.target.value)}
                  value={description}
                    rows={9} fullWidth id="input-with-sx" variant="outlined" />
                  </div>
                </div>
                </div>
              </Card>
              
        </div> 
        <div style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}}>
                <button style={{marginRight:'10px'}} className='btnofficials2' onClick={handleClose}>Cancel</button>
                <button className="btnofficials" onClick={Create}>Create</button>
        </div>          
        </Box>
      </Modal>
{/* Modal for Edit button */}
      <Modal
        className="modalAddbtn"
        open={open1}
        onClose={handleClose1}
      >
      <Box sx={style}>
         <div style={{margin:5,width:'100%',height:'30px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div>
                  <Typography sx={{fontSize:22,fontWeight:700,color:'#043F97',fontFamily:'Roboto Serif',lineHeight:'27px'}}>
                  Edit Scholarship Program details
                  </Typography>
                  <Typography sx={{fontSize:14,fontWeight:400,color:'#000000',fontFamily:'Roboto Serif',lineHeight:'16px'}}>
                  Fill up the necessary details.
                  </Typography>
                </div>
                <div style={{width:'50px',marginRight:'15px',height:'50px',marginTop:'-35px'}}>
                <button style={{height:'100%',backgroundColor:'red',color:'white',padding:'0px',width:'100%',border:'none',borderRadius:'5px'}} onClick={handleClose1}>
                  <MdClear style={{fontSize:'30px',fontWeight:'700'}}/>
                </button>
                </div>
         </div>
            <div style={{width:'100%',height:'80%',display:'flex',marginTop:'20px'}}>
            <div style={{width:'40%',height:'100%'}}>
              <div style={{border:'2px solid #dcdcdc',height:'300px',display:'flex',borderRadius:'5px',justifyContent:'center',alignItems:'center'}}>
                {icon1 ? (
                  (<img style={{width: '100%',minHeight:'150px',objectFit:'cover',height:'100%'}} className='previmg' src={iconprev1} alt=''/>)
                ) : (
                <img style={{width: '100%',minHeight:'150px',objectFit:'cover',height:'100%'}} className='previmg' src={olddata.icon} alt=""/>
                )}
              </div>
                  <Button sx={{padding:'10px 0px 10px 0px',width:'100%'}}>
                  <TextField sx={{backgroundColor:'whitesmoke',border:'none',width:'100%'}}
                  type='file' accept=".jpg, .jpeg, .png" id="input-with-sx" label="" variant="outlined" fullWidth
                  onChange={handleEditFileChange}/>
                  </Button>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Typography sx={{fontSize:'20px',fontWeight:'bold'}}>Scholarship Logo</Typography>
                </div>
            </div>             
            <Card sx={{width:'55%',marginLeft:'10px',height:'100%'}} elevation={0}>
                <div style={{width:'100%',display:'flex',flexDirection:'column',gap:10}}>
                <Box sx={{ display: 'flex'}}>
                  <div style={{width:'110px',display:'flex',justifyContent:'center',alignItems:'center',height:'59px',flexDirection:'column',marginRight:'5px'}}>
                  <InputLabel sx={{color:'black',fontWeight:'bold'}}>Scholarship</InputLabel>
                  <InputLabel sx={{color:'black',fontWeight:'bold'}}>Name</InputLabel>
                  </div> 
                  <div style={{width:'100%'}}>
                  <TextField fullWidth placeholder={olddata.name} value={titleu || olddata.name} id="input-with-sx" variant="outlined" size="large"
                    onChange={(e) => setSchotitle1(e.target.value)}/>
                  </div>
                </Box>
                <Box sx={{ display: 'flex'}}>
                  <div style={{width:'110px',display:'flex',justifyContent:'center',alignItems:'center',height:'59px',flexDirection:'column',marginRight:'5px'}}>
                  <InputLabel sx={{color:'black',fontWeight:'bold'}}>Start-End</InputLabel>
                  <InputLabel sx={{color:'black',fontWeight:'bold'}}>Date</InputLabel>
                  </div> 
                  <div style={{width:'100%',display:'felx',flexWrap:'wrap',gap:'2px'}}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateField', 'DateField']}>
                    <DateField
                      label="Start Date"
                      sx={{flex:1}}
                      slotProps={{
                        textField: {
                          size: "large",
                          error: false,
                        },
                      }}
                      value={startDate || dayjs(olddata.startDate)}
                      onChange={(newValue) => setStartDate(newValue)}
                      minDate={currentDate}
                      format="YYYY-MM-DD"
                    />
                    <DateField
                      label="End Date"
                      sx={{flex:1}}
                      slotProps={{
                        textField: {
                          size: "large",
                          error: false,
                        },
                      }}
                      value={endDate || dayjs(olddata.endDate)}
                      onChange={(newValue) => setEndDate(newValue)}
                      minDate={currentDate}
                      format="YYYY-MM-DD"
                    />
                  </DemoContainer>
                </LocalizationProvider>
                  </div>
                </Box>
                <Box sx={{ display: 'flex',flexWrap:'nowrap'}}>
                    <div style={{width:'110px',display:'flex',justifyContent:'center',alignItems:'center',height:'59px',flexDirection:'column',marginRight:'5px'}}>
                    <InputLabel sx={{color:'black',fontWeight:'bold'}}>Academic</InputLabel>
                    <InputLabel sx={{color:'black',fontWeight:'bold'}}>Year</InputLabel>
                    </div> 
                    <div style={{width:'100%'}}>
                    <TextField fullWidth id="input-with-sx" value={academicYear || olddata.academicYear} variant="outlined" size="large"
                      onChange={(e) => setAcademicYear(e.target.value)}/>
                    </div>
                  </Box>
                <div style={{display: 'flex',margin:'10px 0px 10px 0px'}}>
                  <div style={{width:'110px',display:'flex',justifyContent:'center',alignItems:'center',marginRight:'5px'}}>
                  <InputLabel sx={{color:'black',fontWeight:'bold'}}>Status</InputLabel>
                  </div>
                  <div style={{border:'2px solid #dcdcdc',width:'100%',paddingLeft:'20px',borderRadius:'5px',height:'58px',paddingTop:'6px'}}>
                  <RadioGroup
                      row
                      sx={{width:'100%'}}
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={olddata.status}
                      value={statusu || olddata.status}
                      onChange={(e) =>{
                      const stat = e.target.value;
                        setStatusCheck1(stat);
                      }}  
                    >
                
                  <FormControlLabel value="Open" control={<Radio />} label="Open"/>
                  <FormControlLabel value="Under Evaluation" control={<Radio />} label="Under Evaluation" sx={{margin:'0px 50px 0px 50px'}}/>
                  <FormControlLabel value="Paused" control={<Radio />} label="Paused"/>
                  </RadioGroup>
                  </div>
                </div>
                <div style={{ display: 'flex'}}>
                  <div style={{width:'110px',display:'flex',justifyContent:'center',alignItems:'center',height:'59px',flexDirection:'column',marginRight:'5px'}}>
                  <InputLabel sx={{color:'black',fontWeight:'bold'}}>Description</InputLabel>
                  </div> 
                  <div  style={{width:'100%'}}>
                  <TextField multiline
                  onChange={(e) => setSchodesc1(e.target.value)}
                  placeholder={olddata.description}
                  value={descriptionu || olddata.description}
                    rows={9} fullWidth id="input-with-sx" variant="outlined" />
                  </div>
                </div>
                </div>
            </Card>
            </div>
            <div style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}}>
                <button style={{marginRight:'10px'}} onClick={handleClose1} className="btnofficials2">Cancel</button>
                <button className="btnofficials1" onClick={Edit}>Save</button>
            </div>
      </Box>
      </Modal>
      <CustomModal
      open={openModal}
      handleClose={() => setOpenModal(false)}
      title={'Create Payout'}
      content={
        <form action="" style={{display:'flex',gap:'14px',flexWrap:'wrap',flexDirection:'column'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',flexDirection:'column'}}>
        <TextField  onChange={(e) => {setRenewFrm(prev =>({...prev,title:e.target.value}))}}
        fullWidth sx={{marginTop:'6px',flex:1}} size="small" id="outlined-basic" label="Program Name" variant="outlined"/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer sx={{flex:1,width:'100%'}} components={['DateField', 'DateField']}>
            <DateField
              slotProps={{
                textField: {
                  size: "small",
                  error: false,
                },

              }}
              sx={{width:'100%'}}
              label="Start Date"
              onChange={(val) =>{setRenewFrm(prev =>({...prev,dateStart:dayjs(val)}))}}
              format="MM-DD-YYYY"
            />
            <DateField
              slotProps={{
                textField: {
                  size: "small",
                  error: false,
                },
              }}
              sx={{width:'100%'}}
              label="End Date"
              onChange={(val) =>{setRenewFrm(prev =>({...prev,dateEnd:dayjs(val)}))}}
              format="MM-DD-YYYY"
            />
          </DemoContainer>
        </LocalizationProvider>
        </div>
        <div style={{display:'flex',gap:10}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Academic Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Academic Year"
            size='small'
            onChange={(e) => {setRenewFrm(prev =>({...prev,academicYear:e.target.value}))}}
          >
            {academicOptions()?.map(items => <MenuItem value={items}>{items}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Status"
            size='small'
            onChange={(e) => {setRenewFrm(prev =>({...prev,status:e.target.value}))}}
          >
           <MenuItem value={'Ongoing'}>Ongoing</MenuItem>
           <MenuItem value={'End'}>End</MenuItem>
           <MenuItem value={'Paused'}>Paused</MenuItem>
          </Select>
        </FormControl>
        </div>
        <div>
          
          <TextField 
            sx={{marginTop:'6px',width:'100%'}} value={inputValue} onChange={handleInputChange} size="small" id="outlined-basic" label="Requirement Name" variant="outlined"/>
          <button style={{marginTop:'10px'}}
          type="button" onClick={() =>addReq()}>
            Add Requirements
          </button>
        </div>
        <p style={{margin:0}}>List of Requriements:</p>
        <div style={{display:'flex',flexDirection:"column",gap:10}}>
      
            {renewFrm.requirements?.map((data,idx) =>{
              return(
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}
                 key={idx}>
                  <p style={{margin:0}}>{data}</p>
                  <button type="button" onClick={() => removeReq(data)}>remove</button>
                </div>
              )
            })}
          </div>
        <button onClick={handleCreateRenewal}>
          Submit
        </button>
      </form>}
    />
    <div className="scholarships">
        <Sidebar/>
    <div className="scholarshipsContainer">
        <Navbar/>
        <div>
        <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Scholarship Application" value="1" />
            <Tab label="Renewal Application" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
        <div style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 10px 0px 10px'}}>
                <p className="scorecardh">Scholarships Program 
                </p>
                <button className='btnofficials1' onClick={handleOpen}>Add</button>
                </div>
                <div className="dataGridCon">
                <CustomDataGrid
                  sx={{height:'100%'}}
                  rows={schocat}
                  columns={columns}
                  getRowId={(row) => row.schoProgId}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 25,
                      },
                    },
                  }}
                  slots={{
                    noRowsOverlay: CustomNoRowsOverlay,
                  }}
                  pageSizeOptions={[25]}  
                  disableRowSelectionOnClick
                />
                </div>         
        </TabPanel>
        <TabPanel value="2">
          <div>
       
            <div>
            <h2>Renewal Application</h2>
            <button onClick={() => {setOpenModal(true)}}>Create Renewal</button>
            </div>
            <div>
            <Tabs
              variant="scrollable"
              value={selectedTabs}
              onChange={handleChangeTabsAca}
              scrollButtons
              aria-label="visible arrows tabs example"
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  '&.Mui-disabled': { opacity: 0.3 },
                },
              }}
            >
              {listAcademicRenewal.length > 0 && listAcademicRenewal.map((data,idx) =>{
                return(
                  <Tab key={idx} label={data.AcademicYear} />
                )
              })}
            </Tabs>                
            </div>
            <form action="" style={{display:'flex',gap:'14px',flexWrap:'wrap',flexDirection:'column',marginTop:"16px",marginBottom:'16px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <TextField InputProps={{
                  readOnly: true,
                }}
               sx={{marginTop:'6px',width:'100%'}} value={oldData?.title} size="small" id="outlined-basic" label="Program Name" variant="outlined"/>
              <TextField  InputProps={{
                  readOnly: true,
                }}
               sx={{marginTop:'6px',width:'100%'}} value={oldData.dateStart} size="small" id="outlined-basic" label="Date Start" variant="outlined"/>
              <TextField InputProps={{
                  readOnly: true,
                }}
               sx={{marginTop:'6px',width:'100%'}} value={oldData.dateEnd} size="small" id="outlined-basic" label="Date End" variant="outlined"/>
              
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Status"
                  size='small'
                  value={oldData?.status}
                  onChange={handleChange}
                >
                 <MenuItem value={'Ongoing'}>Ongoing</MenuItem>
                 <MenuItem value={'End'}>End</MenuItem>
                 <MenuItem value={'Paused'}>Paused</MenuItem>
                </Select>
              </FormControl>
              </div>
              <h5 style={{margin:0}}>List of Requirements:</h5>
              <ul>
                {oldData.requirements?.map((data,idx) =>{
                  return(
                    <li style={{margin:0}} key={idx}>{data}</li>
                  )
                })}
              </ul>
            </form>
            <div>
            <DataGrid
                rows={oldData.scholars ?? []}
                columns={columns1}
                getRowId={(row) => row.scholarCode}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                getRowHeight={() => 'auto'}
                sx={{
                  [`& .${gridClasses.cell}`]: {
                    py: 1,
                  },
                }}
                checkboxSelection
                disableRowSelectionOnClick
              />               
            </div>
          </div>
        </TabPanel>
      </TabContext>
    </Box>         

          </div>
        </div>
    </div>
  </>
  )
}

export default Scholarships