import { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";

type TodoType = {
  text: string;
  completed: boolean;
};

type TodoFormProps = {
  addTodo: Function;
  updateTodo: Function;
  editIndex: number;
  todos:TodoType[];
};

function TodoForm({
  addTodo,
  updateTodo,
  editIndex,
   todos
}: TodoFormProps) {

  const [task, setTask] = useState("");
  useEffect(() => {
  if (editIndex !== -1) {
    setTask(todos[editIndex].text);
  }
}, [editIndex]);

  let buttonText = "Add Todo";

  if (editIndex !== -1) {
    buttonText = "Update Todo";
  }

  function handleSubmit() {
    if (task === "") {
      return;
    }

    if (editIndex === -1) {
      addTodo(task);
    } else {
      updateTodo(task);
    }

    setTask("");
  }

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <TextField
        label="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
         sx={{ flex: 1 }}
      />

      <Button
        variant="contained"
        color="warning"
        onClick={handleSubmit}
        sx={{ width: "100px" }}
    
      >
        {buttonText}
      </Button>
    </Box>
  );
}

export default TodoForm;