import './navbar.scss';
import React, { useState } from 'react'
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { UpdatePassword, UpdateProfile,LogoutAdmin,AdminNotify,SeenAdminNotify } from '../../api/request';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import { useSelector } from "react-redux";
import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setAdmin, setAuthenticated } from "../../Redux/loginSlice";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'
import { Notifications } from '../PopOver/notification';
import { Profile } from '../PopOver/profile';
import { Password } from '../InputFields/password';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));


const Navbar = () => {
  const { admin  } = useSelector((state) => state.login)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
  const [openprof, setOpenProf] = useState(false);
  const [openaccs, setOpenAccs] = useState(false);
  const [password,setPassword] = useState({
    old:{value:[],isView:false},
    new:{value:[],isView:false},
    repeat:{value:[],isView:false}
  });
  const [adminprof,setProfile] = useState('');
  const [preview, setPreview] = useState();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [notif,setNotif] = useState([]);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async() => {
    setAnchorEl(null);
  };
  const handleClose1 = () => setOpenProf(false);
  const handleClose2 = () => setOpenAccs(false);
  const handleClose3 = () => {
    setAnchorEl1(null);
  };
  const handleOpen1 = () => {
    handleClose()
    setOpenProf(true)
  };
  const handleOpen2 = () => {
    handleClose()
    setOpenAccs(true)
  };

  const handleInputChange = (field, value) =>{
      setPassword((prev) =>({
        ...prev,
        [field]:{ ...prev[field],value}
      }))
  }
  const handleTogglePasswordVisibility = (field) =>{
    setPassword((prev) =>({
      ...prev,
      [field]: {...prev[field],isView: !prev[field].isView}
    }))
  }

  const handleCloselogout = async() => {
    const formData = new FormData();
    formData.append('id',admin[0].id)
       await LogoutAdmin.SET_LOGOUT(formData)
       dispatch(setAuthenticated(false))
       dispatch(setAdmin([]))
       navigate('/')
  };
  React.useEffect(() => {
    if (!adminprof) {
        setPreview(undefined)
        return
    }
    
    const objectUrl = URL.createObjectURL(adminprof)
    setPreview(objectUrl)
    
    return () => URL.revokeObjectURL(objectUrl)
    }, [adminprof])

    React.useEffect(() =>{
      async function Fetch(){
        const res = await AdminNotify.ADMIN_NOTIF();
        setNotif(res?.data?.reverse())
      }
      Fetch();
      const intervalId = setInterval(Fetch, 5000);
      return () => {
        clearInterval(intervalId);
      };
    },[])
  const UpdatePasswordUser = () =>{
    if(!password.new || !password.repeat){
      swal("Error","Please provide necessary information first",'warning')
      return
    }
    if(!password.old){
      swal("Error","Please provide necessary information first",'warning')
      return
    }
    if(password.new != password.repeat){
      swal("Error","New Password did not match",'warning')
      return
    }
    setShowBackdrop(true)
    const formData = new FormData();
    formData.append('currentpassword',password.old);
    formData.append('password',password.new);
    formData.append('id',admin[0].id)
    UpdatePassword.UPDATE_PASS(formData)
    .then(res => {
      if(res.data.success === 0){
        swal({
          title: "Error",
          text: res.data.message,
          icon: "error",
          button: "OK",
        });
        
      }else{
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          button: "OK",
        });
      }

    }
     )
    .catch(err => console.log(err));
  }
  const UpdateProfileUser = (event) =>{
    event.preventDefault();
    const file = adminprof;
    if(file === ''){
      swal("Error","Image Required",'warning')
      return
    }
    const fileExtension = file?.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg')  {
      swal({
        text: 'Please upload a PNG or JPG image only.',
        timer: 2000,
        buttons: false,
        icon: "error",
      });
    
      return
    }
    const id = admin[0].id
    const formData = {file,id}
    setOpenProf(false)
    setShowBackdrop(true)
    UpdateProfile.UPDATE_PROFILE(formData)
    .then(res => {
      console.log(res)
      setShowBackdrop(false)
      const inf = [res.data.Result,res.data.sectionId]
      dispatch(setAdmin(inf))
      swal({
        title: "Success",
        text: res.data.message,
        icon: "success",
        button: "OK",
      });
    }
     )
    .catch(err => console.log(err));
    }

    function timeAgo(dateString) {
      const timeZone = "Asia/Manila";
      const now = new Date().toLocaleString("en-US", { timeZone });
      const nowDate = new Date(now);
    
      const timestamp = new Date(dateString);
      // Convert both dates to timestamps
      const nowTimestamp = nowDate.getTime();
      const timestampTimestamp = timestamp.getTime();
      const diffInSeconds = Math.floor((nowTimestamp - timestampTimestamp) / 1000);
    
      if (diffInSeconds < 10) {
        return "just now";
      } else if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
      }
    }
  const urlLink = (link) => {
    navigate(`/${link}`)
  }
  const notification = notif?.map((data,index) =>{
    return(
      <li key={index} style={{cursor:'pointer'}} onClick={() => urlLink(data.link)} className="notification-item">
      <div className="notification-text">
        {data.actions}
      </div>
      <div className={data.remarks === 'unread' ? "unreadtime" : "timestamp"}>
        {timeAgo(data.timestamp)}
      </div>
    </li>
    )
  })

  const readAll = async() =>{
      const unreadNotif = notif?.filter((data) => data.remarks === 'unread')
      if(unreadNotif.length === 0){
          return
      }else{
        for(let i = 0;i < unreadNotif.length; i++){
          const det = unreadNotif[i];
          const formData = new FormData;
          formData.append('notifId',det.adnotifId)
          await SeenAdminNotify.SEEN_NOTIF(formData)
          .then((res) =>{
            setNotif(res.data?.reverse())
          })
        }
      }
  }
  const notifContent = () =>{
    return(<Box sx={{ p: 2,height:'400px',width:'350px' }}>
    {notif ? (<>
      <div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'2px solid black'}}>
          <p style={{margin:'0px'}}>Notifications</p>
          <Button onClick={readAll} sx={{fontSize:'12px',textTransform:'none'}}>Clear All</Button>
        </div>
        <ul className="notification-list">
        {notification}
        </ul>
      </div>
    </>) : (<>
     <div>
      No Notification
    </div>             
    </>)}
    </Box>)
  }
  return (
    <>
      <StyledBackdrop open={showBackdrop}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openprof}
        onClose={handleClose1}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openprof}>
          <Box sx={style}>
            <Typography>
              Upload your profile picture here.
            </Typography>
            <Typography>
              Preview
            </Typography>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Avatar alt="Remy Sharp" src={preview} sx={{width: '105px', height: '105px'}}/>
            </div>
            
            <input style={{margin:'10px'}} type="file" onChange={(e) => setProfile(e.target.files[0])}/>
      <Button onClick={UpdateProfileUser} variant="contained">
        Change Profile
      </Button>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openaccs}
        onClose={handleClose2}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openaccs}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Change Password
            </Typography>
            <div>
              <Password
                value={password.old.value}
                label={'Old Password'}
                onChange={(e) =>handleInputChange('old',e.target.value)}
                onClick={() =>handleTogglePasswordVisibility('old')}
                show={password.old.isView}
              />
              <Password
                value={password.new.value}
                label={'Current Password'}
                onChange={(e) =>handleInputChange('new',e.target.value)}
                onClick={() =>handleTogglePasswordVisibility('new')}
                show={password.new.isView}
              />
              <Password
                value={password.repeat.value}
                label={'Current Password'}
                onChange={(e) =>handleInputChange('repeat',e.target.value)}
                onClick={() =>handleTogglePasswordVisibility('repeat')}
                show={password.repeat.isView}
              />
            </div>
            <Button onClick={UpdatePasswordUser} variant="contained" endIcon={<SaveIcon />}>
              Send
            </Button>
          </Box>
        </Fade>
      </Modal>
    <div className='w-full flex h-[10%] bg-blueish'>
      <div className='w-full flex justify-end items-center gap-4 p-8'>
          <Profile
            profileImg={admin[0]?.profile}
            anchorEl={anchorEl}
            handleClick={handleClick}
            open={open}
            handleClose={handleClose}
            handleProfile={handleOpen1}
            handlePassword={handleOpen2}
            handleLogout={handleCloselogout}
          />
          <Notifications
            length={notif?.filter((data) => data.remarks === 'unread').length}
            onClickIcon={handleClick1}
            content={notifContent}
            onClose={handleClose3}
            isOpen={open1}
            anchorEl={open1}
          />
      </div>
    </div>
      </>
  );
};

export default Navbar