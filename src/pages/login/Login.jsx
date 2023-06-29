import "./login.scss";
import { admininfo } from "../../App";
import {login} from '../../api/request'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import swal from "sweetalert";

const Login = () => {
    const { loginUser } = useContext(admininfo);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
      e.preventDefault();
      await login.ADMIN_LOGIN({email,password}).then((res) =>{
      console.log(res.data)
      if(res.data.message === 'Success'){
        loginUser(res.data.userDetails)
        localStorage.setItem('AdminisOnline',true)
        navigate('/home');
        swal({
          text: 'Login Success',
          timer: 2000,
          buttons: false,
          icon: "success",
        })
      }
     else{
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
      <button className="btn btn-primary btn-block" 
                onClick={handleSubmit}
                >
        Login
      </button>

    </form>
    </div>
    </div>
  )
}

export default Login