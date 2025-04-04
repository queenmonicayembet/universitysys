import React, { useState } from "react";

const CreateNewModule = () => {
  const [code, setCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [deliveredTo, setDeliveredTo] = useState([]);
  const [caSplit, setCaSplit] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/module/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          full_name: fullName,
          delivered_to: deliveredTo,
          ca_split: parseInt(caSplit),
        }),
      });

      if (response.ok) {
        setMessage("Module created successfully.");
        setCode("");
        setFullName("");
        setDeliveredTo([]);
        setCaSplit("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error("Error creating module:", error);
      setMessage("An error occurred while creating the module.");
    }
  };

  const handleDeliveredToChange = (e) => {
    const values = e.target.value.split(",").map((value) => value.trim());
    setDeliveredTo(values);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 bg-white p-4 rounded shadow">
        <h2 className="text-center mb-4">Create a New Module</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="code" className="form-label">Code:</label>
            <input
              id="code"
              name="code"
              type="text"
              required
              className="form-control"
              placeholder="Enter Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={5}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Full Name:</label>
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
            <label htmlFor="deliveredTo" className="form-label">Delivered To:</label>
            <input
              id="deliveredTo"
              name="deliveredTo"
              type="text"
              required
              className="form-control"
              placeholder="Enter Cohort Codes (comma-separated)"
              value={deliveredTo.join(", ")}
              onChange={handleDeliveredToChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="caSplit" className="form-label">CA Split:</label>
            <input
              id="caSplit"
              name="caSplit"
              type="number"
              required
              className="form-control"
              placeholder="Enter CA Split"
              value={caSplit}
              onChange={(e) => setCaSplit(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Create Module
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

export default CreateNewModule;
