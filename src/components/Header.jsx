import React, { useEffect, useState } from 'react';
import { FaFilm } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { MdOutlineWbSunny, MdOutlineNightsStay } from 'react-icons/md';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.style.backgroundColor = isDarkMode ? 'white' : 'black';
    document.body.style.color = isDarkMode ? 'black' : 'white';
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 z-40 w-full px-4 md:px-20 py-5 shadow-sm ${isScrolled || isDarkMode ? 'text-white bg-black' : 'bg-white text-black'}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-blur" />
        <div className="flex justify-between items-center relative z-10">
          <div className="w-5/12 flex gap-1 items-center">
            <span className="text-2xl">
              <FaFilm />
            </span>
            <Link to='/'><span className="text-2xl">MOUTV</span></Link>
          </div>
          <div className="w-5/12 flex justify-end items-center">
            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={handleMobileMenuToggle}>
              <CiSearch />
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex justify-end gap-6 items-center">
              <button onClick={toggleDarkMode}>
                {isDarkMode ? <MdOutlineWbSunny /> : <MdOutlineNightsStay /> }
              </button>
              <Link to="/movies">Movies</Link>
              <Link to="/tv">TV Shows</Link>
              <span>
                <CiSearch />
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black text-white py-2">
            <Link to="/movies" className="block px-4 py-2">Movies</Link>
            <Link to="/tv" className="block px-4 py-2">TV Shows</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
