import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './assets/css/bootstrap.css';
import './assets/css/App.css';

import NavBarSwitch from './components/Navbar/NavBarSwitch';
import Footer from './components/Footer';

import HomePage from './pages/Shared/HomePage';
import RequestManagerPage from './pages/Students/RequestManagerPage';
import FormManagerPage from './pages/Staff/FormManagerPage';
import AccountInfoPage from './pages/Shared/accountInfoPage';
import SignUpPage from './pages/Shared/SignUpPage';
import LoginPage from './pages/Shared/LoginPage'
import PrivacyInformationPage from './pages/Shared/PrivacyInformationPage';
import ContactPage from './pages/Shared/ContactPage';
import AboutusPage from './pages/Shared/AboutusPage';

function App() {
  return (
    <div className="App" >
      <Router>
        <NavBarSwitch />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/requestmanager" element={<RequestManagerPage />} />
          <Route path="/accountinfopage" element={<AccountInfoPage />} />
          <Route path="/formmanager" element={<FormManagerPage />} />
          <Route path="/privacy" element={<PrivacyInformationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutusPage />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}



export default App;
