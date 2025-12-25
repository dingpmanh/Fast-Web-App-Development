// Here we write the navigation between different pages.

import react from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

function Logout() {
  localStorage.clear() // Clear user session data
  return <Navigate to="/login" />
}

function RegisterAndLogout() { // Clear session data before registering a new user
  localStorage.clear()
  return <Register />
}

function App() { // Setup to navigate between different pages
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path = "/"
          element = {
            <ProtectedRoute>
              <Home /> 
            </ProtectedRoute>
          }
        />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/logout" element = {<Logout />} />
        <Route path = "/register" element = {<RegisterAndLogout />} />
        <Route path = "*" element = {<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
