import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const EmployeeList = () => {
    // Ma liste des employés gràce à Redux
    const employees = useSelector((state) => state.employees.items)

    return (
        <div id="employee-div" className="container">
            <h3>Current Employees</h3>

            {employees.length === 0 ? (
                <p>No employees at the moment.</p>
            ) : (
                <table id="employee-table" className="display">
                    <thead>
                        <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Start Date</th>
                        <th>Department</th>
                        <th>Date of Birth</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>ZipCode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.firstName}</td>
                            <td>{emp.lastName}</td>
                            <td>{emp.startDate}</td>
                            <td>{emp.department}</td>
                            <td>{emp.dateOfBirth}</td>
                            <td>{emp.street}</td>
                            <td>{emp.city}</td>
                            <td>{emp.state}</td>
                            <td>{emp.zipCode}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            )}
        
            <div>
                <Link to="/">Home</Link>
            </div>
        </div>
    )
}

export default EmployeeList
