import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

import '../styles/Nav.css'

const Nav = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <header className="main-header">
      <nav className="navbar">
        <Link className="logo" to="/">BookTracker</Link>
        <div className="nav-links-container">
          <Link to="/books">Books</Link>

        </div>
        <ul className="nav-links">

          {user ? (
            <>
              <Link to="/profile">{user.name}</Link>

              {user.role === 'admin' && (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              )}
              <li>
                <Link onClick={logout} to="/">Sign Out</Link>

              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Nav