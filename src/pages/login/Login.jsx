import "./login.scss";
import { admininfo } from "../../App";
import {login} from '../../api/request'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import swal from "sweetalert";
import { styled, ThemeProvider, createTheme } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';

const theme = createTheme();
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

  return (
    <>
              <StyledBackdrop open={showBackdrop}>
                <CircularProgress color="inherit" />
              </StyledBackdrop>
    <div className="login">
      <div className="container">
    <h3> BMCC Admin </h3>
    <img style={{borderRadius:50}} src="https://drive.google.com/uc?id=1Vg5RGP_vmahLzh-ptNacTpgxGyoLbOPl" 
         alt=""/>
    <form>
      <div className="form-group">
        <input 
        type='text' 
        name="email"
        className='form-control'
        placeholder='Username'
        style={{fontStyle: 'italic', fontSize: 15, color: '#005427'}} 
        value={email}     
        onChange={handlerEmailInput}
        />
      </div>

      <div className="form-group">
        <input 
        type="password"
        name='password'
        className='form-control'
        placeholder='Password'
        style={{fontStyle: 'italic', fontSize: 15}} 
        value={password}
        onChange={handlerPasswordInput}
        />
      </div>
      <button className="myButton" 
                onClick={handleSubmit}
                >
        Login
      </button>

    </form>
    </div>
    </div>
    </>
  )
}

export default Login