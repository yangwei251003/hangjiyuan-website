import React, { useEffect, useState } from 'react';
import HeroCanvas from './components/HeroCanvas';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import ServicesHub from './components/ServicesHub';
import { Plane } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // 🧬 Dynamic scroll theme transition logic
    
    // 1. Hero Section ScrollTrigger
    ScrollTrigger.create({
      trigger: '#hero-section',
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => {
        setActiveSection('hero');
        transitionTheme('#00a2ff', '0, 162, 255');
      },
      onEnterBack: () => {
        setActiveSection('hero');
        transitionTheme('#00a2ff', '0, 162, 255');
      },
    });

    // 2. About Section ScrollTrigger
    ScrollTrigger.create({
      trigger: '#about-section',
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => {
        setActiveSection('about');
        transitionTheme('#00a2ff', '0, 162, 255');
      },
      onEnterBack: () => {
        setActiveSection('about');
        transitionTheme('#00a2ff', '0, 162, 255');
      },
    });

    // 3. Services Section ScrollTrigger
    ScrollTrigger.create({
      trigger: '#services-section',
      start: 'top 40%',
      end: 'bottom 60%',
      onEnter: () => {
        setActiveSection('services');
      },
      onEnterBack: () => {
        setActiveSection('services');
      },
    });

    // Smooth transition function for root CSS variables
    function transitionTheme(hex, rgb) {
      gsap.to(':root', {
        '--theme-accent': hex,
        '--theme-accent-rgb': rgb,
        duration: 0.8,
        ease: 'power2.out'
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Smooth scroll handler for anchor links
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-base-dark text-white select-none overflow-x-hidden">
      {/* 🔮 1. Interactive full-screen aerodynamic flow field background */}
      <HeroCanvas />

      {/* 🧭 2. Sci-Fi Glassmorphic Navigation Header (Mobile responsive, no wrap) */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-base-dark/45 border-b border-white/5 h-20 flex items-center transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 xl:px-16 flex items-center justify-between gap-4">
          
          {/* Logo brand */}
          <a href="#" className="flex items-center gap-2 group shrink-0" onClick={(e) => handleScrollTo(e, 'hero-section')}>
            <div className="relative w-8 h-8 rounded-lg bg-accent-hero/10 border border-accent-hero/25 flex items-center justify-center overflow-hidden shadow-glow-sm transition-all duration-300 group-hover:border-theme-accent/50 group-hover:shadow-glow-md">
              <Plane className="w-4 h-4 text-theme-accent transform -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold tracking-wider text-white font-sans leading-none">航纪元</span>
              <span className="text-[8px] font-mono tracking-[0.2em] text-theme-accent uppercase leading-none mt-1 transition-colors duration-300">Aero Era</span>
            </div>
          </a>

          {/* Navigation Links (Hidden on Mobile) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a 
              href="#hero-section" 
              onClick={(e) => handleScrollTo(e, 'hero-section')}
              className={`transition-all duration-300 tracking-wide ${
                activeSection === 'hero' 
                  ? 'text-accent-hero font-bold drop-shadow-[0_0_8px_rgba(0,162,255,0.4)]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              首屏纪元
            </a>
            <a 
              href="#about-section" 
              onClick={(e) => handleScrollTo(e, 'about-section')}
              className={`transition-all duration-300 tracking-wide ${
                activeSection === 'about' 
                  ? 'text-accent-hero font-bold drop-shadow-[0_0_8px_rgba(0,162,255,0.4)]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              关于我们
            </a>
            <a 
              href="#services-section" 
              onClick={(e) => handleScrollTo(e, 'services-section')}
              className={`transition-all duration-300 tracking-wide ${
                activeSection === 'services' 
                  ? 'text-theme-accent font-bold drop-shadow-[0_0_8px_rgba(var(--theme-accent-rgb),0.4)]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              业务全景
            </a>
          </nav>

          {/* CTA contact */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="px-4 py-2 bg-white/5 border border-white/10 hover:border-theme-accent/40 text-xs sm:text-sm font-semibold rounded-lg hover:bg-theme-accent/5 transition-all duration-300">
              商务对接
            </button>
          </div>
        </div>
      </header>

      {/* 🚀 3. Page Sections */}
      <main className="relative z-10">
        <Hero />
        <AboutUs />
        <ServicesHub />
      </main>
    </div>
  );
}
