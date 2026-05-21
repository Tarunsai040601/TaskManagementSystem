const authSchema = require("../../Models/authSchema.js");
const taskSchema = require("../../Models/taskSchema.js");

// ======================================================
// FETCH EMPLOYEE TASKS
// ======================================================

const fetchEmployeeTask = async (req, res) => {
  try {
    // Logged in Employee ID
    const employeeId = req.user.id;

    // Fetch only logged in employee tasks
    const tasks = await taskSchema
      .find({
        assignedEmployee: employeeId,
      })
      .populate({
        path: "createdBy",
        select: "name email role",
      });

    // No tasks
    if (tasks.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No tasks assigned",
      });
    }

    // Success response
    return res.status(200).json({
      status: true,
      message: "Employee tasks fetched successfully",
      totalTasks: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log("Fetch Employee Task Error:", error.message);

    return res.status(500).json({
      status: false,
      message: "Something went wrong while fetching employee tasks",
      error_message: error.message,
    });
  }
};

// ======================================================
// UPDATE EMPLOYEE TASK STATUS
// ======================================================

const updateEmployeeTask = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    // Logged in Employee ID
    const employeeId = req.user.id;

    // Valid statuses
    const validStatus = [
      "Pending",
      "inProgress",
      "Completed",
    ];

    // Check status
    if (!validStatus.includes(status)) {
      return res.status(400).json({
        status: false,
        message:
          "Invalid status. Use Pending, inProgress or Completed",
      });
    }

    // Find task belongs to employee
    const task = await taskSchema.findOne({
      _id: id,
      assignedEmployee: employeeId,
    });

    // Task not found
    if (!task) {
      return res.status(404).json({
        status: false,
        message: "Task not found",
      });
    }

    // Update status
    task.status = status;

    await task.save();

    // Success response
    return res.status(200).json({
      status: true,
      message: "Task status updated successfully",
      updatedTask: task,
    });
  } catch (error) {
    console.log("Update Employee Task Error:", error.message);

    return res.status(500).json({
      status: false,
      message: "Something went wrong while updating task",
      error_message: error.message,
    });
  }
};

module.exports = {
  fetchEmployeeTask,
  updateEmployeeTask,
};