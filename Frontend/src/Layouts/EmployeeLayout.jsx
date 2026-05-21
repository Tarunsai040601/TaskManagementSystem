import React from 'react'
import { Outlet } from 'react-router-dom'
import EmployeeNavBar from '../Components/Employee/EmployeeNavBar/EmployeeNavBar'

const EmployeeLayout = () => {
  return (
    <div>
      <EmployeeNavBar/>
      <Outlet/>
    </div>
  )
}

export default EmployeeLayout
