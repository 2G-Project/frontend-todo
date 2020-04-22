import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password1: '',
    password2: ''
  };

  inputChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitValues = ({ username, email, password1, password2 }) => {
    console.log({ username, email, password1, password2 });
    this.setState({
      username: username,
      email: email,
      password1: password1,
      password2: password2
    });
    const herokurl = 'https://team5-mud.herokuapp.com';
    console.log('this state', this.state);

    axios({
      url: `${herokurl}/api/registration/`,
      method: 'POST',
      data: {
        username: `${this.state.username}`,
        password1: `${this.state.password1}`,
        password2: `${this.state.password2}`,
        email: `${this.state.email}`
      }
    })
      .then(res => {
        console.log('response', res);
        const token = res.data['key'];
        localStorage.setItem('token', `Token ${token}`);
        this.props.history.push('/');
      })
      .catch(err => {
        console.log('Axios error:', err.response);
        console.log('this state', this.state);
        if (err.response.data.password1 && !err.response.data.email) {
          this.setState({ errorMsg: [...err.response.data.password1] });
        } else if (err.response.data.email && !err.response.data.password1) {
          this.setState({ errorMsg: [...err.response.data.email] });
        } else {
          this.setState({
            errorMsg: [
              ...err.response.data.password1,
              ...err.response.data.email
            ]
          });
        }

        console.log(this.state);
      });
  };

  submitHandler = ev => {
    ev.preventDefault();
    this.submitValues(this.state);
  };

  render() {
    return (
      <div class='register-div'>
        <form onSubmit={e => this.submitHandler(e)}>
          <h1>Register</h1>
          <input
            placeholder='Username'
            type='text'
            name='username'
            value={this.state.username}
            onChange={this.inputChangeHandler}
          ></input>
          <input
            placeholder='Email'
            type='email'
            name='email'
            value={this.state.email}
            onChange={this.inputChangeHandler}
          ></input>
          <input
            placeholder='Password'
            type='password'
            name='password1'
            value={this.state.password1}
            onChange={this.inputChangeHandler}
          ></input>
          <input
            placeholder='Confirm password'
            type='password'
            name='password2'
            value={this.state.password2}
            onChange={this.inputChangeHandler}
          ></input>
          {this.state.errorMsg
            ? this.state.errorMsg.map(item => {
                return <p style={{ color: 'red', fontSize: '12px' }}>{item}</p>;
              })
            : null}
          <p>
            <input
              type='submit'
              value='Register'
              onSubmit={e => this.submitHandler(e)}
            ></input>
          </p>
        </form>
      </div>
    );
  }
}

export default Register;
