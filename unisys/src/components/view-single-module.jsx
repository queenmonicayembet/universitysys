import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewSingleModule() {
  const [data, setData] = useState({});
  const { module } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/module/${module}/`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [module]);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Module Information</h1>

      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title"><strong>Module Name:</strong></h2>
          <p className="lead">{data.full_name}</p>

          <h2 className="card-title mt-4"><strong>Module Code:</strong></h2>
          <p className="lead">{data.code}</p>

          <h2 className="card-title mt-4"><strong>CA Split:</strong></h2>
          <p className="lead">{data.ca_split}</p>

          <h2 className="card-title mt-4"><strong>Delivered To:</strong></h2>
          <ul className="list-group">
            {data.delivered_to &&
              data.delivered_to.map((item, index) => (
                <li key={index} className="list-group-item">
                  <a href={item} className="text-primary text-decoration-none">
                    {item}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewSingleModule;
