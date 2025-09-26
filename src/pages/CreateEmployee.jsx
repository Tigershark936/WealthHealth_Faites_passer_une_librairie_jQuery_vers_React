import { Link } from "react-router-dom"
import EmployeeForm from "../components/EmployeeForm.jsx"
import Modal from "../components/Modal.jsx"

const CreateEmployee = () => {
    return (
        <div>
            <div className="title">
                <h1>HRnet</h1>
            </div>

            <div className="container">
                <Link to="/employee-list">View Current Employees</Link>
                <h2>Create Employee</h2>

                <EmployeeForm />

                <button type="button">Save</button>
                
                <Modal />
            </div>

        </div>
    )
}

export default CreateEmployee