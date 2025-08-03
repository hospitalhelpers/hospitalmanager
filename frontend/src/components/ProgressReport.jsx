import React from "react";

const ProgressReport = () => (
  <div className="healthcare-card">
    <div className="healthcare-card-header">Treatment Progress</div>
    <div className="healthcare-card-body">
      <div className="patient-info-item">
        <h3>Current Status</h3>
        <div className="info-row">
          <span className="info-label">Check-in Time:</span>
          <span className="info-value">{Date()}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Vitals Taken:</span>
          <span className="info-value">{""}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Current Status:</span>
          <span className="status-badge status-waiting">Waiting for Doctor</span>
        </div>
      </div>
    </div>
  </div>
);

export default ProgressReport;
