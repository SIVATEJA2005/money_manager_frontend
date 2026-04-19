import React from 'react'
import DashBoard from "../components/DashBoard.jsx";
import { useUser } from '../hooks/useUser.jsx';

const income = () => {
   useUser();
  return (
     <DashBoard activeMenu="Income">
          this is income page
      </DashBoard>
  )
}

export default income