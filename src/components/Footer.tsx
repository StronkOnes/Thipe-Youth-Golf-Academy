

import React from 'react';
import { Link } from 'react-router-dom';
import { WhatsAppIcon } from './icons';
import TygaLogo from './TygaLogo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-tyga-light border-t-4 border-tyga-secondary">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
             <Link to="/">
                <TygaLogo className="h-16 w-auto mb-4" variant="light" />
              </Link>
            <p className="text-sm text-gray-400">
                Introducing golf in township schools, creating leagues, and developing young leaders through the values of the game.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-bold font-display text-lg text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/about" className="hover:text-tyga-secondary transition-colors">About Us</Link></li>
              <li><Link to="/events" className="hover:text-tyga-secondary transition-colors">Events</Link></li>
              <li><Link to="/onboarding" className="hover:text-tyga-secondary transition-colors">Join TYGA</Link></li>
              <li><Link to="/contact" className="hover:text-tyga-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="md:col-span-1">
             <h3 className="font-bold font-display text-lg text-white mb-4">Connect</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-tyga-secondary transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-tyga-secondary transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-tyga-secondary transition-colors">LinkedIn</a></li>
            </ul>
          </div>
          <div className="md:col-span-1">
             <h3 className="font-bold font-display text-lg text-white mb-4">Get In Touch</h3>
             <div className="space-y-2 text-gray-300 text-sm">
                <p>310 Phase 2, Diepkloof</p>
                <p>Johannesburg 1864</p>
                <p>065 528 7081</p>
             </div>
             <a href="https://wa.me/27655287081" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                <WhatsAppIcon className="h-5 w-5"/>
                <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Thipe Youth Golf Academy. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;