import React from "react";

const SubmitBtn = ({ text }) => {
  return (
    <button className="btn btn-primary w-100 mb-3" type="submit">
      {text}
    </button>
  );
};

export default SubmitBtn;
