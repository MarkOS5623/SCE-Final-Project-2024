import React, { useContext } from 'react';
import CardContainer from '../../components/cardContainer';
import SignUpForm from '../../components/Forms/signupForm';
import logoImg from '../../assets/sce.jpg';
import { LanguageContext } from '../../context/LanguageContextProvider'; // Adjust path if necessary

const SignUpPage = () => {
  const { language } = useContext(LanguageContext);

  // Translations for different languages
  const translations = {
    en: {
      pageTitle: "Sign Up",
    },
    he: {
      pageTitle: "הרשמה",
    },
    ar: {
      pageTitle: "سجل",
    },
  };

  if (!translations[language]) return null;

  return (
    <CardContainer style={{ width: '500px', padding: '20px' }}>
      <img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '100px', marginBottom: "40px", marginTop: "30px" }}/>
      <h1>{translations[language].pageTitle}</h1>
      <SignUpForm/>
    </CardContainer>
  );
};

export default SignUpPage;
