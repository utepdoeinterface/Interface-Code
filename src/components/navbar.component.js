import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Drone Interface</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Existing Users</Link>
          </li>
          <li className="navbar-item">
          <Link to="/images" className="nav-link">Images</Link>
          </li>
          <li className="navbar-item">
          <Link to="/videos" className="nav-link">Videos</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create New User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}