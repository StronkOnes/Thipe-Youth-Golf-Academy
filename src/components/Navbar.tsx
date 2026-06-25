

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import TygaLogo from './TygaLogo';

// Icons for theme toggle
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;


interface NavbarProps {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ isMobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white/80 dark:bg-black/80 backdrop-blur-lg sticky top-0 z-40 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left Section: Logo */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="transition-transform transform hover:scale-105">
            <TygaLogo className="h-14 w-auto" />
          </Link>
        </div>

        {/* Center Section: Navigation Links */}
        <nav className="hidden md:flex flex-1 justify-center items-center space-x-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative px-4 py-2 rounded-full text-tyga-dark dark:text-gray-300 hover:text-tyga-primary dark:hover:text-white transition-colors duration-300 ${location.pathname === link.path ? 'font-semibold' : ''}`}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute inset-0 bg-tyga-primary/10 dark:bg-tyga-secondary/20 rounded-full -z-10"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right Section: Admin & Mobile Menu Button */}
        <div className="flex-1 flex justify-end items-center space-x-4">
           <button onClick={toggleTheme} className="p-2 rounded-full text-tyga-dark dark:text-tyga-light hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
             {theme === 'light' ? <MoonIcon /> : <SunIcon />}
           </button>
           <div className="hidden md:flex items-center">
            {isAuthenticated ? (
                 <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors">
                    Logout
                </button>
            ) : (
                <Link to="/login" className="text-tyga-primary dark:text-tyga-secondary hover:underline font-semibold transition-colors">
                    Admin Login
                </Link>
            )}
           </div>
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-tyga-dark dark:text-tyga-light focus:outline-none">
                {isMobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                )}
              </button>
            </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-[150%]'}`} style={{ visibility: isMobileMenuOpen ? 'visible' : 'hidden' }}>
        <nav className="flex flex-col items-center space-y-6 py-8">
          {NAV_LINKS.map(link => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-xl text-tyga-dark dark:text-gray-200 hover:text-tyga-secondary transition-colors duration-300 ${location.pathname === link.path ? 'text-tyga-secondary font-semibold' : ''}`}
            >
              {link.name}
            </Link>
          ))}
           <div className="w-24 h-px bg-gray-300 dark:bg-gray-600 my-2"></div>
            {isAuthenticated ? (
                 <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md text-lg transition-colors">
                    Logout
                </button>
            ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-xl text-tyga-primary dark:text-tyga-secondary hover:underline font-semibold transition-colors">
                    Admin Login
                </Link>
            )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;