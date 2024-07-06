import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import logoImg from '../../assets/sce.jpg';
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
        <Link className="navbar-brand" to="/requestmanager">
          <img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '40px' }} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {isAdmin && (
                <span className="nav-link" style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}>
                  Logged user is an admin
                </span>
              )}
            </li>
            <li className="nav-item dropdown">
              <DropdownButton
                id="dropdown-basic-button"
                title="Account"
                menuAlign="right"
                variant="secondary"
                className="btn btn-link nav-link"
                style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}
              >
                <Dropdown.Item as={Link} to="/accountinfopage">Account Info</Dropdown.Item>
                {isAdmin && (
                  <Dropdown.Item as={Link} to="/formmanager">Form Manager</Dropdown.Item>
                )}
                {isLoggedIn && (
                  <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                )}
              </DropdownButton>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
