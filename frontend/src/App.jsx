import React, { useState } from "react";
import Navbar from "./components/Navbar";
import PatientDashboard from "./components/PatientDashboard";
import StaffDashboard from "./components/StaffDashboard";
import PatientTracker from "./components/PatientTracker";
import "./healthcare-styles.css";

function App() {
  const [view, setView] = useState("patient");

  return (
    <>
      <Navbar />
      <div className="healthcare-container">
        <div className="view-buttons">
          <button 
            className={`view-button ${view === "patient" ? "active" : "primary"}`} 
            onClick={() => setView("patient")}
          >
            Patient Dashboard
          </button>
          <button 
            className={`view-button ${view === "staff" ? "active" : "primary"}`} 
            onClick={() => setView("staff")}
          >
            Staff Dashboard
          </button>
          <button 
            className={`view-button ${view === "tracker" ? "active" : "primary"}`} 
            onClick={() => setView("tracker")}
          >
            Patient Tracker
          </button>
        </div>
        {view === "patient" && <PatientDashboard />}
        {view === "staff" && <StaffDashboard />}
        {view === "tracker" && <PatientTracker />}
      </div>
    </>
  );
}

export default App;
