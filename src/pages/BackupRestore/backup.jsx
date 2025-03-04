import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { BackupLists,BackupNow,RestoreDb } from '../../api/request';
import Icon from '../../Images/list-svgrepo-com.svg'
import './backup.css'
import './backup.scss'
import { Button, Card } from '@mui/material';
import swal from 'sweetalert';
import { Backdrop, CircularProgress } from '@mui/material';
import { styled } from '@mui/material';
import { FaDownload } from "react-icons/fa6";
import { TbRestore } from "react-icons/tb";
import { FcDataBackup } from "react-icons/fc";

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));

const apiURL = 'https://api-one-jet-10.vercel.app/';

const Backup = () => {
    const [backup,setBackup] = useState([])
    const [filename, setBackupFiles] = useState('');
    const [showBackdrop, setShowBackdrop] = useState(false);

    useEffect(() =>{
        async function Fetch(){
            let res = await BackupLists.BACKUP()

            setBackup(res.data.reverse())
        }
        Fetch()
        const intervalId = setInterval(Fetch, 5000);
        return () => {
          clearInterval(intervalId);
        };
    },[])
   
    const list = backup?.map((data) =>{ 
      const filenameWithoutExtension = data.replace(/\.[^/.]+$/, '');
        return(
        <>
        <FormControlLabel 
        value={data} 
        control={<Radio />} 
        label={
            <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
              <img style={{width:'25px',marginRight:'5px'}} src={Icon} alt="Backup Icon" /> {filenameWithoutExtension}
            </div>
          }
        sx={{borderBottom:'2px solid #eff2f1',idth:'100%',marginBottom:'10px',display:'flex',alignItems:'center'}}
        /> 
        </> 
    )})

    const downloadBackup = () => {
      if(!filename || filename === ''){
        swal("Error!", `Please select backup data first`, "error")
        return
      }
      // Trigger a file download by creating an anchor tag and simulating a click
      const downloadLink = document.createElement('a');
      downloadLink.href = `http://localhost:3007/download/${filename}`; // Replace with your backend endpoint
      downloadLink.download = filename;
      downloadLink.click();
    };
    const Backingup = async() =>{
          setShowBackdrop(true)
          await BackupNow.BACKUPNOW()
          .then((res) =>{
            if(res.data.success === 0){
              swal({
                text: res.data.message,
                icon: "error",
              })
              setShowBackdrop(false)
              return
            }else{
              setBackup(res.data.files.reverse())
              setShowBackdrop(false)
              swal("Success!", `${res.data.message}`, "success")

            }
          })
    }
    const Restoring = async() =>{
      if(!filename || filename === ''){
        swal("Error!", `Please select backup data first`, "error")
        return
      }
        const formData = new FormData()
        formData.append('backupedFile',filename)
        setShowBackdrop(true)
        await RestoreDb.RESTORE(formData)
        .then((res) =>{
          console.log(res)
          if(res.data.success === 0){
            setShowBackdrop(false)
            swal("Error!", `${res.data.message}`, "error")
            return
          }else{
            setShowBackdrop(false)
            swal("Success!", `${res.data.message}`, "success")
          }
        })
    }
  return (
    <>
    <StyledBackdrop open={showBackdrop}>
    <CircularProgress color="inherit" />
    </StyledBackdrop>
    <div className='backup'>
        <Sidebar/>
        <div className="backupcontainer">
            <Navbar/>
        <div className="top">
            <div style={{display:'flex',flexDirection:'column',marginBottom:10}}>
            <h1>Backup and Restore</h1>
              <div>
                <div className='headbackup'>
                <p style={{margin:'0px'}}>Select and restore or download backup data</p>
                <button className='btnofficials1' onClick={Backingup}><FcDataBackup style={{marginRight:'2px'}}/>Backup now!</button>
                </div>
                <h1 className='listback'>List of Backup Data</h1>
                <Card sx={{padding:'15px'}}>
                <FormControl sx={{width:'100%',paddingLeft:'10px'}}>
                    <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                    <RadioGroup
                       column
                       value={filename}
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        onChange={(e) =>setBackupFiles(e.target.value)}
                    >
                      {list}
                    </RadioGroup>
                    
                </FormControl>
                <div className='backupactions'>
                    <button className="btnofficials" onClick={Restoring}>
                    <TbRestore style={{marginRight:'2px',marginTop:'-3px'}}/>
                        Restore
                    </button>
                    <button className='btnofficials1'
                    onClick={downloadBackup}
                    sx={{
                        textTransform:'none',
                        color:'white',
                        marginLeft:'10px'}}>
                        <FaDownload style={{marginRight:'2px',marginTop:'-3px'}}/>
                        Download
                    </button>
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