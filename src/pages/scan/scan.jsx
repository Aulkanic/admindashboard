import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import TextField from '@mui/material/TextField';
import { ScanFile } from '../../api/request';
import swal from 'sweetalert';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { GrLinkNext } from "react-icons/gr";
import Swal from 'sweetalert2';

export default function Scan() {
  const [active,setActive] = useState({
    tabs:1,
    part:0
  })
  const [first,setFirst] = useState([
    {Personal:{name:'Personal',label:'Personal Section',preview:'',value:null}},
    {Educational:{name:'Educational',label:'Educational Section',preview:'',value:null}},
    {Family:{name:'Family',label:'Family Section',preview:'',value:null}},
    {Guardian:{name:'Guardian',label:'Guardian Section',preview:'',value:null}},
    {Siblings:{name:'Siblings',label:'Siblings Section',preview:'',value:null}}
  ])
  const [scannedData,setScannedData] = useState({
    lastName:'',firstName:'',middleName:'',schoID:'',age:'',gender:'',
    houseNum:'',birthdate:'',baranggay:'',contactNum:'',email:'',
    prevSchool:'',schoAddress:'',yearLevel:'',gradeLevel:'',course:'',
    fatherLastName:'',fatherFirstName:'',fatherMiddleName:"",fatherOccu:'',fatherEduc:'',
    motherLastName:'',motherFirstName:'',motherMiddleName:"",motherOcc:'',motherEduc:'',
    guardianLastName:'',guardianFirstName:'',guardianMiddleName:'',relationship:'',guardianContact:'',guardianAddr:'',
    siblings:[]
  })
  const [qaFile,setQAFile] = useState({
    file:null,
    preview:null
  })
  const handleFirstImages = (e) => {
    const { files, name } = e.target;
    const file = files[0];
  
    setFirst((prev) =>
    prev.map((item) => {
      const categoryKey = Object.keys(item)[0];

      if (categoryKey === name) {
        return {
          ...item,
          [name]: {
            ...item[name],
            value: file,
            preview: file ? URL.createObjectURL(file) : '',
          },
        };
      }

      return item;
    })
  );

  };
  const startScanning = async() =>{
    if(!Object.values(first).every(v=> v!== null)){
      swal("Please upload all the required documents")
      return
    }
    const formData = new FormData();
    Object.entries(first).forEach(([key,value])=>{
      formData.append(`${key}`, value)
    })
    await ScanFile.SCANFILE(formData)
    .then((res) =>{
      const apiData = res.data;
      const mapping = {
        // Personal section
        'First Name': 'firstName',
        'Middle Name': 'middleName',
        'Last Name': 'lastName',
        'Age': 'age',
        'Gender': 'gender',
        'House No/ Street': 'houseNum',
        'Birth Date': 'birthdate',
        'Barangay': 'baranggay',
        'Mobile Number': 'contactNum',
        'Email': 'email',
        "scholarship Type":'schoID',
      
        // Educational section
        'Last School Attended': 'prevSchool',
        'School Address': 'schoAddress',
        'Year Level': 'yearLevel',
        'Grade/ Year': 'gradeLevel',
      
        // Family section
        "Father’s First Name": 'fatherFirstName',
        "Father’s Middle Name": 'fatherMiddleName',
        "Father’s Last Name": 'fatherLastName',
        'Highest Educational Attainment': 'fatherEduc',
        'Occupation': 'fatherOccu',
        "Mother’s First Name": 'motherFirstName',
        "Mother’s Middle Name": 'motherMiddleName',
        "Mother’s Last Name": 'motherLastName',
        // eslint-disable-next-line no-dupe-keys
        'Highest Educational Attainment': 'motherEduc',
        // eslint-disable-next-line no-dupe-keys
        'Occupation': 'motherOcc',
      
        // Guardian section
        'Guardian First Name': 'guardianFirstName',
        'Guardian Middle Name': 'guardianMiddleName',
        'Guardian Last Name': 'guardianLastName',
        'Guardian Address': 'guardianAddr',
        'Relationship with Guardian': 'relationship',
        // eslint-disable-next-line no-dupe-keys
        'Mobile Number': 'guardianContact',
      
        // Siblings section
        // eslint-disable-next-line no-dupe-keys
        'First Name': 'siblings[0].firstName',  // assuming siblings is an array
      
        // Q&A section (assuming you want to store the answers in your state)
        'How long?': 'qaHowLong',
        'Type of house Ownership?': 'qaHouseOwnership',
      };
      const processedData = Object.keys(mapping).reduce((acc, apiKey) => {
        const stateKey = mapping[apiKey];
        console.log(stateKey)
        const section = apiData[apiKey.split(' ')[0]]; // Extracting the section name from the key
        const apiValue = section?.find(item => Object.keys(item)[0] === apiKey)?.[apiKey] || '';
        acc[stateKey] = apiValue;
        return acc;
      }, {});
      console.log(processedData)
      setScannedData(prev => ({ ...prev, ...processedData }));
    })
  }
  const handleChangeActive = (name,value) =>{
    setActive((prev) =>({
      ...prev,
      [name]: value
    }))
  }
  const viewPrev = (data) =>{
    Swal.fire({
      imageUrl: data,
      imageWidth: 600,
      imageHeight: 400,
      imageAlt: "Custom image"
    });
  }
  const handleInputChange = (e) =>{
    const { name, value,files } = e.target;
    setScannedData((prev) =>({
      ...prev,
      [name]: value
    }))
    if(files){
      setQAFile((prev) =>({
        ...prev,
        [name]: files[0],
        previewURL:(URL.createObjectURL(files[0]))
      }))
    }
  }

  return (
    <>
    <div style={{display:'flex',flexWrap:'wrap',width:'100%'}}>
      <div>
      <Sidebar />
      </div>
      <div style={{flex:1,width:'100%',display:'flex',flexDirection:'column',height:'100vh'}}>
          <Navbar />
          <div style={{display:'flex',height:'100%'}}>
            {active.tabs === 0 && 
            <div style={{display:'flex',flexDirection:'column',gap:16,justifyContent:'center',alignItems:'center',width:'100%'}}>
              <div style={{display:'flex',alignItems:'center', padding:24,borderRadius:'10px',backgroundColor:'blue',color:'white',cursor:'pointer',justifyContent:'space-between',width:'500px'}}
              onClick={() =>{handleChangeActive('tabs',1)}}
              >
                <p style={{margin:0,color:'white',fontWeight:'bold',fontSize:'26px'}}>Scan Application Form</p>
                <GrLinkNext size={24}  />
              </div>
              <div style={{display:'flex',alignItems:'center', padding:24,borderRadius:'10px',backgroundColor:'blue',color:'white',cursor:'pointer',justifyContent:'space-between',width:'500px'}}
               onClick={(prev) =>{ setActive({...prev,tabs:2})}}
              >
                <p style={{margin:0,color:'white',fontWeight:'bold',fontSize:'26px'}}>Manage Application Form</p>
                <GrLinkNext size={24} style={{color:'white'}} />
              </div>
            </div>}
          {active.tabs === 1 && 
          <div style={{width:'100%',padding:'10px'}}>
            <button onClick={() =>{handleChangeActive('tabs',0)}}
              style={{border:'none',display:'flex',alignItems:'center',margin:'4px'}}>
            <IoIosArrowBack />
            <p style={{margin:0}}> Go Back</p>
            </button>
            <div style={{padding:'8px',display:'flex',gap:10}}>
              <div style={{flex:1}}>
                <div style={{display:'flex',gap:'4px',paddingRight:'12px',marginBottom:'10px',flexDirection:'column'}}>
                  <div style={{display:'flex',flexDirection:'column',flexWrap:'wrap'}}>
                    <label htmlFor="">1st Part of Form:</label>
                    <div style={{display:'flex',flexWrap:'wrap',width:'100%',gap:'10px'}}>
                    {first.map((data,idx) =>{
                      const field = Object.keys(data)[0];
                      const array = data[field];
                      return(
                        <div style={{width:'40%',display:'flex',flexDirection:'column'}} key={idx}>
                        {array.preview && 
                        <img style={{height:'150px',objectFit:'fill',cursor:'pointer'}}
                         onClick={() =>{viewPrev(array.preview)}}
                         src={array.preview} alt='No preview' />}
                        <label style={{display:'flex',flexDirection:'column',backgroundColor:'gray',width:'100%',padding:'4px',borderRadius:'4px',color:'white'}}
                        htmlFor="">{array.label}
                        <input onChange={handleFirstImages} name={array.name} accept=".jpg, .jpeg, .png" type="file" />
                        </label>
                        </div>
                      )
                    })}
                    </div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column'}}>
                    <label htmlFor="">2nd Part of Form:</label>
                    {qaFile.preview && 
                    <img style={{height:'150px',objectFit:'fill',cursor:'pointer'}}
                      onClick={() =>{viewPrev(qaFile.preview)}}
                      src={qaFile.preview} alt='No preview' />}
                    <label style={{display:'flex',flexDirection:'column',margin:4,flex:1,backgroundColor:'gray',width:'max-content',padding:'4px',borderRadius:'4px',color:'white'}}
                    htmlFor="">Q&A
                    <input onChange={handleInputChange}
                     accept=".jpg, .jpeg, .png" type="file" />
                    </label>
                  </div>
                </div>
                <div style={{display:'flex',justifyContent:'center',margin:'10px 0px 10px 0px'}}>
                <button onClick={startScanning}
                style={{whiteSpace:'nowrap',borderRadius:'4px',border:'none',backgroundColor:'blue',color:'white',padding:'4px 10px'}}
                >Start Scanning!</button>
                </div>
              </div>
              <div style={{flex:1,display:'flex',flexDirection:'column'}}>
                <div style={{width:'100%',display:'flex'}}>
                  <button onClick={() =>{handleChangeActive('part',0)}}
                  style={{flex:1}}>1st Part Result</button>
                  <button onClick={() =>{handleChangeActive('part',1)}}
                  style={{flex:1}}>2nd Part Result</button>
                </div>
                <div style={{padding:'8px',width:'100%'}}>
                  {active.part === 0 && 
                  <div style={{padding:'4px'}}>
                    <form action="" method="post">
                      <h3>Personal Information</h3>
                      <div  style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Lastname:" onChange={handleInputChange} name='lastName' value={scannedData.lastName} variant="standard" />
                      <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Firstname:" onChange={handleInputChange} name='firstName' value={scannedData.firstName} variant="standard" />
                      <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Middlename:" onChange={handleInputChange} name='middleName' value={scannedData.middleName} variant="standard" />
                      </div>
                      <div  style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Scholarship Applying for:" onChange={handleInputChange} name='schoID' value={scannedData.schoID} variant="standard" />
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Age:" onChange={handleInputChange} name='age' value={scannedData.age} variant="standard" />
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Gender:" onChange={handleInputChange} name='gender' value={scannedData.gender} variant="standard" />
                      </div>
                      <div  style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Street/House#:" onChange={handleInputChange} name='houseNum' value={scannedData.houseNum} variant="standard" />
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Baranggay:" onChange={handleInputChange} name='baranggay' value={scannedData.baranggay} variant="standard" />
                      </div>
                      <div  style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Municipality:" value={'Marilao'} variant="standard" />
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Province:" value={'Bulacan'} variant="standard" />
                      </div>
                      <div  style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Birthday:" onChange={handleInputChange} name='birthdate' value={scannedData.birthdate} variant="standard" />
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Contact Number:"onChange={handleInputChange} name='contactNum' value={scannedData.contactNum} variant="standard" />
                      </div>
                      <div  style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                      <TextField style={{flex:1,}} id="standard-basic" aria-readonly label="Email:" onChange={handleInputChange} name='email'  value={scannedData.email} variant="standard" />
                      </div>
                      <h3>Educational Information</h3>
                      <div  style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Last School Attended:" onChange={handleInputChange} name='prevSchool' value={scannedData.prevSchool} variant="standard" />
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Address:" onChange={handleInputChange} name='schoAddress' value={scannedData.schoAddress} variant="standard" />
                      </div>
                      <div  style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Year Level:" onChange={handleInputChange} name='yearLevel' value={scannedData.yearLevel} variant="standard" />
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Grade Level:" onChange={handleInputChange} name='gradeLevel' value={scannedData.gradeLevel} variant="standard" />
                      </div>
                      <div  style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Course:" onChange={handleInputChange} name='course' value={scannedData.course} variant="standard" />
                      </div>
                      <h3>Family Information</h3>
                      <div style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Father lastname:" onChange={handleInputChange} name='fatherLastName' value={scannedData.fatherLastName} variant="standard" />
                      <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Father firstname:" onChange={handleInputChange} name='fatherFirstName' value={scannedData.fatherFirstName} variant="standard" />
                      <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Father middlename:" onChange={handleInputChange} name='fatherMiddleName' value={scannedData.fatherMiddleName} variant="standard" />
                      </div>
                      <div style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:6,marginBottom:'8px'}}>
                      <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Highest Educational Attainment:" onChange={handleInputChange} name='fatherEduc' value={scannedData.fatherEduc} variant="standard" />
                      <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Occupation:" onChange={handleInputChange} name='fatherOccu' value={scannedData.fatherOccu} variant="standard" />
                      </div>
                      <div style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Mother lastname:" onChange={handleInputChange} name='motherLastName' value={scannedData.motherLastName} variant="standard" />
                      <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Mother firstname:" onChange={handleInputChange} name='motherFirstName' value={scannedData.motherFirstName} variant="standard" />
                      <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Mother middlename:" onChange={handleInputChange} name='motherMiddleName' value={scannedData.motherMiddleName} variant="standard" />
                      </div>
                      <div style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:6,marginBottom:'8px'}}>
                      <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Highest Educational Attainment:" onChange={handleInputChange} name='motherEduc' value={scannedData.motherEduc} variant="standard" />
                      <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Occupation:" onChange={handleInputChange} name='motherOccu' value={scannedData.motherOcc} variant="standard" />
                      </div>
                      <h3>Guardian Information</h3>
                      <div style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Guardian lastname:" onChange={handleInputChange} name='guardianLastName' value={scannedData.guardianLastName} variant="standard" />
                      <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Guardian firstname:" onChange={handleInputChange} name='guardianFirstName' value={scannedData.guardianFirstName} variant="standard" />
                      <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Guardian middlename:" onChange={handleInputChange} name='guardianMiddleName' value={scannedData.guardianMiddleName} variant="standard" />
                      </div>
                      <div style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Relationship:" onChange={handleInputChange} name='relationship' value={scannedData.relationship} variant="standard" />
                      <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Contact Number:" onChange={handleInputChange} name='guardianContact' value={scannedData.guardianContact} variant="standard" />
                      </div>
                      <div style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                      <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Address:" onChange={handleInputChange} name='guardianAddr' value={scannedData.guardianAddr} variant="standard" />
                      </div>
                      <h3>Siblings</h3>
                      <div style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                      <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Lastname:" value={'Michael'} variant="standard" />
                      <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Firstname:" value={'Michael'} variant="standard" />
                      <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Middlename:" value={'Michael'} variant="standard" />
                      </div>
                    </form>
                  </div>}
                  {active.part === 1 && 
                  <div>
                  
                  </div>}
                </div>
              </div>
            </div>
           </div>}
          </div>

      </div>

    </div>
    </>
  )
}
