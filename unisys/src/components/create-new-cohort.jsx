import React, { useState } from "react";

const CreateNewCohort = () => {
  const [id, setId] = useState("");
  const [year, setYear] = useState("");
  const [degree, setDegree] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/cohort/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, year: parseInt(year), degree, name }),
      });

      if (response.ok) {
        setMessage("Cohort created successfully.");
        setId("");
        setYear("");
        setDegree("");
        setName("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error("Error creating cohort:", error);
      setMessage("An error occurred while creating the cohort.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 bg-white p-4 rounded shadow">
        <h2 className="text-center mb-4">Create a New Cohort</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="id" className="form-label">
              Cohort ID:
            </label>
            <input
              id="id"
              name="id"
              type="text"
              required
              className="form-control"
              placeholder="Enter Cohort ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="year" className="form-label">
              Year:
            </label>
            <input
              id="year"
              name="year"
              type="number"
              required
              className="form-control"
              placeholder="Enter Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="degree" className="form-label">
              Degree:
            </label>
            <input
              id="degree"
              name="degree"
              type="text"
              required
              className="form-control"
              placeholder="Enter Degree"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="form-control"
              placeholder="Enter Cohort Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Create Cohort
          </button>
        </form>

        {message && (
          <div className="alert alert-info mt-3" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNewCohort;
