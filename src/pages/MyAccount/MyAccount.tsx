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
import MyAppointments from "../../components/MyAppointments/MyAppointments";

/**
 * MyAccount Component
 * User dashboard page with navigation sidebar for accessing profile, calendar, appointments, and settings.
 * Shows different content based on selected menu item.
 * Includes role-based rendering (professional calendar only for professionals).
 */
export default function MyAccount() {
  // Track which page/section is currently displayed
  const [activePage, setActivePage] = useState("home");
  
  // Get current user info from context
  const { user } = useUser();

  /**
   * Render different content based on the active page selection
   * Conditional rendering for professional-only sections
   */
  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <h2>Welcome to your Dashboard</h2>;
      case "calendar":
        // Only professionals have access to their own calendar
        return <Calendar />;
      case "appointments":
        // All users can view their appointments
        return <h2><MyAppointments/></h2>;
      case "profile":
        // Display user profile information
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
