
import { useState, useRef } from "react";
import { Typography, Container, Box } from "@mui/material";
import TodoForm, { type ITodoFormHandle } from "../Components/TodoForm";
import TodoList from "../Components/TodoList";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  completeTodo,
  editTodo
} from "../Redux/TodoSlice";

type TodoType = {
  id: number;
  task: string;
  completed: boolean;
};

function Todo() {
  //useselector
const todos = useSelector(
  (state: { Todo: TodoType[] }) => state.Todo
);
  //usedispatch
  const dispatch = useDispatch();

  const [editIndex, setEditIndex] = useState(-1);

  const todoFormRef = useRef<ITodoFormHandle>(null);

  function handleaddTodo(task: string) {
    dispatch(addTodo(task));
  }

  function handledeleteTodo(id: number) {
    dispatch(deleteTodo(id));
  }

  function handleCompleteTodo(id: number) {
    dispatch(completeTodo(id));
  }

  function handleEditTodo(id: number) {
    setEditIndex(id);
    todoFormRef.current?.focusInput();
  }

  function updateTodo(task: string) {
    dispatch(editTodo({ id: editIndex, task }));
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
            ref={todoFormRef}
            addTodo={handleaddTodo}
            updateTodo={updateTodo}
            editIndex={editIndex}
            todos={todos}
          />
        </Box>


        <Box className="todo-list-container">
          <TodoList
            todos={todos}
            deleteTodo={handledeleteTodo}
            completeTodo={handleCompleteTodo}
            editTodo={handleEditTodo}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default Todo;
