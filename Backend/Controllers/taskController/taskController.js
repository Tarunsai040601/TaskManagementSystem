const taskSchema = require("../../Models/taskSchema.js");
const authSchema = require("../../Models/authSchema.js");

// ======================================================
// FETCH TASKS
// ======================================================

const fetchTasks = async (req, res) => {
  try {
    // Logged in TeamLead ID
    const teamLeadId = req.user.id;

    // Fetch only tasks created by this TeamLead
    const tasks = await taskSchema
      .find({
        createdBy: teamLeadId,
      })
      .populate({
        path: "assignedEmployee",
        select: "name email role",
      });

    // Check tasks available or not
    if (tasks.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No tasks found",
      });
    }

    // Success response
    return res.status(200).json({
      status: true,
      message: "Tasks fetched successfully",
      totalTasks: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log("Fetch Tasks Error:", error.message);

    return res.status(500).json({
      status: false,
      message: "Something went wrong while fetching tasks",
      error_message: error.message,
    });
  }
};

// CREATE TASK

const createTask = async (req, res) => {
  try {
    const { taskTitle, description, priority, assignedEmployee, status } =
      req.body;

    if (!taskTitle || !description || !priority || !assignedEmployee) {
      return res.status(400).json({
        status: false,
        message:
          "Task title, description, priority and assigned employee are required",
      });
    }

    const employee = await authSchema.findOne({
      _id: assignedEmployee,
      role: "employee",
    });

    if (!employee) {
      return res.status(404).json({
        status: false,
        message: "Assigned employee not found",
      });
    }

    const newTask = await taskSchema.create({
      taskTitle,
      description,
      priority,
      assignedEmployee,
      status: status || "Pending",

      // Logged in TeamLead ID
      createdBy: req.user.id,
    });

    return res.status(201).json({
      status: true,
      message: "Task created successfully",
      taskDetails: newTask,
    });
  } catch (error) {
    console.log("Create Task Error:", error.message);

    return res.status(500).json({
      status: false,
      message: "Something went wrong while creating task",
      error_message: error.message,
    });
  }
};

module.exports = {
  fetchTasks,
  createTask,
};
