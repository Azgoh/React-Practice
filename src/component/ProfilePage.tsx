import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import axios from "axios";
import { API_BASE_URL } from "../config/Config";
import { type UserWithProfessionalProfile } from "../interface/UserWithProfessionalProfile";
import { Divider } from "@mui/material";

export const ProfilePage = () => {
  const jwt = sessionStorage.getItem("jwt");
  const [myAccount, setMyAccount] =
    useState<UserWithProfessionalProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
            <span>{myAccount.professionalProfile?.hourlyRate} {"$"}</span>
          </span>
        </div>
      )}
    </div>
  );
};
