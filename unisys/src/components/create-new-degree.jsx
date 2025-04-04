import React, { useState } from "react";

const CreateNewDegree = () => {
  const [fullName, setFullName] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/degree/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ full_name: fullName, shortcode: shortcode }),
      });

      if (response.ok) {
        setMessage("Degree created successfully.");
        setFullName("");
        setShortcode("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error("Error creating degree:", error);
      setMessage("An error occurred while creating the degree.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 bg-white p-4 rounded shadow">
        <h2 className="text-center mb-4">Create a New Degree</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name:
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              className="form-control"
              placeholder="Enter Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="shortcode" className="form-label">
              Shortcode:
            </label>
            <input
              id="shortcode"
              name="shortcode"
              type="text"
              required
              className="form-control"
              placeholder="Enter Shortcode"
              value={shortcode}
              onChange={(e) => setShortcode(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Create Degree
          </button>
        </form>

        {message && (
          <div className="alert alert-info mt-3" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNewDegree;
