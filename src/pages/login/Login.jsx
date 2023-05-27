import './login.scss';
import { useState } from 'react';
import './login.scss';
import { UserLogin } from '../../api/request';

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
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="container">
      <span> Password </span>
        <input 
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Submit
      </button>

    </form>
    </div>
  
  )
  }

export default Login