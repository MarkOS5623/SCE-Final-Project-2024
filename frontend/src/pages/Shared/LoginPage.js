import React, { useContext } from 'react';
import CardContainer from '../../components/Utils/CardContainer';
import LoginForm from '../../components/Forms/LoginForm';
import { LanguageContext } from '../../Context/LanguageContextProvider'; // Adjust path if necessary
import logoImg from '../../assets/pictures/sce.jpg';

function LoginPage() {
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      pageTitle: 'Login',
      logoAlt: 'My App Logo'
    },
    he: {
      pageTitle: 'כניסה',
      logoAlt: 'לוגו שלי'
    },
    ar: {
      pageTitle: 'تسجيل الدخول',
      logoAlt: 'شعار تطبيقي'
    }
  };

  return (
    <CardContainer style={{ width: '500px', padding: '20px' }}>
      <img src={logoImg} alt={translations[language].logoAlt} style={{ width: 'auto', height: '100px', marginBottom: '40px', marginTop: '30px' }} />
      <h1>{translations[language].pageTitle}</h1>
      <LoginForm />
    </CardContainer>
  );
}

export default LoginPage;
