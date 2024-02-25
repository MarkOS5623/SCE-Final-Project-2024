import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token')
        if(!token) return setIsLoggedIn(false)
        const response = await fetch('http://localhost:5000/api/users/checkLogin', {
          headers: {
            'authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          console.error('Error checking login status:', response.statusText);
        }
      } catch (error) {
        console.error('Network error while checking login status:', error);
      }
    };
    checkLoggedIn();
  }, []);
  

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/users/logout', {
        headers: {
          'authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">My App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={handleSignOut}>Sign Out</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
