import { useState, useEffect } from 'react';

const GenreFilter = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    setGenres(['All', 'Fiction', 'Non-Fiction', 'Fantasy', 'Science Fiction', 'Mystery', 'Romance']);
  }, []);

  return (
    <div className="genre-filter">
      <label htmlFor="genre">Filter by Genre:</label>
      <select id="genre" onChange={(e) => onFilterChange(e.target.value)}>
        {genres.map((genre) => (
          <option key={genre} value={genre === 'All' ? '' : genre}>{genre}</option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
