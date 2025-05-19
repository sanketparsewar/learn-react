import { useState } from "react";
import "./App.css";
import { UserContextProvider } from "./context/UserContextProvider";
import Login from "./components/Login";
import Profile from "./components/Profile";

// basic use of the Context API using a UserContextProvider to wrap your application.
// This allows you to manage and share user data across your application without prop drilling.
// The UserContextProvider component is imported from the context folder and is used to wrap the main application component.
// This means any components inside this provider will have access to the UserContext (via useContext(UserContext)).
function App() {
  return (
    <UserContextProvider>
      <h1>Context Api</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  );
}

export default App;
