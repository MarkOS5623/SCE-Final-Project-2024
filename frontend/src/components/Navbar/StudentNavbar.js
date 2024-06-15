import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assests/sce.jpg';
import { decodeValue } from '../../api/utils';

const StudentNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
          const response = await decodeValue(JSON.stringify({ token: token }));
          if (response.data.user.role === 'admin') setIsAdmin(true);
        }
      } catch (error) {
        console.error('Network error while checking token status:', error);
      }
    };
    checkLoggedIn();
  }, []);

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token && isLoggedIn === true) {
        localStorage.removeItem('token', token);
        setIsLoggedIn(false);
        navigate('/');
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-primary bg-secondary" style={{ height: '70px' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/student"><img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '40px' }} /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {isAdmin && (
          <li className="nav-item">
            <span className="nav-link" style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}>logged user is an admin</span>
          </li>
        )}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/accountinfopage" style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}>Account Info</Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/staff" style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}>Staff Page</Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <button className="nav-link btn" style={{color: 'white', fontWeight: "bold"}} onClick={handleSignOut}>Sign Out</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
