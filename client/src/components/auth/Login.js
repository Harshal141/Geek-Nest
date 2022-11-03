import React, { useState } from 'react'
import {Link,Navigate} from 'react-router-dom';
import Alert from '../layout/Alert';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

const Login = ({login , isAuthenticated}) => {
  const [formData,setFormData] = useState({
    email: '',
    password: '',
  }) 
  const {email,password} = formData;
  // takes in all from data and just changes the one it called
  const onChange = e => setFormData({...formData,[e.target.name]: e.target.value})

  const onSubmit = async e => {
    e.preventDefault();
    login(email,password);
  }

  // redirect if loged in 
  if(isAuthenticated){
    return <Navigate to="/dashboard"/>
  }

  return (
    <section className="container">
    <Alert />
    <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} onChange={e => onChange(e)} name="email" required/>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)} required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  )
}

login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated : PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login})( Login)