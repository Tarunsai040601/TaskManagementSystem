import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaBars, FaTimes } from "react-icons/fa";
import "./EmployeeNavBar.css";

const EmployeeNavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("employeeToken");

  let employeeName = "Employee";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      employeeName = decoded.name;
    } catch (err) {}
  }

  const handleLogout = () => {
    localStorage.removeItem("employeeToken");
    navigate("/");
  };

  return (
    <nav className="emp-navbar">

      <div className="emp-logo">
        <h2>Employee Dashboard</h2>
      </div>

      <div className="emp-menu-icon" onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
      </div>

      {/* ✅ CENTER LINKS — navbar middle లో */}
      <div className="emp-center-links">
        <Link to="" onClick={() => setOpen(false)}>Home</Link>
        <Link to="ShowTask" onClick={() => setOpen(false)}>My Task</Link>
      </div>

      <div className={`emp-menu ${open ? "active" : ""}`}>

  {/* ✅ Mobile  */}
  <div className="emp-mobile-links">
    <Link to="" onClick={() => setOpen(false)}>Home</Link>
    <Link to="ShowTask" onClick={() => setOpen(false)}>My Task</Link>
  </div>

  {/* AVATAR + WELCOME */}
  <div className="emp-user-info">
    <div className="emp-avatar">
      {employeeName.charAt(0).toUpperCase()}
    </div>
    <span className="emp-name">Welcome: {employeeName}</span>
  </div>

  <button className="logout-btn" onClick={handleLogout}>
    Logout
  </button>

</div>

    </nav>
  );
};

export default EmployeeNavBar;