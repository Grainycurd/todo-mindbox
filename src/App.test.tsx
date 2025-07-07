import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("ToDo App", () => {
  test("добавляет новую задачу", () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/Введите новую задачу/i);
    const addButton = screen.getByText(/Добавить/i);

    fireEvent.change(input, { target: { value: "Новая задача" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Новая задача")).toBeInTheDocument();
  });

  test("отмечает задачу выполненной", () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/Введите новую задачу/i);
    const addButton = screen.getByText(/Добавить/i);

    fireEvent.change(input, { target: { value: "Задача для выполнения" } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test("фильтрует задачи по статусу", () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/Введите новую задачу/i);
    const addButton = screen.getByText(/Добавить/i);

    // Добавляем две задачи
    fireEvent.change(input, { target: { value: "Активная задача" } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: "Выполненная задача" } });
    fireEvent.click(addButton);

    // Отметим вторую как выполненную
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);

    // Проверяем фильтр "Активные"
    fireEvent.click(screen.getByText("Активные"));
    expect(screen.getByText("Активная задача")).toBeInTheDocument();
    expect(screen.queryByText("Выполненная задача")).toBeNull();

    // Проверяем фильтр "Выполненные"
    fireEvent.click(screen.getByText("Выполненные"));
    expect(screen.queryByText("Активная задача")).toBeNull();
    expect(screen.getByText("Выполненная задача")).toBeInTheDocument();

    // Проверяем фильтр "Все"
    fireEvent.click(screen.getByText("Все"));
    expect(screen.getByText("Активная задача")).toBeInTheDocument();
    expect(screen.getByText("Выполненная задача")).toBeInTheDocument();
  });

  test("очищает выполненные задачи", () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/Введите новую задачу/i);
    const addButton = screen.getByText(/Добавить/i);

    fireEvent.change(input, { target: { value: "Задача 1" } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: "Задача 2" } });
    fireEvent.click(addButton);

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]); // Отметим первую задачу выполненной

    const clearButton = screen.getByText(/Очистить выполненные/i);
    fireEvent.click(clearButton);

    expect(screen.queryByText("Задача 1")).toBeNull();
    expect(screen.getByText("Задача 2")).toBeInTheDocument();
  });
});