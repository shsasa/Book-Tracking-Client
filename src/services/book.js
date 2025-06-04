import Client from './api'


export const getBooks = async () => {
  const res = await Client.get('/book')
  return res.data
}

export const getBookById = async (id) => {
  const res = await Client.get(`/book/${id}`)
  return res.data
}

//search books by title
export const searchBooks = async (query) => {
  console.log(query)

  const res = await Client.get(`/book/search/${query}`, {

  })
  return res.data
}

