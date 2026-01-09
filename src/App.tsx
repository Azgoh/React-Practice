import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUpForm from "./pages/SignUpForm/SignUpForm";
import LoginForm from "./pages/LoginForm/LoginForm";
import HomePage from "./pages/HomePage/HomePage";
import OAuth2RedirectHandler from "./pages/OAuth2Handler/OAuth2RedirectHandler";
import MyAccount from "./pages/MyAccount/MyAccount";
import ProfRegister from "./pages/ProfRegister/ProfRegister";
import VerifyEmailPage from "./pages/VerifyEmailPage/VerifyEmailPage";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext";
import ProfessionPage from "./pages/ProfessionPage/ProfessionPage";
import ProfessionalCalendarPage from "./pages/ProfessionalCalendarPage/ProfessionalCalendarPage";

function App() {
  // Get JWT token from session storage to determine if user is logged in
  const token = sessionStorage.getItem("jwt");

  return (
    <>
      {/* Provide user context to the entire app */}
      <UserProvider>

        {/* Global toast notifications */}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
            },
            success: {
              style: {
                background: "#4caf50",
                color: "#fff",
              },
            },
            error: {
              style: {
                background: "#f44336",
                color: "#fff",
              },
            },
          }}
        />

        {/* Application routes */}
        <Routes>
          {/* Root route: redirect based on login status */}
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/register" replace />
              )
            }
          />

          {/* Registration page: redirect if logged in */}
          <Route
            path="/register"
            element={token ? <Navigate to="/home" replace /> : <SignUpForm />}
          />

          {/* Login page: redirect if logged in */}
          <Route
            path="/login"
            element={token ? <Navigate to="/home" replace /> : <LoginForm />}
          />

          {/* Home page (main dashboard) */}
          <Route path="/home" element={<HomePage />} />

          {/* OAuth2 redirect handler for social login */}
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

          {/* Email verification page */}
          <Route path="/verify-email" element={<VerifyEmailPage />} />

          {/* User account page */}
          <Route path="/my-account" element={<MyAccount />} />

          {/* Professional registration page */}
          <Route path="/register-professional" element={<ProfRegister />} />

          {/* Profession listing page (dynamic route by professionName) */}
          <Route
            path="/profession/:professionName"
            element={<ProfessionPage />}
          />

          {/* Professional's calendar page (dynamic route by professional ID) */}
          <Route
            path="/professional/:id/calendar"
            element={<ProfessionalCalendarPage />}
          />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
