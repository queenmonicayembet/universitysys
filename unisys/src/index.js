import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";
import ViewAllDegrees from "./components/view-all-degrees";
import ViewSingleDegree from "./components/view-single-degree";
import ViewAllCohorts from "./components/view-all-cohorts";
import ViewSingleCohort from "./components/view-single-cohort";
import ViewAllModules from "./components/view-all-modules";
import ViewSingleModule from "./components/view-single-module";
import ViewSingleStudent from "./components/view-single-student";
import ViewAllGrades from "./components/view-all-grades";
import ViewAllModulesCohort from "./components/view-all-modules-cohort";
import CreateNewDegree from "./components/create-new-degree";
import CreateNewCohort from "./components/create-new-cohort";
import CreateNewModule from "./components/create-new-module";
import CreateNewStudent from "./components/create-new-student";
import SetModuleGrades from "./components/set-module-grades";
import ViewAllCohortsDegree from "./components/view-all-cohorts-degree";
import ViewAllStudents from "./components/view-all-students";
import GradeUpdateList from "./components/grade-update-list";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create-degree" element={<CreateNewDegree />} />
        <Route path="/create-cohort" element={<CreateNewCohort />} />
        <Route path="/create-module" element={<CreateNewModule />} />
        <Route path="/create-student" element={<CreateNewStudent />} />
        <Route path="/update-grades/:student" element={<GradeUpdateList />} />
        <Route path="/set-module-grades" element={<SetModuleGrades />} />

        <Route
          path="/degrees"
          element={
            <div className="container mt-3 text-center">
              <ViewAllDegrees />
              <Link to="/create-degree" className="btn btn-primary mt-3">
                Create New Degree
              </Link>
            </div>
          }
        />

        <Route
          path="/cohorts"
          element={
            <div className="container mt-3 text-center">
              <ViewAllCohorts />
              <Link to="/create-cohort" className="btn btn-primary mt-3">
                Create New Cohort
              </Link>
            </div>
          }
        />

        <Route
          path="/modules"
          element={
            <div className="container mt-3 text-center">
              <ViewAllModules />
              <Link to="/create-module" className="btn btn-primary mt-3">
                Create New Module
              </Link>
            </div>
          }
        />

        <Route
          path="/degree/:degree"
          element={
            <div className="container mt-3 text-center">
              <ViewSingleDegree />
              <ViewAllCohortsDegree />
              <Link to="/create-degree" className="btn btn-primary mt-3">
                Create New Degree
              </Link>
            </div>
          }
        />

        <Route
          path="/cohort/:cohort"
          element={
            <div className="container mt-3 text-center">
              <ViewSingleCohort />
              <Link to="/create-student" className="btn btn-primary mt-3">
                Create New Student
              </Link>
            </div>
          }
        />

        <Route
          path="/module/:module"
          element={
            <div className="container mt-3 text-center">
              <ViewSingleModule />
              <Link to="/create-module" className="btn btn-primary mt-3">
                Create New Module
              </Link>
            </div>
          }
        />

        <Route
          path="/student/:student"
          element={
            <div className="container mt-3 text-center">
              <ViewSingleStudent />
              <ViewAllGrades />
              <Link to="/create-student" className="btn btn-primary mt-3">
                Create New Student
              </Link>
            </div>
          }
        />

        <Route
          path="/modules-cohort/:module"
          element={
            <div className="container mt-3 text-center">
              <ViewAllModulesCohort />
              <Link to="/create-module" className="btn btn-primary mt-3">
                Create New Module
              </Link>
            </div>
          }
        />

        <Route
          path="/students/:cohort"
          element={
            <div className="container mt-3 text-center">
              <ViewAllStudents />
              <Link to="/create-student" className="btn btn-primary mt-3">
                Create New Student
              </Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
