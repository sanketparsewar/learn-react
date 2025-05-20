import { createContext, useContext } from "react";

// st1ep 1: create context
export const TodoContext = createContext({
    todos:[
        {
            id:1,
            todo:"Learn React",
            completed:false,
            date:"20 may, 12:00 am"
        }
    ],
    addTodo:(todo)=>{},
    updateTodo:(id,todo)=>{},
    deleteTodo:(id)=>{},
    toggleTodo:(id)=>{},
});

// creating custom hook
export const useTodo = () => {
    return useContext(TodoContext);
}

// st2ep 2: create provider
export const TodoProvider = TodoContext.Provider;


