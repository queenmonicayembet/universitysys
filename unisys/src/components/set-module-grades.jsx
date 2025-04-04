import React, { useState } from "react";

const SetModuleGrades = () => {
  const [formData, setFormData] = useState({
    module: "",
    ca_mark: "",
    exam_mark: "",
    cohort: "",
    student: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/grade/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Form submitted successfully.");
        setFormData({
          module: "",
          ca_mark: "",
          exam_mark: "",
          cohort: "",
          student: "",
        });
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 bg-white p-4 rounded shadow">
        <h2 className="text-center mb-4">Set Module Grades</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="module" className="form-label">Module:</label>
            <input
              type="text"
              id="module"
              name="module"
              required
              className="form-control"
              placeholder="Enter Module"
              value={formData.module}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="ca_mark" className="form-label">CA Mark:</label>
            <input
              type="number"
              id="ca_mark"
              name="ca_mark"
              required
              className="form-control"
              placeholder="Enter CA Mark"
              value={formData.ca_mark}
              onChange={handleChange}
              min="0"
              max="100"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exam_mark" className="form-label">Exam Mark:</label>
            <input
              type="number"
              id="exam_mark"
              name="exam_mark"
              required
              className="form-control"
              placeholder="Enter Exam Mark"
              value={formData.exam_mark}
              onChange={handleChange}
              min="0"
              max="100"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cohort" className="form-label">Cohort:</label>
            <input
              type="text"
              id="cohort"
              name="cohort"
              required
              className="form-control"
              placeholder="Enter Cohort"
              value={formData.cohort}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="student" className="form-label">Student:</label>
            <input
              type="text"
              id="student"
              name="student"
              required
              className="form-control"
              placeholder="Enter Student"
              value={formData.student}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>

        {message && (
          <div className="alert alert-info mt-3 text-center" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SetModuleGrades;
