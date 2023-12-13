import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './payroll.css'
import Select from 'react-select';
import dayjs from 'dayjs';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarFilterButton,
    gridPageCountSelector,
    GridPagination,
    useGridApiContext,
    useGridSelector,
  } from '@mui/x-data-grid';
import { ProfileScholars } from '../../api/request';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MuiPagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import PaginationItem from '@mui/material/PaginationItem';

function Pagination({ page, onPageChange, className }) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  
    return (
      <MuiPagination
        color="primary"
        className={className}
        variant="outlined"
        shape="rounded"
        count={pageCount}
        page={page + 1}
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event, newPage) => {
          onPageChange(event, newPage - 1);
        }}
      />
    );
  }
  
  function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  }

const cashierList = [
    {name:'cashier',label:'Cashier 1',value:'Cashier 1'},
    {name:'cashier',label:'Cashier 2',value:'Cashier 2'},
    {name:'cashier',label:'Cashier 3',value:'Cashier 3'},
    {name:'cashier',label:'Cashier 4',value:'Cashier 4'},
    {name:'cashier',label:'Cashier 5',value:'Cashier 5'}
]
const columns = [
   {
     field: 'ScholarshipApplied',
     headerName: 'Scholarship Applied',
     width: 150,
     editable: false,
   },
   {
     field: 'lastName',
     headerName: 'LastName',
     width: 150,
     editable: false,
   },
   {
     field: 'firstName',
     headerName: 'FirstName',
     width: 150,
     editable: false,
   },
   {
     field: 'middleName',
     headerName: 'MiddleName',
     width: 150,
     editable: false,
   },
   {
     field: 'yearLevel',
     headerName: 'Year Level',
     width: 120,
     editable: false,
   },
   {
     field: 'baranggay',
     headerName: 'Baranggay',
     width: 150,
     editable: false,
   },
   {
     field: 'remarks',
     headerName: 'Status',
     width: 130,
     editable: false,

   },
   {
     field: 'batch',
     headerName: 'Batch',
     width: 80,
     editable: false,
   },

 ];
 function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }
export const PayrollAppoint = () => {
    const [tabs,setTabs] = useState(0);
    const [loading,setLoading] = useState(false);
    const [miniTabs,setMiniTabs] = useState(0);
    const [schedDet,setSchedDate] = useState({
        cashier: '',
        date : '',
        timeStart : '',
        timeEnd : '',
        scholars: []
    })
    const [scholarList,setScholarList] = useState([])


    useEffect(() =>{
        async function Fetch(){
            setLoading(true)
            let res = await ProfileScholars.SCHO_PROFLIST()
            const data = res.data
            setScholarList(data)
            setLoading(false)
        }
        Fetch()
    },[])
    const handleOptionChange = (data) => {
        const { name, value } = data; 
      
        setSchedDate((prevCriteria) => ({
          ...prevCriteria,
          [name]: value,
        }));
      
      };
    const handleRowSelectionModelChange = (newRowSelectionModel) => {
        setSchedDate({...schedDet ,scholars : newRowSelectionModel});
    };
  return (
    <div className='containerPay'>
        <div style={{width:'15%'}}>
          <Sidebar />
        </div>
        <div className='bodyPay'>
           <Navbar />
            <div style={{flex:1,display:'flex',flexDirection:'column'}}>
                <div style={{padding:'10px 0px 0px 0px',display:'flex'}}>
                    <button className={tabs === 0 ? 'Activetabs' : 'tabsbutton'}
                    onClick={(e) =>setTabs(0)}>
                      Payroll Schedule
                    </button>
                    <button className={tabs === 1 ? 'Activetabs' : 'tabsbutton'}
                    onClick={(e) =>setTabs(1)}>
                      Attendance
                    </button>
                </div>
                <div>
                    {tabs === 0 && 
                    <div style={{backgroundColor:'white',width:'100%'}}>
                       <div style={{padding:'10px'}}>
                        <h1 style={{fontSize:'25px'}}>Payroll Information:</h1>
                        <div style={{display:'flex',flexWrap:'wrap',gap:'4px',justifyContent:'center',alignItems:'center'}}>
                            <div style={{flex:1,paddingTop:'8px'}}>
                                <Select
                                    value={cashierList.find((option) => option.value === schedDet.cashier)}
                                    fullWidth
                                    styles={{height:'100%'}}
                                    onChange={handleOptionChange}
                                    placeholder="Select Cashier"
                                    isSearchable={false}
                                    options={cashierList}
                                />
                            </div>
                            <div style={{flex:1}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker', 'TimePicker', 'DatePicker']}>
                                    <div style={{display:'flex',gap:'4px'}}>
                                    <DatePicker
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            error: false,
                                        },
                                        }}
                                    label="Date"
                                    value={schedDet.date}
                                    onChange={(newValue) => setSchedDate({...schedDet ,date : newValue})}
                                    />
                                    <TimePicker
                                    slotProps={{
                                    textField: {
                                        size: "small",
                                        error: false,
                                    },
                                    }}
                                    label="Start Time"
                                    value={schedDet.timeStart}
                                    onChange={(newValue) => setSchedDate({...schedDet ,timeStart : newValue})}
                                    />
                                    <TimePicker
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            error: false,
                                        },
                                        }}
                                    label="End Time"
                                    value={schedDet.timeEnd}
                                    onChange={(newValue) => setSchedDate({...schedDet ,timeEnd : newValue})}
                                    />
                                    </div>

                                </DemoContainer>
                            </LocalizationProvider>
                            </div>
                        </div>
                       </div>
                       <div style={{padding:'10px'}}>
                        <h1 style={{fontSize:'25px'}}>Select Scholars:</h1>
                       <DataGrid
                        loading={loading}
                        slots={{
                        toolbar: CustomToolbar,
                        pagination: CustomPagination,
                        loadingOverlay: LinearProgress,
                        }}
                        rows={scholarList}
                        columns={columns}
                        getRowId={(row) => row.scholarCode}
                        checkboxSelection
                        onRowSelectionModelChange={handleRowSelectionModelChange}
                        rowSelectionModel={schedDet.scholars}
                        disableRowSelectionOnClick
                        />                        
                       </div>
                    </div>}
                </div>
            </div>
        </div>
    </div>
  )
}
