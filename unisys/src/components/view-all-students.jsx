import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function ViewAllStudents() {
  const [data, setData] = useState([]);
  const { cohort } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohort}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [cohort]);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Students in {cohort}</h2>

      <div className="row justify-content-center">
        {data.length > 0 ? (
          data.map((student, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div className="card shadow border-0">
                <div className="card-header bg-brown text-white text-center">
                  <h5 className="mb-0">{student.first_name} {student.last_name}</h5>
                </div>
                <div className="card-body text-center">
                  <p className="mb-2"><strong>ID:</strong> {student.student_id}</p>
                  <a
                    href={`/student/${student.student_id}`}
                    className="btn btn-outline-brown"
                  >
                    View Student Information
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No students found for this cohort.</p>
        )}
      </div>
    </div>
  );
}

export default ViewAllStudents;
