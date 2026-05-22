import React, { useEffect } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import {
  FaHome,
  FaTasks,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import './EmployeeNavBar.css'

const EmployeeNavBar = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("employeeToken");

  /* =========================
     CHECK TOKEN & ROLE
  ========================== */

  useEffect(() => {

    if (!token) {

      navigate("/");
      return;

    }

    try {

      const decoded = jwtDecode(token);

      if (decoded.role !== "employee") {

        navigate("/");

      }

    } catch (error) {

      console.log(error);

      navigate("/");

    }

  }, [navigate, token]);

  /* =========================
     DECODE TOKEN
  ========================== */

  const decoded = token
    ? jwtDecode(token)
    : null;

  const name = decoded?.name;
  const email = decoded?.email;
  const role = decoded?.role;

  /* =========================
     LOGOUT
  ========================== */

  const handleLogout = () => {

    localStorage.removeItem("employeeToken");

    navigate("/");

  };

  return (
    <div className="sidebar-container">

      {/* LOGO */}

      <div className="sidebar-logo">

        <div className="logo-box">
          <FaUser />
        </div>

        <div>
          <h2>Employee</h2>
          <p>Dashboard</p>
        </div>

      </div>

      {/* LINKS */}

      <div className="sidebar-links">

        <Link
          to=""
          className="nav-link"
        >
          <FaHome className="nav-icon" />
          <span>Home</span>
        </Link>

        <Link
          to="tasks"
          className="nav-link"
        >
          <FaTasks className="nav-icon" />
          <span>My Tasks</span>
        </Link>

      </div>

      {/* USER */}

      <div className="sidebar-user">

        <div className="user-avatar">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
          />

        </div>

        <div className="user-details">

          <h3>{name}</h3>

          <p>{email}</p>

          <span>{role}</span>

        </div>

      </div>

      {/* LOGOUT */}

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
};

export default EmployeeNavBar;