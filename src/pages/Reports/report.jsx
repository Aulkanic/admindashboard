import React, { useEffect, useState } from 'react'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { FetchingSchoProg } from '../../api/request';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Typography } from '@mui/material';
import Payroll from './payroll';
import Batch from './batch';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FilterIcon from '../../Images/filter.png'
import { Payrollreports,MYDOUsers } from '../../api/request';
import dayjs, { Dayjs } from 'dayjs';
import { MdOutlineClear } from 'react-icons/md';
import { BsFillPrinterFill } from 'react-icons/bs';
import Select from 'react-select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Form from 'react-bootstrap/Form';


const Baranggay = [
  {label: 'Abangan Norte',value: 'Abangan Norte',name:'baranggay'},
  {label: 'Abangan Sur',value: 'Abangan Sur',name:'baranggay'},
  {label: 'Ibayo',value: 'Ibayo',name:'baranggay'},
  {label: 'Lambakin',value: 'Lambakin',name:'baranggay'},
  {label: 'Lias',value: 'Lias',name:'baranggay'},
  {label: 'Loma De Gato',value: 'Loma De Gato',name:'baranggay'},
  {label: 'Nagbalon',value: 'Nagbalon',name:'baranggay'},
  {label: 'Patubig',value: 'Patubig',name:'baranggay'},
  {label: 'Poblacion 1',value: 'Poblacion 1',name:'baranggay'},
  {label: 'Poblacion 2',value: 'Poblacion 2',name:'baranggay'},
  {label: 'Prenza 1',value: 'Prenza 1',name:'baranggay'},
  {label: 'Prenza 2',value: 'Prenza 2',name:'baranggay'},
  {label: 'Saog',value: 'Saog',name:'baranggay'},
  {label: 'Sta. Rosa 1',value: 'Sta. Rosa 1',name:'baranggay'},
  {label: 'Sta. Rosa 2',value: 'Sta. Rosa 2',name:'baranggay'},
  {label: 'Tabing Ilog',value: 'Tabing Ilog',name:'baranggay'},
]
const YearLevel = [
  {label: 'Elementary',value: 'Elementary',name:'yearLevel'},
  {label: 'Junior Highschool',value: 'Junior Highschool',name:'yearLevel'},
  {label: 'Senior Highschool',value: 'Senior Highschool',name:'yearLevel'},
  {label: 'College',value: 'College',name:'yearLevel'},
]
const statusOPT = [
  {label:'Applicant', value:'Applicant',name:'Status'},
  {label:'Approved', value:'Approved',name:'Status'},
  {label:'Disqualified', value:'Disqualified',name:'Status'},
];
const genderOPT = [
  {label:'All', value:'',name:'Gender'},
  {label:'Male', value:'Male',name:'Gender'},
  {label:'Female', value:'Female',name:'Gender'},
  {label:'Others', value:'Others',name:'Gender'},
];

const remarksStat1 = [
    {value: 'For Evaluation', label: 'For Evaluation',name:'Remarks'},
    {value: 'Assessment', label: 'Assessment',name:'Remarks'},
    {value: 'Qualified', label: 'Qualified',name:'Remarks'},
]
const remarksStat2 = [
  {value:'New Scholar',label:'New Scholar',name:'Remarks'},
  {value:'Existing Scholar',label:'Existing Scholar',name:'Remarks'},
  {value:'Pending Renewal',label:'Pending Renewal',name:'Remarks'},
]
const remarksStat3 = [
  {value:'Failed',label:'Disqualified',name:'Remarks'},
  {value:'Revoke',label:'Revoke',name:'Remarks'},
]

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear; year >= 2010; year--) {
    years.push(year);
  }

  return years;
};
const batchOPT = generateYearOptions()?.map(program => ({
  label: program,
  value: program,
  name: 'Batch',
}));


