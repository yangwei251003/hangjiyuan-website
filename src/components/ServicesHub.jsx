import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Target, Route, Flame, GraduationCap, 
  Wind, Navigation, MapPin, 
  Radio, Navigation2, Cpu, BarChart3, AlertCircle,
  Eye, Trophy, Video,
  Settings, BookOpen, ShieldCheck, Wrench
} from 'lucide-react';

export default function ServicesHub() {
  const [activeTab, setActiveTab] = useState('survey');
  const [areaCount, setAreaCount] = useState(0);
  const [pointsCount, setPointsCount] = useState(0);
  const [osd, setOsd] = useState({ speed: 135, voltage: 22.8, rssi: 99, throttle: 65 });
  const [logs, setLogs] = useState([
    'SYS INIT: Central AI Logistics hub activated.',
    'LINK OK: Connected to Baiyun airspace control center.',
    'DRONE-L4: En-route to Terminal A (ETA: 4m 12s).'
  ]);

  // Exploded View Parallax refs
  const propRef = useRef(null);
  const motorRef = useRef(null);
  const frameRef = useRef(null);
  const batteryRef = useRef(null);
  const explodedContainerRef = useRef(null);
  const logFeedRef = useRef(null);

  // 1. Dynamic color interpolation based on active tab
  useEffect(() => {
    const themes = {
      survey: { hex: '#10b981', rgb: '16, 185, 129' },
      logistics: { hex: '#06b6d4', rgb: '6, 182, 212' },
      racing: { hex: '#f97316', rgb: '249, 115, 22' },
      academy: { hex: '#e2e8f0', rgb: '226, 232, 240' }
    };

    const theme = themes[activeTab];
    if (theme) {
      gsap.to(':root', {
        '--theme-accent': theme.hex,
        '--theme-accent-rgb': theme.rgb,
        duration: 0.6,
        ease: 'power2.out'
      });
    }

    // Trigger specific animations on tab switch
    if (activeTab === 'survey') {
      gsap.to({ val: 0 }, {
        val: 847.6,
        duration: 2.0,
        ease: 'power2.out',
        onUpdate: function() { setAreaCount(this.targets()[0].val.toFixed(1)); }
      });
      gsap.to({ val: 0 }, {
        val: 184520,
        duration: 2.2,
        ease: 'power3.out',
        onUpdate: function() { setPointsCount(Math.floor(this.targets()[0].val).toLocaleString()); }
      });
    }
  }, [activeTab]);

  // 2. FPV OSD and Logistics Terminal Loop
  useEffect(() => {
    // OSD Loop
    const osdInterval = setInterval(() => {
      setOsd((prev) => ({
        speed: Math.floor(130 + Math.random() * 25),
        voltage: +(Math.max(19.8, prev.voltage - 0.02)).toFixed(2),
        rssi: Math.min(100, Math.max(92, prev.rssi + Math.floor((Math.random() - 0.5) * 4))),
        throttle: Math.floor(60 + Math.random() * 30),
      }));
    }, 800);

    // Logs Loop
    const logPool = [
      'DISPATCH: Drone-AG-09 dispatched with medical cargo (5.2kg).',
      'NAV UPDATE: Wind corridor 3 adjusted (Gust speed 8m/s).',
      'MONITOR: Battery thermal profiles within safety limits.',
      'DELIVERY: Order #8272 delivered successfully at Grid 14.',
      'STATUS: 14 active drones cruising in low-altitude mesh.',
      'WARNING: Cargo drop-zone 03 blocked, switching to secondary drop-zone.'
    ];

    const logsInterval = setInterval(() => {
      const nextLog = logPool[Math.floor(Math.random() * logPool.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLogs((prev) => [...prev.slice(-4), `[${timestamp}] ${nextLog}`]);
      if (logFeedRef.current) {
        gsap.to(logFeedRef.current, { scrollTop: logFeedRef.current.scrollHeight, duration: 0.3 });
      }
    }, 3000);

    return () => {
      clearInterval(osdInterval);
      clearInterval(logsInterval);
    };
  }, []);

  // 3. Exploded View Parallax Y-Axis separation
  const handleExplodeMouseMove = (e) => {
    if (!explodedContainerRef.current) return;
    const rect = explodedContainerRef.current.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const centerY = rect.height / 2;
    const factor = (mouseY - centerY) / centerY;
    
    gsap.to(propRef.current, { y: factor * -45 - 20, duration: 0.3, ease: 'power2.out' });
    gsap.to(motorRef.current, { y: factor * -15 - 5, duration: 0.3, ease: 'power2.out' });
    gsap.to(frameRef.current, { y: factor * 15 + 10, duration: 0.3, ease: 'power2.out' });
    gsap.to(batteryRef.current, { y: factor * 45 + 25, duration: 0.3, ease: 'power2.out' });
  };

  const handleExplodeMouseLeave = () => {
    gsap.to(propRef.current, { y: -20, duration: 0.5, ease: 'power3.out' });
    gsap.to(motorRef.current, { y: -5, duration: 0.5, ease: 'power3.out' });
    gsap.to(frameRef.current, { y: 10, duration: 0.5, ease: 'power3.out' });
    gsap.to(batteryRef.current, { y: 25, duration: 0.5, ease: 'power3.out' });
  };

  // Tabs navigation config
  const tabs = [
    { id: 'survey', label: '测绘植保', icon: <Target className="w-4 h-4" />, color: 'text-accent-agri' },
    { id: 'logistics', label: '外卖物流', icon: <Route className="w-4 h-4" />, color: 'text-accent-logi' },
    { id: 'racing', label: 'FPV 竞速', icon: <Flame className="w-4 h-4" />, color: 'text-accent-fpv' },
    { id: 'academy', label: '培训维修', icon: <GraduationCap className="w-4 h-4" />, color: 'text-accent-edu' }
  ];

  return (
    <section
      id="services-section"
      className="relative py-24 px-4 md:px-8 xl:px-16 overflow-hidden bg-base-dark border-t border-white/[0.03]"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="px-3 py-1 rounded-full bg-theme-accent/10 border border-theme-accent/20 text-theme-accent text-xs font-semibold uppercase tracking-wider transition-colors duration-300">
            业务全景面板
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            四大科技航道 · 一站式全案服务
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
            点击下方控制台选项，无缝切换智能飞行控制系统，查看不同场景的动态作业演示与技术指标。
          </p>
        </div>

        {/* 🎛️ Control Panel Navigation (Responsive tabs) */}
        <div className="flex justify-start md:justify-center overflow-x-auto pb-4 md:pb-0 scrollbar-none border-b border-white/5 gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg border text-sm font-semibold tracking-wide shrink-0 transition-all duration-300 ${
                  isActive 
                    ? 'bg-theme-accent/10 border-theme-accent text-white shadow-glow-sm' 
                    : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 🖥️ Interactive Simulation Workplace */}
        <div className="glass-panel rounded-2xl border-white/5 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[500px] transition-all duration-500 hover:border-theme-accent/20">
          
          {/* Left Column: Interactive Telemetry graphics (lg:span-7) */}
          <div className="lg:col-span-7 p-6 md:p-8 flex items-center justify-center bg-black/10 relative overflow-hidden">
            
            {/* Topography scanning module */}
            {activeTab === 'survey' && (
              <div className="w-full h-full min-h-[300px] flex flex-col justify-between relative">
                {/* Contour Lines */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg viewBox="0 0 500 300" className="w-full h-full stroke-accent-agri fill-none" strokeWidth="1">
                    <path d="M50,100 C150,150 250,50 350,120 C450,190 400,280 480,250" />
                    <path d="M40,150 C140,200 240,100 340,170 C440,240 380,290 470,280" />
                    <circle cx="250" cy="150" r="80" strokeDasharray="3,3" />
                  </svg>
                </div>
                {/* Sweeping Laser */}
                <div 
                  className="absolute left-0 w-full h-[2px] bg-accent-agri opacity-80 pointer-events-none"
                  style={{
                    boxShadow: '0 0 12px #10b981',
                    animation: 'scan 4s linear infinite'
                  }}
                />
                
                <div className="relative z-10 text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-agri animate-ping" />
                  <span>LiDAR Terrain Scan HUD</span>
                </div>
                
                <div className="relative z-10 my-auto py-8 grid grid-cols-2 gap-8 text-center max-w-sm mx-auto">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-gray-500 flex justify-center gap-1">
                      <Wind className="w-3.5 h-3.5 text-accent-agri" />
                      Wind Speed
                    </span>
                    <span className="text-2xl font-bold text-white font-mono mt-1 block">3.4 m/s</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-gray-500 flex justify-center gap-1">
                      <Navigation className="w-3.5 h-3.5 text-accent-agri" />
                      Sprayed
                    </span>
                    <span className="text-2xl font-bold text-accent-agri font-mono mt-1 block">
                      {areaCount} <span className="text-xs font-normal text-gray-400">ha</span>
                    </span>
                  </div>
                  <div className="col-span-2 border-t border-white/5 pt-4">
                    <span className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Point Cloud Density</span>
                    <span className="text-xl font-bold text-white font-mono">{pointsCount} pts</span>
                  </div>
                </div>
                
                <div className="relative z-10 text-[10px] text-gray-500 font-mono text-right">
                  RTK Precision: ±0.02m (Fixed)
                </div>
              </div>
            )}

            {/* Logistics route map module */}
            {activeTab === 'logistics' && (
              <div className="w-full h-full min-h-[300px] grid grid-cols-1 md:grid-cols-12 gap-6 relative">
                {/* SVG Route Map */}
                <div className="md:col-span-7 flex items-center justify-center">
                  <svg viewBox="0 0 300 240" className="w-full h-full max-w-[260px] drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                    <path d="M 60,140 Q 150,70 240,140 T 180,200 Z" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
                    <path
                      d="M 60,140 Q 150,70 240,140"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2"
                      strokeDasharray="20 60"
                      className="flight-line-pulse"
                      style={{ animation: 'shimmer-dash 2s linear infinite' }}
                    />
                    <circle cx="60" cy="140" r="3.5" fill="#06b6d4" />
                    <circle cx="240" cy="140" r="3.5" fill="#06b6d4" />
                    <circle cx="150" cy="85" r="3.5" fill="#06b6d4" className="animate-ping" />
                  </svg>
                </div>
                
                {/* Real-time Logs Feed */}
                <div className="md:col-span-5 flex flex-col justify-between p-4 rounded-lg bg-black/30 border border-white/5 text-[9px] font-mono leading-relaxed text-gray-400">
                  <div className="space-y-2">
                    <span className="text-gray-500 uppercase tracking-wider block border-b border-white/5 pb-1">Telemetry Logs</span>
                    <div ref={logFeedRef} className="space-y-1.5 h-36 overflow-y-auto pr-1">
                      {logs.map((log, idx) => (
                        <div key={idx} className="flex gap-1 pl-1 border-l border-accent-logi/30">
                          <span className="text-accent-logi">&gt;</span>
                          <span className="break-all">{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-2 flex justify-between text-gray-500">
                    <span>Active Drones: 14</span>
                    <span className="text-accent-logi font-bold">Link: OK</span>
                  </div>
                </div>
              </div>
            )}

            {/* FPV telemetry cockpit module */}
            {activeTab === 'racing' && (
              <div className="w-full h-full min-h-[300px] flex flex-col justify-between relative">
                <div className="text-xs font-mono text-accent-fpv uppercase tracking-widest flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-fpv animate-ping" />
                    FPV Cockpit OSD
                  </span>
                  <span>1080P 120FPS</span>
                </div>

                <div className="my-auto max-w-sm mx-auto w-full grid grid-cols-2 gap-4 border border-accent-fpv/20 p-6 rounded-xl bg-black/40 font-mono text-center relative overflow-hidden">
                  {/* Cyberpunk grid backdrop */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(249,115,22,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
                  
                  <div>
                    <span className="text-[9px] text-gray-500 uppercase block">Speed</span>
                    <span className="text-2xl font-bold text-white">{osd.speed} <span className="text-xs font-normal text-gray-400">km/h</span></span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 uppercase block">Battery Voltage</span>
                    <span className="text-2xl font-bold text-white">{osd.voltage} <span className="text-xs font-normal text-gray-400">V</span></span>
                  </div>
                  <div className="col-span-2 border-t border-white/5 pt-3 flex justify-between items-center text-xs">
                    <span className="text-gray-500">THROTTLE: {osd.throttle}%</span>
                    <span className="text-[#ec4899] font-bold">RSSI: {osd.rssi}%</span>
                  </div>
                </div>

                <div className="text-[9px] font-mono text-gray-500 flex justify-between">
                  <span>CAMERA TILT: +35°</span>
                  <span>LATENCY: 28ms</span>
                </div>
              </div>
            )}

            {/* Academy Exploded view drone module */}
            {activeTab === 'academy' && (
              <div 
                ref={explodedContainerRef}
                onMouseMove={handleExplodeMouseMove}
                onMouseLeave={handleExplodeMouseLeave}
                className="w-full h-full min-h-[300px] flex flex-col justify-between relative cursor-row-resize"
              >
                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center justify-between">
                  <span>3D Assembly Breakdown</span>
                  <span>AG-X6 Hexa</span>
                </div>

                {/* Exploded layers */}
                <div className="relative w-full h-44 flex flex-col items-center justify-center">
                  {/* Props */}
                  <div ref={propRef} className="absolute transform -translate-y-8 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                    <svg viewBox="0 0 100 20" className="w-40 h-8 stroke-white fill-none" strokeWidth="1.5">
                      <ellipse cx="20" cy="10" rx="18" ry="3" />
                      <ellipse cx="80" cy="10" rx="18" ry="3" />
                      <line x1="20" y1="10" x2="80" y2="10" stroke="rgba(255,255,255,0.15)" strokeDasharray="2,2" />
                    </svg>
                  </div>
                  {/* Motors */}
                  <div ref={motorRef} className="absolute transform -translate-y-2 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]">
                    <svg viewBox="0 0 100 20" className="w-40 h-8 stroke-white fill-none" strokeWidth="1.5">
                      <rect x="18" y="5" width="8" height="10" rx="1" />
                      <rect x="74" y="5" width="8" height="10" rx="1" />
                      <line x1="26" y1="10" x2="74" y2="10" strokeWidth="2" />
                    </svg>
                  </div>
                  {/* Frame */}
                  <div ref={frameRef} className="absolute transform translate-y-3 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]">
                    <svg viewBox="0 0 100 20" className="w-40 h-8 stroke-white fill-none" strokeWidth="1.5">
                      <polygon points="35,4 65,4 72,10 65,16 35,16 28,10" />
                      <rect x="44" y="7" width="12" height="6" rx="0.5" strokeWidth="1" />
                    </svg>
                  </div>
                  {/* Battery */}
                  <div ref={batteryRef} className="absolute transform translate-y-8 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                    <svg viewBox="0 0 100 20" className="w-40 h-8 stroke-white fill-none" strokeWidth="1.5">
                      <rect x="40" y="5" width="20" height="10" rx="1" />
                    </svg>
                  </div>
                </div>

                <div className="text-[9px] font-mono text-gray-500 text-center">
                  Move mouse vertically over the box to slide mechanical layers
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Descriptions & Visual anchors (lg:span-5) */}
          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-6">
            
            {/* Tab descriptive text */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-theme-accent uppercase font-bold transition-colors duration-300">
                {activeTab === 'survey' && "GIS Surveying & Eco spraying"}
                {activeTab === 'logistics' && "Smart Low-Altitude Delivery"}
                {activeTab === 'racing' && "FPV High Speed Racing"}
                {activeTab === 'academy' && "Pilot Licensing & Repair"}
              </span>
              
              <h3 className="text-2xl font-bold text-white tracking-tight leading-none">
                {activeTab === 'survey' && "高精三维扫描与农林保林"}
                {activeTab === 'logistics' && "空中物流调度配送网"}
                {activeTab === 'racing' && "FPV极速穿越与特技拍摄"}
                {activeTab === 'academy' && "CAAC执照考训与售后运维"}
              </h3>
              
              <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                {activeTab === 'survey' && "配备高光谱相机与全天候雷达，进行高精度等高线绘制与地质测绘；植保服务自动规划路径实现精准均匀喷洒。"}
                {activeTab === 'logistics' && "架设安全冗余极高的空中穿梭物流链路，针对跨江河、城市毛细血管级路线提供常态化即时冷链及小件配送。"}
                {activeTab === 'racing' && "提供高带宽天空端与时速突破150KM/h的特种拍摄机，完成电影级高速跟车镜头抓取或赛事光影门障碍竞速。"}
                {activeTab === 'academy' && "开设官方考规理论与飞行小时训练基地，配合自主建档检修流程，为航空设备全生命周期运营强力护航。"}
              </p>
            </div>

            {/* Visual background image card (styled as glass HUD frame) */}
            <div className="h-32 border border-white/5 rounded-xl overflow-hidden relative group">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-all duration-500">
                {activeTab === 'survey' && (
                  <img
                    src="https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=500&q=80"
                    alt="Drone over field"
                    className="w-full h-full object-cover filter saturate-50 brightness-75"
                  />
                )}
                {activeTab === 'logistics' && (
                  <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80"
                    alt="Warehouse sort yard"
                    className="w-full h-full object-cover filter saturate-50 brightness-75"
                  />
                )}
                {activeTab === 'racing' && (
                  <img
                    src="https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=500&q=80"
                    alt="FPV race light tunnel"
                    className="w-full h-full object-cover filter saturate-150 brightness-75"
                  />
                )}
                {activeTab === 'academy' && (
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80"
                    alt="Workshop engineer"
                    className="w-full h-full object-cover filter saturate-0 brightness-75"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-base-dark to-transparent" />
              
              <div className="absolute bottom-3 left-4 text-[9px] font-mono text-gray-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-theme-accent transition-colors duration-300" />
                <span>Security Operations Certified</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes shimmer-dash {
          to {
            stroke-dashoffset: -80;
          }
        }
      `}</style>
    </section>
  );
}
