import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import PatientDashboard from "./components/PatientDashboard";
import StaffDashboard from "./components/StaffDashboard";
import PatientTracker from "./components/PatientTracker";
import "./healthcare-styles.css";

function App() {
  const [view, setView] = useState("patient");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/patient-tracker" element={<PatientTracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
