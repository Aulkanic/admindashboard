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
import { convertToWords } from './word';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "white",
      color: "white",
      fontWeight:'bold',
      color:'black',
  
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 8,
      lineHeight:'1px'
    },
  }));
  const tableContainerStyle = {
    maxHeight: 'maxContent',
    borderRadius: '0', 
  };





const PrintablePage = (val) => {
 
    let data = val.value ? val.value : [];
    const date = new Date();
    const printFor = val.for
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const columns = val.cols ? val.cols : []
    const title = val.head ? val.head : '';
    const fundsTotal = val.funds ? val.funds : '';
    const totalnum = val.total ? val.total : 0
    const wordTotal = convertToWords(totalnum)
    const totalRow = val.row ? val.row : [];
    const YearLevel = val.level?.toUpperCase();
    const newColumn1 = {
      field: 'paid',
      headerName: 'Amount Paid in Cash',
      width: 170,
      align: 'left',
    };
    
    const newColumn2 = {
      field: 'signature',
      headerName: 'Signature of Payee',
      width: 170,
      align: 'left',
    };
    const modifiedList = printFor === 'Data' ? data?.map((item, index) => ({
        userNum: index + 1,
        ...item
    
      })) : data?.map((item, index) => ({
        userNum: index + 1,
        ...item,
        paid:'',
        signature: ''
      }));
    const payrolCol = [...columns,newColumn1,newColumn2]
    totalRow.paid = '';
    totalRow.signature = '';
  return (
    <>
    {printFor === 'Data' && <div id="component-to-print">
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
      <footer>
        <div>
        <FaLocationDot className='iconspr'/> 2nd Floor,New Marilao Municipal Bldg, Patubig,Marilao,Bulacan <TbWorldWww className='iconspr'/> www.marilao.gov.ph <FiMail className='iconspr'/> mayor@marilao.gov.ph  <BsFacebook className='iconspr'/> MYDO
        </div>
        
      </footer>
    </div>}
    {printFor === 'Payroll' && <>
    <div id="component-to-print">
      <div>
      <h1 style={{fontSize:'18px',margin:0,marginTop:'5px'}}>{YearLevel}</h1>
      <h1 style={{fontSize:'18px',margin:0}}>{title}</h1>
      </div>
      <div style={{marginTop:'15px'}}>
        <p style={{margin:0,fontSize:'15px',marginLeft:'25px'}}>We hereby acknowledge to have received from <strong style={{textDecoration: 'underline'}}>ROWENA E. DARILAG , CASHIER III</strong>, Marilao, Bulacan the sum herein specified opposite our respective names,the same being full compensation for our service</p>
        <p style={{margin:0,fontSize:'15px',marginLeft:'15px'}}>rendered during the period stated below. the correctness of which we hereby severally certify.</p>
      </div>
      <div style={{marginTop:'20px', height:'630px'}}>
      <TableContainer sx={tableContainerStyle}>
        <Table stickyHeader>
          <TableHead sx={{borderRadius:'5px 5px 0px 0px',backgroundColor:'black'}}>
            <TableRow >
              {payrolCol.map((column) => (
                <StyledTableCell
                  key={column.field}
                  align={column.align}
                  sx={{border:'0.5px solid black'}}
                  style={{ minWidth: column.width, position: 'sticky', top: 0, zIndex: 1000 }}
                >
                  {column.headerName}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {modifiedList.map((row) => {
                return (
                  <TableRow sx={{fontSize:'10px'}} hover role="checkbox" tabIndex={-1} key={row.scholarCode}>
                    {payrolCol.map((column) => {
                      const value = row[column.field];
                      return (
                        <TableCell sx={{fontSize:'10px',border:'0.5px solid black',lineHeight:'18px',padding:0,paddingLeft:'10px'}} key={column.field} align={column.align}>
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
      <div style={{fontWeight: 'bold' ,display:'flex',flexWrap:'wrap',width:'100%'}}>
        {payrolCol.map((column) => {
           const newWidth = column.width + 4.395;
          return(
          <span key={column.field} style={{ minWidth:newWidth,fontSize:'11px',fontWeight:'bold',width: newWidth,display: 'inline-block',paddingRight:'48px'}}>
            {totalRow[column.field]}
          </span>
        )})}
      </div>       
      </div>
      <div style={{display:'flex',flexWrap:'wrap',width:'100%',marginTop:'15px',justifyContent:'space-between'}}>
        <div style={{width:'50%',lineHeight:'20.5px',height:'max-content',display:'flex',flexDirection:'column',paddingRight:'20px'}}>
            <p style={{margin:0,fontSize:'15px',marginLeft:'25px'}}>I HEREBY CERTIFY on my official oath that above PAYROLL is correct, and  that services</p>
            <p style={{margin:0,fontSize:'15px',marginLeft:'5px'}}>above stated have been duly rendered. Payment for suc services is also hereby approved by</p>
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <p style={{margin:0,fontSize:'15px',marginLeft:'5px'}}>the appropriation indicated</p>
            <p style={{margin:0,fontSize:'15px',marginRight:'55px'}}>(4) APPROVED:</p>
            </div>
           <div style={{position:'relative',marginTop:'15px',width:'100%',height:'50px'}}>
            <div style={{position:'absolute',right:15,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <p style={{margin:0,fontSize:'18px',textDecoration:'underline',fontWeight:700}}>HENRY R. LUTAO</p>
            <p style={{margin:0,fontSize:'15px'}}>Municipal Mayor</p>
            </div>
           </div>
           <div style={{display:'flex',flexDirection:'column',lineHeight:'20px'}}>
            <p style={{margin:0,fontSize:'15px'}}>(2) APPROVED for payment subject to preaudit:</p>
            <div style={{display:'flex'}}>
            <p style={{borderBottom:'0.5px solid black',width:'200px'}}></p><p>20</p><p style={{borderBottom:'0.5px solid black',width:'200px'}}></p><p>Treasurer</p>
            </div>
            <br/>
            <p style={{margin:0,fontSize:'15px'}}>(3) Preaudited and approved for payment in the amount of</p>
            <div style={{ display: 'flex' }}>
              <p style={{ borderBottom: '0.5px solid black', width: '200px', whiteSpace: 'nowrap', marginRight: '5px' }}></p>
              <p>(P</p>
              <p style={{ borderBottom: '0.5px solid black', width: '250px', marginLeft: '5px' }}></p>)
              <p>pesos only</p>
            </div>
            <div style={{display:'flex'}}>
            <p style={{borderBottom:'0.5px solid black',width:'200px'}}></p><p>20</p><p style={{borderBottom:'0.5px solid black',width:'200px'}}></p>
            </div>
           </div>
        </div>
        <div style={{width:'40%',lineHeight:'20.5px',height:'max-content',display:'flex',flexDirection:'column',paddingRight:'20px'}}>
            <p style={{margin:0,fontSize:'15px'}}>(1) I HEREBY CERTIFY on my official oath that i have paid in cash to each official and</p>
            <p style={{margin:0,fontSize:'15px'}}>employee whose name appears on the above roll the amount set opposite his name</p>
            <p style={{margin:0,fontSize:'15px'}}>under column 21, he having signed or marked his name under column 24 above, in</p>
            <p style={{margin:0,fontSize:'15px'}}>presence and the same time that payment was made to him, in acknowledgement</p>
            <p style={{margin:0,fontSize:'15px'}}>of receipt of the money paid him.</p>
            <br/>
            <div style={{display:'flex'}}>
            <p style={{borderBottom:'0.5px solid black',width:'200px'}}></p><p>20</p><p style={{borderBottom:'0.5px solid black',width:'200px'}}></p>
            </div>
            <p style={{margin:0,fontSize:'15px'}}>(6) I HEREBY CERTIFY on my official oath that each employee whose name appears</p>
            <p style={{margin:0,fontSize:'15px'}}>on the above roll has been paid in cash or in check, and in no other mode, the amount</p>
            <p style={{margin:0,fontSize:'15px'}}>shown under column 21 above, opposite his name. The total of the payments made by</p>
            <p style={{margin:0,fontSize:'15px'}}>means this payroll amount to.</p>
            <br />
            <p style={{margin:0,fontSize:'18px',fontWeight:700}}>{wordTotal} pesos only ({fundsTotal})</p>
        </div>
      </div>
    </div>
    </>}
    </>
  )
}

export default PrintablePage