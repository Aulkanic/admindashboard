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
import { ProfileScholars,PayoutScholar,PayoutList,PayoutAttendance, CreatePay, ListOfAcademicYearPay, BatchPerAcademicYear, Payrollreports, CreatePayBatch, CreatePayAppointment, ListofAppointmentinBatch } from '../../api/request';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MuiPagination from '@mui/material/Pagination';
import dayjs from 'dayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import PaginationItem from '@mui/material/PaginationItem';
import TextField from '@mui/material/TextField';
import swal from 'sweetalert';
import { CustomModal } from '../../components/modal/customModal';
import { useSelector } from "react-redux";

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
     field: 'lname',
     headerName: 'LastName',
     width: 100,
     editable: false,
   },
   {
     field: 'fname',
     headerName: 'FirstName',
     width: 100,
     editable: false,
   },
   {
     field: 'mname',
     headerName: 'MiddleName',
     width: 100,
     editable: false,
   },
   {
     field: 'yearLevel',
     headerName: 'Year Level',
     width: 150,
     editable: false,
   },
   {
     field: 'baranggay',
     headerName: 'Baranggay',
     width: 150,
     editable: false,
   },
   {
     field: 'total',
     headerName: 'Benefits',
     width: 100,
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
    const { admin  } = useSelector((state) => state.login)
    const [tabs,setTabs] = useState('1');
    const [openModal,setOpenModal] = useState({
      frmAca:false,
      frmBatch: false
    })
    const [totalData,setTotalData] = useState([])
    const [tblPaylist,setTblPayList] = useState([])
    const [selectedPay,setSelectedPay] = useState([]);
    const [listPayScho,setPayScholist] = useState([])
    const [loading,setLoading] = useState(false);
    const [submitting,setSubmitting]= useState(false);
    const [dateTabs,setDateTabs] = useState('')
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const [schedDet,setSchedDate] = useState({
        cashier: '',
        date : '',
        timeStart : '',
        timeEnd : '',
        Location: '',
        Reminder: '',
        scholars: []
    })
    const [scholarList,setScholarList] = useState([])
    const [payoutList,setPayoutList] = useState([])
    const [payDet,setPayDet] = useState({
      tbName:'',
      academicYear:'',
    })
    const [payBatch,setPayBatch] = useState({
      batch:'',
      payId:'',
      totalFunds:0,
      TotalBeneficiaries:0,
      inclusiveMonth:'',
      academicYear:'',
      cashierNumber:0
    })
    const [paySched,setPaySched] = useState({
      date:null,
      location:'',
      reminder:'',
      cashier:'',
      selectedScho:[],
      academicYear:'',
      timeStart:null,
      timeEnd:null,
      title:''
    })

    async function Fetch(){
        setLoading(true)
        let res = await ProfileScholars.SCHO_PROFLIST()
        let res1 = await PayoutList.PAYOUT_LIST()
        let res2 = await ListOfAcademicYearPay.LISTOFPYM()
        let res3 = await Payrollreports.PAYROLL()
        console.log(res3)
        setTblPayList(res2.data)
        const data = res.data
        setPayoutList(res1.data)
        setTotalData(res3.data)
        setScholarList(data)
        setLoading(false)
    }
    useEffect(() =>{
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
      const selectedIDs = new Set(newRowSelectionModel);
      const selectedRowData = selectedPay?.Batchlist?.payeeData.filter((row) =>
        selectedIDs.has(row.schoid.toString())
      );
      setRowSelectionModel(newRowSelectionModel)
        setPaySched(prev=>({...prev,'selectedScho': selectedRowData})) 
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
    const handleChange = async(event, newValue) => {
      if(newValue === '2'){
        if(!selectedPay || selectedPay.length === 0){
          alert('Please select Payout Acadmicyear to manage first')
          setTabs('1')
          return
        }else{
          setTabs(newValue)
        }
      }else if(newValue === '3'){
        if(!selectedPay || selectedPay.length === 0){
          alert('Please select Payout Acadmicyear to manage first')
          setTabs('1')
          return
        }else{
          const formData = new FormData();
          formData.append('academicYear',selectedPay.academicYear)
          formData.append('batch',selectedPay.Batchlist.batch)
          const res = await ListofAppointmentinBatch.LISTED(formData)
          console.log(res)
          if(res.data){
            setPayScholist(res.data)
          }
          setTabs(newValue)
        }         
      }
      setTabs(newValue);
    };
    const datehandleChange = async(event,newValue) =>{
      
    }
    const handleModalOpen = (field,value,data) =>{
      setOpenModal(prev =>({
        ...prev,
        [field]: value
      }))
      if(data){
        setPayBatch((prev) =>({
          ...prev,
          payId: data.paytblId,
          academicYear: data.academicYear,
          totalFunds:totalData.TotalAmount,
          TotalBeneficiaries: totalData.TotalBeneficiaries
        }))
      }
    }
    const handleCreatePay = async(e) =>{
      e.preventDefault()
      if(Object.values(payDet).every(data => data === '')){
        alert('Please fill all fields')
        return
      }
      const formData = new FormData();
      formData.append('tbName',payDet.tbName)
      formData.append('academicYear',payDet.academicYear)
      const res = await CreatePay.CREATE(formData)
      if(res.status === 200){
        alert("Successfully Created Payment")
        Fetch()
      }
    };
    const handleInputPayBatchChange = (e) =>{
      const { name,value } = e.target
      setPayBatch((prev)=>({...prev,[name]:value}))
    }
    const handleCreatPayBatch = async(e) =>{
      e.preventDefault()
      if(Object.values(payBatch).every(data => data === '')){
        alert('Please Fill All Fields')
        return
      }
      const formData = new FormData()
      formData.append('payId',payBatch.payId)
      formData.append('batch',payBatch.batch)
      formData.append('totalFunds',payBatch.totalFunds)
      formData.append('totalBeneficiaries',payBatch.TotalBeneficiaries)
      formData.append('inclusiveMonth',payBatch.inclusiveMonth)
      formData.append('academicYear',payBatch.academicYear)
      formData.append('cashierNumber',payBatch.cashierNumber)
      if(totalData.All.length === 0){
        return  alert('No Fund Available in the System')
      }
      for(let i =0;i < totalData.All.length;i++){
       formData.append(`scholarList[${i}]`,JSON.stringify(totalData.All[i]))
      }
    
      const res = await CreatePayBatch.CREATE(formData)
      if(res.data){
        Fetch()
      }
    }
    const handleManageBatch = (data,val) =>{
      setTabs('2')
      const filterBatch = data.Batchlist.filter(data => data.batch === val.batch)
      const batchDet = {
        ...data,
        Batchlist: filterBatch[0]
    }
      setSelectedPay(batchDet)
    }
    const handlePayAppoint = async() =>{
      const formData = new FormData();
      const formattedDate = paySched.date?.toISOString().slice(0, 10);
      const formattedTimeStart = paySched.timeStart ? new Date(paySched.timeStart) : null;
      const formattedTimeEnd = paySched.timeEnd ? new Date(paySched.timeEnd) : null;
      formData.append('location',paySched.location)
      formData.append('reminder',paySched.reminder)
      formData.append('date',formattedDate)
      formData.append('academicYear',selectedPay.academicYear)
      formData.append('timeStart',formattedTimeStart)
      formData.append('timeEnd',formattedTimeEnd)
      formData.append('admin',admin[0].name)
      formData.append('batch',selectedPay.Batchlist.batch)
      formData.append('title',paySched.title)
      formData.append('schoList',JSON.stringify(paySched.selectedScho))
      formData.append('cashier',paySched.cashier)
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
      await CreatePayAppointment.CREATE(formData)
      .then((res) =>{
        alert('Appointed Success')
        Fetch()
      })
    }
    console.log(selectedPay)
  return (
    <>
    <CustomModal
      open={openModal.frmAca}
      handleClose={(prev) =>{setOpenModal({...prev,frmAca:false})}}
      title={'Create Payout'}
      content={
      <form onSubmit={handleCreatePay} style={{display:'flex',justifyContent:'center',flexDirection:'column',gap:'10px'}} action="">
        <div style={{display:'flex',gap:10,width:'100%',justifyContent:'center',flexWrap:'wrap',flexDirection:'column'}}>
          <TextField onChange={(e) =>{setPayDet({...payDet,tbName:e.target.value})}} value={payDet.tbName} id="outlined-basic" label="Title" variant="outlined" />
          <TextField onChange={(e) =>{setPayDet({...payDet,academicYear:e.target.value})}} value={payDet.academicYear} id="outlined-basic" label="Academic Year" variant="outlined" />
        </div>
        <button type='submit'>
          Create
        </button>
      </form>}
    />
      <CustomModal
      open={openModal.frmBatch}
      handleClose={(prev) =>{setOpenModal({...prev,frmAca:false})}}
      title={'Create Batch'}
      content={
      <form onSubmit={handleCreatPayBatch} style={{display:'flex',justifyContent:'center',flexDirection:'column',gap:'10px'}} action="">
        <div style={{display:'flex',gap:10,width:'100%',justifyContent:'center',flexWrap:'wrap',flexDirection:'column'}}>
          <TextField onChange={handleInputPayBatchChange} name='batch' value={payBatch.batch} id="outlined-basic" label="Batch title" variant="outlined" />
          <TextField onChange={handleInputPayBatchChange} name='inclusiveMonth' value={payBatch.inclusiveMonth} id="outlined-basic" label="Inclusive Month" variant="outlined" />
          <TextField type='number' onChange={handleInputPayBatchChange} name='cashierNumber' value={payBatch.cashierNumber} id="outlined-basic" label="Number of Cashier" variant="outlined" />

          <TextField disabled value={totalData.TotalAmount} id="outlined-basic" label="Total Funds" variant="outlined" />
          <TextField disabled value={totalData.TotalBeneficiaries} id="outlined-basic" label="Total Benefeciaries" variant="outlined" />
        </div>
        <button type='submit'>
          Create
        </button>
      </form>
    }
    />
    <div className='containerPay'>
        <div style={{width:'15%'}}>
          <Sidebar />
        </div>
        <div className='bodyPay'>
           <Navbar />
           <TabContext value={tabs}>
            <div style={{flex:1,display:'flex',flexDirection:'column'}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Create Payout" value="1" />
                    <Tab label="Manage" value="2" />
                    <Tab label="Payee List" value="3" />
                  </TabList>
                </Box>
                <div>
                <TabPanel value="1">
                    <div style={{backgroundColor:'white',width:'100%'}}>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'15px'}}>
                        <button onClick={() => {handleModalOpen('frmAca',true)}}>Create Payout Now!</button>
                      </div>
                      <div>
                        {tblPaylist?.map((data,idx) =>{
                          return(
                            <div key={idx} style={{border:'2px solid black',borderRadius:'5px',padding:'8px',width:'45%'}}>
                              <div style={{display:'flex',justifyContent:'space-between'}}>
                              <h2>{data.tblName + ': ' + data.academicYear}</h2>
                              <button>{data.status === 1 ? 'Ongoing' : 'Closed'}</button>
                              </div>

                              <div style={{display:'flex',flexWrap:'wrap',gap:'4px',marginTop:'6px',alignItems:'center'}}>
                              {data.Batchlist.length > 0 && data.Batchlist?.map((val,idy) =>{
                                return(
                                  <div onClick={() =>handleManageBatch(data,val)}
                                  key={idy} style={{width:'250px',border:'2px solid black',borderRadius:'6px',padding:'4px'}}>
                                    <h4>{val.batch}</h4>
                                    <p style={{margin:0}}>{val.inclusiveMonth}</p>
                                    <p style={{margin:0}}>Funds:	&#8369;{val.totalFunds}</p>
                                  </div>
                                )
                              })}
                              <div style={{width:'150px',border:'2px solid black',height:'50px',justifyContent:'center',alignItems:'center',display:'flex',padding:'4px',borderRadius:'6px'}}>
                                 <p style={{margin:0,cursor:'pointer'}} onClick={() => {handleModalOpen('frmBatch',true,data)}}>+Add Batch </p>
                              </div>
                              </div>

                            </div>
                          )
                        })}
                      </div>
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div style={{width:'100%',backgroundColor:'white'}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <div>
                        <h2>{selectedPay?.tblName}</h2>
                        <h3>{selectedPay?.academicYear} - {selectedPay?.Batchlist?.batch}</h3>
                        </div>
                        <button onClick={handlePayAppoint}>
                          Create Appointment!
                        </button>
                      </div>
                    </div>
                    <div style={{display:'flex',gap:'10px'}}>
                       <form style={{display:'flex',flexDirection:'column',flex:1}} action="">
                        <div style={{display:'flex',flexDirection:'column'}}>
                        <h2 style={{margin:0,marginBottom:'24px'}}>Appointment Details</h2>
                        <TextField size='small' sx={{marginBottom:'8px'}} onChange={(e) =>{setPaySched(prev =>({...prev,title:e.target.value}))}} value={paySched.title} id="outlined-basic" label="Title" variant="outlined" />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DateField', 'TimeField', 'DateTimeField']}>
                              <DateField 
                              slotProps={{
                                textField: {
                                  size: "small",
                                  error: false,
                                },
                              }}
                              label='Date:'
                              value={paySched.date} 
                              onChange={(val) =>{setPaySched(prev =>({...prev,date:dayjs(val)}))}} />
                            <TimeField
                              slotProps={{
                                textField: {
                                  size: "small",
                                  error: false,
                                },
                              }}
                              label="Start Time:"
                              value={paySched.timeStart}
                              onChange={(newValue) => {setPaySched(prev => ({...prev,timeStart:dayjs(newValue)}))}}
                            />
                            <TimeField
                              slotProps={{
                                textField: {
                                  size: "small",
                                  error: false,
                                },
                              }}
                              label="End Time:"
                              value={paySched.timeEnd}
                              onChange={(newValue) => {setPaySched(prev => ({...prev,timeEnd:dayjs(newValue)}))}}
                            />
                          </DemoContainer>
                        </LocalizationProvider>

                        </div>
                        <div style={{display:'flex',flexDirection:'column',gap:'24px',marginTop:'24px'}}>
                        <TextField size='small' onChange={(e) =>{setPaySched(prev =>({...prev,location:e.target.value}))}} value={paySched.location} id="outlined-basic" label="Location" variant="outlined" />
                        <TextField size='small' onChange={(e) =>{setPaySched(prev =>({...prev,reminder:e.target.value}))}} value={paySched.reminder} id="outlined-basic" label="Reminder" variant="outlined" />
                       <div styles={{width:'100%',height:'100px'}}>
                          <label htmlFor="">Select Cashier</label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          styles={{width:'100%',height:'100px'}}
                          name="color"
                          onChange={(value) =>{setPaySched(prev=>({...prev,cashier:value.value}))}}
                          options={selectedPay?.Batchlist?.cashierData?.map(data =>({
                            label:data.cashierName,
                            value:data.cashierName
                          })) || []}
                        />
                        </div>
                        </div>


                       </form>
                       <div style={{width:'max-content'}}>
                        <h2>Select scholars</h2>
                       <DataGrid
                          rows={selectedPay?.Batchlist?.payeeData ?? []}
                          columns={columns}
                          getRowId={(row) => row.schoid}
                          initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 5,
                              },
                            },
                          }}
                          pageSizeOptions={[5]}
                          checkboxSelection
                          onRowSelectionModelChange={handleRowSelectionModelChange}
                          rowSelectionModel={rowSelectionModel}
                          disableRowSelectionOnClick
                        />                        
                       </div>
                    </div>
                    
                </TabPanel>
                <TabPanel value='3'>
                    <div>
                      <div style={{width:'100%',backgroundColor:'lightblue'}}>
                      <Tabs
                        value={dateTabs}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons
                        aria-label="visible arrows tabs example"
                        sx={{
                          [`& .${tabsClasses.scrollButtons}`]: {
                            '&.Mui-disabled': { opacity: 0.3 },
                          },
                        }}
                      >
                        {listPayScho.length > 0 && listPayScho.map((data,idx) =>{
                          const date = new Date(data.appointement_date).toLocaleDateString();
                          return(
                            <Tab label={date} />
                          )
                        })}
                      </Tabs>                                                                     
                      </div>
                    </div>
                </TabPanel>
                </div>
            </div>
            </TabContext>
        </div>
    </div>
    </>
  )
}
