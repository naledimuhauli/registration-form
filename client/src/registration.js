import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import coverPhoto from './images/Image.png';
import logo from './images/Logo.png';
import glogin from './images/Glogin.png';
import serperator from './images/Seperater.png';

function registration() {
  return (
    <div className='form'>
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            <div className='logo'>
              <img src={logo} alt='logo' />
            </div>
            <h1 className="sign-up">
              SIGN UP
            </h1>
            <p className="create">
              Create an account to get started
            </p>
            <button className="continue">
              <img src={glogin} alt="google" />
            </button>
            <img src={serperator} alt="seperator" />
            <form>
              <div className="mb-3">
                <input type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='name' />
              </div>
              <div className="mb-3">

                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='email' />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder='password' />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" for="exampleCheck1">Remember Me</label>
              </div>
              <button type="submit" className="btn btn-primary">Register</button>
              <p className="account">
                Already have an account? <div className="login">Log in</div>
              </p>
            </form>
          </div>
          <div className='col-6'>
            <img src={coverPhoto} alt='coverPhoto' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default registration
