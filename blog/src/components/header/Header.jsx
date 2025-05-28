import React from "react";
import { Container } from "../index";
import { Logo } from "../index";
import { LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "My Posts", slug: "/my-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 px-3">
      <Container>
        <div className="flex justify-between items-center py-2">
          <Link to="/" className="flex-shrink-0">
            <Logo width="100%" />
          </Link>
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <nav
            className={`fixed top-0 left-0 h-full w-50 bg-white shadow-lg transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 md:static md:translate-x-0 md:w-auto md:shadow-none`}
          >
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-blue-600 focus:outline-none md:hidden"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-4 md:p-0">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li
                      key={item.name}
                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                    >
                      <NavLink
                        to={item.slug}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          `cursor-pointer px-2 py-2 hover:bg-blue-100 focus:outline-none   ${
                            isActive
                              ? "text-blue-500 border-b-2"
                              : "text-gray-800"
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
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
