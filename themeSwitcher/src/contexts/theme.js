import { createContext, useContext } from "react";

// This file creates a context for the theme of the application.
// we are giving the context a default value of "light".
// This means that if no value is provided to the context, it will default to "light".
export const ThemeContext = createContext({
    themeMode: "light",
    lightTheme: () => { },
    darkTheme: () => { }
});


// This is a named export of the ThemeContext.Provider component.
// This component is used to wrap parts of your application where you want to provide the theme context.
// It allows you to pass down the current theme and functions to change it to all components within its tree.
export const ThemeProvider = ThemeContext.Provider;

// This function is a custom hook that allows you to use the ThemeContext in your components.
// It uses the useContext hook from React to access the context value.
// By calling this function in a component, you can get the current theme and the functions to change it.
// This is a common pattern in React to make it easier to use context.
export default function useTheme() {
    return useContext(ThemeContext);
}