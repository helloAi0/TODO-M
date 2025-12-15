import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // ✅ INSIDE component

  const isLoggedIn = localStorage.getItem("loggedIn") === "true";


  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/auth");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-orange-500 shadow-md h-10">
      <div className="flex items-center justify-between h-full px-6">
        <span
          onClick={() => navigate("/")}
          className="font-bold text-lg cursor-pointer hover:text-green-600"
        >
          TODO-M
        </span>

        <ul className="flex gap-5 items-center">
          <li
            onClick={() => navigate("/")}
            className="text-sm cursor-pointer hover:font-bold transition-all"
          >
            Home
          </li>

          <li
            onClick={() => navigate("/todo")}
            className="text-sm cursor-pointer hover:font-bold transition-all"
          >
            Your Mr.Tasks
          </li>

          {isLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-600 text-white px-3 py-1 rounded-md"
              >
                Logout
              </button>
            </li>
          )}

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
