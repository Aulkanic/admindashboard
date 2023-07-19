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
import { styled, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();
const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height: '70%',
  bgcolor: 'background.paper',
  overflow: 'auto',
  padding:'10px',
  borderRadius:'10px'
};

const News = () => {
  const [news,setNews] = useState([]);
  const { loginUser,user } = useContext(admininfo);
  const [access,setAccess] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [picture, setNewsimg] = useState('');
  const [title, setNewstitle] = useState('');
  const [description, setNewsdesc] = useState('');
  const [newsprev, setNewsprev] = useState();
  const [loading, setLoading] = useState(false);
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
    FetchNews.FETCH_NEWS().then((response) => {
         const news = response.data.News
       setNews(news.reverse());
     });
     async function Fetch(){
      let acc = await ListAccess.ACCESS()
      const empacc = acc.data.result?.filter(data => data.employeeName === user.name)
      setAccess(empacc)
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
    const isValueIncluded = access[0]?.sectionId.includes('News and Announcement');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    event.preventDefault();
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
        <Typography variant='h3'>Create News</Typography>
        <div style={{width:'100%'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}>
          <div>
          <Typography>News Title:</Typography>
          <TextField fullWidth value={title} onChange={(e) =>setNewstitle(e.target.value)} />
          </div>
          <div>
          <Typography>Select Picture:</Typography>
          <Button>
          <TextField sx={{backgroundColor:'whitesmoke',border:'none',marginLeft:'10px'}}
            onChange={(e) =>setNewsimg(e.target.files[0])} type='file' id="input-with-sx" label="" variant="outlined" 
            />
          </Button>
          </div>
          </div>
          <div style={{width:'100%',display:'flex',margin:'30px 0px 10px 0px',justifyContent:'top'}}>
            <div style={{width:'45%',margin:'0px 10px 0px 10px'}}>
            <Typography>Content:</Typography>
            <TextField multiline onChange={(e) =>setNewsdesc(e.target.value)}
              rows={9} fullWidth id="input-with-sx" label="" variant="outlined" />
            </div>
            <div style={{width:'50%'}}>
            <Typography>Image Preview:</Typography>
              <img style={{width:'100%'}} src={newsprev} alt="" />
            </div>
          </div>
          <div style={{width:'100%',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <Button onClick={handleClose} className='myButton2' sx={{color:'white'}}>Cancel</Button>
            <Button onClick={Create} className='myButton1' sx={{color:'white'}}>Publish News</Button>
          </div>
          </div>
        </Box>
      </Modal>
  <div className='scholarships'>
  <Sidebar/>
    <div className="scholarshipsContainer">
        <Navbar/>
    {news.length > 0 ? (
      <>
    {activeState === 'News' && <div className='ncard'>
      <div className='latestnews'>
        <h1 style={{margin:'5px'}}>Latest News</h1>
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
        <div style={{width:'100%'}}>
        <Button onClick={handleClickOpen} sx={{color:'white',float:'right'}} className='myButton1'>Create News</Button>
        </div>
        <h2 style={{margin:'5px'}}>Recent News</h2>
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
    </div>}
    {activeState === 'NewsHead' &&
    <>
    <div style={{margin:'15px 0px 0px 30px'}}>
      <Button onClick={tabschange} sx={{color:'white'}} className='myButton2'><ArrowBackIosNewIcon/>Back</Button>
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
    <div className='ncard'>
      <p className='NoNews'>No News Available</p>
    </div>)}
    </div>
  </div>
    </>
  )
}

export default News;
