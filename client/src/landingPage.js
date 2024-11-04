import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LandingPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "Guest";

    const handleLogout = () => {
        // Perform any necessary logout actions (e.g., clear tokens)
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div>
            <h1>Registration Successful</h1>
            <p>Welcome, {email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default LandingPage;
