

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_GALLERY } from '../constants';
import { GalleryItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { TrashIcon } from './icons';
import ImageUploader from './ImageUploader';
import { usePersistentState } from '../hooks/usePersistentState';

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
    const [galleryItems, setGalleryItems] = usePersistentState<GalleryItem[]>('tyga_gallery', MOCK_GALLERY);
    const [showAddModal, setShowAddModal] = useState(false);

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

  return (
    <div className="py-16 sm:py-24 bg-tyga-light dark:bg-black transition-colors duration-300 animate-fade-in">
      {showAddModal && <AddGalleryItemModal onCancel={() => setShowAddModal(false)} onSubmit={handleAddItem} />}
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-display tracking-tight text-tyga-dark dark:text-white sm:text-5xl">TYGA Moments</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">A snapshot of life, learning, and success at the academy.</p>
        </div>
        
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryItems.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-lg shadow-lg break-inside-avoid group relative">
                <img className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110" src={item.imageUrl} alt={item.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="absolute bottom-0 left-0 p-4 text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {item.caption}
                </p>
                 {isAuthenticated && (
                    <button 
                        onClick={() => handleDelete(item.id)}
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