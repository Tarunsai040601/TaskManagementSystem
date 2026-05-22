# TaskManagementSystem

# About :

Employee Task Management System is a web-based application designed to streamline task assignment, tracking, and management within an organization. The system consists of two main roles: Team Lead and Employee.

The Team Lead is responsible for creating employee accounts, managing users, and assigning tasks to employees. Each task includes details such as task title, description, priority level, assigned employee, and current status. The Team Lead can also view all assigned tasks and monitor employee progress in real time.

Employees can log into the system and view the tasks assigned to them. They are able to update the status of their tasks, such as Pending, In Progress, or Completed. Once the employee updates the task status, the changes are automatically reflected in the Team Lead’s dashboard, enabling real-time task tracking and efficient workflow management.

The system improves communication between team members, enhances productivity, and ensures proper monitoring of project progress. It also provides a secure authentication mechanism and role-based access control to maintain data security and user authorization.

# LiveWebsite : https://task-management-system-sand-six.vercel.app/

# SourceCode : https://github.com/Tarunsai040601/TaskManagementSystem


# Technologies Used:

• Frontend         : React.js, HTML, CSS, JavaScript

• Backend          : Node.js, Express.js

• Database          : MongoDB with Mongoose

• Authentication    : JWT (JSON Web Token)


# Key Features:

• Team Lead user creation and management

• Task assignment functionality

• Employee task status updates

• Real-time task monitoring

• Role-based authentication and authorization

• Responsive and user-friendly interface


# 1.Project Setup Instructions

git clone <repository-url>

cd employee-task-management-system

# Backend Setup

Install Dependencies

npm install

# Create .env File

PORT=8015

MONGODB_URL=your_mongodb_connection

JWT_SECRET=your_secret_key


# Start Backend Server

npm start or npm run dev

# Backend runs on

http://localhost:8015


# Frontend Setup

Move to Frontend Folder

cd Frontend

# Install Dependencies

npm install

# Start Frontend

npm run dev

# 2. Architecture Overview

The Employee Task Management System follows a full-stack MERN architecture.

# Frontend

Built using:

React.js

CSS

Axios

React Router DOM

Responsibilities

User authentication

Dashboard UI

Task management UI

Status updates

Responsive design

# Backend

Built using:

Node.js || 
Express.js ||
Responsibilities ||
REST API creation ||
Authentication handling ||
Authorization ||
Task CRUD operations (CREATE , READ , UPDATE , DELETE ) ||
Database communication

# Database

Built using:

MongoDB

Mongoose ODM

Responsibilities

Store users

Store tasks

Maintain task relationships

# Authentication

Uses:

JWT Authentication

Role-based Authorization

Roles

Team Lead

Employee


# 3. Database Design Explanation

User Schema 

Task Schema

# Relationships

One Team Lead

can create multiple tasks.

One Employee

can have multiple assigned tasks.

MongoDB populate() is used to fetch related user details.


# 4. Assumptions Made

Only Team Leads can create employees.

Only Team Leads can assign tasks.

Employees can update only their own tasks.

JWT token is required for all protected routes.

Task statuses are restricted to:

Pending

inProgress

Completed

Email addresses are unique.

#  5. Edge Cases Identified

Authentication Edge Cases

Invalid token

Expired token

Unauthorized role access

#  UI Edge Cases

No tasks assigned

Empty API responses

API failure handling

Responsive layout issues on smaller devices

#  6. How Issues Were Handled

Authentication Handling

JWT middleware validates tokens.

Role middleware restricts unauthorized access.

Validation Handling

Backend validation for required fields.

Status validation before task updates.


#  Error Handling

Try-catch blocks used in APIs.

Proper status codes:

200 → Success

400 → Bad Request

401 → Unauthorized

404 → Not Found

500 → Server Error


#  Frontend Handling

Conditional rendering for empty states

Real-time UI updates after status change

Responsive CSS using media queries


#REGISTER PAGE

<img width="1920" height="1080" alt="Screenshot (166)" src="https://github.com/user-attachments/assets/c844b8cc-9403-43c3-8316-489ca262d865" />
