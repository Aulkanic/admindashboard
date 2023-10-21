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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#0047a4",
      color: theme.palette.common.white,
  
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
    
    const columns = [
        { field: 'userNum', headerName: '#', width: 30,  align: 'left', },
        { field: 'Name', headerName: 'Name', width: 250,  align: 'left', },
        { field: 'gender', headerName: 'Gender', width: 100,  align: 'left', },
        { field: 'yearLevel', headerName: 'Year Level', width: 150,  align: 'left', },
        { field: 'baranggay', headerName: 'Baranggay', width: 150,  align: 'left', },
        { field: 'batch', headerName: 'Batch', width: 100,  align: 'left', },
        { field: 'ScholarshipApplied', headerName: 'Scholarship Program', width: 170,  align: 'left', },
      ];
    const modifiedList = data?.map((item, index) => ({
        userNum: index + 1,
        ...item
    
      }));
  return (
    <div id="component-to-print" style={{padding:'20px 5px 20px 5px'}}>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
        <h1 style={{fontWeight:'bold',margin:'0px'}}>MYDO Daily Reports</h1>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.scholarCode}>
                    {columns.map((column) => {
                      const value = row[column.field];
                      return (
                        <TableCell key={column.field} align={column.align}>
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
    </div>
  )
}

export default PrintablePage