/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./Header.css";
import { FaUserTie, FaUserCircle, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "./../../assets/Logo.png";
import { useUser } from "../../context/UserContext";

export default function Header() {
  const { user, loading } = useUser();

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/home" className="logo">
          <img src={logo} alt="MyApp Logo" />
          Expert services made easy
        </Link>
      </div>
      <nav className="header-right">
        {user && !loading && (
          <>
            {user?.role !== "PROFESSIONAL" && (
              <Link to="/register-professional" className="nav-link">
                <FaUserTie className="icon" /> Register as a Professional
              </Link>
            )}
            <Link to="/my-account" className="nav-link" data-test="nav-my-account">
              <FaUserCircle className="icon" /> {user?.username}
            </Link>
          </>
        )}

        <Link to="/contact-us" className="nav-link">
          <FaEnvelope className="icon" /> Contact us
        </Link>
      </nav>
    </header>
  );
}
