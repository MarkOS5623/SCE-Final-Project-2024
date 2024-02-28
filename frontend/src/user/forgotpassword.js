import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import logoImg from '../pics/sce.jpg';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    fetch('http://localhost:5000/api/users/passrest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to send password reset email');
    })
    .then(data => {
      setMessage(data.message);
    })
    .catch(error => {
      console.error('Error sending password reset email:', error);
      setMessage('Failed to send password reset email');
    });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100" style={{ paddingBottom: "20vh" }}>
      <Card bg="primary" style={{ width: '400px' }}>
        <Card.Body>
          <h2 className="text-center" style={{ color: 'white' }}><img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '100px', marginBottom: "40px", marginTop: "30px" }}/>
          <br/>Password Reset</h2>
          {message && <Alert variant="success">{message}</Alert>}
          <Form>
            <Form.Group style={{ marginBottom: "20px", marginTop: "30px" }}>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleSend} block>
              Send
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ForgotPassword;
