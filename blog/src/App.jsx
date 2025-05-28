import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import "./App.css";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentuser()
      .then((userData) => {
        // either the user is logged in or not
        // if the user is logged in, we will get the user data
        // if the user is not logged in, we will get null
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        // handle error
        console.error("Error fetching user data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  return loading ? (<div>Loading...</div>) : (<div>
    <div>
      <Header/>
      <Outlet />
      <Footer/>
    </div>
  </div>);
}

export default App;




