import React from 'react'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import './website.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

const Website = () => {
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
                  type='file' id="input-with-sx" label="" variant="outlined" />
                  </Button>
                  <Button variant='contained'>Save</Button>
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
                  type='file' id="input-with-sx" label="" variant="outlined" />
                  </Button><br />
                  <label htmlFor="">Image 2:</label>
                  <Button>
                  <TextField sx={{backgroundColor:'whitesmoke',border:'none'}}
                  type='file' id="input-with-sx" label="" variant="outlined" />
                  </Button><br />
                  <label htmlFor="">Image 3:</label>
                  <Button>
                  <TextField sx={{backgroundColor:'whitesmoke',border:'none'}}
                  type='file' id="input-with-sx" label="" variant="outlined" />
                  </Button><br />
                  <Button variant='contained'>Save</Button>
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