import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { BackupLists } from '../../api/request';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import Icon from '../../Images/list-svgrepo-com.svg'
import './backup.css'
import './backup.scss'
import { Button, Card, Divider } from '@mui/material';

const Backup = () => {
    const [backup,setBackup] = useState([])

    useEffect(() =>{
        async function Fetch(){
            let res = await BackupLists.BACKUP()
            console.log(res)
            setBackup(res.data)
        }
        Fetch()
    },[])
   
    const list = backup?.map((data) =>{
     
        return(
        <>
        <FormControlLabel 
        value={data} 
        control={<Radio />} 
        label={
            <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
              <img style={{width:'25px',marginRight:'5px'}} src={Icon} alt="Backup Icon" /> {data}
            </div>
          }
        sx={{borderBottom:'2px solid #eff2f1',idth:'100%',marginBottom:'10px',display:'flex',alignItems:'center'}}
        /> 
        </> 
    )})
  return (
    <>
    <div className='backup'>
        <Sidebar/>
        <div className="backupcontainer">
            <Navbar/>
        <div className="top">
            <div style={{display:'flex',flexDirection:'column',marginBottom:10}}>
            <h1>Backup and Restore</h1>
              <div>
                <p>Select or download backup data</p>
                <Card sx={{padding:'15px'}}>
                <FormControl sx={{width:'100%',paddingLeft:'10px'}}>
                    <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                    <RadioGroup
                       column
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                    >
                      {list}
                    </RadioGroup>
                    
                </FormControl>
                <div className='backupactions'>
                    <Button className='myButton1' sx={{textTransform:'none',color:'white'}}>
                        Restore
                    </Button>
                    <Button 
                    className='myButton'
                    sx={{
                        textTransform:'none',
                        color:'white',
                        marginLeft:'10px'}}>
                        Download
                    </Button>
                </div>
                </Card>
              </div>
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default Backup