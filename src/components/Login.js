import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  inputChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitValues = ({ username, email, password }) => {
    console.log({ username, email, password });
    this.setState({
      username: username,
      email: email,
      password: password,
    });
    const herokurl = '';
    console.log('this state', this.state);

    axios({
      url: `${herokurl}/api/login/`,
      method: 'POST',
      data: {
        username: `${this.state.username}`,
        password: `${this.state.password}`,
      },
    })
      .then((res) => {
        console.log('response', res);
        const token = res.data['key'];
        localStorage.setItem('token', `Token ${token}`);
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log('Axios error:', err);
      });
  };

  submitHandler = (ev) => {
    ev.preventDefault();
    this.submitValues(this.state);
  };

  render() {
    return (
      <div className='login-div'>
        <form data-testid='form' onSubmit={(e) => this.submitHandler(e)}>
          <h1>Login</h1>
          <input
            placeholder='Username'
            type='text'
            name='username'
            value={this.state.username}
            onChange={this.inputChangeHandler}
          ></input>
          <input
            placeholder='Password'
            type='password'
            name='password'
            value={this.state.password}
            onChange={this.inputChangeHandler}
          ></input>
          <p>
            <input
              type='submit'
              value='Login'
              onClick={(e) => this.submitHandler(e)}
            ></input>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
