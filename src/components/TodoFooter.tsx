import React from "react";

interface TodoFooterProps {
  remainingCount: number;
  clearCompleted: () => void;
  hasCompleted: boolean;
  setFilter: (filter: "all" | "active" | "completed") => void;
  currentFilter: "all" | "active" | "completed";
}

const TodoFooter: React.FC<TodoFooterProps> = ({
  remainingCount,
  clearCompleted,
  hasCompleted,
  setFilter,
  currentFilter,
}) => {
  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => setFilter("all")}
          disabled={currentFilter === "all"}
          style={{ marginRight: 5 }}
        >
          Все
        </button>
        <button
          onClick={() => setFilter("active")}
          disabled={currentFilter === "active"}
          style={{ marginRight: 5 }}
        >
          Активные
        </button>
        <button
          onClick={() => setFilter("completed")}
          disabled={currentFilter === "completed"}
        >
          Выполненные
        </button>
      </div>

      <div>
        Оставшихся задач: {remainingCount}
        <button
          onClick={clearCompleted}
          style={{ marginLeft: 20 }}
          disabled={!hasCompleted}
        >
          Очистить выполненные
        </button>
      </div>
    </div>
  );
};

export default TodoFooter;