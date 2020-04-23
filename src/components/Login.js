import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      username: username,
      password: password,
    };
    const testURL = 'http://localhost:5000/api/';

    axios({
      url: `${testURL}auth/login`,
      method: 'POST',
      data: credentials,
    })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        console.log(res);
        history.push('/');
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className='login-div'>
      <form data-testid='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          placeholder='Username'
          type='text'
          name='username'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            console.log(username);
          }}
        ></input>
        <input
          placeholder='Password'
          type='password'
          name='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            console.log(password);
          }}
        ></input>
        <p>
          <input type='submit' value='Login' onClick={handleSubmit}></input>
        </p>
      </form>
    </div>
  );
};

export default Login;
