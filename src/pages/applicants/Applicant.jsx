import "./applicant.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper, Box, Button, Typography, Modal} from "@mui/material"; 
import Endpoints from "../../api/endpoints";
import { ApplicantsRequest, UsersRequest } from "../../api/request";

const Applicant = () => {

  const [open, setOpen] = useState(false);
  const [post , setPost] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState({});

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect( async () => {

    const response = await ApplicantsRequest.ALL_APPLICANTS()
    setPost(response.data.results);

    // const userinfo = await UsersRequest.ALL_USERS(2)
    // console.log(userinfo.data);
  }, []);

// fucntions
  const view = (data) => {
    setSelectedInfo(data)
    handleOpen()
  }
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const list = post?.map((f) =>{
    return (
      <>
          <TableRow key ={f.applicantNum}>  
              <TableCell className="tableCell"> {f.applicantNum} </TableCell>  
              <TableCell className="tableCell"> {f.Name} </TableCell>
              <TableCell className="tableCell"> {f.DateApplied} </TableCell>
              <TableCell className="tableCell"> {f.email} </TableCell>
              <TableCell className="tableCell"> {f.score} </TableCell>
              <TableCell className="tableCell"> {f.status} </TableCell>
              <div className='cellAction'>
                    <div className="viewButton" onClick={() => view(f)}>View</div>
            </div>
          </TableRow>
      </>
      )})
  
  return (
    <>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedInfo?.Name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>

    <div className="applicant">
      <Sidebar/>
      <div className="applicantContainer">
      <Navbar/>
      <div className="top" >
      <h1> Applicants </h1> 
              
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell className="tableCell"> Applicant Number </TableCell>
              <TableCell className="tableCell"> Full Name </TableCell>
              <TableCell className="tableCell"> Date Applied </TableCell>
              <TableCell className="tableCell"> Email </TableCell>
              <TableCell className="tableCell"> Score </TableCell>  
              <TableCell className="tableCell"> Status </TableCell>  
              <TableCell className="tableCell">  </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {list}
          </TableBody>
        </Table>
      </TableContainer>

        </div>
      </div>
    </div>

    </>
  )
  
}

export default Applicant