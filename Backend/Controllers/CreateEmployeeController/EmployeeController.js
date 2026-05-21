const authSchema = require("../../Models/authSchema.js");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config({ quiet: true });

// ======================================================
// FETCH EMPLOYEES
// ======================================================

const FetchEmployees = async (req, res) => {
  try {
    // Logged in TeamLead ID
    const teamLeadId = req.user.id;

    // Fetch only employees created by this TeamLead
    const fetchingEmployees = await authSchema.find({
      role: "employee",
      createdBy: teamLeadId,
    });

    // Check employees available or not
    if (fetchingEmployees.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No employees found",
      });
    }

    // Success response
    return res.status(200).json({
      status: true,
      message: "Employees fetched successfully",
      totalEmployees: fetchingEmployees.length,
      employees: fetchingEmployees,
    });
  } catch (error) {
    console.log("Fetch Employees Error:", error.message);

    return res.status(500).json({
      status: false,
      message: "Something went wrong while fetching employees",
      error_message: error.message,
    });
  }
};

// ======================================================
// CREATE EMPLOYEE
// ======================================================

const createEmployee = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ================= REQUIRED FIELDS =================

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    // ================= EMAIL VALIDATION =================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: false,
        message: "Invalid email format",
      });
    }

    // ================= PASSWORD VALIDATION =================

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: false,
        message:
          "Password must contain uppercase, lowercase, number, special character and minimum 8 characters",
      });
    }

    // ================= CHECK USER EXISTS =================

    const user = await authSchema.findOne({ email });

    if (user) {
      return res.status(409).json({
        status: false,
        message: `Employee already created with this email: ${user.email}`,
      });
    }

    // ================= PASSWORD HASHING =================

    const passwordHashing = await bcrypt.hash(password, 10);

    console.log("passwordHashing:", passwordHashing);

    // ================= CREATE EMPLOYEE =================

    const insertUser = await authSchema.create({
      name,
      password: passwordHashing,
      email,
      role,

      // Logged in TeamLead ID
      createdBy: req.user.id,
    });

    console.log("insertUser:", insertUser);

    // ================= SUCCESS RESPONSE =================

    return res.status(201).json({
      status: true,
      message: "Employee created successfully",
      details: {
        id: insertUser._id,
        name: insertUser.name,
        email: insertUser.email,
        role: insertUser.role,
        createdBy: insertUser.createdBy,
      },
    });
  } catch (error) {
    console.log("Employee creation error:", error.message);

    return res.status(500).json({
      status: false,
      message: "Employee creation error",
      err_mess: error.message,
    });
  }
};

// ======================================================
// SEARCH EMPLOYEE BY NAME
// ======================================================

const searchEmployee = async (req, res) => {
  try {
    const { name } = req.query;

    // Logged in TeamLead ID
    const teamLeadId = req.user.id;

    // Check name available
    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Employee name is required",
      });
    }

    // Search employee
    const employee = await authSchema.find({
      role: "employee",
      createdBy: teamLeadId,
      name: { $regex: name, $options: "i" },
    });

    // Employee not found
    if (employee.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Employee not found",
      });
    }

    // Success response
    return res.status(200).json({
      status: true,
      message: "Employee fetched successfully",
      totalEmployees: employee.length,
      employees: employee,
    });
  } catch (error) {
    console.log("Search Employee Error:", error.message);

    return res.status(500).json({
      status: false,
      message: "Something went wrong while searching employee",
      error_message: error.message,
    });
  }
};

module.exports = {
  FetchEmployees,
  createEmployee,
  searchEmployee,
};