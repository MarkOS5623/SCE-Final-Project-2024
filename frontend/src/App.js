import './App.css';
import './bootstrap.css';
import MainPage from './shared/MainPage';
import SignUp from './user/signup'; 
import Login from './user/login';
import Navbar from './shared/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ height: "100%" }}>
        <Router>
          <div className="container-fluid">
            <Navbar />
          </div>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
