import AddressForm from "./AddressForm.jsx"
import DateInputs from "./DateInputs.jsx";

const DEPARTMENTS = [
  "Sales",
  "Marketing",
  "Engineering",
  "Human Resources",
  "Legal",
];

const EmployeeForm = ({ form = {}, errors = {}, onChange = () => {}, onSubmit = () => {} }) => {
  return (
    <form className="form-grid" id="create-employee" onSubmit={onSubmit} noValidate>

      {/* First Name */}
      <div className="form-field">
        <label htmlFor="first-name">First Name</label>
        <input 
          type="text" 
          id="first-name"
          name="firstName"
          value={form.firstName}
          onChange={onChange}
          required
        />
        {errors.firstName && <div className="form-error">{errors.firstName}</div>}
      </div>

      {/* Last Name */}
      <div className="form-field">
        <label htmlFor="last-name">Last Name</label>
        <input 
          type="text"
          id="last-name"
          name="lastName"
          value={form.lastName}
          onChange={onChange}
          required
        />
        {errors.lastName && <div className="form-error">{errors.lastName}</div>}
      </div>

      {/* Dates regroupées "Date of birth" & "Start Date" */}
      <DateInputs 
        form={form} 
        errors={errors} 
        onChange={onChange} 
      />

      {/* Address information */}
      <AddressForm
        form={form}
        errors={errors}
        onChange={onChange}
      />

      {/* Department */}
      <div className="form-field">
        <label htmlFor="department">Department</label>
        <select 
          name="department" 
          id="department" 
          value={form.department}
          onChange={onChange} 
          required
        >
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Button Formulary */}
      <div className="form-actions">
        <button className="btn-primary" type="submit">Save</button>
      </div>
    </form>
  )
}

export default EmployeeForm
