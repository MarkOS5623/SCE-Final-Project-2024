import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import logoImg from '../assests/sce.jpg';

function LoginCard() {

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          navigate('/student')
        } else {
          console.error('Error checking token status:', token);
        }
      } catch (error) {
        console.error('Network error while checking token status:', error);
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100" style={{ paddingBottom: "20vh" }}>
      <Card bg="primary" text="white" className="text-center">
        <Card.Body>
          <Card.Title><img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '125px', marginBottom: "40px", marginTop: "30px" }}/>
          <br/>SCE Document Manager</Card.Title>
          <Card.Text>Please sign in or sign up to continue.</Card.Text>
          <div>
            <Link to="/login" className="btn btn-primary me-3">Login</Link>
            <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginCard;
