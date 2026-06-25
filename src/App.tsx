
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import SponsorsPage from './components/SponsorsPage';
import AboutPage from './components/AboutPage';
import OnboardingPage from './components/OnboardingPage';
import GalleryPage from './components/GalleryPage';
import EventsPage from './components/EventsPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
         <HashRouter>
          <ScrollToTop />
          <div className={`flex flex-col min-h-screen font-sans text-tyga-dark bg-tyga-light dark:bg-black transition-colors duration-300 ${isMobileMenuOpen ? 'overflow-hidden h-screen' : ''}`}>
            <Navbar isMobileMenuOpen={isMobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/sponsors" element={<SponsorsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
    )
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;