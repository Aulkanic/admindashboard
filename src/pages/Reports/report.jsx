import React, { useEffect, useState } from 'react'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FetchingSchoProg } from '../../api/request';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Typography,TextField } from '@mui/material';
import Payroll from './payroll';
import Batch from './batch';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FilterIcon from '../../Images/filter.png'
import { Payrollreports,Userlistsreports } from '../../api/request';
import CustomNoRowsOverlay from '../Design/Norows';
import { FaFilter } from 'react-icons/fa';
import { MdOutlineClear } from 'react-icons/md';


const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const Baranggay = [
  {label: 'Abangan Norte',value: 'ABANGAN NORTE'},
  {label: 'Abangan Sur',value: 'ABANGAN SUR'},
  {label: 'Ibayo',value: 'IBAYO'},
  {label: 'Lambakin',value: 'LAMBAKIN'},
  {label: 'Lias',value: 'LIAS'},
  {label: 'Loma de gato',value: 'LOMA DE GATO'},
  {label: 'Nagbalon',value: 'NAGBALON'},
  {label: 'Patubig',value: 'PATUBIG'},
  {label: 'Poblacion I',value: 'POBLACION I'},
  {label: 'Poblacion II',value: 'POBLACION II'},
  {label: 'Prenza I',value: 'PRENZA I'},
  {label: 'Prenza II',value: 'PRENZA II'},
  {label: 'Saog',value: 'SAOG'},
  {label: 'Sta. Rosa I',value: 'STA. ROSA I'},
  {label: 'Sta. Rosa II',value: 'STA. ROSA II'},
  {label: 'Tabing Ilog',value: 'TABING-ILOG'},
]
const YearLevel = [
  {label: 'Elementary',value: 'ELEMENTARY'},
  {label: 'Highschool',value: 'HIGHSCHOOL'},
  {label: 'College',value: 'COLLEGE'},
]
const remarksStat1 = [
    {value: 'For Evaluation', label: 'For Evaluation'},
    {value: 'Assessment', label: 'Assessment'},
    {value: 'Qualified', label: 'Qualified'},
]
const remarksStat2 = [
  {value:'New Scholar',label:'New Scholar'},
  {value:'Existing Scholar',label:'Existing Scholar'},
  {value:'Pending Renewal',label:'Pending Renewal'},
]
const remarksStat3 = [
  {value:'Failed',label:'Disqualified'},
  {value:'Revoke',label:'Revoke'},
]

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear; year >= 2010; year--) {
    years.push(year);
  }

  return years;
};


const Report = () => {
  const [value, setValue] = React.useState('1');
  const [payroll,setPayroll] = useState([])
  const [show, setShow] = useState(false);
  const [schoProg,setSchoprog] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    Status: '',
    Batch: '',
    Gender:'',
  });
  const [selectedBaranggays, setSelectedBaranggays] = useState([]);
  const [selectedYearlevel, setSelectedYearlevel] = useState([]);
  const [selectedSchoprog, setSelectedSchoprog] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedRem, setSelectedRem] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({
      ...filterCriteria,
      [name]: value,
    });
  };

  const handleBaranggayChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedBaranggays([...selectedBaranggays, value]);
    } else {
      setSelectedBaranggays(selectedBaranggays.filter((baranggay) => baranggay !== value));
    }
  };
  const handleYearlevelChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedYearlevel([...selectedYearlevel, value]);
    } else {
      setSelectedYearlevel(selectedYearlevel.filter((yearlevel) => yearlevel !== value));
    }
  };
  const handleRemarksChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedRem([...selectedRem, value]);
    } else {
      setSelectedRem(selectedRem.filter((rem) => rem !== value));
    }
  };
  const handleSchoprogChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSchoprog([...selectedSchoprog, value]);
    } else {
      setSelectedSchoprog(selectedSchoprog.filter((yearlevel) => yearlevel !== value));
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() =>{
    async function Fetch(){
      const res = await Payrollreports.PAYROLL()
      const scho = await FetchingSchoProg.FETCH_SCHOPROG()
      setPayroll(res.data)
      setSchoprog(scho.data.SchoCat.sort((a, b) => a.name.localeCompare(b.name)))
    }
    Fetch()
},[])

