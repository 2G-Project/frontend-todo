import React from 'react';
import Login from '../components/Login.js';
import Register from '../components/Register.js';

const LoginRegister = (props) => {
  return (
    <div class='login'>
      <Login {...props} />
      <Register {...props} />
    </div>
  );
};

export default LoginRegister;
