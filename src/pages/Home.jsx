import { useEffect, useState } from 'react';
import { getBooks } from '../services/book';
import BookCard from '../components/BookCard';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import newLogo from '../assets/finallogo.png'; // Import new logo

const Home = () => {
  const [recentBooks, setRecentBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getBooks();
        const sortedBooks = res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentBooks(sortedBooks.slice(0, 6));
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="home-page">
      {/* New Logo at the top */}
      <div className="logo-container">
        <img src={newLogo} alt="New Home Logo" />
      </div>

      {/* Centered Title */}
      <h2 className="home-title">Viewed Books</h2>

      <SearchBar />

      <section className="recent-books">
        <div className="books-grid">
          {recentBooks.map((book) => (
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
