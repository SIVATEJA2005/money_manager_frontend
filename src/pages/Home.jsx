import React from 'react'
import DashBoard from "../components/DashBoard.jsx";
import { useUser } from '../hooks/useUser.jsx';
const Home = () => {
  useUser();
  return (
      <DashBoard activeMenu="Dashboard">
          this is home page
      </DashBoard>
  )
}
export default Home