import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import logoImg from '../../assets/sce.jpg';
import sendMailIcon from '../../assets/icons8-messages-100.png';
import accountIcon from '../../assets/icons8-profile-96.png';
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
  const [userMessages, setUserMessages] = useState([]);
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
          const user = response.data.user;
          if (user.role === 'admin') setIsAdmin(true);

          const messages = JSON.parse(localStorage.getItem('messages')) || [];
          const userMessages = messages.filter(message => message.author === user._id || message.author.includes(user._id));
          setUserMessages(userMessages);
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
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAllMessages = async () => {
    const token = localStorage.getItem('token');
    const response = await decodeValue(JSON.stringify({ token: token }));
    const user = response.data.user;
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const remainingMessages = messages.filter(message => message.author !== user._id);
    localStorage.setItem('messages', JSON.stringify(remainingMessages));
    setUserMessages([]);
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
            <select id="language-select" value={language} onChange={handleLanguageChange} style={{ borderRadius: '15px' }}>
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
            {isLoggedIn && (
              <li className="nav-item dropdown">
                <DropdownButton
                  id="messages-dropdown"
                  title={<img src={sendMailIcon} alt="Messages" style={{ width: 'auto', height: '35px', marginRight: '0px' }} />}
                  variant="secondary"
                  className="btn btn-link nav-link"
                  style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}
                >
                  {userMessages.length > 0 ? (
                    userMessages.map((message, index) => (
                      <Dropdown.Item key={index}>
                        { (message.type === "requester" && (message.status !== "approved" && message.status !== "denied")) ? (
                          `Your request ${message.subject} has been filed and is pending approval`
                        ) : (message.type === "requester" && (message.status === "approved" || message.status === "denied")) ? (
                          `Your request ${message.subject} has been ${message.status}`
                        ) : (
                          `A new ${message.subject} request is pending your review`
                        )}
                        <br />
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item>No messages</Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleDeleteAllMessages} className="text-danger">Delete All Messages</Dropdown.Item>
                </DropdownButton>
              </li>
            )}
            <li className="nav-item dropdown">
              <DropdownButton
                  id="account-dropdown"
                  title={<img src={accountIcon} alt="account" style={{ width: 'auto', height: '35px', marginRight: '0px' }} />}
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
