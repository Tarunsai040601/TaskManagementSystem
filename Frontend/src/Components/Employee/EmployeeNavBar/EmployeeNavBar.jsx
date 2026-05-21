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

import "./EmployeeNavBar.css";

const EmployeeNavBar = () => {

  const navigate = useNavigate();

  // ======================================================
  // GET TOKEN
  // ======================================================

  const token = localStorage.getItem(
    "employeeToken"
  );

  // ======================================================
  // CHECK TOKEN & ROLE
  // ======================================================

  useEffect(() => {

    if (!token) {

      navigate("/");
      return;

    }

    try {

      const decoded = jwtDecode(token);

      if (decoded.role !== "employee") {

        localStorage.removeItem(
          "employeeToken"
        );

        navigate("/");

      }

    } catch (error) {

      console.log(error);

      localStorage.removeItem(
        "employeeToken"
      );

      navigate("/");

    }

  }, [navigate, token]);

  // ======================================================
  // DECODE TOKEN
  // ======================================================

  const decoded = token
    ? jwtDecode(token)
    : null;

  const name = decoded?.name;
  const email = decoded?.email;
  const role = decoded?.role;

  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {

    localStorage.removeItem(
      "employeeToken"
    );

    navigate("/");

  };

  return (
    <div className="employee-sidebar-container">

      {/* LOGO */}

      <div className="employee-sidebar-logo">

        <div className="employee-logo-box">
          <FaUser />
        </div>

        <div>
          <h2>Employee</h2>
          <p>Dashboard</p>
        </div>

      </div>

      {/* LINKS */}

      <div className="employee-sidebar-links">

        <Link
          to=""
          className="employee-nav-link"
        >
          <FaHome className="employee-nav-icon" />
          <span>Home</span>
        </Link>

        <Link
          to="tasks"
          className="employee-nav-link"
        >
          <FaTasks className="employee-nav-icon" />
          <span>My Tasks</span>
        </Link>

      </div>

      {/* USER */}

      <div className="employee-sidebar-user">

        <div className="employee-user-avatar">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
          />

        </div>

        <div className="employee-user-details">

          <h3>{name}</h3>

          <p>{email}</p>

          <span>{role}</span>

        </div>

      </div>

      {/* LOGOUT */}

      <button
        className="employee-logout-btn"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
};

export default EmployeeNavBar;