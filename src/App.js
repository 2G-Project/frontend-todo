import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginRegister from './views/LoginRegister.js';
import TodoList from './views/TodoList.js';
import AppBar from './components/AppBar.js';
import './styles/App.scss';

function App() {
  return (
    <div className='app'>
      <AppBar />
      <Route path='/login' component={LoginRegister} />
      <PrivateRoute exact path='/' component={TodoList} />
    </div>
  );
}
export default App;
