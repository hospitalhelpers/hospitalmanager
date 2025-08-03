import React, { useState, useEffect } from "react";
import PatientQueue from "./PatientQueue";
import RoomVisualization from "./RoomVisualization";
import Navbar from "./Navbar";

//const patients = [
//  { id: 1, name: "John Doe", priority: "Level 1 - Resuscitation", symptoms: "", status: "Waiting for doctor" },
//  { id: 2, name: "Jane Smith", priority: "Level 3 - Urgent", symptoms: "", status: "Vitals taken" },
//  { id: 3, name: "Sam Lee", priority: "Level 5 - Non-Urgent", symptoms: "", status: "Checked in" },
//];
var patients = []

const priorityOrder = [
  "Level 1 - Resuscitation",
  "Level 2 - Emergent",
  "Level 3 - Urgent",
  "Level 4 - Less Urgent",
  "Level 5 - Non-Urgent"
];
const priorityColors = {
  "Level 1 - Resuscitation": "status-blue", // blue
  "Level 2 - Emergent": "status-red",      // red
  "Level 3 - Urgent": "status-yellow",         // yellow
  "Level 4 - Less Urgent": "status-green",   // green
  "Level 5 - Non-Urgent": "status-white"        // white
};

const StaffDashboard = () => {
  const [patientsState, setPatientsState] = useState(patients);
  const [selectedPatient, setSelectedPatient] = useState(patientsState[0]);
  const [editData, setEditData] = useState(selectedPatient);
  const [symptomInput, setSymptomInput] = useState("");
  const [admitted, setAdmitted] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    healthId: "",
    priority: "Level 5 - Non-Urgent",
    symptoms: [],
    status: "Checked in"
  });
  const [newSymptomInput, setNewSymptomInput] = useState("");
  const [showPriorityPopup, setShowPriorityPopup] = useState(false);
  const [priorityExplanation, setPriorityExplanation] = useState("");


  useEffect(() => {
    // fetch from the backend the json of cases
//    {
//      "0": {
//        "id": 0,
//        "healthId": "4567890123",
//        "patientName": "David Thompson",
//        "symptoms": [],
//        "status": "waiting",
//        "priority": 0,
//        "age": 45
//      },

//      "1": {
//        "id": 1,
//        "healthId": "3456789012",
//        "patientName": "Emily Rodriguez",
//        "symptoms": [],
//        "status": "waiting",
//        "priority": 0,
//        "age": 28
//      }
//    }
    fetch("https://127.0.0.1:3000/get_current_cases", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({input: ""})
    })
    .then(response => {
      jsonresp = response.json()
      // we convert this json into a list
      for (const key in jsonresp) {
        console.log(`${key}: ${jsonresp[key]}`);
        newjson = {
            id : jsonresp[key].id,
            name : jsonresp[key].patientName,
            priority : jsonresp[key].priority,
            symptoms : jsonresp[key].symptoms,
            status : jsonresp[key].status,
            healthId : jsonresp[key].healthId,
        }
        patients.push(newjson)
      }
      setPatientsState(patients)
    })
    .then(result => console.log(result))
    .catch(error => console.error('Error:', error));
  }, []);

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
    setPatientsState(patientsState.filter(p => p.id !== editData ? editData.id : "something"));
    alert(`Patient ${editData ? editData.name : "something"} admitted!`);
    // Optionally clear selection if no patients left
    if (patientsState.length === 1) {
      setSelectedPatient(null);
      setEditData({});
      setAdmitted(false);
    } else {
      const nextPatient = patientsState.find(p => p.id !== editData ? editData.id : "something");
      setSelectedPatient(nextPatient);
      setEditData(nextPatient);
      setAdmitted(false);
    }
  };

  const handleAddNewPatient = () => {
    if (newPatient.name.trim() === "") {
      alert("Please enter a patient name");
      return;
    }
    
    // Generate default explanation based on priority level
    const explanations = {
      "Level 1 - Resuscitation": "Patient requires immediate resuscitation due to life-threatening symptoms. This level is assigned for patients with severe trauma, cardiac arrest, or other critical conditions.",
      "Level 2 - Emergent": "Patient has emergent conditions requiring immediate medical attention. This level is assigned for patients with severe pain, altered mental status, or other serious symptoms.",
      "Level 3 - Urgent": "Patient has urgent conditions that require prompt medical care. This level is assigned for patients with moderate pain, fever, or other concerning symptoms.",
      "Level 4 - Less Urgent": "Patient has less urgent conditions that can wait for medical attention. This level is assigned for patients with minor injuries or stable conditions.",
      "Level 5 - Non-Urgent": "Patient has non-urgent conditions that can wait for routine medical care. This level is assigned for patients with minor complaints or follow-up visits."
    };
    
    setPriorityExplanation(explanations[newPatient.priority] || "Priority level assigned based on patient symptoms and condition.");
    setShowPriorityPopup(true);
  };

  const handleNewPatientChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewSymptomInputChange = (e) => {
    setNewSymptomInput(e.target.value);
  };

  const handleNewSymptomInputKeyDown = (e) => {
    if (e.key === "Enter" && newSymptomInput.trim() !== "") {
      e.preventDefault();
      setNewPatient(prev => ({
        ...prev,
        symptoms: [...prev.symptoms, { text: newSymptomInput.trim(), timestamp: new Date().toLocaleString() }]
      }));
      setNewSymptomInput("");
    }
  };

  const handleDeleteNewSymptom = (idx) => {
    setNewPatient(prev => ({
      ...prev,
      symptoms: prev.symptoms.filter((_, i) => i !== idx)
    }));
  };

  const handleConfirmPriority = () => {
    const patientToAdd = {
      ...newPatient,
      id: Math.max(...patientsState.map(p => p.id)) + 1
    };
    
    setPatientsState([...patientsState, patientToAdd]);
    setNewPatient({
      name: "",
      age: "",
      healthId: "",
      priority: "Level 5 - Non-Urgent",
      symptoms: [],
      status: "Checked in"
    });
    setNewSymptomInput("");
    setShowAddForm(false);
    setShowPriorityPopup(false);
    alert(`Patient ${patientToAdd.name} added to queue!`);
  };

  const handleDenyPriority = () => {
    setShowPriorityPopup(false);
    // Keep the form open so staff can modify the priority or symptoms
  };

  return (
    <div>
    <Navbar />
    <div className="healthcare-container">
      <div className="healthcare-header">
        <h1>Staff Dashboard</h1>
        <p>Manage patient queue and treatment information</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div className="healthcare-card">
          <div className="healthcare-card-header">
            Patient Queue
            <button 
              className="search-button" 
              style={{ 
                float: 'right', 
                width: 'auto', 
                padding: '0.5rem 1rem', 
                fontSize: '0.875rem',
                marginTop: '-0.5rem'
              }}
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? 'Cancel' : 'Add New Patient'}
            </button>
          </div>
          <div className="healthcare-card-body" style={{ padding: 0 }}>
            {showAddForm && (
              <div className="patient-info-item" style={{ margin: '1rem', border: '2px solid var(--primary-blue)' }}>
                <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Add New Patient</h3>
                <div className="form-group">
                  <label className="form-label">Name *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="name" 
                    value={newPatient.name} 
                    onChange={handleNewPatientChange} 
                    placeholder="Enter patient name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Age</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="age" 
                    value={newPatient.age} 
                    onChange={handleNewPatientChange} 
                    placeholder="Enter age"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Health ID</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="healthId" 
                    value={newPatient.healthId} 
                    onChange={handleNewPatientChange} 
                    placeholder="Enter health ID"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select 
                    className="form-control" 
                    name="priority" 
                    value={newPatient.priority} 
                    onChange={handleNewPatientChange}
                  >
                    <option>Level 1 - Resuscitation</option>
                    <option>Level 2 - Emergent</option>
                    <option>Level 3 - Urgent</option>
                    <option>Level 4 - Less Urgent</option>
                    <option>Level 5 - Non-Urgent</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Symptoms</label>
                  <input
                    type="text"
                    className="form-control"
                    name="symptomInput"
                    value={newSymptomInput}
                    onChange={handleNewSymptomInputChange}
                    onKeyDown={handleNewSymptomInputKeyDown}
                    placeholder="Type symptom and press Enter"
                  />
                  {newPatient.symptoms.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                      {newPatient.symptoms.map((symptom, idx) => (
                        <div key={idx} className="patient-info-item" style={{ margin: '0.5rem 0' }}>
                          <div className="info-row">
                            <span className="info-label">{symptom.text}</span>
                            <button
                              type="button"
                              className="search-button"
                              style={{ width: 'auto', padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                              onClick={() => handleDeleteNewSymptom(idx)}
                            >Delete</button>
                          </div>
                          <div className="info-row">
                            <span className="info-label">Time:</span>
                            <span className="info-value">{symptom.timestamp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button 
                  type="button" 
                  className="search-button" 
                  onClick={handleAddNewPatient}
                  style={{ marginTop: '0.5rem' }}
                >
                  Add Patient to Queue
                </button>
              </div>
            )}
            <div style={{overflowY: 'auto' }}>
              {patientsState
                .slice() // copy array
                .sort((a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority))
                .map((patient) => (
                  <div
                    key={patient.id}
                    className={`patient-info-item ${selectedPatient && selectedPatient.id === patient.id ? 'selected' : ''}`}
                    style={{ 
                      cursor: "pointer", 
                      margin: '0.5rem',
                      border: selectedPatient && selectedPatient.id === patient.id ? '2px solid var(--primary-blue)' : '1px solid var(--border-color)',
                      fontWeight: selectedPatient && selectedPatient.id === patient.id ? "bold" : "normal"
                    }}
                    onClick={() => handleSelect(patient)}
                  >
                    <div className="info-row">
                      <span className="info-label">{patient.name}</span>
                      <span className={`status-badge ${priorityColors[patient.priority]}`}>
                        {patient.priority}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Status:</span>
                      <span className="info-value">{patient.status}</span>
                    </div>
                    {selectedPatient && selectedPatient.id === patient.id && (
                      <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                        <span className="status-badge status-discharged">Current</span>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        
        <div className="healthcare-card">
          <div className="healthcare-card-header">Patient Information</div>
          <div className="healthcare-card-body">
            <form>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" name="name" value={editData ? editData.name : "something"} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Age</label>
                <input type="number" className="form-control" name="age" value={editData ? editData.age : "something" || ''} onChange={handleChange} placeholder="Enter age" />
              </div>
              <div className="form-group">
                <label className="form-label">Health ID</label>
                <input type="text" className="form-control" name="healthId" value={editData ? editData.healthId : "something" || ''} onChange={handleChange} placeholder="Enter health ID" />
              </div>
              <div className="form-group">
                <label className="form-label">CTAS Priority</label>
                <select className="form-control" name="priority" value={editData ? editData.priority : "something"} onChange={handleChange}>
                  <option>Level 1 - Resuscitation</option>
                  <option>Level 2 - Emergent</option>
                  <option>Level 3 - Urgent</option>
                  <option>Level 4 - Less Urgent</option>
                  <option>Level 5 - Non-Urgent</option>
                </select>
              </div>
              <div className="form-group">
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
                {Array.isArray(editData ? editData.symptoms : "something") && (
                  <div style={{ marginTop: '1rem' }}>
                    {[...editData.symptoms].slice().reverse().map((symptom, idx) => (
                      <div key={idx} className="patient-info-item" style={{ margin: '0.5rem 0' }}>
                        <div className="info-row">
                          <span className="info-label">{symptom.text}</span>
                          <button
                            type="button"
                            className="search-button"
                            style={{ width: 'auto', padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                            onClick={() => handleDeleteSymptom(editData.symptoms.length - 1 - idx)}
                          >Delete</button>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Time:</span>
                          <span className="info-value">{symptom.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button type="button" className="search-button" onClick={handleSave}>Save Changes</button>
              <div style={{ marginTop: '1rem' }}>
                <button
                  type="button"
                  className={`search-button ${admitted ? 'disabled' : ''}`}
                  style={{ 
                    backgroundColor: admitted ? 'var(--medium-gray)' : 'var(--accent-green)',
                    marginTop: '0.5rem'
                  }}
                  onClick={handleConfirmAdmit}
                  disabled={admitted}
                >
                  {admitted ? 'Admitted' : 'Confirm Admission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <RoomVisualization />
      
      
      {/* Priority Explanation Popup */}
      {showPriorityPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="healthcare-card" style={{
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div className="healthcare-card-header">
              Priority Level Explanation
            </div>
            <div className="healthcare-card-body">
              <div className="patient-info-item">
                <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>
                  {newPatient.priority}
                </h3>
                <p style={{ lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {priorityExplanation}
                </p>
                
                {newPatient.symptoms.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>Patient Symptoms:</h4>
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      {newPatient.symptoms.map((symptom, idx) => (
                        <li key={idx} style={{ marginBottom: '0.25rem' }}>
                          {symptom.text} - {symptom.timestamp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button 
                    type="button" 
                    className="search-button" 
                    onClick={handleConfirmPriority}
                    style={{ 
                      backgroundColor: 'var(--accent-green)',
                      flex: 1
                    }}
                  >
                    Confirm & Add Patient
                  </button>
                  <button 
                    type="button" 
                    className="search-button" 
                    onClick={handleDenyPriority}
                    style={{ 
                      backgroundColor: 'var(--medium-gray)',
                      flex: 1
                    }}
                  >
                    Modify Priority
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default StaffDashboard;
