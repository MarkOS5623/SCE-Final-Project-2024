import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import logoImg from '../../assests/sce.jpg';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fname: '',
    lname: '',
    id: '', 
    role: ''
  });
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {

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
        <Card.Title style={{ fontSize: "30px" }}><img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '100px', marginBottom: "40px", marginTop: "30px" }}/>
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Control 
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              placeholder="Username"
              required 
              style={{ marginBottom: "20px", marginTop: "30px" }}
            />
            <Form.Control 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Email"
              required 
              style={{ marginBottom: "20px", marginTop: "30px" }}
            />
            <Form.Control 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Password"
              required 
              style={{ marginBottom: "20px", marginTop: "30px" }}
            />
            <Form.Control 
              type="text" 
              name="fname" 
              value={formData.fname} 
              onChange={handleChange} 
              placeholder="First Name"
              required 
              style={{ marginBottom: "20px", marginTop: "30px" }}
            />
            <Form.Control 
              type="text" 
              name="lname" 
              value={formData.lname} 
              onChange={handleChange} 
              placeholder="Last Name"
              required 
              style={{ marginBottom: "20px", marginTop: "30px" }}
            />
            <Form.Control 
              type="text" 
              name="id" 
              value={formData.id} 
              onChange={handleChange} 
              placeholder="Personal ID"
              required 
              style={{ marginBottom: "20px", marginTop: "30px" }}
            />
            <Form.Control 
              type="text" 
              name="role" 
              value={formData.role} 
              onChange={handleChange} 
              placeholder="Role"
              required 
              style={{ marginBottom: "20px", marginTop: "30px" }}
            />
            <Button variant="secondary" type="button" onClick={handleLogin} style={{marginTop: "10px", marginRight: "10px" }}  block="true">
              Login Instead
            </Button>
            <Button variant="primary" type="submit" style={{marginTop: "10px" }}  block="true">Signup</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Signup;
