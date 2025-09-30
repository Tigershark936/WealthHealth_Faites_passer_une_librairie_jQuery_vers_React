import { US_STATES_FULL } from "../data/states"

const AddressForm = ({ form = {}, errors = {}, onChange = () => {} }) => {
  return (
    <fieldset className="address">
      <legend>Address</legend>

      {/* Rue */}
      <div>
        <label htmlFor="street">Street</label>
        <input 
          id="street" 
          name="street" 
          value={form.street} 
          onChange={onChange} 
          required 
        />
        {errors.street && <div style={{ color:'crimson' }}>{errors.street}</div>}
      </div>

      {/* Ville */}
      <div>
        <label htmlFor="city">City</label>
        <input 
          type="text"
          id="city"
          name="city"
          value={form.city}
          onChange={onChange}
        />
        {errors.city && <div style={{ color:'crimson' }}>{errors.city}</div>}
      </div>

      {/* État US */}
      <div>
        <label htmlFor="state">State</label>
        <select 
          name="state" 
          id="state"
          value={form.state}
          onChange={onChange}
          required
        >
          <option> Select State </option>
          {US_STATES_FULL.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        {errors.state && <div style={{ color:'crimson' }}>{errors.state}</div>}
      </div>

      {/* Code postal */}
      <div>
        <label htmlFor="zip-code">Zip Code</label>
        <input 
          type="number"
          id="zip-code"
          name="zipCode"  
          value={form.zipCode}
          onChange={onChange}
          inputMode="numeric"
          pattern="[0-9]*"
          required
        />
        {errors.zipCode && <div style={{ color:'crimson' }}>{errors.zipCode}</div>}
      </div>
    </fieldset>
  )
}

export default AddressForm
