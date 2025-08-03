import React, { useState } from "react";

const PatientQueue = () => {
  const [symptomInput, setSymptomInput] = useState("");
  const [symptoms, setSymptoms] = useState([]);

  const handleInputChange = (e) => {
    setSymptomInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && symptomInput.trim() !== "") {
      e.preventDefault();
      setSymptoms([
        ...symptoms,
        {
          text: symptomInput.trim(),
          timestamp: new Date().toLocaleString()
        }
      ]);
      setSymptomInput("");
    }
  };

  return (
    <div className="healthcare-card">
      <div className="healthcare-card-header">Patient Queue</div>
      <div className="healthcare-card-body">
        <div className="form-group">
          <label htmlFor="symptomInput" className="form-label">Add Symptom</label>
          <input
            type="text"
            className="form-control"
            id="symptomInput"
            value={symptomInput}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Type symptom and press Enter"
          />
        </div>
        {symptoms.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            {symptoms.map((symptom, idx) => (
              <div key={idx} className="patient-info-item" style={{ margin: '0.5rem 0' }}>
                <div className="info-row">
                  <span className="info-label">{symptom.text}</span>
                  <span className="info-value">{symptom.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="patient-info-item">
          <h3>Current Queue</h3>
          <div className="info-row">
            <span className="info-label">John Doe</span>
            <span className="status-badge status-waiting">Level 2 - Emergent</span>
          </div>
          <div className="info-row">
            <span className="info-label">Jane Smith</span>
            <span className="status-badge status-waiting">Level 3 - Urgent</span>
          </div>
          <div className="info-row">
            <span className="info-label">Sam Lee</span>
            <span className="status-badge status-discharged">Low Priority</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientQueue;
