import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Swal from "sweetalert2";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "teamlead",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://taskmanagementsystem-g40l.onrender.com/api/auth/register",
        formData
      );

      console.log("Register Success :", response.data);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Welcome Team Lead!",
        confirmButtonColor: "#22c7b8",
      });

      navigate("/");
    } catch (error) {
      console.log(
        "Register Error :",
        error.response?.data || error.message
      );

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data?.message || "Something went wrong",
        confirmButtonColor: "#22c7b8",
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        {/* LEFT SIDE */}

        <div className="register-left">
          <div className="left-content">
            <h1>Welcome Back!</h1>

            <p>
              To keep connected with us please
              <br />
              login with your personal info
            </p>

            <Link to="/">
              <button className="signin-btn">SIGN IN</button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="register-right">
          <h1>Create Account</h1>

          <p className="small-text">
            Use your email for registration
          </p>

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="input-box">
              <FaUser className="icon" />

              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* EMAIL */}

            <div className="input-box">
              <FaEnvelope className="icon" />

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD */}

            <div className="input-box">
              <FaLock className="icon" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* ROLE */}

            <div className="input-box">
              <FaUser className="icon" />

              <input
                type="text"
                value="teamlead"
                disabled
              />
            </div>

            <button type="submit" className="signup-btn">
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;