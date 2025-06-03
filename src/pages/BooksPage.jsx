import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const BooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:3000/book/'); // You can change search query
        setBooks(res.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book?.authors || 'Unkown'}
          year={book?.copyright_year || 'Unknown'}
        />
      ))}
    </div>
  );
};

export default BooksPage;
