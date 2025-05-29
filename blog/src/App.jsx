import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth"; // Appwrite authentication service
import { login, logout } from "./store/authSlice"; // Redux actions for login/logout
import "./App.css"; // Global styles
import { Footer, Header } from "./components"; // Shared layout components
import { Outlet, useLocation } from "react-router-dom"; // Routing components
import ScrollToTop from "./components/Scroller"; // Scroll restoration component

function App() {
  const [loading, setLoading] = useState(true); // Local state to manage loading spinner
  const dispatch = useDispatch(); // Redux dispatch function

  useEffect(() => {
    // On app load, check if the user is already logged in
    authService
      .getCurrentuser()
      .then((userData) => {
        if (userData) {
          // If user data exists, user is logged in
          dispatch(login(userData));
        } else {
          // If null, user is not logged in
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => setLoading(false)); // Done checking auth
  }, []);

  // Show loading message while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Once loading is done, render app layout
  return (
    <div>
      <ScrollToTop /> {/* Makes page scroll to top on route change */}
      <Header /> {/* Common header */}
      <Outlet /> {/* Renders the route's child component */}
      <Footer /> {/* Common footer */}
    </div>
  );
}

export default App;
