import React, { useState } from 'react';

const AddTodoForm = (props) => {
  const [todoText, setTodoText] = useState('');

  const handleSubmit = (e) => {
    props.addTodo(todoText);
  };

  return (
    <form onSubmit={(e) => handleSubmit()}>
      <label>
        Todo:
        <input
          type='text'
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
      </label>
      <button onClick={(e) => handleSubmit()}>Add Todo</button>
    </form>
  );
};

export default AddTodoForm;
