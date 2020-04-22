import React from 'react';

const Todo = (props) => {
  const todo = props.todo;

  const setComplete = (e) => {
    props.completeTodo(todo.id);
  };

  return (
    <div className='todo'>
      <p>{todo.text}</p>
      <button onClick={() => setComplete()}>Complete</button>
    </div>
  );
};

export default Todo;
