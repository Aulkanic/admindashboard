import './navbar.scss';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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
import { useNavigate } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openprof, setOpenProf] = React.useState(false);
  const [openaccs, setOpenAccs] = React.useState(false);
  const [oldpass,setOldpass] = React.useState([]);
  const [password,setPassword] = React.useState('');
  const [repass,setRepass] = React.useState('');
  const [adminprof,setProfile] = React.useState('');
  const [preview, setPreview] = React.useState();
  const [showBackdrop, setShowBackdrop] = React.useState(false);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [notif,setNotif] = React.useState([])

  const handleClick1 = (event) => {
    console.log(event)
    setAnchorEl1(event.currentTarget);
  };

  const handleClose3 = () => {
    setAnchorEl1(null);
  };

  const open1 = Boolean(anchorEl1);
  const id = open1 ? 'simple-popover' : undefined;

  const handleOpen1 = () => {
    handleClose()
    setOpenProf(true)
  };
  const handleClose1 = () => setOpenProf(false);
  const handleOpen2 = () => {
    handleClose()
    setOpenAccs(true)
  };
  const handleClose2 = () => setOpenAccs(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async() => {
    setAnchorEl(null);
  };
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
        setNotif(res.data.reverse())
      }
      Fetch();
      const intervalId = setInterval(Fetch, 5000);
      return () => {
        clearInterval(intervalId);
      };
    },[])
  const UpdatePasswordUser = () =>{
    if(!password || !repass){
      swal("Error","Please provide necessary information first",'warning')
      return
    }
    if(!oldpass){
      swal("Error","Please provide necessary information first",'warning')
      return
    }
    if(password != repass){
      swal("Error","New Password did not match",'warning')
      return
    }
    setShowBackdrop(true)
    const formData = new FormData();
    formData.append('currentpassword',oldpass);
    formData.append('password',password);
    formData.append('id',admin[0].id)
    UpdatePassword.UPDATE_PASS(formData)
    .then(res => {
      if(res.data.success === 0){
        setShowBackdrop(false)
        swal({
          title: "Error",
          text: res.data.message,
          icon: "error",
          button: "OK",
        });
        
      }else{
        setShowBackdrop(false)
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

    function timeAgo(date) {
      const timestamp = new Date(date)
      const now = new Date();
      const diffInSeconds = Math.floor((now - timestamp) / 1000);
    
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
  const notification = notif?.map((data,index) =>{
    return(
      <li key={index} className="notification-item">
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
            setNotif(res.data.reverse())
          })
        }
      }
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
            <TextField
              id="outlined-controlled"
              label="Current Password"
              value={oldpass}
              fullWidth
              type='password'
              onChange={(event) => {
                setOldpass(event.target.value);
              }}
            />
            <TextField
            sx={{margin:'10px 0px 10px 0px'}}
              id="outlined-controlled"
              label="New Password"
              value={password}
              type='password'
              fullWidth
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
              <TextField
              id="outlined-controlled"
              label="Confirm Password"
              value={repass}
              type='password'
              sx={{marginBottom:'10px'}}
              fullWidth
              onChange={(event) => {
                setRepass(event.target.value);
              }}
            />
            </div>
            <Button onClick={UpdatePasswordUser} variant="contained" endIcon={<SaveIcon />}>
        Send
      </Button>
          </Box>
        </Fade>
      </Modal>
    <div className='navbar1'>
      <div className='wrapper1'>

        <div style={{margin:'0px 35px 0px 15px'}}>
        <Badge 
        badgeContent={notif?.filter((data) => data.remarks === 'unread').length} 
        color="error"
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            width: '25px',
            height: '20px',
            cursor:'pointer'
          }}
        onClick={handleClick1}
          >
          <NotificationsRoundedIcon 
                sx={{color:'white',fontSize:'35px'}}
                onClick={handleClick1}
          />
        </Badge>
        <Popover
          id={id}
          open={open1}
          anchorReference="anchorPosition"
          anchorEl={anchorEl1}
          onClose={handleClose3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
    
          anchorPosition={{ top: 60, left: 1100 }}
        >
          <Box sx={{ p: 2,height:'400px',width:'350px' }}>
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
          </Box>
        </Popover>
        </div>
        <div className='items'>
            <div>
            <Typography sx={{color:'white',fontSize:'15px'}}>{admin[0].name}({admin[0].jobDescription})</Typography>
            </div>
          <div className="item">
          <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
     <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar alt="Remy Sharp" src={admin[0].profile} />
      </StyledBadge>
      </Button>
        </div>
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleOpen1}>Profile</MenuItem>
            <MenuItem onClick={handleOpen2}>Password</MenuItem>
            <MenuItem onClick={handleCloselogout}>Logout</MenuItem>
          </Menu>
        </div>

      </div>
    </div>
      </>
  );
};

export default Navbar