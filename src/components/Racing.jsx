import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Eye, Trophy, Video, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Racing() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const tiltCardsRef = useRef([]);

  // Telemetry OSD state for FPV flight simulation
  const [osd, setOsd] = useState({
    speed: 135,
    voltage: 22.8,
    rssi: 99,
    throttle: 65,
  });

  useEffect(() => {
    // 1. Simulate OSD telemetry flux
    const interval = setInterval(() => {
      setOsd((prev) => ({
        speed: Math.floor(130 + Math.random() * 25),
        voltage: +(Math.max(19.8, prev.voltage - 0.02)).toFixed(2),
        rssi: Math.min(100, Math.max(92, prev.rssi + Math.floor((Math.random() - 0.5) * 4))),
        throttle: Math.floor(60 + Math.random() * 30),
      }));
    }, 800);

    // 2. Bento cards entrance animation
    gsap.fromTo(cardsRef.current,
      { opacity: 0, scale: 0.9, y: 60 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.1,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  // 3D Card Tilt Handler (Vanilla JS mouse math)
  const handleMouseMove = (e, idx) => {
    const card = tiltCardsRef.current[idx];
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top;  // y position within element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotate maximum 10 degrees
    const rotateX = ((centerY - y) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
      transformOrigin: 'center center',
      boxShadow: '0 15px 30px rgba(249, 115, 22, 0.25)'
    });
  };

  const handleMouseLeave = (idx) => {
    const card = tiltCardsRef.current[idx];
    if (!card) return;
    
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    });
  };

  return (
    <section
      id="racing-section"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center py-28 px-4 md:px-8 xl:px-16 overflow-hidden bg-base-dark"
    >
      {/* 💥 Slanted backdrop layout to convey speed and gaming vibes */}
      <div className="absolute inset-x-0 h-[85%] bg-gradient-to-br from-accent-fpv/5 via-transparent to-[#ec4899]/5 -skew-y-3 pointer-events-none z-0 border-y border-white/[0.03]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-fpv/10 border border-accent-fpv/20 text-accent-fpv text-xs font-semibold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>第一人称视角极限竞技</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              FPV 穿越机速度与 <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-fpv to-[#ec4899] drop-shadow-[0_0_12px_rgba(249,115,22,0.35)]">
                激情的极致飞越
              </span>
            </h2>
          </div>
          <p className="max-w-md text-gray-400 text-sm md:text-base font-light leading-relaxed">
            航纪元科技拥有一支顶尖的FPV飞手战队，具备时速突破150公里的穿越机极速操控能力。我们深耕穿越机电竞产业、空域赛道规划、以及高难度影视级极限航拍。
          </p>
        </div>

        {/* 🍱 Bento Grid Layout (Skew back to align content, cards themselves are tilted on hover) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: FPV Racetrack Gate (Large - spans 2 columns) */}
          <div
            ref={(el) => {
              cardsRef.current[0] = el;
              tiltCardsRef.current[0] = el;
            }}
            onMouseMove={(e) => handleMouseMove(e, 0)}
            onMouseLeave={() => handleMouseLeave(0)}
            className="md:col-span-2 glass-panel rounded-2xl border-white/5 overflow-hidden flex flex-col justify-between transition-all duration-300 relative group cursor-pointer"
          >
            {/* Background Speed Light Trail (Cyberpunk FPV track) */}
            <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-30 transition-opacity duration-700">
              <img
                src="https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80"
                alt="Cyberpunk glowing neon light tunnel racing gate"
                className="w-full h-full object-cover filter saturate-150 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-dark via-transparent to-transparent" />
            </div>

            <div className="relative z-10 p-6 md:p-8 space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-accent-fpv font-semibold">FPV Flight Experience</span>
              <h3 className="text-2xl font-bold text-white tracking-tight">第一人称视角极限障碍赛</h3>
              <p className="max-w-lg text-gray-400 text-sm leading-relaxed">
                穿越机飞手佩戴智能数字高清眼镜，以“第一人称视角”操控轴距极小的竞速机。以时速150公里的瞬时爆发力，穿过密集的发光障碍光门。
              </p>
            </div>

            {/* OSD Telemetry Overlay (Simulated Drone HUD Overlay) */}
            <div className="relative z-10 p-6 bg-black/40 border-t border-white/5 font-mono text-[10px] grid grid-cols-4 gap-4 text-accent-fpv">
              <div className="space-y-1">
                <span className="text-gray-500 block uppercase">SPD.KMH</span>
                <span className="text-white font-bold text-sm">{osd.speed}</span>
              </div>
              <div className="space-y-1">
                <span className="text-gray-500 block uppercase">BATT.4S</span>
                <span className="text-white font-bold text-sm">{osd.voltage}V</span>
              </div>
              <div className="space-y-1">
                <span className="text-gray-500 block uppercase">THR.PCT</span>
                <span className="text-white font-bold text-sm">{osd.throttle}%</span>
              </div>
              <div className="space-y-1">
                <span className="text-gray-500 block uppercase">RSSI.DB</span>
                <span className="text-[#ec4899] font-bold text-sm">{osd.rssi}%</span>
              </div>
            </div>
          </div>

          {/* Card 2: Low Latency Sky Unit (1 column) */}
          <div
            ref={(el) => {
              cardsRef.current[1] = el;
              tiltCardsRef.current[1] = el;
            }}
            onMouseMove={(e) => handleMouseMove(e, 1)}
            onMouseLeave={() => handleMouseLeave(1)}
            className="glass-panel rounded-2xl p-6 md:p-8 border-white/5 flex flex-col justify-between transition-all duration-300 group cursor-pointer"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-accent-fpv font-semibold">Digital Sky Unit</span>
              <h3 className="text-xl font-bold text-white tracking-tight">超低延时数传天空端</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                搭载高刷新率数字天空端，支持1080p 120fps高清画面回传，双向通信时延控制在 28 毫秒以内，保障高速避障时的绝对操控精度。
              </p>
            </div>

            <div className="my-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between font-mono text-[10px]">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-accent-fpv" />
                <span>LINK LATENCY</span>
              </div>
              <span className="text-white font-bold">28 ms</span>
            </div>

            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500">Video Quality</span>
              <span className="text-white font-bold">1080p / 120fps</span>
            </div>
          </div>

          {/* Card 3: Championships and Events (1 column) */}
          <div
            ref={(el) => {
              cardsRef.current[2] = el;
              tiltCardsRef.current[2] = el;
            }}
            onMouseMove={(e) => handleMouseMove(e, 2)}
            onMouseLeave={() => handleMouseLeave(2)}
            className="glass-panel rounded-2xl p-6 md:p-8 border-white/5 flex flex-col justify-between transition-all duration-300 group cursor-pointer"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-accent-fpv font-semibold">E-Sports Events</span>
              <h3 className="text-xl font-bold text-white tracking-tight">低空竞速电竞赛事</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                背靠“**广州科技职业技术大学**”，我们承办了大湾区校级与市级FPV竞速联赛，搭建专业光影发光门赛道，引导科技极限运动新潮流。
              </p>
            </div>

            <div className="my-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-accent-fpv animate-bounce" />
              <div>
                <h4 className="text-xs font-bold text-white">联合赛事组委会</h4>
                <p className="text-[9px] text-gray-500">专业裁判与飞手培训体系认证</p>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500">Active Pilots</span>
              <span className="text-accent-fpv font-bold">30+ Licensed</span>
            </div>
          </div>

          {/* Card 4: High Speed Cinematic FPV (1 column) */}
          <div
            ref={(el) => {
              cardsRef.current[3] = el;
              tiltCardsRef.current[3] = el;
            }}
            onMouseMove={(e) => handleMouseMove(e, 3)}
            onMouseLeave={() => handleMouseLeave(3)}
            className="glass-panel rounded-2xl p-6 md:p-8 border-white/5 flex flex-col justify-between transition-all duration-300 group cursor-pointer"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-accent-fpv font-semibold">Cinematic Shooting</span>
              <h3 className="text-xl font-bold text-white tracking-tight">特技极限电影航拍</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                针对汽车广告、极限运动、动作电影，提供专业重载穿越机挂载RED/BMPCC电影机，在狭窄空间或高速追踪中提供极具呼吸感和压迫感的特写视角。
              </p>
            </div>

            <div className="my-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between font-mono text-[10px]">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-accent-fpv" />
                <span>CAMERA TILT</span>
              </div>
              <span className="text-white font-bold">-45° to +45°</span>
            </div>

            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500">Max Acceleration</span>
              <span className="text-accent-fpv font-bold">0-100 km/h in 1.2s</span>
            </div>
          </div>

          {/* Card 5: Power Train Configuration (1 column) */}
          <div
            ref={(el) => {
              cardsRef.current[4] = el;
              tiltCardsRef.current[4] = el;
            }}
            onMouseMove={(e) => handleMouseMove(e, 4)}
            onMouseLeave={() => handleMouseLeave(4)}
            className="glass-panel rounded-2xl p-6 md:p-8 border-white/5 flex flex-col justify-between transition-all duration-300 group cursor-pointer"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-accent-fpv font-semibold">Power System</span>
              <h3 className="text-xl font-bold text-white tracking-tight">高KV无刷动力总成</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                选用定制高KV无刷电机搭配三叶高频桨叶，最大拉力可达单机自重的12倍。配合大倍率高放电率电池，提供如火箭起飞般的瞬时加速度。
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-500">Motor Class</span>
                <span className="text-white font-bold">2207 / 2750KV</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-500">ESC Rating</span>
                <span className="text-white font-bold">60A 4-in-1 BlHeli32</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Battery C-Rate</span>
                <span className="text-[#ec4899] font-bold">120C Burst</span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500">Max Thrust-Weight Ratio</span>
              <span className="text-accent-fpv font-bold">12 : 1</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
