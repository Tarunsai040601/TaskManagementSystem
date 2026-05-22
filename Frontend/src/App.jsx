import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import TeamLeadLayout from "./Layouts/TeamLeadLayout";
import TeamLeadHome from "./Components/TeamLead/TeamLeadHome/TeamLeadHome";
import CreateEmployee from "./Components/TeamLead/CreateEmployee/CreateEmployee";
import ViewEmployees from "./Components/TeamLead/ViewEmployee/ViewEmployee";
import AssignedTask from "./Components/TeamLead/AssignedTask/AssignedTask";
import ViewTasks from "./Components/TeamLead/ViewTasks/ViewTasks";
import EmployeeNavBar from "./Components/Employee/EmployeeNavBar/EmployeeNavBar";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* teamlead */}
      <Routes>
        <Route path="TeamLeadDashBoard" element={<TeamLeadLayout />}>
          <Route index element={<TeamLeadHome />} />
          <Route path="createemployee" element={<CreateEmployee />} />
          <Route path="viewemployees" element={<ViewEmployees />} />
          <Route path="assignedtask" element={<AssignedTask />} />
          <Route path="viewtasks" element={<ViewTasks />} />
        </Route>
      </Routes>

      {/* employee dashboard */}
      <Routes>
        <Route path="EmployeeDashBoard" element={<EmployeeNavBar/>}>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
