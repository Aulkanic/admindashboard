import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import './payroll.css'
import { useState } from 'react';
import MYDO from '../../Images/mydo.jpg'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#0047a4",
      color: "black",
      fontWeight:'bold'
  
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
  
    },
  }));
  const tableContainerStyle = {
    maxHeight: 'maxContent',
    borderRadius: '0', 
  };



const PrintablePage = (val) => {
    console.log(val)
    let data = val.value ? val.value : [];
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const columns = val.cols ? val.cols : []
    const title = val.head ? val.head : '';
    const totalRow = val.row ? val.row : [];

    const modifiedList = data?.map((item, index) => ({
        userNum: index + 1,
        ...item
    
      }));
  return (
    <div id="component-to-print" style={{padding:'20px 0px 20px 0px'}}>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',flexDirection:'column'}}>
          <img src={MYDO} style={{width:'60px',heigt:'60px',objectFit:'contain'}} alt="" />
        <h1 style={{fontWeight:'bold',margin:'0px'}}>{title}</h1>
        </div>

        <p><strong>Date:</strong>{formattedDate}</p>
        <TableContainer sx={tableContainerStyle}>
        <Table stickyHeader>
          <TableHead sx={{borderRadius:'5px 5px 0px 0px',backgroundColor:'black'}}>
            <TableRow >
              {columns.map((column) => (
                <StyledTableCell
                  key={column.field}
                  align={column.align}
                  style={{ minWidth: column.width, position: 'sticky', top: 0, zIndex: 1000 }}
                >
                  {column.headerName}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {modifiedList
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row) => {
                return (
                  <TableRow sx={{fontSize:'10px'}} hover role="checkbox" tabIndex={-1} key={row.scholarCode}>
                    {columns.map((column) => {
                      const value = row[column.field];
                      return (
                        <TableCell sx={{fontSize:'10px'}} key={column.field} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}

          </TableBody>
        </Table>
      </TableContainer>
      {title === 'Payroll Report' && <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px', fontWeight: 'bold' }}>
        {columns.map((column) => (
          <span key={column.field} style={{ minWidth: column.width,paddingLeft:'15px',fontSize:'11px',fontWeight:'bold' }}>
            {totalRow[column.field]}
          </span>
        ))}
      </div>}
    </div>
  )
}

export default PrintablePage