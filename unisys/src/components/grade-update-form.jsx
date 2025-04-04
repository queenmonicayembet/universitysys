import React, { useState, useEffect } from "react";

const GradeUpdateForm = ({ grade, student }) => {
  const [caMark, setCaMark] = useState(grade.ca_mark);
  const [examMark, setExamMark] = useState(grade.exam_mark);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCaMark(grade.ca_mark);
    setExamMark(grade.exam_mark);
  }, [grade]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/grade/${grade.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ca_mark: caMark,
            exam_mark: examMark,
            total_grade:
              caMark * (grade.ca_split / 100) +
              examMark * (1 - grade.ca_split / 100),
          }),
        }
      );

      if (response.ok) {
        setMessage("Grade updated successfully.");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error("Error updating grade:", error);
      setMessage("An error occurred while updating the grade.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 bg-white p-4 rounded shadow">
        <h2 className="text-center mb-4">
          Update {student}'s Grade for Module{" "}
          {grade.module.split("/").filter((part) => !!part).pop()}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="caMark" className="form-label">CA Mark:</label>
            <input
              id="caMark"
              name="caMark"
              type="number"
              required
              className="form-control"
              placeholder="Enter CA Mark"
              value={caMark}
              onChange={(e) => setCaMark(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="examMark" className="form-label">Exam Mark:</label>
            <input
              id="examMark"
              name="examMark"
              type="number"
              required
              className="form-control"
              placeholder="Enter Exam Mark"
              value={examMark}
              onChange={(e) => setExamMark(e.target.value)}
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

export default GradeUpdateForm;
