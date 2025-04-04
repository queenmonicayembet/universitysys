import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewAllModulesCohort() {
  const [data, setData] = useState([]);
  const { module } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${module}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [module]);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">All {module} Modules</h1>
      <div className="row justify-content-center">
        {data.map((module, index) => (
          <div key={index} className="col-md-8 col-lg-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">
                  {module.code} - {module.full_name}
                </h5>
                <a href={`/module/${module.code}`} className="btn btn-primary mt-3">
                  View Module Info
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewAllModulesCohort;
