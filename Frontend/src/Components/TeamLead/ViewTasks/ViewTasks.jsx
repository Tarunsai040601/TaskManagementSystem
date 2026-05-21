import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewTasks.css";

const ViewTasks = () => {

  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("teamLeadToken");

  // ======================================================
  // FETCH TASKS
  // ======================================================

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

      setTasks(res.data.tasks || []);

    } catch (err) {
      console.log(err.message);
      setTasks([]);
    }

  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-page">

      <h2 className="task-title">Assigned Tasks</h2>

      <div className="table-wrapper">

        <table className="task-table">

          <thead>

            <tr>
              <th>S.No</th>
              <th>Employee</th>
              <th>Task Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created Date</th>
            </tr>

          </thead>

          <tbody>

            {tasks.map((task, index) => (

              <tr key={task._id}>

                <td>{index + 1}</td>

                <td>
                  {task.assignedEmployee?.name}
                </td>

                <td>{task.taskTitle}</td>

                <td>
                  <span className={`priority ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </td>

                <td>
                  <span className={`status ${task.status.toLowerCase()}`}>
                    {task.status}
                  </span>
                </td>

                <td>
                  {new Date(task.createdAt).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ViewTasks;