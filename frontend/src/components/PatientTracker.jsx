import React, { useState } from "react";

const PatientTracker = () => {
  const [searchData, setSearchData] = useState({
    patientId: "",
    patientName: "",
    familyCode: ""
  });
  const [patientInfo, setPatientInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock patient data - in a real app, this would come from an API
  const mockPatients = [
    {
      id: "P001",
      name: "John Smith",
      familyCode: "FAM123",
      roomNumber: "301",
      status: "Active",
      estimatedDischarge: "2024-01-15",
      visitorHours: "10:00 AM - 8:00 PM",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      admissionDate: "2024-01-10",
      lastUpdate: "2024-01-12 2:30 PM"
    },
    {
      id: "P002", 
      name: "Mary Johnson",
      familyCode: "FAM456",
      roomNumber: "205",
      status: "Active",
      estimatedDischarge: "2024-01-18",
      visitorHours: "10:00 AM - 8:00 PM",
      doctor: "Dr. Michael Chen",
      department: "Orthopedics",
      admissionDate: "2024-01-11",
      lastUpdate: "2024-01-12 3:45 PM"
    },
    {
      id: "P003",
      name: "Robert Wilson",
      familyCode: "FAM789",
      roomNumber: "412",
      status: "Discharged",
      estimatedDischarge: "2024-01-12",
      visitorHours: "N/A",
      doctor: "Dr. Emily Davis",
      department: "General Surgery",
      admissionDate: "2024-01-08",
      lastUpdate: "2024-01-12 11:00 AM"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setPatientInfo(null);

    // Simulate API call delay
    setTimeout(() => {
      const foundPatient = mockPatients.find(patient => 
        (searchData.patientId && patient.id === searchData.patientId) ||
        (searchData.patientName && patient.name.toLowerCase().includes(searchData.patientName.toLowerCase())) ||
        (searchData.familyCode && patient.familyCode === searchData.familyCode)
      );

      if (foundPatient) {
        setPatientInfo(foundPatient);
      } else {
        setError("Patient not found. Please check your information and try again.");
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'waiting':
        return 'status-waiting';
      case 'discharged':
        return 'status-discharged';
      default:
        return 'status-waiting';
    }
  };

  return (
    <div className="healthcare-container">
      <div className="healthcare-header">
        <h1>Patient Tracker</h1>
        <p>Search for patient information using Patient ID, Name, or Family Code</p>
      </div>

      <div className="search-form">
        <h2>Search Patient Information</h2>
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label className="form-label" htmlFor="patientId">Patient ID</label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              className="form-control"
              value={searchData.patientId}
              onChange={handleInputChange}
              placeholder="Enter Patient ID (e.g., P001)"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="patientName">Patient Name</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              className="form-control"
              value={searchData.patientName}
              onChange={handleInputChange}
              placeholder="Enter Patient Name"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="familyCode">Family Code</label>
            <input
              type="text"
              id="familyCode"
              name="familyCode"
              className="form-control"
              value={searchData.familyCode}
              onChange={handleInputChange}
              placeholder="Enter Family Code (e.g., FAM123)"
            />
          </div>
          
          <button type="submit" className="search-button" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search Patient"}
          </button>
        </form>
      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="loading">
          <p>Searching for patient information...</p>
        </div>
      )}

      {patientInfo && (
        <div className="patient-info-grid">
          <div className="patient-info-item">
            <h3>Patient Information</h3>
            <div className="info-row">
              <span className="info-label">Patient ID:</span>
              <span className="info-value">{patientInfo.id}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Name:</span>
              <span className="info-value">{patientInfo.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Status:</span>
              <span className={`info-value status-badge ${getStatusClass(patientInfo.status)}`}>
                {patientInfo.status}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Department:</span>
              <span className="info-value">{patientInfo.department}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Attending Doctor:</span>
              <span className="info-value">{patientInfo.doctor}</span>
            </div>
          </div>

          <div className="patient-info-item">
            <h3>Location & Schedule</h3>
            <div className="info-row">
              <span className="info-label">Room Number:</span>
              <span className="info-value">{patientInfo.roomNumber}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Admission Date:</span>
              <span className="info-value">{patientInfo.admissionDate}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Estimated Discharge:</span>
              <span className="info-value">{patientInfo.estimatedDischarge}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Visitor Hours:</span>
              <span className="info-value">{patientInfo.visitorHours}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Last Updated:</span>
              <span className="info-value">{patientInfo.lastUpdate}</span>
            </div>
          </div>
        </div>
      )}

      {patientInfo && (
        <div className="healthcare-card">
          <div className="healthcare-card-header">
            Important Information for Visitors
          </div>
          <div className="healthcare-card-body">
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>Please check in at the front desk before visiting</li>
              <li>Wash your hands before and after visiting</li>
              <li>Limit visitors to 2 people at a time</li>
              <li>Quiet hours are from 10:00 PM to 6:00 AM</li>
              <li>If you have any symptoms of illness, please postpone your visit</li>
              <li>For emergency contact, call the nurse station at extension 1000</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientTracker; 