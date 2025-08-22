import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/Config";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaCalendar,
  FaCalendarAlt,
  FaCog,
  FaHistory,
  FaHome,
  FaPaypal,
  FaUser,
} from "react-icons/fa";
import Header from "./Header";
import "./MyAccount.css";

export default function MyAccount() {
  const jwt = sessionStorage.getItem("jwt");

  const getAccountInformation = async (): Promise<void> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAccountInformation();
  }, []);

  const [activePage, setActivePage] = useState("home");

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <h2>Welcome to your Dashboard</h2>;
      case "calendar":
        return <h2>Your Calendar</h2>;
      case "appointments":
        return <h2>Your Appointments</h2>;
      case "profile":
        return <h2>My Profile Info</h2>;
      case "payment-method":
        return <h2>Payment Method</h2>;
      case "payment-history":
        return <h2>Payment History</h2>;
      default:
        return <h2>Select an option</h2>;
    }
  };

  return (
    <div className="account-page-wrapper">
      <Header shownav={false} />
      <div className="account-body">
        <aside className="account-sidebar">
          <Sidebar collapsed={false} width="22rem">
            <Menu>
              <MenuItem icon={<FaHome />} onClick={() => setActivePage("home")}>
                Home
              </MenuItem>
              <MenuItem
                icon={<FaCalendar />}
                onClick={() => setActivePage("calendar")}
              >
                Calendar
              </MenuItem>
              <MenuItem
                icon={<FaCalendarAlt />}
                onClick={() => setActivePage("appointments")}
              >
                My Appointments
              </MenuItem>
              <SubMenu label="Settings" icon={<FaCog />} defaultOpen={true}>
                <MenuItem
                  icon={<FaUser />}
                  onClick={() => setActivePage("profile")}
                >
                  My Profile
                </MenuItem>
                <MenuItem
                  icon={<FaPaypal />}
                  onClick={() => setActivePage("payment-method")}
                >
                  Payment Method
                </MenuItem>
                <MenuItem
                  icon={<FaHistory />}
                  onClick={() => setActivePage("payment-history")}
                >
                  Payment History
                </MenuItem>
              </SubMenu>
            </Menu>
          </Sidebar>
        </aside>

        <main className="account-content">
          <div className="account-card">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
