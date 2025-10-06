import { useState } from "react"
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import EmployeeForm from "../components/EmployeeForm.jsx"
import Modal from "../components/Modal.jsx"
import { addEmployee } from "../features/employees/employeesSlice.js"

// Champs obligatoires pour mon validateForm
const REQUIRED_FIELDS = [
  'firstName','lastName','dateOfBirth','startDate', 'street','city','state','zipCode', "department",
]

const CreateEmployee = () => {
    const dispatch = useDispatch()

    // Mon état local pour mon formulary
    const [form, setForm]= useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        startDate: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        department: '',
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
        <div
            className="auth-layout"
            style={{
                "--panel-bg-image": "url('public/Logo-WealthHealth.jpg')",
            }}
        >
            {/* PARTI DE GAUCHE DU FORMULARY */}
            <aside className="auth-panel">
                <div className="brand">
                    <h2 style={{margin:0}}>Wealth Health</h2>
                    <p style={{margin:"6px 0 0", opacity:.70}}>
                        Manage your employees with confidence.
                    </p>
                </div>
            </aside>

            {/* PARTI DE DROITE DU FORMULARY */}
            <section className="form-card">
                <div className="header">
                    <h1>Create employee</h1>

                    {/* Lien vers la liste */}
                    <Link className="link-secondary" to="/employee-list">
                        View current employees
                    </Link>
                </div>

                <p className="sub">
                Fill out this form so we can verify and save your profile.
                </p>

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
            </section>
        </div>
    )
}

export default CreateEmployee