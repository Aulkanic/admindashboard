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
import { styled, ThemeProvider, createTheme } from '@mui/material';
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
  const [priv1,setPriv1] = useState('');
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
    const isValueIncluded = access[0]?.sectionId.includes('Rules');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    const LogoOF = [
      {official: 'BMCC',Logo: bmcclogo || (logolist[0] && logolist[0].logo)},
      {official: 'Mayor',Logo: mayorlogo || (logolist[1] && logolist[1].logo)},
    ]
    for(let i=0;i<LogoOF.length;i++){
      const list = LogoOF[i];
      const formData = new FormData()
      formData.append('file',list.Logo)
      formData.append('official',list.official)
      await Logos.LOGOS(formData)
      .then((res) =>{
        swal('Uploaded Successfully')
        setLogo(res.data.result)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }
  const setUpRule = async() =>{
    const isValueIncluded = access[0]?.sectionId.includes('Rules');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    const formData = new FormData()
    formData.append('rule1',famRule || (rulelist && rulelist.famNum))
    formData.append('rule2',schoRule || (rulelist && rulelist.schoNum))
    formData.append('rule3',ageRule || (rulelist && rulelist.ageNum))
    formData.append('rule4',priv1 || (rulelist && rulelist.priv1))
    formData.append('rule5',priv2 || (rulelist && rulelist.priv2))
    formData.append('rule6',priv3 || (rulelist && rulelist.priv3))
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
          <h1 style={{marginTop:10,marginLeft:30,color:'#666'}}>Set Up the different Rules and Information of Scholarhip Program</h1>
          <div style={{display:'flex'}}>
          <div className='rulecon1'>
          <Card sx={{padding:'10px',width:'99%',marginBottom:'10px',backgroundColor:'blue',marginLeft:'10px'}}>
                <Typography sx={{color:'white'}}> Scholarship Program Officials</Typography>
            </Card>
            <div className='logos'>
                  <Box sx={{width:'100%',height:'100%'}}>
                    <Card sx={{ minWidth: 275 }} elevation={3}>
                      <CardContent>
                        <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
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
                  <Box sx={{width:'100%',height:'100%'}}>
                        <Card sx={{ minWidth: 275 }} elevation={3}>
                              <CardContent>
                                <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
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
                  <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Button className='myButton' onClick={uploadLogo} variant='contained'>Save</Button>
            </div>
            </div>
          </div>
          <div className='rulecon'>
            <Box sx={{width:'100%',height:'100%'}}>
              <Card sx={{padding:'10px',width:'100%',marginBottom:'10px',backgroundColor:'blue'}}>
                <Typography sx={{color:'white'}}>Rules and Privileges of Scholarship Program</Typography>
              </Card>
              <Card sx={{padding:'10px',width:'99%'}}>
                 <Typography>Number of Applicants/Scholars must have in a Family</Typography>
                 <TextField value={famRule} placeholder={rulelist && rulelist.famNum} onChange={(e) => setFamRule(e.target.value)} />
                 <Typography>Number of Scholarship must Scholars Has</Typography>
                 <TextField value={schoRule} placeholder={rulelist && rulelist.schoNum} onChange={(e) =>setSchoRule(e.target.value)} />
                 <Typography> Age limit for Applicants </Typography>
                 <TextField value={ageRule} placeholder={rulelist && rulelist.ageNum} onChange={(e) => setAgeRule(e.target.value)}/>
                 <Typography>Scholarship Privilege</Typography>
                 <TextField value={priv1} placeholder={rulelist && rulelist.priv1} onChange={(e) => setPriv1(e.target.value)} label='ELementary'/>
                 <TextField value={priv2} placeholder={rulelist && rulelist.priv2} onChange={(e) => setPriv2(e.target.value)} sx={{margin:'0px 10px 0px 10px'}} label='High School' />
                 <TextField value={priv3} placeholder={rulelist && rulelist.priv3} onChange={(e) => setPriv3(e.target.value)} label='College'/>
              </Card>
            </Box>
            <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Button className='myButton' onClick={setUpRule} variant='contained'>Save</Button>
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