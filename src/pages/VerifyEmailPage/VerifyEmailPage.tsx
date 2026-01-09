import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./VerifyEmailPage.css";

/**
 * VerifyEmailPage Component
 * Displays email verification status after user clicks verification link from email.
 * Shows success message and auto-redirects to login, or error message for invalid links.
 * Status is passed as URL query parameter (status=success or status=failure).
 */
export default function VerifyEmailPage() {
  // Extract URL query parameters
  const [searchParams] = useSearchParams();
  
  // React Router navigation
  const navigate = useNavigate();
  
  // Get verification status from URL query parameter
  const status = searchParams.get("status");

  // Auto-redirect to login page after successful verification
  useEffect(() => {
    if (status === "success") {
      // Wait 3 seconds before redirecting to allow user to read the message
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [status, navigate]);

  return (
    <div className="verify-container">
      <div className="verify-card">
        {status === "success" ? (
          <>
            <Typography variant="h5" className="verify-success" gutterBottom>
              Email verified successfully!
            </Typography>
            <Typography variant="body1" gutterBottom className="verify-body">
              You will be redirected to the login page shortly.
            </Typography>
          </>
        ) : (
          <Typography variant="h6" className="verify-error">
            Invalid or expired verification link.
          </Typography>
        )}
      </div>
    </div>
  );
}
