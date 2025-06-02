import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./context/MovieContext";
function App() {
  return (
    <MovieProvider>
      <Navbar />
      <Outlet />
    </MovieProvider>
  );
}

export default App;
