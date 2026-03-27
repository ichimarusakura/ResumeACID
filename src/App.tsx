import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { ArrowUpRight, Plus, Minus, Github, Mail, ArrowLeft } from 'lucide-react';
import { ReactLenis } from 'lenis/react';

function WechatIcon({ size = 24, className = "" }: { size?: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M682.666667 341.333333c-17.066667 0-34.133333 0-51.2 4.266667C605.866667 217.6 477.866667 128 320 128 140.8 128 0 247.466667 0 396.8c0 85.333333 46.933333 162.133333 123.733333 213.333333l-34.133333 106.666667 115.2-59.733333c38.4 12.8 76.8 17.066667 119.466667 17.066667 8.533333 0 17.066667 0 25.6-4.266667C332.8 512 430.933333 384 576 384c34.133333 0 68.266667 4.266667 106.666667 12.8C682.666667 366.933333 682.666667 354.133333 682.666667 341.333333z m-204.8-106.666666c25.6 0 42.666667 17.066667 42.666667 42.666666s-17.066667 42.666667-42.666667 42.666667-42.666667-17.066667-42.666667-42.666667 17.066667-42.666666 42.666667-42.666666z m-213.333334 85.333333c-25.6 0-42.666667-17.066667-42.666666-42.666667s17.066667-42.666667 42.666666-42.666666 42.666667 17.066667 42.666667 42.666666-17.066667 42.666667-42.666667 42.666667z" />
      <path d="M1024 640c0-136.533333-136.533333-247.466667-307.2-247.466667-170.666667 0-307.2 110.933333-307.2 247.466667 0 136.533333 136.533333 247.466667 307.2 247.466667 38.4 0 72.533333-8.533333 106.666667-21.333334l89.6 46.933334-25.6-81.066667C977.066667 776.533333 1024 712.533333 1024 640z m-409.6-42.666667c-17.066667 0-34.133333-12.8-34.133333-34.133333s17.066667-34.133333 34.133333-34.133333 34.133333 12.8 34.133333 34.133333-17.066667 34.133333-34.133333 34.133333z m196.266667 0c-17.066667 0-34.133333-12.8-34.133334-34.133333s17.066667-34.133333 34.133334-34.133333 34.133333 12.8 34.133333 34.133333-17.066667 34.133333-34.133333 34.133333z" />
    </svg>
  );
}

function ParallaxContent({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  return (
    <motion.div
      ref={ref}
      className={`${className || ''} print:!opacity-100 print:!filter-none print:!transform-none`}
      style={{ y, opacity, filter: blur }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [activeSection, setActiveSection] = useState('home');

  // 滚动到顶部 (切换页面时)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProject]);

  // 滚动监听 (Scroll Spy)
  useEffect(() => {
    const handleScroll = () => {
      if (selectedProject) return;
      const sections = ['home', 'about', 'work', 'contact'];
      const scrollPosition = window.scrollY + 300; // offset

      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedProject]);

  const scrollTo = (id: string) => {
    const doScroll = () => {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (selectedProject) {
      setSelectedProject(null);
      setTimeout(doScroll, 100);
    } else {
      doScroll();
    }
  };

  const navItems = [
    { id: 'home', label: '个人信息' },
    { id: 'about', label: '工作履历' },
    { id: 'work', label: '产品项目', hasDot: true },
    { id: 'contact', label: '联系方式' }
  ];

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 2, smoothWheel: true, wheelMultiplier: 0.8 }}>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-sky-200 selection:text-sky-900">
        <CustomCursor />
        
        {/* 清新透气的环境背景光晕 */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-sky-300/30 blur-[120px] mix-blend-multiply animate-blob" />
          <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-300/30 blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
          <div className="absolute -bottom-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-teal-300/20 blur-[120px] mix-blend-multiply animate-blob animation-delay-4000" />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
        </div>

        {/* Floating Pill Navbar */}
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center p-1.5 bg-white/60 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 print:hidden">
          {navItems.map((item) => {
            const isActive = activeSection === item.id && !selectedProject;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-6 py-2.5 rounded-full text-[15px] font-medium transition-colors duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'text-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-200/50"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {item.hasDot && (
                    <motion.span 
                      className="w-1.5 h-1.5 rounded-full" 
                      animate={{
                        y: [0, -6, 0],
                        backgroundColor: ['#FF3B30', '#34C759', '#007AFF', '#FF3B30']
                      }}
                      transition={{
                        y: {
                          duration: 0.6,
                          repeat: Infinity,
                          ease: ["easeOut", "easeIn"]
                        },
                        backgroundColor: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }
                      }}
                    />
                  )}
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        <main className="relative z-10 pt-24">
          <div className="print:hidden">
            <AnimatePresence mode="wait">
              {selectedProject ? (
                <ProjectDetail key="detail" project={selectedProject} onBack={() => setSelectedProject(null)} />
              ) : (
                <HomeView key="home" onSelectProject={setSelectedProject} />
              )}
            </AnimatePresence>
          </div>

          {/* Print View */}
          <div className="hidden print:block">
            <HomeView key="home-print" onSelectProject={() => {}} />
            <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto break-before-page">
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-12 border-b border-slate-200 pb-4">
                项目详情
              </h2>
              {projects.map((project, idx) => (
                <div key={idx} className="mb-24 break-inside-avoid">
                  <ProjectDetail project={project} onBack={() => {}} isPrint />
                </div>
              ))}
            </div>
            <Footer />
          </div>
        </main>

        {/* Global Styles */}
        <style>{`
          html { scroll-behavior: smooth; }
          
          /* 隐藏全局滚动条 */
          ::-webkit-scrollbar {
            display: none;
          }
          html, body {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }

          * { cursor: none !important; } /* 隐藏全局默认指针 */
          
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(50px, -100px) scale(1.1); }
            66% { transform: translate(-50px, 50px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob { animation: blob 20s infinite alternate ease-in-out; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }

          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            * { cursor: auto !important; }
            .print\\:hidden { display: none !important; }
            .print\\:block { display: block !important; }
            .print\\:opacity-100 { opacity: 1 !important; }
            .print\\:translate-y-0 { transform: translateY(0) !important; }
          }
        `}</style>
      </div>
    </ReactLenis>
  );
}

// --- Custom Cursor ---
function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 物理阻尼配置
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(mouseX, springConfig);
  const cursorYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="print:hidden">
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-sky-500 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ x: mouseX, y: mouseY }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-sky-400/60 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
    </div>
  );
}

