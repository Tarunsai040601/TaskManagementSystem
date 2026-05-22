import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./EmployeeHome.css";

const EmployeeHome = () => {
  const [greeting, setGreeting]     = useState("");
  const [quote, setQuote]           = useState("");
  const [animate, setAnimate]       = useState(false);
  const [tasks, setTasks]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");

  // ── token & name ──────────────────────────────────────
  const token = localStorage.getItem("employeeToken");
  let name = "Employee";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      name = decoded?.name || "Employee";
    } catch {}
  }

  // ── derived counts ────────────────────────────────────
  const totalTasks     = tasks.length;
  const completedTasks = tasks.filter(
    (t) => t.status === "completed" || t.status === "done"
  ).length;
  const pendingTasks   = totalTasks - completedTasks;
  const progress       = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  const quotes = [
    "Success is the result of consistency.",
    "Work hard in silence, let success make noise.",
    "Don't stop until you're proud.",
    "Small steps every day lead to big results.",
  ];

  // ── fetch tasks ───────────────────────────────────────
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(
          "http://localhost:8015/api/employee/getEmployeeTask",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error(`Error ${res.status}`);

        const data = await res.json();

        // handle both { tasks: [...] } and direct array
        setTasks(Array.isArray(data) ? data : data.tasks || []);
      } catch (err) {
        setError("Failed to load tasks. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  // ── greeting & quote ──────────────────────────────────
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12)      setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else                setGreeting("Good Evening");

    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setTimeout(() => setAnimate(true), 80);
  }, []);

  // ── loading state ─────────────────────────────────────
  if (loading) {
    return (
      <div className="emp-page emp-loading">
        <div className="loader" />
        <p>Loading your dashboard…</p>
      </div>
    );
  }

  // ── error state ───────────────────────────────────────
  if (error) {
    return (
      <div className="emp-page emp-loading">
        <p className="emp-error">⚠️ {error}</p>
      </div>
    );
  }

  // ── main render ───────────────────────────────────────
  return (
    <div className="emp-page">
      <div className={`emp-inner ${animate ? "visible" : ""}`}>

        {/* HEADER */}
        <header className="emp-header">
          <p className="emp-eyebrow">Dashboard Overview</p>
          <h1 className="emp-heading">
            {greeting}, <span>{name}</span> 👋
          </h1>
          <p className="emp-quote">{quote}</p>
        </header>

        {/* CARDS */}
        <div className="emp-cards">

          <div className="emp-card total">
            <span className="card-icon">📋</span>
            <div className="card-value">{totalTasks}</div>
            <div className="card-label">Total Tasks</div>
            <div className="card-sub">All assigned tasks</div>
          </div>

          <div className="emp-card pending">
            <span className="card-icon">⏳</span>
            <div className="card-value">{pendingTasks}</div>
            <div className="card-label">Pending</div>
            <div className="card-sub">Awaiting completion</div>
          </div>

          <div className="emp-card done">
            <span className="card-icon">✅</span>
            <div className="card-value">{completedTasks}</div>
            <div className="card-label">Completed</div>
            <div className="card-sub">Tasks wrapped up</div>
          </div>

        </div>

        {/* PROGRESS */}
        <section className="emp-progress">
          <div className="progress-header">
            <span className="progress-title">Overall Progress</span>
            <span className="progress-pct">{progress}%</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: animate ? `${progress}%` : "0%" }}
            />
          </div>
          <div className="progress-meta">
            <span>0 tasks</span>
            <span>{completedTasks} of {totalTasks} completed</span>
            <span>{totalTasks} tasks</span>
          </div>
        </section>

      </div>
    </div>
  );
};

export default EmployeeHome;