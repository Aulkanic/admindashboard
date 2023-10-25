import React, { useEffect } from 'react'
import './new.scss'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { FetchNews,CreateNews,ListAccess } from '../../api/request';
import { useState } from 'react';
import swal from 'sweetalert';
import { useContext } from "react";
import { Typography,Card,Button,Box,Modal,TextField } from '@mui/material';
import { admininfo } from "../../App";
import './news.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Backdrop, CircularProgress } from '@mui/material';
import { styled, createTheme } from '@mui/material';
import { MdClear } from "react-icons/md";

const theme = createTheme();
const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height: 'max-content',
  bgcolor: 'background.paper',
  padding:'10px',
  borderRadius:'5px',
  paddingTop:'40px'
};

const News = () => {
  const [news,setNews] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [picture, setNewsimg] = useState(null);
  const [title, setNewstitle] = useState('');
  const [description, setNewsdesc] = useState('');
  const [newsprev, setNewsprev] = useState();
  const [activeState, setActiveState] = useState('News');
  const [newsDetails,setNewDetails] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const tabschange = (data) =>{
    setNewDetails(data)
    setActiveState(activeState === 'News' ? 'NewsHead' : 'News');
  }
  useEffect(() => {
     async function Fetch(){
      let response = await FetchNews.FETCH_NEWS();
      const news = response.data.News
      setNews(news.reverse());
     }
     Fetch()
   }, []);

   useEffect(() => {
    if (!picture) {
      setNewsprev(undefined)
        return
    }
    console.log(picture)
    const objectUrl = URL.createObjectURL(picture);
    setNewsprev(objectUrl)
  
    return () => URL.revokeObjectURL(objectUrl)
  }, [picture])
  function Create(event){
    event.preventDefault();
    if(picture === null){
      swal("Error","Image Required",'warning')
      return
    }
    const fileExtension = picture?.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg')  {
      swal({
        text: 'Please upload a PNG or JPG image only.',
        timer: 2000,
        buttons: false,
        icon: "error",
      });
    
      return false;
    }
    setOpen(false)
    setShowBackdrop(true);
    const data = {picture,title,description};
    CreateNews.CREATE_NEWS(data)
    .then(res => {
      const news = res.data.News
      setNews(news.reverse());
      swal({
        title: "Success",
        text: "Publish Successfully!",
        icon: "success",
        button: "OK",
      });
      setNewDetails('')
      setNewsdesc('')
      setNewsimg(null)
      setShowBackdrop(false);
      setIsOpen(false)
    }
     )
    .catch(err => console.log(err));
}
   const latest = news.length > 0 ? [news[0]] : [];
   const newslist = news.slice(1);
  return (
    <>
      <StyledBackdrop open={showBackdrop}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} >
        <div style={{margin:5,width:'100%',height:'30px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div>
                  <Typography sx={{fontSize:32,fontWeight:700,color:'#043F97',fontFamily:'Roboto Serif',lineHeight:'37px'}}>
                  Create News
                  </Typography>
                  <Typography sx={{fontSize:14,fontWeight:400,color:'#000000',fontFamily:'Roboto Serif',lineHeight:'16px'}}>
                  Fill up the necessary details.
                  </Typography>
                  </div>
                <div style={{width:'50px',marginRight:'15px',height:'50px',marginTop:'-35px'}}>
                <button style={{height:'100%',backgroundColor:'red',color:'white',padding:'0px',width:'100%',border:'none',borderRadius:'5px'}} onClick={handleClose}>
                  <MdClear style={{fontSize:'30px',fontWeight:'700'}}/>
                </button>
                </div>
        </div>
        <div style={{width:'100%',display:'flex',height:'100%',paddingTop:'20px',flexDirection:'row-reverse'}}>
          <div style={{width:'50%',display:'flex',flexDirection:'column',flexWrap:'wrap'}}>
          <div style={{flex:1}}>
          <Typography>News Title:</Typography>
          <TextField fullWidth value={title} onChange={(e) =>setNewstitle(e.target.value)} />
          </div>
          <div style={{flex:1}}>
            <Typography>Content:</Typography>
            <TextField multiline onChange={(e) =>setNewsdesc(e.target.value)}
              rows={9} fullWidth id="input-with-sx" label="" variant="outlined" />
          </div>
          </div>
          <div style={{width:'47%',display:'flex',flexDirection:'column',flexWrap:'wrap',marginRight:'15px'}}>
            <div style={{flex:1,hieght:'70%',border:'2px solid black',justifyContent:'center',display:'flex',alignItems:'center'}}>
              {newsprev ? (<img style={{width:'100%',hieght:'100px',objectFit:'contain'}} src={newsprev} alt="" />) : (<p style={{fontSize:'30px',fontWeight:'bold'}}>Image Preview</p>)}
            </div>
            <div style={{hieght:'50%',width:'100%'}}>
            <Typography>Select Picture:</Typography>
            <Button>
            <TextField sx={{backgroundColor:'whitesmoke',border:'none',marginLeft:'10px'}}
              onChange={(e) =>setNewsimg(e.target.files[0])} type='file' accept=".jpg, .jpeg, .png" id="input-with-sx" label="" variant="outlined" 
              />
            </Button>
            </div>
          </div>
          </div>
          <div style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end',marginTop:'10px',paddingTop:'15px'}}>
            <button className='btnofficials2' style={{marginRight:'5px'}} onClick={handleClose}>Cancel</button>
            <button className="btnofficials" onClick={Create}>Publish News</button>
          </div>
        </Box>
      </Modal>
  <div className='scholarships'>
  <Sidebar/>
    <div className="scholarshipsContainer">
        <Navbar/>
    {news.length > 0 ? (
      <>
    {activeState === 'News' && 
    <div className='ncard'>
      <div>
        <div style={{display:'flex',paddingTop:'30px',paddingLeft:'20px'}}>
        <div className='latestnews'>
          <div style={{width:'95%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h1 style={{fontSize:32,fontWeight:700,color:'#043F97',fontFamily:'Roboto Serif',lineHeight:'37px'}}>Latest News</h1>
          <button className="btnofficials3" onClick={handleClickOpen}>Create News</button>
          </div>
        
        <Card sx={{width:'95%',display:'flex',justifyContent:'space-between',padding:'0px 10px 0px 10px',alignItems:'left',flexDirection:'column'}}>
            <Typography sx={{fontSize:'20px',fontWeight:'700'}}>{latest[0].title}</Typography>
            <Typography>Date:{latest[0].date}</Typography>
        </Card>
        <div className='imgnews'>
          <img src={latest[0].picture} alt="" />
        </div>
        <div>
          <Card elevation={0} sx={{width:'98%',height:'200px',overflow:'auto',padding:'3px'}}>
            <Typography>{latest[0].description}</Typography>
          </Card>
        </div>
        </div>
        <div className='news'>
          <h2 style={{ fontSize: 20,fontWeight:'900',color:'white',lineHeight:'17.57px',fontFamily:'Roboto Serif',textAlign:'center',backgroundColor:'#043F97',padding:'15px 0px 15px 0px',borderTopRightRadius:'10px',borderTopLeftRadius:'10px' }}>Recent News</h2>
            { newslist?.map((data) =>{
                return(
                  <>
                  <div className='newscon' >
                    <Card elevation={0} sx={{display:'flex',width:'97%',height:'100%',padding:'10px'}}>
                      <div style={{width:'45%',marginRight:'10px'}}>
                      <img style={{width:'100%',height:'100%'}} src={data.picture} alt="" />
                      </div>
                      <div style={{width:'45%',marginRight:'10px',height:'100%',overflow:'hidden'}}>
                      <div style={{width:'100%',marginRight:'10px',height:'80%',overflow:'hidden'}}>
                      <Typography>{data.title}</Typography>
                      <Typography>{data.date}</Typography>
                      <Typography>{data.description}</Typography>
                      </div>
                      <div>
                        <Button onClick={() =>tabschange(data)} sx={{color:'blue',fontSize:'12px'}}>Read more</Button>
                      </div>
                      </div>
                    </Card>
                  </div>
                  </>
                )
            })
            }
        </div>
        </div>
      </div>

    </div>}
    {activeState === 'NewsHead' &&
    <>
    <div style={{margin:'15px 0px 0px 30px'}}>
      <button className='btnofficials2' onClick={tabschange}><ArrowBackIosNewIcon/>Back</button>
    </div>
    <div style={{width:'95%',height:'85%',padding:'30px 30px 0px 30px'}}>
      <Card sx={{width:'95%',padding:'15px'}}>
        <div style={{display:'flex',alignItems:'center'}}>
          <CalendarMonthIcon/>
          <p> {newsDetails.date}</p>
        </div>
        <div>
          <h2><b>{newsDetails.title}</b></h2>
        </div>
        <div>
          <p>{newsDetails.description}</p>
        </div>
        <div style={{width:'100%'}}>
          <img style={{width:'95%',margin:'15px'}} src={newsDetails.picture}/>
        </div>
      </Card>
    </div>
    </>
    }
    </>
    ) : (
    <div className='ncard' style={{width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <p className='NoNews'>No News Available</p>
      <div style={{margin:'10px'}}>
      <button className="btnofficials" onClick={handleClickOpen}>Create News</button>
      </div>
    
    </div>)}
    </div>
  </div>
    </>
  )
}

export default News;
