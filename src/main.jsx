import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'


createRoot(document.querySelector('#root')).render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
)
