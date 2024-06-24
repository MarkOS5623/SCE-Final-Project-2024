import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { login } from '../../api/user_requests';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await login(email, password)
      if (!response.status === 200) {
        throw new Error('Login failed');
      } else setError(response.data.message);
      localStorage.setItem('token', response.data.token);
      navigate("/requestmanager");
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Form className="mt-3">
        <Form.Group controlId="formBasicUsername" style={{marginTop: "20px" }}> 
          <Form.Control type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" style={{marginTop: "20px" }}>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" type="button" onClick={handleLogin} style={{marginTop: "10px" }}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
