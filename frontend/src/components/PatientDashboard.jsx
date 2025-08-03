import React, { useState } from "react";
import WaitTimeDisplay from "./WaitTimeDisplay";
import ProgressReport from "./ProgressReport";

const PatientDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setUploadStatus("File selected: " + file.name);
      } else {
        setUploadStatus("Please select an image file");
        setSelectedFile(null);
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Simulate upload process
      setUploadStatus("Uploading...");
      setTimeout(() => {
        setUploadStatus("Health card uploaded successfully!");
        setSelectedFile(null);
      }, 2000);
    } else {
      setUploadStatus("Please select a file first");
    }
  };

  return (
    <div className="healthcare-container">
      <div className="healthcare-header">
        <h1>Patient Dashboard</h1>
        <p>Monitor your wait time and treatment progress</p>
      </div>
      <WaitTimeDisplay />
      <ProgressReport />
      
      <div className="healthcare-card">
        <div className="healthcare-card-header">Upload Health Card</div>
        <div className="healthcare-card-body">
          <div className="form-group">
            <label className="form-label">Select Health Card Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
              style={{ padding: '0.5rem' }}
            />
          </div>
          
          {selectedFile && (
            <div className="patient-info-item" style={{ marginTop: '1rem' }}>
              <div className="info-row">
                <span className="info-label">Selected File:</span>
                <span className="info-value">{selectedFile.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">File Size:</span>
                <span className="info-value">{(selectedFile.size / 1024).toFixed(2)} KB</span>
              </div>
            </div>
          )}
          
          <button 
            type="button" 
            className="search-button" 
            onClick={handleUpload}
            disabled={!selectedFile}
            style={{ marginTop: '1rem' }}
          >
            Upload Health Card
          </button>
          
          {uploadStatus && (
            <div className={uploadStatus.includes("successfully") ? "success" : uploadStatus.includes("Please") ? "error" : "loading"} style={{ marginTop: '1rem' }}>
              {uploadStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
