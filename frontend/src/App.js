import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './assests/css/bootstrap.css';
import './assests/css/App.css';

import NavBarSwitch from './components/Navbar/NavBarSwitch';
import Footer from './components/Footer';

import HomePage from './pages/Shared/HomePage';
import StudentHomePage from './pages/Students/StudentHomePage';
import StaffHomePage from './pages/Staff/StaffHomePage';
import AccountInfoPage from './pages/Shared/accountInfoPage';
import SignUpPage from './pages/Shared/SignUpPage';
import LoginPage from './pages/Shared/LoginPage'
import TextEditorPage from './pages/Staff/TextEditorPage';

function App() {
  return (
    <div className="App" >
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
        <Footer/>
      </Router>
    </div>
  );
}



export default App;
