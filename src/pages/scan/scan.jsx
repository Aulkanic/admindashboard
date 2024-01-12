import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import TextField from '@mui/material/TextField';
import { ScanFile } from '../../api/request';
import swal from 'sweetalert';

export default function Scan() {
  const [part,setPart] = useState(0);
  const [first,setFirst] = useState({
    Personal:null,
    Educational:null,
    Family:null,
    Guardian:null,
    Siblings:null
  })
  const handleFirstImages = (e) =>{
    const { files,name} = e.target;
    setFirst((prev)=> ({...prev,[name]:files[0]}))
  }
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
      console.log(res);
      
    })
  }
  return (
    <div>
        <button style={{border:'none',display:'flex',alignItems:'center',margin:'4px'}}>
        <IoIosArrowBack />
        <p style={{margin:0}}> Go Back</p>
        </button>
        <div style={{padding:'8px',display:'flex',gap:10,backgroundColor:'white'}}>
          <div style={{width:'48%'}}>
            <div style={{display:'flex',gap:'4px',paddingRight:'12px',marginBottom:'10px',flexDirection:'column'}}>
              <div style={{display:'flex',flexDirection:'column',flexWrap:'wrap'}}>
                <label htmlFor="">1st Part of Form:</label>
                <div style={{display:'flex',flexWrap:'wrap',width:'100%'}}>
                <label style={{display:'flex',flexDirection:'column',margin:4,flex:1,backgroundColor:'gray',width:'max-content',padding:'4px',borderRadius:'4px',color:'white'}}
                 htmlFor="">Personal Section:
                <input onChange={handleFirstImages} name='Personal' type="file" />
                </label>
                <label style={{display:'flex',flexDirection:'column',margin:4,flex:1,backgroundColor:'gray',width:'max-content',padding:'4px',borderRadius:'4px',color:'white'}}
                htmlFor="">Educational Section
                <input onChange={handleFirstImages} name='Educational' type="file" />
                </label>
                <label style={{display:'flex',flexDirection:'column',margin:4,flex:1,backgroundColor:'gray',width:'max-content',padding:'4px',borderRadius:'4px',color:'white'}}
                htmlFor="">Family Section
                <input onChange={handleFirstImages} name='Family' type="file" />
                </label>
                <label style={{display:'flex',flexDirection:'column',margin:4,flex:1,backgroundColor:'gray',width:'max-content',padding:'4px',borderRadius:'4px',color:'white'}}
                htmlFor="">Guardian Section
                <input onChange={handleFirstImages} name='Guardian' type="file" />
                </label>
                <label style={{display:'flex',flexDirection:'column',margin:4,flex:1,backgroundColor:'gray',width:'max-content',padding:'4px',borderRadius:'4px',color:'white'}}
                htmlFor="">Siblings Section
                <input onChange={handleFirstImages} name='Siblings' type="file" />
                </label>
                </div>

              </div>
              <div style={{display:'flex',flexDirection:'column'}}>
                <label htmlFor="">2nd Part of Form:</label>
                <label style={{display:'flex',flexDirection:'column',margin:4,flex:1,backgroundColor:'gray',width:'max-content',padding:'4px',borderRadius:'4px',color:'white'}}
                htmlFor="">Q&A
                <input type="file" />
                </label>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'center',margin:'10px 0px 10px 0px'}}>
            <button onClick={startScanning}
            style={{whiteSpace:'nowrap',borderRadius:'4px',border:'none',backgroundColor:'blue',color:'white',padding:'4px 10px'}}
            >Start Scanning!</button>
            </div>
            <div style={{width:'100%'}}>
              <img style={{width:'100%',height:'300px'}} src="" alt="" />
              <img style={{width:'100%',height:'300px'}}  src="" alt="" />
            </div>
          </div>
          <div style={{width:'48%',display:'flex',flexDirection:'column'}}>
            <div style={{width:'100%',display:'flex'}}>
              <button onClick={() =>{setPart(0)}}
              style={{flex:1}}>1st Part Result</button>
              <button onClick={() =>{setPart(1)}}
              style={{flex:1}}>2nd Part Result</button>
            </div>
            <div style={{padding:'8px',width:'100%',backgroundColor:'white'}}>
              {part === 0 && 
              <div style={{padding:'4px'}}>
                <form action="" method="post">
                  <div  style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                  <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Lastname:" value={'Trazona'} variant="standard" />
                  <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Firstname:" value={'Michael'} variant="standard" />
                  <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Middlename:" value={'Trazo'} variant="standard" />
                  </div>
                  <div  style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                  <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Age:" value={'21'} variant="standard" />
                  <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Gender:" value={'Male'} variant="standard" />
                  <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Address:" value={'Iglesia Street Sta.Rosa 1 Marilao Bulacan'} variant="standard" />
                  </div>
                  <div  style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                  <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Baranggay:" value={'Sta.Rosa'} variant="standard" />
                  <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Birthday:" value={'March 31, 2002'} variant="standard" />
                  <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Contact Number:" value={'09279018785'} variant="standard" />
                  </div>
                  <div  style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                  <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Last School Attended:" value={'Pambayang Dalubhasaan ng Marilao'} variant="standard" />
                  <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Year Level:" value={'College'} variant="standard" />
                  <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Grade Level:" value={'4TH Year'} variant="standard" />
                  </div>

                  <h3>Family Information</h3>
                  <div style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                  <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Father lastname:" value={'Michael'} variant="standard" />
                  <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Father firstname:" value={'Michael'} variant="standard" />
                  <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Father middlename:" value={'Michael'} variant="standard" />
                  </div>
                  <div style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:6,marginBottom:'8px'}}>
                  <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Highest Educational Attainment:" value={'Michael'} variant="standard" />
                  <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Occupation:" value={'Michael'} variant="standard" />
                  </div>
                  <div style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                  <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Mother lastname:" value={'Michael'} variant="standard" />
                  <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Mother firstname:" value={'Michael'} variant="standard" />
                  <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Mother middlename:" value={'Michael'} variant="standard" />
                  </div>
                  <div style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:6,marginBottom:'8px'}}>
                  <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Highest Educational Attainment:" value={'Michael'} variant="standard" />
                  <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Occupation:" value={'Michael'} variant="standard" />
                  </div>
                  <div style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                  <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Guardian lastname:" value={'Michael'} variant="standard" />
                  <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Guardian firstname:" value={'Michael'} variant="standard" />
                  <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Guardian middlename:" value={'Michael'} variant="standard" />
                  </div>
                  <div style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                  <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Relationship:" value={'Michael'} variant="standard" />
                  <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Contact Number:" value={'Michael'} variant="standard" />
                  <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Address:" value={'Michael'} variant="standard" />
                  </div>
                  <h3>Siblings</h3>
                  <div style={{display:'flex',flexWrap:'nowrap',width:'100%',gap:2,marginBottom:'8px'}}>
                  <TextField style={{flex:1}} id="standard-basic" aria-readonly label="Lastname:" value={'Michael'} variant="standard" />
                  <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Firstname:" value={'Michael'} variant="standard" />
                  <TextField style={{flex:1}}  id="standard-basic" aria-readonly label="Middlename:" value={'Michael'} variant="standard" />
                  </div>
                </form>
              </div>}
              {part === 1 && 
              <div>
              
              </div>}
            </div>
          </div>
        </div>
    </div>
  )
}
