import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100" style={{ paddingBottom: "20vh" }}>
      <Card className="mt-3" bg="primary" text="white" style={{ width: '400px' }}>
        <Card.Body>
          <Form className="mt-3">
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            <br/>
            <Button variant="primary" type="button" onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
