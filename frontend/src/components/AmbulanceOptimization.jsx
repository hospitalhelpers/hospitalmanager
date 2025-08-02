import React from "react";

const AmbulanceOptimization = () => (
  <div className="card mb-3">
    <div className="card-header bg-danger text-white">Ambulance Optimization Tool</div>
    <div className="card-body">
      <p>Next optimal route: <strong>Main St → 2nd Ave → Hospital</strong></p>
      <button className="btn btn-outline-danger">Recalculate Route</button>
    </div>
  </div>
);

export default AmbulanceOptimization;
