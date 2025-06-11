import { AuthContext } from '../context/AuthContext'
import { useContext, useState, useEffect } from 'react'
import { updatePassword } from '../services/user'
import { getFavoriteBooks } from '../services/book'
import BookCard from '../components/BookCard'

const Profile = () => {
  const { user } = useContext(AuthContext)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [favoriteBooks, setFavoriteBooks] = useState([])

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const result = await getFavoriteBooks(user.id);
          setFavoriteBooks(Array.isArray(result.books) ? result.books : []);
        } catch (err) {
          setFavoriteBooks([]);
        }
      }
    };
    fetchFavorites();
  }, [user]);

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setMessage('')
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match')
      return
    }
    try {
      const response = await updatePassword(oldPassword, newPassword)
      if (response.success) {
        setMessage('Password changed successfully')
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setMessage(response.message || 'Failed to change password')
      }
    } catch (err) {
      setMessage('An error occurred while changing the password')
    }
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-info">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>

      <button onClick={() => setShowPasswordForm(!showPasswordForm)}>
        {showPasswordForm ? 'Cancel' : 'Change Password'}
      </button>

      {showPasswordForm && (
        <form className="password-form" onSubmit={handlePasswordChange} style={{ marginTop: '1rem' }}>
          <div>
            <label>Current Password:</label>
            <input
              type="password"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm New Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      )}

      {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}

      <div className="favorite-books-section" style={{ marginTop: '2rem' }}>
        <h2>Favorite Books</h2>
        {favoriteBooks.length === 0 ? (
          <p>No favorite books found.</p>
        ) : (
          <div className="books-grid">
            {(Array.isArray(favoriteBooks) ? favoriteBooks : []).map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                poster_path={book.poster_path}
                authors={book.authors}
                year={book.year}
                blocked={book.blocked}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile