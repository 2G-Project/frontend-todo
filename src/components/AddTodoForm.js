import React, { useState } from 'react';
import { TextField, Paper, Button, Grid } from "@material-ui/core";
import {List, ListItem, Checkbox, IconButton, ListItemText, ListItemSecondaryAction} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import DoneIcon from '@material-ui/icons/Done';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';

const inputStyle = { 
  WebkitBoxShadow: "0 0 0 0",
  border: "0"
 };

 const useStyles = makeStyles((theme) => ({
  clearButton: {
    margin: theme.spacing(1),
    background: "red"
  },
  addButton: {
    margin: theme.spacing(1),
    background: "green"
  },
  gridContainerStyle: {
    width: "100%",
    border: 1
  },
  textFieldStyle: {
    width: "50%",
    border: 1
  },
  div:{
    display: 'flex',
    flexDirection: 'row',    
    width: '100%'
  },
  paperLeft:{
    flex: 1,    
    margin: 10,
    textAlign: 'center',
    padding: 10
  },
  paperRight:{    
    flex: 4,
    margin: 10,
    textAlign: 'center',
  }
}));

const AddTodoForm = (props) => {
  const classes = useStyles();

  const [todoText, setTodoText] = useState('');

  const handleSubmit = (e) => {    
    if(todoText === ""){
      window.alert("Please enter a todo item.")
    } else {
      props.addTodo(todoText);
    }
  };

  return (
    <Paper style={{ margin: 16, padding: 16, width: 800 }}>
      <form onSubmit={(e) => handleSubmit()}>
      <ListItem divider={props.divider}>             
            <input
              placeholder="...add todo"                                                       
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              maxlength="100"           
              style={{ width: 600 }} />            
                  
            <Button 
              fullwidth 
              color="secondary"
              className={classes.addButton}
              variant="contained"
              startIcon={<AddIcon />}
              type = "submit"
              onSubmit={(e) => handleSubmit()}>Add Todo
            </Button>
            
          </ListItem>
      </form>
    </Paper>
  );
};

export default AddTodoForm;
