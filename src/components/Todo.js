import React from 'react';
import {
  Paper,
  Grid,
  List,
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Todo = (props) => {
  const classes = useStyles();
  const todo = props.todo;
  const setComplete = (e) => {
    props.completeTodo(todo.id);
  };
  return (
    <Paper style={{ margin: 16, padding: 0 }}>
      <ListItem divider={props.divider}>
        <Checkbox
          onChange={() => setComplete()}
          checked={props.todo.completed}
          disableRipple
        />
        <ListItemText primary={todo.text} style={{ overflow: 'auto' }} />
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          startIcon={<DeleteOutlined />}
        >
          Delete
        </Button>
      </ListItem>
    </Paper>
  );
};

export default Todo;
