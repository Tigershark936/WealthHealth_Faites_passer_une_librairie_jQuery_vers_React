import AddressForm from "./AddressForm.jsx"
import DateInputs from "./DateInputs.jsx";
import Select from "react-select";

const DEPARTMENTS = [
  "Sales",
  "Marketing",
  "Engineering",
  "Human Resources",
  "Legal",
];

const EmployeeForm = ({ form = {}, errors = {}, onChange = () => {}, onSubmit = () => {} }) => {

  const departmentOptions = DEPARTMENTS.map((d) => ({
    value: d,
    label: d
  }));

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
        <Select
          name="department" 
          id="department"
          options={departmentOptions}
          value={departmentOptions.find((opt) => opt.value === form.department) || null}
          onChange={(selected) => 
            onChange({
              target: {name: "department", value: selected?.value || "" },
            })
          }
          placeholder="Select Department"
          classNamePrefix="react-select"
          isClearable
          menuPlacement="auto"
          required
        />
        {errors.department && <div className="form-error">{errors.department}</div>}
      </div>

      {/* Button Formulary */}
      <div className="form-actions">
        <button className="btn-primary" type="submit">Save</button>
      </div>
    </form>
  )
}

export default EmployeeForm
