import React, {useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/sce.jpg';
import { LanguageContext } from '../../context/LanguageContextProvider';
const translations = {
  en: {
    login: "Login",
    signUp: "Sign Up",
    signOut: "Sign Out",
  },
  he: {
    login: "התחברות",
    signUp: "הרשמה",
    signOut: "התנתק",
  },
  ar: {
    login: "تسجيل الدخول",
    signUp: "اشتراك",
    signOut: "تسجيل خروج",
  },
};

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { language, changeLanguage } = useContext(LanguageContext); 

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Network error while checking token status:', error);
      }
    };
    checkLoggedIn();
  }, []);

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token && isLoggedIn) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };


  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-primary bg-secondary" style={{ height: '70px' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logoImg} alt="My App Logo" style={{ width: 'auto', height: '40px' }} />
        </Link>
        <div className="navbar-left">
          <div className="language-switcher">
            <select id="language-select" value={language} onChange={handleLanguageChange}>
              <option value="he">HE</option>
              <option value="en">EN</option>
              <option value="ar">AR</option>
            </select>
          </div>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}>
                    {translations[language].login}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}>
                    {translations[language].signUp}
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="nav-link btn btn-outline-light" onClick={handleSignOut}>
                  {translations[language].signOut}
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
