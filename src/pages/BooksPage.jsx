import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import GenreFilter from '../components/GenreFilter';
import SearchBar from '../components/SearchBar';
import { getBooks, searchBooks } from '../services/book';
import '../styles/BooksPage.css';
import { Link, useParams } from 'react-router-dom';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const { search } = useParams();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let res;
        if (search) {
          res = await searchBooks(search);
        } else {
          res = await getBooks();
        }
        setBooks(res);
        setFilteredBooks(res);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [search]);

  const handleFilterChange = (genre) => {
    setSelectedGenre(genre);
    if (genre) {
      setFilteredBooks(books.filter((book) => book.genre?.toLowerCase() === genre.toLowerCase()));
    } else {
      setFilteredBooks(books);
    }
  };

  return (
    <div className="books-page">
      <SearchBar onSearch={(query) => searchBooks(query)} />
      <GenreFilter onFilterChange={handleFilterChange} />
      
      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Link to={`/book/${book.apiId}`} key={book.apiId || book.title}>
              <BookCard
                title={book.title}
                poster_path={book.poster_path}
                authors={book.authors}
                year={book.year}
                blocked={book.blocked}
              />
            </Link>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default BooksPage;
