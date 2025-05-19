import React from "react";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";


// Layout component that wraps the header, footer, and the main content area
// using React Router's Outlet to render the child routes
// This component is used to create a consistent layout across different pages
// It imports the Header and Footer components and uses them to create a layout
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
