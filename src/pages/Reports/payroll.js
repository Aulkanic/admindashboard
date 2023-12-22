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
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { BsFillPrinterFill } from 'react-icons/bs';
import PrintablePage from './printablePage';
import Pagination from './pagination';

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
  const [payroll,setPayroll] = useState([])
  const [selection,setSelection] = useState('')
  const [month,setMonth] = useState('1st');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 25;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [sortOrder, setSortOrder] = useState('asc');


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
    return isNaN(number) ? "Invalid Number" : new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(number);
  }

  const columns = month === '1st' ? ([
    { field: 'userNum', headerName: '#', width: 70,  align: 'left', },
    { field: 'LastName', 
    headerName: 'LastName', 
    width: 150,  
    align: 'left',
    height: 'maxContent', 
  },
    { field: 'FirstName', 
    headerName: 'FirstName', 
    width: 150,  
    align: 'left',
    height: 'maxContent', 
  },
    { field: 'MiddleName', 
    headerName: 'MiddleName', 
    width: 150,  
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
      field: 'December',
      headerName: 'December',
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
    paid:'',
    signature:''
  }) : ({
    id: 'total',
    scholarCode: 'Total',
    Name: 'Total',
    InclusiveDate: '',
    August: convertToPesos(calculateTotalAmount('August')),
    September: convertToPesos(calculateTotalAmount('September')),
    October: convertToPesos(calculateTotalAmount('October')),
    November: convertToPesos(calculateTotalAmount('November')),
    December: convertToPesos(calculateTotalAmount('December')),
    AmountDue2: convertToPesos(payroll.reduce((total, user) => total + user.AmountDue2, 0)),
  });

  const modifiedList = payroll?.map((item, index) => ({
    userNum: index + 1,
    ...item

  }));
  let paginateData = modifiedList && modifiedList?.slice(indexOfFirstPost, indexOfLastPost);
  const date = new Date()
  const year = date.getFullYear()
  const titlef = month === '1st' ? `JANUARY-JULY ${year}/1ST BATCH` : `AUGUST-DECEMBER ${year}/2ND BATCH`
  const reportTitle = titlef;
  const total = pay.data?.TotalAmount
  const totalFunds = convertToPesos(pay.data?.TotalAmount);
  const columns1 = month === '1st' ? ([
    { field: 'userNum', headerName: '#', width: 70,  align: 'left', },
    { field: 'Name', 
    headerName: 'Name', 
    width: 150,  
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
      field: 'December',
      headerName: 'December',
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
  const sortByProperty = (arr, property, order) => {
    const sortOrder = order === 'desc' ? -1 : 1;

    return [...arr].sort((a, b) => {
      const aValue = a[property];
      const bValue = b[property];

      if (aValue < bValue) {
        return -1 * sortOrder;
      }
      if (aValue > bValue) {
        return 1 * sortOrder;
      }
      return 0;
    });
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    // Sort the data based on the current property and order
    const sortedData = sortByProperty(modifiedList, 'LastName', newSortOrder);
    paginateData = sortedData
  };
  
  return (
    <>
      <PrintablePage for={'Payroll'} page={currentPage} funds={totalFunds} total={total} level={selection} value={paginateData} cols={columns1} head={reportTitle} row={totalRow}/>
    
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
            <option value="2nd">Aug-December</option>
          </Form.Select>
          </div>
        </div>

          <div>
            <Button style={{marginRight:'10px'}} onClick={handlePrint}><BsFillPrinterFill style={{marginRight:'2px',marginTop:'-2px'}}/>Print</Button>
          </div>
      </div>
      <h1 style={{fontSize:'20px'}}><strong>Total Scholarship Funds as of {year}:</strong> {totalFunds}</h1>

      <div className='payrollTable'>
      <button onClick={handleSort}>Sort by LastName {sortOrder === 'asc' ? '↑' : '↓'}</button>
      <Paper sx={{ width: '100%',height:'maxContent',borderRadius:'0px',padding:'15px' }}>
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
            {paginateData
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
      <Pagination
        postPerPage={postsPerPage}
        totalPosts={payroll.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      </Paper>
      </div>
    </div>
    </>
  )
}

export default Payroll