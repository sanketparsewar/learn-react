import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-3">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} DailyDrift. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <Link className="text-gray-400 hover:text-white">Privacy Policy</Link>
          <Link className="text-gray-400 hover:text-white">
            Terms of Service
          </Link>
          <Link className="text-gray-400 hover:text-white">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
