import React from 'react'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import SchoolIcon from '@mui/icons-material/School';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Avatar from '@mui/material/Avatar';
import './rule.css'

const Rule = () => {
  return (
    <>
    <div className="scholarships" style={{backgroundColor:'whitesmoke'}}>
        <Sidebar/>
    <div className="scholarshipsContainer">
        <Navbar/>
        <div>
          <h1 style={{marginTop:10,marginLeft:30}}>Set Up the different Rules and Information of Scholarhip Program</h1>
          <div style={{display:'flex'}}>
          <div className='rulecon'>
            <Box sx={{width:'200px',height:'200px'}}>
          <Card sx={{ minWidth: 275 }} elevation={3}>
      <CardContent>
        <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
          Number Of Scholar per Family Members
        </Typography>
        <Typography variant="h5" component="div">
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Diversity1Icon sx={{ color: 'white', mr: 1, my: 0.5,backgroundColor:'green',borderRadius:'5px',fontSize:'30px',padding:'5px' }} />
        <TextField id="input-with-sx" label="" variant="standard" />
      </Box>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained'>Save</Button>
      </CardActions>
    </Card>
            </Box>
            <Box sx={{width:'200px',height:'200px'}}>
          <Card sx={{ minWidth: 275 }} elevation={3}>
      <CardContent>
        <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
          Number of Scholarship Must a Applicants Has
        </Typography>
        <Typography variant="h5" component="div">
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <SchoolIcon sx={{ color: 'white', mr: 1, my: 0.5,backgroundColor:'green',borderRadius:'5px',fontSize:'30px',padding:'5px' }} />
        <TextField id="input-with-sx" label="" variant="standard" />
      </Box>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained'>Save</Button>
      </CardActions>
    </Card>
            </Box>
            <Box sx={{width:'200px',height:'200px'}}>
          <Card sx={{ minWidth: 275,minHeight:180 }} elevation={3}>
      <CardContent>
        <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
          Age of Applicants Accepted
        </Typography>
        <Typography variant="h5" component="div">
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <HowToRegIcon sx={{ color: 'white', mr: 1, my: 0.5,backgroundColor:'green',borderRadius:'5px',fontSize:'30px',padding:'5px' }} />
        <TextField id="input-with-sx" label="" variant="standard" />
      </Box>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained'>Save</Button>
      </CardActions>
    </Card>
            </Box>
          </div>
          <div className='rulecon1'>
            <div className='logos'>
            <Box sx={{width:'400px',height:'100%'}}>
          <Card sx={{ minWidth: 275 }} elevation={3}>
      <CardContent>
        <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
          BMCC Logo
        </Typography>
        <Typography variant="h5" component="div">
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <Avatar
        alt="BMCC"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 76, height: 76 }}
      />
        <Button>
        <TextField sx={{backgroundColor:'whitesmoke',border:'none'}}
         type='file' id="input-with-sx" label="" variant="outlined" />
        </Button>
      </Box>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained'>Save</Button>
      </CardActions>
          </Card>
            </Box>
            <Box sx={{width:'400px',height:'250px'}}>
          <Card sx={{ minWidth: 275 }} elevation={3}>
      <CardContent>
        <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
          Current Mayor Logo
        </Typography>
        <Typography variant="h5" component="div">
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <Avatar
        alt="Mayor"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 76, height: 76 }}
      />
        <Button>
        <TextField sx={{backgroundColor:'whitesmoke',border:'none'}}
         type='file' id="input-with-sx" label="" variant="outlined" />
        </Button>
      </Box>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained'>Save</Button>
      </CardActions>
          </Card>
            </Box>
            </div>
            <div className='privilege'>
            <Box sx={{width:'85%',height:'100%'}}>
          <Card sx={{ minWidth: 275 }} elevation={3}>
      <CardContent>
        <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
          Scholarship Privilege
        </Typography>
        <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
          Scholarship Allowance to be receive of a particular Scholar
        </Typography>
        <Typography variant="h5" component="div">
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <SchoolIcon sx={{ color: 'white', mr: 1, my: 0.5,backgroundColor:'green',borderRadius:'5px',fontSize:'30px',padding:'5px' }} />
        <TextField id="input-with-sx" label="Elementary Scholars" variant="standard" />
      </Box>
        </Typography>
        <Typography variant="h5" component="div">
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <SchoolIcon sx={{ color: 'white', mr: 1, my: 0.5,backgroundColor:'green',borderRadius:'5px',fontSize:'30px',padding:'5px' }} />
        <TextField id="input-with-sx" label="High School Scholars" variant="standard" />
      </Box>
        </Typography>
        <Typography variant="h5" component="div">
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <SchoolIcon sx={{ color: 'white', mr: 1, my: 0.5,backgroundColor:'green',borderRadius:'5px',fontSize:'30px',padding:'5px' }} />
        <TextField id="input-with-sx" label="College Scholars" variant="standard" />
      </Box>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained'>Save</Button>
      </CardActions>
          </Card>
            </Box>
            </div>
          </div>
          </div>
          </div>
            </div>
    </div>
    </>
  )
}

export default Rule