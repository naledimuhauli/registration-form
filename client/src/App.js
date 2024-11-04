import './App.css';
import Registration from './registration';
import LandingPage from './landingPage'; // Corrected import name
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Registration />} /> {/* Updated to LandingPage */}
          <Route path="/dashboard" element={< LandingPage />} /> {/* Added route for Registration */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
