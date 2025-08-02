import React from "react";
import WaitTimeDisplay from "./WaitTimeDisplay";
import ProgressReport from "./ProgressReport";

const PatientDashboard = () => (
  <div className="container">
    <h2 className="mb-4">Patient Dashboard</h2>
    <WaitTimeDisplay />
    <ProgressReport />
  </div>
);

export default PatientDashboard;
