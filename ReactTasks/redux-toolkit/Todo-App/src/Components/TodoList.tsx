import { Box } from "@mui/material";
import TodoItem from "./TodoItem";

type TodoType = {
  id: number;
  task: string;
  completed: boolean;
};

type TodoListProps = {
  todos: TodoType[];
  deleteTodo: (id: number) => void;
  completeTodo: (id: number) => void;
  editTodo: (id: number) => void;
};

function TodoList({
  todos,
  deleteTodo,
  completeTodo,
  editTodo
}: TodoListProps) {
  return (
    <Box>
      {todos.map((todo) => (
       <TodoItem
       key={todo.id}
      id={todo.id}
      task={todo.task}
      completed={todo.completed}
      index={todo.id}
      deleteTodo={deleteTodo}
     completeTodo={completeTodo}
     editTodo={editTodo}
/>
      ))}
    </Box>
  );
}

export default TodoList;