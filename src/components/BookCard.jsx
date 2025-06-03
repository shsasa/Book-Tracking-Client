import React from 'react';

const BookCard = ({ title, author, year }) => {
  return (
    <div className="book-card border p-4 rounded-lg shadow-md bg-white">

      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">Author: {author || 'Unknown'}</p>
      <p className="text-gray-500">Year: {year || 'N/A'}</p>
    </div>
  );
};

export default BookCard;
