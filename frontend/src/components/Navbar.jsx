import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg healthcare-navbar">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">🏥 Hospital Manager</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="/patient">Patient</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/staff">Staff</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/patient-tracker">Patient Tracker</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
