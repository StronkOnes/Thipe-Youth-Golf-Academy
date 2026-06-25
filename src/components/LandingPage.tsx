import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GolfFlagIcon, CommunityIcon, SustainabilityIcon, ArrowRightIcon } from './icons';

const DEFAULT_SPLASH_IMAGE = "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=1920&h=1080";
const DEFAULT_LOGO = "https://www.imgchest.com/p/92493pb2v4n";

const LandingPage: React.FC = () => {
  const [splashImage, setSplashImage] = useState(DEFAULT_SPLASH_IMAGE);
  const [logo, setLogo] = useState(DEFAULT_LOGO);

  useEffect(() => {
    try {
      const customSplash = window.localStorage.getItem('tyga_splash_image');
      if (customSplash) {
        setSplashImage(customSplash);
      }
       const customLogo = window.localStorage.getItem('tyga_site_logo');
       if (customLogo) {
        setLogo(customLogo);
       }
    } catch (error) {
      console.error("Failed to read from localStorage", error);
    }
  }, []);


  const features = [
    { icon: <GolfFlagIcon className="w-12 h-12 text-tyga-primary" />, title: 'Elite Coaching', text: 'Expert trainers & small groups for personalized attention.' },
    { icon: <CommunityIcon className="w-12 h-12 text-tyga-primary" />, title: 'Career Pathways', text: 'SETA learnerships & life skills for a future beyond the fairway.' },
    { icon: <SustainabilityIcon className="w-12 h-12 text-tyga-primary" />, title: 'Holistic Development', text: 'A unique, revenue-driven approach to creating lasting impact.' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        <div className="absolute inset-0 w-full h-full animate-ken-burns">
          <img src={splashImage} alt="Young golfer taking a swing on a beautiful course" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-20 text-center px-4 animate-fade-in-down">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold tracking-tight mb-4 text-shadow-lg text-gradient bg-gradient-to-b from-white to-gray-300">
            Shaping Champions
          </h1>
          <p className="text-2xl md:text-4xl font-light mb-10 text-gray-200 max-w-4xl mx-auto text-shadow-lg">On the Course, and In Life.</p>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-3 bg-tyga-secondary text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl button-glow"
          >
            <span>Join The Academy</span>
            <ArrowRightIcon className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-tyga-light dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-tyga-dark dark:text-white">The <span className="text-gradient bg-gradient-to-r from-tyga-primary to-tyga-secondary">TYGA</span> Difference</h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">More than just a golf academy, we are a launchpad for future leaders.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {features.map((feature, index) => (
              <div key={index} 
                className="flex flex-col items-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 card-glow border border-gray-200 dark:border-gray-800"
                style={{ animation: `fade-in-up ${0.5 + index * 0.2}s ease-in-out forwards`, opacity: 0 }}
              >
                <div className="bg-tyga-secondary/10 dark:bg-tyga-primary/20 p-5 rounded-full mb-6 ring-4 ring-white dark:ring-gray-900">{feature.icon}</div>
                <h3 className="text-2xl font-display font-bold text-tyga-dark dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Philosophy Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-6 text-center">
              <div className="max-w-4xl mx-auto animate-fade-in-up">
                <img src={logo} alt="TYGA Logo" className="h-24 mx-auto mb-6 dark:invert" />
                <h2 className="text-3xl md:text-4xl font-display font-bold text-tyga-dark dark:text-white leading-tight">
                    "We believe every child deserves the opportunity to excel. Golf is our classroom for teaching discipline, integrity, and the power of perseverance."
                </h2>
                <p className="mt-6 text-xl font-semibold text-gray-700 dark:text-gray-300">
                    - Johnathan Smith, Founder
                </p>
            </div>
          </div>
      </section>

    </div>
  );
};

export default LandingPage;
