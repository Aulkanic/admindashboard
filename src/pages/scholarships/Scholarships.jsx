import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./scholarships.scss"
import { Paper, Box, Modal,Button,TextField, Typography} from "@mui/material"; 
import './scholarship.css'
import { FetchingSchoProg, CreateSchoProg, UpdateSchoProg,ListAccess } from "../../api/request";
import { useEffect } from "react";
import { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import swal from "sweetalert";
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import { useContext } from "react";
import { admininfo } from "../../App";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import '../Button style/button.css'
import { styled, ThemeProvider, createTheme } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';

const theme = createTheme();
const StyledBackdrop = styled(Backdrop)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;

const CustomDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-columnHeaders': {
    color: 'black', 
  },

});
const StyledButton = styled(Button)`
  && {
    float: right;
    background-color: red;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;


const Scholarships = () => {
  const { loginUser,user } = useContext(admininfo);
    const [schocat, setSchocat] = useState([]);
    const [access,setAccess] = useState([])
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [icon, setSchoimg] = useState('');
    const [title, setSchotitle] = useState('');
    const [description, setSchodesc] = useState('');
    const [status, setStatusCheck] = useState('');
    const [icon1, setSchoimg1] = useState('');
    const [titleu, setSchotitle1] = useState('');
    const [descriptionu, setSchodesc1] = useState('');
    const [statusu, setStatusCheck1] = useState('');
    const [olddata, setOlddata] = useState([]);
    const [iconprev, setSchoprev] = useState();
    const [iconprev1, setSchoprev1] = useState();
    const [accessList,setAccesslist] = useState([]);

  const handleOpen = () => {
    if(user.jobDescription !== 'Admin'){
      if(user.jobDescription !== accessList.schoSec){
        swal({
          text: 'UnAuthorized Access',
          timer: 2000,
          buttons: false,
          icon: "error",
        })
        return
      }else{
        setOpen(true)
      }
    }
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  const handleOpen1 = (data) => {
    const isValueIncluded = access[0]?.sectionId.includes('Scholarship Program');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    setOlddata(data)
    setOpen1(true);
  }
  const handleClose1 = () => setOpen1(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '90%',
    bgcolor: 'background.paper',
    overflow: 'auto',
    padding:'10px',
    borderRadius:'10px'
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowBackdrop(true);
        const response = await Promise.all([
          FetchingSchoProg.FETCH_SCHOPROG(),
          ListAccess.ACCESS()
        ]);
        let acc = await ListAccess.ACCESS()
        const empacc = acc.data.result?.filter(data => data.employeeName === user.name)
        setAccess(empacc)
        setSchocat(response[0].data.SchoCat);
        setAccesslist(response[1].data.result[0])
        setShowBackdrop(false);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
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
    const isValueIncluded = access[0]?.sectionId.includes('Scholarship Program');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    if(icon === '' || title === '' || description === '' || status === ''){
      swal({
        text: 'Please Provide necessary Information',
        timer: 2000,
        buttons: false,
        icon: "warning",
      })
      return
    }
    const data = {icon,title,description,status};
    setShowBackdrop(true);
    CreateSchoProg.CREATE_SCHOPROG(data)
    .then(res => {
      setSchocat(res.data.Scholarship)
      setSchodesc('')
      setSchoimg('')
      setStatusCheck('');
      setSchotitle('')
      setOpen(false)
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
  const isValueIncluded = access[0]?.sectionId.includes('Scholarship Program');
  if(!isValueIncluded){
    swal({
      text: 'UnAuthorized Access',
      timer: 2000,
      buttons: false,
      icon: "error",
    })
    return
  }
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
  UpdateSchoProg.UPDATE_SCHOPROG(formData)
  .then(res => {
    setSchocat(res.data.Scholarship)
    setOpen(false)
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

    const columns = [
      { field: 'schoProgId', headerName: 'Scholarship ID', width: 150 },
      {
        field: 'icon',
        headerName: 'Scholarship Logo',
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
        width: 270,
        editable: false,
      },
      {
        field: 'description',
        headerName: 'Description',
        width: 300,
        editable: false,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 170,
        editable: false,
      },
      {
        field: 'insert',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
          <Button className="myButton1" variant='contained' onClick={() => handleOpen1(params.row)}>
            Edit Details</Button>
        ),
      },
    ];

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
        <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column'}}>
            <div style={{width:'100%'}}>
              <StyledButton sx={{float:'right'}} variant="contained" onClick={handleClose}> X </StyledButton>
            </div>
            <div style={{width:'100%',height:'70px'}}>
            <Typography sx={{fontSize:'30px',fontWeight:'700',textAlign:'center',color:'#666'}}>Create Scholarship Program</Typography>
            </div>
            <div style={{width:'100%',height:'80%',display:'flex',justifyContent:'center',alignItems:'center'}}>
              
              <div style={{width:'20%'}}>
                <Typography sx={{textAlign:'center',marginBottom:'20px'}}>Scholarship Logo Preview</Typography>
                  <img style={{width: '100%'}} className='previmg' src={iconprev} alt=''/>
              </div>
                <Card sx={{width:'75%',marginLeft:'10px',paddingTop:'10px'}} elevation={2}>
                <div style={{width:'100%'}}>
                  <Typography sx={{marginLeft:'20px'}}>Scholarship Logo</Typography>
                  <Button>
                  <TextField sx={{backgroundColor:'whitesmoke',border:'none',marginLeft:'10px'}}
                  type='file' id="input-with-sx" label="" variant="outlined" 
                  onChange={(e) =>setSchoimg(e.target.files[0])}/>
                  </Button><br />
                  <CardContent>
                  <Typography variant="h5" component="div">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <TextField fullWidth placeholder={olddata.name} id="input-with-sx" label="Scholarship Name" variant="outlined" 
                    onChange={(e) => setSchotitle(e.target.value)}/>
                </Box>
                  </Typography>
                </CardContent>
                  <div style={{width:'100%'}}>
                  <FormLabel sx={{marginLeft:'20px'}} id="demo-row-radio-buttons-group-label" className="status">Status</FormLabel>
                  <RadioGroup
                      row
                      sx={{marginLeft:'20px'}}
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={olddata.status}
                      value={status}
                      onChange={(e) =>{
                      const stat = e.target.value;
                        setStatusCheck(stat);
                      }}  
                    >
                
                  <FormControlLabel value="Open" control={<Radio />} label="Open" className="edtstatus"/>
                  <FormControlLabel value="Under Evaluation" control={<Radio />} label="Under Evaluation" className="edtstatus"/>
                  <FormControlLabel value="Paused" control={<Radio />} label="Paused" className="edtstatus"/>
                  </RadioGroup>
                  </div>
                  <CardContent>
                  <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                    Description:
                  </Typography>
                  <Typography variant="h5" component="div">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <TextField multiline
                  onChange={(e) => setSchodesc(e.target.value)}
                  value={description}
                    rows={6} fullWidth id="input-with-sx" label="" variant="outlined" />
                </Box>
                  </Typography>
                </CardContent>
                </div>
                <div className="buttonbacapp2">
                <button onClick={handleClose} className="myButton">Cancel</button>
                <button onClick={Create} className="myButton1">Create</button>
                </div>
                </Card>
            </div>           
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
        <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column'}}>
            <div style={{width:'100%'}}>
              <StyledButton sx={{float:'right',backgroundColor:'red',transition: 'opacity 0.3s ease','&:hover': {opacity: 0.8,}}} 
              variant="contained" onClick={handleClose1}> X </StyledButton>
            </div>
            <div style={{width:'100%',height:'10%'}}>
            <Typography sx={{fontSize:'30px',fontWeight:'700',textAlign:'center',color:'#666'}}>Edit Scholarship Program</Typography>
            </div>
            <div style={{width:'100%',height:'80%',display:'flex',justifyContent:'center',alignItems:'center'}}>
              
              <div style={{width:'20%'}}>
                <Typography sx={{textAlign:'center',marginBottom:'20px'}}>Scholarship Logo Preview</Typography>
                {icon1 ? 
                (<img style={{width: '100%'}} className='previmg' src={iconprev1} alt=''/>) : 
                (<img style={{width: '100%'}} className='previmg' src={olddata.icon} alt=''/>)}
              </div>
                <Card sx={{width:'75%',marginLeft:'10px',paddingTop:'10px'}} elevation={2}>
                <div style={{width:'100%'}}>
                  <Typography sx={{marginLeft:'20px'}}>Scholarship Logo</Typography>
                  <Button>
                  <TextField sx={{backgroundColor:'whitesmoke',border:'none',marginLeft:'10px'}}
                  type='file' id="input-with-sx" label="" variant="outlined" 
                  onChange={(e) =>setSchoimg1(e.target.files[0])}/>
                  </Button><br />
                  <CardContent>
                  <Typography variant="h5" component="div">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <TextField fullWidth placeholder={olddata.name} id="input-with-sx" label="Scholarship Name" variant="outlined" 
                    onChange={(e) => setSchotitle1(e.target.value)}/>
                </Box>
                  </Typography>
                </CardContent>
                  <div style={{width:'100%'}}>
                  <FormLabel sx={{marginLeft:'20px'}} id="demo-row-radio-buttons-group-label" className="status">Status</FormLabel>
                  <RadioGroup
                      row
                      sx={{marginLeft:'20px'}}
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={olddata.status}
                      value={statusu || olddata.status}
                      onChange={(e) =>{
                      const stat = e.target.value;
                        setStatusCheck1(stat);
                      }}  
                    >
                
                  <FormControlLabel value="Open" control={<Radio />} label="Open" className="edtstatus"/>
                  <FormControlLabel value="Under Evaluation" control={<Radio />} label="Under Evaluation" className="edtstatus"/>
                  <FormControlLabel value="Paused" control={<Radio />} label="Paused" className="edtstatus"/>
                  </RadioGroup>
                  </div>
                  <CardContent>
                  <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                    Description:
                  </Typography>
                  <Typography variant="h5" component="div">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <TextField multiline
                  onChange={(e) => setSchodesc1(e.target.value)}
                  placeholder={olddata.description}
                    rows={6} fullWidth id="input-with-sx" label="" variant="outlined" />
                </Box>
                  </Typography>
                </CardContent>
                </div>
                <div className="buttonbacapp2">
                <button onClick={handleClose1} className="myButton">Cancel</button>
                <button onClick={Edit} className="myButton1">Save</button>
                 </div>
                </Card>
            </div>
        </div>
      </Box>
      </Modal>
    <div className="scholarships">
        <Sidebar/>
    <div className="scholarshipsContainer">
        <Navbar/>
        <div className="top">
          <Card>
          <div style={{width:'95%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h1 style={{color:'#666'}}>Scholarships Program 
          </h1>
          <button className="myButton" onClick={handleOpen}>ADD</button>
          </div>
          {schocat.length > 0 ? (
    <CustomDataGrid
      className='dataGrid'
      rows={schocat}
      columns={columns}
      autoHeight 
      autoPageSize
      getRowId={(row) => row.schoProgId}
      scrollbarSize={10}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[25]}  
      disableRowSelectionOnClick
    />
  ) : (
    <p>No data available</p>
  )}
    </Card>
          </div>
        
            </div>
    </div>
  </>
  )
}

export default Scholarships