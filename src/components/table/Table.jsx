import './table.scss';
import { ApplicantsRequest } from '../../api/request';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const List = () => {
  
  const [post, setPost] = useState ([]);
  console.log(post)

  useEffect(() => {
    async function Fetch(){
      const response = await ApplicantsRequest.ALL_APPLICANTS()
      setPost(response.data.results);
    }
    Fetch();
}, []);

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
                  <Link to="/single" style={{ textDecoration: "none" }}>
                    <div className="viewButton">View</div>
                  </Link>
            </div>
          </TableRow>
      </>
    )
  })
   

  return (
  <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">

        <TableHead>
          <TableRow>
            <TableCell className="tableCell"> Applicant Number </TableCell>
            <TableCell className="tableCell"> Name </TableCell>
            <TableCell className="tableCell"> Date Applied </TableCell>
            <TableCell className="tableCell"> Email </TableCell>
            <TableCell className="tableCell"> Score </TableCell>
            <TableCell className="tableCell"> Status </TableCell>          
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow >
             {list}
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default List;