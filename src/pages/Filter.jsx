import React from 'react'
import DashBoard from "../components/DashBoard.jsx";
import { useUser } from '../hooks/useUser.jsx'; 
const Filter = () => {
  useUser();
  return (
      <DashBoard activeMenu="Filters">
          this is filter page
      </DashBoard>
  )
}

export default Filter