import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewSingleCohort() {
  const [data, setData] = useState({});
  const { cohort } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/cohort/${cohort}/`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [cohort]);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Cohort</h1>

      <div className="card shadow-sm">
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>ID:</strong> {data.id}
            </li>
            <li className="list-group-item">
              <strong>Name:</strong> {data.name}
            </li>
          </ul>
          <div className="text-center mt-3">
            <a href={`/modules-cohort/${data.id}`} className="btn btn-primary">
              View All Modules
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSingleCohort;