// --- Blur Typewriter Component ---
function BlurTypewriter({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) {
  const chars = text.split("");
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.03, delayChildren: delay } },
        hidden: {}
      }}
      className={`inline-block ${className} print:!opacity-100 print:!filter-none print:!transform-none`}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, filter: 'blur(10px)', y: 5 },
            visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.4 } }
          }}
          className="inline-block print:!opacity-100 print:!filter-none print:!transform-none"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

// --- Views ---

function Footer() {
  return (
    <footer id="contact" className="bg-sky-50 text-slate-800 px-6 md:px-12 py-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div>
          <div className="mb-8 space-y-2 text-slate-900 font-bold text-xl md:text-2xl">
            <p>13955168047</p>
            <p>ichimarusakura@qq.com</p>
          </div>
          <button 
            onClick={() => window.print()}
            className="bg-sky-500 text-white px-8 py-4 rounded-none font-bold tracking-wider hover:bg-slate-900 transition-colors flex items-center gap-3 print:hidden"
          >
            获取完整简历 <ArrowUpRight size={20} />
          </button>
        </div>
        <div className="flex gap-6 print:hidden">
          <SocialLink icon={Github} />
          <SocialLink icon={WechatIcon} isWechat />
          <SocialLink icon={Mail} />
        </div>
      </div>
    </footer>
  );
}

