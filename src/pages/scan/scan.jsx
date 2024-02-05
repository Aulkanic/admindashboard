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
    houseNum:'',birthdate:'',baranggay:'',contactNum:'',email:'',placeBirth:'',
    prevSchool:'',schoAddress:'',yearLevel:'',gradeLevel:'',course:'',
    fatherLastName:'',fatherFirstName:'',fatherMiddleName:"",fatherOccu:'',fatherEduc:'',
    motherLastName:'',motherFirstName:'',motherMiddleName:"",motherOcc:'',motherEduc:'',
    guardianLastName:'',guardianFirstName:'',guardianMiddleName:'',relationship:'',guardianContact:'',guardianAddr:'',
    siblings:[],form:[]
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
    if(!Object.values(qaFile).every(v=> v!== null)){
      swal('No Q&A File Uploaded')
      return
    }
    const formData = new FormData();
    formData.append('Personal',first[0].Personal.value)
    formData.append('Educational',first[1].Educational.value)
    formData.append('Family',first[2].Family.value)
    formData.append('Guardian',first[3].Guardian.value)
    formData.append('Siblings',first[4].Siblings.value)
    formData.append('Q&A',qaFile.file)
    await ScanFile.SCANFILE(formData)
    .then((res) =>{
      const apiData = res.data;
      const personal = apiData.Personal;
      const Educational = apiData.Educational;
      const Family = apiData.Family;
      const Guardian = apiData.Guardian;
      const Siblings = apiData.Siblings;
      const qA = apiData['Q&A'];
      console.log('personal',personal)
      console.log('Educational',Educational)
      console.log('Family',Family)
      console.log('Guardian',Guardian)
      console.log('Siblings',Siblings)

      setScannedData((prev) =>({
        ...prev,
        schoID: personal[0]['Scholarship Type'],
        firstName: personal[1]['First Name'],
        lastName: personal[3]['Last Name'],
        middleName: personal[2]['Middle Name'],
        gender: personal[6]['Gender'],
        age: personal[5]['Age'],
        birthdate: personal[7]['Birth Date'],
        placeBirth: personal[8]['Birth Place'],
        houseNum: personal[9]['House No/ Street'],
        baranggay: personal[11]['Barangay'],
        contactNum: personal[10]['Mobile Number'],
        email: personal[14]['Email'],
        prevSchool: Educational[0]['Last School Attended'],
        schoAddress: Educational[1]['School Address'],
        yearLevel: Educational[2]['Year Level'],
        gradeLevel: Educational[3]['Grade/ Year'],
        course: Educational[4]['Course'],
        fatherFirstName: Family[0]['Father’s First Name'],
        fatherLastName: Family[2]['Father’s Last Name'],
        fatherMiddleName: Family[1]['Father’s Middle Name'],
        fatherEduc: Family[3]['Father’s Highest Educational Attainment'],
        fatherOccu: Family[4]['Father’s Occupation'],
        motherFirstName: Family[5]['Mother’s First Name'],
        motherLastName: Family[7]['Mother’s Last Name'],
        motherMiddleName: Family[6]['Mother’s Middle Name'],
        motherEduc: Family[8]['Mother’s Highest Educational Attainment'],
        motherOcc: Family[9]['Mother’s Occupation'] ,
        guardianFirstName: Guardian[0]['Guardian First Name'],
        guardianLastName: Guardian[2]['Guardian Last Name'],
        guardianMiddleName: Guardian[1]['Guardian Middle Name'],
        relationship: Guardian[4]['Relationship with Guardian'],
        guardianContact: Guardian[5]['Mobile Number'],
        guardianAddr: Guardian[3]['Guardian Address'],
        siblings: Siblings,
        form: qA
      }))
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
        preview:(URL.createObjectURL(files[0]))
      }))
    }
  }
  const handleSiblingsChange = (index, key, value) => {
    setScannedData(prevState => {
      const updatedSiblings = [...prevState.siblings];

      if (index === -1) {
        // Add new sibling
        updatedSiblings.push({ [key]: value });
      } else {
        // Update existing sibling
        updatedSiblings[index][key] = value;
      }

      return {
        ...prevState,
        siblings: updatedSiblings
      };
    });
  };

  const handleAddSibling = () => {
    setScannedData(prev =>({
      ...prev,
      siblings:[...prev.siblings,{
        'First Name': '',
        'Middle Name': '',
        'Last Name': ''
      }]
    }))
// You can set the initial values as needed
  };

  const handleRemoveSibling = (index) => {
    setScannedData(prevState => {
      const updatedSiblings = [...prevState.siblings];
      updatedSiblings.splice(index, 1);

      return {
        ...prevState,
        siblings: updatedSiblings
      };
    })
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
                        <img style={{width:'150px',height:'150px',objectFit:'fill',cursor:'pointer'}}
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
                    <input name='file' onChange={handleInputChange}
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
                      <TextField style={{flex:1,}} id="standard-basic" aria-readonly label="Place of Birth:" onChange={handleInputChange} name='placeBirth'  value={scannedData.placeBirth} variant="standard" />
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
                      {scannedData.siblings?.map((data,idx) =>{
                        return(
                      <div key={idx} style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                      <TextField style={{flex:1}} id="standard-basic" label="Lastname:" onChange={(e) => handleSiblingsChange(idx, 'Last Name', e.target.value)} value={data['Last Name']} variant="standard" />
                      <TextField style={{flex:1}}  id="standard-basic" label="Firstname:" onChange={(e) => handleSiblingsChange(idx, 'First Name', e.target.value)} value={data['First Name']} variant="standard" />
                      <TextField style={{flex:1}}  id="standard-basic" label="Middlename:" onChange={(e) => handleSiblingsChange(idx, 'Middle Name', e.target.value)} value={data['Middle Name']} variant="standard" />
                       <button type='button' onClick={() => handleRemoveSibling(idx)}>Remove</button>
                      </div>
                        )
                      })}
                       <button type='button' onClick={handleAddSibling}>Add Sibling</button>

                    </form>
                  </div>}
                  {active.part === 1 && 
                  <div>
                    <ul>
                    {scannedData.form?.map((data,idx) =>{
                      return(
                        <li key={idx}>
                          <p style={{margin:0,whiteSpace:'nowrap'}}>{data['Questions']} <span style={{margin:0,fontStyle:'italic',textDecoration:'underline'}}>Answer: {data['Answer']}</span></p>
                          <ul>
                            {data['choices'].map((val,idy) =>{
                              return <li key={idy}>{val}</li>
                            })}
                          </ul>
                        </li>
                      )
                    })}
                    </ul>

                  </div>}
                </div>
                <button>
                  Submit Details
                </button>
              </div>
            </div>
           </div>}
          </div>

      </div>

    </div>
    </>
  )
}
