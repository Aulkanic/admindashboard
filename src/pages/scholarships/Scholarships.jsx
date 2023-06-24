import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./scholarships.scss"
import { Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper, Box, Modal} from "@mui/material"; 
import './scholarship.css'
import { FetchingSchoProg, CreateSchoProg, UpdateSchoProg } from "../../api/request";
import { useEffect } from "react";
import { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormLabel from '@mui/material/FormLabel';
import swal from "sweetalert";


const Scholarships = () => {
    const [schocat, setSchocat] = useState([]);
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
    const [req, setReq] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen1 = (data) => {
    console.log(data)
    setOlddata(data)
    setOpen1(true);
  }
  const handleClose1 = () => setOpen1(false);

  const handleAddReq = () => {
    setReq([...req, { value: '' }]);
  };
  const handleDeleteReq = (index) => {
    setReq(req.filter((_, i) => i !== index));
  };
  const handleChangeReq = (index, event) => {
    const newData = [...req];
    newData[index].value = event.target.value;
    setReq(newData);
  };


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '1000px',
    height: '80vh',
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: 24,
    overflow: 'auto',
    
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Promise.all([
          FetchingSchoProg.FETCH_SCHOPROG(),
        ]);
        console.log(response)
        setSchocat(response[0].data.SchoCat);
        
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
    const data = {icon,title,description,status};
    console.log(data)
    CreateSchoProg.CREATE_SCHOPROG(data)
    .then(res => {
      console.log(res)
      setSchocat(res.data.Scholarship)
      swal({
        title: "Success",
        text: "Scholarship Program has been Added!",
        icon: "success",
        button: "OK",
      });
      setSchodesc('')
      setSchoimg('')
      setStatusCheck('');
      setSchotitle('')
      setOpen(false)
    }
     )
    .catch(err => console.log(err));
}

function Edit(event){
  event.preventDefault();
  const schoid =  olddata.schoProgId;
  const icon = icon1;
  const title1 = titleu || olddata.title
  const description1 = descriptionu || olddata.description;
  const status1 = statusu || olddata.status; 
  const data = {title1,description1,status1,schoid,icon}
  console.log(data)
  UpdateSchoProg.UPDATE_SCHOPROG(data)
  .then(res => {
    console.log(res)
    setSchocat(res.data.Scholarship)
    swal({
      title: "Success",
      text: "Scholarship Program has been Changed!",
      icon: "success",
      button: "OK",
    });
    setOpen(false)
  }
   )
  .catch(err => console.log(err));
}

const scholarshipprogram = schocat?.map((f,index) =>{
  return (
        <TableRow key ={f.applicantNum} className="row">  
            <TableCell className="tableCell"> <img style={{width: 50, height: 50}} src={f.icon} alt="" /></TableCell>  
            <TableCell className="tableCell"> {f.name} </TableCell>  
            <TableCell className="tableCell"> {f.description} </TableCell>
            <TableCell className="tableCell"> {f.status} </TableCell>
            <TableCell className="tableCell"> 
              <button className="editButton" 
                      onClick={() =>handleOpen1(f,index)}> Edit </button> 
            </TableCell>
        </TableRow>
    )})

  return (
    <>
  {/* Modal for Add button */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <div className="buttonclosed">
            <button onClick={handleClose}>X</button>
          </div>
            
        <div className="contentscho">
          <div className="formleft">
            <div className="schodetails">

              <div className="newsimgprev">
              {icon &&  <img style={{width: 50, height:50 }} className='previmg' src={iconprev} alt=''/> }
              </div>

                <label htmlFor="">Scholarship Icon</label>
                <input onChange={e=> setSchoimg(e.target.files[0])}  type="file" /><br/>

                <label htmlFor="">Scholarshhip Name</label>
                <input onChange={e=> setSchotitle(e.target.value)} type="text" /><br/>

                <label htmlFor="">Write a Description</label>
                <input onChange={e=> setSchodesc(e.target.value)} type="text" /><br/>

                <div className="status">
                <FormLabel id="demo-row-radio-buttons-group-label" className="stat"> Status </FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={status}
                    sx={{justifyContent: 'center'}}
                    onChange={(e) =>{
                     const stat = e.target.value;
                      setStatusCheck(stat);
                    }}>

                
<FormControlLabel value="Open" control={<Radio />} label="Open" className="edtstatus"/>
                <FormControlLabel value="Under Evaluation" control={<Radio />} label="Under Evaluation" className="edtstatus"/>
                <FormControlLabel value="Paused" control={<Radio />} label="Paused" className="edtstatus"/>
               
                </RadioGroup>
                </div>
                </div>

          </div>

      <div className="buttonbacapp1">
        <button >Cancel</button>
        <button onClick={Create}> Add </button>
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
          <div className="buttonclosed">
            <button classname='btnClose' onClick={handleClose1}> X </button>
          </div>

          <div className="content-scho">
        
            <div className="imgprev">
              <label htmlFor=""></label>
              {icon1 ? 
              (<img style={{width: 150}} className='previmg' src={iconprev1} alt=''/>) : 
              (<img style={{width: 100}} className='previmg' src={olddata.icon} alt=''/>)}
            </div>

              <div className="schocredet">
                <label htmlFor="">Scholarship Icon</label>
                <input onChange={e=> setSchoimg1(e.target.files[0])}  type="file" /><br/>
                <label htmlFor="titleu">Scholarship Program Name</label>
                <input placeholder={olddata.name} name="titleu" value={titleu} onChange={(e) => {
                  setSchotitle1(e.target.value);
                }} type="text" /><br/>
 
                <label htmlFor="">Write a Description</label> <br/>
                <textarea placeholder={olddata.description} value={descriptionu} onChange={e => setSchodesc1(e.target.value)} />

                <div className="option">
                <FormLabel id="demo-row-radio-buttons-group-label" className="status">Status</FormLabel>
                <RadioGroup
                    row
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

              </div>
          </div>

      <div className="buttonbacapp2">
        <button onClick={handleClose1} className="cnlBtn">Cancel</button>
        <button onClick={Edit} className="edtBtn">Save Changes</button>
      </div>



    </Box>
      </Modal>
    <div className="scholarships">
        <Sidebar/>
    <div className="scholarshipsContainer">
        <Navbar/>
        <div className="top">
          <h1>Scholarships Program 
          <button className="addbtn" onClick={handleOpen}>ADD</button>
          </h1>
          
        <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell className="tableCell2"> Icon </TableCell>
              <TableCell className="tableCell2"> Scholarship Program </TableCell>
              <TableCell className="tableCell2"> Description </TableCell>
              <TableCell className="tableCell2"> Status </TableCell>
              <TableCell className="tableCell2"> Actions </TableCell>
            </TableRow>
            
          </TableHead>

          <TableBody>
            {scholarshipprogram}
          </TableBody>
        </Table>

        </TableContainer>
          </div>
            </div>
    </div>
  </>
  )
}

export default Scholarships