import './login.scss';
import {login} from '../../api/request'
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formData,setformData] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleSubmit = async(e) => {
      e.preventDefault();
      await login.ADMIN_LOGIN(formData).then((res) =>{
      console.log(res.data)
      if(res.data.message === 'Success'){
        navigate('/');
        alert(res.data.message)
      }
     else{
      alert(res.data.message);
      navigate('/login');
     }
     })
    };
console.log(formData)
  return (

    <>
    <h3> Sign in </h3>
    <form>
      <div className="form-group">
        <label> Email address </label>
        <input 
        type='text' 
        name="email"
        className='form-control'
        placeholder=''
        value={formData.email}     
        onChange={(e) => setformData({ ...formData, email: e.target.value})} 
        />
      </div>

      <div className="form-group">
        <label> Password </label>
        <input 
        type="password"
        name='password'
        className='form-control'
        placeholder=''
        value={formData.password}
        onChange={(e) =>
          setformData({ ...formData, password: e.target.value})
        }
        />
      </div>
      <button className="btn btn-primary btn-block" onClick={handleSubmit}>
        Submit
      </button>

    </form>
    </>
  )
}

export default Login