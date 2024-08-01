import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LanguageContextProvider from './Context/LanguageContextProvider.js';
import './assets/css/bootstrap.css';
import './assets/css/App.css';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Utils/Footer.js';
import HomePage from './pages/Shared/HomePage';
import RequestManagerPage from './pages/Shared/RequestManagerPage';
import FormManagerPage from './pages/Staff/FormManagerPage';
import AccountInfoPage from './pages/Shared/AccountInfoPage.js';
import SignUpPage from './pages/Shared/SignUpPage';
import LoginPage from './pages/Shared/LoginPage';
import PrivacyInformationPage from './pages/Shared/PrivacyInformationPage';
import ContactPage from './pages/Shared/ContactPage';
import AboutUsPage from './pages/Shared/AboutusPage';

function App() {
  return (
    <div className="App">
      <Router>
        <LanguageContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/requestmanager/*" element={<RequestManagerPage />} />
            <Route path="/accountinfopage" element={<AccountInfoPage />} />
            <Route path="/formmanager/*" element={<FormManagerPage />} />
            <Route path="/privacy" element={<PrivacyInformationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutUsPage />} />
          </Routes>
          <Footer />
        </LanguageContextProvider>
      </Router>
    </div>
  );
}

export default App;
