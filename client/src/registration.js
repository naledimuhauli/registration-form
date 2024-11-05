import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import coverPhoto from './images/Image.png';
import logo from './images/Logo.png';
import glogin from './images/Glogin.png';
import separator from './images/Seperater.png';

function Registration() {
  const navigate = useNavigate();
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

    // Input validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    } else if (!emailPattern.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:3000/auth/register', formData);
      setSuccess(response.data.message); // Display success message

      // Clear the form fields
      setFormData({ name: '', email: '', password: '' });

      // Redirect to landing page with email passed as state
      setTimeout(() => {
        navigate('/dashboard', { state: { email: formData.email } });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };


  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="regi">
      <div className='form'>
        <div className='logo mb-5'>
          <img src={logo} alt='logo' />
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-6 d-flex flex-column align-items-center justify-content-center'>
              <h1 className="sign-up mt-5">SIGN UP</h1>
              <p className="create">Create an account to get started</p>
              <button className="continue mb-3 mt-3" onClick={handleGoogleLogin}>
                <img src={glogin} alt="google login" />
              </button>
              <img src={separator} alt="separator" className="mb-3 mt-3" />
              <form className="w-75 mt-3" onSubmit={handleSubmit}>
                <div className="mb-3 inputForm">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
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
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                </div>
                <button type="submit" className=" registerBtn">Register</button>
                {error && <p className="text-danger mt-2">{error}</p>}
                {success && <p className="text-success mt-2">{success}</p>}
                <p className="account mt-3">
                  Already have an account?{' '}
                  <span className="login">
                    <Link to={'/login'} className='login'>Log in</Link>
                  </span>
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
