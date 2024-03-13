// Navbar.jsx
import React from 'react';
import './Navbar.css';
import navprofile from '../../assets/nav-profile.svg';
import navlogo from '../../assets/nav-logo.svg'; // Import as default export

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navlogo} alt="" className="nav-logo" />
      <img src={navprofile} alt="" className="nav-profile" />
    </div>
  );
};

export default Navbar;
