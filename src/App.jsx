import { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { AuthContext } from './context/AuthContext'

import Nav from './components/Nav'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Search from './pages/Search'
import BooksPage from './pages/BooksPage'
import BookDetail from './pages/BookDetail'
import { CheckSession } from './services/Auth'
import { AuthContext } from './context/AuthContext'
import FavoriteButton from './components/FavoriteButton'


import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

<ToastContainer position="top-right" autoClose={3000} />



import Profile from './Profile'
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
      <Favorite /> {Favorited}
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
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  )
}

export default App
