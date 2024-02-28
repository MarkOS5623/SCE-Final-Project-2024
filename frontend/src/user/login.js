import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import logoImg from '../pics/sce.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      const responseData = await response.json();
      console.log(responseData);
      localStorage.setItem('token', responseData.token);
      window.location.href = '/'; 
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('Invalid username or password');
    }
  };

  const handleReset = async () => {
    navigate("/passrest");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100" style={{ paddingBottom: "20vh" }}>
      <Card className="mt-3" bg="primary" text="white" style={{ width: '400px' }}>
        <Card.Body>
        <Card.Title style={{ fontSize: "30px" }}><img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '100px', marginBottom: "20px", marginTop: "30px" }}/><br/></Card.Title>
          <Form className="mt-3">
            <Form.Group controlId="formBasicUsername" style={{marginTop: "20px" }}> 
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" style={{marginTop: "20px" }}>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="button" onClick={handleLogin} style={{marginTop: "10px" }}>
              Login
            </Button>
          </Form>
          <Button variant="secondary" type="button" onClick={handleReset} style={{ marginRight: "5px", marginTop: "10px" }}>
              Forgot Password
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
