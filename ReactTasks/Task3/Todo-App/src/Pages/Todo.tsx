import { useState } from "react";
import { Typography, Container, Box } from "@mui/material";
import TodoForm from "../Components/TodoForm";
import TodoList from "../Components/TodoList";

type TodoType = {
  text: string;
  completed: boolean;
};

function Todo() {
  const storedTodos = localStorage.getItem("todos");

  let todosData: TodoType[] = [];

  if (storedTodos) {
    todosData = JSON.parse(storedTodos);
  }

  const [todos, setTodos] = useState(todosData);
  const [editIndex, setEditIndex] = useState(-1);

  function addTodo(task: string) {
    const todo = {
      text: task,
      completed: false
    };

    const newTodos = [...todos, todo];

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  function deleteTodo(index: number) {
    const newTodos = [...todos];

    newTodos.splice(index, 1);

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  function completeTodo(index: number) {
    const newTodos = [...todos];

    newTodos[index].completed = true;

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  function editTodo(index: number) {
    setEditIndex(index);
  }

  function updateTodo(task: string) {
    const newTodos = [...todos];

    newTodos[editIndex].text = task;

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));

    setEditIndex(-1);
  }

  return (
    <Container maxWidth="sm">
      <Box className="todo-container">

        <Typography variant="h4" align="center">
          My Todo List
        </Typography>

        <Box className="todo-form-container">
          <TodoForm
            addTodo={addTodo}
            updateTodo={updateTodo}
            editIndex={editIndex}
            todos={todos}
           
          />
        </Box>

        <Box className="todo-list-container">
          <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
            editTodo={editTodo}
          />
        </Box>

      </Box>
    </Container>
  );
}

export default Todo;