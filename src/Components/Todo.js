import React from 'react';

export default function Todo({ todo, toggleTodo }) {

    function handleTodoClick() {
        toggleTodo(todo.id);
    }

  return (
    <div>
        <label>
            <input type="checkbox" checkbox={todo.completed} onChange={handleTodoClick} />
            {todo.name}
        </label>
    </div>
  )
}