// Importing configureStore from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Importing the auth slice reducer
import authReducer from './authSlice';

// Creating the Redux store and adding the auth reducer to it
const store = configureStore({
    reducer: {
        // 'auth' is the key in the global state tree that holds authSlice state
        auth: authReducer
    }
});

// Exporting the store so it can be used in your application (e.g., with <Provider>)
export default store;