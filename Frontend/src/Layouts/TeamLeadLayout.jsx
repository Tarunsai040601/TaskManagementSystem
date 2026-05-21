import React from "react";
import { Outlet } from "react-router-dom";
import TeamLeadNavBar from "../Components/TeamLead/TeamLeadNavbar/TeamLeadNavBar";

const TeamLeadLayout = () => {
  return (
    <div>
      <TeamLeadNavBar />
      <Outlet />
    </div>
  );
};

export default TeamLeadLayout;
