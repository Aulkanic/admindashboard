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
import { ProfileScholars,PayoutScholar,PayoutList,PayoutAttendance, CreatePay, ListOfAcademicYearPay, BatchPerAcademicYear, Payrollreports, CreatePayBatch } from '../../api/request';
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
import LinearProgress from '@mui/material/LinearProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import PaginationItem from '@mui/material/PaginationItem';
import TextField from '@mui/material/TextField';
import swal from 'sweetalert';
import { CustomModal } from '../../components/modal/customModal';

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
    const [tabs,setTabs] = useState('1');
    const [openModal,setOpenModal] = useState({
      frmAca:false,
      frmBatch: false
    })
    const [totalData,setTotalData] = useState([])
    const [tblPaylist,setTblPayList] = useState([])
    const [loading,setLoading] = useState(false);
    const [submitting,setSubmitting]= useState(false)
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


    useEffect(() =>{
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
    const handleChange = (event, newValue) => {
      setTabs(newValue);
    };
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
        setTblPayList(res.data)
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
      const res = await CreatePayBatch.CREATE(formData)
      if(res.data){
        setTblPayList(res.data)
      }
    }
    const handleManageBatch = () =>{
      setTabs('2')
    }
console.log(payBatch)
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
                          console.log(data)
                          return(
                            <div key={idx} style={{border:'2px solid black',borderRadius:'5px',padding:'8px',width:'45%'}}>
                              <div style={{display:'flex',justifyContent:'space-between'}}>
                              <h2>{data.tblName + ': ' + data.academicYear}</h2>
                              <button>{data.status === 1 ? 'Ongoing' : 'Closed'}</button>
                              </div>

                              <div style={{display:'flex',flexWrap:'wrap',gap:'4px',marginTop:'6px',alignItems:'center'}}>
                              {data.Batchlist.length > 0 && data.Batchlist?.map((val,idy) =>{
                                return(
                                  <div onClick={handleManageBatch}
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
                      <div style={{border:'2px solid black',width:'400px'}}>
                        <h4>Financial Assistance 2024</h4>
                        <p>Status : Ongoing</p>
                        <p>Date: 03/24/2025 - 04/01/2025</p>
                        
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
