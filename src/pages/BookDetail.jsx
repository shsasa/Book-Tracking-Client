import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { ClipLoader } from "react-spinners";
import { toast } from 'react-toastify';

import {
  getBookById, updateRating, getBookRating, addOrRemoveBookFromFavorite, addCommentToBook, addBookToReadList,
  removeBookFromReadList
} from '../services/book'
import '../styles/BookDetail.css'
import RatingComponent from '../components/RatingComponent'
import { AuthContext } from '../context/AuthContext'
import FavoriteButton from '../components/FavoriteButton'

const BookDetail = () => {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const { user } = useContext(AuthContext)
  const [bookRating, setBookRating] = useState(null)
  const [isFavorited, setIsFavorited] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [commentMessage, setCommentMessage] = useState('')
  const [isInReadList, setIsInReadList] = useState(false)

  const updateRatingHandel = async (rating) => {
    if (!book) return;
    try {
      await updateRating(book.id, rating);
      const bookRating = await getBookRating(book.id);
      setBookRating(bookRating.rating.rating);
      toast.success('Rating updated!');
    } catch (err) {
      toast.error('Error updating rating.');
    }
  }

  const handleToggleFavorite = async (newState) => {
    if (!user) {
      toast.error('You must be logged in to favorite books.');
      return;
    }
    try {
      await addOrRemoveBookFromFavorite(book.id);
      setIsFavorited(newState);
      toast.success(newState ? 'Added to favorites!' : 'Removed from favorites!');
    } catch (err) {
      toast.error('Error updating favorite status.');
    }
  };

  const handleAddToReadList = async () => {
    if (!user) {
      toast.error('You must be logged in to add to your reading list.');
      return;
    }
    try {
      await addBookToReadList(book.id);
      setIsInReadList(true);
      toast.success('Added to your reading list!');
    } catch (err) {
      toast.error('Error adding book to reading list.');
    }
  };

  const handleRemoveFromReadList = async () => {
    if (!user) {
      toast.error('You must be logged in to remove from your reading list.');
      return;
    }
    try {
      await removeBookFromReadList(book.id);
      setIsInReadList(false);
      toast.success('Removed from your reading list!');
    } catch (err) {
      toast.error('Error removing book from reading list.');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    setCommentMessage('');
    if (!user) {
      setCommentMessage('You must be logged in to comment.');
      toast.error('You must be logged in to comment.');
      return;
    }
    if (!comment.trim()) {
      setCommentMessage('Comment cannot be empty.');
      toast.error('Comment cannot be empty.');
      return;
    }
    try {
      const res = await addCommentToBook(book.id, { bookId: book.id, comment: comment });
      setComments([
        ...comments,
        {
          id: res.id || Math.random().toString(),
          comment,
          user: { id: user.id, name: user.name },
          createdAt: new Date().toISOString(),
        },
      ]);
      setComment('');
      setCommentMessage('Comment added successfully!');
      toast.success('Comment added!');
    } catch (err) {
      setCommentMessage('Failed to add comment.');
      toast.error('Failed to add comment.');
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await getBookById(id);
        setBook(res);
        setIsFavorited(res.isFavorite || false);
        setIsInReadList(res.isInReadList || false);
        setComments(res.comments || []);
        if (user) {
          const bookRating = await getBookRating(id);
          setBookRating(bookRating.rating.rating);
        } else {
          setBookRating(null);
        }
      } catch (err) {
        toast.error('Error loading book details.');
      }
    };
    fetchBook();
  }, [id, user]);

  if (!book) return (<div style={{ textAlign: 'center', marginTop: '3rem' }}>
    <ClipLoader color="#6c63ff" size={50} />
  </div>)

  const readHtml = book.formats?.['text/html'] || book.formats?.['text/html; charset=iso-8859-1'];
  const readEpub = book.formats?.['application/epub+zip'];
  const readTxt = book.formats?.['text/plain; charset=utf-8'] || book.formats?.['text/plain; charset=us-ascii'];
  const listenMp3 = book.formats?.['audio/mpeg'];

  return (
    <div className="book-detail-main-container">
      <div className="book-detail-flex">
        <div className="book-detail-cover-col">
          <img
            className="book-detail-cover"
            src={book.formats['image/jpeg'] || 'https://via.placeholder.com/150'}
            alt={book.title}
          />
        </div>
        <div className="book-detail-info-col">
          <h1 className="book-detail-title">{book.title}</h1>
          <p className="book-detail-authors">
            <strong>Authors:</strong>{" "}
            {book.authors?.length
              ? book.authors.map(a =>
                `${a.name}${a.birth_year ? ` (${a.birth_year}–${a.death_year || ''})` : ''}`
              ).join(', ')
              : 'Unknown'}
          </p>
          {book.summaries && book.summaries.length > 0 && (
            <div className="book-detail-summary">
              <strong>Summary:</strong>
              <p>{book.summaries[0]}</p>
            </div>
          )}
          {book.subjects?.length > 0 && (
            <p className="book-detail-subjects">
              <strong>Subjects:</strong> {book.subjects.join(', ')}
            </p>
          )}
          {book.bookshelves?.length > 0 && (
            <p className="book-detail-bookshelves">
              <strong>Bookshelves:</strong> {book.bookshelves.join(', ')}
            </p>
          )}
          {book.languages?.length > 0 && (
            <p className="book-detail-languages">
              <strong>Languages:</strong> {book.languages.join(', ')}
            </p>
          )}
          <p className="book-detail-download-count">
            <strong>Download count:</strong> {book.download_count}
          </p>
          <div className="book-detail-links">
            {readHtml && (
              <a href={readHtml} target="_blank" rel="noopener noreferrer" className="book-link-btn">
                📖 Read Online (HTML)
              </a>
            )}
            {readEpub && (
              <a href={readEpub} target="_blank" rel="noopener noreferrer" className="book-link-btn">
                📱 Download EPUB
              </a>
            )}
            {readTxt && (
              <a href={readTxt} target="_blank" rel="noopener noreferrer" className="book-link-btn">
                📄 Download TXT
              </a>
            )}
            {listenMp3 && (
              <a href={listenMp3} target="_blank" rel="noopener noreferrer" className="book-link-btn">
                🎧 Listen (MP3)
              </a>
            )}
          </div>
          {user ? (
            <>
              <FavoriteButton
                bookId={book.id}
                user={user}
                isInitiallyFavorited={isFavorited}
                onToggle={setIsFavorited}
              />
              <RatingComponent onChaneHandel={updateRatingHandel} userRating={bookRating || 0} />
              <div style={{ marginTop: '1rem' }}>
                {isInReadList ? (
                  <button className="book-detail-action-btn" onClick={handleRemoveFromReadList}>
                    Remove from Reading List
                  </button>
                ) : (
                  <button className="book-detail-action-btn" onClick={handleAddToReadList}>
                    Add to Reading List
                  </button>
                )}
              </div>
            </>
          ) : (
            <p style={{ marginTop: '1rem', fontStyle: 'italic', color: 'gray' }}>
              Please log in to use all features.
            </p>
          )}
        </div>
      </div>
      {/* Comments Section */}
      <div className="comments-section" style={{ marginTop: '2.5rem' }}>
        <h3>Comments</h3>
        <form onSubmit={handleAddComment} style={{ marginBottom: '1rem' }}>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Add your comment..."
            rows={3}
            style={{ width: '100%', resize: 'vertical' }}
          />
          <button type="submit" className="book-detail-action-btn" style={{ marginTop: '0.5rem' }}>Add Comment</button>
        </form>
        {commentMessage && (
          <p style={{ color: commentMessage.includes('success') ? 'green' : 'red' }}>
            {commentMessage}
          </p>
        )}
        <div>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} style={{ borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
                <strong>{c.user?.name || 'User'}:</strong> {c.comment}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default BookDetail