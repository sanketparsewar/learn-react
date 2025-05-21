import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'


// Configure the Redux store with the todoReducer
export const store = configureStore({
  reducer: todoReducer,
})