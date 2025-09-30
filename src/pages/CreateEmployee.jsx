import { useState } from "react"
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import EmployeeForm from "../components/EmployeeForm.jsx"
import Modal from "../components/Modal.jsx"
import { addEmployee } from "../features/employees/employeesSlice.js"

// Champs obligatoires pour mon validateForm
const REQUIRED_FIELDS = [
  'firstName','lastName','dateOfBirth','startDate', 'street','city','state','zipCode',
]

const CreateEmployee = () => {
    const dispatch = useDispatch()

    // Mon état local pour mon formulary
    const [form, setForm]= useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        startDate: '',
        department: 'Sales',
        street: '',
        city: '',
        state: '',
        zipCode: '',
    })

    // Etat des erreurs sur les inputs (ex: { firstName: 'Required' })
    const [errors, setErrors] = useState({})
    // Etat pour le controle de ma modal 
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    // Gere le changement de mes inputs 
    function handleFieldChange(event) {
        const { name, value } = event.target
        setForm((form) => ({ ...form, [name]: value }))
    }

    // Validation du formulary obligatoire
    function validateForm(currentForm) {
        return REQUIRED_FIELDS.reduce((accErrors, key) => {
            const value = String(currentForm[key] ?? '').trim()
            if (!value) accErrors[key] = 'Required'
            return accErrors
        }, {})
    }

    // Soumission du formulary 
    function handleSubmit(event) {
        event.preventDefault()
        const validateErrors = validateForm(form)
        setErrors(validateErrors)
        if (Object.keys(validateErrors).length > 0) return

        dispatch(addEmployee(form))
        setIsModalOpen(true)

        // Reset le formulary à zéro
        setForm({
            firstName: '', lastName: '',
            dateOfBirth: '', startDate: '',
            department: 'Sales',
            street: '', city: '', state: '', zipCode: '',
        })
    }

    return (
        <div>
            <div className="title">
                <h1>HRnet</h1>
            </div>

            <div className="container">
                {/* Lien vers la liste */}
                <Link to="/employee-list">View Current Employees</Link>

                <h2>Create Employee</h2>

                {/* Formulaire */}
                <EmployeeForm 
                    form={form}
                    errors={errors}
                    onChange={handleFieldChange}
                    onSubmit={handleSubmit}
                />
                
                {/* Modale de confirmation (s'affiche si isModalOpen === true) */}
                <Modal
                    open={isModalOpen}
                    title="Employee Created!"
                    onClose={() => setIsModalOpen(false)}
                />
            </div>

        </div>
    )
}

export default CreateEmployee