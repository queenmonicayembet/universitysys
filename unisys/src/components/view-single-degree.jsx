import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewSingleDegree() {
  const [data, setData] = useState({});
  const { degree } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/degree/${degree}/`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [degree]);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Degree Information</h1>

      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-3"><strong>Degree Name:</strong></h2>
          <p className="lead">{data.full_name}</p>

          <h2 className="card-title mt-4 mb-3"><strong>Degree Code:</strong></h2>
          <p className="lead">{data.shortcode}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewSingleDegree;
