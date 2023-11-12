import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './payroll.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { BsFillPrinterFill } from 'react-icons/bs';
import PrintablePage from './printablePage';

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

function Payroll(pay){
  console.log(pay)
  const totalFunds = pay.data.TotalAmount;
  const [payroll,setPayroll] = useState([])
  const [page, setPage] = React.useState(0);
  const [selection,setSelection] = useState('')
  const [month,setMonth] = useState('1st')
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handlePrint = () => {
    window.print();
  };
 
  useEffect(() =>{

      if(selection === 'Elementary'){
        const Elementary = pay
        ? pay.data && pay.data.elementary && pay.data.elementary.scholarList
          ? pay.data.elementary.scholarList
          : []
        : [];
        setPayroll(Elementary)
      }
      if(selection === 'Highschool'){
        const Highschool = pay
        ? pay.data && pay.data.highSchool && pay.data.highSchool.scholarList
          ? pay.data.highSchool.scholarList
          : []
        : [];
        setPayroll(Highschool)
      }
      if(selection === 'College'){
        const College = pay
        ? pay.data && pay.data.college && pay.data.college.scholarList
          ? pay.data.college.scholarList
          : []
        : [];
        setPayroll(College)
      }
  },[payroll,selection])

  function convertToPesos(number) {
    console.log(number)
    return isNaN(number) ? "Invalid Number" : new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(number);
  }

  const columns = month === '1st' ? ([
    { field: 'userNum', headerName: '#', width: 70,  align: 'left', },
    { field: 'Name', 
    headerName: 'Name(Scholarship Benefeciary)', 
    width: 250,  
    align: 'left',
    height: 'maxContent', 
  },
    { field: 'InclusiveDate', headerName: 'Inclusive Date', width: 170,  align: 'left', },
    {
      field: 'January',
      headerName: 'January',
      width: 100,
      format: (value) => convertToPesos(value),
      align: 'left',
    },
    {
      field: 'February',
      headerName: 'February',
      width: 100,
      format: (value) => convertToPesos(value),
      align: 'left',
    },
    {
      field: 'March',
      headerName: 'March',
      width: 100,
      format: (value) => convertToPesos(value),
      align: 'left',
    },
    {
      field: 'April',
      headerName: 'April',
      width: 100,
      format: (value) => convertToPesos(value),
      align: 'left',
    },
    {
      field: 'May',
      headerName: 'May',
      width: 100,
      format: (value) => convertToPesos(value),
      align: 'left',
    },
    {
      field: 'AmountDue1',
      headerName: 'Amount Due',
      width: 130,
      format: (value) => convertToPesos(value),
      align: 'left',
    },
  ]) : ([
    { field: 'userNum', headerName: '#', width: 70,  align: 'left', },
    { field: 'Name', 
    headerName: 'Name(Scholarship Benefeciary)', 
    width: 250,  
    align: 'left',
    height: 'maxContent', 
  },
    { field: 'InclusiveDate', headerName: 'Inclusive Date', width: 170,  align: 'left', },
    {
      field: 'July',
      headerName: 'July',
      width: 100,
      format: (value) => convertToPesos(value),
      align: 'left',
    },
    {
      field: 'August',
      headerName: 'August',
      width: 100,
      format: (value) => convertToPesos(value),
      align: 'left',
    },
    {
      field: 'September',
      headerName: 'September',
      width: 100,
      format: (value) => convertToPesos(value),
      align: 'left',
    },
    {
      field: 'October',
      headerName: 'October',
      width: 100,
      format: (value) => convertToPesos(value),
      align: 'left',
    },
    {
      field: 'November',
      headerName: 'November',
      width: 100,
      format: (value) => convertToPesos(value),
      align: 'left',
    },
    {
      field: 'AmountDue2',
      headerName: 'Amount Due',
      width: 130,
      format: (value) => convertToPesos(value),
      align: 'left',
    },
  ]);

  const calculateTotalAmount = (month) => {
    return payroll.reduce((total, user) => total + user[month], 0);
  };

  const totalRow = month === '1st' ? ({
    id: 'total',
    scholarCode: 'Total',
    Name: 'Total',
    InclusiveDate: '',
    January: convertToPesos(calculateTotalAmount('January')),
    February: convertToPesos(calculateTotalAmount('February')),
    March: convertToPesos(calculateTotalAmount('March')),
    April: convertToPesos(calculateTotalAmount('April')),
    May: convertToPesos(calculateTotalAmount('May')),
    AmountDue1: convertToPesos(payroll.reduce((total, user) => total + user.AmountDue1, 0)),
  }) : ({
    id: 'total',
    scholarCode: 'Total',
    Name: 'Total',
    InclusiveDate: '',
    July: convertToPesos(calculateTotalAmount('July')),
    August: convertToPesos(calculateTotalAmount('August')),
    September: convertToPesos(calculateTotalAmount('September')),
    October: convertToPesos(calculateTotalAmount('October')),
    November: convertToPesos(calculateTotalAmount('November')),
    AmountDue2: convertToPesos(payroll.reduce((total, user) => total + user.AmountDue2, 0)),
  });

  const modifiedList = payroll?.map((item, index) => ({
    userNum: index + 1,
    ...item

  }));
  const reportTitle = 'Payroll Report';
  const date = new Date()
  const year = date.getFullYear()
  return (
    <>
      <PrintablePage value={payroll} cols={columns} head={reportTitle} row={totalRow}/>
    
    <div className='payrollContent'>

      <div className='payrollContainer2'>
        <div style={{display:'flex'}}>
        <div style={{marginRight:'10px'}}>
          <Form.Select 
            value={selection}
            onChange={(e) => setSelection(e.target.value)}
          >
            <option>Select Year Level</option>
            <option value="Elementary">Elementary</option>
            <option value="Highschool">Highschool</option>
            <option value="College">College</option>
          </Form.Select>
          </div>
          <div>
          <Form.Select 
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="1st">January-May</option>
            <option value="2nd">July-October</option>
          </Form.Select>
          </div>
        </div>

          <div>
            <Button style={{marginRight:'10px'}} onClick={handlePrint}><BsFillPrinterFill style={{marginRight:'2px',marginTop:'-2px'}}/>Print</Button>
          </div>
      </div>
      <h1 style={{fontSize:'20px'}}><strong>Total Scholarship Funds as of {year}:</strong> {convertToPesos(totalFunds)}</h1>
      <div className='payrollTable'>
      <Paper sx={{ width: '100%',height:'maxContent',borderRadius:'0px' }}>
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
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
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
      <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px', fontWeight: 'bold' }}>
        {columns.map((column) => (
          <span key={column.field} style={{ minWidth: column.width,paddingLeft:'15px'}}>
            {totalRow[column.field]}
          </span>
        ))}
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={payroll.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
      </div>
    </div>
    </>
  )
}

export default Payroll