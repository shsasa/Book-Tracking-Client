import { useState, useContext } from 'react';
import { SignInUser } from '../services/Auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/SignIn.css';
import { toast } from 'react-toastify';
import logo from '../assets/finallogo.png'; // Import logo

const SignIn = () => {
  const initialState = { email: '', password: '' };
  const { login } = useContext(AuthContext);
  const [formValues, setFormValues] = useState(initialState);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = await SignInUser(formValues);
      login(payload);
      toast.success('Signed in successfully!');
      setFormValues(initialState);
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="signin">
      {/* Logo at the top */}
      <div className="logo-container">
        <img src={logo} alt="BookWorm Logo" />
      </div>

      {/* Styled "Sign In" text */}
      <h2 className="signin-text">Sign In</h2>

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input onChange={handleChange} id="email" type="email" placeholder="example@example.com" value={formValues.email} required autoComplete="email" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input onChange={handleChange} type="password" id="password" value={formValues.password} required />
        </div>
        <button disabled={!formValues.email || !formValues.password}>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
