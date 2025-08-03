import React from "react";
import WaitTimeDisplay from "./WaitTimeDisplay";
import ProgressReport from "./ProgressReport";

const PatientDashboard = () => (
  <div className="healthcare-container">
    <div className="healthcare-header">
      <h1>Patient Dashboard</h1>
      <p>Monitor your wait time and treatment progress</p>
    </div>
    <WaitTimeDisplay />
    <ProgressReport />
  </div>
);

export default PatientDashboard;
