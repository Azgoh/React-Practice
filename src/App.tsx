import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignUpForm from './component/SignUpForm'
import LoginForm from './component/LoginForm'

function App() {
  return(
    <Routes>
      <Route path="/register" element={<SignUpForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  )
}

export default App
