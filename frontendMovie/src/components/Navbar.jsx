import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">Logo</div>
      <div>
        <Link to="/" className="mx-2 text-white hover:underline">
          Home
        </Link>
        <Link to="/favorite" className="mx-2 text-white hover:underline">
          Favorite
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
