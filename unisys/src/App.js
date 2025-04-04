import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [studentId, setStudentId] = useState("");
  const [studentList, setStudentList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/student/")
      .then((response) => response.json())
      .then((data) => setStudentList(data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  const handleSearch = () => {
    if (studentId.trim() !== "") {
      navigate(`/student/${studentId}`);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center min-vh-100 justify-content-center">
      <h1 className="text-center fw-bold mb-4">School of Computing University System</h1>
      <h3 className="text-center fw-bold mb-4">By Queen-Monica Yembet (23448172)</h3>

      <div className="col-md-6 mb-4 p-3 border rounded shadow-sm">
        <h5 className="text-center">Search Student by ID</h5>
        <div className="input-group">
          <select
            className="form-select"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          >
            <option value="">Select Student ID</option>
            {studentList.map((student) => (
              <option key={student.student_id} value={student.student_id}>
                {student.student_id} - {student.first_name} {student.last_name}
              </option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={handleSearch} disabled={!studentId}>
            Search
          </button>
        </div>
      </div>

      <div className="col-md-6">
        <ul className="list-group">
          <li className="list-group-item border-0">
            <button onClick={() => navigate("/degrees")} className="btn btn-primary btn-lg w-100">
              View All Degrees
            </button>
          </li>
          <li className="list-group-item border-0">
            <button onClick={() => navigate("/cohorts")} className="btn btn-primary btn-lg w-100">
              View All Cohorts
            </button>
          </li>
          <li className="list-group-item border-0">
            <button onClick={() => navigate("/modules")} className="btn btn-primary btn-lg w-100">
              View All Modules
            </button>
          </li>
          <li className="list-group-item border-0">
            <button onClick={() => navigate("/create-degree")} className="btn btn-primary btn-lg w-100">
              Create New Degree
            </button>
          </li>
          <li className="list-group-item border-0">
            <button onClick={() => navigate("/create-cohort")} className="btn btn-primary btn-lg w-100">
              Create New Cohort
            </button>
          </li>
          <li className="list-group-item border-0">
            <button onClick={() => navigate("/create-module")} className="btn btn-primary btn-lg w-100">
              Create New Module
            </button>
          </li>
          <li className="list-group-item border-0">
            <button onClick={() => navigate("/create-student")} className="btn btn-primary btn-lg w-100">
              Create New Student
            </button>
          </li>
          <li className="list-group-item border-0">
            <button onClick={() => navigate("/set-module-grades")} className="btn btn-primary btn-lg w-100">
              Set Module Grades
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
