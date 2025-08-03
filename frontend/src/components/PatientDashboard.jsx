import React, { useState } from "react";
import WaitTimeDisplay from "./WaitTimeDisplay";
import ProgressReport from "./ProgressReport";

const PatientDashboard = () => {
  const [healthCardId, setHealthCardId] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  const handleHealthCardSubmit = () => {
    if (healthCardId.trim() === "") {
      setSubmitStatus("Please enter your health card ID");
      return;
    }
    
    // Simulate submission process
    setSubmitStatus("Submitting health card ID...");
    setTimeout(() => {
      setSubmitStatus("Health card ID submitted successfully!");
      setHealthCardId("");
    }, 1500);
  };

  return (
    <div className="healthcare-container">
      <div className="healthcare-header">
        <h1>Patient Dashboard</h1>
        <p>Monitor your wait time and treatment progress</p>
      </div>

      <div className="healthcare-card">
        <div className="healthcare-card-header">Health Card Information</div>
        <div className="healthcare-card-body">
          <div className="form-group">
            <label className="form-label">Health Card ID/Number</label>
            <input
              type="text"
              className="form-control"
              value={healthCardId}
              onChange={(e) => setHealthCardId(e.target.value)}
              placeholder="Enter your health card ID or number"
            />
          </div>
          
          <button 
            type="button" 
            className="search-button" 
            onClick={handleHealthCardSubmit}
            disabled={!healthCardId.trim()}
            style={{ marginTop: '1rem' }}
          >
            Submit Health Card ID
          </button>
          
          {submitStatus && (
            <div className={submitStatus.includes("successfully") ? "success" : submitStatus.includes("Please") ? "error" : "loading"} style={{ marginTop: '1rem' }}>
              {submitStatus}
            </div>
          )}
        </div>
      </div>

      <WaitTimeDisplay />
      <ProgressReport />

    </div>
  );
};

export default PatientDashboard;
