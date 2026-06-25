

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TEAM } from '../constants';
import { TeamMember } from '../types';
import { useAuth } from '../contexts/AuthContext';
import ImageUploader from './ImageUploader';
import SiteBrandingManager from './SiteBrandingManager';
import { usePersistentState } from '../hooks/usePersistentState';

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
        <div className="relative h-64">
            <img className="w-full h-full object-cover object-center" src={member.photoUrl} alt={member.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-12 sm:translate-y-16 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                <h3 className="text-xl font-bold text-white font-display">{member.name}</h3>
                <p className="text-tyga-secondary font-semibold">{member.role}</p>
            </div>
        </div>
        <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300 text-sm h-24 overflow-auto">{member.bio}</p>
        </div>
    </div>
);

const AddMemberModal: React.FC<{ onCancel: () => void, onSubmit: (member: Omit<TeamMember, 'id'>) => void }> = ({ onCancel, onSubmit }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [bio, setBio] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!photoUrl) {
            alert("Please upload a photo for the team member.");
            return;
        }
        onSubmit({ name, role, bio, photoUrl });
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in-down">
                <h2 className="text-2xl font-bold font-display mb-4 dark:text-white">Add New Team Member</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                    <input type="text" placeholder="Role (e.g., Senior Coach)" value={role} onChange={e => setRole(e.target.value)} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                    <textarea placeholder="Bio" value={bio} onChange={e => setBio(e.target.value)} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={4} required />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Team Member Photo</label>
                        <ImageUploader onUpload={setPhotoUrl} />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors">Cancel</button>
                        <button type="submit" className="bg-tyga-primary hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-colors">Add Member</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const AboutPage: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [team, setTeam] = usePersistentState<TeamMember[]>('tyga_team', MOCK_TEAM);
    const [showModal, setShowModal] = useState(false);

    const handleAddMember = (newMember: Omit<TeamMember, 'id'>) => {
        setTeam(prevTeam => [...prevTeam, { ...newMember, id: `team-${Date.now()}` }]);
        setShowModal(false);
    };

    const handleAddMemberClick = () => {
      if (isAuthenticated) {
        setShowModal(true);
      } else {
        navigate('/login');
      }
    };

  return (
    <div className="py-20 bg-tyga-light dark:bg-black transition-colors duration-300 animate-fade-in">
       {showModal && <AddMemberModal onCancel={() => setShowModal(false)} onSubmit={handleAddMember} />}
      <div className="container mx-auto px-6">
        
        {isAuthenticated && <SiteBrandingManager />}

        {/* Mission/Vision Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h1 className="text-4xl font-bold font-display tracking-tight text-tyga-dark dark:text-white sm:text-5xl mb-6">About TYGA</h1>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Thipe Youth Golf Academy (TYGA) is an innovative youth golf development academy focused on junior golf development for disadvantaged kids, utilizing golf as a vehicle to instill personal growth, skills development, and community engagement.
              </p>
              <p className="font-semibold text-tyga-primary dark:text-tyga-secondary">
                Our mission is to empower disadvantaged youth through golf, fostering personal growth, leadership development, and community engagement.
              </p>
              <p>
                We believe that by fostering a love for the game and teaching life skills, we can empower young people to excel not only in sports but in all areas of their lives, contributing positively to their communities.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <img src="https://picsum.photos/seed/coaching/800/600" alt="TYGA coaching session" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display tracking-tight text-tyga-dark dark:text-white sm:text-5xl">Meet Our Team</h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">The dedicated individuals driving our mission forward.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            {team.map(member => (
                <TeamMemberCard key={member.id} member={member} />
            ))}
        </div>
        <div className="text-center mt-16">
            <button onClick={handleAddMemberClick} className="bg-tyga-secondary text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 button-glow">
                Add Team Member
            </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
