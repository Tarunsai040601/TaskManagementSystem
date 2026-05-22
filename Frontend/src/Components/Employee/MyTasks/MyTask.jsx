import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./MyTask.css";

const MyTask = () => {
  const token = localStorage.getItem("employeeToken");

  let employeeId = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      employeeId = decoded.id || decoded._id;
    } catch (err) {
      console.log(err);
    }
  }

  const [tasks, setTasks] = useState([]);

  // =========================
  // FETCH TASKS
  // =========================
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
        console.log("Error:", err);
      }
    };

    fetchTasks();
  }, [token]);

  // =========================
  // STATUS UPDATE
  // =========================
  const updateStatus = async (taskId, status) => {
    try {
      await axios.put(
        `http://localhost:8015/api/employee/update/${taskId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // refresh tasks
      const updated = tasks.map((task) =>
        task._id === taskId ? { ...task, status } : task
      );

      setTasks(updated);
    } catch (err) {
      console.log("Update error", err);
    }
  };

  return (
    <div className="mytask-page">

      <h2 className="mytask-title">My Tasks</h2>

      <div className="mytask-grid">

        {tasks.length === 0 ? (
          <p>No tasks assigned</p>
        ) : (
          tasks.map((task) => (
            <div className="task-card" key={task._id}>

              <h3>{task.taskTitle}</h3>
              <p>{task.description}</p>

              <span className={`status ${task.status}`}>
                {task.status}
              </span>

              {/* STATUS BUTTONS */}
              <div className="btn-group">

                <button onClick={() => updateStatus(task._id, "pending")}>
                  Pending
                </button>

                <button onClick={() => updateStatus(task._id, "inprogress")}>
                  In Progress
                </button>

                <button onClick={() => updateStatus(task._id, "complete")}>
                  Complete
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default MyTask;