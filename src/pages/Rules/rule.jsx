import React, { useState } from 'react'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Logos,Logolist,Rule,Rulelist,ListAccess } from '../../api/request';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import './rule.css'
import { useEffect } from 'react';
import swal from 'sweetalert';
import { styled, ThemeProvider, createTheme, InputLabel } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import { useContext } from "react";
import { admininfo } from "../../App";

const theme = createTheme();
const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));
const Rulesect = () => {
  const { loginUser,user } = useContext(admininfo);
  const [access,setAccess] = useState([])
  const [bmcclogo,setBmcc] = useState('');
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [bmcclogoPrev,setBmccPrev] = useState('');
  const [mayorlogo,setMayor] = useState('');
  const [mayorlogoPrev,setMayorPrev] = useState('');
  const [famRule,setFamRule] = useState('');
  const [schoRule,setSchoRule] = useState('');
  const [ageRule,setAgeRule] = useState('');
  const [priv1,setPriv1] = useState(null);
  const [priv2,setPriv2] = useState('');
  const [priv3,setPriv3] = useState('');
  const [logolist,setLogo] = useState([])
  const [rulelist,setRule] = useState([])

  useEffect(() =>{
      async function Fetch(){
        const res = await Logolist.FETCH_LOGO()
        const req = await Rulelist.FETCH_RULE()
        let acc = await ListAccess.ACCESS()
        const empacc = acc.data.result?.filter(data => data.employeeName === user.name)
        setAccess(empacc)
        setLogo(res.data.result)
        setRule(req.data.result[0])
      }
      Fetch()
  },[])

  useEffect(() => {
    if (!bmcclogo) {
        setBmccPrev(undefined)
        return
    }
    
    const objectUrl = URL.createObjectURL(bmcclogo)
    setBmccPrev(objectUrl)
    
    return () => URL.revokeObjectURL(objectUrl)
    }, [bmcclogo])
  useEffect(() => {
    if (!mayorlogo) {
        setMayorPrev(undefined)
        return
    }
    
    const objectUrl = URL.createObjectURL(mayorlogo)
    setMayorPrev(objectUrl)
    
    return () => URL.revokeObjectURL(objectUrl)
    }, [mayorlogo])

  const uploadLogo = async() =>{
    const LogoOF = [
      {official: 'BMCC',Logo: bmcclogo || (logolist[0] && logolist[0].logo)},
      {official: 'Mayor',Logo: mayorlogo || (logolist[1] && logolist[1].logo)},
    ]
    const isValid = LogoOF.every((list) => {
      if (list.Logo instanceof File) {
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const fileExtension = list.Logo.name.split('.').pop().toLowerCase();
        if (allowedExtensions.includes(fileExtension)) {
          return true;
        } else {
          swal({
            text: 'Please upload a PNG or JPG image for all logos.',
            timer: 2000,
            buttons: false,
            icon: "error",
          });
          return false;
        }
      }
      return true;
    });
  
    if (!isValid) {
      return; 
    }
    setShowBackdrop(true);
    let counter = 0;
    for(let i=0;i<LogoOF.length;i++){
      const list = LogoOF[i];
      const formData = new FormData()
      formData.append('file',list.Logo)
      formData.append('official',list.official)
      await Logos.LOGOS(formData)
      .then((res) =>{
        counter += 1;
        if(counter === LogoOF?.length ){
          swal('Uploaded Successfully')
          setLogo(res.data.result)
          setShowBackdrop(false)
        }

      })
      .catch((err)=>{
        setShowBackdrop(false)
        console.log(err)
      })
    }
  }
  const setUpRule = async() =>{

    function handleNegativeValue(value, field) {
      if (value < 0) {
        // Handle the negative value here, e.g., display an error message
        swal({
          title: 'Error',
          text: `${field} cannot be a negative number.`,
          icon: 'error',
        });
        return null;  
      }
      return value;
    }
    const rule1Value = handleNegativeValue(famRule || (rulelist && rulelist.famNum), 'FamRule');
    const rule2Value = handleNegativeValue(schoRule || (rulelist && rulelist.schoNum), 'SchoRule');
    const rule3Value = handleNegativeValue(ageRule || (rulelist && rulelist.ageNum), 'AgeRule');
    const rule4Value = handleNegativeValue(priv1 || (rulelist && rulelist.priv1), 'Priv1');
    const rule5Value = handleNegativeValue(priv2 || (rulelist && rulelist.priv2), 'Priv2');
    const rule6Value = handleNegativeValue(priv3 || (rulelist && rulelist.priv3), 'Priv3');
    if (
      rule1Value === null ||
      rule2Value === null ||
      rule3Value === null ||
      rule4Value === null ||
      rule5Value === null ||
      rule6Value === null
    ) {
      swal({
        title: 'Error',
        text: `Input cannot be a negative number or empty.`,
        icon: 'error',
      })
      return;
    }
    const formData = new FormData()
    formData.append('rule1', rule1Value);
    formData.append('rule2', rule2Value);
    formData.append('rule3', rule3Value);
    formData.append('rule4', rule4Value);
    formData.append('rule5', rule5Value);
    formData.append('rule6', rule6Value);
    await Rule.RULE(formData)
    .then((res) =>{
      swal('Save Successfully')
      setRule(res.data.result)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  return (
    <>
              <StyledBackdrop open={showBackdrop}>
                <CircularProgress color="inherit" />
              </StyledBackdrop>
    <div className="scholarships" style={{backgroundColor:'#f1f3fa'}}>
        <Sidebar/>
    <div className="scholarshipsContainer">
        <Navbar/>
        <div>
          <h1 style={{ fontSize: 30,fontWeight:'900',color:'black',lineHeight:'17.57px',fontFamily:'Roboto Serif',margin:'20px 0px 10px 10px' }}>Set Up the different Rules and Information of Scholarhip Program</h1>
          <div style={{display:'flex',height:'maxContent'}}>
          <div className='rulecon1'>
          <Card sx={{padding:'10px',width:'100%',marginBottom:'10px',backgroundColor:'#043F97',marginLeft:'10px'}}>
                <Typography sx={{color:'white'}}> Scholarship Program Officials</Typography>
          </Card>
            <div className='logos'>
                  <Box sx={{width:'100%',height:'maxContent',marginBottom:'15px'}}>
                    <Card sx={{ width:'100%',hieght:'100%' }} elevation={1}>
                      <CardContent sx={{ width:'100%',hieght:'50%'}}>
                        <Typography sx={{marginTop:'5px',fontWeight:'bold'}} gutterBottom>
                          BMCC Logo
                        </Typography>
                        <Typography variant="h5" component="div">
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <Avatar
                        alt="BMCC"
                        src={bmcclogoPrev || (logolist[0] && logolist[0].logo)}
                        sx={{ width: 76, height: 76 }}
                      />
                        <Button>
                        <TextField sx={{backgroundColor:'whitesmoke',border:'none'}}
                        type='file' onChange={(e) =>setBmcc(e.target.files[0])} id="input-with-sx" label="" variant="outlined" />
                        </Button>
                      </Box>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                  <Box sx={{width:'100%',height:'maxContent'}}>
                    <Card sx={{ width:'100%' }} elevation={1}>
                              <CardContent>
                                <Typography sx={{marginTop:'5px',fontWeight:'bold'}} gutterBottom>
                                  Current Mayor Logo
                                </Typography>
                                <Typography variant="h5" component="div">
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                              <Avatar
                                alt="Mayor"
                                src={mayorlogoPrev || (logolist[1] && logolist[1].logo)}
                                sx={{ width: 76, height: 76 }}
                              />
                                <Button>
                                <TextField sx={{backgroundColor:'whitesmoke',border:'none'}}
                                type='file' onChange={(e) =>setMayor(e.target.files[0])} id="input-with-sx" label="" variant="outlined" />
                                </Button>
                              </Box>
                                </Typography>
                              </CardContent>
                    </Card>
                  </Box>
                  <div className='buttonrules'>
                  <button className='btnofficials1' style={{width:'45%'}} onClick={uploadLogo} variant='contained'>Upload official logos</button>
                  </div>
            </div>
            
          </div>
          <div className='rulecon'>
            <Box sx={{width:'100%',height:'100%'}}>
              <Card sx={{padding:'10px',width:'100%',marginBottom:'10px',backgroundColor:'#043F97'}}>
                <Typography sx={{color:'white'}}>Rules and Privileges of Scholarship Program</Typography>
              </Card>
              <Card sx={{padding:'10px',width:'100%'}}>
                 <Typography sx={{marginTop:'5px',fontWeight:'bold'}}>Number of Applicants/Scholars must have in a Family</Typography>
                 <TextField type='number' value={famRule} placeholder={rulelist && rulelist.famNum} onChange={(e) => setFamRule(e.target.value)} />
                 <Typography sx={{marginTop:'5px',fontWeight:'bold'}}>Number of Scholarship must Scholars Has</Typography>
                 <TextField type='number' value={schoRule} placeholder={rulelist && rulelist.schoNum} onChange={(e) =>setSchoRule(e.target.value)} />
                 <Typography sx={{marginTop:'5px',fontWeight:'bold'}}> Age limit for Applicants </Typography>
                 <TextField type='number' value={ageRule} placeholder={rulelist && rulelist.ageNum} onChange={(e) => setAgeRule(e.target.value)}/>
                 <Typography sx={{marginTop:'5px',fontWeight:'bold'}}>Scholarship Privilege</Typography>
                 <div style={{display:'flex',justifyContent:'space-between',alignItems:"center"}}>
                  <div>
                    <InputLabel>ELementary</InputLabel>
                    <TextField type='number' value={priv1} placeholder={rulelist && rulelist.priv1} onChange={(e) => setPriv1(e.target.value)}/>
                  </div>
                  <div>
                  <InputLabel>Highschool</InputLabel>
                  <TextField type='number' value={priv2} placeholder={rulelist && rulelist.priv2} onChange={(e) => setPriv2(e.target.value)} sx={{margin:'0px 10px 0px 10px'}}/>
                  </div>
                  <div>
                  <InputLabel>College</InputLabel>
                  <TextField type='number' value={priv3} placeholder={rulelist && rulelist.priv3} onChange={(e) => setPriv3(e.target.value)}/>
                  </div>
                 
                 </div>
              </Card>
            </Box>
            <div className='buttonrules'>
          <button className='btnofficials1' style={{width:'45%'}} onClick={setUpRule} variant='contained'>Set rules and privileges</button>
          </div>
          </div>
          </div>

          </div>
    </div>
    </div>
    </>
  )
}

export default Rulesect