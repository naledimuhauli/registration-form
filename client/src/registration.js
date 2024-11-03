import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" for="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
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
