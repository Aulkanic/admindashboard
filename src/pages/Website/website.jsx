import React, { useEffect } from 'react'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import './website.css'
import { Colorlist,Colors,WebImg,WebsiteImg,CreateTrivia,FetchTrivia,FetchFaqs,CreateFaqs,UpdateFaqs,DeleteFaqs,ListAccess } from '../../api/request'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { ChromePicker } from 'react-color';
import { useState } from 'react';
import swal from 'sweetalert'
import { styled, ThemeProvider, createTheme } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { useContext } from "react";
import { admininfo } from "../../App";

const theme = createTheme();
const StyledBackdrop = styled(Backdrop)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;




const Website = () => {
  const { loginUser,user } = useContext(admininfo);
  const [access,setAccess] = useState([])
  const [selectedColor, setSelectedColor] = useState(''); // Initial color
  const [selectedColor1, setSelectedColor1] = useState(''); // Initial color
  const [btnColor, setBtnColor] = useState(''); // Initial color
  const [btnColor1, setBtnColor1] = useState(''); // Initial color
  const [colorList,setColorlist] = useState([]);
  const [imgList,setImglist] = useState([])
  const [limg,setLimg] = useState(null);
  const [carouimg,setCarou] = useState(null)
  const [carouimg1,setCarou1] = useState(null)
  const [carouimg2,setCarou2] = useState(null)
  const [trivia,setTrivia] = useState([])
  const [trivimg,setTrivimg] = useState('');
  const [trivimgprev,setTrivimgprev] = useState('');
  const [trivtitle,setTrivtitle] = useState('')
  const [trivcon,setTrivcon] = useState('')
  const [faqs,setFaqs] = useState([])
  const [oldfaqs,setOldFaqs] = useState([])
  const [questions,setQuestions] = useState('');
  const [answer,setAnswer] = useState('')
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const handleClickOpen = (data) => {
    setOldFaqs(data)
    setOpen(true);
  };

  const handleClose = () => {
    setAnswer('')
    setQuestions('')
    setOpen(false);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setAnswer('')
    setQuestions('')
    setOpen1(false);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() =>{
    async function Fetch(){
      setShowBackdrop(true);
      const res = await Colorlist.FETCH_COLOR()
      const req = await WebImg.FETCH_WEB()
      const triv = await FetchTrivia.ETCH_TRIVIA()
      const fqs = await FetchFaqs.FETCH_FAQS()
      let acc = await ListAccess.ACCESS()
      const empacc = acc.data.result?.filter(data => data.employeeName === user.name)
      setAccess(empacc)
      setImglist(req.data.result)
      setColorlist(res.data.result[0])
      setTrivia(triv.data.Trivias[0])
      setFaqs(fqs.data.result)
      setShowBackdrop(false);
    }
    Fetch();
  },[])

  useEffect(() => {
    if (!trivimg) {
      setTrivimgprev(undefined)
        return
    }
    const objectUrl = URL.createObjectURL(trivimg);
    setTrivimgprev(objectUrl)
  
    return () => URL.revokeObjectURL(objectUrl)
  }, [trivimg])


  const setColor = async() =>{
    const isValueIncluded = access[0]?.sectionId.includes('Website Maintenance');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    const formData = new FormData();
    formData.append('color1',selectedColor || colorList.bgColor)
    formData.append('color2',selectedColor1 || colorList.bgColor1)
    formData.append('color3',btnColor || colorList.btnColor)
    formData.append('color4',btnColor1 || colorList.btnTextColor)
    setShowBackdrop(true);
    await Colors.COLOR(formData)
    .then((res) =>{
      setColorlist(res.data.result[0])
      setShowBackdrop(false);
      swal({
        title: "Success",
        text: "Being Changed!",
        icon: "success",
        button: "OK",
      });

    })
    .catch((err)=>console.error(`Error:${err}`))
  }
  const upload = async() =>{
    const isValueIncluded = access[0]?.sectionId.includes('Website Maintenance');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
      const Images = [
        { ImgFor: 'LandingPage', File: limg || (imgList[0] && imgList[0].File) },
        { ImgFor: 'Carousel1', File: carouimg || (imgList[1] && imgList[1].File) },
        { ImgFor: 'Carousel2', File: carouimg1 || (imgList[2] && imgList[2].File) },
        { ImgFor: 'Carousel3', File: carouimg2 || (imgList[3] && imgList[3].File) },
      ];
      setShowBackdrop(true);
      for(let i=0;i<Images.length;i++){
        const list = Images[i];
        const formData = new FormData()
        formData.append('file',list.File)
        formData.append('ImgFor',list.ImgFor)
        await WebsiteImg.WEB_IMG(formData)
        .then((res) =>{
          setImglist(res.data.result[0])
        })
        .catch((err)=>{
          console.log(err)
        })
      }
      setShowBackdrop(false);
      swal('Uploaded Successfully')
  }
  const trivCreate = async() =>{
    const isValueIncluded = access[0]?.sectionId.includes('Website Maintenance');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    const formData = new FormData();
    formData.append('title',trivtitle || trivia.title)
    formData.append('content',trivcon || trivia.content)
    formData.append('trivia_picture',trivimg || trivia.picture)
    setShowBackdrop(true);
    await CreateTrivia.TRIVIA(formData)
    .then((res) =>{
      setTrivia(res.data.result[0])
      setShowBackdrop(false);
      swal({
        title: "Success",
        text: "Being Updated!",
        icon: "success",
        button: "OK",
      });

    })
    .catch((err)=>console.error(`Error:${err}`))    
  }
  const createFaqs = async() =>{
    const isValueIncluded = access[0]?.sectionId.includes('Website Maintenance');
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
    formData.append('answer',answer)
    formData.append('questions',questions)
    await CreateFaqs.CREATE_FAQS(formData)
    .then((res) =>{
      setFaqs(res.data.result)
      setShowBackdrop(false);
      setAnswer('')
      setQuestions('')
      swal({
        title: "Success",
        text: "Created Successfully!",
        icon: "success",
        button: "OK",
      });

    })
    .catch((err)=>console.error(`Error:${err}`)) 
  }
  const editFaqs = async() =>{
    const isValueIncluded = access[0]?.sectionId.includes('Website Maintenance');
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
    formData.append('answer',answer || oldfaqs.faqsAnswers)
    formData.append('id',oldfaqs.faqsId)
    formData.append('question',questions || oldfaqs.faqsQuestions)
    await UpdateFaqs.UPDATE_FAQS(formData)
    .then((res) =>{
      setFaqs(res.data.result)
      setShowBackdrop(false);
      setAnswer('')
      setQuestions('')
      swal({
        title: "Success",
        text: "Updated Successfully!",
        icon: "success",
        button: "OK",
      });

    })
    .catch((err)=>console.error(`Error:${err}`)) 
  }
  const deleteFaqs = async(data) =>{
    const isValueIncluded = access[0]?.sectionId.includes('Website Maintenance');
    if(!isValueIncluded){
      swal({
        text: 'UnAuthorized Access',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    const id = data.faqsId
    await DeleteFaqs.DELETE_FAQS(id)
    .then((res) =>{
      console.log(res)
      setFaqs(res.data.result)
      setShowBackdrop(false);
      setAnswer('')
      setQuestions('')
      swal({
        title: "Success",
        text: "Deleted Successfully!",
        icon: "success",
        button: "OK",
      });

    })
    .catch((err)=>console.error(`Error:${err}`)) 
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Faqs</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={questions}
            onChange={(e) =>setQuestions(e.target.value)}
            label={`Question: ${oldfaqs.faqsQuestions}`}
            type="text"
            fullWidth
            variant="outlined"
          />
        <TextField
          id="outlined-textarea"
          label="Answer"
          value={answer}
          onChange={(e) =>setAnswer(e.target.value)}
          placeholder={oldfaqs.faqsAnswers}
          multiline
          rows={5}
          fullWidth
        />
        </DialogContent>
        <DialogActions>
          <Button sx={{color:'white'}} className='myButton' onClick={handleClose}>Cancel</Button>
          <Button sx={{color:'white'}}  className='myButton1' onClick={editFaqs}>Save Changes</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle>Create Faqs</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            margin="dense"
            id="name"
            label={`Question:`}
            type="text"
            fullWidth
            variant="outlined"
          />
        <TextField
          value={answer}
          onChange={(e) =>setAnswer(e.target.value)}
          id="outlined-textarea"
          label="Answer"
          multiline
          rows={5}
          fullWidth
        />
        </DialogContent>
        <DialogActions>
          <Button sx={{color:'white'}} className='myButton' onClick={handleClose1}>Cancel</Button>
          <Button sx={{color:'white'}}  className='myButton1' onClick={createFaqs}>Add Faqs</Button>
        </DialogActions>
      </Dialog>
    <StyledBackdrop open={showBackdrop}>
      <CircularProgress color="inherit" />
    </StyledBackdrop>
    <div className="scholarships">
        <Sidebar/>
    <div className="scholarshipsContainer" style={{backgroundColor:'#f1f3fa'}}>
        <Navbar/>
        <div style={{backgroundColor:'#f1f3fa',padding:10}}>
          <h1 style={{marginTop:10,marginLeft:30,color:'#666'}}>Website Maintenance</h1>
          <Typography style={{marginTop:10,marginLeft:30}}>
          Keep your website's content fresh and relevant by regularly updating text, images, videos, and other media. This includes adding new content, removing outdated information, and ensuring all links are working correctly.
          </Typography>
            <div style={{width:'100%',margin: 20,height:'100%'}}>
                <div style={{width:'90%',height:'100%'}}>
                <Card sx={{width:'98.5%',margin:'10px 0px 10px 0px',textAlign:'center',backgroundColor:'blue',padding:'10px'}}>
                  <Typography sx={{fontSize:'20px',fontWeight:'1000',color:'white'}}>Website Themes</Typography>
                  </Card>
                <Card sx={{ width:'97%',display:'flex',height:'100%',padding:'15.5px',justifyContent:'space-around'}} elevation={3}>
                  <div>
                  <Card sx={{width:'98.5%',margin:'10px 0px 10px 0px',textAlign:'center',backgroundColor:'blue',padding:'10px'}}>
                  <Typography sx={{fontSize:'20px',fontWeight:'1000',color:'white'}}>Color Themes</Typography>
                  </Card>
                  <div style={{display:'flex',flexDirection:'column',margin:'10px'}}>
                  <div style={{marginTop:'10px',fontSize:'18px'}}>Color 1: {selectedColor}</div> 
                  <ChromePicker
                    color={selectedColor}
                    onChange={color => setSelectedColor(color.hex)}
                  />
                  </div>
                  <div style={{display:'flex',flexDirection:'column',margin:'10px'}}>
                  <div style={{marginTop:'10px',fontSize:'18px'}}>Color 2: {selectedColor1}</div> 
                  <ChromePicker
                    color={selectedColor1}
                    onChange={color => setSelectedColor1(color.hex)}
                  />
                  </div>
                  </div>
                  <div>
                  <Card sx={{width:'98.5%',margin:'10px 0px 10px 0px',textAlign:'center',backgroundColor:'blue',padding:'10px'}}>
                  <Typography sx={{fontSize:'20px',fontWeight:'1000',color:'white'}}>Button Themes</Typography>
                  </Card>
                  <div style={{display:'flex',flexDirection:'column',margin:'10px'}}>
                  <div style={{marginTop:'10px',fontSize:'18px'}}>Button For(Apply Now,Submit):</div> 
                  <ChromePicker
                    color={btnColor}
                    onChange={color => setBtnColor(color.hex)}
                  />
                  </div>
                  <div style={{display:'flex',flexDirection:'column',margin:'10px'}}>
                  <div style={{marginTop:'10px',fontSize:'18px'}}>Text Color of Button: {btnColor1}</div> 
                  <ChromePicker
                    color={btnColor1}
                    onChange={color => setBtnColor1(color.hex)}
                  />
                  </div>
                  </div>
                  <div>
                  <Card sx={{width:'98.5%',margin:'10px 0px 10px 0px',textAlign:'center',backgroundColor:'blue',padding:'10px'}}>
                  <Typography sx={{fontSize:'20px',fontWeight:'1000',color:'white'}}>PREVIEW</Typography>
                  </Card>
                    <div>
                      <Typography>Background 1:</Typography>
                      <div style={{width:'200px',height:'50px',border:'1px solid black',backgroundColor:selectedColor || (colorList && colorList.bgColor)}}></div>
                    </div>
                    <div>
                      <Typography>Background 2:</Typography>
                      <div style={{width:'200px',height:'50px',border:'1px solid black',backgroundColor:selectedColor1 || (colorList && colorList.bgColor1)}}></div>
                    </div>
                    <div>
                      <Typography>Button:</Typography>
                      <button style={{width:'200px',height:'50px',border:'1px solid black',backgroundColor:btnColor || (colorList && colorList.btnColor),borderRadius:'10px'}}>
                        <Typography sx={{fontSize:'20px',fontWeight:'700',color:btnColor1 || (colorList && colorList.btnTextColor)}}>Button</Typography> 
                      </button>
                    </div>
                    <div style={{margin:'10px'}}>
                      <Button className='myButton' variant='contained' onClick={setColor}>Save Changes</Button>
                    </div>
                  </div>
                </Card>
                    
                </div> 
                <div style={{width:'90%',height:'100%'}}>
                    <Card sx={{width:'98.5%',margin:'10px 0px 10px 0px',textAlign:'center',backgroundColor:'blue',padding:'10px'}}>
                      <Typography sx={{fontSize:'20px',fontWeight:'1000',color:'white'}}>Website Images</Typography>
                      </Card>
                    <Card sx={{ width:'100%',display:'flex',height:'100%'}} elevation={3}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            style={{ objectFit: 'cover', height: '90%', width: '100%',margin:'10px' }}
                            image="https://drive.google.com/uc?id=11UzBjV-kEpmcpN-X4ncWhhH_uaSixCVl"
                            alt="green iguana"
                          />
                        </CardActionArea>
                        
                        <CardContent sx={{width:'auto',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <Typography variant="body2" color="text.secondary">
                            <Box sx={{width:'70%',padding:10 }}>
                            <Typography sx={{color:'black'}}>
                              Landing Page: A landing page is a standalone web page that serves as the entry point or first impression of a website for visitors.
                              Please select an Image that should be concise, attention-grabbing, and generate interest in your product or service.
                            </Typography>
                          <Button>
                          <TextField sx={{backgroundColor:'whitesmoke',border:'none'}}
                          type='file' onChange={(e) => setLimg(e.target.files[0])} id="input-with-sx" label="" variant="outlined" />
                          </Button>
                        </Box>
                            </Typography>
                          </CardContent>
                    </Card>    
                    <Card sx={{ width:'100%',display:'flex',height:'100%',marginTop:'10px'}} elevation={3}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            style={{ objectFit: 'cover', height: '90%', width: '100%',margin:'10px' }}
                            image="https://drive.google.com/uc?id=1A-oyqtVZEIfcyfH7CS4GQVN8J8iYk1YC"
                            alt="green iguana"
                          />
                        </CardActionArea>
                        
                        <CardContent sx={{width:'auto',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <Typography variant="body2" color="text.secondary">
                            <Box sx={{width:'70%',padding:10 }}>
                            <Typography sx={{color:'black',fontSize:'17px'}}>
                              Landing Page: Contact Us Section(Carousel Images)
                            </Typography>
                            <Typography sx={{color:'black'}}>
                              Carousel is typically refers to a slideshow-like component that displays a set of images or content in a rotating manner.
                              Please Select three images that showcase your Scholarship Program.This will display in your Website ContactUs section.
                            </Typography>
                            <label htmlFor="">Image 1:</label>
                          <Button>
                          <TextField sx={{backgroundColor:'whitesmoke',border:'none'}}
                          type='file' onChange={(e) =>setCarou(e.target.files[0])} id="input-with-sx" label="" variant="outlined" />
                          </Button><br />
                          <label htmlFor="">Image 2:</label>
                          <Button>
                          <TextField sx={{backgroundColor:'whitesmoke',border:'none'}}
                          type='file' onChange={(e) =>setCarou1(e.target.files[0])} id="input-with-sx" label="" variant="outlined" />
                          </Button><br />
                          <label htmlFor="">Image 3:</label>
                          <Button>
                          <TextField sx={{backgroundColor:'whitesmoke',border:'none'}}
                          type='file' onChange={(e) =>setCarou2(e.target.files[0])} id="input-with-sx" label="" variant="outlined" />
                          </Button><br />
                          <div style={{margin:'10px',width:'100%',display:'flex',justifyContent:'center'}}>
                          <Button className='myButton' onClick={upload} variant='contained'>Save All Images</Button>
                          </div>
                        </Box>
                            </Typography>
                          </CardContent>
                    </Card> 
                </div>  
                <div style={{width:'90%',height:'100%'}}>
                    <Card sx={{width:'98.5%',margin:'10px 0px 10px 0px',textAlign:'center',backgroundColor:'blue',padding:'10px'}}>
                      <Typography sx={{fontSize:'20px',fontWeight:'1000',color:'white'}}>Trivia of the Day</Typography>
                      </Card>  
                    <Card sx={{ width:'100%',display:'flex',height:'100%',marginTop:'10px'}} elevation={3}>
                        <CardActionArea sx={{width:'60%',padding:10 }}>
                          <CardMedia
                          sx={{width:'100%',height:'100%' }}
                            component="img"
                            style={{ objectFit: 'cover', height: '100%', width: '100%',margin:'10px'}}
                            image={trivimgprev || trivia.picture}
                            alt="green iguana"
                          />
                        </CardActionArea>
                        <div style={{width:'40%'}}>
                        <CardContent sx={{width:'auto',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <Typography variant="body2" color="text.secondary">
                            <Box sx={{width:'100%'}}>
                            <Typography sx={{color:'black',fontSize:'17px'}}>
                              Select Images
                            </Typography>
                          <Button>
                          <TextField sx={{backgroundColor:'whitesmoke',border:'none'}}
                          type='file' onChange={(e) =>setTrivimg(e.target.files[0])} id="input-with-sx" label="" variant="outlined" />
                          </Button><br />
                          <CardContent>
                          <CardContent>
                            <Typography variant="h5" component="div">
                            <Box>
                            <TextField 
                            fullWidth 
                            placeholder={trivia.title} 
                            id="input-with-sx" 
                            label="Title"
                             variant="outlined" 
                              value={trivtitle} onChange={(e) => setTrivtitle(e.target.value)}/>
                          </Box>
                            </Typography>
                          </CardContent>
                            <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                              Content:
                            </Typography>
                            <Typography variant="h5" component="div">
                            <Box sx={{ display: 'flex'}}>
                            <TextField multiline
                            value={trivcon}
                            onChange={(e) =>setTrivcon(e.target.value)}
                              rows={10} fullWidth id="input-with-sx" label="" variant="outlined" />
                          </Box>
                            </Typography>
                          </CardContent>
                          <div style={{margin:'10px',width:'100%',display:'flex',justifyContent:'center'}}>
                          <Button className='myButton' onClick={trivCreate} variant='contained'>Save</Button>
                          </div>
                        </Box>
                            </Typography>
                          </CardContent>
                          </div>
                    </Card> 
                </div>  
                <div style={{width:'90%',height:'100%'}}>
                    <Card sx={{width:'98.5%',margin:'10px 0px 10px 0px',textAlign:'center',backgroundColor:'blue',padding:'10px'}}>
                      <Typography sx={{fontSize:'20px',fontWeight:'1000',color:'white'}}>FAQs</Typography>
                    </Card>  
                <div>
                  <div style={{margin:'10px'}}>
                    <Button sx={{color:'white'}} className='myButton1' onClick={handleClickOpen1}><AddIcon />Add Faqs</Button>
                  </div>
                  {faqs?.map((data,index) =>{
                    const num = index
                    return (
                      <>
                        <Accordion expanded={expanded === `panel${num}`} onChange={handleChange(`panel${num}`)}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                          >
                            <Typography sx={{ width: '33%', flexShrink: 0,fontWeight:700}}> {data.faqsQuestions}</Typography>
                            <Button className='myButton' onClick={() =>handleClickOpen(data)} sx={{color:'white',marginLeft:'50%'}}>Edit</Button>
                            <Button className='myButton2' onClick={() =>deleteFaqs(data)} sx={{color:'white',marginLeft:'2%'}}>Delete</Button>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              {data.faqsAnswers}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>                      
                      </>
                    )
                  })}
                </div>

                </div>                              
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Website