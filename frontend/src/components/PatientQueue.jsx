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
    <div className="card mb-3">
      <div className="card-header bg-gray-400 text-black">Patient Queue</div>
      <div className="card-body">
        <div className="mb-3">
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
          <ul className="list-group mb-3">
            {symptoms.map((symptom, idx) => (
              <li key={idx} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <span>{symptom.text}</span>
                  <small className="text-muted">{symptom.timestamp}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
        <ul className="list-group">
          <li className="list-group-item">John Doe - Priority: Level 2 - Emergent</li>
          <li className="list-group-item">Jane Smith - Priority: Level 3 - Emergent</li>
          <li className="list-group-item">Sam Lee - Priority: Low</li>
        </ul>
      </div>
    </div>
  );
};

export default PatientQueue;
