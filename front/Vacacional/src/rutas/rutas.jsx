import { Routes, Route } from "react-router-dom";
import Home from "../pages/home.jsx";
import Login from "../pages/login.jsx"

export function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
  );
}