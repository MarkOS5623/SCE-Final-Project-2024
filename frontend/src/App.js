import './css/bootstrap.css';
import './css/App.css';
import MainPage from './shared/MainPage';
import SignUp from './user/signup'; 
import Login from './user/login';
import Navbar from './shared/Navbar';
import Account from './user/info';
import ForgotPassword from './user/forgotpassword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
            <Route path="/passrest" element={<ForgotPassword />} />
            <Route path="/user" element={<Account />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
