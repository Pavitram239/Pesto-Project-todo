import React from "react";
import { STATUS } from "../../../utils/constants";

const Select = ({ disabled, id, name, list, label, error, defaultValue }) => {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <select
        className="form-select"
        id={id}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
      >
        {list.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <p className="text-danger">{error}</p>
    </div>
  );
};

export default Select;
