import React from "react";

const Textarea = ({ label, id, name, error, defaultValue }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        className="form-control"
        id={id}
        name={name}
        rows="3"
        defaultValue={defaultValue}
      ></textarea>
      <p className="text-danger">{error}</p>
    </div>
  );
};

export default Textarea;
