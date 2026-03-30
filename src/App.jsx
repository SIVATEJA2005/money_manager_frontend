import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/login.jsx"
import Signup from "./pages/signup.jsx"
import Category from "./pages/Category.jsx"
import Income from "./pages/Income.jsx"
import Expense from "./pages/Expense.jsx"
import Filter from "./pages/Filter.jsx"
import {Toaster} from "react-hot-toast"

const App=()=>{
  return (
    <>
      <Toaster/>
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/income" element={<Income/>}/>
        <Route path="/expense" element={<Expense/>}/>
        <Route path="/filter" element={<Filter/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App