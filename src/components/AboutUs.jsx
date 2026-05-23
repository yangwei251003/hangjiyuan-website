import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Users2, ShieldCheck, Award, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  const credentials = [
    {
      icon: <GraduationCap className="w-6 h-6 text-theme-accent" />,
      title: "产学研协同基地",
      desc: "深度依托“广州科技职业技术大学”学术背景，提供海量无人机专业人才储备与航空实训场地支撑。"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-theme-accent" />,
      title: "民航CAAC资质",
      desc: "核心飞行操控团队全员持证，严格遵循中国民航局安全规程，具备承接复杂空域多线路飞行任务实力。"
    },
    {
      icon: <Award className="w-6 h-6 text-theme-accent" />,
      title: "全产业智能制造",
      desc: "经营范围涵盖无人飞行器研发与制造、人工智能应用软件开发、物联网设备销售及航空运营支持服务。"
    }
  ];

  return (
    <section
      id="about-section"
      ref={containerRef}
      className="relative py-24 px-4 md:px-8 xl:px-16 overflow-hidden bg-base-dark border-t border-white/[0.03]"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Brand Story */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-accent/10 border border-theme-accent/20 text-theme-accent text-xs font-semibold uppercase tracking-wider transition-colors duration-300">
            <Building2 className="w-3.5 h-3.5" />
            <span>关于航纪元</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            粤港澳大湾区 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-accent to-white glow-text transition-all duration-300">
              硬核无人机全案服务商
            </span>
          </h2>

          <div className="space-y-4 text-gray-400 text-sm md:text-base font-light leading-relaxed">
            <p>
              航纪元科技（广州）有限公司坐落于大湾区核心区域——广州白云区。我们是一家智能无人飞行器制造与系统集成的高新技术企业，业务涵盖无人机研发制造、人工智能应用开发、物联网技术服务及航空运营支持等领域。
            </p>
            <p className="border-l-2 border-theme-accent pl-4 py-1 text-white font-medium bg-theme-accent/5 rounded-r transition-all duration-300">
              “懂技术、有团队、能落地，交给我们飞，稳！”
            </p>
            <p>
              我们拥有一支技术过硬、极具实战经验的飞行保障团队，可承接测绘建模、林业植保、空域配送等大型工业项目。携手高校，搭建专业化的产学研实操基地，确保每一步交付都科学严谨。
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Credentials Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Main big credential card */}
          <div 
            ref={(el) => (cardsRef.current[0] = el)}
            className="sm:col-span-2 glass-panel p-6 md:p-8 rounded-2xl border-white/5 flex flex-col justify-between group hover:border-theme-accent/30 transition-all duration-300"
          >
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-theme-accent font-bold transition-colors duration-300">Enterprise Credentials</span>
              <h3 className="text-xl md:text-2xl font-bold text-white">广州白云智能飞行中枢</h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light">
                我们以广州市白云区为核心运营中心，将空中交通智能调度、机器人研发制造和数据运算平台高度整合。致力于以安全合规为前提，打通大湾区低空无人化产业落地瓶颈。
              </p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-gray-500 block">注册范围</span>
                <span className="text-white font-semibold mt-1 block">智能飞行器研发及销售</span>
              </div>
              <div>
                <span className="text-gray-500 block">技术基石</span>
                <span className="text-theme-accent font-semibold mt-1 block transition-colors duration-300">高校产学研战略联动</span>
              </div>
            </div>
          </div>

          {/* Credentials cards */}
          {credentials.map((cred, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx + 1] = el)}
              className="glass-panel p-6 rounded-xl border-white/5 space-y-4 hover:border-theme-accent/20 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-theme-accent/10 border border-theme-accent/25 flex items-center justify-center transition-colors duration-300">
                {cred.icon}
              </div>
              <h4 className="text-base font-bold text-white">{cred.title}</h4>
              <p className="text-gray-400 text-xs leading-relaxed font-light">{cred.desc}</p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
