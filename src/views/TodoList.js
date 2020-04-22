import React, { useState, useEffect } from 'react';
import Todo from '../components/Todo';
import axios from 'axios';

const TodoList = (props) => {
  const [todos, setTodos] = useState([
    { text: 'test', is_complete: 0 },
    { text: 'test2', is_complete: 1 },
  ]);

  useEffect(() => {
    const testURL = 'http://localhost:5000/api/';
    const token = localStorage.getItem('token');

    axios({
      url: `${testURL}todos`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        setTodos(res.data.todos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const completeTodo = (todoId) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, is_complete: 1 };
        } else {
          return { ...todo };
        }
      })
    );

    console.log(todos);
  };

  const clearCompletedTodos = () => {
    const testURL = 'http://localhost:5000/api/';
    const token = localStorage.getItem('token');

    axios({
      url: `${testURL}todos/update`,
      method: 'POST',
      data: todos,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        setTodos(res.data.todos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='todo-list'>
      <h1>What do I need to do?</h1>
      <h5>To Do Items</h5>
      <p>Check off completed items</p>

      <div className='todos'>
        {todos.map((todo) => {
          return <Todo key={todo.id} todo={todo} completeTodo={completeTodo} />;
        })}
      </div>
      <button onClick={clearCompletedTodos}>Clear Completed Todos</button>
    </div>
  );
};

export default TodoList;
