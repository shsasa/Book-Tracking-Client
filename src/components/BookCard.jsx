import React from 'react';
import '../styles/BookCard.css';
import { toast } from 'react-toastify';

const BookCard = ({ title, poster_path, authors = [], year, blocked }) => {
  const handleAddToFavorite = () => {
    toast.success(`Added "${title}" to favorites! ❤️`);
  };

  const handleAddToRead = () => {
    toast.success(`Marked "${title}" as read! 📖`);
  };

  const handleAddToCustomList = () => {
    toast.success(`Added "${title}" to your custom list! 📚`);
  };

  return (
    <div className={`book-card${blocked?.blocked ? ' blocked' : ''}`}>
      {poster_path && <img src={poster_path} alt={title} className="book-poster" />}
      <div className="book-info">
        <h2 className="book-title">{title}</h2>
        <p className="book-authors">
          <span>Author{authors.length > 1 ? 's' : ''}: </span>
          {authors.length > 0 ? authors.map((a) => (typeof a === 'string' ? a : a.name || 'Unknown')).join(', ') : 'Unknown'}
        </p>
        <p className="book-year">Year: {year || 'N/A'}</p>
        {blocked?.blocked && (
          <div className="book-blocked">
            <span>Blocked</span>
            {blocked.reason && <span className="block-reason">: {blocked.reason}</span>}
          </div>
        )}
        <div className="book-actions">
          <button onClick={handleAddToFavorite}>Add to Favorite</button>
          <button onClick={handleAddToRead}>Add to Read</button>
          <button onClick={handleAddToCustomList}>Add to Custom List</button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
