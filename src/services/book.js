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
  console.log(query);
  const res = await Client.get(`/book/search/${query}`, {});
  return res.data;
};

export const updateRating = async (bookId, ratingData) => {
  const res = await Client.put(`/book/${bookId}/rating`, ratingData);
  return res.data;
};