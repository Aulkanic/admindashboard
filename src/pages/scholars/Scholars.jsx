import './scholars.scss';
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useState, useEffect } from 'react';
import { ScholarsRequest, UsersRequest } from '../../api/request';

const Scholars = () => {

  const [data, setData] = useState([]);
  
  useEffect( async() => {
    const scholars = await UsersRequest.ALL_USERS()
    setData(scholars.data.UserAccounts)
  }, []);

  const list = data?.map((data) => {
  return (
    <>
    <TableRow key={data.ApplicationNumber}>
        <TableCell className="tableCell">{data.applicantNum}</TableCell>
        <TableCell className="tableCell">{data.Name}</TableCell>
        <TableCell className="tableCell">{data.email}</TableCell>
        <TableCell className="tableCell">{data.date}</TableCell>
    </TableRow>
    </>
  )})

  return (
    <>
    <div className="scholars">
        <Sidebar/>
        <div className="scholarsContainer">
            <Navbar/>
            <div className="top">
              <h1>Scholars</h1>

              <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell"> Account Number</TableCell>
            <TableCell className="tableCell"> Full Name </TableCell>
            <TableCell className="tableCell"> Email </TableCell>
            <TableCell className="tableCell"> Date Applied </TableCell>
          </TableRow>
        </TableHead>

        <TableBody> 
          <TableRow>
             {list}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
              
            </div>
        </div>
    </div>
    </>
  )
}

export default Scholars