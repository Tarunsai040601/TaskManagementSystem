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


#  REGISTER PAGE

<img width="1920" height="874" alt="Screenshot (166)" src="https://github.com/user-attachments/assets/1066c429-713b-47bb-99c1-7de900e1b109" />

#  LOGIN

<img width="1920" height="833" alt="Screenshot (167)" src="https://github.com/user-attachments/assets/74a8e246-c95d-4ded-8e9d-6ae23f30cda3" />

#  TEAMLEAD DASHBOARD

<img width="1920" height="875" alt="Screenshot (168)" src="https://github.com/user-attachments/assets/65cce3c0-4cd9-4765-9b90-6cadd1ee0b94" />

#  CREATE_EMPLOYEE

<img width="1920" height="878" alt="Screenshot (169)" src="https://github.com/user-attachments/assets/a275d998-a70b-409b-aebf-c0fe2debece4" />

#  CREATE_EMPLOYEE_ALERT

<img width="1920" height="880" alt="Screenshot (170)" src="https://github.com/user-attachments/assets/21794279-c293-482f-a048-1ef2c65f19b4" />

# VIEW_EMPLOYEES

<img width="1920" height="884" alt="Screenshot (171)" src="https://github.com/user-attachments/assets/e7aa0f7e-f408-4a1a-ac19-d10e72beea54" />

#  ASSIGN TASK_ALERT

<img width="1920" height="877" alt="Screenshot (172)" src="https://github.com/user-attachments/assets/48b11d83-8914-4335-a2a8-c727ceda9c47" />

# ASSIGN_TASK_FORM

<img width="1920" height="861" alt="Screenshot (173)" src="https://github.com/user-attachments/assets/7c5cd772-e100-4f16-9df7-d3efb25270b8" />

# ASSIGN_ALERT
<img width="1920" height="868" alt="Screenshot (174)" src="https://github.com/user-attachments/assets/559e73f9-2736-4dab-a139-8acd19196c4e" />


# VIEW_TASK_ASSIGNED
<img width="1920" height="875" alt="Screenshot (175)" src="https://github.com/user-attachments/assets/0b3bd3b0-f78b-42bb-9915-a15d7d7e6650" />

# EMPLOYEE_DASHBOARD

<img width="1920" height="867" alt="Screenshot (176)" src="https://github.com/user-attachments/assets/2dec8d32-81be-49f3-873f-e911aaa807de" />

#  MY_TASKS
<img width="1920" height="867" alt="Screenshot (176)" src="https://github.com/user-attachments/assets/4b14a704-cf1d-48b0-90ad-d85068176f8b" />

#  MOBILE_RESPONSIVE
<img width="1475" height="887" alt="Screenshot (177)" src="https://github.com/user-attachments/assets/7c979174-a884-4c82-a895-ad126a795db4" />

<img width="1596" height="875" alt="Screenshot (178)" src="https://github.com/user-attachments/assets/c7a52cc2-3a7e-4280-95c3-1e23676bf343" />
















