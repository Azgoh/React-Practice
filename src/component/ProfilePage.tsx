import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import axios from "axios";
import { API_BASE_URL } from "../config/Config";
import { type UserWithProfessionalProfile } from "../interface/UserWithProfessionalProfile";

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

  return (
    <div className="user-profile-info">
      <h2>My Profile</h2>
      <p>
        <strong>Name:</strong> {myAccount.userProfile.username}
      </p>
      <p>
        <strong>Email:</strong> {myAccount.userProfile.email}
      </p>
      <p>
        <strong>Role:</strong> {myAccount.userProfile.role}
      </p>
      <p>
        <strong>Auth provider:</strong> {myAccount.userProfile.authProvider}
      </p>

      {myAccount.userProfile.role === "PROFESSIONAL" &&
        myAccount.professionalProfile && (
          <div className="professional-profile-info">
            <h3>Professional Information</h3>
            <p>
              <strong>First Name:</strong>{" "}
              {myAccount.professionalProfile.firstName}
            </p>
            <p>
              <strong>Last Name:</strong>{" "}
              {myAccount.professionalProfile.lastName}
            </p>
            <p>
              <strong>Profession: </strong>{" "}
              {myAccount.professionalProfile.profession}
            </p>
            <p>
              <strong>Phone Number: </strong>{" "}
              {myAccount.professionalProfile.phone}
            </p>
            <p>
              <strong>Hourly Rate:</strong> $
              {myAccount.professionalProfile.hourlyRate}
            </p>
          </div>
        )}
    </div>
  );
};
