import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import Home from './pages/Home.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
      </AuthProvider>
      
    </Router>
  </React.StrictMode>,
)
