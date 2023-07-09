import React, { useEffect } from 'react'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import './website.css'
import { Colorlist,Colors,WebImg,WebsiteImg } from '../../api/request'
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


const Website = () => {
  const [selectedColor, setSelectedColor] = useState('#ffffff'); // Initial color
  const [selectedColor1, setSelectedColor1] = useState('#ffffff'); // Initial color
  const [btnColor, setBtnColor] = useState('#ffffff'); // Initial color
  const [btnColor1, setBtnColor1] = useState('#ffffff'); // Initial color
  const [colorList,setColorlist] = useState([]);
  const [imgList,setImglist] = useState([])
  const [limg,setLimg] = useState(null);
  const [carouimg,setCarou] = useState(null)
  const [carouimg1,setCarou1] = useState(null)
  const [carouimg2,setCarou2] = useState(null)

  useEffect(() =>{
    async function Fetch(){
      const res = await Colorlist.FETCH_COLOR()
      const req = await WebImg.FETCH_WEB()
      console.log(req)
      setImglist(req.data.result)
      setColorlist(res.data.result[0])
    }
    Fetch();
  },[])

  const setColor = async() =>{
    const formData = new FormData();
    formData.append('color1',selectedColor || colorList.bgColor)
    formData.append('color2',selectedColor1 || colorList.bgColor1)
    formData.append('color3',btnColor || colorList.btnColor)
    formData.append('color4',btnColor1 || colorList.btnTextColor)
    await Colors.COLOR(formData)
    .then((res) =>{
      console.log("success",res);
      setColorlist(res.data.result[0])
    })
    .catch((err)=>console.error(`Error:${err}`))
  }

    const upload = async() =>{
      const Images = [
        { ImgFor: 'LandingPage', File: limg || (imgList[0] && imgList[0].File) },
        { ImgFor: 'Carousel1', File: carouimg || (imgList[1] && imgList[1].File) },
        { ImgFor: 'Carousel2', File: carouimg1 || (imgList[2] && imgList[2].File) },
        { ImgFor: 'Carousel3', File: carouimg2 || (imgList[3] && imgList[3].File) },
      ];
      console.log(Images)
      for(let i=0;i<Images.length;i++){
        const list = Images[i];
        const formData = new FormData()
        formData.append('file',list.File)
        formData.append('ImgFor',list.ImgFor)
        await WebsiteImg.WEB_IMG(formData)
        .then((res) =>{
          swal('Uploaded Successfully')
          setImglist(res.data.result[0])
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    }
  return (
    <>
    <div className="scholarships">
        <Sidebar/>
    <div className="scholarshipsContainer">
        <Navbar/>
        <div style={{backgroundColor:'whitesmoke',padding:10}}>
          <h1 style={{marginTop:10,marginLeft:30}}>Website Maintenance</h1>
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
                  <div style={{width:'200px',height:'50px',border:'1px solid black',backgroundColor:selectedColor}}></div>
                </div>
                <div>
                  <Typography>Background 2:</Typography>
                  <div style={{width:'200px',height:'50px',border:'1px solid black',backgroundColor:selectedColor1}}></div>
                </div>
                <div>
                  <Typography>Button:</Typography>
                  <button style={{width:'200px',height:'50px',border:'1px solid black',backgroundColor:btnColor,borderRadius:'10px'}}>
                    <Typography sx={{fontSize:'20px',fontWeight:'700',color:btnColor1}}>Button</Typography> 
                  </button>
                </div>
                <div style={{margin:'10px'}}>
                  <Button variant='contained' onClick={setColor}>Save Changes</Button>
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
                  <Button onClick={upload} variant='contained'>Save All Images</Button>
                  </div>
                </Box>
                    </Typography>
                  </CardContent>
            </Card> 
        </div>         
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Website