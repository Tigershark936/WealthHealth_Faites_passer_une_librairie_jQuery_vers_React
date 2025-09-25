

const AddressForm = () => {
  return (
    <fieldset className="address">
      <legend>Address</legend>

      <label htmlFor="street">Street</label>
      <input id="street" type="text" />

      <label htmlFor="city">City</label>
      <input id="city" type="text" />

      <label htmlFor="state">State</label>
      <select name="state" id="state">
        <option></option>
      </select>

      <label htmlFor="zip-code">Zip Code</label>
      <input id="zip-code" type="number" />
    </fieldset>
  )
}

export default AddressForm
