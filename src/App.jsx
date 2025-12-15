import { Routes, Route, Navigate } from "react-router-dom";
import Intro from "./components/intro";
import LoginSignup from "./components/login-signup";
import TodoApp from "./components/TodoApp";

export default function App() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/auth" element={<LoginSignup />} />

      <Route
        path="/todo"
        element={isLoggedIn ? <TodoApp /> : <Navigate to="/auth" />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
