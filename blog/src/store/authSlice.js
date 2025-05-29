// Importing createSlice from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Initial state for authentication
const initialState = {
    status: false,    // Indicates whether the user is logged in (true) or not (false)
    userData: null    // Holds the logged-in user's data
}

// Creating the auth slice
const authSlice = createSlice({
    name: 'auth',         // Name of the slice (used as a prefix for action types)
    initialState,         // Initial state defined above
    reducers: {
        // Action: login
        // Sets status to true and saves user data from the payload
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;  // Payload should contain user data (e.g., name, email, token)
        },

        // Action: logout
        // Resets the state to initial values (logged out)
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

// Exporting the auto-generated action creators
export const { login, logout } = authSlice.actions;

// Exporting the reducer to be used in the Redux store
export default authSlice.reducer;
