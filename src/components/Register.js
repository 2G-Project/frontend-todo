import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      username: username,
      password: password,
    };
    const testURL = 'http://localhost:5000/api/';

    axios({
      url: `${testURL}auth/register`,
      method: 'POST',
      data: credentials,
    })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        console.log(res);
        history.push('/');
      })
      .catch((err) => {
        const errResponse = err.response.data;
        console.log(errResponse);
        if (errResponse.username && errResponse.password) {
          setErrorMsg([errResponse.username, errResponse.password]);
        } else if (errResponse.username && !errResponse.password) {
          setErrorMsg([errResponse.username]);
        } else if (errResponse.password && !errResponse.username) {
          setErrorMsg([errResponse.password]);
        }
      });
  };

  return (
    <div className='register-div'>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
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
        {errorMsg
          ? errorMsg.map((item) => {
              return <p style={{ color: 'red', fontSize: '12px' }}>{item}</p>;
            })
          : null}
        <p>
          <input type='submit' value='Register' onSubmit={handleSubmit}></input>
        </p>
      </form>
    </div>
  );
};

export default Register;
