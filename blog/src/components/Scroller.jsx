import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component
 * Automatically scrolls the page to the top when the route (pathname) changes.
 */
function ScrollToTop() {
  const location = useLocation(); // Get current location from React Router

  useEffect(() => {
    // When location.pathname changes (i.e., navigating to a new route),
    // scroll the window to the top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]); // Dependency on pathname only

  return null; // This component doesn’t render anything visible
}

export default ScrollToTop;
