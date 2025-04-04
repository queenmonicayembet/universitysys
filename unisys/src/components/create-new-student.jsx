import React, { useState } from "react";

const CreateNewStudent = () => {
  const [studentId, setStudentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cohort, setCohort] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/student/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: studentId,
          first_name: firstName,
          last_name: lastName,
          cohort: cohort,
          email,
        }),
      });

      if (response.ok) {
        setMessage("Student created.");
        setStudentId("");
        setFirstName("");
        setLastName("");
        setCohort("");
        setEmail("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error("Error creating student:", error);
      setMessage("An error occurred while creating the student.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 bg-white p-4 rounded shadow">
        <h2 className="text-center mb-4">Create a New Student</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="studentId" className="form-label">Student ID:</label>
            <input
              id="studentId"
              name="studentId"
              type="text"
              required
              className="form-control"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              maxLength={8}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name:</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="form-control"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name:</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="form-control"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cohort" className="form-label">Cohort:</label>
            <input
              id="cohort"
              name="cohort"
              type="text"
              required
              className="form-control"
              placeholder="Enter Cohort"
              value={cohort}
              onChange={(e) => setCohort(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Create Student
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

export default CreateNewStudent;
