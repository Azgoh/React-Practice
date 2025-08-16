import React from 'react';
import './Header.css';
import { FaUserTie, FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logo from '.././/assets/Logo.png';

export default function Header() {
  return (
   <header className="header">
      <div className="header-left">
        <Link to="/" className="logo"><img src={logo} alt="MyApp Logo" />
             Expert services made easy
        </Link>
      </div>

      <nav className="header-right">
        <Link to="/register-professional" className="nav-link">
            <FaUserTie className="icon" />  Register as a Professional
        </Link>
        <Link to="/account" className="nav-link">
          <FaUserCircle className='icon'/> My Account
        </Link>
      </nav>
    </header>
  )
}
