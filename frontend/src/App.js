import React from 'react';
import './assests/css/bootstrap.css';
import './assests/css/App.css';
import MainPage from './pages/MainPage';
import SignUp from './components/forms/signup'; 
import Login from './components/forms/loginForm';
import StudentHomePage from './pages/StudentHomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditorPage from './pages/editorPage';
import NavBarSwitch from './components/NavBarSwitch';
function App() {
  return (
    <div className="App">
      <Router>
        <NavBarSwitch /> {/* Render NavBarSwitch component */}
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/student" element={<StudentHomePage />} />
          </Routes>
      </Router>

    </div>
  );
}



export default App;
