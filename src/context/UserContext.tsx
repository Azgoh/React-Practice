import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/Config";
import type { UserProfile } from "../interfaces/UserProfile";

// Define the shape of the context
interface UserContextType {
  user: UserProfile | null;      // The currently logged-in user, or null if not logged in
  loading: boolean;              // True while fetching user data
  refreshUser: () => Promise<void>; // Function to re-fetch user data (useful after updates)
}

// Create the context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
});

/**
 * UserProvider component wraps the app and provides user context
 */
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null); // Store user data
  const [loading, setLoading] = useState(true);              // Track loading state

  /**
   * Fetch the current user's profile from backend
   */
  const fetchUser = async () => {
    try {
      const jwt = sessionStorage.getItem("jwt");
      if (!jwt) return; // No token, user is not logged in

      const response = await axios.get<UserProfile>(`${API_BASE_URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`, // Auth header for secured endpoint
        },
      });

      setUser(response.data); // Store fetched user
    } catch (error) {
      console.error(error); // Log error if fetch fails
    } finally {
      setLoading(false); // Stop loading spinner regardless of success or failure
    }
  };

  // Fetch user on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Custom hook to access user context anywhere in the app
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
