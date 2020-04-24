import React, { useState } from 'react';
import { Paper, Button } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

// const inputStyle = {
//   WebkitBoxShadow: '0 0 0 0',
//   border: '0',
// };

const useStyles = makeStyles((theme) => ({
  clearButton: {
    margin: theme.spacing(1),
    background: 'red',
  },
  addButton: {
    margin: theme.spacing(1),
    background: 'green',
  },
  gridContainerStyle: {
    width: '100%',
    border: 1,
  },
  textFieldStyle: {
    width: '50%',
    border: 1,
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  paperLeft: {
    flex: 1,
    margin: 10,
    textAlign: 'center',
    padding: 10,
  },
  paperRight: {
    flex: 4,
    margin: 10,
    textAlign: 'center',
  },
}));

const AddTodoForm = (props) => {
  const classes = useStyles();

  const [todoText, setTodoText] = useState('');

  const handleSubmit = (e) => {
    if (todoText === '') {
      window.alert('Please enter a todo item.');
    } else {
      props.addTodo(todoText);
    }
  };

  return (
    <Paper style={{ margin: 16, padding: 16, width: 800 }}>
      <form onSubmit={(e) => handleSubmit()}>
        <ListItem divider={props.divider}>
          <input
            placeholder='...add todo'
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            maxLength='100'
            style={{ width: 600 }}
          />

          <Button
            color='secondary'
            className={classes.addButton}
            variant='contained'
            startIcon={<AddIcon />}
            type='submit'
            onSubmit={(e) => handleSubmit()}
          >
            Add Todo
          </Button>
        </ListItem>
      </form>
    </Paper>
  );
};

export default AddTodoForm;
