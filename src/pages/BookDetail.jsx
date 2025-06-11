import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { getBookById, updateRating, getBookRating } from '../services/book'
import '../styles/BookDetail.css'
import RatingComponent from '../components/RatingComponent'
import { AuthContext } from '../context/AuthContext'

const BookDetail = () => {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const { user } = useContext(AuthContext)
  const [bookRating, setBookRating] = useState(null)

  const updateRatingHandel = async (rating) => {
    if (!book) return;
    try {
      await updateRating(book.id, rating);
      const bookRating = await getBookRating(book.id);
      setBookRating(bookRating.rating.rating);
      console.log('Rating updated successfully:', bookRating);
    } catch (err) {
      console.error('Error updating rating:', err);
    }
  }

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await getBookById(id);
        setBook(res);
        if (user) {
          const bookRating = await getBookRating(id);
          setBookRating(bookRating.rating.rating);
        } else {
          setBookRating(null);
        }
      } catch (err) {
        console.error('Error loading book:', err);
      }
    };
    fetchBook();
  }, [id, user]);

  if (!book) return <p>Loading...</p>

  return (
    <div className="book-detail">
      <img
        className="book-detail-cover"
        src={book.formats['image/jpeg'] || 'https://via.placeholder.com/150'}
        alt={book.title}
      />
      <div className="book-detail-info">
        <h1>{book.title}</h1>
        <p>
          <strong>Authors:</strong>{" "}
          {book.authors?.map((a) =>
            `${a.name}${a.birth_year ? ` (${a.birth_year}–${a.death_year || ''})` : ''}`
          ).join(', ') || 'Unknown'}
        </p>
        {book.subjects?.length > 0 && (
          <p>
            <strong>Subjects:</strong> {book.subjects.join(', ')}
          </p>
        )}
        {book.bookshelves?.length > 0 && (
          <p>
            <strong>Bookshelves:</strong> {book.bookshelves.join(', ')}
          </p>
        )}
        {book.languages?.length > 0 && (
          <p>
            <strong>Languages:</strong> {book.languages.join(', ')}
          </p>
        )}
        <p>
          <strong>Download count:</strong> {book.download_count}
        </p>

        {user ? (
          <>
            <div className="book-detail-links">
              {book.formats['audio/mpeg'] && (
                <a href={book.formats['audio/mpeg']} target="_blank" rel="noreferrer">
                  🎧 Listen (MP3)
                </a>
              )}
            </div>
            {user ? (
              <RatingComponent onChaneHandel={updateRatingHandel} userRating={bookRating || 0} />
            ) : (<div></div>)}
          </>
        ) : (
          <p style={{ marginTop: '1rem', fontStyle: 'italic', color: 'gray' }}>
            Please log in to listen to this book.
          </p>
        )}
      </div>
    </div>
  )
}

export default BookDetail