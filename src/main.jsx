import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'

createRoot(document.querySelector('#root')).render(
  <Router>
    <AuthProvider>
      <App />
       <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthProvider>
  </Router>
)
