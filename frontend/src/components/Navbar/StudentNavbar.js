import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import logoImg from '../../assets/sce.jpg';
import { decodeValue } from '../../api/utils';
import { LanguageContext } from '../../context/LanguageContextProvider';
import './StudentNavbar.css';

const translations = {
  en: {
    admin: "Logged user is an admin",
    account: "Account",
    accountInfo: "Account Info",
    formManager: "Form Manager",
    signOut: "Sign Out",
  },
  he: {
    admin: "משתמש מחובר הוא מנהל",
    account: "חשבון",
    accountInfo: "פרטי חשבון",
    formManager: "מנהל טפסים",
    signOut: "התנתק",
  },
  ar: {
    admin: "المستخدم المسجل هو مسؤول",
    account: "الحساب",
    accountInfo: "معلومات الحساب",
    formManager: "مدير النماذج",
    signOut: "تسجيل خروج",
  },
};

const StudentNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { language, changeLanguage } = useContext(LanguageContext); // Use changeLanguage instead of setLanguage
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
          const response = await decodeValue(JSON.stringify({ token: token }));
          if (response.data.user.role === 'admin') setIsAdmin(true);
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
      if (token && isLoggedIn === true) {
        localStorage.removeItem('token', token);
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
        <Link className="navbar-brand" to="/requestmanager">
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
            <li className="nav-item">
              {isAdmin && (
                <span className="nav-link" style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}>
                  {translations[language].admin}
                </span>
              )}
            </li>
            <li className="nav-item dropdown">
              <DropdownButton
                id="dropdown-basic-button"
                title={translations[language].account}
                menuAlign="right"
                variant="secondary"
                className="btn btn-link nav-link"
                style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}
              >
                <Dropdown.Item as={Link} to="/accountinfopage">{translations[language].accountInfo}</Dropdown.Item>
                {isAdmin && (
                  <Dropdown.Item as={Link} to="/formmanager">{translations[language].formManager}</Dropdown.Item>
                )}
                {isLoggedIn && (
                  <Dropdown.Item onClick={handleSignOut}>{translations[language].signOut}</Dropdown.Item>
                )}
              </DropdownButton>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
