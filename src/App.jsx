import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Nav from './components/Nav'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Admin from './pages/Admin'

import BooksPage from './pages/BooksPage'
import BookDetail from './pages/BookDetail'
import { CheckSession } from './services/Auth'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      checkSession()
    }
  }, [])

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkSession = async () => {
    try {
      const user = await CheckSession()
      console.log('User session:', user)
      setUser(user)
    } catch (error) {
      console.error('Session check failed:', error)
      setUser(null)
    }
  }

  return (
    <>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
              <Route path="/books" element={<BooksPage />} />
  <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/admin" element={<Admin user={user} />} />
        </Routes>


      </main>
    </>
  )
}

export default App
