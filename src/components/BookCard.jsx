import React, { useContext } from 'react';
import '../styles/BookCard.css';
import { AuthContext } from '../context/AuthContext';

const BookCard = ({
  id,
  title,
  poster_path,
  authors = [],
  year,
  blocked,
}) => {
  const { user } = useContext(AuthContext);

  return (
    <div className={`book-card${blocked?.blocked ? ' blocked' : ''}`}>
      <img src={poster_path || 'https://via.placeholder.com/150'} alt={title} className="book-poster" />
      <div className="book-info">
        <h2 className="book-title">{title}</h2>
        <p className="book-authors">
          <span>Author{authors.length > 1 ? 's' : ''}: </span>
          {authors.length > 0
            ? authors.map((a) => typeof a === 'string' ? a : a.name || 'Unknown').join(', ')
            : 'Unknown'}
        </p>
        <p className="book-year">Year: {year || 'N/A'}</p>
        {blocked?.blocked && (
          <div className="book-blocked">
            <span>Blocked</span>
            {user?.role === 'admin' && blocked.reason && (
              <span className="block-reason">: {blocked.reason}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;