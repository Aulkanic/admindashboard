import './login.scss';
import { useState } from 'react';
import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleSubmit = async(e) => {
      e.preventDefault();

      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok){

      } else {

      }
     
    };

  return (

    <>
    <h3> Sign in </h3>
    <form onSubmit={handleSubmit}>
      

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

      <button type="submit" className="btn btn-primary btn-block">
        Submit
      </button>

    </form>
    </>
  )
}

export default Login