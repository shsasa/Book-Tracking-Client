import { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Nav from './components/Nav'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Search from './pages/Search'

import RatingComponent from './components/RatingComponent';
import BooksPage from './pages/BooksPage'
import BookDetail from './pages/BookDetail'
import { CheckSession } from './services/Auth'
// import Profile from './Profile'
import './App.css'


import { AuthContext } from './context/AuthContext'

// import Profile from './Profile'
import './App.css'

const App = () => {

  const { user, login, logout } = useContext(AuthContext)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      checkSession()
    }
  }, [])

  const handleLogOut = () => {
    logout()

    localStorage.clear()
  }

  const checkSession = async () => {
    try {
      const user = await CheckSession()
      console.log('User session:', user)
      login(user)

    } catch (error) {
      console.error('Session check failed:', error)
      logout()
    }
  }

  return (
    <>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        //profile
        <div>
          {/* <h1>${user.name}'s Profile</h1>
          <Profile user={user} /> */}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/search/:search" element={<Search />} />
          <Route path="/admin" element={<Admin user={user} />} />
        </Routes>
      </main>
    </>
  )
}

export default App
