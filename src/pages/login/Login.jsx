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
    fontSize: 12, // Adjust the base font size
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

         <h1>Administrator</h1>
        </div>

    <form>
      <div className="form-group">
        <TextField 
        sx={{borderRadius:'10px'}}
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
              <AccountBoxRoundedIcon/>
            </InputAdornment>   
          )
        }}
        onChange={handlerEmailInput}
        />
      </div>

      <div className="form-group">
        <TextField 
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
              <LockRoundedIcon/>
            </InputAdornment>   
          )
        }}
        />
        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',fontSize:'12px'}}>
          <div>
          <FormControlLabel sx={{fontSize:'10px'}} required control={<CustomCheckbox />} label="Remember me" />
          </div>
          <div>
            <Link>
            Forgot Password?
            </Link>
          </div>
        </div>
      </div>
      <div className="btnlogin">
      <button className="myButton" 
                onClick={handleSubmit}
                >
        Login
      </button>
      </div>
    </form>
    </div>
    </div>
    </ThemeProvider>
    </>
  )
}

export default Login