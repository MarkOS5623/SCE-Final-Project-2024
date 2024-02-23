import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card text-center text-white bg-dark">
        <div className="card-body">
          <h5 className="card-title">SCE Document Manager</h5>
          <p className="card-text">Please sign in or sign up to continue.</p>
          <div>
            <Link to="/login" className="btn btn-primary me-3">login</Link>
            <Link to="/signup" className="btn btn-success">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
