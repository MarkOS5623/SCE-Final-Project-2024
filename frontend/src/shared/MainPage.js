import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

function MainPage() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card bg="dark" text="white" className="text-center">
        <Card.Body>
          <Card.Title>SCE Document Manager</Card.Title>
          <Card.Text>Please sign in or sign up to continue.</Card.Text>
          <div>
            <Link to="/login" className="btn btn-primary me-3">Login</Link>
            <Link to="/signup" className="btn btn-success">Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MainPage;
