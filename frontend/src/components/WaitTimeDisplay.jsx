import React from "react";

const WaitTimeDisplay = () => (
  <div className="healthcare-card">
    <div className="healthcare-card-header">Estimated Wait Time</div>
    <div className="healthcare-card-body">
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>
          Current Wait Time: <span className="status-badge status-active">15 min</span>
        </h2>
        <p style={{ color: 'var(--medium-gray)', margin: 0 }}>
          Your estimated wait time is based on current patient volume and priority levels.
        </p>
      </div>
    </div>
  </div>
);

export default WaitTimeDisplay;
