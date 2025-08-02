import React from "react";

const WaitTimeDisplay = () => (
  <div className="card mb-3">
    <div className="card-header bg-success text-white">Estimated Wait Time</div>
    <div className="card-body">
      <h5>Current Wait Time: <span className="badge bg-secondary">15 min</span></h5>
    </div>
  </div>
);

export default WaitTimeDisplay;
