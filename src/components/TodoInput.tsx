import React from "react";

interface TodoInputProps {
  newTodo: string;
  setNewTodo: (value: string) => void;
  addTodo: () => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ newTodo, setNewTodo, addTodo }) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Введите новую задачу"
        style={{ width: "70%", padding: "8px" }}
      />
      <button onClick={addTodo} style={{ padding: "8px 12px", marginLeft: 8 }}>
        Добавить
      </button>
    </div>
  );
};

export default TodoInput;