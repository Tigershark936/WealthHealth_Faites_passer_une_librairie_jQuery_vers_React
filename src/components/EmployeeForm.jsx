import AddressForm from "./AddressForm.jsx"

const EmployeeForm = ({ form, errors, onChange, onSubmit }) => {
  return (
    <form id="create-employee" onSubmit={onSubmit}>

      {/* First Name */}
      <div>
        <label htmlFor="first-name">First Name</label>
        <input 
          type="text" 
          id="first-name"
          name="firstName"
          value={form.firstName}
          onChange={onChange}
          required
        />
        {errors.firstName && <div style={{ color:'crimson' }}>{errors.firstName}</div>}
      </div>

      {/* Last Name */}
      <div>
        <label htmlFor="last-name">Last Name</label>
        <input 
          type="text"
          id="last-name"
          name="lastName"
          value={form.lastName}
          onChange={onChange}
          required
        />
        {errors.lastName && <div style={{ color:'crimson' }}>{errors.lastName}</div>}
      </div>

      {/* Dates Of Birth */}
      <div>
        <label htmlFor="date-of-birth">Date of Birth</label>
        <input
          type="date"
          id="date-of-birth"
          name="dateOfBirth"
          value={form.dateOfBirth} 
          onChange={onChange} 
          required
        />
        {errors.dateOfBirth && <div style={{ color:'crimson' }}>{errors.dateOfBirth}</div>}
      </div>

      {/* Start Date */}
      <label htmlFor="start-date">Start Date</label>
      <input 
        type="date"
        id="start-date"
        name="startDate"
        value={form.startDate}
        onChange={onChange}
        required 
      />

      <AddressForm
        form={form}
        errors={errors}
        onChange={onChange}
      />

      {/* Department */}
      <label htmlFor="department">Department</label>
      <select 
        name="department" 
        id="department" 
        value={form.department}
        onChange={onChange} 
        required
      >
        <option>Sales</option>
        <option>Marketing</option>
        <option>Engineering</option>
        <option>Human Resources</option>
        <option>Legal</option>
      </select>

      {/* Button Formulary */}
      <button type="submit">Save</button>
    </form>
  )
}

export default EmployeeForm
