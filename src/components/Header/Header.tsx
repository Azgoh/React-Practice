/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./Header.css";
import { FaUserTie, FaUserCircle, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "./../../assets/Logo.png";
import { useUser } from "../../context/UserContext";

export default function Header() {
  // Access authenticated user state from context
  const { user, loading } = useUser();

  return (
    <header className="header">
      {/* Left section: logo and brand tagline */}
      <div className="header-left">
        <Link to="/home" className="logo">
          <img src={logo} alt="MyApp Logo" />
          Expert services made easy
        </Link>
      </div>

      {/* Right section: navigation links */}
      <nav className="header-right">
        {/* Show authenticated user actions only when user is loaded */}
        {user && !loading && (
          <>
            {/* Allow non-professional users to register as professionals */}
            {user?.role !== "PROFESSIONAL" && (
              <Link to="/register-professional" className="nav-link">
                <FaUserTie className="icon" />
                Register as a Professional
              </Link>
            )}

            {/* Link to user account page */}
            <Link
              to="/my-account"
              className="nav-link"
              data-test="nav-my-account"
            >
              <FaUserCircle className="icon" />
              {user?.username}
            </Link>
          </>
        )}

        {/* Always-visible contact page link */}
        <Link to="/contact-us" className="nav-link">
          <FaEnvelope className="icon" />
          Contact us
        </Link>
      </nav>
    </header>
  );
}
