import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/Home'
import DashboardPage from './pages/Dashboard'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route element={<HomePage />} path='/' />
          <Route element={<DashboardPage />} path='/dashboard' />
          <Route element={<AboutPage />} path='/about' />
          <Route element={<ContactPage />} path='/contact' />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

