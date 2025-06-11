import { useEffect, useState } from 'react';
import { getBooks } from '../services/Book';
import BookCard from '../components/BookCard';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';

const Home = () => {
  const [recentBooks, setRecentBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getBooks();
        const sortedBooks = res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentBooks(sortedBooks.slice(0, 6));
        setFilteredBooks(sortedBooks.slice(0, 6));
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleFilterChange = (genre) => {
    setSelectedGenre(genre);
    if (genre) {
      setFilteredBooks(recentBooks.filter((book) => book.genre?.toLowerCase() === genre.toLowerCase()));
    } else {
      setFilteredBooks(recentBooks);
    }
  };

  return (
    <div className="home-page">
      <SearchBar />
      <GenreFilter onFilterChange={handleFilterChange} />

      <section className="recent-books">
        <h2>Recently Added Books</h2>
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <Link to={`/book/${book.apiId}`} key={book.apiId || book.title}>
              <BookCard
                title={book.title}
                poster_path={book.poster_path}
                authors={book.authors}
                year={book.year}
                blocked={book.blocked}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
