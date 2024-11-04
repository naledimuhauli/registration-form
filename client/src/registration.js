// Registration.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import coverPhoto from './images/Image.png';
import logo from './images/Logo.png';
import glogin from './images/Glogin.png';
import separator from './images/Seperater.png';
import { Link } from 'react-router-dom';

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:5000/auth/register', formData);
      setSuccess(response.data.message); // Display success message
      setFormData({ name: '', email: '', password: '' }); // Reset form
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed'); // Display error message
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google'; // Adjust URL if deployed
  };

  return (
    <div className="regi">
      <div className='form'>
        <div className='logo'>
          <img src={logo} alt='logo' />
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-6 d-flex flex-column align-items-center justify-content-center'>
              <h1 className="sign-up mt-5">SIGN UP</h1>
              <p className="create">Create an account to get started</p>
              <button className="continue mb-3 mt-5" onClick={handleGoogleLogin} >
                <img src={glogin} alt="google" />
              </button>
              <img src={separator} alt="separator" className="mb-3 mt-3" />
              <form className="w-75 mt-3" onSubmit={handleSubmit}>
                <div className="mb-3 inputForm">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder='Name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 inputForm">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder='Email'
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
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                </div>
                <Link to={'/dashboard'}>
                  <button type="submit" className="btn btn-dark w-100 registerBtn">Register</button>
                </Link>
                {error && <p className="text-danger mt-2">{error}</p>}
                {success && <p className="text-success mt-2">{success}</p>}
                <p className="account mt-3">
                  Already have an account? <span className="login">Log in</span>
                </p>
              </form>
            </div>
            <div className='col-md-6 d-flex align-items-center justify-content-center'>
              <img src={coverPhoto} alt='Cover' className="cover-photo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
