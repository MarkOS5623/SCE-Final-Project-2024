import React from 'react';
import './assests/css/bootstrap.css';
import './assests/css/App.css';
import MainPage from './pages/MainPage';
import SignUp from './components/forms/signupForm'; 
import Login from './components/forms/loginForm';
import StudentHomePage from './pages/StudentHomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditorPage from './pages/editorPage';
import NavBarSwitch from './components/navbars/NavBarSwitch';
import AccountInfoPage from './pages/accountInfoPage';
import ViewTextPage from './pages/ViewTextPage';
import backgroundImage from './assests/background.png';
import NoSigForm from './components/docs/noSigForm';
function App() {
  return (
    <div className="App"  style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Router>
        <NavBarSwitch />
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/student" element={<StudentHomePage />} />
          <Route path="/accountinfopage" element={<AccountInfoPage />} />
          <Route path="/views" element={<ViewTextPage />} />
          <Route path="/nosig" element={<NoSigForm />} />
        </Routes>
      </Router>
    </div>
  );
}



export default App;
