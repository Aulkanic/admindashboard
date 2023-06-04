import "./login.scss";

import {login} from '../../api/request'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
      e.preventDefault();
      await login.ADMIN_LOGIN({email,password}).then((res) =>{
      console.log(res.data)
      if(res.data.message === 'Success'){
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
    <h3> Sign in </h3>
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
        Submit
      </button>

    </form>
    </div>
    </div>
  )
}

export default Login