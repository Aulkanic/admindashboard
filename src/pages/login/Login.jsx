import "./login.scss";
import { admininfo } from "../../App";
import {login} from '../../api/request'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";

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
        navigate('/home');
        alert(res.data.message)
      }
     else{
      alert(res.data.message);
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
    <img src="https://scontent.fcrk1-4.fna.fbcdn.net/v/t39.30808-6/320078628_1906759176338094_6278034478351068357_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGKt9dCeDN118HQ2R7lz8_Pt2YS-hgqcNS3ZhL6GCpw1LM2aiEzzSdSpafO9QJl6dEWT9Adc6-PRhcPSOoZTfjT&_nc_ohc=PCXJ4Z3i6uEAX8bv9SM&_nc_ht=scontent.fcrk1-4.fna&oh=00_AfCpK3ObDaoguj-Xjk8pQuRHRrrXtOnbnz-jrfzKCHDYxg&oe=6494D276" 
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