import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './payroll.css'
import Select from 'react-select';
import {
    DataGrid, gridClasses,
  } from '@mui/x-data-grid';
import { ProfileScholars,PayoutList, CreatePay, ListOfAcademicYearPay, Payrollreports, CreatePayBatch, CreatePayAppointment, ListofAppointmentinBatch, GetbyDate, SchoReceivedPay, ReschedPayScho } from '../../api/request';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import dayjs from 'dayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import TextField from '@mui/material/TextField';
import { CustomModal } from '../../components/modal/customModal';
import { useSelector } from "react-redux";
import createFormData from '../../utility/formData';
import { PayoutReport } from '../../printContents/payout';
import { generatePDF } from '../../utility/generatePDf';


  const currencyFormat = (num) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
    });
  
    return formatter.format(num);
  };
export const PayrollAppoint = () => {
    const { admin  } = useSelector((state) => state.login)
    const [tabs,setTabs] = useState('1');
    const [openModal,setOpenModal] = useState({
      frmAca:false,
      frmBatch: false,
      guardianDet:false
    })
    const [totalData,setTotalData] = useState([])
    const [tblPaylist,setTblPayList] = useState([])
    const [selectedPay,setSelectedPay] = useState([]);
    const [listPayScho,setPayScholist] = useState([]);
    const [listOFSchoApp,setListOfSchoApp] = useState([]);
    const [guardian,setGuardian] = useState([])
    const [loading,setLoading] = useState(false);
    const [dateTabs,setDateTabs] = useState('')
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
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
    const handleRowSelectionModelChange = (newRowSelectionModel) => {
      const selectedIDs = new Set(newRowSelectionModel);
      const selectedRowData = selectedPay?.Batchlist?.payeeData.filter((row) =>
        selectedIDs.has(row.schoid.toString())
      );
      setRowSelectionModel(newRowSelectionModel)
        setPaySched(prev=>({...prev,'selectedScho': selectedRowData})) 
    };

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
      const selectedDate = new Date(listPayScho[newValue]?.appointement_date);
      const formData = new FormData();
      const offsetInMinutes = selectedDate.getTimezoneOffset();
      const adjustedDate = new Date(selectedDate.getTime() - (offsetInMinutes * 60000));
      const formattedDate = adjustedDate.toISOString().slice(0, 10);
      formData.append('academicYear',selectedPay.academicYear)
      formData.append('batch',selectedPay.Batchlist.batch)
      formData.append('date',formattedDate)
      const res = await GetbyDate.FILTER(formData)
      if(res.data){
        setListOfSchoApp(res.data)
      }
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
          totalFunds:totalData.TotalFunds,
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
      const formattedTimeStart = paySched.timeStart ? new Date(paySched.timeStart).toLocaleString() : null;
      const formattedTimeEnd = paySched.timeEnd ? new Date(paySched.timeEnd).toLocaleString() : null;
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
      console.log(formDataObject)
      await CreatePayAppointment.CREATE(formData)
      .then((res) =>{
        alert('Appointed Success')
        Fetch()
      })
    }
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
        width: 100,
        editable: false,
      },
      {
        field: 'baranggay',
        headerName: 'Baranggay',
        width: 100,
        editable: false,
      },
      {
        field: 'total',
        headerName: 'Benefits',
        width: 100,
        editable: false,
        renderCell: (params) =>(
         <p style={{margin:0}}>{currencyFormat(params.value)}</p>
       )
      },
      {
       field: 'status',
       headerName: 'Status',
       width: 100,
       editable: false,
       renderCell: (params) =>(
         <p style={{margin:0}}>{params.value}</p>
       )
     },
   
    ];
   const columns1 = [
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
       width: 100,
       editable: false,
     },
     {
       field: 'baranggay',
       headerName: 'Baranggay',
       width: 100,
       editable: false,
     },
     {
       field: 'actions',
       headerName: 'Time',
       width: 150,
       editable: false,
       renderCell: (params) => (
         <>
         <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
         <p style={{margin:0}}>{new Date(params.row.timeStart).toLocaleTimeString()}-{new Date(params.row.timeEnd).toLocaleTimeString()}</p>
         </div>
       </>
     ),
     },
     {
       field: 'cashierId',
       headerName: 'Cashier',
       width: 100,
       editable: false,
     },
     {
       field: 'total',
       headerName: 'Benefits',
       width: 100,
       editable: false,
       renderCell: (params) =>(
         <p style={{margin:0}}>{currencyFormat(params.value)}</p>
       )
     },
     {
       field: 'receiverId',
       headerName: 'Receiver',
       width: 100,
       editable: false,
       renderCell: (params) =>(
         <>
         {params.value ? <button style={{backgroundColor:'#2f96db',border:'none',padding:'4px 8px',borderRadius:'4px',color:'white'}}
          onClick={() => {handleGuardianDetailView(params.row)}}>Guardian</button> : <button style={{backgroundColor:'#2f96db',border:'none',padding:'4px 8px',borderRadius:'4px',color:'white'}}>Student</button>}
         </>
       )
     },
     {
       field: 'action',
       headerName: 'Actions',
       width: 250,
       editable: false,
       renderCell: (params) =>{
       return(
        <div style={{display:'flex',gap:4}}>
          {Boolean(params.row.isReceived.data[0]) ? (<p style={{margin:0}}>Received At: {new Date(params.row.receivedAt).toLocaleDateString()}</p>): <>
          <button style={{backgroundColor:'#2f96db',border:'none',padding:'4px 8px',borderRadius:'4px',color:'white'}}
           onClick={() =>{setPayeeReceived(params.row)}}>Set Received</button>
          <button style={{backgroundColor:'#2f96db',border:'none',padding:'4px 8px',borderRadius:'4px',color:'white'}}
           onClick={() =>{ReappointPayee(params.row)}}>Re-appoint</button>
          </>}
        </div>
       )}
     },
   
   ];
   const handleGuardianDetailView = (data) =>{
    setOpenModal(prev =>({
      ...prev,
      guardianDet: true
    }))
    setGuardian(data)
   }
   const setPayeeReceived = async(data) =>{
    console.log(data)
    const details = {
      payid:data.payId,
      total:Number(data.total),
      scholarid:data.scholarCode,
      batch:selectedPay.Batchlist.batch,
      academicYear:selectedPay.academicYear
    }
    console.log(details)
    const formData = createFormData(details)
    const res = await SchoReceivedPay.RECEIVE(formData)
    if(res.data){
      Fetch()
    }
   };
   const ReappointPayee = async(data) =>{
      const details ={
        scholarid:data.scholarCode,
        batch:selectedPay.Batchlist.batch,
        academicYear:selectedPay.academicYear  
      }
      const formData = createFormData(details)
      const res = await ReschedPayScho.RESCHED(formData);
      if(res.data){
        Fetch()
      }
   };
   const tblcolumns = [
    { id: 'lastName', label: 'Last Name' },
    { id: 'firstName', label: 'First Name' },
    { id: 'middleName', label: 'Middle Name' },
    { id: 'yearLevel', label: 'Year Level' },
    { id: 'baranggay', label: 'Barangay' },
    { id: 'time', label: 'Time' },
    { id: 'cashier', label: 'Cashier' },
    { id: 'benefit', label: 'Benefits' }
  ];
  const data = listOFSchoApp.filter(item => item.batch === selectedPay.Batchlist.batch).map((item) =>({
    lastName:item.lname,
    firstName:item.fname,
    middleName:item.mname,
    yearLevel:item.yearLevel,
    baranggay:item.baranggay,
    time:`${new Date(item.timeStart).toLocaleTimeString()} to ${new Date(item.timeEnd).toLocaleTimeString()}`,
    cashier:item.cashierId,
    benefit:currencyFormat(item.total)
  }))
  const handleGeneratePDF = () => {
    generatePDF(<PayoutReport data={data} columns={tblcolumns} details={{ title: 'Payout Report', Date: new Date().toLocaleDateString(), amount: 9000 }} />, 'PayoutAttendance.pdf');
  };
  console.log(listOFSchoApp)
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
        <button disabled={loading} style={{backgroundColor:'#2f96db',border:'none',padding:'4px 8px',borderRadius:'4px',color:'white'}}
        type='submit'>
          {loading ? 'Submitting...' : 'Create'}
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

          <TextField disabled value={payBatch.totalFunds} id="outlined-basic" label="Total Funds" variant="outlined" />
          <TextField disabled value={payBatch.TotalBeneficiaries} id="outlined-basic" label="Total Benefeciaries" variant="outlined" />
        </div>
        <button disabled={loading} style={{backgroundColor:'#2f96db',border:'none',padding:'4px 8px',borderRadius:'4px',color:'white'}}
        type='submit'>
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
    }
    />
    <CustomModal
      open={openModal.guardianDet}
      handleClose={(prev) =>{setOpenModal({...prev,guardianDet:false})}}
      title={'Guardian Details'}
      content={
      <div>
        <p>Name: {guardian.receiverfname} {guardian.receivermname} {guardian.receiverlname}</p>
        <p>Relationship to Guardian: {guardian.relationship}</p>
        <p>Address: {guardian.address}</p>
        <p>Contact Number: {guardian.contactNum}</p>
      </div>
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
                    <Tab label="APPOINTMENT" value="2" />
                    <Tab label="Payee List" value="3" />
                  </TabList>
                </Box>
                <div>
                <TabPanel value="1">
                    <div style={{backgroundColor:'white',width:'100%'}}>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'15px'}}>
                        <button style={{backgroundColor:'#2f96db',border:'none',padding:'4px 8px',borderRadius:'4px',color:'white'}}
                         onClick={() => {handleModalOpen('frmAca',true)}}>Create Payout Now!</button>
                      </div>
                      <div>
                        {tblPaylist.length > 0 && tblPaylist?.map((data,idx) =>{
                          return(
                            <div key={idx} style={{borderRadius:'5px',padding:'8px',width:'45%',backgroundColor:'#2f96db'}}>
                              <div style={{display:'flex',justifyContent:'space-between'}}>
                              <h2 style={{fontWeight:'700',color:'white'}}>{data.tblName + ': ' + data.academicYear}</h2>
                              </div>

                              <div style={{display:'flex',flexWrap:'wrap',gap:'4px',marginTop:'6px',alignItems:'center'}}>
                              {data.Batchlist.length > 0 && data.Batchlist?.map((val,idy) =>{
                                return(
                                  <div onClick={() =>handleManageBatch(data,val)}
                                  key={idy} style={{width:'250px',borderRadius:'6px',padding:'8px',backgroundColor:'white',cursor:'pointer',color:'#0768a8'}}>
                                    <h4>{val.batch}</h4>
                                    <p style={{margin:0}}>{val.inclusiveMonth}</p>
                                    <p style={{margin:0}}>Funds: {currencyFormat(val.totalFunds)}</p>
                                    <p style={{margin:0}}>Remaining: {currencyFormat(val.remainingFunds)}</p>
                                    <p style={{margin:0}}>Distributed: {currencyFormat(val.distributedFunds)}</p>
                                  </div>
                                )
                              })}
                              <div style={{width:'150px',height:'50px',justifyContent:'center',alignItems:'center',display:'flex',borderRadius:'6px',padding:'8px',backgroundColor:'white',cursor:'pointer',color:'#0768a8'}}>
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
                        <button style={{backgroundColor:'#2f96db',border:'none',padding:'4px 8px',borderRadius:'4px',color:'white'}}
                        onClick={handlePayAppoint}>
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
                          rows={selectedPay?.Batchlist?.payeeData.filter(data => data.status !== 'Appointed') ?? []}
                          columns={columns}
                          getRowId={(row) => row.schoid}
                          initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 5,
                              },
                            },
                          }}
                          getRowHeight={() => 'auto'}
                          sx={{
                            [`& .${gridClasses.cell}`]: {
                              py: 1,
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
                      <div style={{width:'100%',}}>
                      <Tabs
                        value={dateTabs}
                        onChange={datehandleChange}
                        variant="scrollable"
                        scrollButtons
                        aria-label="visible arrows tabs example"
                        sx={{
                          [`& .${tabsClasses.scrollButtons}`]: {
                            '&.Mui-disabled': { opacity: 0.3 },
                          },
                        }}
                      >
                        {listPayScho.length > 0 && listPayScho?.map((data,idx) =>{
                          const date = new Date(data.appointement_date).toLocaleDateString();
                          return(
                            <Tab key={idx} label={date} />
                          )
                        })}
                      </Tabs>   
                      <div>
                        <button style={{backgroundColor:'#2f96db',border:'none',padding:'4px 8px',borderRadius:'4px',color:'white',margin:8}}
                         onClick={() =>handleGeneratePDF()}>
                          Print Attendance
                        </button>
                      <DataGrid
                          rows={listOFSchoApp ?? []}
                          columns={columns1}
                          getRowId={(row) => row.scholarCode}
                          initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 5,
                              },
                            },
                          }}
                          pageSizeOptions={[5]}
                          getRowHeight={() => 'auto'}
                          sx={{
                            [`& .${gridClasses.cell}`]: {
                              py: 1,
                            },
                          }}
                          checkboxSelection
                          disableRowSelectionOnClick
                        />                            
                      </div>
                                                              
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
