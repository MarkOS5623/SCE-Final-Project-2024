import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fname: '',
    lname: '',
    id: '', 
  });
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('User signed up successfully');
        navigate("/");
      } else {
        console.error('Failed to sign up:', response.statusText);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100" style={{ paddingBottom: "20vh"}}>
          <Card className="mt-3" bg="primary" text="white" style={{ width: "500px" }}>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="fname" 
                    value={formData.fname} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="lname" 
                    value={formData.lname} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Personal ID:</Form.Label> {/* New field */}
                  <Form.Control 
                    type="text" 
                    name="id" 
                    value={formData.id} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit">Signup</Button>
              </Form>
            </Card.Body>
          </Card>
    </Container>
  );
}

export default Signup;
