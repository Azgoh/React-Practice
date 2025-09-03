import React, { useState } from "react";
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
import Header from "../../components/Header/Header";
import "./MyAccount.css";
import { ProfilePage } from "../../components/ProfilePage/ProfilePage";
import Calendar from "../../components/MyCalendar/MyCalendar";
import { useUser } from "../../context/UserContext";

export default function MyAccount() {
  const [activePage, setActivePage] = useState("home");
  const { user } = useUser();

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <h2>Welcome to your Dashboard</h2>;
      case "calendar":
        return <Calendar />;
      case "appointments":
        return <h2>Your Appointments</h2>;
      case "profile":
        return <ProfilePage />;
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
      <Header />
      <div className="account-body">
        <aside className="account-sidebar">
          <Sidebar collapsed={false} width="22rem">
            <Menu>
              <MenuItem icon={<FaHome />} onClick={() => setActivePage("home")}>
                Home
              </MenuItem>
              {user?.role === "PROFESSIONAL" && (
                <MenuItem
                  icon={<FaCalendar />}
                  onClick={() => setActivePage("calendar")}
                >
                  Calendar
                </MenuItem>
              )}

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
