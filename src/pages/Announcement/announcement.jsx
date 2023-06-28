import React, { useEffect, useState } from 'react'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { FetchingAnnounce } from '../../api/request';

const Announcement = () => {
    const [announced,setAnnounced] = useState([]);

    useEffect(() =>{
        async function Fetch(){
          let response = await FetchingAnnounce.FETCH_ANNOUNCE();
          console.log(response)
          setAnnounced(response.data.Announce)
        }
        Fetch()
    },[])

    const AnnouncedList = announced?.map((data,index) =>{
      return (
        <>
        <div key={index}>
   <Card style={{ marginBottom: 10 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.date}
        </Typography>
        <hr />
        <Typography variant="h5" component="div">
          {data.title}
        </Typography>
        <Typography variant="body2">
          {data.content}
        </Typography>
      </CardContent>
    </Card>
    </div>
        </>
      )
    })
  return (
    <>
    <div className="scholarships" style={{backgroundColor:'whitesmoke'}}>
        <Sidebar/>
    <div className="scholarshipsContainer">
        <Navbar/>
        <Typography style={{display:'flex',fontSize:29,justifyContent:'center',fontWeight:'bold',marginBottom:'20px'}}>
        Announcements
        </Typography>
          <div style={{backgroundColor:'whitesmoke',width:'100%',height:'100vh',overflow:'auto',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:'90%',height:'100%',display:'flex'}}>
              <div style={{width:'50%',height:'100%'}}>
              <Card sx={{width:'100%',height:'max',paddingBottom:'30px'}}>
                <Typography style={{marginTop:'10px',marginLeft:'15px',fontWeight:'bold',fontSize: 27}}>
                Create Announcement
                </Typography>

                <CardContent>
                  <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                    Title
                  </Typography>
                  <Typography variant="h5" component="div">
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <TextField fullWidth id="input-with-sx" label="" variant="outlined" />
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
                    rows={10} fullWidth id="input-with-sx" label="" variant="outlined" />
                </Box>
                  </Typography>
                </CardContent>
                <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
              <Button variant='contained'>Announce</Button>
              </div>
              </Card>
              </div>
              <div style={{marginLeft:'10px',marginRight:'10px',width:'50%',height:'600px',overflow:'auto',display:'flex',flexDirection:'column'}}>
              <h1>Announced</h1>
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