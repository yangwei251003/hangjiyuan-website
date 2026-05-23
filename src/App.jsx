import React, { useEffect, useState } from 'react';
import HeroCanvas from './components/HeroCanvas';
import Hero from './components/Hero';
import Survey from './components/Survey';
import Logistics from './components/Logistics';
import Racing from './components/Racing';
import Academy from './components/Academy';
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

    // 2. Survey Section ScrollTrigger
    ScrollTrigger.create({
      trigger: '#survey-section',
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => {
        setActiveSection('survey');
        transitionTheme('#10b981', '16, 185, 129');
      },
      onEnterBack: () => {
        setActiveSection('survey');
        transitionTheme('#10b981', '16, 185, 129');
      },
    });

    // 3. Logistics Section ScrollTrigger
    ScrollTrigger.create({
      trigger: '#logistics-section',
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => {
        setActiveSection('logistics');
        transitionTheme('#06b6d4', '6, 182, 212');
      },
      onEnterBack: () => {
        setActiveSection('logistics');
        transitionTheme('#06b6d4', '6, 182, 212');
      },
    });

    // 4. Racing Section ScrollTrigger
    ScrollTrigger.create({
      trigger: '#racing-section',
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => {
        setActiveSection('racing');
        transitionTheme('#f97316', '249, 115, 22');
      },
      onEnterBack: () => {
        setActiveSection('racing');
        transitionTheme('#f97316', '249, 115, 22');
      },
    });

    // 5. Academy Section ScrollTrigger
    ScrollTrigger.create({
      trigger: '#academy-section',
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => {
        setActiveSection('academy');
        transitionTheme('#e2e8f0', '226, 232, 240');
      },
      onEnterBack: () => {
        setActiveSection('academy');
        transitionTheme('#e2e8f0', '226, 232, 240');
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

      {/* 🧭 2. Sci-Fi Glassmorphic Navigation Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-base-dark/45 border-b border-white/5 h-20 flex items-center transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 xl:px-16 flex items-center justify-between">
          
          {/* Logo brand */}
          <a href="#" className="flex items-center gap-2.5 group" onClick={(e) => handleScrollTo(e, 'hero-section')}>
            <div className="relative w-9 h-9 rounded-lg bg-accent-hero/10 border border-accent-hero/25 flex items-center justify-center overflow-hidden shadow-glow-sm transition-all duration-300 group-hover:border-theme-accent/50 group-hover:shadow-glow-md">
              <Plane className="w-5 h-5 text-theme-accent transform -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-wider text-white font-sans leading-none">航纪元</span>
              <span className="text-[9px] font-mono tracking-[0.25em] text-theme-accent uppercase leading-none mt-1 transition-colors duration-300">Aero Era</span>
            </div>
          </a>

          {/* Navigation Links */}
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
              href="#survey-section" 
              onClick={(e) => handleScrollTo(e, 'survey-section')}
              className={`transition-all duration-300 tracking-wide ${
                activeSection === 'survey' 
                  ? 'text-accent-agri font-bold drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              测绘植保
            </a>
            <a 
              href="#logistics-section" 
              onClick={(e) => handleScrollTo(e, 'logistics-section')}
              className={`transition-all duration-300 tracking-wide ${
                activeSection === 'logistics' 
                  ? 'text-accent-logi font-bold drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              外卖物流
            </a>
            <a 
              href="#racing-section" 
              onClick={(e) => handleScrollTo(e, 'racing-section')}
              className={`transition-all duration-300 tracking-wide ${
                activeSection === 'racing' 
                  ? 'text-accent-fpv font-bold drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              FPV竞速
            </a>
            <a 
              href="#academy-section" 
              onClick={(e) => handleScrollTo(e, 'academy-section')}
              className={`transition-all duration-300 tracking-wide ${
                activeSection === 'academy' 
                  ? 'text-accent-edu font-bold drop-shadow-[0_0_8px_rgba(226,232,240,0.4)]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              培训维修
            </a>
          </nav>

          {/* CTA contact */}
          <div className="flex items-center gap-4">
            <button className="px-5 py-2.5 bg-white/5 border border-white/10 hover:border-theme-accent/40 text-sm font-semibold rounded-lg hover:bg-theme-accent/5 transition-all duration-300">
              商务对接
            </button>
          </div>
        </div>
      </header>

      {/* 🚀 3. Page Sections */}
      <main className="relative z-10">
        <Hero />
        <Survey />
        <Logistics />
        <Racing />
        <Academy />
      </main>
    </div>
  );
}
