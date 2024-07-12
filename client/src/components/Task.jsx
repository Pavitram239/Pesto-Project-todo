import React from "react";
import { Form, Link } from "react-router-dom";
import { FaTrash, FaPen } from "react-icons/fa";
const Task = ({ title, description, _id, status }) => {
  const resetStyles = {
    all: "unset",
    display: "block",
    width: "100%",
  };
  return (
    <div className="col-lg-4">
      <div className="card clean-testimonial-item border-0 rounded-0">
        <div className="card-body">
          <h4 className="card-title text-center">{title}</h4>
          <p className="card-text">{description}</p>
          <h3>{status}</h3>
          <div className="d-flex gap-2 align-items-center">
            <Link to={`./edit-task/${_id}`}>
              <button type="button" className="btn btn-outline-primary">
                <FaPen />
              </button>
            </Link>
            <Form
              method="post"
              action={`./delete-task/${_id}`}
              style={resetStyles}
            >
              <button type="submit" className="btn btn-outline-danger">
                <FaTrash />
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
