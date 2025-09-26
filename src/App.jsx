import { BrowserRouter, Routes, Route } from "react-router-dom";
import './app.css'
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeList from "./pages/EmployeeList";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="*" element={<div>NOT FOUND</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App