import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/**
 * OAuth2RedirectHandler Component
 * Handles OAuth2 callback from authorization server (e.g., Google).
 * Extracts JWT token from URL query parameters and stores it in session.
 * Redirects to home page on success or login page on failure.
 */
export default function OAuth2RedirectHandler() {
  // Extract URL query parameters
  const [searchParams] = useSearchParams();
  
  // React Router navigation
  const navigate = useNavigate();

  // Process OAuth callback on component mount
  useEffect(() => {
    // Extract JWT token from 'token' query parameter
    const token = searchParams.get("token");
    
    if (token) {
      // Store JWT in session storage for authenticated requests
      sessionStorage.setItem("jwt", token);
      // Redirect to home page after successful OAuth
      navigate("/home");
    } else {
      // If no token received, redirect back to login
      navigate("/login");
    }
  }, [navigate, searchParams]);

  // Component renders nothing - only handles redirect logic
  return null;
}
