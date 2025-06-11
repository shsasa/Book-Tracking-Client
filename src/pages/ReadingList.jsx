import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  getUserReadList,
  removeBookFromReadList,
  updateReadBook
} from '../services/book'
import BookCard from '../components/BookCard';
import '../styles/ReadingList.css';

const ReadingList = () => {
  const { user } = useContext(AuthContext);
  const [readingList, setReadingList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReadingList = async () => {
      setLoading(true);
      try {
        const res = await getUserReadList();
        setReadingList(Array.isArray(res.books) ? res.books : []);
        console.log('Reading List:', res.books);
      } catch (err) {
        setReadingList([]);
      }
      setLoading(false);
    };
    if (user) fetchReadingList();
  }, [user]);

  const handleRemove = async (bookId) => {
    try {
      await removeBookFromReadList(bookId);
      setReadingList(readingList.filter((book) => (book.id || book._id) !== bookId));
    } catch (err) {
      alert('Error removing book from reading list.');
    }
  };

  const handleUpdate = async (bookId, status, currentPage) => {
    try {
      await updateReadBook(bookId, { status, currentPage });
      const res = await getUserReadList();
      setReadingList(Array.isArray(res.books) ? res.books : []);
    } catch (err) {
      alert('Error updating book progress.');
    }
  };

  if (!user) {
    return <p className="reading-list-message">Please sign in to view your reading list.</p>;
  }

  return (
    <div className="reading-list-container">
      <h1>Your Reading List</h1>
      {loading ? (
        <p className="reading-list-message">Loading...</p>
      ) : readingList.length === 0 ? (
        <p className="reading-list-message">No books in your reading list.</p>
      ) : (
        <div className="books-grid">
          {readingList.map((book) => (
            <div key={book._id || book.id} className="reading-list-book-wrapper">
              <BookCard
                id={book._id || book.id}
                title={book.title}
                poster_path={book.poster_path}
                authors={book.authors}
                year={book.year}
                blocked={book.blocked}
              />
              <button
                className="remove-read-btn"
                onClick={() => handleRemove(book._id || book.id)}
              >
                Remove
              </button>
              {/* Update status and current page */}
              <form
                className="update-read-form"
                onSubmit={e => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const status = formData.get('status');
                  const currentPage = formData.get('currentPage');
                  handleUpdate(book._id || book.id, status, currentPage ? Number(currentPage) : null);
                }}
              >
                <label>
                  Status:
                  <select name="status" defaultValue={book.status || 'not_started'}>
                    <option value="not_started">Not Started</option>
                    <option value="reading">Reading</option>
                    <option value="finished">Finished</option>
                  </select>
                </label>
                <label>
                  Current Page:
                  <input
                    type="number"
                    name="currentPage"
                    min="1"
                    defaultValue={book.currentPage || ''}
                  />
                </label>
                <button type="submit" className="update-read-btn">
                  Update
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadingList;