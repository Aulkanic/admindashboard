import React, { useEffect, useState } from 'react'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import swal from 'sweetalert';
import { FetchingAnnounce,CreateAnnouncement } from '../../api/request';
import { useSelector } from 'react-redux';
import './announce.css'
import { styled } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));

const Announcement = () => {
    const { admin  } = useSelector((state) => state.login)
    const [announced,setAnnounced] = useState([]);
    const [isVisible,setIsVisible] = useState('');
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [showBackdrop, setShowBackdrop] = useState(false);

    useEffect(() =>{
        async function Fetch(){
          setShowBackdrop(true);
          let response = await FetchingAnnounce.FETCH_ANNOUNCE();
          const dat = response.data.Announce
          setAnnounced(dat.reverse())
          setShowBackdrop(false);
        }
        Fetch()
    },[])
    const showSeemore = (index) =>{
      setIsVisible(index)
    }
    const AnnouncedList = announced?.map((data,index) =>{
      let content;
      if(data.content.length <= 210){
        content = <p className='truncated-text1'>{data.content}</p>
      }else{
        const truncated = isVisible === index ? (data.content) : (data.content.substring(0, 210) + '.');
        content =  (
          <div style={{height:'max-content'}}>
            <p className={isVisible === index ? '' : 'truncated-text1'} style={{height: isVisible === index ? 'max-content' : '100px'}}>{truncated}
              {isVisible === index ? (null) : <button onClick={() =>showSeemore(index)} className='seemore'>See more</button>}
            </p>
          </div>
        );
      }
      return (
        <>
        <div style={{height:'100%'}} key={index}>
          <div style={{ marginBottom: 10,height:'max-content',padding:"10px",backgroundColor:'white'}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {data.date}
                </Typography>
                <hr />
                <Typography variant="h6" component="div">
                  {data.title}
                </Typography>
                  {content}
          </div>
        </div>
        </>
      )
    })
    const Create = async() =>{

      if(title === '' || content === ''){
        swal({
          text: 'Please Provide necessary Information',
          timer: 2000,
          buttons: false,
          icon: "warning",
        })
        return
      }
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content',content)
      setShowBackdrop(true);
      await CreateAnnouncement.CREATE_ANNOUNCEMENT(formData)
      .then(res => {
        const announce = res.data.Announce
        setAnnounced(announce.reverse());
        setShowBackdrop(false);
        swal({
          title: "Success",
          text: "Being Announced!",
          icon: "success",
          button: "OK",
        });
      }
       )
      .catch(err => console.log(err));
    }
  return (
    <>
              <StyledBackdrop open={showBackdrop}>
                <CircularProgress color="inherit" />
              </StyledBackdrop>
    <div className="scholarships" style={{backgroundColor:'whitesmoke'}}>
        <Sidebar/>
    <div className="scholarshipsContainer">
        <Navbar/>
        <Typography sx={{ fontSize: 30,fontWeight:'900',color:'black',lineHeight:'17.57px',fontFamily:'Roboto Serif',textAlign:'center',margin:'20px 0px 20px 0px' }}>
        Announcements
        </Typography>
          <div style={{backgroundColor:'#f1f3fa',width:'100%',height:'100vh',overflow:'auto',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:'90%',height:'100%',display:'flex'}}>
              <div style={{width:'50%',height:'100%'}}>
              <Typography sx={{ fontSize: 20,fontWeight:'900',color:'white',lineHeight:'17.57px',fontFamily:'Roboto Serif',textAlign:'center',marginBottom:'7px',backgroundColor:'#043F97',padding:'15px 0px 15px 0px',borderTopRightRadius:'10px',borderTopLeftRadius:'10px' }}>
                Create Announcement
                </Typography>
              <Card sx={{width:'100%',height:'max',paddingBottom:'30px'}}>
                <CardContent>
                  <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                    Title
                  </Typography>
                  <Typography variant="h5" component="div">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <TextField
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  fullWidth id="input-with-sx" label="" variant="outlined" />
                </Box>
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                    Content:
                  </Typography>
                  <Typography variant="h5" component="div">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <TextField multiline
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    rows={10} fullWidth id="input-with-sx" label="" variant="outlined" />
                </Box>
                  </Typography>
                </CardContent>
                <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
              <button className='btnofficials1' onClick={Create} variant='contained'>Announce</button>

              </div>
              </Card>
              </div>
              <div style={{marginLeft:'10px',marginRight:'10px',width:'70%',height:'600px',overflow:'auto',display:'flex',flexDirection:'column'}}>
              <h1 style={{ fontSize: 20,fontWeight:'900',color:'white',lineHeight:'17.57px',fontFamily:'Roboto Serif',textAlign:'center',backgroundColor:'#043F97',padding:'15px 0px 15px 0px',borderTopRightRadius:'10px',borderTopLeftRadius:'10px' }}>
                List of Announced
              </h1>
                {AnnouncedList}
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Announcement