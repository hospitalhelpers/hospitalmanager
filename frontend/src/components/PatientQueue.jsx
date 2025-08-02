import React from "react";

const PatientQueue = () => (
  <div className="card mb-3">
    <div className="card-header bg-info text-white">Patient Queue</div>
    <div className="card-body">
      <ul className="list-group">
        <li className="list-group-item">John Doe - Priority: High</li>
        <li className="list-group-item">Jane Smith - Priority: Medium</li>
        <li className="list-group-item">Sam Lee - Priority: Low</li>
      </ul>
    </div>
  </div>
);

export default PatientQueue;
