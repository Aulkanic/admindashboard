import { useState } from 'react';
import './login.scss';
import { UserLogin } from '../../api/request';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  try {
    const response = await UserLogin.ALL_USERS();
    console.log(response.data);

    setUsername('');
    setPassword('');
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="back">
      <form onSubmit={handleSubmit}>

      <div className="container">
        <span>Username</span>
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

      <button type="submit"> Log in </button>
    </form>
    </div>
  
  )
  }

export default Login