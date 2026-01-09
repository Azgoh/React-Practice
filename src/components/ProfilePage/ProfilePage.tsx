import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import axios from "axios";
import { API_BASE_URL } from "../../config/Config";
import { type UserWithProfessionalProfile } from "../../interfaces/UserWithProfessionalProfile";
import { Divider } from "@mui/material";

/**
 * ProfilePage Component
 * Displays the current user's profile information including username, email, role, and auth provider.
 * If the user is also a professional, displays their professional profile details as well.
 */
export const ProfilePage = () => {
  // Retrieve JWT token from session storage for API authentication
  const jwt = sessionStorage.getItem("jwt");
  
  // State management for user account data (includes both user and professional profiles)
  const [myAccount, setMyAccount] =
    useState<UserWithProfessionalProfile | null>(null);
  
  // Loading state while fetching profile data from API
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Fetches the current user's account information from the backend API
   * Uses JWT token for authorization
   */
  const getMyAccountInformation = async (): Promise<void> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
      setMyAccount(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch account information on component mount
  useEffect(() => {
    getMyAccountInformation();
  }, []);

  if (isLoading) return <p>Loading profile...</p>;
  if (!myAccount) return <p>No profile information available.</p>;

  const hasProfessional =
    myAccount.userProfile.role === "PROFESSIONAL" &&
    myAccount.professionalProfile;

  return (
    <div
      className={`profile-container ${
        hasProfessional ? "with-professional" : "single"
      }`}
    >
      <div className="profile-card">
        <h2 className="profile-title">My Profile</h2>
        <span className="details-field">
          <h4>Username</h4>
          <span>{myAccount.userProfile.username}</span>
        </span>
        <Divider className="profile-fields-divider"></Divider>
        <span className="details-field">
          <h4>Email</h4>
          <span>{myAccount.userProfile.email}</span>
        </span>
        <Divider className="profile-fields-divider"></Divider>
        <span className="details-field">
          <h4>Role</h4>
          <span>{myAccount.userProfile.role.toLowerCase()}</span>
        </span>
        <Divider className="profile-fields-divider"></Divider>
        <span className="details-field">
          <h4>Auth Provider</h4>
          <span>{myAccount.userProfile.authProvider.toLowerCase()}</span>
        </span>
      </div>
      {hasProfessional && <Divider orientation="vertical" flexItem className="vertical-divider"></Divider>}

      {hasProfessional && (
        <div className="profile-card">
          <h2 className="profile-title">My Professional Profile</h2>
          <span className="details-field">
            <h4>First Name</h4>
            <span>{myAccount.professionalProfile?.firstName}</span>
          </span>
          <Divider className="profile-fields-divider"></Divider>
          <span className="details-field">
            <h4>Last Name</h4>
            <span>{myAccount.professionalProfile?.lastName}</span>
          </span>
          <Divider className="profile-fields-divider"></Divider>
          <span className="details-field">
            <h4>Profession</h4>
            <span>{myAccount.professionalProfile?.profession}</span>
          </span>
          <Divider className="profile-fields-divider"></Divider>
          <span className="details-field">
            <h4>Location</h4>
            <span>{myAccount.professionalProfile?.location}</span>
          </span>
          <Divider className="profile-fields-divider"></Divider>
          <span className="details-field">
            <h4>Phone Number</h4>
            <span>{myAccount.professionalProfile?.phone}</span>
          </span>
          <Divider className="profile-fields-divider"></Divider>
          <span className="details-field">
            <h4>Hourly Rate</h4>
            <span>{myAccount.professionalProfile?.hourlyRate} {"€"}</span>
          </span>
        </div>
      )}
    </div>
  );
};
