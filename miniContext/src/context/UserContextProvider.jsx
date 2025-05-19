import React from "react";
import UserContext from "./UserContext";

// This code defines a React Context Provider component for managing and sharing user data across a React application.
// It takes children as a prop — these are the components that will be wrapped by this provider.
// The provider will pass down the user object to all components that are wrapped by it.

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  return (
    // This setup allows you to manage and access shared user state from anywhere inside your app.
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
