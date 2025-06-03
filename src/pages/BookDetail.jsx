import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const BookDetail = () => {
  const { id } = useParams()
  const [book, setBook] = useState(null)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/book/${id}`)
        setBook(res.data)
      } catch (err) {
        console.error('Error loading book:', err)
      }
    }

    fetchBook()
  }, [id])

  if (!book) return <p>Loading...</p>

  return (
    <div className="book-detail">
      <h1>{book.title}</h1>
      <img
        src={book.formats['image/jpeg'] || 'https://via.placeholder.com/150'}
        alt={book.title}
      />
      <p><strong>Authors:</strong> {book.authors.map((a) => a.name).join(', ')}</p>
      <p><strong>Download count:</strong> {book.download_count}</p>
      <a href={book.formats['text/html']} target="_blank" rel="noreferrer">
        Read Online
      </a>
    </div>
  )
}

export default BookDetail
