import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

import "./Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  // ======================================================
  // HANDLE INPUT CHANGE
  // ======================================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // ======================================================
  // HANDLE LOGIN
  // ======================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://taskmanagementsystem-g40l.onrender.com/api/auth/login",
        formData
      );

      console.log(
        "Login Success:",
        response.data
      );

      // ======================================================
      // DECODE TOKEN
      // ======================================================

      const decoded = jwtDecode(
        response.data.Raised_token
      );

      console.log(
        "Decoded User:",
        decoded
      );

      // ======================================================
      // SAVE TOKEN ROLE BASED
      // ======================================================

      if (
        decoded.role === "teamlead"
      ) {

        localStorage.setItem(
          "teamLeadToken",
          response.data.Raised_token
        );

      }

      else if (
        decoded.role === "employee"
      ) {

        localStorage.setItem(
          "employeeToken",
          response.data.Raised_token
        );

      }

      // ======================================================
      // SUCCESS ALERT
      // ======================================================

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome ${decoded.name}`,
        confirmButtonColor:
          "#20c8b7",
      });

      // ======================================================
      // ROLE BASED NAVIGATION
      // ======================================================

      if (
        decoded.role === "teamlead"
      ) {

        navigate(
          "/TeamLeadDashBoard"
        );

      }

      else if (
        decoded.role === "employee"
      ) {

        navigate(
          "/EmployeeDashBoard"
        );

      }

    } catch (error) {

      console.log(
        "Login Error:",
        error.response?.data ||
          error.message
      );

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.response?.data
            ?.message ||
          "Invalid Credentials",

        confirmButtonColor:
          "#20c8b7",
      });

    }

  };

  return (
    <div className="login-container">

      <div className="login-card">

        {/* LEFT SIDE */}

        <div className="login-left">

          <div className="left-content">

            <h1>
              Welcome Back!
            </h1>

            <p>
              To keep connected
              with us please
              <br />
              Register with your
              personal info
            </p>

            <Link to="/register">

              <button className="signup-side-btn">
                SIGN UP
              </button>

            </Link>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="login-right">

          <h1>Sign In</h1>

          <p className="small-text">
            Use your account
            credentials
          </p>

          <form
            onSubmit={handleSubmit}
          >

            {/* EMAIL */}

            <div className="input-box">

              <FaEnvelope className="icon" />

              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="input-box">

              <FaLock className="icon" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter Password"
                name="password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                required
              />

              <span
                className="eye-icon"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </span>

            </div>

            <button
              type="submit"
              className="login-btn"
            >
              SIGN IN
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;