function HomeView({ onSelectProject, key }: { onSelectProject: (p: any) => void, key?: React.Key }) {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroY = useTransform(smoothProgress, [0, 0.3], ['0%', '40%']);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroBlur = useTransform(smoothProgress, [0, 0.2], ['blur(0px)', 'blur(12px)']);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="print:!opacity-100 print:!transform-none"
    >
      {/* Hero Section */}
      <section id="home" className="pt-20 pb-20 px-6 md:px-12 border-b border-slate-200">
        <motion.div style={{ y: heroY, opacity: heroOpacity, filter: heroBlur }} className="max-w-7xl mx-auto print:!opacity-100 print:!filter-none print:!transform-none">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 flex items-baseline gap-4 text-slate-900">
                <BlurTypewriter text="王 勇" delay={0.1} />
                <span className="text-sky-500 font-mono text-2xl md:text-4xl font-normal">
                  <BlurTypewriter text="/ WANG YONG" delay={0.4} />
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium text-slate-600 mb-6">
                <BlurTypewriter text="资深 AI 产品经理" delay={0.8} />
              </h2>
            </div>
            <div className="max-w-xl pb-2">
              <p className="font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-3 text-slate-500">
                <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span>
                STATUS: OPEN TO OPPORTUNITIES
              </p>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-xs md:text-sm leading-relaxed text-slate-600 font-medium text-justify max-h-[240px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent print:!opacity-100 print:!transform-none print:max-h-none print:overflow-visible"
                data-lenis-prevent
              >
                <ul className="space-y-4 list-disc pl-4 marker:text-sky-500">
                  <li>
                    <span className="font-bold text-slate-900">前沿 AI 架构落地：</span>具备传统 SaaS 向 AI 时代的完整转型经验。熟悉大语言模型（LLM）应用层架构设计，熟练主导 <span className="font-bold text-slate-900">多智能体工作流编排</span>、非结构化数据多模态解析及高精度 <span className="font-bold text-slate-900">RAG</span> 系统的落地。
                  </li>
                  <li>
                    <span className="font-bold text-slate-900">复杂业务架构抽象：</span>深耕 G 端政务、军警与 B 端能源基建领域。具备复杂业务拆解能力，能将高压且非标的业务 SOP 转化为标准化、中台化的系统模型，主导过多款千万级政企平台的设计演进。
                  </li>
                  <li>
                    <span className="font-bold text-slate-900">多模态软硬协同底盘：</span>拥有“LLM大模型 + CV视觉算法 + IoT物联硬件 + GIS时空数据”全链路产品跨界综合经验。熟练掌握数据分析，能直接对接算法团队进行模型评测、数据样本清洗与调优策略制定。
                  </li>
                  <li>
                    <span className="font-bold text-slate-900">敏捷交付与用户体验把控：</span>UI/UX 设计师出身，具备极高的交互审美与同理心。擅长处理复杂软硬件交互场景，精准平衡客户定制化诉求。
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-slate-200 pt-8">
            <Stat label="Location" value="合肥" />
            <Stat label="Experience" value="7年+" />
            <Stat label="Core Focus" value="B G端产品 / AI大模型应用" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-2">Education</div>
              <div className="font-bold text-lg tracking-tight text-slate-800">合肥工业大学</div>
              <div className="text-slate-600 text-sm font-medium mt-1">工程管理</div>
              <div className="font-mono text-[10px] text-slate-400 mt-1">2014.03 ~ 2016.07</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-2">Education</div>
              <div className="font-bold text-lg tracking-tight text-slate-800">滁州职业技术学院</div>
              <div className="text-slate-600 text-sm font-medium mt-1">建筑装饰工程技术</div>
              <div className="font-mono text-[10px] text-slate-400 mt-1">2008.09 ~ 2011.07</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Experience Timeline Section */}
      <section id="about" className="px-6 md:px-12 py-32 border-b border-slate-200 bg-white/20">
        <ParallaxContent className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-2">
              工作履历
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-slate-400">Experience Timeline</p>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-3 md:ml-4">
            {experiences.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="mb-16 last:mb-0 ml-8 md:ml-12 relative print:!opacity-100 print:!transform-none"
              >
                {/* Timeline Dot */}
                <span className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 rounded-full bg-sky-500 ring-4 ring-[#F8FAFC]" />
                
                <div className="font-mono text-xs font-bold text-sky-500 mb-2 tracking-widest">{exp.period}</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">{exp.company}</h3>
                <div className="text-slate-500 font-medium mb-4">{exp.role}</div>
                <div className="text-slate-700 font-medium mb-4 max-w-2xl text-justify">
                  <span className="font-bold text-slate-900">核心产出：</span>{exp.coreOutput}
                </div>
                <ul className="list-disc pl-4 text-slate-600 leading-relaxed max-w-2xl text-justify space-y-2 marker:text-slate-400">
                  {exp.achievements.map((ach, j) => (
                    <li key={j}>
                      <span className="font-bold text-slate-800">{ach.title}</span> {ach.desc}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </ParallaxContent>
      </section>

      {/* Projects Section */}
      <section id="work" className="px-6 md:px-12 py-32 bg-white/10 relative z-10 print:hidden">
        <ParallaxContent className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-2">
              产品项目
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-slate-400">Selected Works</p>
          </div>

          <div className="flex flex-col md:flex-row w-full min-h-[600px] border border-white/50 rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] print:hidden">
            {projects.map((project, index) => (
              <AccordionItem 
                key={index} 
                project={project} 
                index={index} 
                isActive={activeIndex === index}
                onActivate={() => setActiveIndex(index)}
                onViewDetails={() => onSelectProject(project)}
              />
            ))}
          </div>
        </ParallaxContent>
      </section>

      {/* Footer */}
      <div className="print:hidden">
        <Footer />
      </div>
    </motion.div>
  );
}

function ProjectDetail({ project, onBack, isPrint = false, key }: { project: any, onBack: () => void, isPrint?: boolean, key?: React.Key }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-7xl mx-auto ${isPrint ? '' : 'px-6 md:px-12 py-12'} print:!opacity-100 print:!transform-none`}
    >
      {!isPrint && (
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-sky-500 font-mono text-sm uppercase tracking-widest mb-12 transition-colors print:hidden"
        >
          <ArrowLeft size={16} /> Back to Projects
        </button>
      )}

      <header className="mb-20 border-b border-slate-200 pb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-2xl text-slate-300 font-light">{project.id}</span>
          <span className="px-3 py-1 bg-sky-100 text-sky-700 font-bold font-mono text-xs uppercase tracking-widest rounded">
            {project.category}
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8">
          {project.title}
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat label="Role" value={project.details.role} />
          <Stat label="Duration" value={project.details.duration} />
          <Stat label="Platform" value={project.details.platform} />
          <Stat label="Team Size" value={project.details.team} />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-20">
        <div className="md:col-span-4">
          <h3 className="font-mono text-sm uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-200 pb-4">
            Project Description / 项目描述
          </h3>
          <p className="text-lg leading-relaxed text-slate-700 text-justify">
            {project.details.description}
          </p>
        </div>
        <div className="md:col-span-8">
          <h3 className="font-mono text-sm uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-200 pb-4">
            Core Responsibilities & Outcomes / 核心职责与业务成果
          </h3>
          <div className="space-y-8 mb-12">
            {project.details.responsibilities.map((resp: any, i: number) => (
              <div key={i}>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{resp.title}</h4>
                <ul className="list-disc list-outside ml-5 space-y-2 text-slate-700 leading-relaxed">
                  {resp.items.map((item: string, j: number) => {
                    const parts = item.split(/(\*\*.*?\*\*)/g);
                    return (
                      <li key={j} className="text-justify">
                        {parts.map((part, k) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={k} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
                          }
                          return <span key={k}>{part}</span>;
                        })}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pb-20"></div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Components ---

function Stat({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-2">{label}</div>
      <div className="font-bold text-lg tracking-tight text-slate-800">{value}</div>
    </div>
  );
}

function SocialLink({ icon: Icon, isWechat = false }: { icon: any, isWechat?: boolean }) {
  return (
    <div className="relative group">
      <a href="#" className="w-12 h-12 rounded-none border border-slate-300 flex items-center justify-center hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-colors">
        <Icon size={20} />
      </a>
      {isWechat && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-50">
          <div className="bg-white p-2 rounded-lg shadow-xl border border-slate-200 relative">
            <img src={new URL('./qr.png', import.meta.url).href} alt="WeChat QR Code" className="w-60 h-80" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-slate-200 transform rotate-45"></div>
          </div>
        </div>
      )}
    </div>
  );
}

function TypewriterText({ text, isActive, delay = 500 }: { text: string, isActive: boolean, delay?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    let timeout: any;
    let interval: any;

    if (isActive) {
      setDisplayedText('');
      setShowCursor(true);
      timeout = setTimeout(() => {
        let i = 0;
        interval = setInterval(() => {
          setDisplayedText(text.substring(0, i + 1));
          i++;
          if (i >= text.length) {
            clearInterval(interval);
          }
        }, 15); // Adjust typing speed here
      }, delay);
    } else {
      setDisplayedText('');
      setShowCursor(false);
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isActive, text, delay]);

  return (
    <span className="relative">
      {displayedText}
      {showCursor && (
        <motion.span 
          animate={{ opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} 
          className="inline-block w-[2px] h-[1.2em] bg-sky-500 ml-1 align-middle translate-y-[-10%]" 
        />
      )}
    </span>
  );
}

function AccordionItem({ project, index, isActive, onActivate, onViewDetails, key }: { project: any, index: number, isActive: boolean, onActivate: () => void, onViewDetails: () => void, key?: React.Key }) {
  return (
    <div 
      className={`group flex flex-col border-b md:border-b-0 md:border-r border-white/40 last:border-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden backdrop-blur-xl ${
        isActive ? 'md:flex-[3] flex-[auto] bg-white/60 shadow-[inset_0_0_30px_rgba(255,255,255,0.9)]' : 'md:flex-1 flex-[auto] bg-white/20 hover:bg-white/40'
      }`}
      onClick={onActivate}
    >
      <div className="p-6 md:p-8 flex flex-col h-full min-w-[140px]">
        {/* Header */}
        <div className={`flex ${isActive ? 'justify-between items-start' : 'flex-col items-start'} mb-8 transition-all duration-500`}>
          <span className={`font-sans mb-4 md:mb-0 transition-all duration-500 ${isActive ? 'text-sm md:text-base font-bold text-slate-900' : 'text-xs md:text-sm font-medium text-slate-500'}`}>00-{index + 1}</span>
          <h3 className={`uppercase tracking-tighter transition-all duration-500 ${isActive ? 'text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 text-right' : 'text-lg md:text-xl font-medium text-slate-700 text-left mt-4'}`}>
            {project.title}
          </h3>
        </div>

        {/* Content */}
        <div className={`flex-1 flex-col justify-between transition-opacity duration-700 ${isActive ? 'flex opacity-100 delay-300' : 'hidden opacity-0'}`}>
          <div className="mb-8">
            <p className="text-base leading-relaxed text-slate-600 text-justify min-h-[80px]">
              <TypewriterText text={project.desc} isActive={isActive} delay={400} />
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-end justify-between mt-auto">
            <div className="flex-1 flex flex-col gap-2">
              {project.tags.map((tag: string, i: number) => (
                <motion.span 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: isActive ? 0.4 + i * 0.1 : 0, ease: "easeOut" }}
                  className="font-sans text-sm md:text-base font-bold uppercase tracking-tight text-slate-900"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <div className="relative flex items-center justify-center shrink-0">
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-slate-300"
                  animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
                />
              )}
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails();
                }}
                className="relative z-10 flex items-center justify-center w-14 h-14 border-2 border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600 bg-white hover:bg-slate-50 transition-all duration-300 rounded-full"
              >
                <ArrowUpRight size={24} strokeWidth={2.5} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Fake Data ---

const experiences = [
  {
    period: "2025.05 ~ 至今",
    company: "中科类脑 - 智算事业部",
    role: "AI 产品经理",
    coreOutput: "独立负责Agent架构抽象与RAG策略调优，具备将复杂政务SOP转化为多智能体协同工作流的能力。",
    achievements: [
      { title: "高可用RAG中台与策略调优：", desc: "设计非结构化知识库，引入 MinerU 解析复杂政务文档。搭建基于“准确率/命中率”的模型评估看板，通过检索与重排策略优化，将平均召回率稳定在 97%。" },
      { title: "Agent工作流与Tools/Skills编排：", desc: "设计自定义智能体引擎。针对公文与合同生成场景，抽象设计专属 Tools（结构化指标解析、数据库智能问数）与 Skills（公文合规SOP），实现全自动化报告撰写。" },
      { title: "多智能体业务流效能提升：", desc: "基于清洗后的 1.7 万条代表案例知识库，设计包含意图识别、自动归类转派、阶段报告生成的多智能体协同工作流，推动转派与处理效率大幅提升 70%。" },
      { title: "产业大模型Deep Research应用：", desc: "结合关系图谱与政策库RAG，构建宏观产业全景与企业画像，落地产业链推演与精准招商推荐系统。" }
    ]
  },
  {
    period: "2024.03 ~ 2025.04",
    company: "讯飞智元 - 智慧城市BG",
    role: "AI 产品经理",
    coreOutput: "采用敏捷交付模式，主导省级网信办“AI+大模型”态势感知与舆情智能监测系统的从 0 到 1 构建。",
    achievements: [
      { title: "海量数据LLM挖掘与24H预警：", desc: "优化底层信源采集规则，接入LLM对日均 400 万条海量数据进行动态阈值过滤与潜在热点挖掘，实现无人工干预的全自动预警。" },
      { title: "数据工程与模型调优：", desc: "针对实网舆情噪音数据，主导构建并提供高质量训练集与验证集。制定算法优化策略，并在生产环境主导模型测试，将核心舆情意图识别准确率提升至 94%。" },
      { title: "图谱构建与事件闭环：", desc: "基于 LLM 构建舆情事件传播知识图谱。打通多部门应急预案模板，利用模型自动生成标准化预案及态势报告，辅助网信办实现 95% 以上突发事件在 72 小时内闭环处置。" }
    ]
  },
  {
    period: "2015.07 ~ 2023.12",
    company: "安徽清新互联信息科技有限公司",
    role: "产品经理 / UI|UX 设计师",
    coreOutput: "统筹公司软件平台与 UI 体验，主导安防 GIS 系统及四大核心底层业务矩阵的架构演进，推动公司业务从硬件交付向 SaaS 化平台转型。",
    achievements: [
      { title: "大型军警GIS综合调度平台：", desc: "结合 OSM 地图与硬件实景回传进行路网基建，自研高精度路线纠偏算法。深度融合多源异构设备，设计复杂执勤考勤引擎，平台投产后推动核心区域街面见警率提升至 98%，获官方“十分满意”验收评价。" },
      { title: "音视频云底座与AI视觉物联：", desc: "抽象跨行业诉求，从 0 构建国标音视频云平台（ICVS）。结合 CV 视觉算法落地防疫矩阵与光伏电力无人巡检，并亲自下场主导高并发环境下的数据样本清洗，反向优化识别准确率。" },
      { title: "复杂系统 SaaS 化与商业演进：", desc: "规划建发智慧工地、华米智慧养老及变电站数字孪生产品线，打通可穿戴设备、3D 模型与业务流。并行主导公司内部 ERP/MIS 系统的流程重构与自研，大幅降低企业内耗与外采成本。" }
    ]
  }
];

const projects = [
  {
    id: '01',
    title: '政务AI智能平台',
    category: '政务AI',
    desc: '面向政府打造的“政务AI大脑”，融合大模型、多智能体与RAG技术，实现12345工单智能分派、公文自动生成、合规检查及产业招商推演。通过构建高精度政务知识中台，沉淀权责清单、案例与政策超30万条，支持自定义智能体灵活调用业务能力，推动基层减负与决策智能化，助力政府从数字化迈向认知智能。',
    tags: ['政务AI', 'RAG', 'LLM', '多智能体', '多模态解析', '关系图谱', '深度研究'],
    metrics: [
      { value: '100%', label: '工单自动化预处理' },
      { value: '高精度', label: 'RAG知识检索' }
    ],
    details: {
      role: 'AI 产品经理',
      duration: '12 个月',
      platform: 'Web/内网-本地私有化部署',
      team: '15+人',
      description: '面向乌鲁木齐经开区政府办公、市民服务及地区招商产业规划等复杂场景，主导基于大模型与多智能体（Multi-Agent）的综合性政务 AI 平台设计与落地，全面赋能政务AI数字化转型与基层减负提效。',
      responsibilities: [
        {
          title: '构建高精度政务 RAG 中台与知识资产沉淀：',
          items: [
            '根据各业务场景设计非结构化知识库，同时引入 MinerU等工具实现复杂政务文档的多模态解析。',
            '**技术深挖与成果：** 建立基于准确率、命中率的大模型评估与归因体系。通过优化检索策略、重排与多路召回机制，将 **RAG 平均召回率稳定提升至 97%**。',
            '**业务沉淀：** 累计为知识库清洗并沉淀 **1,300+ 条区域权责清单、17,000+ 条代表性历史案例，以及超 30 万条全国政策**，形成极具业务价值的政务数据资产。'
          ]
        },
        {
          title: '设计自定义多智能体平台：',
          items: [
            '主导构建“自定义智能体”平台服务，用户可自行编排智能体助手。',
            '**Agent 核心能力构建：** 设计了贴合业务场景的 **Tools（如数据库智能问数、结构化指标解析提取）**与 **Skills（公文特定写作 SOP、法律合规检查）**。通过赋予 Agent 外部工具调用与技能规划能力，实现基于真实业务数据的深度分析与自动化报告撰写。'
          ]
        },
        {
          title: '打造“12345”政务热线综治大脑，实现效能飞跃：',
          items: [
            '深入综治场景，基于清洗后的权责与案例知识库，设计 12345 流转专属 多智能体 业务流。',
            '**业务提效：** 实现工单智能意图识别、自动匹配权责与归类转派，并结合智能体自动生成阶段性综治分析报告，**核心转派处理效率大幅提升 70%**，切实解决基层痛点。'
          ]
        },
        {
          title: '规划产业经济智能推演与决策系统：',
          items: [
            '**技术融合：** 通过剖析底层数据库表结合关系图谱与政策库 RAG，构建多产业全景图谱。引入深度研究（Deep Research）机制与条件推理，赋能产业分析与企业画像。',
            '**业务价值：** 实现政务视角的招商企业精准推荐与政策推演，为政府宏观产业规划与靶向施策提供智能决策支持。'
          ]
        }
      ],
      images: [
        'https://picsum.photos/seed/gov1/1200/800?blur=2',
        'https://picsum.photos/seed/gov2/1200/800'
      ]
    }
  },
  {
    id: '02',
    title: '省网信办舆情智能监管平台',
    category: '舆情监管',
    desc: '基于“双模型”架构的AI舆情平台，日均处理400万条数据，实现分钟级敏感舆情预警、事件图谱溯源与演化预测。通过LLM深度挖掘热点、过滤噪音，准确率达97%；自动生成处置预案与研判报告，支撑95%以上舆情72小时内闭环。系统高并发、高稳定，实现从被动响应到主动预判的治理升级。',
    tags: ['双模型驱动架构', '舆情数据治理', '热点挖掘', '事件图谱', '智能体', '舆情噪音过滤', '归因溯源'],
    metrics: [
      { value: '400万+', label: '日均信息处理量' },
      { value: '95%+', label: '72小时闭环率' }
    ],
    details: {
      role: 'AI 产品经理',
      duration: '10 个月',
      platform: 'Web/内网-本地私有化部署',
      team: '10+人',
      description: '采用敏捷开发模式，为安徽省网信办从0到1主导构建双模型驱动的舆情智能监测系统。平台支持日均百万级数据的实时处理，实现从信息采集、动态预警、图谱分析到预案生成的全流程智能化与闭环管控。',
      responsibilities: [
        {
          title: '海量数据治理与 LLM 深度热点挖掘：',
          items: [
            '优化全网信源采集规则与策略，大幅降低前置人工干预成本。',
            '**核心技术落地：** 针对日均 **400 万条**的海量多源数据，应用大模型（LLM）能力进行深度信息抽取与潜在热点挖掘。',
            '**模型调优与成果：** 针对复杂的“舆情噪音数据”，主导构建高质量的训练集与验证集，制定算法优化策略并在生产环境完成模型测试，最终将**有效舆情与情感识别准确率跃升至 97%**。'
          ]
        },
        {
          title: '24H 动态智能预警与知识图谱构建：',
          items: [
            '突破传统静态规则限制，设计基于双模型的 24 小时全自动、动态阈值舆情预警模块，实现敏感舆情的分钟级响应。',
            '**复杂分析降本：** 主导构建**舆情事件知识图谱**，对碎片化信息进行实体关联与传播路径溯源，大幅提升了网信部门对突发事件的关联分析与研判效率。'
          ]
        },
        {
          title: '业务闭环赋能：预案生成与全自动研判报告：',
          items: [
            '利用 LLM 构建事件演化预测模型，深度融合多部门应急预案模板，实现**标准化处置预案的自动生成**。',
            '**效能飞跃：** 该功能成功辅助业务部门实现 **95% 以上的突发舆情事件在 72 小时内完成闭环处置**。',
            '抽象“智能写稿”Agent 能力，支持根据监测数据自动撰写并生成日、周、月维度的阶段性舆情研判报告，极大减轻了人工汇总的负担。'
          ]
        },
        {
          title: '敏捷交付与系统稳定性保障：',
          items: [
            '深度挖掘并对接业主（网信办）核心诉求，把控产品迭代节奏，协同研发与测试团队闭环解决已知缺陷，顺利完成项目初验并获得业主高度认可。',
            '针对底层大模型与业务服务的交互，编写自动化工具进行基础数据比对分析，细致评估潜在风险，圆满保障了项目在重大节点期间的数据与系统绝对稳定。'
          ]
        }
      ],
      images: [
        'https://picsum.photos/seed/data1/1200/800',
        'https://picsum.photos/seed/data2/1200/800?blur=2'
      ]
    }
  },
  {
    id: '03',
    title: '新疆公安武警动态勤务指挥平台',
    category: '智慧警务',
    desc: '为新疆公安武警打造的实战化指挥平台，融合GIS、OSM地图与执法记录仪实景，自研轨迹纠偏算法解决定位漂移，实现巡逻高精度可视。统一纳管多品牌IoT设备，保障低延迟跨系统协同；内嵌执勤考勤与警力分布算法，消除巡控盲区，重点区域见警率达98%，全面提升维稳快反与震慑能力。',
    tags: ['GIS信息融合', '高精度轨迹纠偏算法', '定位漂移补偿', 'IOT硬件集约纳管', '低延迟跨设备通信与调度', '自研执勤考勤核心算法', '警力分布间隙规则建模'],
    metrics: [
      { value: '98%', label: '重点区域见警率' },
      { value: '高精度', label: '轨迹纠偏与可视' }
    ],
    details: {
      role: '产品经理/项目负责人',
      duration: '18 个月',
      platform: '客户端/内网-本地私有化部署',
      team: '10+人',
      description: '针对自治区武警总队与公安街面巡逻的高压维稳实战需求，从0到1主导设计集“勤务调度、应急指挥、实景巡控、硬件集约管控”于一体的综合指挥平台。深度融合GIS技术、自研考勤算法与多源异构硬件，全面打通押解、布控、督导等核心业务闭环，强力支撑地区数字化警务建设。',
      responsibilities: [
        {
          title: 'GIS信息构建与高精度轨迹纠偏：',
          items: [
            '针对复杂偏远地区地理信息缺失的痛点，创新性结合 **OSM地图数据与前端执法记录仪** 实景回传，主导完成盲区道路网绘制。设计并迭代 **路线算法纠偏逻辑**，解决复杂电磁信号环境影响下的定位漂移，实现街面巡逻与任务轨迹的高精度实时可视与历史可溯源。'
          ]
        },
        {
          title: 'IoT多源异构硬件集约化纳管：',
          items: [
            '突破跨军警的设备壁垒，在接入自研音视频硬件的基础上，全域适配并统一纳管第三方视频监控、对讲机、执法记录仪及单兵装备，保障应急处突场景下低延迟、跨设备的无缝通讯与统一调度。'
          ]
        },
        {
          title: '核心业务算法设计与警力调度优化：',
          items: [
            '深入维稳一线挖掘核心痛点，从0到1主导设计 **执勤考勤核心算法逻辑** 与警力分布间隙规则。科学统筹武警战备部署与公安日常督导，消除巡控盲区，构建防震慑与快反兼备的调度模型。'
          ]
        },
        {
          title: '业务闭环交付与量化突破：',
          items: [
            '紧扣业务目标，前置评估技术风险并寻求权衡点，完善底层技术方案以规避已知系统缺陷。平台上线后直击管理痛点，推动核心商圈及重点区域 **街面见警率提升至 98%**，实战效能极大提升，获得高度评价。'
          ]
        }
      ],
      images: [
        'https://picsum.photos/seed/map1/1200/800?blur=2',
        'https://picsum.photos/seed/map2/1200/800'
      ]
    }
  },
  {
    id: '04',
    title: '智能视觉与应急指挥调度平台',
    category: '应急指挥',
    desc: '覆盖事前预警、事中指挥、事后回溯的标准化应急平台，集成CV算法、IoT与GIS，支持人脸测温、OCR人证比对、车牌识别等场景。在防疫、消防等领域快速复制：江苏消防实现“报警-车辆-人员-视频”全链路自动关联，成为省级应急中枢，显著提升响应效率与跨设备协同能力。',
    tags: ['GIS 轨迹跟踪', '视觉（CV）算法', 'IoT集成', 'OCR车牌人证识别', '复杂业务流重构', '任务调度底层架构'],
    metrics: [
      { value: '全链路', label: '警情自动关联' },
      { value: '高并发', label: '精准识别' }
    ],
    details: {
      role: '产品经理',
      duration: '长期',
      platform: '客户端/内网-本地私有化部署',
      team: '10+人',
      description: '依托公司音视频硬件优势，从0主导打造覆盖事前预警、事中指挥、事后回溯的应急指挥调度标准化底层平台。并以此为基座，结合计算机视觉算法与 IoT 技术，成功复制应用并落地公安、消防、防疫等多行业的深度定制化子系统矩阵。',
      responsibilities: [
        {
          title: '平台化架构与基座演进（应急指挥底座）：',
          items: [
            '统筹应急指挥全流程设计，搭建涵盖实时音视频、GIS 轨迹跟踪、多级权限管控（RBAC）与任务调度的底层架构。',
            '**产品抽象能力：** 深度提炼合肥公安、新疆武警、江苏消防等多行业定制版本的共性痛点，将泛用性功能持续反哺并沉淀至主版本，极大降低了后续跨行业交付的边际成本。'
          ]
        },
        {
          title: 'CV 视觉算法落地与软硬协同（防疫矩阵）：',
          items: [
            '面向高铁站、机场等高并发大流量场景，主导设计涵盖人脸测温、OCR 健康码/身份证比对、高速道口车牌识别的软硬一体化防疫矩阵。',
            '**算法数据驱动：** 逆向梳理终端用户痛点，深入现场进行**真实业务数据样本分析**，为 CV 视觉算法团队提供精准的训练集导向与阈值调优建议，保障了高复杂环境下的高吞吐与精准识别，获市级领导点名表扬。'
          ]
        },
        {
          title: '异构数据打通与复杂业务流重构（江苏消防）：',
          items: [
            '深度对接省级接处警中心，主导设计智能视频图传系统，打破数据孤岛。',
            '**全景数据绑定：** 统筹 5G 单兵、无人机、布控球及社会面监控的协议接入，实现警情发生时的**“报警-车辆-人员-现场视频”全链路自动关联与同步录制**。产品作为消防标杆全省推广，成为应急厅全域监管的核心中枢。'
          ]
        }
      ],
      images: [
        'https://picsum.photos/seed/vision1/1200/800',
        'https://picsum.photos/seed/vision2/1200/800?blur=2'
      ]
    }
  },
  {
    id: '05',
    title: '多类型创新产品矩阵',
    category: '综合解决方案',
    desc: '涵盖ICVS视频云底座、智慧工地SaaS、数字孪生变电站、执法采集站及自研MIS系统。通过抽象共性需求，制定IoT通用接入规范，降低交付成本；引入数字孪生与多模态融合，开辟高溢价产品线；以交互降维与防篡改SOP打造公安标杆；重构内部ERP流程，实现企业数字化自主可控与降本增效。',
    tags: ['三方异构IoT设备接入', '数字孪生', '智慧工地', '智慧养老', '交互降维设计', '防篡改SOP', 'ERP系统', '复杂业务流精简'],
    metrics: [
      { value: '0到1', label: '视频云底座落地' },
      { value: '多领域', label: '软硬一体化覆盖' }
    ],
    details: {
      role: '产品经理',
      duration: '长期',
      platform: '客户端-Web/内网-本地私有化部署',
      team: '10+人',
      description: '构建了一系列创新性的产品解决方案，覆盖了从音视频传输与AI物联平台到软硬一体化配套系统的多个领域。',
      responsibilities: [
        {
          title: '产品类型：音视频传输与 AI 物联平台类（ICVS云平台 / 光伏安全管控 / 电力无人巡检）',
          items: [
            '**需求收敛与中台化设计：** 深度剖析公安、电力、光伏等多行业客户的定制化诉求，将碎片化的视频流调度需求**抽象并收敛**，从0到1规划并落地了企业级国标视频云底座（ICVS）。',
            '**商业交付降本：** 制定第三方异构IoT设备（布控球、安全帽等）的通用接入规范。通过产品模块化设计与CV算法积木化调用，大幅缩短了后续国家电网无人巡检、新能源安全管控等泛行业项目的交付周期与研发边际成本。'
          ]
        },
        {
          title: '产品类型：智慧空间与多模态融合类（建发智慧工地 / 华米智慧养老 / 变电站数字孪生）',
          items: [
            '**SaaS商业化演进路线把控：** 主导建发房产智慧工地平台，规划了从“单体工地试错(MVP)”到“人员安全教育聚合”，再到“集团级SaaS平台化”的**三阶梯产品迭代路线**，成功推动产品从项目交付向SaaS化商业模式转型。',
            '**前瞻场景定义与生态整合：** 在华米联合智慧养老项目中，跨界统筹外部硬件生态，定义了智能穿戴体征数据与视频流、GIS系统的多模态融合业务规则。率先在行业内引入数字孪生（3D建模）重构变电站业务流，成功为公司开辟了高溢价的创新产品线。'
          ]
        },
        {
          title: '产品类型：软硬一体化配套系统类（公安执法记录仪采集站）',
          items: [
            '**用户同理心与交互降维把控：** 深入公安一线驻场调研，精准捕捉高频高压执法场景下，警务人员对设备盲操、并发上传的真实痛点。',
            '**业务闭环与强合规设计：** 主导规划执法记录仪“配套采集站”。平衡本地边缘计算体验与云端同步机制，重塑终端上云与防篡改SOP，实现警务数字资产从“无序散落”到“强合规溯源”的业务闭环，推动产品在市公安系统快速形成标杆应用。'
          ]
        },
        {
          title: '产品类型：企业级中后台与 ERP 类（清云内部 MIS 系统）',
          items: [
            '**复杂业务流精简与重塑：** 敏锐识别内部多系统割裂（CRM/ERP/OA/考勤）导致的管理内耗，主动发起清云MIS系统自研立项。深入各业务线抽丝剥茧，大刀阔斧地**合并冗余审批流与考核节点**。',
            '**内部降本增效：** 规划一体化底层数据架构并统一全局UI/UX视觉规范，摆脱对第三方商业软件的高度依赖，实现企业运转数字化的高度自主可控与实质性降本。'
          ]
        }
      ],
      images: [
        'https://picsum.photos/seed/iot1/1200/800?blur=2',
        'https://picsum.photos/seed/iot2/1200/800'
      ]
    }
  }
];
