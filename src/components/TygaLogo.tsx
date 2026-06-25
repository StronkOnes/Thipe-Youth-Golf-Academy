import React, { useState, useEffect } from 'react';

const DEFAULT_LOGO = "https://www.imgchest.com/p/92493pb2v4n";

interface TygaLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

const TygaLogo: React.FC<TygaLogoProps> = ({ className, variant = 'dark' }) => {
  const [logoSrc, setLogoSrc] = useState(DEFAULT_LOGO);
  
  useEffect(() => {
    try {
      const customLogo = window.localStorage.getItem('tyga_site_logo');
      if (customLogo) {
        setLogoSrc(customLogo);
      }
    } catch (error) {
        console.error("Failed to read logo from localStorage", error);
    }

    const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'tyga_site_logo') {
            setLogoSrc(event.newValue || DEFAULT_LOGO);
        }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const style: React.CSSProperties = {};
  if (variant === 'light') {
    style.filter = 'brightness(0) invert(1)';
  }

  return (
    <img 
      src={logoSrc} 
      alt="Thipe Youth Golf Academy Logo" 
      className={className} 
      style={style}
    />
  );
};

export default TygaLogo;