const Report = () => {
  const [value, setValue] = React.useState('1');
  const [payroll,setPayroll] = useState([]);
  const [allData,setAllData] = useState([]);
  const [school,setSchool] = useState('')
  const [filteredData,setFilteredData] = useState([])
  const [show, setShow] = useState(false);
  const [schoProg,setSchoprog] = useState([]);
  const [title,setTitle] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({
    Status: '',
    Batch: '',
    Gender:'',
    Remarks:'',
    ScholarshipProgram:'',
    yearLevel:'',
    baranggay:'',
    appliedDate:null,
    approvedDate:null,
    renewedDate:null,
  });



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() =>{
    async function Fetch(){
      const res = await Payrollreports.PAYROLL()
      const scho = await FetchingSchoProg.FETCH_SCHOPROG()
      const da = await MYDOUsers.ALLDATA()
      setAllData(da.data)
      setPayroll(res.data)
      setSchoprog(scho.data.SchoCat.sort((a, b) => a.name.localeCompare(b.name)))
    }
    Fetch()

},[])

useEffect(() =>{
  filtered()
},[filterCriteria,allData,school])

  const listremarks =
  filterCriteria.Status === 'Applicant' ? remarksStat1 :
  filterCriteria.Status === 'Approved' ? remarksStat2 :
  filterCriteria.Status === 'Disqualified' ? remarksStat3 :
  [];
  const schoprogOPT = schoProg?.map(program => ({
    label: program.name,
    value: program.name,
    name: 'ScholarshipProgram',
  }));
  
  const handlePrint = () => {
    window.print();
  };
  const handleOptionChange = (data) => {
    const { name, value } = data; 
  
    setFilterCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  
  };
  const filtered = () => {
    const filtered = allData.filter((data) => {
      const itemDate = dayjs(data.date);
      const itemDate1 = dayjs(data.approveDate);
      const itemDate2 = dayjs(data.renewedDate);

      return (
        (filterCriteria.Status === '' || data.UserProfileStatus === filterCriteria.Status) &&
        (filterCriteria.Gender === '' || data.gender === filterCriteria.Gender) &&
        (filterCriteria.ScholarshipProgram === '' || data.scholarshipApplied === filterCriteria.ScholarshipProgram) &&
        (filterCriteria.yearLevel === '' || data.yearLevel === filterCriteria.yearLevel) &&
        (filterCriteria.baranggay === '' || data.baranggay === filterCriteria.baranggay) &&
        (filterCriteria.Batch === '' || data.Batch === filterCriteria.Batch) &&
        (filterCriteria.Remarks === '' || data.Remarks === filterCriteria.Remarks) && 
        (school === '' || data.school.toLocaleLowerCase().includes(school.toLocaleLowerCase())) && 
        (filterCriteria.appliedDate ? itemDate.isSame(filterCriteria.appliedDate, 'day') : true) && 
        (filterCriteria.approvedDate ? itemDate1.isSame(filterCriteria.approvedDate, 'day') : true) && 
        (filterCriteria.renewedDate ? itemDate2.isSame(filterCriteria.renewedDate, 'day') : true)
      );
    });
    setFilteredData(filtered);

  };

  const clearFilter = () =>{
    setFilterCriteria({
      Status: '',
      Batch: '',
      Gender:'',
      Remarks:'',
      ScholarshipProgram:'',
      yearLevel:'',
      baranggay:'',
      appliedDate:null,
      approvedDate:null,
      renewedDate:null
    });
  }

  const handleDateChange = (data) =>{
    setFilterCriteria((prev) =>({
      ...prev,
      appliedDate: data
    }))
  }
  const handleDateChange1 = (data) =>{
    setFilterCriteria((prev) =>({
      ...prev,
      approvedDate: data
    }))
  }
  const handleDateChange2 = (data) =>{
    setFilterCriteria((prev) =>({
      ...prev,
      renewedDate: data
    }))
  }
  const dataTransfer = filteredData.length > 0 ? filteredData : [];
  return (

      <>
      <Offcanvas show={show} placement='end' onHide={handleClose}>
        <Offcanvas.Header style={{backgroundColor:'black'}}>
          <Offcanvas.Title style={{fontWeight:'bold',color:'white',letterSpacing:'5px'}}>Filters</Offcanvas.Title>
          
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div style={{display:'flex',flexWrap:'wrap',flexBasis:'40%',justifyContent:'space-between'}}>
          
          <Button onClick={clearFilter} style={{backgroundColor:'red',fontSize:'14px',border:'none'}}><MdOutlineClear />Clear All</Button>
          </div>
           <div className='batchfilter'>
             <Typography sx={{fontWeight:'bold'}}>Status</Typography>
                    <Select
                      value={statusOPT.find((option) => option.value === filterCriteria.Status)}
                      fullWidth
                      styles={{height:'100%'}}
                      onChange={handleOptionChange}
                      placeholder=""
                      isSearchable={false}
                      options={statusOPT}
                    />
           </div>
           <div className='batchfilter'>
             <Typography sx={{fontWeight:'bold'}}>Gender</Typography>
              <div style={{width:'100%',borderBottom:'2px solid gray',paddingBottom:'10px'}}>
              <Select
                      value={genderOPT.find((option) => option.value === filterCriteria.Gender)}
                      fullWidth
                      styles={{height:'100%'}}
                      onChange={handleOptionChange}
                      placeholder=""
                      isSearchable={false}
                      options={genderOPT}
              />
              </div>
           </div>
           <div className='batchfilter' style={{marginTop:'10px'}}>
             <Typography sx={{fontWeight:'bold'}}>Standing</Typography>
              <div style={{width:'100%',borderBottom:'2px solid gray',paddingBottom:'10px'}}>
              <Select
                      value={listremarks.find((option) => option.value === filterCriteria.Remarks)}
                      fullWidth
                      styles={{height:'100%'}}
                      onChange={handleOptionChange}
                      placeholder=""
                      isSearchable={false}
                      options={listremarks}
              />               
              </div>
           </div>
           <div className='batchfilter' style={{marginTop:'10px'}}>
             <Typography sx={{fontWeight:'bold'}}>Scholarship Program</Typography>
              <div style={{width:'100%',borderBottom:'2px solid gray',paddingBottom:'10px'}}>
              <Select
                      value={schoprogOPT.find((option) => option.value === filterCriteria.ScholarshipProgram)}
                      fullWidth
                      styles={{height:'100%'}}
                      onChange={handleOptionChange}
                      placeholder=""
                      isSearchable={false}
                      options={schoprogOPT}
              /> 
              </div>
           </div>
           <div className='batchfilter' style={{marginTop:'10px'}}>
             <Typography sx={{fontWeight:'bold'}}>Year Level</Typography>
              <div style={{width:'100%',borderBottom:'2px solid gray',paddingBottom:'10px'}}>
              <Select
                      value={YearLevel.find((option) => option.value === filterCriteria.yearLevel)}
                      fullWidth
                      styles={{height:'100%'}}
                      onChange={handleOptionChange}
                      placeholder=""
                      isSearchable={false}
                      options={YearLevel}
              /> 
              </div>
           </div>
           <div className='batchfilter' style={{marginTop:'10px'}}>
             <Typography sx={{fontWeight:'bold'}}>Baranggay</Typography>
              <div style={{width:'100%',borderBottom:'2px solid gray',paddingBottom:'10px'}}>
              <Select
                      value={Baranggay.find((option) => option.value === filterCriteria.baranggay)}
                      fullWidth
                      styles={{height:'100%'}}
                      onChange={handleOptionChange}
                      placeholder=""
                      isSearchable={false}
                      options={Baranggay}
              /> 
              </div>
           </div>
           <div className='batchfilter' style={{marginTop:'10px'}}>
             <Typography sx={{fontWeight:'bold'}}>Batch</Typography>
              <div style={{width:'100%',borderBottom:'2px solid gray',paddingBottom:'10px'}}>
              <Select
                      value={batchOPT.find((option) => option.value === filterCriteria.Batch)}
                      fullWidth
                      styles={{height:'100%'}}
                      onChange={handleOptionChange}
                      placeholder=""
                      isSearchable={false}
                      options={batchOPT}
              />                              
              </div>
           </div>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="faqs" style={{backgroundColor:'whitesmoke'}}>
          <Sidebar/>
      <div className="faqsContainer"style={{width: 'maxContent'}}>
          <Navbar/>
          <div>
            <h2 style={{margin:'5px 0px 5px 20px'}}>Reports</h2>
            <Box sx={{ width: 'maxContent'}}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider',margin:'0px',padding:'0px' }}>
                  <TabList onChange={handleChange}>
                    <Tab label="User Reports" value="1" />
                    <Tab label="Payroll " value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Box>
                    <div style={{display:'flex',justifyContent:"space-between",marginBottom:'10px',width:'100%',alignItems:'center'}}>
                      <Button style={{backgroundColor:'white',color:'black',padding:'0px 15px 0px 15px',height:'38px',marginTop:'8px',borderRadius:'3px'}} onClick={handleShow}><img style={{width:'15px'}} src={FilterIcon} alt='' />
                      All Filters
                      </Button>
                    </div>
                    <div style={{display:'flex',justifyContent:"space-between",alignItems:'center',width:'1000px'}}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                          <DatePicker
                                slotProps={{
                                  textField: {
                                  size: "small",
                                  error: false,
                                },
                            }}  
                            sx={{backgroundColor:'white'}}                      
                            label="Applied Date"
                            value={filterCriteria.appliedDate}
                            onChange={(newValue) => handleDateChange(newValue)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                          <DatePicker
                                slotProps={{
                                  textField: {
                                  size: "small",
                                  error: false,
                                },
                            }}  
                            sx={{backgroundColor:'white'}}                      
                            label="Approved Date"
                            value={filterCriteria.approvedDate}
                            onChange={(newValue) => handleDateChange1(newValue)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                          <DatePicker
                                slotProps={{
                                  textField: {
                                  size: "small",
                                  error: false,
                                },
                            }}  
                            sx={{backgroundColor:'white'}}                      
                            label="Renewed Date"
                            value={filterCriteria.renewedDate}
                            onChange={(newValue) => handleDateChange2(newValue)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <div style={{marginTop:'8px'}}>
                        <input 
                        style={{hieght:'50px',padding:'5px',borderRadius:'5px',borderColor:'gray',width:'max-content'}}
                        type="text" 
                        value={school}
                        placeholder='Filter by School'
                        onChange={(e) =>setSchool(e.target.value)}
                        name='school'
                        />
                      </div>
                      </div>
                    <div>
                      <div style={{display:'flex',alignItems:'center',marginBottom:'5px'}}>
                        <Form.Group style={{marginTop:'8px',borderRadius:'3px',marginRight:'5px'}}>
                          <Form.Control type="text"
                          value={title}
                           placeholder="Enter reports title here..."
                           onChange={(e) => setTitle(e.target.value)}
                           />
                        </Form.Group>
                        <Button style={{marginRight:'12px',padding:'0px 15px 0px 15px',height:'35px',marginTop:'8px',borderRadius:'3px'}} onClick={handlePrint}>
                          <BsFillPrinterFill style={{marginRight:'2px',marginTop:'-2px'}}/>Print
                        </Button>
                      </div>
                    </div>
                    <Batch data={{dataTransfer,filterCriteria,title}}/>
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <div>
                  <Payroll data={payroll}/>
                  </div>
          
                </TabPanel>
              </TabContext>
            </Box>
          </div>
      </div>
      </div>
      </>

  )
}

export default Report