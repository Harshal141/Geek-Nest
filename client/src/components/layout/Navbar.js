import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect } from 'react-redux';
import { ReactPropTypes } from 'react';
import { logout } from '../../actions/auth';

const Navbar = ({auth:{isAuthenticated,loading},logout}) => {
  const authLinks = (
    <li className="nav-item">
          <Link className="nav-link" to="/register"><a onClick={logout} href="#!">
        <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span></a></Link>
    </li>
    // <ul>
    //   <li>
    //     <a onClick={logout} href="#!">
    //     <i className="fas fa-sign-out-alt"></i>{' '}
    //       <span className="hide-sm">Logout</span></a>
    //   </li>
    // </ul>
  )
  const guestLinks = (
    <>
    <li className="nav-item">
      <Link className="nav-link" to="!#">Developers</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/register">Register</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/login">Login</Link>
    </li>
    </>
  )
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#"><b>Geek Nest</b> </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" style={{justifyContent: 'end'}} id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
      </ul>
    </div>
  </div>
</nav>
  )
}

Navbar.ReactPropTypes = {
  logout: ReactPropTypes.func.isRequired,
  auth: ReactPropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,{logout})(Navbar);
