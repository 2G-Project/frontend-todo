import React, { useState, useEffect } from 'react';
import Todo from '../components/Todo';
import AddTodoForm from '../components/AddTodoForm';
import { Box, Paper, Typography, Button } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 1),
  },
  clearButton: {
    margin: theme.spacing(1),
    background: 'red',
  },
  title: {
    display: 'none',

    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const TodoList = (props) => {
  const classes = useStyles();

  const [todos, setTodos] = useState([]);

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
  };

  const clearCompletedTodos = () => {
    const testURL = 'http://localhost:5000/api/';
    const token = localStorage.getItem('token');
    const todosData = { todos };

    axios({
      url: `${testURL}todos/update`,
      method: 'POST',
      data: todosData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        setTodos(
          todos.filter((todo) => {
            if (todo.is_complete === 1) {
              return false;
            } else {
              return true;
            }
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTodo = (id) => {
    const testURL = 'http://localhost:5000/api/';
    const token = localStorage.getItem('token');

    axios({
      url: `${testURL}todos/${id}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        setTodos(
          todos.filter((todo) => {
            if (todo.id === id) {
              return false;
            } else {
              return true;
            }
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addTodo = (todoText) => {
    const token = localStorage.getItem('token');
    const testURL = 'http://localhost:5000/api/';
    let newTodo = { text: todoText };

    axios({
      url: `${testURL}todos`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      data: newTodo,
    })
      .then((res) => {
        setTodos(res.data.todos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='todo-list-div'>
      <Box display='flex' flexWrap='nowrap' justifyContent='center'>
        <AddTodoForm addTodo={addTodo} />
      </Box>
      <Box display='flex' flexWrap='nowrap' p={1} m={1} justifyContent='center'>
        <Paper
          className={classes.root}
          elevation={8}
          style={{ padding: 0, width: 800, height: 400, overflow: 'auto' }}
        >
          <div className='todo-list'>
            {todos.length > 0 ? (
              <div className='todos'>
                {todos.map((todo) => {
                  return (
                    <Todo
                      key={todo.id}
                      todo={todo}
                      completeTodo={completeTodo}
                      deleteTodo={deleteTodo}
                    />
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '25%',
                }}
              >
                <Typography className={classes.title} variant='h5' noWrap>
                  Your Todos will appear here...
                </Typography>
              </div>
            )}
          </div>
        </Paper>
      </Box>

      <Button
        variant='contained'
        color='secondary'
        className={classes.clearButton}
        startIcon={<DoneIcon />}
        style={{ justifyContent: 'center' }}
        onClick={() => clearCompletedTodos()}
      >
        Clear Completed
      </Button>
    </div>
  );
};

export default TodoList;
