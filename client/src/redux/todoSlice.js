import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk(
    "todos/getTodosAsync",
    async () => {
        const res = await axios.get("http://localhost:7000/todos");
        const todos = res.data;
        return { todos };
    }
);

export const addTodoAsync = createAsyncThunk(
    "todos/addTodoAsync",
    async (payload) => {
        const res = await axios.post("http://localhost:7000/todos", payload);
        const todo = res.data;
        return { todo };
    }
);

export const toggleCompletedAsync = createAsyncThunk(
    "todos/toggleCompletedAsync",
    async (payload) => {
        const data = { completed: payload.completed };
        const res = await axios.patch(`http://localhost:7000/todos/${payload.id}`, data);
        const todo = res.data;
        return { todo };
    }
);

export const deleteTodoAsync = createAsyncThunk(
    "todos/deleteTodoSync",
    async (payload) => {
        const res = await axios.delete(`http://localhost:7000/todos/${payload.id}`);

        const todos = res.data;
        return { todos };
    }
)

export const todoSlice = createSlice({
    name: "todos",
    initialState: [
        { id: 1, title: 'todo1', completed: false },
        { id: 2, title: 'todo2', completed: false },
        { id: 3, title: 'todo3', completed: true },
        { id: 4, title: 'todo4', completed: false },
        { id: 5, title: 'todo5', completed: false }
    ],
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false
            };
            state.push(newTodo);
            return state;
        },
        toggleCompleted: (state, action) => {
            const index = state.findIndex((element) => {
                return element.id === action.payload.id;
            });

            state[index].completed = action.payload.completed;
            return state;
        },
        deleteTodo: (state, action) => {
            return state.filter((element) => {
                return element.id !== action.payload.id;
            });
        }
    },
    extraReducers: {
        [getTodosAsync.fulfilled]: (state, action) => {
            return action.payload.todos;
        },
        [getTodosAsync.pending]: (state, action) => {
            console.log("Please wait ... your data is being fetched!");
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.push(action.payload.todo);
            return state;
        },
        [toggleCompletedAsync.fulfilled]: (state, action) => {
            const index = state.findIndex((element) => { return element.id === action.payload.todo.id; });
            state[index].completed = action.payload.todo.completed;
            return state;

        },
        [deleteTodoAsync.fulfilled]: (state, action) => {
            return action.payload.todos;
        }
    }
});

export const { addTodo, toggleCompleted, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;