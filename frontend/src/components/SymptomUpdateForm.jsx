import React from "react";

const SymptomUpdateForm = () => (
  <div className="card mb-3">
    <div className="card-header bg-warning">Update Symptoms</div>
    <div className="card-body">
      <form>
        <div className="mb-3">
          <label htmlFor="symptoms" className="form-label">Symptoms</label>
          <input type="text" className="form-control" id="symptoms" placeholder="Describe your symptoms..." />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  </div>
);

export default SymptomUpdateForm;
