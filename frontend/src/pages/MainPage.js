import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import backgroundImage from '../assests/LoginPage.png'; // Import the background image
import logoImg from '../assests/sce.jpg'; // Import the logo image
import CardContainer from '../components/cardContainer';

function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          navigate('/student');
        } else {
          console.log('No token found:');
        }
      } catch (error) {
        console.error('Network error while checking token status:', error);
      }
    };
    checkLoggedIn();
  }, [navigate]);

  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    }}>
      <CardContainer style={{ width: '500px', padding: '20px' }}>
        <Card.Title>
          <img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '125px', marginBottom: "40px" }} />
          <br />SCE Document Manager
        </Card.Title>
        <Card.Text>Please sign in or sign up to continue.</Card.Text>
        <div>
          <Link to="/login" className="btn btn-primary me-3">Login</Link>
          <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
        </div>
      </CardContainer>
    </div>
  );
}

export default MainPage;
