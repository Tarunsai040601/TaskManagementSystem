import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./ViewEmployee.css";

const ViewEmployees = () => {

  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const token = localStorage.getItem("teamLeadToken");

  // ======================================================
  // FETCH EMPLOYEES
  // ======================================================

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async (name = "") => {

    try {

      const url = name
        ? `http://localhost:8015/api/create/searchEmployee?name=${name}`
        : `http://localhost:8015/api/create/employeeFetch`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(res.data.employees || []);

    } catch (err) {
      console.log(err.message);
      setEmployees([]);
    }

  };

  // ======================================================
  // SEARCH
  // ======================================================

  const handleSearch = (e) => {

    const value = e.target.value;

    setSearch(value);

    if (value.trim() === "") {
      fetchEmployees();
    } else {
      fetchEmployees(value);
    }

  };

  // ======================================================
  // ASSIGN CLICK (SWAL + NAVIGATE)
  // ======================================================

  const handleAssignClick = (emp) => {

    Swal.fire({
      title: "Assign Task?",
      text: `Assign task to ${emp.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#20c8b7",
    }).then((result) => {

      if (result.isConfirmed) {

        // store employee temporarily
        localStorage.setItem(
          "selectedEmployee",
          JSON.stringify(emp)
        );

        navigate("/TeamLeadDashBoard/assignedtask");

      }

    });

  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="employee-container">

      <h1 className="employee-title">Employees</h1>

      {/* SEARCH */}
      <div className="search-box">

        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={handleSearch}
        />

      </div>

      {/* GRID */}
      <div className="employee-grid">

        {employees.map((emp) => (

          <div key={emp._id} className="employee-card">

            <div className="avatar-wrapper">
              <img
                src={`https://ui-avatars.com/api/?name=${emp.name}&background=random`}
                alt={emp.name}
              />
            </div>

            <h3>{emp.name}</h3>
            <p className="employee-email">{emp.email}</p>
            <span className="role-badge">{emp.role}</span>

            <button onClick={() => handleAssignClick(emp)}>
              Assign Task
            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ViewEmployees;