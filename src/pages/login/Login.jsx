import "./login.scss";
import { admininfo } from "../../App";
import {login} from '../../api/request'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import swal from "sweetalert";
import InputAdornment from '@mui/material/InputAdornment';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled, ThemeProvider, createTheme, Link, TextField } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';

const theme = createTheme({
  typography: {
    fontSize: 10.5,
  },
});

const StyledBackdrop = styled(Backdrop)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;

const Login = () => {
    const { loginUser } = useContext(admininfo);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [showBackdrop, setShowBackdrop] = useState(false);

    const handleSubmit = async(e) => {
      e.preventDefault();
      setShowBackdrop(true);
      await login.ADMIN_LOGIN({email,password}).then((res) =>{
      if(res.data.message === 'Success'){
        loginUser(res.data.userDetails)
        localStorage.setItem('AdminisOnline',true)
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
        <img className="mydo" src="https://drive.google.com/uc?id=1HsYAs1azfEEjkJDjPKQaWjhorcW1W0T6" 
         alt=""/>
        </div>

          <hr 
            style={{
              background: 'none',
              borderColor: 'red',
              height: '400px',
            }}
          />
        

    <form>
      <div className="head">
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
        placeholder='Username'
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

        <div>
          <FormControlLabel 
            sx={{fontSize:'10px', 
                fontStyle: 'italic',
                color: 'blue'  
              }} 
                required control={<CustomCheckbox />} 
                label="Remember me" />
        </div>

          <div>
            <Link sx={{fontStyle: 'italic', marginLeft: '115px'}}>
            Forgot Password?
            </Link>
          </div>

        </div>
      </div>

      <div className="btnlogin">
        <button className="myButton" onClick={handleSubmit}>LOGIN</button>
      </div>

    </form>
    </div>
    </div>
    </ThemeProvider>
    </>
  )
}

export default Login