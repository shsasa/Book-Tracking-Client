import "../styles/Home.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const Home = () => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/search/${search}`)
    }
  }

  return (
    <div className="col home">
      <section className="welcome-signin">
        <h1>Welcome to BookTracker!</h1>
        <form className="home-search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a book..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="home-search-input"
          />
          <button type="submit" className="home-search-btn">Search</button>
        </form>
        <p>
          Track your reading, discover new books, and manage your personal library with ease.
        </p>
        <ul>
          <li>Add books you want to read or have finished</li>
          <li>Keep notes and reviews for each book</li>
          <li>Organize your reading goals</li>
        </ul>
        <p>
          {`Sign in or register to get started on your reading journey!`}
        </p>
      </section>
    </div>
  )
}

export default Home