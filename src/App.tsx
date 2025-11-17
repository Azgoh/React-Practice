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
  const token = sessionStorage.getItem("jwt");

  return (
    <>
      <UserProvider>
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
        <Routes>
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
          <Route
            path="/register"
            element={token ? <Navigate to="/home" replace /> : <SignUpForm />}
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/home" replace /> : <LoginForm />}
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/register-professional" element={<ProfRegister />} />
          <Route
            path="/profession/:professionName"
            element={<ProfessionPage />}
          />
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
