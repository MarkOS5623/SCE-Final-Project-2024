import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { LanguageContext } from '../../Context/LanguageContextProvider'; // Adjust path if necessary
import logoImg from '../../assets/jpgs/sce.jpg';
import CardContainer from '../../components/Utils/CardContainer';

function HomePage() {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          navigate('/requestmanager');
        } else {
          console.log('No token found:');
        }
      } catch (error) {
        console.error('Network error while checking token status:', error);
      }
    };
    checkLoggedIn();
  }, [navigate]);

  const translations = {
    en: {
      title: 'SCE Document Manager',
      subtitle: 'Please sign in or sign up to continue.',
      loginBtn: 'Login',
      signupBtn: 'Sign Up'
    },
    he: {
      title: 'מנהל מסמכים SCE',
      subtitle: 'אנא התחבר או הירשם כדי להמשיך.',
      loginBtn: 'כניסה',
      signupBtn: 'הרשמה'
    },
    ar: {
      title: 'مدير مستندات SCE',
      subtitle: 'الرجاء تسجيل الدخول أو التسجيل للمتابعة.',
      loginBtn: 'تسجيل الدخول',
      signupBtn: 'التسجيل'
    }
  };

  return (
    <div>
      <CardContainer style={{ width: '500px', padding: '20px' }}>
        <Card.Title>
          <img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '125px', marginBottom: "40px" }} />
          <br />{translations[language].title}
        </Card.Title>
        <Card.Text>{translations[language].subtitle}</Card.Text>
        <div>
          <Link to="/login" className="btn btn-primary me-3">{translations[language].loginBtn}</Link>
          <Link to="/signup" className="btn btn-secondary">{translations[language].signupBtn}</Link>
        </div>
      </CardContainer>
    </div>
  );
}

export default HomePage;
