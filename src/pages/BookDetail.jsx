import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { getBookById } from '../services/Book'
import '../styles/BookDetail.css'
import RatingComponent from '../components/RatingComponent'
import { AuthContext } from '../context/AuthContext'
import RatingComponent from '../components/RatingComponent';
import { ReactReader } from 'react-reader'
import { getBookUrl } from '../services/Book'

const BookDetail = () => {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const { user } = useContext(AuthContext)

  const [showReader, setShowReader] = useState(false)
  const [location, setLocation] = useState(null)
  const [epubUrl, setEpubUrl] = useState(null)
  const [bookAvailable, setBookAvailable] = useState(false)


  const getBooksUrl = async (url) => {
    try {
      setBookAvailable(false);
      const res = await getBookUrl(url);
      setEpubUrl(res);
      setBookAvailable(true);
    } catch (err) {
      console.error('Error fetching book URL:', err);
      setBookAvailable(false);
    }
  };

  const extractEpubUrl = (formats) => {
    if (!formats) return null;

    const preferredKeys = [
      'application/epub+zip',
      'application/x-mobipocket-ebook',
      'application/octet-stream'
    ];

    for (let key of preferredKeys) {
      if (formats[key]) return formats[key];
    }

    return null;
  };



  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await getBookById(id)
        setBook(res)
      } catch (err) {
        console.error('Error loading book:', err)
      }

    }
    fetchBook()

    // Fetch the epub URL if it exists

  }, [id])
  useEffect(() => {
    if (book?.formats) {
      const epubLink = extractEpubUrl(book.formats);
      if (epubLink) {
        getBooksUrl(epubLink);
      }
    }
  }, [book])



  if (!book) return <p>Loading...</p>



  // Find the epub format url

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
          {book.authors.map((a) =>
            `${a.name}${a.birth_year ? ` (${a.birth_year}–${a.death_year || ''})` : ''}`
          ).join(', ')}
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
          <div className="book-detail-links">
            {book.formats['text/html'] && (
              <a href={book.formats['text/html']} target="_blank" rel="noreferrer">
                📖 Read Online
              </a>
            )}
            {book.formats['audio/mpeg'] && (
              <a href={book.formats['audio/mpeg']} target="_blank" rel="noreferrer">
                🎧 Listen (MP3)
              </a>
            )}
          </div>
        ) : (
          <p style={{ marginTop: '1rem', fontStyle: 'italic', color: 'gray' }}>
            Please log in to read or listen to this book.
          </p>
        )}

        {user && <RatingComponent bookId={book._id} />}
        <div className="book-detail-links">
          {book.formats['text/html'] && (
            <a href={book.formats['text/html']} target="_blank" rel="noreferrer">
              📖 Read Online
            </a>
          )}
          {book.formats['audio/mpeg'] && (
            <a href={book.formats['audio/mpeg']} target="_blank" rel="noreferrer">
              🎧 Listen (MP3)
            </a>
          )}
          {epubUrl && (
            <button
              className="epub-reader-btn"
              onClick={() => setShowReader(!showReader)}
              style={{ marginLeft: 10 }}
            >
              📚 Read EPUB
            </button>
          )}
        </div>
        {showReader && bookAvailable && (
          <div style={{ height: '70vh', marginTop: 24 }}>
            <ReactReader
              url={epubUrl}
              location={location}
              locationChanged={setLocation}
              showToc
            />
            <button
              className="epub-reader-btn"
              style={{ marginTop: 10 }}
              onClick={() => setShowReader(false)}
            >
              Close Reader
            </button>
          </div>
        )}
        <RatingComponent bookId={book._id} />
      </div>
    </div>
  )
}


export default BookDetail
