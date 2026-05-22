import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./TeamLeadHome.css";

const TeamLeadHome = () => {
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("teamLeadToken");

    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }

    fetchEmployees();
    fetchTasks();
  }, []);

  /* =========================
     FETCH EMPLOYEES
  ========================== */
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        "https://taskmanagementsystem-g40l.onrender.com/api/create/employeeFetch",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("teamLeadToken")}`,
          },
        }
      );

      // ✅ FIX: correct response key
      setEmployees(res.data.employees || []);
    } catch (err) {
      console.log("Employees fetch error:", err.message);
      setEmployees([]);
    }
  };

  /* =========================
     FETCH TASKS
  ========================== */
  const fetchTasks = async () => {
    try {
      const res = await axios.get("https://taskmanagementsystem-g40l.onrender.com/api/tasks/fetchTask", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("teamLeadToken")}`,
        },
      });

      // adjust if backend uses "tasks"
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.log("Tasks fetch error:", err.message);
      setTasks([]);
    }
  };

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="header-card">
        <h1>👋 Welcome {user?.name || "Team Lead"}</h1>
        <p>Here is your activity overview</p>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <h2>👥 Employees</h2>
          <h1>{employees.length}</h1>
          <p>Total employees created</p>
        </div>

        <div className="stat-card green">
          <h2>📌 Tasks</h2>
          <h1>{tasks.length}</h1>
          <p>Total tasks assigned</p>
        </div>
      </div>

      {/* LIST */}
      <div className="grid-2">
        <div className="box">
          <h3>Recent Employees</h3>
          {employees.slice(0, 5).map((emp, i) => (
            <div key={i} className="item">
              {emp.name} - {emp.email}
            </div>
          ))}
        </div>

        <div className="box">
          <h3>Recent Tasks</h3>
          {tasks.slice(0, 5).map((task, i) => (
            <div key={i} className="item">
              {task.taskTitle} - {task.priority}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TeamLeadHome;