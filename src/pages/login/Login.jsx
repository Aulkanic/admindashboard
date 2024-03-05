import "./login.scss";
import { admininfo } from "../../App";
import {login,ForgotPasswordofEmp} from '../../api/request'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import swal from "sweetalert";
import InputAdornment from '@mui/material/InputAdornment';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import Checkbox from '@mui/material/Checkbox';
import { styled, ThemeProvider, createTheme, Link, TextField } from '@mui/material';
import { Backdrop, CircularProgress,Button } from '@mui/material';
import { setAdmin, setAuthenticated } from "../../Redux/loginSlice";
import { useDispatch } from 'react-redux';
import Mydo from '../../Images/mydo.jpg'

const theme = createTheme({
  typography: {
    fontSize: 10.5,
  },
});

const StyledBackdrop = styled(Backdrop)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;

const Login = () => {
  const dispatch = useDispatch();
    const { loginUser } = useContext(admininfo);
    const [email, setEmail] = useState('');
    const [fpemail,setFpemail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [page,setPage] = useState(0)

    const handleSubmit = async(e) => {
      e.preventDefault();
      if(!email || !password){
        swal({
          text: 'Please provide email and password first',
          timer: 2000,
          buttons: false,
          icon: "error",
        })
      }
      setShowBackdrop(true);
      await login.ADMIN_LOGIN({email,password}).then((res) =>{
      if(res.data.message === 'Success'){
        loginUser(res.data.userDetails)
        const inf = [res.data.userDetails,res.data.sectionId]
        localStorage.setItem('AdminisOnline',true)
        dispatch(setAuthenticated(true))
        dispatch(setAdmin(inf))
        setShowBackdrop(false);
        navigate('/home');
        swal({
          text: 'Login Success',
          timer: 2000,
          buttons: false,
          icon: "success",
        })
      }

     else{
      setShowBackdrop(false);
      swal({
        text: `${res.data.message}`,
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      navigate('/');
     }
     })
    };
    const forgotEmp = async() =>{
      if(!fpemail){
        swal({
          text: 'Please input your Email first',
          timer: 2000,
          buttons: false,
          icon: "warning",
        })
        return
      }
      const formData = new FormData()
      formData.append('fpemail',fpemail)
      ForgotPasswordofEmp.FORGOT_PASS(formData)
      .then((res) =>{
        if(res.data.success === 1){
          swal({
            text: 'New Password was sent to your Email',
            timer: 2000,
            buttons: false,
            icon: "success",
          })
          navigate('/');
        }else{
          swal({
            text: res.data.message,
            timer: 2000,
            buttons: false,
            icon: "error",
          })  
        }
      })
    }
    const handlerEmailInput = (e) => setEmail(e.target.value)
    const handlerPasswordInput = (e) => setPassword(e.target.value)
    const CustomCheckbox = styled(Checkbox)`
    font-size: 10px;
  `;
  return (
    <>
    <ThemeProvider theme={theme}>
      <StyledBackdrop open={showBackdrop}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>

    <div className="login">
      <div className="container">

        <div className="toplogin">
        <img className="mydo" src={Mydo} 
         alt=""/>
        </div>
        
        <form>
          {page === 0 && (
          <>
          <div className="headlogin">
            <h1>Welcome Admin!</h1>
            <i>Sign in to your Account</i>
          </div>
          <div className="form-group">
            <TextField 
            sx={{borderRadius:'5px',
                boxShadow: '0px 1px 1px 0px gray',
                border: 'none',
            }}

            style={{
              fontStyle: 'italic',
              alignItems: 'center',
              marginBottom: '10px',
              width: '350px',
              
            }}

            type='email' 
            variant="outlined"
            size="small"
            name="email"
            fullWidth
            placeholder='Email'
            value={email}     
            InputProps={{
              endAdornment:(
                <InputAdornment position="end">
                  <AccountBoxRoundedIcon sx={{color: '#0020CB'}}/>
                </InputAdornment>   
              )
            }}
            onChange={handlerEmailInput}
            />
          </div>
          <div className="form-group">
            <TextField 
              sx={{borderRadius:'5px',
              boxShadow: '0px 1px 1px 0px gray',
              border: 'none',
            }}
            
            style={{
              fontStyle: 'italic',
              alignItems: 'center',
              marginBottom: '10px',
              width: '350px',
            }}

            type="password"
            name='password'
            variant="outlined"
            size="small"
            fullWidth
            placeholder='Password'
            value={password}
            onChange={handlerPasswordInput}
            InputProps={{
              endAdornment:(
                <InputAdornment position="end">
                  <LockRoundedIcon sx={{color: '#0020CB'}}/>
                </InputAdornment>   
              )
            }}
            />
            
            <div style={{
              display:'flex',
              justifyContent:'space-around',
              alignItems:'center', 
              fontSize:'11px', 
              marginBottom:'15px'}}>

              <div style={{cursor:'pointer'}} onClick={() =>setPage(1)}>
                <Link sx={{fontStyle: 'italic', marginLeft: '115px'}}>
                Forgot Password?
                </Link>
              </div>

            </div>
          </div>
          <div className="btnlogin">
            <button className="myButtond" onClick={handleSubmit}>LOGIN</button>
          </div>
          </>
          )}
          {page === 1 && (
            <>
            <div className="headlogin">
            <h1>Forgot Password</h1>
            <i>Please Enter below your email to get your New password</i>
          </div>
          <div className="form-group">
            <TextField 
              sx={{borderRadius:'5px',
              boxShadow: '0px 1px 1px 0px gray',
              border: 'none',
            }}
            
            style={{
              fontStyle: 'italic',
              alignItems: 'center',
              marginBottom: '10px',
              width: '350px',
            }}

            type="email"
            name='email'
            variant="outlined"
            size="small"
            fullWidth
            placeholder='Email'
            value={fpemail}
            onChange={(e) => setFpemail(e.target.value)}
            InputProps={{
              endAdornment:(
                <InputAdornment position="end">
                  <LockRoundedIcon sx={{color: '#0020CB'}}/>
                </InputAdornment>   
              )
            }}
            />
          </div>
          <div className="btnlogin">
            <Button className="myButtond" onClick={forgotEmp}>Send</Button>
          </div>
          </>)}
        </form>
    </div>
    </div>
    </ThemeProvider>
    </>
  )
}

export default Login