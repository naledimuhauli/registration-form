import './App.css';
import Registration from './registration';
import LandingPage from './landingPage';
import Login from './login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/dashboard" element={< LandingPage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
