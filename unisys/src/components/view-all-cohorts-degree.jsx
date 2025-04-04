import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewAllCohortsDegree() {
  const [data, setData] = useState([]);
  const { degree } = useParams();

  useEffect(() => {
    let apiUrl = "http://127.0.0.1:8000/api/cohort/";
    if (degree) {
      apiUrl += `?degree=${degree}`;
    }
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [degree]);

  const displayAllCohorts = () => {
    return (
      <div className="container py-5">
        <h1 className="text-center mb-4">Cohorts</h1>
        <div className="row justify-content-center">
          {data.map((cohort, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h2 className="card-title">{cohort.name}</h2>
                  <div className="d-flex justify-content-center mt-3">
                    <a href={`/modules-cohort/${cohort.id}`} className="btn btn-primary">
                      View All Modules
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return displayAllCohorts();
}

export default ViewAllCohortsDegree;
