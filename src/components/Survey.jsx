import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Navigation, Wind, HardDrive, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Survey() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const laserRef = useRef(null);

  // Counters for HUD micro-interactions
  const [areaCount, setAreaCount] = useState(0);
  const [pointsCount, setPointsCount] = useState(0);

  useEffect(() => {
    // 1. Counter animations triggered on scroll visibility
    const countTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          // Animate Hectares Sprayed Area
          gsap.to({ val: 0 }, {
            val: 847.6,
            duration: 2.5,
            ease: 'power2.out',
            onUpdate: function() {
              setAreaCount(this.targets()[0].val.toFixed(1));
            }
          });
          // Animate Point Cloud Count
          gsap.to({ val: 0 }, {
            val: 184520,
            duration: 3,
            ease: 'power3.out',
            onUpdate: function() {
              setPointsCount(Math.floor(this.targets()[0].val).toLocaleString());
            }
          });
        }
      }
    });

    // 2. Bento Card entrance fade-in stagger
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="survey-section"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 md:px-8 xl:px-16 overflow-hidden bg-base-dark"
    >
      {/* 🟢 Topography Contour Map Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none z-0">
        <svg viewBox="0 0 1000 1000" className="w-full h-full stroke-accent-agri/20 fill-none" strokeWidth="1">
          {/* Wave 1 */}
          <path d="M 100,200 C 200,250 300,150 450,220 C 600,290 700,100 900,180" />
          {/* Wave 2 */}
          <path d="M 80,300 C 180,350 280,250 480,320 C 680,390 720,200 920,280" />
          {/* Wave 3 */}
          <path d="M 50,450 C 200,480 320,380 500,420 C 680,460 780,350 950,430" />
          {/* Wave 4 */}
          <path d="M 120,600 C 220,650 350,550 520,620 C 690,690 750,500 910,580" />
          {/* Wave 5 */}
          <path d="M 90,750 C 190,800 290,700 490,770 C 690,840 800,650 930,730" />
          
          {/* Radar Circles */}
          <circle cx="500" cy="500" r="150" strokeDasharray="5,5" />
          <circle cx="500" cy="500" r="300" strokeDasharray="3,8" />
        </svg>
      </div>

      {/* 🔦 Laser Scanning Bar (Sweeps down the screen continuously) */}
      <div 
        ref={laserRef}
        className="absolute left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-accent-agri to-transparent opacity-80 pointer-events-none z-10"
        style={{
          boxShadow: '0 0 15px #10b981, 0 0 30px #10b981',
          animation: 'scan 5s linear infinite'
        }}
      />
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-4">
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-agri/10 border border-accent-agri/20 text-accent-agri text-xs font-semibold uppercase tracking-wider">
              <Target className="w-3.5 h-3.5" />
              <span>航空测绘 & 植保生态</span>
            </div>
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              激光三维扫描与 <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-agri to-[#54f8b9] drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                低空精准农业服务
              </span>
            </h2>
          </div>
          <p className="max-w-md text-gray-400 text-sm md:text-base font-light leading-relaxed">
            航纪元科技运用搭载激光雷达与高光谱传感器的多旋翼工业机，面向农林植保与国土测绘，实现毫米级的地形建模与精准的按需喷洒，助力传统产业绿色转型。
          </p>
        </div>

        {/* 🍱 Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Agricultural Spraying (Large - spans 2 columns on desktop) */}
          <div 
            ref={(el) => (cardsRef.current[0] = el)}
            className="md:col-span-2 glass-panel rounded-2xl overflow-hidden border-white/5 flex flex-col justify-between group hover:border-accent-agri/30 transition-all duration-500 relative"
          >
            {/* Top-down grid image overlay */}
            <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-25 transition-opacity duration-700">
              <img
                src="https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=800&q=80"
                alt="Agricultural Drone Flight Over Crop Field"
                className="w-full h-full object-cover filter saturate-50 brightness-75"
              />
              {/* Green gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-base-dark via-transparent to-transparent" />
            </div>

            {/* Card Info */}
            <div className="relative z-10 p-6 md:p-8 space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-accent-agri font-semibold">智慧农业全链条全托管</span>
              <h3 className="text-2xl font-bold text-white tracking-tight">高效率精准植保喷洒系统</h3>
              <p className="max-w-md text-gray-400 text-sm leading-relaxed">
                依托智能化航线规划与多普勒气流补偿算法，我们的无人机喷洒植保服务比人工效率提升40倍以上，实现药液高效附着与环境零残留。
              </p>
            </div>

            {/* Sprayed Metrics HUD Row */}
            <div className="relative z-10 p-6 bg-white/[0.01] border-t border-white/5 grid grid-cols-3 gap-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-accent-agri" />
                  Spray Flow
                </span>
                <span className="text-lg font-bold text-white font-mono mt-1 block">5.4 L/min</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-accent-agri" />
                  Speed
                </span>
                <span className="text-lg font-bold text-white font-mono mt-1 block">6.2 m/s</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-accent-agri" />
                  Sprayed Area
                </span>
                <span className="text-lg font-bold text-accent-agri font-mono mt-1 block">
                  {areaCount} <span className="text-xs font-normal text-gray-400">ha</span>
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: 3D Point Cloud Scanning (Medium - 1 column) */}
          <div 
            ref={(el) => (cardsRef.current[1] = el)}
            className="glass-panel rounded-2xl p-6 md:p-8 border-white/5 flex flex-col justify-between hover:border-accent-agri/30 transition-all duration-500 group"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-accent-agri font-semibold">Laser LiDAR Modeling</span>
              <h3 className="text-xl font-bold text-white tracking-tight">三维地形高精扫描</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                利用多波束激光扫描雷达，在飞行过程中即时采集三维点云。能够穿透植被获取地表真实高程数据，为林业资产评估与市政规划提供全案数据支撑。
              </p>
            </div>

            {/* Interactive Grid Simulation Box */}
            <div className="my-6 h-28 border border-white/10 rounded-lg relative overflow-hidden bg-black/40 flex items-center justify-center">
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-30">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-accent-agri/30 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-agri/50 animate-ping" style={{ animationDelay: `${i * 100}ms` }} />
                  </div>
                ))}
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <HardDrive className="w-6 h-6 text-accent-agri mb-1.5 animate-bounce" />
                <span className="text-[9px] uppercase font-mono tracking-widest text-gray-500">Scanning Real-time Grid</span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500">LiDAR Point Cloud Count</span>
              <span className="text-xl font-bold text-accent-agri font-mono mt-1 block">
                {pointsCount} <span className="text-xs font-normal text-gray-400">pts</span>
              </span>
            </div>
          </div>

          {/* Card 3: Backed by University Ecosystem (Medium - 1 column) */}
          <div 
            ref={(el) => (cardsRef.current[2] = el)}
            className="glass-panel rounded-2xl p-6 md:p-8 border-white/5 flex flex-col justify-between hover:border-accent-agri/30 transition-all duration-500 group"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-accent-agri font-semibold">人才保障与学术支撑</span>
              <h3 className="text-xl font-bold text-white tracking-tight">高校人才深度赋能</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                背靠“**广州科技职业技术大学**”，我们设立了联合实训中心。每一位无人机主操手均通过中国民航局 (CAAC) 安全执照核发，保障大型复杂地形野外作业安全。
              </p>
            </div>

            {/* Pilot Status HUD Card */}
            <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent-agri/10 border border-accent-agri/20 flex items-center justify-center font-bold text-accent-agri font-mono text-sm">
                CAAC
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">民航专业执照班底</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">航线规划与气象评估专家领衔</p>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 flex justify-between items-center">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500">RTK Precision</span>
              <span className="text-sm font-bold text-white font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-accent-agri inline-block" />
                ± 0.02 m
              </span>
            </div>
          </div>

          {/* Card 4: Equipment & Performance Showcase (Medium - 1 column) */}
          <div 
            ref={(el) => (cardsRef.current[3] = el)}
            className="glass-panel rounded-2xl p-6 md:p-8 border-white/5 flex flex-col justify-between hover:border-accent-agri/30 transition-all duration-500 group"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-accent-agri font-semibold">工业级飞行平台规格</span>
              <h3 className="text-xl font-bold text-white tracking-tight">重载六旋翼飞行平台</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                我们自主选型的重载无人机平台支持IPX6级防水防尘，最大有效载荷可达50公斤，能够在6级强风或温差极大的恶劣空域稳定巡航。
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-500">Max Payload</span>
                <span className="text-white font-bold">50 kg</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-500">Wind Resistance</span>
                <span className="text-white font-bold">Class 6 (13.8 m/s)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">IP Rating</span>
                <span className="text-white font-bold">IP56 Protection</span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 flex justify-between items-center">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Control System</span>
              <span className="text-xs text-accent-agri font-bold uppercase tracking-wider">Dual Link FailSafe</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
