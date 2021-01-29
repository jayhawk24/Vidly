import React from "react";

const Input = ({ name, value, label, onChange, autoFocus, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        type="text"
        id={name}
        name={name}
        className="form-control"
        {...(autoFocus && "autoFocus")}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
