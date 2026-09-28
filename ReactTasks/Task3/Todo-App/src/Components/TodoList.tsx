import { Box } from "@mui/material";
import TodoItem from "./TodoItem";

type TodoType = {
  text: string;
  completed: boolean;
};

type TodoListProps = {
  todos: TodoType[];
  deleteTodo: Function;
  completeTodo: Function;
  editTodo: Function;
};

function TodoList({
  todos,
  deleteTodo,
  completeTodo,
  editTodo
}: TodoListProps) {
  return (
    <Box>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          task={todo.text}
          completed={todo.completed}
          index={index}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
          editTodo={editTodo}
        />
      ))}
    </Box>
  );
}

export default TodoList;