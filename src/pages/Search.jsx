import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { searchBooks } from '../services/Book';
import '../styles/BooksPage.css'
import { Link, useParams } from 'react-router-dom';

const Search = () => {
  const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

  const { search } = useParams();

  useEffect(() => {
    const fetchBooks = async () => {
            setLoading(true);

      try {
        const res = await searchBooks(search);
        // Gutendex returns { results: [...] }
        setBooks(res || []);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
            setLoading(false);

    };

    fetchBooks();
  }, [search]);


    if (loading) {
    return <div className="books-grid"><p>Loading...</p></div>;
  }
  return (
    <div className="books-grid">
      {books.map((book) => (
        <Link
          key={book.id}
          to={`/book/${book.id}`}
          style={{ textDecoration: 'none' }}
        >
          <BookCard
            title={book.title}
            poster_path={book.formats?.['image/jpeg']}
            authors={book.authors}
            year={book.authors?.[0]?.birth_year || ''}
            blocked={book.blocked}
          />
        </Link>
      ))}
    </div>
  );
};

export default Search;