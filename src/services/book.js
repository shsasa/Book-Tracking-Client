// src/services/Book.js
import Client from './api';

export const getBooks = async () => {
  const res = await Client.get('/book');
  return res.data;
};

export const getBookById = async (id) => {
  const res = await Client.get(`/book/${id}`);
  return res.data;
};

export const searchBooks = async (query) => {
  const res = await Client.get(`/book/search/${query}`, {});
  return res.data;
};

export const updateRating = async (bookId, ratingData) => {
  const res = await Client.put(`/book/${bookId}/rating/${ratingData}`);
  return res.data;
};
export const getBookRating = async (bookId) => {
  const res = await Client.get(`/book/${bookId}/rating`);
  return res.data;
}

export const getBookUrl = async (epubLink) => {
  const res = await fetch(`http://localhost:3000/book/url?url=${encodeURIComponent(epubLink)}`);
  const data = await res.json();

  if (!data.url) throw new Error('No EPUB URL returned');

  return `http://localhost:3000${data.url}`;
}

export const addOrRemoveBookFromFavorite = async (bookId) => {
  const res = await Client.post(`/book/${bookId}/favorite`);
  return res.data;
}

export const getFavoriteBooks = async () => {
  const res = await Client.get('/book/favorites/');
  return res.data;
};

export const addCommentToBook = async (bookId, commentData) => {
  const res = await Client.post(`/book/${bookId}/comment`, commentData);
  return res.data;
}

export const addBookToReadList = async (bookId) => {
  const res = await Client.post('/book/read', { bookId });
  return res.data;
};

export const updateReadBook = async (bookId, updateData) => {
  const res = await Client.put(`/book/read/${bookId}`, updateData);
  return res.data;
};

export const removeBookFromReadList = async (bookId) => {
  const res = await Client.delete(`/book/read/${bookId}`);
  return res.data;
};

export const getUserReadList = async () => {
  const res = await Client.get('/book/read/user');
  return res.data;
};
