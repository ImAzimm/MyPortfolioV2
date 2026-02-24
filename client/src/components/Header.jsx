import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-dark-burgundy">
      <nav className="max-w-[1440px] mx-auto px-[10%] flex items-center justify-between py-3">
        <Link to="/" className="flex">
          <span className="text-white text-xl font-semibold">About</span>
          <span className="text-bright-pink text-xl font-semibold">Me</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8">
          <Link to="/" className="text-white hover:text-bright-pink transition-colors">Home</Link>
          <button onClick={() => scrollToSection('about')} className="text-white hover:text-bright-pink transition-colors">About</button>
          <button onClick={() => scrollToSection('portfolio')} className="text-white hover:text-bright-pink transition-colors">Portfolio</button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-burgundy border-t border-burgundy">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block text-white hover:text-bright-pink px-[10%] py-3 transition-colors">Home</Link>
          <button onClick={() => scrollToSection('about')} className="block w-full text-left text-white hover:text-bright-pink px-[10%] py-3 transition-colors">About</button>
          <button onClick={() => scrollToSection('portfolio')} className="block w-full text-left text-white hover:text-bright-pink px-[10%] py-3 transition-colors">Portfolio</button>
        </div>
      )}
    </header>
  );
}

export default Header;
