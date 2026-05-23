import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Route, Navigation2, Cpu, BarChart3, AlertCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Logistics() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const logFeedRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);
  
  // Terminal logs feed simulation
  const [logs, setLogs] = useState([
    'SYS INIT: Central AI Logistics hub activated.',
    'LINK OK: Connected to Baiyun airspace control center.',
    'DRONE-L4: En-route to Terminal A (ETA: 4m 12s).'
  ]);

  // Handle telemetry log streaming
  useEffect(() => {
    const logPool = [
      'DISPATCH: Drone-AG-09 dispatched with medical cargo (5.2kg).',
      'NAV UPDATE: Wind corridor 3 adjusted (Gust speed 8m/s).',
      'MONITOR: Battery thermal profiles within safety limits.',
      'DELIVERY: Order #8272 delivered successfully at Grid 14.',
      'STATUS: 14 active drones cruising in low-altitude mesh.',
      'WARNING: Cargo drop-zone 03 blocked, switching to secondary drop-zone.'
    ];

    const interval = setInterval(() => {
      const nextLog = logPool[Math.floor(Math.random() * logPool.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLogs((prev) => [...prev.slice(-4), `[${timestamp}] ${nextLog}`]);
      
      // Auto-scroll the log feed
      if (logFeedRef.current) {
        gsap.to(logFeedRef.current, {
          scrollTop: logFeedRef.current.scrollHeight,
          duration: 0.3
        });
      }
    }, 3000);

    // Card entrance animation
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
      clearInterval(interval);
    };
  }, []);

  // Hover triggers ripple animation on connection line
  const handleNodeHover = (nodeId) => {
    setActiveNode(nodeId);
    if (nodeId) {
      // Accelerate flight stream pulse on hover
      gsap.to(`.flight-line-${nodeId}`, {
        strokeDashoffset: -200,
        duration: 1.2,
        repeat: -1,
        ease: 'none'
      });
    } else {
      // Normal slow drift on leave
      gsap.killTweensOf('.flight-line-pulse');
      gsap.set('.flight-line-pulse', { strokeDashoffset: 0 });
    }
  };

  return (
    <section
      id="logistics-section"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 md:px-8 xl:px-16 overflow-hidden bg-base-dark"
    >
      {/* City airspace grid lines decorative backdrop */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-logi/10 border border-accent-logi/20 text-accent-logi text-xs font-semibold uppercase tracking-wider">
              <Route className="w-3.5 h-3.5" />
              <span>低空空域物流网络</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              打通空中运输的 <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-logi to-[#5df0ff] drop-shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                最后一公里
              </span>
            </h2>
          </div>
          <p className="max-w-md text-gray-400 text-sm md:text-base font-light leading-relaxed">
            航纪元科技深度布局粤港澳大湾区空域网络。通过高带宽星地链路与AI智能路由引擎，规划多重冗余航线，实现外卖包、医疗急救物资的常态化跨区域即时配送。
          </p>
        </div>

        {/* 🍱 Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Interactive Flight Route Dashboard (Spans 8 columns on large screens) */}
          <div 
            ref={(el) => (cardsRef.current[0] = el)}
            className="lg:col-span-8 glass-panel rounded-2xl border-white/5 overflow-hidden flex flex-col group hover:border-accent-logi/30 transition-all duration-500"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-logi animate-ping" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Air Route Controller</h3>
              </div>
              <span className="text-xs text-gray-500 font-mono">NODE_COUNT: 4 ACTIVE</span>
            </div>

            {/* Dashboard Workspace */}
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/5 flex-grow">
              
              {/* Route Map Area (SVG based - 7 cols) */}
              <div className="md:col-span-7 p-6 flex items-center justify-center min-h-[300px] relative">
                <svg viewBox="0 0 400 300" className="w-full h-full max-w-[360px] drop-shadow-[0_0_8px_rgba(6,182,212,0.25)]">
                  {/* Connection Lines (Static Path Behind) */}
                  <path d="M 80,180 Q 200,90 320,180" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                  <path d="M 80,180 T 260,250" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                  <path d="M 320,180 Q 260,110 140,80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                  <path d="M 140,80 L 260,250" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeDasharray="4,4" />

                  {/* Flow Light Path Pulses (Animated on Hover) */}
                  <path
                    className="flight-line-pulse flight-line-1"
                    d="M 80,180 Q 200,90 320,180"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                    strokeDasharray="40 100"
                    strokeDashoffset="0"
                  />
                  <path
                    className="flight-line-pulse flight-line-2"
                    d="M 320,180 Q 260,110 140,80"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                    strokeDasharray="30 80"
                    strokeDashoffset="0"
                  />
                  <path
                    className="flight-line-pulse flight-line-3"
                    d="M 80,180 T 260,250"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    strokeDasharray="20 60"
                    strokeDashoffset="0"
                  />

                  {/* Node 1: Main Dispatch Hub (Baiyun) */}
                  <g 
                    className="cursor-pointer" 
                    onMouseEnter={() => handleNodeHover('1')}
                    onMouseLeave={() => handleNodeHover(null)}
                  >
                    <circle cx="80" cy="180" r="10" fill="rgba(6,182,212,0.15)" />
                    <circle cx="80" cy="180" r="4.5" fill="#06b6d4" />
                    {activeNode === '1' && <circle cx="80" cy="180" r="14" fill="none" stroke="#06b6d4" strokeWidth="1" className="animate-ping" />}
                  </g>

                  {/* Node 2: Sub Station A */}
                  <g 
                    className="cursor-pointer" 
                    onMouseEnter={() => handleNodeHover('2')}
                    onMouseLeave={() => handleNodeHover(null)}
                  >
                    <circle cx="320" cy="180" r="8" fill="rgba(6,182,212,0.15)" />
                    <circle cx="320" cy="180" r="3.5" fill="#06b6d4" />
                    {activeNode === '2' && <circle cx="320" cy="180" r="12" fill="none" stroke="#06b6d4" strokeWidth="1" className="animate-ping" />}
                  </g>

                  {/* Node 3: Landing Grid 04 */}
                  <g 
                    className="cursor-pointer" 
                    onMouseEnter={() => handleNodeHover('3')}
                    onMouseLeave={() => handleNodeHover(null)}
                  >
                    <circle cx="140" cy="80" r="7" fill="rgba(6,182,212,0.15)" />
                    <circle cx="140" cy="80" r="3" fill="#06b6d4" />
                    {activeNode === '3' && <circle cx="140" cy="80" r="10" fill="none" stroke="#06b6d4" strokeWidth="1" className="animate-ping" />}
                  </g>

                  {/* Node 4: Urban Droppoint 12 */}
                  <g 
                    className="cursor-pointer" 
                    onMouseEnter={() => handleNodeHover('4')}
                    onMouseLeave={() => handleNodeHover(null)}
                  >
                    <circle cx="260" cy="250" r="7" fill="rgba(6,182,212,0.15)" />
                    <circle cx="260" cy="250" r="3" fill="#06b6d4" />
                    {activeNode === '4' && <circle cx="260" cy="250" r="10" fill="none" stroke="#06b6d4" strokeWidth="1" className="animate-ping" />}
                  </g>
                </svg>

                {/* Helper Tooltip */}
                <div className="absolute bottom-3 left-6 flex items-center gap-1.5 text-[10px] text-gray-500 font-mono">
                  <AlertCircle className="w-3.5 h-3.5 text-accent-logi" />
                  <span>Hover nodes to test flight trajectory signals</span>
                </div>
              </div>

              {/* Logs terminal area (5 cols) */}
              <div className="md:col-span-5 p-6 flex flex-col justify-between min-h-[250px] bg-black/10">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500">Node Status Logs</span>
                  <div 
                    ref={logFeedRef}
                    className="space-y-2 h-44 overflow-y-auto font-mono text-[10px] text-gray-400 pr-2 scrollbar-thin scrollbar-thumb-white/10"
                  >
                    {logs.map((log, idx) => (
                      <div key={idx} className="flex gap-2 border-l border-accent-logi/30 pl-2 leading-relaxed">
                        <span className="text-accent-logi shrink-0">&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                    <span className="block text-[9px] text-gray-500">Cruising Active</span>
                    <span className="text-white font-bold text-sm mt-0.5">14 Drones</span>
                  </div>
                  <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                    <span className="block text-[9px] text-gray-500">Comm Link</span>
                    <span className="text-accent-logi font-bold text-sm mt-0.5">99.8%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Card 2: Last-Mile Auto-Delivery (Spans 4 columns) */}
          <div 
            ref={(el) => (cardsRef.current[1] = el)}
            className="lg:col-span-4 glass-panel rounded-2xl p-6 md:p-8 border-white/5 flex flex-col justify-between hover:border-accent-logi/30 transition-all duration-500 group relative"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-accent-logi font-semibold">Autonomous Delivery</span>
              <h3 className="text-xl font-bold text-white tracking-tight">智能外卖即时送达</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                针对外卖餐饮与即时零售，我们提供点对点的无人机快捷转运。支持在预设的智能自提柜或屋顶平台垂直起降，保障食品与热链物资在15分钟内送达客户手中。
              </p>
            </div>

            {/* Smart Landing Box Telemetry */}
            <div className="my-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3 font-mono text-[10px]">
              <div className="flex justify-between items-center text-gray-400">
                <span>L-CABIN STATE</span>
                <span className="px-1.5 py-0.5 rounded bg-accent-logi/15 text-accent-logi font-bold">READY</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-accent-logi w-full animate-pulse" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">TEMP-REGULATION</span>
                <span className="text-white">HOT-HOLD (65°C)</span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500">Average ETA</span>
              <span className="text-white font-bold flex items-center gap-1">
                <Navigation2 className="w-3.5 h-3.5 text-accent-logi rotate-45" />
                12.5 min
              </span>
            </div>
          </div>

          {/* Card 3: AI Logistics Dispatch (Spans 4 columns) */}
          <div 
            ref={(el) => (cardsRef.current[2] = el)}
            className="lg:col-span-4 glass-panel rounded-2xl p-6 md:p-8 border-white/5 flex flex-col justify-between hover:border-accent-logi/30 transition-all duration-500 group"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-accent-logi font-semibold">AI Routing Engine</span>
              <h3 className="text-xl font-bold text-white tracking-tight">智能中央调度中心</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                系统实时解算广州白云区复杂微气象、空域禁飞区状态。依靠AI智能避障算法与多机分布式路由，自动为无人机群选择最优、最安全的空中航道。
              </p>
            </div>

            <div className="mt-6 flex justify-center py-4">
              <Cpu className="w-12 h-12 text-accent-logi animate-pulse" />
            </div>

            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500">Safe Collision rate</span>
              <span className="text-accent-logi font-bold">&lt; 0.0001%</span>
            </div>
          </div>

          {/* Card 4: Unsplash Asset - Automated Sort Yard (Spans 4 columns) */}
          {/* 
            [Unsplash Asset Configuration]:
            - The background image below utilizes a futuristic automated warehouse/logistics sorting setup.
            - It emphasizes scheduling, packages flow, and the backend machinery that processes orders.
            - Perfectly aligns with "外卖物流" and high-tech efficiency themes.
          */}
          <div 
            ref={(el) => (cardsRef.current[3] = el)}
            className="lg:col-span-4 glass-panel rounded-2xl overflow-hidden border-white/5 flex flex-col justify-between hover:border-accent-logi/30 transition-all duration-500 group relative min-h-[220px]"
          >
            {/* Background Automated Sorting Yard Image */}
            <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-30 transition-opacity duration-700">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80"
                alt="Automated logistics sorting facility"
                className="w-full h-full object-cover filter saturate-50 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-dark to-transparent" />
            </div>

            <div className="relative z-10 p-6 md:p-8 space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-accent-logi font-semibold">Air-Ground Intermodal</span>
              <h3 className="text-lg font-bold text-white tracking-tight">空地协同分拨中转</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                全自动理货机构与楼宇空中机库对接，货物到达中转场后仅需90秒即可完成机腹锁扣挂载，进入空域通道。
              </p>
            </div>

            <div className="relative z-10 p-4 bg-white/[0.01] border-t border-white/5 flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500">Air Transfer Time</span>
              <span className="text-white font-bold flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5 text-accent-logi" />
                90 sec
              </span>
            </div>
          </div>

          {/* Card 5: Heavy Payload Logistics Drone (Spans 4 columns) */}
          <div 
            ref={(el) => (cardsRef.current[4] = el)}
            className="lg:col-span-4 glass-panel rounded-2xl p-6 md:p-8 border-white/5 flex flex-col justify-between hover:border-accent-logi/30 transition-all duration-500 group"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-accent-logi font-semibold">Cargo Aircraft Platform</span>
              <h3 className="text-xl font-bold text-white tracking-tight">多轴重负荷货运无人机</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                针对中短途大批量干线配送，采用大容量防爆三元锂电动力，最大挂载航程达25公里，支持模块化冷链保温箱与医疗急救快件盒。
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-500">Max Cargo Load</span>
                <span className="text-white font-bold">15 kg</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-500">Cruising Range</span>
                <span className="text-white font-bold">25 km</span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500">Payload Bay</span>
              <span className="text-accent-logi font-bold uppercase tracking-wider">Modular Quick-Latch</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
