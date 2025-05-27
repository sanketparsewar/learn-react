import React, { act } from "react";
import { Button, Container } from "../index";
import { Logo } from "../index";
import { LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 px-3">
      <Container>
        <div className="flex justify-between items-center py-2">
          <Link to="/">
            <Logo width="100%" />
          </Link>
          <nav className="flex gap-6">
            <ul className="flex items-center gap-6">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li
                      key={item.name}
                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                    >
                      <button
                        onClick={() => navigate(item.slug)}
                        className="px-4 py-2 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}

export default Header;
