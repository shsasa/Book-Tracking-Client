import { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const FavoriteButton = () => {
  const [isFavorited, setIsFavorited] = useState(false)

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited)
  }

  return (
    <button onClick={toggleFavorite} className="favorite-btn">
      {isFavorited ? <FaHeart className="favorited" /> : <FaRegHeart />}
    </button>
  )
}

export default FavoriteButton
