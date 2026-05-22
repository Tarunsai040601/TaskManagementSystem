import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./EmployeeHome.css";

const EmployeeHome = () => {
  const token = localStorage.getItem("employeeToken");

  let employeeName = "Employee";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      employeeName = decoded.name;
    } catch (err) {
      console.log(err);
    }
  }

  // =========================
  // GREETING BASED ON TIME
  // =========================
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // =========================
  // QUOTES
  // =========================
  const quotes = [
    "Success is the result of hard work.",
    "Stay consistent and never give up.",
    "Small progress is still progress.",
    "Focus on improvement, not perfection.",
    "Your effort today builds tomorrow."
  ];

  const randomQuote =
    quotes[Math.floor(Math.random() * quotes.length)];

  // =========================
  // TASK STATE
  // =========================
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          "https://taskmanagementsystem-g40l.onrender.com/api/employee/getEmployeeTask",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTasks(res.data.tasks || []);
      } catch (err) {
        console.log("Task fetch error", err);
      }
    };

    fetchTasks();
  }, [token]);

  const pendingTasks = tasks.filter(t => t.status === "pending");
  const completedTasks = tasks.filter(t => t.status === "completed");

  return (
    <div className="emp-home-page">

      {/* WELCOME SECTION */}
      <div className="emp-welcome-card">
        <h2>
          {getGreeting()}, {employeeName} 👋
        </h2>

        <p className="emp-quote">
          "{randomQuote}"
        </p>
      </div>

      {/* TASK STATS */}
      <div className="emp-stats">

        <div className="emp-box pending">
          <h3>Pending Tasks</h3>
          <p>{pendingTasks.length}</p>
        </div>

        <div className="emp-box completed">
          <h3>Completed Tasks</h3>
          <p>{completedTasks.length}</p>
        </div>

        <div className="emp-box total">
          <h3>Total Tasks</h3>
          <p>{tasks.length}</p>
        </div>

      </div>

     

    </div>
  );
};

export default EmployeeHome;