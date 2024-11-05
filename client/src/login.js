import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import coverPhoto from './images/Image.png';
import logo from './images/Logo.png';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            // Send POST request to verify email and password
            const response = await axios.post('http://localhost:3000/auth/login', formData);
            setSuccess(response.data.message); // Display success message

            // Redirect to landing page with email passed as state
            navigate('/dashboard', { state: { email: formData.email } });
        } catch (err) {
            // Display error if email or password is incorrect
            setError(err.response?.data?.message || 'Email does not exist or password is incorrect');
        }
    };

    return (
        <div className="regi">
            <div className="form">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center p-0">
                            <h1 className="sign-up mt-5">LOG IN</h1>
                            <form className="w-75 mt-3" onSubmit={handleSubmit}>
                                <div className="mb-3 inputForm">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 inputForm">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className=" registerBtn">Log In</button>
                                {error && <p className="text-danger mt-2">{error}</p>}
                                {success && <p className="text-success mt-2">{success}</p>}
                                <p className="account mt-3">
                                    Don’t have an account?{' '}
                                    <span className="login">
                                        <Link to={'/'} className='login'>Sign up</Link>
                                    </span>
                                </p>
                            </form>
                        </div>
                        <div className="col-md-6 d-flex align-items-center justify-content-center p-0">
                            <img src={coverPhoto} alt="Cover" className="cover-photo" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
