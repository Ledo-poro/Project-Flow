import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/about', label: 'About', icon: 'ℹ️' },
    { to: '/contact', label: 'Contact', icon: '📧' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🚀</span>
          <span className="brand-text">ProjectFlow</span>
        </Link>

        <button
          className={`mobile-toggle ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <span className="nav-link-icon">{link.icon}</span>
              <span className="nav-link-text">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

