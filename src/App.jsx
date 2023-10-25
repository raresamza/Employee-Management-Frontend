import { BrowserRouter, Routes,Route } from "react-router-dom"
import AddEmployee from "./components/AddEmployee"
import Navbar from "./components/Navbar"
import EmployeeList from "./components/EmployeeList"

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
      <Route index element={<EmployeeList/>}></Route>
      <Route path="/" element={<EmployeeList/>}></Route>
      <Route path="/employeeList" element={<EmployeeList/>}></Route>
      <Route path="/addEmployee" element={<AddEmployee/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
