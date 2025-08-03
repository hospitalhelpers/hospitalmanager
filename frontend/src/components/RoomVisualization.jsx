import React from "react";

const RoomVisualization = () => (
  <div className="healthcare-card">
    <div className="healthcare-card-header">Room Status</div>
    <div className="healthcare-card-body">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div className="patient-info-item" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>Room 1</h4>
          <span className="status-badge status-active">Occupied</span>
        </div>
        <div className="patient-info-item" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>Room 2</h4>
          <span className="status-badge status-discharged">Available</span>
        </div>
        <div className="patient-info-item" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>Room 3</h4>
          <span className="status-badge status-waiting">Cleaning</span>
        </div>
      </div>
    </div>
  </div>
);

export default RoomVisualization;