const handleSubmitFilter = async () => {

  try {
    const queryParams = {
      ...filterCriteria,
      ScholarshipProgram: selectedSchoprog,
      Baranggay: selectedBaranggays,
      yearLevel: selectedYearlevel,
      Remarks: selectedRem
    }
    const queryString = Object.keys(queryParams)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryParams[key]))
    .join("&");
    await Userlistsreports.USERLISTED(queryString)
    .then((res) =>{
      setFilteredStudents(res.data);
    })


  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  const ListofBaranggay = Baranggay.map((data,index) =>{
    return(
    <label key={index} style={{padding:'2px',margin:'3px'}}>
    <input
      type="checkbox"
      value={data.value} 
      name="batch"
      checked={selectedBaranggays.includes(data.value)}
      onChange={handleBaranggayChange}
      style={{marginRight:'2px',marginTop:'3px'}}
    />
    {data.label}
    </label>                 
  )})
  const ListofSchoProg = schoProg?.map((data,index) =>{

    return(
      <label key={index} style={{padding:'2px',margin:'3px'}}>
      <input
        type="checkbox"
        value={data.name} 
        name="batch"
        className='customcheck'
        checked={selectedSchoprog.includes(data.name)}
        onChange={handleSchoprogChange}
        style={{marginRight:'2px',marginTop:'3px'}}
      />
      {data.name}
      </label> 
    )
  })
  const ListofYearlevel = YearLevel?.map((data,index) =>{

    return(
      <label key={index} style={{padding:'2px',margin:'3px'}}>
      <input
        type="checkbox"
        value={data.value} 
        name="batch"
        className='customcheck'
        checked={selectedYearlevel.includes(data.value)}
        onChange={handleYearlevelChange}
        style={{marginRight:'2px',marginTop:'3px'}}
      />
      {data.label}
      </label> 
    )
  })
  const AppliList = remarksStat1?.map((data,index) =>{
    return(
      <label key={index} style={{padding:'2px',margin:'3px'}}>
      <input
        type="checkbox"
        value={data.value} 
        name="batch"
        className='customcheck'
        checked={selectedRem.includes(data.value)}
        onChange={handleRemarksChange}
        style={{marginRight:'2px',marginTop:'3px'}}
      />
      {data.label}
      </label> 
    )  
  })
  const SchoList = remarksStat2?.map((data,index) =>{
    return(
      <label key={index} style={{padding:'2px',margin:'3px'}}>
      <input
        type="checkbox"
        value={data.value} 
        name="batch"
        className='customcheck'
        checked={selectedRem.includes(data.value)}
        onChange={handleRemarksChange}
        style={{marginRight:'2px',marginTop:'3px'}}
      />
      {data.label}
      </label> 
    )  
  })
  const FailList = remarksStat3?.map((data,index) =>{
    return(
      <label key={index} style={{padding:'2px',margin:'3px'}}>
      <input
        type="checkbox"
        value={data.value} 
        name="batch"
        className='customcheck'
        checked={selectedRem.includes(data.value)}
        onChange={handleRemarksChange}
        style={{marginRight:'2px',marginTop:'3px'}}
      />
      {data.label}
      </label> 
    )  
  })
  
  const handlePrint = () => {
    window.print();
  };
  const clearFilter = () =>{
    setFilterCriteria({
      Status: '',
      Batch: '',
      Gender:'',
    });
    setSelectedBaranggays([])
    setSelectedRem([])
    setSelectedSchoprog([])
    setSelectedYearlevel([])
  }
  return (
    <>
      <Offcanvas show={show} placement='end' onHide={handleClose}>
        <Offcanvas.Header style={{backgroundColor:'black'}}>
          <Offcanvas.Title style={{fontWeight:'bold',color:'white',letterSpacing:'5px'}}>Filters</Offcanvas.Title>
          
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div style={{display:'flex',flexWrap:'wrap',flexBasis:'40%',justifyContent:'space-between'}}>
          <Button style={{fontSize:'14px'}} onClick={handleSubmitFilter}><FaFilter style={{marginRight:'5px',marginTop:'-5px'}} />Filter</Button>
          <Button onClick={clearFilter} style={{backgroundColor:'red',fontSize:'14px',border:'none'}}><MdOutlineClear />Clear All</Button>
          </div>
           <div className='batchfilter'>
             <Typography sx={{fontWeight:'bold'}}>Status</Typography>
              <div style={{width:'100%',borderBottom:'2px solid gray',paddingBottom:'10px'}}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={filterCriteria.Status}
                  name="Status"
                  onChange={handleInputChange}
                  
                >
                  <FormControlLabel value="Applicants" control={<BpRadio  />} label="Applicants" />
                  <FormControlLabel  value="Approved" control={<BpRadio  />} label="Scholars" />
                  <FormControlLabel  value="Failed" control={<BpRadio  />} label="Disqualified" />
                </RadioGroup>
              </FormControl>
              </div>
           </div>
           <div className='batchfilter'>
             <Typography sx={{fontWeight:'bold'}}>Gender</Typography>
              <div style={{width:'100%',borderBottom:'2px solid gray',paddingBottom:'10px'}}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={filterCriteria.Gender}
                  name="Gender"
                  onChange={handleInputChange}
                  
                >
                  <FormControlLabel  value="" control={<BpRadio  />} label="All" />
                  <FormControlLabel  value="MALE" control={<BpRadio  />} label="Male" />
                  <FormControlLabel  value="FEMALE" control={<BpRadio  />} label="Female" />
                  <FormControlLabel  value="OTHERS" control={<BpRadio  />} label="Others" />
                </RadioGroup>
              </FormControl>
              </div>
           </div>
           <div className='batchfilter' style={{marginTop:'10px'}}>
             <Typography sx={{fontWeight:'bold'}}>Standing</Typography>
              <div style={{width:'100%',borderBottom:'2px solid gray',paddingBottom:'10px'}}>
              <FormControl>
              <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  
                >
                 {filterCriteria.Status === 'Applicants' && AppliList}
                 {filterCriteria.Status === 'Approved' && SchoList}
                 {filterCriteria.Status === 'Failed' && FailList}
                </RadioGroup>
              </FormControl>
              </div>
           </div>
           <div className='batchfilter' style={{marginTop:'10px'}}>
             <Typography sx={{fontWeight:'bold'}}>Scholarship Program</Typography>
              <div style={{width:'100%',borderBottom:'2px solid gray',paddingBottom:'10px'}}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  
                >
                  {ListofSchoProg}
                </RadioGroup>
              </FormControl>
              </div>
           </div>
           <div className='batchfilter' style={{marginTop:'10px'}}>
             <Typography sx={{fontWeight:'bold'}}>Year Level</Typography>
              <div style={{width:'100%',borderBottom:'2px solid gray',paddingBottom:'10px'}}>
                {ListofYearlevel}
              </div>
           </div>
           <div className='batchfilter' style={{marginTop:'10px'}}>
             <Typography sx={{fontWeight:'bold'}}>Baranggay</Typography>
              <div style={{width:'100%',borderBottom:'2px solid gray',paddingBottom:'10px'}}>
                 {ListofBaranggay}
              </div>
           </div>
           <div className='batchfilter' style={{marginTop:'10px'}}>
             <Typography sx={{fontWeight:'bold'}}>Batch</Typography>
              <div style={{width:'100%',borderBottom:'2px solid gray',paddingBottom:'10px'}}>
              <TextField
                      select
                      fullWidth
                      color='secondary'
                      value={filterCriteria.Batch}
                      name="Batch"
                      size='small'
                      onChange={handleInputChange}
                      >
                       {generateYearOptions().map((year) => (
                          <MenuItem key={year} value={year}>
                            {year}
                          </MenuItem>
                        ))}      
                </TextField>                  
              </div>
           </div>
        </Offcanvas.Body>
      </Offcanvas>
    <div className="scholarships" style={{backgroundColor:'whitesmoke'}}>
        <Sidebar/>
    <div className="scholarshipsContainer">
        <Navbar/>
        <div>
          <h2 style={{margin:'5px 0px 10px 20px'}}>Reports</h2>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="User Reports" value="1" />
                  <Tab label="Payroll " value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box>
                  <div style={{marginBottom:'15px',display:'flex',justifyContent:"space-between"}}>
                    <Button style={{backgroundColor:'white',color:'black'}} onClick={handleShow}><img style={{width:'15px'}} src={FilterIcon} alt='' />All Filters</Button>
                    <Button onClick={handlePrint}>Print</Button>
                 
                  </div>
                  <div id='printable'>
                  <Batch data={{filteredStudents,filterCriteria}}/>
                  </div>

                </Box>
              </TabPanel>

              <TabPanel value="2">
                <div id='printable'>
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