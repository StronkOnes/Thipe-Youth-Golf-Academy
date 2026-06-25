import React from 'react';
import ImageUploader from './ImageUploader';

const SiteBrandingManager: React.FC = () => {

    const handleLogoUpload = (url: string) => {
        try {
            window.localStorage.setItem('tyga_site_logo', url);
        } catch (error) {
            alert("Could not save the logo. Browser storage might be full.");
            console.error("Failed to save logo to localStorage", error);
        }
    };
    
    const handleSplashUpload = (url: string) => {
         try {
            window.localStorage.setItem('tyga_splash_image', url);
        } catch (error) {
            alert("Could not save the image. Browser storage might be full.");
            console.error("Failed to save splash image to localStorage", error);
        }
    };
    
    const applyChanges = () => {
        window.location.reload();
    };

    return (
        <div className="mb-16 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl border border-tyga-secondary/20">
            <h2 className="text-2xl font-bold font-display text-tyga-dark dark:text-white mb-4">Site Branding Management</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                    <h3 className="text-lg font-semibold dark:text-gray-200 mb-2">Site Logo</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">This logo appears in the header and footer.</p>
                    <ImageUploader onUpload={handleLogoUpload} initialImageUrl={localStorage.getItem('tyga_site_logo')} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold dark:text-gray-200 mb-2">Homepage Image</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">This is the main background image on the landing page.</p>
                    <ImageUploader onUpload={handleSplashUpload} initialImageUrl={localStorage.getItem('tyga_splash_image')} />
                </div>
            </div>
            <div className="text-right">
                <button 
                    onClick={applyChanges}
                    className="bg-tyga-primary hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                    Save & Reload to Apply
                </button>
            </div>
        </div>
    );
};

export default SiteBrandingManager;
