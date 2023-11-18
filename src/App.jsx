import { BrowserRouter, Routes,Route } from "react-router-dom"
import AddEmployee from "./components/AddEmployee"
import Navbar from "./components/Navbar"
import EmployeeList from "./components/EmployeeList"
import UpdateEmployee from "./components/UpdateEmployee"
import AddTime from "./components/AddTime"
import AddDepartment from "./components/AddDepartment"

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
      <Route path="/addDepartment" element={<AddDepartment/>}></Route>
      <Route path="/updateEmployee/:id" element={<UpdateEmployee/>}></Route>
      <Route path="/addTime/:id" element={<AddTime/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
