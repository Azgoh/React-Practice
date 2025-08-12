import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUpForm from './component/SignUpForm'
import LoginForm from './component/LoginForm'
import HomePage from './component/HomePage'
import OAuth2RedirectHandler from './component/OAuth2RedirectHandler'

function App() {

  const token = sessionStorage.getItem("jwt");
  console.log(token);

  return(
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/home" replace /> : <Navigate to="/register" replace />}
      />
      <Route path="/register" element={token ? <Navigate to="/home" replace /> : <SignUpForm />} />
      <Route path="/login" element={token ? <Navigate to="/home" replace /> : <LoginForm />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
    </Routes>
  )
}

export default App
