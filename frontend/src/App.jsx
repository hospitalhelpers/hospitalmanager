import React, { useState } from "react";
import Navbar from "./components/Navbar";
import PatientDashboard from "./components/PatientDashboard";
import StaffDashboard from "./components/StaffDashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [view, setView] = useState("patient");

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="d-flex justify-content-center mb-4">
          <button className="btn btn-primary mx-2" onClick={() => setView("patient")}>Patient</button>
          <button className="btn btn-secondary mx-2" onClick={() => setView("staff")}>Staff</button>
        </div>
        {view === "patient" && <PatientDashboard />}
        {view === "staff" && <StaffDashboard />}
      </div>
    </>
  );
}

export default App;
