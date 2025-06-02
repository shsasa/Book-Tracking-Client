import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'





const Register = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  let navigate = useNavigate()


  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  await RegisterUser({
    name: formValues.name,
    email: formValues.email,
    password: formValues.password
  })
  setFormValues(initialState)
  navigate('/signin')
}


  return (
    <div className="col register">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            id="name"
            type="text"
            value={formValues.name}
            required
            autoComplete="name"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            id="email"
            type="email"
            value={formValues.email}
            required
            autoComplete="email"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            value={formValues.password}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="confirmPassword"
            value={formValues.confirmPassword}
            required
          />
        </div>
        <button
          disabled={
            !formValues.email ||
            (!formValues.password &&
              formValues.password === formValues.confirmPassword)
          }
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
