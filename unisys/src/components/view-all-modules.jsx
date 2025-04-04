import { useState, useEffect } from "react";

function ViewAllModules() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/module/")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">All Modules</h1>
      <div className="row justify-content-center">
        {data.map((module, index) => (
          <div key={index} className="col-md-8 col-lg-6 mb-4"> 
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">
                  {module.code} - {module.full_name}
                </h5>
                <p className="card-text">
                  <strong>CA Split:</strong> {module.ca_split}
                </p>
                <p className="card-text">
                  <strong>Delivered To:</strong> {module.delivered_to}
                </p>
                <a href={`/module/${module.code}`} className="btn btn-primary mt-3">
                  View Module
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewAllModules;
