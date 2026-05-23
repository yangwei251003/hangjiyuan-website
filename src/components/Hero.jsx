import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Cpu, Radio, Shield, Gauge } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const logoPillarsRef = useRef([]);
  const logoSwooshRef = useRef(null);
  const logoPropRef = useRef(null);
  const logoTextRef = useRef(null);
  const dashboardRef = useRef(null);

  // Live telemetry state for high-fidelity interactive feel
  const [telemetry, setTelemetry] = useState({
    altitude: 120,
    speed: 45.2,
    battery: 98,
    signal: 99,
  });

  useEffect(() => {
    // 1. Simulate telemetry updating (HUD dashboard micro-interaction)
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        altitude: +(prev.altitude + (Math.random() - 0.5) * 2).toFixed(1),
        speed: +(prev.speed + (Math.random() - 0.5) * 1.5).toFixed(1),
        battery: Math.max(0, prev.battery - (Math.random() > 0.8 ? 1 : 0)),
        signal: Math.min(100, Math.max(90, prev.signal + Math.floor((Math.random() - 0.5) * 3))),
      }));
    }, 1500);

    // 2. GSAP Entrance Animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Reset swoosh stroke offset
      const swooshPath = logoSwooshRef.current;
      if (swooshPath) {
        const pathLength = swooshPath.getTotalLength();
        swooshPath.style.strokeDasharray = pathLength;
        swooshPath.style.strokeDashoffset = pathLength;

        // Animate Swoosh Path (flight trace)
        tl.to(swooshPath, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: 'power2.inOut',
        }, 0.2);
      }

      // Animate Logo Pillars (H shape structure)
      logoPillarsRef.current.forEach((pillar, idx) => {
        tl.fromTo(pillar, 
          { opacity: 0, y: idx % 2 === 0 ? -40 : 40, scaleY: 0.8 },
          { opacity: 1, y: 0, scaleY: 1, duration: 1.2 },
          0.4
        );
      });

      // Animate Propeller (drone tip spinning & scale in)
      if (logoPropRef.current) {
        tl.fromTo(logoPropRef.current,
          { scale: 0, rotation: -180, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 1.4, ease: 'back.out(1.7)' },
          1.2
        );
        // Continuous rotation loop to simulate propeller operation
        gsap.to(logoPropRef.current, {
          rotation: 360,
          duration: 2.5,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%',
        });
      }

      // Animate Logo text brand
      if (logoTextRef.current) {
        tl.fromTo(logoTextRef.current.querySelectorAll('.letter-anim'),
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.8 },
          1.0
        );
      }

      // Animate Left column contents (Typography & CTA)
      if (leftColRef.current) {
        const elements = leftColRef.current.children;
        tl.fromTo(elements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 1.0 },
          0.8
        );
      }

      // Animate Right HUD Dashboard floating card
      if (dashboardRef.current) {
        tl.fromTo(dashboardRef.current,
          { opacity: 0, scale: 0.95, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2 },
          1.2
        );
      }
    }, containerRef);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 md:px-8 xl:px-16 overflow-hidden bg-base-dark"
    >
      {/* 🚀 Main layout container */}
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* 1. Left Typography Content Column */}
        <div ref={leftColRef} className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          {/* Badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-theme-accent/10 border border-theme-accent/20 text-accent-hero text-sm font-medium tracking-wide">
            <Cpu className="w-4 h-4 animate-pulse" />
            <span>背靠“广州科技职业技术大学”专业研发力量</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-none text-white">
            低空经济纪元 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-hero to-[#70c9ff] glow-text">
              硬核智能起航
            </span>
          </h1>

          {/* Paragraph description */}
          <p className="max-w-xl text-gray-400 text-base md:text-lg font-light leading-relaxed">
            航纪元科技深耕粤港澳大湾区核心空域，致力于提供顶级工业无人机全案服务。
            我们整合智能飞行器制造、先进控制算法开发与立体运营保障，打通智能无人系统落地应用的最后一公里。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="group relative flex items-center gap-2 px-6 py-3.5 bg-accent-hero hover:bg-[#0091e6] text-base-dark font-semibold rounded-lg shadow-glow-sm hover:shadow-glow-md transition-all duration-300">
              <span>探索空域</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="flex items-center gap-2 px-6 py-3.5 border border-white/10 hover:border-accent-hero/50 text-white font-medium rounded-lg backdrop-blur-md bg-white/5 hover:bg-accent-hero/5 transition-all duration-300">
              <span>业务全景</span>
            </button>
          </div>

          {/* Feature list */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5 w-full max-w-lg">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white font-mono">100%</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">自主核心算法</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white font-mono">50+</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">实训基地团队</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white font-mono">4.0</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">智慧大脑系统</span>
            </div>
          </div>
        </div>

        {/* 2. Right Visual Graphics Column */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-8">
          
          {/* Logo Showcase with Neon Glow & Swoosh Animation */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            {/* Background glowing rings */}
            <div className="absolute w-48 h-48 rounded-full bg-accent-hero/5 blur-2xl animate-pulse" />
            <div className="absolute w-64 h-64 rounded-full border border-accent-hero/10 scale-95" />
            <div className="absolute w-80 h-80 rounded-full border border-accent-hero/5 scale-90 animate-spin" style={{ animationDuration: '40s' }} />

            <svg
              viewBox="0 0 500 500"
              className="relative w-full h-full drop-shadow-[0_0_15px_rgba(0,162,255,0.4)]"
            >
              <defs>
                {/* Metallic high-shine blue gradient */}
                <linearGradient id="logo-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00c6ff" />
                  <stop offset="50%" stopColor="#0072ff" />
                  <stop offset="100%" stopColor="#0f3299" />
                </linearGradient>
                {/* Swoosh bright trail gradient */}
                <linearGradient id="swoosh-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#004de6" stopOpacity="0" />
                  <stop offset="30%" stopColor="#0072ff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#00f6ff" />
                </linearGradient>
              </defs>

              {/* 1. Left Pillar of H shape (Beveled Top and Bottom) */}
              <path
                ref={(el) => (logoPillarsRef.current[0] = el)}
                d="M 190,130 L 222,130 L 222,350 L 190,370 Z"
                fill="url(#logo-blue-grad)"
              />

              {/* 2. Right Pillar of H shape (Symmetrical, Beveled Top and Bottom) */}
              <path
                ref={(el) => (logoPillarsRef.current[1] = el)}
                d="M 288,130 L 320,130 L 320,370 L 288,350 Z"
                fill="url(#logo-blue-grad)"
              />

              {/* 3. Curved flight path swoosh (Sweeps left-to-right & bottom-to-top) */}
              <path
                ref={logoSwooshRef}
                d="M 160,345 C 160,345 190,265 255,225 C 310,190 355,160 380,120"
                fill="none"
                stroke="url(#swoosh-grad)"
                strokeWidth="7"
                strokeLinecap="round"
              />

              {/* 4. Propeller / Drone indicator at the end of swoosh */}
              <g ref={logoPropRef} transform="translate(380, 120)">
                {/* Center Hub */}
                <circle cx="0" cy="0" r="4.5" fill="#00f6ff" />
                {/* Diagonal Blade 1 */}
                <ellipse cx="-12" cy="-4" rx="10" ry="2.5" fill="#00f6ff" transform="rotate(20)" />
                {/* Diagonal Blade 2 */}
                <ellipse cx="12" cy="4" rx="10" ry="2.5" fill="#00f6ff" transform="rotate(20)" />
              </g>
            </svg>
          </div>

          {/* Logo Typography (Rendered with pure text matching the logo) */}
          <div ref={logoTextRef} className="flex flex-col items-center space-y-1">
            <div className="flex space-x-1.5">
              {['航', '纪', '元'].map((char, idx) => (
                <span
                  key={idx}
                  className="letter-anim text-2xl md:text-3xl font-extrabold tracking-widest text-white font-sans opacity-0"
                >
                  {char}
                </span>
              ))}
            </div>
            <div className="flex space-x-1 justify-center">
              {['A', 'E', 'R', 'O', ' ', 'E', 'R', 'A'].map((char, idx) => (
                <span
                  key={idx}
                  className="letter-anim text-xs font-semibold tracking-[0.4em] text-accent-hero font-mono opacity-0"
                >
                  {char}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Interactive Glassmorphic Telemetry HUD Panel */}
          {/* 
            [Unsplash Asset Configuration]:
            - The background image below utilizes a gorgeous aerial grid of city lights at night.
            - It acts as a visual representation of low-altitude urban air routes and navigation mesh.
            - The cool blue hues of the city lights perfectly align with the corporate brand sky-blue.
          */}
          <div
            ref={dashboardRef}
            className="w-full max-w-sm glass-panel rounded-xl overflow-hidden glow-border border-white/5 relative group"
          >
            {/* Aerial city map background */}
            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
              <img
                src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80"
                alt="Low Altitude Navigation Grid Mesh"
                className="w-full h-full object-cover filter saturate-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-dark to-transparent" />
            </div>

            {/* HUD Header */}
            <div className="relative z-10 px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-accent-hero animate-ping" />
                <span className="text-xs uppercase font-mono tracking-widest text-white">Live Telemetry Link</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-accent-hero/10 text-accent-hero border border-accent-hero/20">
                AERO-4.0
              </span>
            </div>

            {/* HUD Content Metrics */}
            <div className="relative z-10 p-5 grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Altitude</span>
                <span className="text-lg font-bold text-white font-mono mt-0.5 flex items-baseline gap-1">
                  {telemetry.altitude} <span className="text-xs font-normal text-gray-400">m</span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Cruising Speed</span>
                <span className="text-lg font-bold text-white font-mono mt-0.5 flex items-baseline gap-1">
                  {telemetry.speed} <span className="text-xs font-normal text-gray-400">km/h</span>
                </span>
              </div>
              <div className="flex flex-col col-span-2 border-t border-white/5 pt-3">
                <div className="flex justify-between items-center text-[10px] uppercase font-mono text-gray-500 mb-1">
                  <span>Battery cell</span>
                  <span className="text-white font-mono">{telemetry.battery}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-hero transition-all duration-500 rounded-full"
                    style={{ width: `${telemetry.battery}%` }}
                  />
                </div>
              </div>
            </div>

            {/* HUD Status Bar */}
            <div className="relative z-10 px-5 py-3.5 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-gray-500">Link Signal Strength</span>
              <span className="text-accent-hero flex items-center gap-1 font-bold">
                <Gauge className="w-3.5 h-3.5" />
                {telemetry.signal}%
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
