import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GradeUpdateForm from "./grade-update-form";

const GradeUpdateList = ({ studentId }) => {
  const [grades, setGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { student } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/grade/?student=${student}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch grades");
        }
        const data = await response.json();
        setGrades(data);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching grades");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [student]);

  const handleAddInfo = () => {
    setGrades([
      ...grades,
      {
        id: "",
        module: "",
        ca_mark: 0,
        exam_mark: 0,
        cohort: "",
        total_grade: 0,
        student: `${student}`,
      },
    ]);
  };

  return (
    <div className="container py-5">
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {!isLoading && !error && (
        <div>
          {grades.length === 0 ? (
            <div className="text-center">
              <p>No grades found.</p>
              <button onClick={handleAddInfo} className="btn btn-primary mt-3">
                Add Information
              </button>
            </div>
          ) : (
            <>
              {grades.map((grade, index) => (
                <div key={index} className="mt-4">
                  <GradeUpdateForm grade={grade} student={student} />
                  <hr className="my-4" />
                </div>
              ))}

              <div className="text-center">
                <button
                  onClick={handleAddInfo}
                  className="btn btn-secondary mt-3"
                >
                  Add More Information
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GradeUpdateList;
