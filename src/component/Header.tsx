import React from 'react';
import './Header.css';
import { FaUserTie, FaUserCircle, FaEnvelope } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logo from '.././/assets/Logo.png';

interface HeaderProps{
    shownav?: boolean;
}

export default function Header({shownav= true}: HeaderProps) {

  return (
   <header className="header">
      <div className="header-left">
        <Link to="/home" className="logo"><img src={logo} alt="MyApp Logo" />
             Expert services made easy
        </Link>
      </div>
      {shownav && (
      <nav className="header-right">
          <Link to="/register-professional" className="nav-link">
            <FaUserTie className="icon" />  Register as a Professional
        </Link>
        <Link to="/my-account" className="nav-link">
          <FaUserCircle className='icon'/> My Account
        </Link>
      </nav>
      )}

      {!shownav && (
        <nav className='header-right'>
          <Link to="/contact-us" className='nav-link'>
            <FaEnvelope className='icon'/> Contact us
          </Link>
        </nav>
      )}
  </header>
  )
}
