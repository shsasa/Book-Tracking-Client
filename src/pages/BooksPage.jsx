import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { getBooks } from '../services/Book';
import '../styles/BooksPage.css'
import { Link } from 'react-router-dom';

const BooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getBooks();
        setBooks(res);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

    const handleAddToFavorite = (bookTitle) => {
    console.log(`Added to Favorite: ${bookTitle}`);
 
  };

  const handleAddToRead = (bookTitle) => {
    console.log(`Added to Read: ${bookTitle}`);
 
  };

  const handleAddToCustomList = (bookTitle) => {
    console.log(`Added to Custom List: ${bookTitle}`);
  
  };

  return (
    <div className="books-grid">
      {books.map((book) => (
        <Link to={{
          pathname: "/book/" + book.apiId }}   key={book.apiId || book.title}>
             <BookCard
            title={book.title}
            poster_path={book.poster_path}
            authors={book.authors}
            year={book.year}
            blocked={book.blocked}
            onAddToFavorite={handleAddToFavorite}
            onAddToRead={handleAddToRead}
            onAddToCustomList={handleAddToCustomList}
          />
        </Link>
      ))}
    </div>
  );
};

export default BooksPage;

