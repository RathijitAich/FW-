import React from "react";
import { Navbar } from "./navbar";

export const GeneratedPlan = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-center mt-5">Generated Plan</h1>
      
      <div className="container">
        {/* Card 1 */}
        <div className="card mb-4 shadow-sm">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src="pushup_1.png"
                className="img-fluid rounded-start"
                alt="..."
                style={{ maxHeight: "150px", objectFit: "cover" }} // Limit image size and center it
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
              <h5 className="card-title fw-bold">Push ups</h5>
                <p className="card-text">
                  Lie down on your chest and push your body up with your arms.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span>
                    <strong>Sets:</strong> 3
                    <br />
                    <strong>Reps:</strong> 10
                  </span>
                  <a href="#" className="btn btn-dark">
                    Completed
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card bg-light mb-4 shadow-sm">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src="pullup.png"
                className="img-fluid rounded-start"
                alt="..."
                style={{ maxHeight: "150px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title fw-bold">Pull ups</h5>
                <p className="card-text">
                 pull your body up with your arms.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                <span>
                    <strong>Sets:</strong> 3
                    <br />
                    <strong>Reps:</strong> 10
                  </span>
                  <a href="#" className="btn btn-dark">
                    Completed
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-light mb-4 shadow-sm">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src="benchpress.png"
                className="img-fluid rounded-start"
                alt="..."
                style={{ maxHeight: "150px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title fw-bold">bench press</h5>
                <p className="card-text">
                 pull your body up with your arms.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                <span>
                    <strong>Sets:</strong> 3
                    <br />
                    <strong>Reps:</strong> 10
                  </span>
                  <a href="#" className="btn btn-dark">
                    Completed
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-light mb-4 shadow-sm">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src="shoulder_press.png"
                className="img-fluid rounded-start"
                alt="..."
                style={{ maxHeight: "150px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title fw-bold">shoulder press</h5>
                <p className="card-text">
                 pull your body up with your arms.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                <span>
                    <strong>Sets:</strong> 3
                    <br />
                    <strong>Reps:</strong> 10
                  </span>
                  <a href="#" className="btn btn-dark">
                    Completed
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Additional cards can follow the same structure */}
      </div>
    </div>
  );
};
