import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import coverPhoto from './images/Image.png';
import logo from './images/Logo.png';
import glogin from './images/Glogin.png';
import separator from './images/Seperater.png';

function Registration() {
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
              <button className="continue mb-3 mt-5">
                <img src={glogin} alt="google" />
              </button>
              <img src={separator} alt="separator" className="mb-3 mt-3" />
              <form className="w-75 mt-3">
                <div className="mb-3 inputForm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder='Name'
                  />
                </div>
                <div className="mb-3 inputForm">
                  <input
                    type="email"
                    className="form-control"
                    placeholder='Email'
                  />
                </div>
                <div className="mb-3 inputForm">
                  <input
                    type="password"
                    className="form-control"
                    placeholder='Password'
                  />
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                </div>
                <button type="submit" className="btn btn-dark w-100 registerBtn">Register</button>
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
