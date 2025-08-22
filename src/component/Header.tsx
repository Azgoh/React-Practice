/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import "./Header.css";
import { FaUserTie, FaUserCircle, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from ".././/assets/Logo.png";
import axios from "axios";
import { API_BASE_URL } from "../config/Config";
import type { User } from "../interface/User";

interface HeaderProps {
  shownav?: boolean;
}

export default function Header({ shownav = true }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);

  const getUserInfo = async (): Promise<void> => {
    try {
      const jwt = sessionStorage.getItem("jwt");
      const response = await axios.get<User>(`${API_BASE_URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
      setUser(response.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/home" className="logo">
          <img src={logo} alt="MyApp Logo" />
          Expert services made easy
        </Link>
      </div>
      {shownav && (
        <nav className="header-right">
          {user?.role !== "PROFESSIONAL" && (
            <Link to="/register-professional" className="nav-link">
              <FaUserTie className="icon" /> Register as a Professional
            </Link>
          )}
          <Link to="/my-account" className="nav-link">
            <FaUserCircle className="icon" /> {user?.username}
          </Link>
        </nav>
      )}

      {!shownav && (
        <nav className="header-right">
          <Link to="/contact-us" className="nav-link">
            <FaEnvelope className="icon" /> Contact us
          </Link>
        </nav>
      )}
    </header>
  );
}
