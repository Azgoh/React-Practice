import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUpForm from "./component/SignUpForm";
import LoginForm from "./component/LoginForm";
import HomePage from "./component/HomePage";
import OAuth2RedirectHandler from "./component/OAuth2RedirectHandler";
import MyAccount from "./component/MyAccount";
import ProfRegister from "./component/ProfRegister";
import VerifyEmailPage from "./component/VerifyEmailPage";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext";

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
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
