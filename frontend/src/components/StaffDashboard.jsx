import React, { useState } from "react";
import PatientQueue from "./PatientQueue";
import RoomVisualization from "./RoomVisualization";
import AmbulanceOptimization from "./AmbulanceOptimization";

const patients = [
  { id: 1, name: "John Doe", priority: "High", symptoms: "Chest pain", status: "Waiting for doctor" },
  { id: 2, name: "Jane Smith", priority: "Medium", symptoms: "Headache", status: "Vitals taken" },
  { id: 3, name: "Sam Lee", priority: "Low", symptoms: "Cough", status: "Checked in" },
];

const StaffDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [editData, setEditData] = useState(selectedPatient);

  const handleSelect = (patient) => {
    setSelectedPatient(patient);
    setEditData(patient);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // In a real app, update backend here
    setSelectedPatient(editData);
    alert("Patient info updated!");
  };

  return (
    <div className="container">
      <h2 className="mb-4">Staff Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-info text-white">Patient Queue</div>
            <ul className="list-group list-group-flush">
              {patients.map((patient) => (
                <li
                  key={patient.id}
                  className={`list-group-item ${selectedPatient.id === patient.id ? "active" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelect(patient)}
                >
                  {patient.name} - Priority: {patient.priority}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-secondary text-white">Patient Information</div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" value={editData.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">CTAS Priority</label>
                  <select className="form-select" name="priority" value={editData.priority} onChange={handleChange}>
                    <option>Level 1 - Resuscitation</option>
                    <option>Level 2 - Emergent</option>
                    <option>Level 3 - Urgent</option>
                    <option>Level 4 - Less Urgent</option>
                    <option>Level 5 - Non-Urgent</option>
                    
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Symptoms</label>
                  <input type="text" className="form-control" name="symptoms" value={editData.symptoms} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <input type="text" className="form-control" name="status" value={editData.status} onChange={handleChange} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <PatientQueue />
      <RoomVisualization />
      <AmbulanceOptimization />
    </div>
  );
};

export default StaffDashboard;
