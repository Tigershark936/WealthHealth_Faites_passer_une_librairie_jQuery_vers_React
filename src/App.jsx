import { BrowserRouter, Routes, Route } from "react-router-dom";
import './app.css'
import Home from "./pages/Home";
import EmployeeList from "./pages/EmployeeList";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="*" element={<div>NOT FOUND</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App