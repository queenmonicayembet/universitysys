import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";

function ViewAllGrades() {
  const [grades, setGrades] = useState([]);
  const { student } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/grade/?student=${student}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch grades");
      }
      const data = await response.json();
      setGrades(data);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  }, [student]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Grades and Modules</h2>

      {grades.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover align-middle shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Module</th>
                <th>CA Mark</th>
                <th>Exam Mark</th>
                <th>Total Grade</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, index) => {
                const moduleCode = grade.module
                  .split("/")
                  .filter((part) => !!part)
                  .pop();
                return (
                  <tr key={index}>
                    <td>
                      <Link
                        to={`/module/${moduleCode}`}
                        className="text-decoration-none fw-semibold text-primary"
                      >
                        {moduleCode}
                      </Link>
                    </td>
                    <td>{Number(grade.ca_mark).toFixed(2)}</td>
                    <td>{Number(grade.exam_mark).toFixed(2)}</td>
                    <td>{Number(grade.total_grade).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No grades available for this student.</p>
      )}

      <div className="text-center mt-4">
        <Link to={`/update-grades/${student}`} className="btn btn-outline-primary me-2">
          Update Grades
        </Link>
        <Link to="/set-module-grades" className="btn btn-outline-secondary">
          Set Module Grades
        </Link>
      </div>
    </div>
  );
}

export default ViewAllGrades;
