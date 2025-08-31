import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./VerifyEmailPage.css";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get("status");

  useEffect(() => {
    if (status === "success") {
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
