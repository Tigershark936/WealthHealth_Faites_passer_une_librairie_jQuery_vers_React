import { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // le CSS par défaut du datepicker

// Stockage et transformation de la date pour formater en yyyy-mm-dd ("Objet JS" en "string")
const toISODate = (d) =>
  d instanceof Date && !isNaN(d) ? d.toISOString().slice(0, 10) : "";

// Composant pour un seul input calendrier
const CalendarInput = ({ label, name, value, onChange, maxDate, error }) => {
  // 👉 si pas de value, on préremplit avec la date du jour
  const initialSelected = useMemo(() => {
    return value ? new Date(value) : new Date();
  }, [value]);

  // On garde un state, la date choisie par le user
  const [selectedDate, setSelectedDate] = useState(initialSelected);

  // Function quand on change le Date dans le calendar
  const handleChange = (date) => {
    setSelectedDate(date);

    onChange?.({
      target: {
        name,
        value: toISODate(date),
      },
    });
  };

  return (
    <div className="form-field">

      <label htmlFor={name}>{label}</label>

      {/* Input calendar */}
      <DatePicker
        id={name}
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        showIcon
        toggleCalendarOnIconClick
        shouldCloseOnSelect
        maxDate={maxDate}
      />
      {error && <div className="form-error">{error}</div>}

    </div>
  );
};

// Composant regroupant les deux dates
const DateInputs = ({ form, errors, onChange }) => {
  return (
    <>

      {/* Première date = Date of birth */}
      <CalendarInput
        label="Date of Birth"
        name="dateOfBirth"
        value={form.dateOfBirth}
        onChange={onChange}
        maxDate={new Date()} // empêche les DOB futures
        error={errors.dateOfBirth}
      />

      {/* Deuxième date = Start Date */}
      <CalendarInput
        label="Start Date"
        name="startDate"
        value={form.startDate}
        onChange={onChange}
        error={errors.startDate}
      />
    </>
  );
};

export default DateInputs;
