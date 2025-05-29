import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // React 18+ root API
import "./index.css"; // Global styles
import App from "./App.jsx"; // Main App component

import { Provider } from "react-redux"; // Provides Redux store to React app
import store from "./store/store.js"; // Redux store configuration

// React Router imports
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Pages and components
import { AuthLayout, Signup, Login } from "./components/index.js";
import Home from "./pages/Home.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import AddPost from "./pages/AddPost.jsx";
import MyPosts from "./pages/MyPosts.jsx";

// -------------------- ROUTER SETUP --------------------

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Route */}
      <Route path="/" element={<Home />} />

      {/* Unauthenticated Routes (Only for not-logged-in users) */}
      <Route
        path="/login"
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        }
      />

      {/* Authenticated Routes (Only for logged-in users) */}
      <Route
        path="/all-posts"
        element={
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        }
      />
      <Route
        path="/add-post"
        element={
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        }
      />
      <Route
        path="/my-posts"
        element={
          <AuthLayout authentication>
            <MyPosts />
          </AuthLayout>
        }
      />
      <Route
        path="/edit-post/:slug"
        element={
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        }
      />

      {/* Public Post Viewing Route */}
      <Route path="/post/:slug" element={<Post />} />
    </Route>
  )
);

// -------------------- REACT APP MOUNTING --------------------

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* Redux global state provider */}
      <RouterProvider router={router} /> {/* Router setup */}
    </Provider>
  </StrictMode>
);
