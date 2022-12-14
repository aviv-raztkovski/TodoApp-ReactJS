import React, { useState, useRef, useEffect } from 'react';
import { v4 } from 'uuid';
import TodoList from './Components/TodoList';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

let init = false;

function App() {

  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    if (!init) {
      init = true;
      const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (storedTodos)
        setTodos(storedTodos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === '') return;

    setTodos(prevTodos => {
      return [...prevTodos, {id: v4(), name: name, complete: false}];
    })

    todoNameRef.current.value = null;
  }

  function handleClearTodo(e) {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodo}>Clear Todo</button>
      <div>{todos.filter(todo => !todo.complete).length} Left Todos</div>
    </>
  );
}

export default App;
