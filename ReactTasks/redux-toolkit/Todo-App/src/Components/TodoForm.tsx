
import { useEffect, useState, useId, useRef, useImperativeHandle } from "react";
import { Box, TextField, Button } from "@mui/material";
import type { Ref } from "react";

type TodoType = {
  id:number;
  task: string;
  completed: boolean;
};

export interface ITodoFormHandle {
  focusInput: () => void;
}

type TodoFormProps = {
  addTodo: (task: string) => void;
  updateTodo: (task: string) => void;
  editIndex: number;
  todos: TodoType[];
  ref: Ref<ITodoFormHandle>;
};

function TodoForm({ addTodo, updateTodo, editIndex, todos, ref, }: TodoFormProps) {
  const [task, setTask] = useState("");
  const taskId = useId();
  //useref
  const inputRef = useRef<HTMLInputElement>(null);

  // useImperativeHandle
  useImperativeHandle(ref, () => ({
    focusInput() {
      inputRef.current?.focus();
    }
  }));


  useEffect(() => {
  if (editIndex !== -1) {
    const todo = todos.find((item) => item.id === editIndex);

    if (todo) {
      setTask(todo.task);
    }
  }
}, [editIndex, todos]);

  let buttonText = "Add Todo";

  if (editIndex !== -1) {
    buttonText = "Update Todo";
  }

  function handleSubmit() {
    if (task === "") return;

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
        id={taskId}
        inputRef={inputRef}
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
