

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_SPONSORS } from '../constants';
import { Sponsor } from '../types';
import { useAuth } from '../../contexts/AuthContext';
import { TrashIcon } from './icons';
import ImageUploader from './ImageUploader';
import { usePersistentState } from '../hooks/usePersistentState';

const AddSponsorModal: React.FC<{ onCancel: () => void, onSubmit: (sponsor: Omit<Sponsor, 'id'>) => void }> = ({ onCancel, onSubmit }) => {
    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');
    const [logoUrl, setLogoUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!logoUrl) {
            alert("Please upload a logo for the sponsor.");
            return;
        }
        onSubmit({ name, website, logoUrl });
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onCancel}>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in-down" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold font-display mb-4 text-tyga-dark dark:text-white">Add New Sponsor</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Sponsor Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                    <input type="url" placeholder="Website URL" value={website} onChange={e => setWebsite(e.target.value)} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sponsor Logo</label>
                        <ImageUploader onUpload={setLogoUrl} />
                    </div>
                    <div className="flex justify-end gap-4 pt-2">
                        <button type="button" onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md">Cancel</button>
                        <button type="submit" className="bg-tyga-primary hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md">Add Sponsor</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const SponsorsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [sponsors, setSponsors] = usePersistentState<Sponsor[]>('tyga_sponsors', MOCK_SPONSORS);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddSponsor = (newSponsorData: Omit<Sponsor, 'id'>) => {
    const newSponsor: Sponsor = { ...newSponsorData, id: `sponsor-${Date.now()}` };
    setSponsors(prev => [...prev, newSponsor]);
    setShowAddModal(false);
  };
  
  const handleDeleteSponsor = (sponsorId: string) => {
    if (window.confirm("Are you sure you want to delete this sponsor?")) {
        setSponsors(prev => prev.filter(p => p.id !== sponsorId));
    }
  };
  
  const handleAddSponsorClick = () => {
    if (isAuthenticated) {
        setShowAddModal(true);
    } else {
        window.location.href = "mailto:tygachamps@gmail.com";
    }
  };

  return (
    <div className="py-24 sm:py-32 bg-white dark:bg-black transition-colors duration-300 animate-fade-in">
      {showAddModal && <AddSponsorModal onCancel={() => setShowAddModal(false)} onSubmit={handleAddSponsor} />}
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-down">
          <h1 className="text-4xl font-bold font-display tracking-tight text-tyga-dark dark:text-white sm:text-6xl">Our Valued Partners</h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
            We are incredibly grateful for the support of our partners, who are pivotal in empowering youth through golf.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {sponsors.map((sponsor, index) => (
            <div key={sponsor.id} className="group relative" style={{ animation: `fade-in-down ${0.5 + index * 0.1}s ease-in-out forwards`, opacity: 0 }}>
              <a 
                href={sponsor.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex justify-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white dark:hover:bg-gray-700"
              >
                <img 
                  className="max-h-20 object-contain transition-all duration-300 group-hover:grayscale-0 grayscale" 
                  src={sponsor.logoUrl} 
                  alt={sponsor.name}
                />
              </a>
               {isAuthenticated && (
                <button 
                  onClick={() => handleDeleteSponsor(sponsor.id)}
                  className="absolute -top-3 -right-3 bg-red-600/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700 hover:scale-110"
                  aria-label="Delete sponsor"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <button
            onClick={handleAddSponsorClick}
            className="inline-block bg-tyga-secondary text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg button-glow"
          >
            {isAuthenticated ? "Add New Sponsor" : "Become a Sponsor"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SponsorsPage;