import './assests/css/bootstrap.css';
import './assests/css/App.css';
import MainPage from './pages/MainPage';
import SignUp from './components/forms/signup'; 
import Login from './components/forms/loginForm';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditorPage from './pages/editorPage';

function App() {
  return (
    <div className="App">
      <header className="App-header bg-light" style={{ height: "100%"}}>
        <Router>
          <div className="container-fluid bg-primary">
            <Navbar />
          </div>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/editor" element={<EditorPage />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
