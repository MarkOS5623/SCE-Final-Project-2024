import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../pics/sce.jpg';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return setIsLoggedIn(false)
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
      const responseData = await response.json();
      if (response.ok) {
        localStorage.removeItem('token', responseData.token);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-primary bg-primary" style={{ height: '70px' }}>
      <div className="container-fluid" >
        <Link className="navbar-brand" to="/"><img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '40px' }}/></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" style={{fontSize: "15px", fontWeight: "bold", color: "white"}}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup"  style={{fontSize: "15px", fontWeight: "bold", color: "white"}}>Sign Up</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button className="nav-link btn btn-outline-light" onClick={handleSignOut}>Sign Out</button>
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
