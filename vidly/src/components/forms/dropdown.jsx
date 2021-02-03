import React from "react";

const DropDown = ({ name, label, error, options, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} id={name} name={name} className="form-control">
        {options.map((gen) => {
          if (gen.name === "All Genres" || gen.name === null)
            return <option disabled></option>;
          return (
            <option key={gen._id} value={gen._id}>
              {gen.name}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default DropDown;
