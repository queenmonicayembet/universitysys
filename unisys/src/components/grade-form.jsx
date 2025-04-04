import React, { useState, useEffect } from "react";

const GradeForm = ({ cohort }) => {
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [grade, setGrade] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (cohort) {
      fetch(`${cohort}`)
        .then((response) => response.json())
        .then((data) => setModules(data))
        .catch((error) => {
          console.error("Error fetching modules:", error);
          setMessage("Failed to fetch modules.");
        });
    }
  }, [cohort]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/grade/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cohort: cohort,
          module: selectedModule,
          grade: grade,
        }),
      });

      if (response.ok) {
        setMessage("Grade updated successfully.");
        setSelectedModule("");
        setGrade("");
      } else {
        console.error("Error updating grade:", response.statusText);
        setMessage("Failed to update grade.");
      }
    } catch (error) {
      console.error("Error updating grade:", error);
      setMessage("An error occurred while trying to update the grade.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 bg-white p-4 rounded shadow">
        <h2 className="text-center mb-4">Update Student Grades</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="module" className="form-label">Module</label>
            <select
              id="module"
              name="module"
              className="form-select"
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              required
            >
              <option value="">Select a module</option>
              {modules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="grade" className="form-label">Grade</label>
            <input
              id="grade"
              name="grade"
              type="text"
              className="form-control"
              placeholder="Enter Grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update Grade
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

export default GradeForm;
