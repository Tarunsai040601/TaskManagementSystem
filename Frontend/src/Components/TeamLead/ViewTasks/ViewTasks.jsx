import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewTasks.css";

const ViewTasks = () => {

  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("teamLeadToken");

  // ===============================
  // FETCH TASKS
  // ===============================
  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8015/api/tasks/fetchTask",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("TASK API RESPONSE:", res.data);

      setTasks(res.data.tasks || []);

    } catch (err) {

      console.log("Error fetching tasks:", err.message);

    }

  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (

    <div className="vt-page">

      <div className="vt-container">

        <h2 className="vt-title">
          Assigned Tasks
        </h2>

        <div className="vt-table-wrapper">

          <table className="vt-table">

            <thead>

              <tr>

                <th>S.No</th>
                <th>Task Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned Employee</th>
                <th>Created Date</th>

              </tr>

            </thead>

            <tbody>

              {tasks.length > 0 ? (

                tasks.map((task, index) => (

                  <tr key={task._id}>

                    <td>{index + 1}</td>

                    <td>{task.taskTitle}</td>

                    <td>{task.description}</td>

                    <td>

                      <span className={`priority ${task.priority}`}>
                        {task.priority}
                      </span>

                    </td>

                    <td>

                      <span className={`status ${task.status}`}>
                        {task.status}
                      </span>

                    </td>

                    <td>

                      <div className="employee-info">

                        <span className="emp-name">
                          {task.assignedEmployee?.name}
                        </span>

                        <span className="emp-email">
                          {task.assignedEmployee?.email}
                        </span>

                      </div>

                    </td>

                    <td>
                      {new Date(task.createdDate).toLocaleDateString()}
                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="7" className="no-data">
                    No tasks found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default ViewTasks;