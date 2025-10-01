import AddressForm from "./AddressForm.jsx"

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

      {/* Dates Of Birth */}
      <div className="form-field">
        <label htmlFor="date-of-birth">Date of Birth</label>
        <input
          type="date"
          id="date-of-birth"
          name="dateOfBirth"
          value={form.dateOfBirth} 
          onChange={onChange} 
          required
        />
        {errors.dateOfBirth && <div className="form-error">{errors.dateOfBirth}</div>}
      </div>

      {/* Start Date */}
      <div className="form-field">
        <label htmlFor="start-date">Start Date</label>
        <input 
          type="date"
          id="start-date"
          name="startDate"
          value={form.startDate}
          onChange={onChange}
          required 
        />
        {errors.startDate && <div className="form-error">{errors.startDate}</div>}
      </div>

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
