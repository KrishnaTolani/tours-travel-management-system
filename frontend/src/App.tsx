import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import AdminDashboard from './components/AdminDashboard'
import TourGuideDashboard from './components/TourGuideDashboard'
import CustomerDashboard from './components/CustomerDashboard'
import TourDetails from './components/TourDetails'
import type { User } from './types'

function App() {
  const [user, setUser] = useState<User | null>(null)

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard user={user} />} />
        <Route path="/tour-guide" element={<TourGuideDashboard user={user} />} />
        <Route path="/customer" element={<CustomerDashboard user={user} />} />
        <Route path="/tour/:id" element={<TourDetails user={user} />} />
      </Routes>
    </div>
  )
}

export default App