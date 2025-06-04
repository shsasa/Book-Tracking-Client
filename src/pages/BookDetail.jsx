import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getBookById } from '../services/Book'
import '../styles/BookDetail.css'

const BookDetail = () => {
  const { id } = useParams()
  const [book, setBook] = useState(null)

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
  }, [id])

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
      </div>
    </div>
  )
}

export default BookDetail