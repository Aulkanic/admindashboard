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
import { FetchingBmccScho } from '../../api/request';

const Scholars = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = async (filterValue) => {
    const filtered = data.filter(item =>
      Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(filterValue.toLowerCase())
      )
    );
    setFilteredData(filtered);
    
  };
  console.log(filteredData)
  useEffect( async() => {
    const scholars = await FetchingBmccScho.FETCH_SCHOLARS()
    console.log(scholars)
    setData(scholars.data.Scholars)
  }, []);

  const list = data?.map((data,index) => {
  return (
    <>
    <TableRow key={index}>
        <TableCell className="tableCell">{data.scholarId}</TableCell>
        <TableCell className="tableCell">{data.scholarCode}</TableCell>
        <TableCell className="tableCell">{data.Name}</TableCell>
        <TableCell className="tableCell">{data.scholarshipApplied}</TableCell>
        <TableCell className="tableCell">{data.yearLevel}</TableCell>
        <TableCell className="tableCell">{data.Baranggay}</TableCell>
        <TableCell className="tableCell">{data.Batch}</TableCell>
        <TableCell className="tableCell">{data.status}</TableCell>
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
              <label htmlFor="">Search:</label>
              <input type="text" onChange={(e) => handleFilter(e.target.value)} />
              <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell"> Scholar ID</TableCell>
            <TableCell className="tableCell"> Scholarship Number </TableCell>
            <TableCell className="tableCell"> Name </TableCell>
            <TableCell className="tableCell"> Scholarship Applied </TableCell>
            <TableCell className="tableCell"> Year Level </TableCell>
            <TableCell className="tableCell"> Baranggay </TableCell>
            <TableCell className="tableCell"> Batch </TableCell>
            <TableCell className="tableCell"> Status </TableCell>
            <TableCell className="tableCell"> Actions </TableCell>
          </TableRow>
        </TableHead>
        {filteredData.length > 0 ? (<TableBody> 
             {filteredData?.map((data,index) =>{
return (
  <>
  <TableRow key={index}>
      <TableCell className="tableCell">{data.scholarId}</TableCell>
      <TableCell className="tableCell">{data.scholarCode}</TableCell>
      <TableCell className="tableCell">{data.Name}</TableCell>
      <TableCell className="tableCell">{data.scholarshipApplied}</TableCell>
      <TableCell className="tableCell">{data.yearLevel}</TableCell>
      <TableCell className="tableCell">{data.Baranggay}</TableCell>
      <TableCell className="tableCell">{data.Batch}</TableCell>
      <TableCell className="tableCell">{data.status}</TableCell>
  </TableRow>
  </>
)
             })}
        </TableBody>) : (<TableBody> 
             {list}
        </TableBody>)}
      </Table>
    </TableContainer>
              
            </div>
        </div>
    </div>
    </>
  )
}

export default Scholars