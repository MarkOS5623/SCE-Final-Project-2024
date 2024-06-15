import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './assests/css/bootstrap.css';
import './assests/css/App.css';

import NavBarSwitch from './components/navbars/NavBarSwitch';
import backgroundImage from './assests/background.png';

import HomePage from './pages/HomePage';
import StudentHomePage from './pages/StudentHomePage';
import StaffHomePage from './pages/StaffHomePage';
import AccountInfoPage from './pages/accountInfoPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage'
import TextEditorPage from './pages/TextEditorPage';

function App() {
  return (
    <div className="App"  style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Router>
        <NavBarSwitch />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/editor" element={<TextEditorPage />} />
          <Route path="/student" element={<StudentHomePage />} />
          <Route path="/accountinfopage" element={<AccountInfoPage />} />
          <Route path="/staff" element={<StaffHomePage />} />
        </Routes>
      </Router>
    </div>
  );
}



export default App;
