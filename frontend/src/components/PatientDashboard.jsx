import React from "react";
import SymptomUpdateForm from "./SymptomUpdateForm";
import WaitTimeDisplay from "./WaitTimeDisplay";
import ProgressReport from "./ProgressReport";

const PatientDashboard = () => (
  <div className="container">
    <h2 className="mb-4">Patient Dashboard</h2>
    <SymptomUpdateForm />
    <WaitTimeDisplay />
    <ProgressReport />
  </div>
);

export default PatientDashboard;
