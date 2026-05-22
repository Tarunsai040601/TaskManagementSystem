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

  // =====================================
  // FETCH TASKS
  // =====================================

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

        console.log("EMPLOYEE TASKS:", res.data);

        setTasks(res.data.tasks || []);

      } catch (err) {

        console.log("Error:", err);

      }

    };

    fetchTasks();

  }, [token]);

  // =====================================
  // UPDATE STATUS
  // =====================================

  const updateStatus = async (taskId, status) => {

    try {

      const res = await axios.patch(
        `https://taskmanagementsystem-g40l.onrender.com/api/employee/update/${taskId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("UPDATED:", res.data);

      // FRONTEND UPDATE
      const updatedTasks = tasks.map((task) =>
        task._id === taskId
          ? { ...task, status }
          : task
      );

      setTasks(updatedTasks);

    } catch (err) {

      console.log("Update Error:", err);

    }

  };

  return (

    <div className="mytask-page">

      <div className="mytask-header">

        <h2 className="mytask-title">
          My Tasks
        </h2>

      </div>

      <div className="mytask-grid">

        {tasks.length === 0 ? (

          <div className="mytask-empty">
            No Tasks Assigned
          </div>

        ) : (

          tasks.map((task) => (

            <div
              className="mytask-card"
              key={task._id}
            >

              {/* TOP */}

              <div className="mytask-card-top">

                <h3>
                  {task.taskTitle}
                </h3>

                <span
                  className={`mytask-status ${task.status}`}
                >
                  {task.status}
                </span>

              </div>

              {/* DESCRIPTION */}

              <p className="mytask-description">
                {task.description}
              </p>

              {/* BUTTONS */}

              <div className="mytask-btn-group">

                <button
                  className="pending-btn"
                  onClick={() =>
                    updateStatus(task._id, "Pending")
                  }
                >
                  Pending
                </button>

                <button
                  className="progress-btn"
                  onClick={() =>
                    updateStatus(task._id, "inProgress")
                  }
                >
                  In Progress
                </button>

                <button
                  className="complete-btn"
                  onClick={() =>
                    updateStatus(task._id, "Completed")
                  }
                >
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