import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDashboardContext } from "../pages/Dashboard";

const Navbar = () => {
  const { logout } = useDashboardContext();
  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-body clean-navbar">
      <div className="container">
        <a className="navbar-brand logo" href="#">
          Task Manager
        </a>
        <button
          data-bs-toggle="collapse"
          className="navbar-toggler"
          data-bs-target="#navcol-1"
        >
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="">
                Tasks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="add-task">
                Add Task
              </NavLink>
            </li>
          </ul>
          <div>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
