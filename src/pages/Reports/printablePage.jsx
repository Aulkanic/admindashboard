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
import Marilao from '../../Images/marilao.jpg'
import { FaLocationDot } from 'react-icons/fa6';
import { TbWorldWww } from 'react-icons/tb';
import { FiMail } from 'react-icons/fi';
import { BsFacebook } from 'react-icons/bs';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#0047a4",
      color: "white",
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
 
    let data = val.value ? val.value : [];
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const columns = val.cols ? val.cols : []
    const title = val.head ? val.head : '';
    const totalRow = val.row ? val.row : [];

    const modifiedList = data?.map((item, index) => ({
        userNum: index + 1,
        ...item
    
      }));
  return (
    <div id="component-to-print">
        <div style={{display:'flex',justifyContent:'left',alignItems:'left',width:'100%',flexDirection:'column'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'10px',padding:'10px'}}>
          <img src={Marilao} style={{width:'100px',heigt:'100px',objectFit:'contain'}} alt="" />
          <div style={{textAlign:'center'}}>
            <p style={{margin:'0px',fontWeight:'bold',lineHeight:'16.45px',fontSize:'20px'}}>REPUBLIC OF THE PHILIPPINES</p>
            <p style={{margin:'10px 0px 10px 0px',fontWeight:'bold',lineHeight:'16.45px',fontSize:'20px'}}>PROVINCE OF BULACAN</p>
            <p style={{margin:'0px',fontWeight:'bold',lineHeight:'16.45px',fontSize:'20px'}}>MUNICIPAL GOVERNMENT OF BULACAN</p>
          </div>
          <img src={MYDO} style={{width:'200px',heigt:'200px',objectFit:'contain',borderRadius:'50%'}} alt="" />
          </div>
          <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
          <h1 style={{fontWeight:'bold',margin:'0px'}}>{title}</h1>
          <p><strong>Date:</strong>{formattedDate}</p>
          </div>

        </div>
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
      <footer>
        <div>
        <FaLocationDot className='iconspr'/> 2nd Floor,New Marilao Municipal Bldg, Patubig,Marilao,Bulacan <TbWorldWww className='iconspr'/> www.marilao.gov.ph <FiMail className='iconspr'/> mayor@marilao.gov.ph  <BsFacebook className='iconspr'/> MYDO
        </div>
        
      </footer>
    </div>
  )
}

export default PrintablePage