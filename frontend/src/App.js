import './App.css';
import MainPage from './shared/MainPage';
import SignUp from './user/signup'; 
import Navbar from './shared/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
