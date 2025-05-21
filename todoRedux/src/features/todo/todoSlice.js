import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{
        id: nanoid(),
        text: "Learn Redux Toolkit",
        completed:false
    }]
}


export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {  // reducers are functions that take the current state and an action as arguments and return a new state
        //state is the current state of the todos/data and action is the action that is dispatched
        //action is an object that has a type and a payload
        //action.payload is the data that is passed to the action
        //action.type is the type of the action that is dispatched
        addTodo: (state, action) => {  //we have access to the state and action
            state.todos.unshift({
                id: nanoid(),
                text: action.payload, //action.payload is the data that is passed to the action
                completed: false,
            })
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload) //filter the todos and return the todos that are not equal to the id of the todo that is passed to the action
        },
        updateTodo:(state,action)=>{
            const todo=state.todos.find((todo)=>todo.id===action.payload.id)
            if(todo){
                todo.text=action.payload.text
            }
        },
        toggleTodo:(state,action)=>{
            const todo=state.todos.find((todo)=>todo.id ===action.payload)
            if(todo){
                todo.completed=!todo.completed
            }
        }
    }
})

//export the actions so that we can use them in the components
export const { addTodo, removeTodo,updateTodo,toggleTodo } = todoSlice.actions;
//export the reducer so that we can use it in the store
export default todoSlice.reducer;