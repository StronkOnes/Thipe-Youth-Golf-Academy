import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { GolfFlagIcon, CommunityIcon, SustainabilityIcon, ArrowRightIcon, SparklesIcon, WhatsAppIcon } from './icons';
import { MOCK_SPONSORS, MOCK_PACKAGES } from '../constants';
import TygaLogo from './TygaLogo';
import useScrollReveal from '../hooks/useScrollReveal';

const DEFAULT_SPLASH_IMAGE = "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=1920&h=1080";

const STATS = [
  { value: 200, suffix: '+', label: 'Students Reached' },
  { value: 10, suffix: '+', label: 'Partner Schools' },
  { value: 5, suffix: '', label: 'Program Pillars' },
  { value: 6, suffix: '', label: 'Key Partners' },
];

const TESTIMONIALS = [
  { quote: "TYGA didn't just teach my son golf — it taught him discipline, focus, and how to set goals. The transformation has been incredible.", name: "Jane Doe", role: "Parent of Leo Doe" },
  { quote: "The coaches here genuinely care. Every session pushes me to be better, and the swing analysis feature is a game-changer.", name: "Sofia Gomez", role: "Student" },
  { quote: "We've seen remarkable growth in our students — not just as golfers, but as young leaders. That's what makes TYGA special.", name: "Coach David", role: "Senior Coach" },
];

const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
    >
      {children}
    </div>
  );
};

const AnimatedCounter: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal<HTMLSpanElement>({ threshold: 0.5 });

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-display font-bold text-tyga-primary dark:text-tyga-secondary">
      {count}{suffix}
    </span>
  );
};

