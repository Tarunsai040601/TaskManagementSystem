import React, { useState } from "react";
import "./CreateEmployee.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const [loading, setLoading] = useState(false);

  // ======================================================
  // HANDLE INPUT CHANGE
  // ======================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // ======================================================
  // HANDLE SUBMIT
  // ======================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      // ================================
      // GET TEAMLEAD TOKEN
      // ================================

      const token = localStorage.getItem(
        "teamLeadToken"
      );

      if (!token) {

        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "Please login again",
        });

        navigate("/");

        return;

      }

      // ================================
      // API CALL
      // ================================

      const response = await fetch(
        "https://taskmanagementsystem-g40l.onrender.com/api/create/employeeCreate",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Something went wrong"
        );
      }

      // ================================
      // SUCCESS
      // ================================

      await Swal.fire({
        icon: "success",
        title:
          "Employee Created Successfully",
        text: "Redirecting...",
        timer: 1500,
        showConfirmButton: false,
      });

      // reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "employee",
      });

      // redirect
      navigate(
        "/TeamleadDashBoard/viewemployees"
      );

    } catch (err) {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="create-employee-container">

      <form
        onSubmit={handleSubmit}
        className="create-employee-form"
      >

        <h2>Create Employee</h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="employee">
            employee
          </option>
        </select>

        <button disabled={loading}>

          {loading
            ? "Creating..."
            : "Create Employee"}

        </button>

      </form>

    </div>
  );
};

export default CreateEmployee;