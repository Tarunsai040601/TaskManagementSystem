import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AssignedTask.css";

const AssignedTask = () => {

  const [employee, setEmployee] = useState(null);

  const [formData, setFormData] = useState({
    taskTitle: "",
    description: "",
    priority: "Low",
  });

  const token = localStorage.getItem("teamLeadToken");

  // ======================================================
  // GET SELECTED EMPLOYEE
  // ======================================================

  useEffect(() => {

    const emp = JSON.parse(
      localStorage.getItem("selectedEmployee")
    );

    setEmployee(emp);

  }, []);

  // ======================================================
  // HANDLE CHANGE
  // ======================================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // ======================================================
  // SUBMIT TASK
  // ======================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {
        taskTitle: formData.taskTitle,
        description: formData.description,
        priority: formData.priority,
        assignedEmployee: employee._id,
      };

      await axios.post(
        "https://taskmanagementsystem-g40l.onrender.com/api/tasks/createTask",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Task Assigned Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      setFormData({
        taskTitle: "",
        description: "",
        priority: "Low",
      });

    } catch (err) {

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.message,
      });

    }

  };

  return (
    <div className="task-container">

      <div className="task-card">

        <h2>Assign Task</h2>

        {/* {employee && (
          <p className="emp-info">
            Assigning to: <b>{employee.name}</b>
          </p>
        )} */}

        <form onSubmit={handleSubmit}>

          <input
            name="taskTitle"
            placeholder="Task Title"
            value={formData.taskTitle}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button type="submit">
            Assign Task
          </button>

        </form>

      </div>

    </div>
  );
};

export default AssignedTask;