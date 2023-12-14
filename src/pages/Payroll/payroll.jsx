import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './payroll.css'
import Select from 'react-select';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import { MdClear } from "react-icons/md";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarFilterButton,
    gridPageCountSelector,
    GridPagination,
    useGridApiContext,
    useGridSelector,
  } from '@mui/x-data-grid';
import { ProfileScholars,PayoutScholar,PayoutList,PayoutAttendance } from '../../api/request';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MuiPagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import PaginationItem from '@mui/material/PaginationItem';
import TextField from '@mui/material/TextField';
import swal from 'sweetalert';

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
    const [submitting,setSubmitting]= useState(false)
    const [miniTabs,setMiniTabs] = useState(0);
    const [schedDet,setSchedDate] = useState({
        cashier: '',
        date : '',
        timeStart : '',
        timeEnd : '',
        Location: '',
        Reminder: '',
        scholars: []
    })
    const [cashier,setCashier] = useState('')
    const [scholarList,setScholarList] = useState([])
    const [payoutList,setPayoutList] = useState([])


    useEffect(() =>{
        async function Fetch(){
            setLoading(true)
            let res = await ProfileScholars.SCHO_PROFLIST()
            let res1 = await PayoutList.PAYOUT_LIST()
            const data = res.data
            setPayoutList(res1.data)
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
    const handleSetAppoint = async() =>{
      if(!schedDet.cashier || !schedDet.date || !schedDet.timeStart || !schedDet.timeEnd ||!schedDet.Location || !schedDet.Reminder){
        swal({
          text: 'Please fill up all details',
          timer: 2000,
          buttons: false,
          icon: "warning",
        })
        return
      }
      if(schedDet.scholars.length === 0){
        swal({
          text: 'Select scholars first',
          timer: 2000,
          buttons: false,
          icon: "warning",
        })
        return       
      }
      try {
        setSubmitting(true)
        const selectedRows = schedDet.scholars.map((selectedRow) =>
        scholarList.find((row) => row.scholarCode === selectedRow)
        );
        let counter = 0;
        for(let i =0;i < selectedRows.length; i++){
          const details = selectedRows[i];
          console.log("Details ",details);
          const formData = new FormData();
          formData.append('cashier',schedDet.cashier)
          formData.append('timeStart',schedDet.timeStart.toLocaleTimeString([],{hour: '2-digit',minute: '2-digit'}))
          formData.append('timeEnd',schedDet.timeEnd.toLocaleTimeString([],{hour: '2-digit',minute: '2-digit'}))
          formData.append('date',schedDet.date.toLocaleDateString())
          formData.append('Location',schedDet.Location)
          formData.append('Reminder',schedDet.Reminder)
          formData.append('scholarCode',details.scholarCode)
          formData.append('firstName',details.firstName)
          formData.append('lastName',details.lastName)
          formData.append('middleName',details.middleName)
          formData.append('applicantNum',details.applicantNum)
          formData.append('email',details.email)
          await PayoutScholar.PAYOUT_SCHO(formData)
          .then((res)=>{
            setScholarList(res.data)
            counter += 1;
            if(counter === schedDet.scholars.length){
              setSchedDate({
                cashier: '',
                date : '',
                timeStart : '',
                timeEnd : '',
                Location: '',
                Reminder: '',
                scholars: []
            })
            setSubmitting(false)
              swal({
                text: 'Successfully Appointed',
                timer: 2000,
                buttons: false,
                icon: "success",
              })
              return     
            }
          })
        }
      } catch (error) {
        console.log(error)
        return
      }
    };
    const handleAttendanceChange = async(data) =>{
        const formData = new FormData();
        formData.append('scholarCode',data.scholarCode);
        await PayoutAttendance.ATTENDANCE(formData)
        .then((res) =>{
          setPayoutList(res.data)
        })
    }
    const columns1 = [
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
        field: 'date',
        headerName: 'Date',
        width: 120,
        editable: false,
      },
      {
        field: 'timeStart',
        headerName: 'Time',
        width: 200,
        editable: false,
        renderCell: (params) => {
          const data = params.row
          return(
          <>
          <p style={{margin:'0px'}}>{data.timeStart}-{data.timeEnd}</p>
          </>
        )},
      },
      {
        field: 'cashier',
        headerName: 'Cashier',
        width: 130,
        editable: false,
    
      },
      {
        field: 'Attended',
        headerName: 'Attendance',
        width: 250,
        renderCell: (params) => {
          const isAttend = params.row.Attended; 
          return (
            <>
            {isAttend === 'yes' ? <Chip
            label="Attended"
            color="success"
            icon={<DoneIcon />}
              /> : <Chip
              label="Not Attended"
              onClick={() =>handleAttendanceChange(params.row)}
              color="error"
              icon={<MdClear />}
            />}            
            </>

          );},
      },
    
    ];
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
                        <h1 style={{fontSize:'25px',margin:0}}>Payroll Information:</h1>
                        <div style={{display:'flex',flexWrap:'wrap',gap:'10px',justifyContent:'top',alignItems:'center',padding:'0px 80px 0px 0px'}}>
                            <div style={{flex:1,paddingTop:'8px',display:'flex',flexDirection:'column',gap:'10px',marginTop:'10px'}}>
                                <TextField
                                  label="Location"
                                  id="outlined-size-small"
                                  value={schedDet.Location}
                                  onChange={(e) => setSchedDate({...schedDet, Location: e.target.value})}
                                  size="small"
                                />
                                <Select
                                    value={cashierList.find((option) => option.value === schedDet.cashier)}
                                    fullWidth
                                    styles={{height:'100%'}}
                                    onChange={handleOptionChange}
                                    placeholder="Select Cashier"
                                    isSearchable={false}
                                    options={cashierList}
                                />
                                <TextField
                                  label="Reminders:"
                                  multiline
                                  maxRows={5}
                                  id="outlined-size-small"
                                  value={schedDet.Reminder}
                                  onChange={(e) => setSchedDate({...schedDet, Reminder: e.target.value})}
                                 
                                />
                            </div>
                            <div style={{width:'30%'}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker', 'TimePicker', 'DatePicker']}>
                                    <div style={{display:'flex',gap:'10px',flexDirection:'column'}}>
                                    <DatePicker
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            error: false,
                                        },
                                        }}
                                    label="Date"
                                    value={schedDet.date}
                                    onChange={(newValue) => setSchedDate({...schedDet ,date : new Date(newValue)})}
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
                                    onChange={(newValue) => setSchedDate({...schedDet ,timeStart : new Date(newValue)})}
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
                                    onChange={(newValue) => setSchedDate({...schedDet ,timeEnd : new Date(newValue)})}
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
                       <div style={{width:'100%',display:'flex',justifyContent:'flex-end',alignItems:'flex-end',paddingRight:'40px',paddingBottom:'40px'}}>
                       <LoadingButton
                          onClick={handleSetAppoint}
                          loading={submitting}
                          loadingPosition="start"
                          startIcon={<SaveIcon />}
                          variant="contained"
                          sx={{textTransform:'none'}}
                        >
                          {submitting ? 'Submitting' : 'Set Appointment'}
                        </LoadingButton>
                       </div>
                    </div>}
                    {tabs === 1 && 
                    <div style={{width:'100%',backgroundColor:'white'}}>
                      <div style={{width:'50%',padding:'20px 10px 0px 30px'}}>
                          <Select
                              value={cashierList.find((option) => option.value === cashier)}
                              fullWidth
                              styles={{height:'100%'}}
                              onChange={(data) =>setCashier(data.value)}
                              placeholder="Select Cashier"
                              isSearchable={false}
                              options={cashierList}
                          />
                      </div>
                      <div style={{padding:'10px'}}>
                        <h1 style={{fontSize:'25px'}}> Scholars:</h1>
                       <DataGrid
                        loading={loading}
                        slots={{
                        toolbar: CustomToolbar,
                        pagination: CustomPagination,
                        loadingOverlay: LinearProgress,
                        }}
                        rows={payoutList}
                        columns={columns1}
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
