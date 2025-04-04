import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewSingleStudent() {
  const [data, setData] = useState({});
  const { student } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/student/${student}/`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [student]);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">
        {data.first_name} {data.last_name}'s Profile
      </h1>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header bg-brown text-white">
              <h5 className="mb-0">Student Details</h5>
            </div>
            <div className="card-body">
              <table className="table table-borderless mb-0">
                <tbody>
                  <tr>
                    <th scope="row">Student ID</th>
                    <td>{data.student_id}</td>
                  </tr>
                  <tr>
                    <th scope="row">First Name</th>
                    <td>{data.first_name}</td>
                  </tr>
                  <tr>
                    <th scope="row">Last Name</th>
                    <td>{data.last_name}</td>
                  </tr>
                  <tr>
                    <th scope="row">Cohort</th>
                    <td>{data.cohort}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{data.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSingleStudent;
