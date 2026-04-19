import React from 'react'
import DashBoard from "../components/DashBoard.jsx";
import { useUser } from '../hooks/useUser.jsx';

const Expense = () => {
   useUser();
  return (
      <DashBoard activeMenu="Expense">
          this is expense page
      </DashBoard>
  )
}

export default Expense