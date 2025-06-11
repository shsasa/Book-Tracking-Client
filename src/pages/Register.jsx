import { useState } from 'react';
import { RegisterUser } from '../services/Auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import { toast } from 'react-toastify';
import logo from '../assets/finallogo.png'; // Import logo

const Register = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  let navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RegisterUser({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password
      });
      toast.success('Account created! Please sign in.');
      setFormValues(initialState);
      navigate('/signin');
    } catch (error) {
      toast.error('Registration failed. Try again.');
    }
  };

  return (
    <div className="register">
      {/* Logo at the top */}
      <div className="logo-container">
        <img src={logo} alt="BookWorm Logo" />
      </div>

      {/* Styled "Register" text */}
      <h2 className="register-text">Register</h2>

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="name">Name</label>
          <input onChange={handleChange} id="name" type="text" value={formValues.name} required autoComplete="name" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input onChange={handleChange} id="email" type="email" value={formValues.email} required autoComplete="email" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input onChange={handleChange} type="password" id="password" value={formValues.password} required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input onChange={handleChange} type="password" id="confirmPassword" value={formValues.confirmPassword} required />
        </div>
        <button disabled={!formValues.email || !formValues.password || formValues.password !== formValues.confirmPassword}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
