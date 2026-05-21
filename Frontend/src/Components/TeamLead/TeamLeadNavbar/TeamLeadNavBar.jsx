import React, { useEffect } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import {
  FaHome,
  FaUserPlus,
  FaUsers,
  FaTasks,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

import "./TeamLeadNavBar.css";

const TeamLeadNavBar = () => {

  const navigate = useNavigate();

  // ======================================================
  // GET TOKEN
  // ======================================================

  const token = localStorage.getItem(
    "teamLeadToken"
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

      // CHECK ROLE

      if (decoded.role !== "teamlead") {

        localStorage.removeItem(
          "teamLeadToken"
        );

        navigate("/");

      }

    } catch (error) {

      console.log(error);

      localStorage.removeItem(
        "teamLeadToken"
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
      "teamLeadToken"
    );

    navigate("/");

  };

  return (
    <div className="sidebar-container">

      {/* LOGO */}

      <div className="sidebar-logo">

        <div className="logo-box">
          <FaBars />
        </div>

        <div>
          <h2>TeamLead</h2>
          <p>Dashboard</p>
        </div>

      </div>

      {/* NAV LINKS */}

      <div className="sidebar-links">

        <Link
          to=""
          className="nav-link"
        >
          <FaHome className="nav-icon" />
          <span>Home</span>
        </Link>

        <Link
          to="createemployee"
          className="nav-link"
        >
          <FaUserPlus className="nav-icon" />
          <span>Create Employee</span>
        </Link>

        <Link
          to="viewemployees"
          className="nav-link"
        >
          <FaUsers className="nav-icon" />
          <span>View Employees</span>
        </Link>

        <Link
          to="assignedtask"
          className="nav-link"
        >
          <FaTasks className="nav-icon" />
          <span>Assigned Task</span>
        </Link>

        <Link
          to="viewtasks"
          className="nav-link"
        >
          <FaTasks className="nav-icon" />
          <span>View Task</span>
        </Link>

      </div>

      {/* USER DETAILS */}

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

export default TeamLeadNavBar;