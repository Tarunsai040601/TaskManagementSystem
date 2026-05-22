import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./EmployeeHome.css";

const EmployeeHome = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("employeeToken");

  let name = "Employee";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      name = decoded?.name || "Employee";
    } catch (err) {
      console.log("Token error");
    }
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8015/api/employee/getEmployeeTask",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTasks(res.data.tasks || []);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (t) => t.status === "completed"
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const quotes = [
    "Success is the result of consistency.",
    "Work hard in silence.",
    "Don’t stop until you’re proud.",
    "Small steps every day matter.",
  ];

  const quote =
    quotes[Math.floor(Math.random() * quotes.length)];

  if (loading) {
    return (
      <div className="emp-container center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="emp-container fixed-layout">

      {/* HEADER */}
      <div className="emp-header">
        <h1>Good Day, <span>{name}</span> 👋</h1>
        <p className="quote">"{quote}"</p>
      </div>

      {/* CARDS */}
      <div className="emp-cards">
        <div className="card total">
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>

        <div className="card pending">
          <h3>Pending</h3>
          <p>{pendingTasks}</p>
        </div>

        <div className="card completed">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="progress-section">
        <h3>Overall Progress</h3>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p>{progress}% Completed</p>
      </div>

    </div>
  );
};

export default EmployeeHome;