import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaBars, FaTimes, FaHome } from 'react-icons/fa';
import '../styles/Nav.css';

const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".sidebar") && !event.target.closest(".menu-toggle")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Header with Home Icon, Logo, and Menu Button */}
      <header className="main-header">
        <Link className="home-icon" to="/">
          <FaHome />
        </Link>
        <Link className="logo" to="/">BookWorm</Link>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* Sidebar Menu */}
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li><Link to="/books">Books</Link></li>
          {user ? (
            <>
              <li><Link to="/profile">{user.name}</Link></li>
              <li><Link to="/favorites">Favorite List</Link></li>
              <li><Link to="/reading-list">Add to Read</Link></li>
              {user.role === 'admin' && (
                <li><Link to="/admin">Admin</Link></li>
              )}
              <li>
                <button className="logout-btn" onClick={logout}>Sign Out</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/signin">Sign In</Link></li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
