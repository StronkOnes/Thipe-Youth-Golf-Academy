

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_EVENTS } from '../constants';
import { Event } from '../types';
import { useAuth } from '../../contexts/AuthContext';
import { TrashIcon } from './icons';
import ImageUploader from './ImageUploader';
import { usePersistentState } from '../hooks/usePersistentState';

const AddEventModal: React.FC<{ onCancel: () => void, onSubmit: (event: Omit<Event, 'id'>) => void }> = ({ onCancel, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [posterUrl, setPosterUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageUrl) {
            alert("Please upload a main image for the event.");
            return;
        }
        onSubmit({ title, date, description, imageUrl, posterUrl: posterUrl || undefined });
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onCancel}>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-lg animate-fade-in-down" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold font-display mb-4 text-tyga-dark dark:text-white">Create New Event</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Event Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                    <input type="text" placeholder="Event Date (e.g., August 15, 2025)" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={5} required />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Main Event Image</label>
                        <ImageUploader onUpload={setImageUrl} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Poster Image (Optional)</label>
                        <ImageUploader onUpload={setPosterUrl} />
                    </div>
                    <div className="flex justify-end gap-4 pt-2">
                        <button type="button" onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md">Cancel</button>
                        <button type="submit" className="bg-tyga-primary hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md">Create Event</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const EventModal: React.FC<{ event: Event, onClose: () => void }> = ({ event, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-hidden flex flex-col animate-fade-in-down" onClick={e => e.stopPropagation()}>
                <div className="relative">
                    <img className="w-full h-96 object-cover rounded-t-xl" src={event.imageUrl} alt={event.title} />
                    <button onClick={onClose} className="absolute top-3 right-3 bg-white/70 rounded-full p-2 text-gray-800 hover:bg-white transition-transform transform hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-8 overflow-y-auto">
                    <p className="text-tyga-secondary font-semibold mb-2">{event.date}</p>
                    <h2 className="text-3xl font-bold font-display text-tyga-dark dark:text-white mb-4">{event.title}</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{event.description}</p>
                     {event.posterUrl && (
                        <div className="mt-6 border-t dark:border-gray-700 pt-6">
                            <h3 className="text-2xl font-bold font-display text-tyga-dark dark:text-white mb-4 text-center">Event Poster</h3>
                            <img src={event.posterUrl} alt={`${event.title} Poster`} className="w-full h-auto rounded-lg shadow-lg" />
                        </div>
                    )}
                </div>
                 <div className="p-6 bg-gray-50 dark:bg-black rounded-b-xl mt-auto flex justify-between items-center">
                    {event.title === 'Weekly Lessons' ? (
                        <Link to="/onboarding" onClick={onClose} className="bg-tyga-secondary hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg transition-colors button-glow">
                            Sign Up Now
                        </Link>
                    ) : ( <div /> )}
                    <button onClick={onClose} className="bg-tyga-primary hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};


const EventCard: React.FC<{ event: Event; onLearnMore: (event: Event) => void; onDelete: (id: string) => void; isAdmin: boolean; }> = ({ event, onLearnMore, onDelete, isAdmin }) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden flex flex-col group relative transition-all duration-300 card-glow">
    {isAdmin && (
         <button 
            onClick={() => onDelete(event.id)}
            className="absolute top-2 right-2 bg-red-600/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700 z-10"
            aria-label="Delete event"
        >
            <TrashIcon className="h-5 w-5" />
        </button>
    )}
    <div className="overflow-hidden">
        <img className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500" src={event.imageUrl} alt={event.title} />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <p className="text-tyga-secondary font-semibold mb-1">{event.date}</p>
      <h3 className="text-2xl font-bold font-display text-tyga-dark dark:text-white mb-3">{event.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">{event.description}</p>
      <button onClick={() => onLearnMore(event)} className="mt-auto self-start text-tyga-primary dark:text-tyga-secondary font-bold hover:underline transition-colors duration-300">
        Learn More &rarr;
      </button>
    </div>
  </div>
);

const EventsPage: React.FC = () => {
  const [events, setEvents] = usePersistentState<Event[]>('tyga_events_v2', MOCK_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddEventClick = () => {
    if (isAuthenticated) {
        setShowAddModal(true);
    } else {
        navigate('/login');
    }
  };

  const handleAddNewEvent = (newEventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...newEventData,
      id: `evt-${Date.now()}`
    };
    setEvents(prevEvents => [newEvent, ...prevEvents]);
    setShowAddModal(false);
  };
  
  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    }
  };

  return (
    <div className="py-16 sm:py-24 bg-tyga-light dark:bg-black transition-colors duration-300 animate-fade-in">
      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      {showAddModal && <AddEventModal onCancel={() => setShowAddModal(false)} onSubmit={handleAddNewEvent} />}
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-display tracking-tight text-tyga-dark dark:text-white sm:text-5xl">Our Programs & Events</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Join us for our next tournament, workshop, or community day.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <EventCard 
                key={event.id} 
                event={event} 
                onLearnMore={setSelectedEvent} 
                onDelete={handleDeleteEvent}
                isAdmin={isAuthenticated}
            />
          ))}
        </div>

         <div className="text-center mt-16">
            <button onClick={handleAddEventClick} className="bg-tyga-primary text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 button-glow">
                Add Event
            </button>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;