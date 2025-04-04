import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ViewAllDegrees() {
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/degree/")
      .then((response) => response.json())
      .then((data) => setDegrees(data));
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">All Degrees</h1>
      <div className="row justify-content-center">
        {degrees.map((degree, index) => (
          <div key={index} className="col-md-8 col-lg-8 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h2 className="card-title">{degree.full_name}</h2>
                <p className="text-muted">Shortcode: <strong>{degree.shortcode}</strong></p>
                <a href={`/degree/${degree.shortcode}`} className="btn btn-primary mt-3">
                  View Degree and Cohorts
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