const LandingPage: React.FC = () => {
  const [splashImage, setSplashImage] = useState(DEFAULT_SPLASH_IMAGE);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    try {
      const customSplash = window.localStorage.getItem('tyga_splash_image');
      if (customSplash) setSplashImage(customSplash);
    } catch (error) {
      console.error("Failed to read from localStorage", error);
    }
  }, []);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const heroParallaxStyle = {
    transform: `translateY(${scrollY * 0.3}px)`,
  };

  const features = [
    { icon: <GolfFlagIcon className="w-12 h-12 text-tyga-primary" />, title: 'Introduce Golf in Schools', text: 'Bringing golf to township schools and creating an interschool golf league for young athletes.' },
    { icon: <CommunityIcon className="w-12 h-12 text-tyga-primary" />, title: 'Mindset Change Through Sport', text: 'Using golf principles to instill discipline, focus, and good values from an early age.' },
    { icon: <SustainabilityIcon className="w-12 h-12 text-tyga-primary" />, title: 'Golf & Technology', text: 'Digital swing analysis, launch monitors, and a custom app for coaches, students, and parents.' },
  ];

  const sponsors = MOCK_SPONSORS;

  return (
    <div className="animate-fade-in overflow-x-hidden">
      <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        <div className="absolute inset-0 w-full h-full" style={heroParallaxStyle}>
          <video autoPlay muted loop playsinline poster={splashImage} className="w-full h-[120%] object-cover">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-20 text-center px-4 animate-fade-in-down">
          <TygaLogo className="h-20 md:h-28 w-auto mx-auto mb-6" variant="light" />
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

      <section className="py-16 md:py-20 bg-gradient-to-br from-tyga-primary/5 via-transparent to-tyga-secondary/5 dark:from-tyga-primary/10 dark:via-gray-950 dark:to-tyga-secondary/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {STATS.map((stat, index) => (
              <ScrollReveal key={index}>
                <div className="flex flex-col items-center">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-tyga-light dark:bg-black">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-tyga-dark dark:text-white">The <span className="text-gradient bg-gradient-to-r from-tyga-primary to-tyga-secondary">TYGA</span> Difference</h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">A program designed to introduce golf in township schools and develop young leaders through the values of the game.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {features.map((feature, index) => (
              <ScrollReveal key={index}>
                <div
                  className="flex flex-col items-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 card-glow border border-gray-200 dark:border-gray-800 h-full"
                >
                  <div className="bg-tyga-secondary/10 dark:bg-tyga-primary/20 p-5 rounded-full mb-6 ring-4 ring-white dark:ring-gray-900">{feature.icon}</div>
                  <h3 className="text-2xl font-display font-bold text-tyga-dark dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-tyga-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-tyga-secondary rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-tyga-dark dark:text-white">Our <span className="text-gradient bg-gradient-to-r from-tyga-primary to-tyga-secondary">Programs</span></h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Our training includes putting greens, driving range nets, digital tracking, and a custom app for parents, coaches, and students.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {MOCK_PACKAGES.map((pkg, index) => (
              <ScrollReveal key={pkg.id}>
                <div className={`flex flex-col p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border-2 transition-all duration-300 transform hover:-translate-y-2 ${index === 1 ? 'border-tyga-secondary scale-105 md:scale-110 relative' : 'border-gray-200 dark:border-gray-800'}`}>
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-tyga-secondary text-white text-sm font-bold px-6 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-display font-bold text-tyga-dark dark:text-white mb-2">{pkg.name}</h3>
                  <p className="text-4xl font-bold text-tyga-primary dark:text-tyga-secondary mb-4">R{pkg.price}<span className="text-lg text-gray-500 font-normal">/mo</span></p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{pkg.description}</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <SparklesIcon className="w-5 h-5 text-tyga-primary flex-shrink-0" />
                      <span>{pkg.lessonsPerMonth} lessons per month</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <SparklesIcon className="w-5 h-5 text-tyga-primary flex-shrink-0" />
                      <span>Small group training</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <SparklesIcon className="w-5 h-5 text-tyga-primary flex-shrink-0" />
                      <span>Access to practice facilities</span>
                    </li>
                  </ul>
                  <Link
                    to="/onboarding"
                    className={`block text-center font-bold py-3 px-6 rounded-full transition-all duration-300 ${index === 1 ? 'bg-tyga-secondary text-white hover:bg-tyga-secondary/90 hover:shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-tyga-dark dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                  >
                    Get Started
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-tyga-dark dark:text-white">What <span className="text-gradient bg-gradient-to-r from-tyga-primary to-tyga-secondary">People</span> Say</h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Our measure of success is the number of students becoming great social and competitive players.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <ScrollReveal key={index}>
                <div className="flex flex-col p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 h-full">
                  <div className="mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic mb-6 flex-grow">"{testimonial.quote}"</p>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-auto">
                    <p className="font-bold text-tyga-dark dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 dark:bg-black overflow-hidden">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-tyga-dark dark:text-white">Our <span className="text-gradient bg-gradient-to-r from-tyga-primary to-tyga-secondary">Partners</span></h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Partnering with organizations and individuals who share our vision for youth development through golf.</p>
            </div>
          </ScrollReveal>
        </div>
        <div className="relative">
          <div className="flex gap-16 animate-marquee">
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <div key={`${sponsor.id}-${index}`} className="flex-shrink-0 flex items-center justify-center h-24 w-48">
                <img
                  className="max-h-16 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  src={sponsor.logoUrl}
                  alt={sponsor.name}
                />
              </div>
            ))}
          </div>
        </div>
      </section>



      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 text-center">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <img src="/TYGAtransparent.png" alt="TYGA Logo" className="h-20 mx-auto mb-6 dark:invert" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-tyga-dark dark:text-white leading-tight">
                "We want to groom young boys and girls to excel at a sport that represents good values, discipline, and focus — so they can grow into respectable gentlemen and ladies and become a positive influence on their community."
              </h2>
              <p className="mt-6 text-xl font-semibold text-gray-700 dark:text-gray-300">
                - Dennis Ndau, Founder
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative py-32 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video autoPlay muted loop playsinline className="w-full h-full object-cover">
            <source src="/golf-flower.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/60 z-10 pointer-events-none"></div>
        <ScrollReveal>
          <div className="relative z-20 text-center px-6">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Begin Your Journey</h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10">
              Join us in bringing golf to township schools and shaping the next generation of leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
              <Link
                to="/onboarding"
                className="inline-flex items-center gap-3 bg-white text-tyga-dark font-bold py-5 px-12 rounded-full text-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-lg"
              >
                <span>Enroll Now</span>
                <ArrowRightIcon className="w-6 h-6" />
              </Link>
              <a
                href="https://wa.me/27123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 text-white font-bold py-5 px-12 rounded-full text-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-lg"
              >
                <WhatsAppIcon className="w-6 h-6" />
                <span>Chat With Us</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default LandingPage;
