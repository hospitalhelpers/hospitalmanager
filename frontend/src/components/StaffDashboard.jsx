import React, { useState } from "react";
import PatientQueue from "./PatientQueue";
import RoomVisualization from "./RoomVisualization";

const patients = [
  { id: 1, name: "John Doe", priority: "Level 1 - Resuscitation", symptoms: "", status: "Waiting for doctor" },
  { id: 2, name: "Jane Smith", priority: "Level 3 - Urgent", symptoms: "", status: "Vitals taken" },
  { id: 3, name: "Sam Lee", priority: "Level 5 - Non-Urgent", symptoms: "", status: "Checked in" },
];

const priorityOrder = [
  "Level 1 - Resuscitation",
  "Level 2 - Emergent",
  "Level 3 - Urgent",
  "Level 4 - Less Urgent",
  "Level 5 - Non-Urgent"
];
const priorityColors = {
  "Level 1 - Resuscitation": "bg-primary text-white", // blue
  "Level 2 - Emergent": "bg-danger text-white",      // red
  "Level 3 - Urgent": "bg-warning text-dark",         // yellow
  "Level 4 - Less Urgent": "bg-success text-white",   // neon green
  "Level 5 - Non-Urgent": "bg-white text-dark"        // white
};

const StaffDashboard = () => {
  const [patientsState, setPatientsState] = useState(patients);
  const [selectedPatient, setSelectedPatient] = useState(patientsState[0]);
  const [editData, setEditData] = useState(selectedPatient);
  const [symptomInput, setSymptomInput] = useState("");
  const [admitted, setAdmitted] = useState(false);

  const handleSelect = (patient) => {
    setSelectedPatient(patient);
    setEditData(patient);
    setSymptomInput("");
    setAdmitted(false);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSymptomInputChange = (e) => {
    setSymptomInput(e.target.value);
  };

  const handleSymptomInputKeyDown = (e) => {
    if (e.key === "Enter" && symptomInput.trim() !== "") {
      e.preventDefault();
      setEditData({
        ...editData,
        symptoms: Array.isArray(editData.symptoms)
          ? [...editData.symptoms, { text: symptomInput.trim(), timestamp: new Date().toLocaleString() }]
          : [{ text: editData.symptoms, timestamp: new Date().toLocaleString() }, { text: symptomInput.trim(), timestamp: new Date().toLocaleString() }].filter(s => s.text)
      });
      setSymptomInput("");
    }
  };

  const handleDeleteSymptom = (idx) => {
    setEditData({
      ...editData,
      symptoms: editData.symptoms.filter((_, i) => i !== idx)
    });
  };

  const handleSave = () => {
    // Update patient in queue
    const updatedPatients = patientsState.map((p) =>
      p.id === editData.id ? { ...editData } : p
    );
    setPatientsState(updatedPatients);
    setSelectedPatient(editData);
    alert("Patient info updated!");
  };

  const handleConfirmAdmit = () => {
    setAdmitted(true);
    // Remove patient from queue
    setPatientsState(patientsState.filter(p => p.id !== editData.id));
    alert(`Patient ${editData.name} admitted!`);
    // Optionally clear selection if no patients left
    if (patientsState.length === 1) {
      setSelectedPatient(null);
      setEditData({});
      setAdmitted(false);
    } else {
      const nextPatient = patientsState.find(p => p.id !== editData.id);
      setSelectedPatient(nextPatient);
      setEditData(nextPatient);
      setAdmitted(false);
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Staff Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-secondary text-white">Patient Queue</div>
            <ul className="list-group list-group-flush">
              {patientsState
                .slice() // copy array
                .sort((a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority))
                .map((patient) => (
                  <li
                    key={patient.id}
                    className={`list-group-item d-flex align-items-center ${priorityColors[patient.priority]}`}
                    style={{ cursor: "pointer", position: "relative", fontWeight: selectedPatient && selectedPatient.id === patient.id ? "bold" : "normal", fontSize: selectedPatient && selectedPatient.id === patient.id ? "1.08rem" : "1rem" }}
                    onClick={() => handleSelect(patient)}
                  >
                    <span>{patient.name}</span>
                    <span className="ms-2">- {patient.priority}</span>
                    {selectedPatient && selectedPatient.id === patient.id && (
                      <span className="badge bg-dark ms-auto" style={{ marginLeft: 'auto' }}>Current</span>
                    )}
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
                  <input
                    type="text"
                    className="form-control"
                    name="symptomInput"
                    value={symptomInput}
                    onChange={handleSymptomInputChange}
                    onKeyDown={handleSymptomInputKeyDown}
                    placeholder="Type symptom and press Enter"
                  />
                  {Array.isArray(editData.symptoms) && (
                    <ul className="list-group mt-2">
                      {[...editData.symptoms].slice().reverse().map((symptom, idx) => (
                        <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                          <span className="flex-grow-1">{symptom.text}</span>
                          <span className="ms-3 text-end" style={{ minWidth: '120px', fontFamily: 'monospace' }}>
                            <small className="text-muted">{symptom.timestamp}</small>
                          </span>
                          <button
                            type="button"
                            className="btn btn-sm btn-danger ms-2"
                            onClick={() => handleDeleteSymptom(editData.symptoms.length - 1 - idx)}
                          >Delete</button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button type="button" className="btn btn-primary px-4 py-2 rounded-pill shadow-sm fw-bold" style={{ fontSize: "1.1rem" }} onClick={handleSave}>Save</button>
                <div className="mb-3 mt-3">
                  <div className="d-flex align-items-center gap-2">
                    <button
                      type="button"
                      className={`btn px-4 py-2 rounded-pill shadow-sm fw-bold ${admitted ? 'btn-secondary' : 'btn-success'}`}
                      style={{ fontSize: "1.1rem" }}
                      onClick={handleConfirmAdmit}
                      disabled={admitted}
                    >
                      <i className="bi bi-check-circle me-2"></i> {admitted ? 'Admitted' : 'Confirm Admission'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <RoomVisualization />
    </div>
  );
};

export default StaffDashboard;
