import { Link } from "react-router-dom"

const EmployeeList = () => {
    return (
        <div id="employee-div" className="container">
            <h3>Current Employees</h3>

            <table id="employee-table" className="display"></table>
            
            <Link to="/">Home</Link>
        </div>
    )
}

export default EmployeeList
