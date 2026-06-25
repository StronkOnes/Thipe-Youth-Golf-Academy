import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_GALLERY } from '../constants';
import { GalleryItem } from '../types';
import { useAuth } from '../../contexts/AuthContext';
import { TrashIcon } from './icons';
import ImageUploader from './ImageUploader';
import { usePersistentState } from '../hooks/usePersistentState';

const Lightbox: React.FC<{ items: GalleryItem[]; currentIndex: number; onClose: () => void; onPrev: () => void; onNext: () => void }> = ({ items, currentIndex, onClose, onPrev, onNext }) => {
  const item = items[currentIndex];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white z-10 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      {currentIndex > 0 && (
        <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
      )}

      {currentIndex < items.length - 1 && (
        <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      )}

      <div className="max-w-[90vw] max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img src={item.imageUrl} alt={item.caption} className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" />
        <p className="mt-4 text-white/80 text-lg text-center">{item.caption}</p>
        <p className="mt-1 text-white/50 text-sm">{currentIndex + 1} / {items.length}</p>
      </div>
    </div>
  );
};

const AddGalleryItemModal: React.FC<{ onCancel: () => void; onSubmit: (item: Omit<GalleryItem, 'id' | 'uploadDate'>) => void; }> = ({ onCancel, onSubmit }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageUrl) {
            alert("Please upload an image first.");
            return;
        }
        onSubmit({ imageUrl, caption });
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onCancel}>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in-down" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold font-display mb-4 text-tyga-dark dark:text-white">Add to Gallery</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image</label>
                        <ImageUploader onUpload={setImageUrl} />
                    </div>
                    <input type="text" placeholder="Image caption" value={caption} onChange={e => setCaption(e.target.value)} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                    <div className="flex justify-end gap-4 pt-2">
                        <button type="button" onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md">Cancel</button>
                        <button type="submit" className="bg-tyga-primary hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md">Add Image</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const GalleryPage: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [galleryItems, setGalleryItems] = usePersistentState<GalleryItem[]>('tyga_gallery_v2', MOCK_GALLERY);
    const [showAddModal, setShowAddModal] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            setGalleryItems(currentItems => currentItems.filter(item => item.id !== id));
        }
    };

    const handleUploadClick = () => {
        if (isAuthenticated) {
            setShowAddModal(true);
        } else {
            navigate('/login');
        }
    };

    const handleAddItem = (newItemData: Omit<GalleryItem, 'id' | 'uploadDate'>) => {
        const newItem: GalleryItem = {
            ...newItemData,
            id: `gal-${Date.now()}`,
            uploadDate: new Date().toISOString(),
        };
        setGalleryItems(prev => [newItem, ...prev]);
        setShowAddModal(false);
    };

    const handlePrev = useCallback(() => {
        setLightboxIndex(prev => prev !== null && prev > 0 ? prev - 1 : prev);
    }, []);

    const handleNext = useCallback(() => {
        setLightboxIndex(prev => prev !== null && prev < galleryItems.length - 1 ? prev + 1 : prev);
    }, [galleryItems.length]);

  return (
    <div className="py-16 sm:py-24 bg-tyga-light dark:bg-black transition-colors duration-300 animate-fade-in">
      {lightboxIndex !== null && (
        <Lightbox items={galleryItems} currentIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} onPrev={handlePrev} onNext={handleNext} />
      )}
      {showAddModal && <AddGalleryItemModal onCancel={() => setShowAddModal(false)} onSubmit={handleAddItem} />}
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-display tracking-tight text-tyga-dark dark:text-white sm:text-5xl">TYGA Moments</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">A snapshot of life, learning, and success at the academy.</p>
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryItems.map((item, index) => (
            <div key={item.id} className="overflow-hidden rounded-lg shadow-lg break-inside-avoid group relative cursor-pointer" onClick={() => setLightboxIndex(index)}>
                <img className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110" src={item.imageUrl} alt={item.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="absolute bottom-0 left-0 p-4 text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {item.caption}
                </p>
                 {isAuthenticated && (
                    <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                        className="absolute top-2 right-2 bg-red-600/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700"
                        aria-label="Delete image"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
            <button onClick={handleUploadClick} className="bg-tyga-primary text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 button-glow">
                Upload Image
            </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;