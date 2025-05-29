import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * Protected component to guard routes based on user authentication status
 * 
 * @param {React.ReactNode} children - The child components to render
 * @param {boolean} authentication - If true, only authenticated users can access
 */
export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();                      // React Router hook to navigate
  const [loading, setLoading] = useState(true);        // Track loading state
  const authStatus = useSelector((state) => state.auth.status); // Get auth status from Redux

  useEffect(() => {
    // If authentication is required and user is NOT logged in, redirect to /login
    if (authentication && !authStatus) {
      navigate("/login");
    }
    // If authentication is NOT required but user is already logged in, redirect to home
    else if (!authentication && authStatus) {
      navigate("/");
    }
    // Loading complete
    setLoading(false);
  }, [authStatus, authentication, navigate]);

  // Optionally render a loader while processing (improves UX)
  if (loading) {
    return <h2 className="text-center">Loading...</h2>;
  }

  // If conditions are met, render the protected content
  return <div>{children}</div>;
}
