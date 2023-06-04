import { UsersRequest } from '../../api/request';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './users.scss';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import { useEffect, useState } from 'react';


const Users = () => {
  
  // const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState([]);
  // const [selectedInfo, setSelectedInfo] = useState({})
  

  useEffect(() => {
    async function Fetch(){
      const userinfo = await UsersRequest.ALL_USERS()
      setDisplay(userinfo.data.UserAccounts);
    }
    Fetch();
   
  }, []);
  
  const lists = display?.map((info) => {
    return (
      <>
          <TableRow key ={info.applicantNum}>
              <TableCell className="tableCell">{info.applicantNum}</TableCell>
              <TableCell className="tableCell"> <img src={info.profile} alt="" style={{height: 50}} /></TableCell>
              <TableCell className="tableCell">{info.Name}</TableCell>
              <TableCell className="tableCell">{info.email}</TableCell>
              <TableCell className="tableCell">{info.ScholarshipApplied}</TableCell>
              <TableCell className="tableCell">{info.status}</TableCell>
          </TableRow>
          </>
  )})

  return (
    <>
    <div className="users">
      <Sidebar />
      <div className="usersContainer">
        <Navbar />
        <div className="top">
          <h1> Users Account List </h1>

      <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">

        <TableHead>
          <TableRow>
            <TableCell className="tableCell"> Account Number</TableCell>
            <TableCell className="tableCell"> Profile </TableCell>
            <TableCell className="tableCell"> Name</TableCell>
            <TableCell className="tableCell"> Email </TableCell>
            <TableCell className="tableCell"> Scholarship Applied </TableCell>
            <TableCell className="tableCell"> Status </TableCell>        
          </TableRow>
        </TableHead>

        <TableBody>
          {lists}
        </TableBody>
      </Table>
    </TableContainer>


        </div>
      </div>
    </div>
    </>
  )
}


export default Users