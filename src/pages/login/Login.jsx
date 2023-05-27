import "./login.scss";

import {login} from '../../api/request'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [formData,setformData] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
      e.preventDefault();
      await login.ADMIN_LOGIN(formData).then((res) =>{
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
    console.log(formData)

  return (
    <div className="login">
      <div className="container">
    <h3> Sign in </h3>
    <form>
      <div className="form-group">
        <label> Email </label> <br/>
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
        <label> Password </label> <br/>
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
    </div>
    </div>
  )
}

export default Login