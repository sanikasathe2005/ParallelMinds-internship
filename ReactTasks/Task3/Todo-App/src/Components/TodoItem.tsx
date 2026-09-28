import { Box, Typography, Button } from "@mui/material";

type TodoItemProps = {
  task: string;
  completed: boolean;
  index: number;
  deleteTodo: Function;
  completeTodo: Function;
  editTodo: Function
};

function TodoItem({
  task,
  completed,
  index,
  deleteTodo,
  completeTodo,
  editTodo
}: TodoItemProps) {
  return (
    <Box className={completed ? "todo-item completed" : "todo-item"}>

      <Typography className="todo-text">
        {task}
      </Typography>

      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={() => completeTodo(index)}
      >
        {completed ? "Completed" : "Complete"}
      </Button>

      <Button
        variant="contained"
        color="warning"
        size="small"
        onClick={() => editTodo(index)}
      >
        Edit
      </Button>

      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={() => deleteTodo(index)}
      >
        Delete
      </Button>

    </Box>
  );
}

export default TodoItem;