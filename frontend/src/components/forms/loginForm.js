import React, { useState, useContext } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { login } from '../../api/user_requests';
import { LanguageContext } from '../../context/LanguageContextProvider'; // Adjust path if necessary

const LoginForm = () => {
  const { language } = useContext(LanguageContext); // Accessing language context

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      if (response.status !== 200) {
        throw new Error('Login failed');
      }
      localStorage.setItem('token', response.data.token);
      navigate("/requestmanager");
    } catch (error) {
      setError(error.message);
      console.error('Login failed:', error);
    }
  };

  // Translations for different languages
  const translations = {
    en: {
      emailPlaceholder: "Enter email",
      passwordPlaceholder: "Password",
      loginButton: "Login"
    },
    he: {
      emailPlaceholder: "הזן דוא\"ל",
      passwordPlaceholder: "סיסמה",
      loginButton: "התחברות"
    },
    ar: {
      emailPlaceholder: "أدخل البريد الإلكتروني",
      passwordPlaceholder: "كلمة المرور",
      loginButton: "تسجيل الدخول"
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Form className="mt-3">
        <Form.Group controlId="formBasicUsername" style={{marginTop: "20px" }}> 
          <Form.Control 
            type="text" 
            placeholder={translations[language].emailPlaceholder} 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" style={{marginTop: "20px" }}>
          <Form.Control 
            type="password" 
            placeholder={translations[language].passwordPlaceholder} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button 
          variant="primary" 
          type="button" 
          onClick={handleLogin} 
          style={{marginTop: "10px" }}
        >
          {translations[language].loginButton}
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
