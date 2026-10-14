
import { createSlice } from "@reduxjs/toolkit";

interface ITodoState {
  id: number;
  task: string;
  completed: boolean;
}

const initialState: ITodoState[] = [];

const TodoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    //addTodo
    addTodo: (state, action) => {
      state.push({
        id: state.length + 1,
        task: action.payload,
        completed: false
      });
    },

    //delete todo
    deleteTodo: (state, action) => {
      const index = state.findIndex(
        (todo) => todo.id === action.payload
      );

      if (index !== -1) {
        state.splice(index, 1);
      }
    },

    //complete todo
    completeTodo: (state, action) => {
      const todo = state.find(
        (todo) => todo.id === action.payload
      );

      if (todo) {
        todo.completed = true;
      }
    },

    //edit todo
    editTodo: (state, action) => {
      const todo = state.find(
        (todo) => todo.id === action.payload.id
      );

      if (todo) {
        todo.task = action.payload.task;
      }
    }
  }
});

export const { addTodo, deleteTodo, completeTodo, editTodo } =
  TodoSlice.actions;

export default TodoSlice.reducer;
