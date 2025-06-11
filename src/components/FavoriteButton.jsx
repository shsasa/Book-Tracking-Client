import { useState, useEffect } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'


// Props: bookId, user, onToggle (optional)
const FavoriteButton = ({ isInitiallyFavorited = false, onToggle = () => { } }) => {
  const [isFavorited, setIsFavorited] = useState(isInitiallyFavorited)

  useEffect(() => {
    setIsFavorited(isInitiallyFavorited)
  }, [isInitiallyFavorited])

  const toggleFavorite = () => {

    setIsFavorited((prev) => {
      const newState = !prev
      onToggle(newState)
      // Here you can add API call to save/remove favorite for this bookId and user
      return newState
    })
  }

  return (
    <button
      onClick={toggleFavorite}
      className={`favorite-btn${isFavorited ? ' favorited' : ''}`}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      type="button"
    >
      {isFavorited ? <FaHeart className="favorited" /> : <FaRegHeart />}
    </button>
  )
}

export default FavoriteButton