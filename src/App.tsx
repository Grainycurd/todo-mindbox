import React, { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type Filter = "all" | "active" | "completed";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
    };
    setTodos((prev) => [...prev, todo]);
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const hasCompleted = todos.some((todo) => todo.completed);

  return (
    <div style={{ maxWidth: 400, margin: "20px auto", fontFamily: "Arial" }}>
      <h2>ToDo App</h2>

      <TodoInput newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />

      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} />

      <TodoFooter
        remainingCount={remainingCount}
        clearCompleted={clearCompleted}
        hasCompleted={hasCompleted}
        setFilter={setFilter}
        currentFilter={filter}
      />
    </div>
  );
}

export default App;