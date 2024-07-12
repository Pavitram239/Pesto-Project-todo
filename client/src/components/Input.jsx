import React from "react";

const Input = ({ type, label, id, error, defaultValue, name }) => {
  console.log(error);
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        className="form-control item"
        type={type}
        id={id}
        data-bs-theme="light"
        defaultValue={defaultValue}
        name={name}
      />
      <p className="text-danger">{error}</p>
    </div>
  );
};

export default Input;
