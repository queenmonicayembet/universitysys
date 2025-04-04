import { useState, useEffect } from "react";

function ViewAllCohorts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/cohort/")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">All Cohorts</h1>
      <div className="row justify-content-center">
        {data.map((cohort, index) => (
          <div key={index} className="col-md-8 col-lg-8 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h2 className="card-title">{cohort.name}</h2>
                <div className="d-flex justify-content-center flex-wrap gap-2 mt-3">
                  <a
                    href={`/students/${cohort.id}`}
                    className="btn btn-primary"
                  >
                    View All Students
                  </a>
                  <a
                    href={`/modules-cohort/${cohort.id}`}
                    className="btn btn-primary"
                  >
                    View All Modules
                  </a>
                  <a
                    href={`/cohort/${cohort.id}`}
                    className="btn btn-primary"
                  >
                    View Cohort
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewAllCohorts;
