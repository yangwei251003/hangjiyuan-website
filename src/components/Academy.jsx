import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Wrench, ShieldCheck, GraduationCap, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Academy() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const explodedContainerRef = useRef(null);
  
  // Parallax elements for Exploded View
  const propRef = useRef(null);
  const motorRef = useRef(null);
  const frameRef = useRef(null);
  const batteryRef = useRef(null);

  // Maintenance HUD checklist state
  const [diagnostics, setDiagnostics] = useState([
    { name: 'IMU Gyroscope Calibration', status: 'PASS', val: '0.01°' },
    { name: 'Brushless Motor Esc Sync', status: 'PASS', val: '1900Hz' },
    { name: 'Dual-Link Transceiver Test', status: 'PASS', val: '-45dBm' },
    { name: 'GPS RTK Lock Accuracy', status: 'PASS', val: '0.015m' },
  ]);

  useEffect(() => {
    // 1. Bento cards entrance animation
    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    );

    // 2. Continuous idle drift on drone components
    gsap.to([propRef.current, motorRef.current, frameRef.current, batteryRef.current], {
      y: '+=5',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.2
    });
  }, []);

  // Exploded View Parallax handler (separates components on mousemove)
  const handleExplodeMouseMove = (e) => {
    if (!explodedContainerRef.current) return;
    const rect = explodedContainerRef.current.getBoundingClientRect();
    const mouseY = e.clientY - rect.top; // y relative to container
    const centerY = rect.height / 2;
    
    // Normalize relative displacement (-1 to 1)
    const factor = (mouseY - centerY) / centerY;
    
    // Spread parts vertically based on factor
    gsap.to(propRef.current, { y: factor * -45 - 20, duration: 0.4, ease: 'power2.out' });
    gsap.to(motorRef.current, { y: factor * -15 - 5, duration: 0.4, ease: 'power2.out' });
    gsap.to(frameRef.current, { y: factor * 15 + 10, duration: 0.4, ease: 'power2.out' });
    gsap.to(batteryRef.current, { y: factor * 45 + 25, duration: 0.4, ease: 'power2.out' });
  };

  const handleExplodeMouseLeave = () => {
    // Return to default hover-expanded separation
    gsap.to(propRef.current, { y: -20, duration: 0.6, ease: 'power3.out' });
    gsap.to(motorRef.current, { y: -5, duration: 0.6, ease: 'power3.out' });
    gsap.to(frameRef.current, { y: 10, duration: 0.6, ease: 'power3.out' });
    gsap.to(batteryRef.current, { y: 25, duration: 0.6, ease: 'power3.out' });
  };

  return (
    <section
      id="academy-section"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 md:px-8 xl:px-16 overflow-hidden bg-base-dark"
    >
      {/* 📐 Technical drafting blueprint grid background (1px fine lines) */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none z-0" 
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-edu/10 border border-accent-edu/20 text-accent-edu text-xs font-semibold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>售前售后全托管高校协同生态</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              CAAC 执照培训与 <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-edu to-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                一站式航空运维保障
              </span>
            </h2>
          </div>
          <p className="max-w-md text-gray-400 text-sm md:text-base font-light leading-relaxed">
            背靠“广州科技职业技术大学”海量无人机科技人才，搭建了符合CAAC标准的航空操作培训基地与工业级检修车间。懂技术、有团队、能落地，交给我们，稳！
          </p>
        </div>

        {/* 🍱 Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Card 1: 3D Parallax Exploded View Drone (Spans 8 columns on large screens) */}
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="lg:col-span-8 glass-panel rounded-2xl border-white/5 overflow-hidden flex flex-col justify-between hover:border-accent-edu/30 transition-all duration-500 group"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-accent-edu animate-spin" style={{ animationDuration: '6s' }} />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Interactive Component Breakdown</h3>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">DRONE-MODEL: AG-X6</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/5 flex-grow">
              
              {/* Exploded View Area (7 cols) */}
              <div 
                ref={explodedContainerRef}
                onMouseMove={handleExplodeMouseMove}
                onMouseLeave={handleExplodeMouseLeave}
                className="md:col-span-7 p-6 min-h-[320px] flex items-center justify-center relative cursor-row-resize"
              >
                {/* 3D layers container */}
                <div className="relative w-full h-full max-w-[280px] flex flex-col items-center justify-center space-y-2">
                  
                  {/* Layer 1: Propellers (Top) */}
                  <g ref={propRef} className="absolute transform -translate-y-[20px] filter drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]">
                    <svg viewBox="0 0 100 40" className="w-48 h-10">
                      {/* Left Prop */}
                      <ellipse cx="20" cy="20" rx="18" ry="4" fill="none" stroke="#fff" strokeWidth="1.5" />
                      <circle cx="20" cy="20" r="2.5" fill="#fff" />
                      {/* Right Prop */}
                      <ellipse cx="80" cy="20" rx="18" ry="4" fill="none" stroke="#fff" strokeWidth="1.5" />
                      <circle cx="80" cy="20" r="2.5" fill="#fff" />
                      {/* Connection bar label */}
                      <line x1="20" y1="20" x2="80" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3,3" />
                    </svg>
                    <span className="absolute -right-16 top-2 text-[8px] font-mono text-accent-edu/60 uppercase">01 // Carbon Propellers</span>
                  </g>

                  {/* Layer 2: Motors & Arms (Middle-Top) */}
                  <g ref={motorRef} className="absolute transform -translate-y-[5px] filter drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]">
                    <svg viewBox="0 0 100 40" className="w-48 h-10">
                      {/* Left Motor */}
                      <rect x="15" y="10" width="10" height="15" fill="none" stroke="#fff" strokeWidth="1.5" rx="1" />
                      {/* Right Motor */}
                      <rect x="75" y="10" width="10" height="15" fill="none" stroke="#fff" strokeWidth="1.5" rx="1" />
                      {/* Arms connecting to center */}
                      <line x1="25" y1="18" x2="40" y2="18" stroke="#fff" strokeWidth="2" />
                      <line x1="75" y1="18" x2="60" y2="18" stroke="#fff" strokeWidth="2" />
                    </svg>
                    <span className="absolute -right-16 top-2 text-[8px] font-mono text-accent-edu/60 uppercase">02 // Brushless Motors</span>
                  </g>

                  {/* Layer 3: Center Frame & ESC (Middle-Bottom) */}
                  <g ref={frameRef} className="absolute transform translate-y-[10px] filter drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]">
                    <svg viewBox="0 0 100 40" className="w-48 h-10">
                      {/* Hexagonal main plate */}
                      <polygon points="35,10 65,10 75,20 65,30 35,30 25,20" fill="none" stroke="#fff" strokeWidth="1.5" />
                      {/* Core Flight Controller details */}
                      <rect x="42" y="14" width="16" height="12" fill="none" stroke="#fff" strokeWidth="1" rx="0.5" />
                      <line x1="50" y1="14" x2="50" y2="26" stroke="#fff" strokeWidth="0.5" />
                    </svg>
                    <span className="absolute -right-16 top-2 text-[8px] font-mono text-accent-edu/60 uppercase">03 // Flight Controller Hub</span>
                  </g>

                  {/* Layer 4: Battery Pack (Bottom) */}
                  <g ref={batteryRef} className="absolute transform translate-y-[25px] filter drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]">
                    <svg viewBox="0 0 100 40" className="w-48 h-10">
                      {/* Battery block hanging */}
                      <rect x="38" y="12" width="24" height="16" fill="none" stroke="#fff" strokeWidth="1.5" rx="1.5" />
                      {/* Connector pins */}
                      <line x1="45" y1="12" x2="45" y2="8" stroke="#fff" strokeWidth="1" />
                      <line x1="55" y1="12" x2="55" y2="8" stroke="#fff" strokeWidth="1" />
                    </svg>
                    <span className="absolute -right-16 top-2 text-[8px] font-mono text-accent-edu/60 uppercase">04 // Smart LiPo Pack</span>
                  </g>

                </div>
              </div>

              {/* Maintenance checklist area (5 cols) */}
              <div className="md:col-span-5 p-6 flex flex-col justify-between min-h-[250px] bg-black/10">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500">Telemetry Diagnostics Logs</span>
                  <div className="space-y-2.5">
                    {diagnostics.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs font-mono border-b border-white/5 pb-2">
                        <span className="text-gray-400 font-light truncate mr-2">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold">{item.val}</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 text-xs font-mono text-gray-500 leading-relaxed">
                  Hover/Move mouse vertically inside the drone box to inspect assembly layers and test mechanical explosion spacing.
                </div>
              </div>

            </div>
          </div>

          {/* Card 2: CAAC Pilot Training (Spans 4 columns) */}
          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="lg:col-span-4 glass-panel rounded-2xl p-6 md:p-8 border-white/5 flex flex-col justify-between hover:border-accent-edu/30 transition-all duration-500 group relative"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-accent-edu font-semibold">CAAC Licensing Program</span>
              <h3 className="text-xl font-bold text-white tracking-tight">CAAC 执照持证飞行培训</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                开设视距内 (VLOS) 及超视距 (BVLOS) 驾驶员专业执照培训。理论、模拟、实操一体化交付，带你安全、持证翱翔蓝天。
              </p>
            </div>

            <div className="my-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between font-mono text-[10px]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent-edu" />
                <span>SIMULATOR HOURS</span>
              </div>
              <span className="text-white font-bold">40 Hours Required</span>
            </div>

            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500">Passing Rate</span>
              <span className="text-white font-bold">98.4% Average</span>
            </div>
          </div>

          {/* Card 3: University Lab & Practice Base (Spans 4 columns) */}
          <div
            ref={(el) => (cardsRef.current[2] = el)}
            className="lg:col-span-4 glass-panel rounded-2xl p-6 md:p-8 border-white/5 flex flex-col justify-between hover:border-accent-edu/30 transition-all duration-500 group"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-accent-edu font-semibold">Joint University Lab</span>
              <h3 className="text-xl font-bold text-white tracking-tight">产学研实训协同基地</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                背靠“**广州科技职业技术大学**”，打造无人机结构制造实验室与飞行测试场，源源不断输送专业科研人才与成熟飞行梯队。
              </p>
            </div>

            <div className="my-6 flex justify-center">
              <GraduationCap className="w-12 h-12 text-accent-edu/80 animate-pulse" />
            </div>

            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500">Base Location</span>
              <span className="text-accent-edu font-bold">Guangzhou Baiyun Campus</span>
            </div>
          </div>

          {/* Card 4: Unsplash Asset - Modern Tech Workshop (Spans 4 columns) */}
          {/* 
            [Unsplash Asset Configuration]:
            - The background image below utilizes a female engineer working alongside high-tech assembly apparatus.
            - Represents quality control, training excellence, and maintenance standards.
            - Visual elements strictly reflect industrial grey/silver hues.
          */}
          <div
            ref={(el) => (cardsRef.current[3] = el)}
            className="lg:col-span-4 glass-panel rounded-2xl overflow-hidden border-white/5 flex flex-col justify-between hover:border-accent-edu/30 transition-all duration-500 group relative min-h-[220px]"
          >
            <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-35 transition-opacity duration-700">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
                alt="Tech laboratory and automated testing assembly"
                className="w-full h-full object-cover filter saturate-0 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-dark to-transparent" />
            </div>

            <div className="relative z-10 p-6 md:p-8 space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-accent-edu font-semibold">Standard Maintenance</span>
              <h3 className="text-lg font-bold text-white tracking-tight">标准化运维与检测</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                拥有一支完备的无人机检修测试团队。支持传感器校验、动力测试、以及结构碳纤维修补等，提供售前售后一站式保障。
              </p>
            </div>

            <div className="relative z-10 p-4 bg-white/[0.01] border-t border-white/5 flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500">Diagnostic Standard</span>
              <span className="text-white font-bold flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-accent-edu" />
                ISO-9001 Compliant
              </span>
            </div>
          </div>

          {/* Card 5: Safety Guarantee Assurance (Spans 4 columns) */}
          <div
            ref={(el) => (cardsRef.current[4] = el)}
            className="lg:col-span-4 glass-panel rounded-2xl p-6 md:p-8 border-white/5 flex flex-col justify-between hover:border-accent-edu/30 transition-all duration-500 group"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-accent-edu font-semibold">Safety Control</span>
              <h3 className="text-xl font-bold text-white tracking-tight">懂技术・有团队・能落地</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light font-sans">
                多级风险预防管理方案。每次飞行前必须完成 28 项出机 checklist 检视，为工业级野外重大项目运行提供绝对的安全底线。
              </p>
            </div>

            <div className="my-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between font-mono text-[10px]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent-edu" />
                <span>FLIGHT RISK CAP</span>
              </div>
              <span className="text-green-400 font-bold">LEVEL-0 (NEGLIGIBLE)</span>
            </div>

            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500">Air Operations Support</span>
              <span className="text-accent-edu font-bold">24/7 Standby</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
