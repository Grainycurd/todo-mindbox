import React from "react";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  toggleTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, toggleTodo }) => {
  return (
    <li style={{ marginBottom: 8 }}>
      <label style={{ cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleTodo(id)}
          style={{ marginRight: 8 }}
        />
        <span style={{ textDecoration: completed ? "line-through" : "none" }}>
          {text}
        </span>
      </label>
    </li>
  );
};

export default TodoItem;