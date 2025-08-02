import React from "react";

const RoomVisualization = () => (
  <div className="card mb-3">
    <div className="card-header bg-dark text-white">Room Visualization</div>
    <div className="card-body">
      <div className="d-flex flex-wrap gap-3">
        <div className="border p-3 bg-light">Room 1: Occupied</div>
        <div className="border p-3 bg-light">Room 2: Available</div>
        <div className="border p-3 bg-light">Room 3: Cleaning</div>
      </div>
    </div>
  </div>
);

export default RoomVisualization;
