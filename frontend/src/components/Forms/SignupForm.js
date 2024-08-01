import React, { useState, useContext } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { signup } from '../../api/user_requests';
import { LanguageContext } from '../../Context/LanguageContextProvider';

const translations = {
  en: {
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    fnamePlaceholder: "First Name",
    lnamePlaceholder: "Last Name",
    idPlaceholder: "Personal ID",
    rolePlaceholder: "Role",
    loginInstead: "Login Instead",
    signupButton: "Signup"
  },
  he: {
    emailPlaceholder: "דוא\"ל",
    passwordPlaceholder: "סיסמה",
    fnamePlaceholder: "שם פרטי",
    lnamePlaceholder: "שם משפחה",
    idPlaceholder: "תעודת זהות",
    rolePlaceholder: "תפקיד",
    loginInstead: "התחברות במקום",
    signupButton: "הרשם"
  },
  ar: {
    emailPlaceholder: "البريد الإلكتروني",
    passwordPlaceholder: "كلمة المرور",
    fnamePlaceholder: "الاسم الأول",
    lnamePlaceholder: "اسم العائلة",
    idPlaceholder: "الهوية الشخصية",
    rolePlaceholder: "الدور",
    loginInstead: "تسجيل الدخول بدلاً من ذلك",
    signupButton: "سجل"
  }
};

function Signup() {
  const { language } = useContext(LanguageContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fname: '',
    lname: '',
    id: '', 
    role: ''
  });
  const [error, setError] = useState('');
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
      const response = await signup(JSON.stringify(formData));
      if (response.status === 201) {
        console.log('User signed up successfully');
        navigate("/");
      } else if (response.status === 401) {
        setError(response.data.message);
      } else {
        console.error('Failed to sign up:', response.statusText);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Control 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder={translations[language].emailPlaceholder} 
          required 
          style={{ marginBottom: "20px", marginTop: "30px" }}
        />
        <Form.Control 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          placeholder={translations[language].passwordPlaceholder} 
          required 
          style={{ marginBottom: "20px", marginTop: "30px" }}
        />
        <Form.Control 
          type="text" 
          name="fname" 
          value={formData.fname} 
          onChange={handleChange} 
          placeholder={translations[language].fnamePlaceholder} 
          required 
          style={{ marginBottom: "20px", marginTop: "30px" }}
        />
        <Form.Control 
          type="text" 
          name="lname" 
          value={formData.lname} 
          onChange={handleChange} 
          placeholder={translations[language].lnamePlaceholder} 
          required 
          style={{ marginBottom: "20px", marginTop: "30px" }}
        />
        <Form.Control 
          type="text" 
          name="id" 
          value={formData.id} 
          onChange={handleChange} 
          placeholder={translations[language].idPlaceholder} 
          required 
          style={{ marginBottom: "20px", marginTop: "30px" }}
        />
        <Form.Control 
          type="text" 
          name="role" 
          value={formData.role} 
          onChange={handleChange} 
          placeholder={translations[language].rolePlaceholder} 
          required 
          style={{ marginBottom: "20px", marginTop: "30px" }}
        />
        <Button variant="secondary" type="button" onClick={handleLogin} style={{ marginTop: "10px", marginRight: "10px" }} block>
          {translations[language].loginInstead}
        </Button>
        <Button variant="primary" type="submit" style={{ marginTop: "10px" }} block>
          {translations[language].signupButton}
        </Button>
      </Form>
    </Container>
  );
}

export default Signup;
