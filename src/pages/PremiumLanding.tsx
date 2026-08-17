import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, Share2, Globe, ArrowRight, Star, Sparkles, Gem,
  Instagram, Linkedin, Twitter, Menu, X
} from "lucide-react";
import { LogoPremium } from "@/components/premium/LogoPremium";

const useAutoScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (window.innerWidth >= 768) return;

    let raf: number;
    let pos = 0;
    let dir = 1;
    let autoRunning = true;
    let dragging = false;
    let velocity = 0;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartScroll = 0;
    let lastX = 0;
    let gestureDecided: boolean | null = null;

    const tick = () => {
      if (autoRunning && !dragging) {
        pos += 0.5 * dir;
        const maxS = el.scrollWidth - el.clientWidth;
        if (pos >= maxS) { dir = -1; pos = maxS; }
        else if (pos <= 0) { dir = 1; pos = 0; }
        el.scrollLeft = pos;
      } else if (!dragging && !autoRunning && Math.abs(velocity) > 0.3) {
        pos += velocity;
        velocity *= 0.92;
        const maxS = el.scrollWidth - el.clientWidth;
        pos = Math.max(0, Math.min(maxS, pos));
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onTouchStart = (e: TouchEvent) => {
      dragStartX = e.touches[0].clientX;
      dragStartY = e.touches[0].clientY;
      dragStartScroll = el.scrollLeft;
      pos = el.scrollLeft;
      lastX = e.touches[0].clientX;
      velocity = 0;
      dragging = false;
      gestureDecided = null;
    };

    const onTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - dragStartX;
      const dy = e.touches[0].clientY - dragStartY;

      if (gestureDecided === null) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        gestureDecided = Math.abs(dx) > Math.abs(dy);
      }

      if (!gestureDecided) return;

      e.preventDefault();
      autoRunning = false;
      dragging = true;
      velocity = lastX - e.touches[0].clientX;
      lastX = e.touches[0].clientX;
      const maxS = el.scrollWidth - el.clientWidth;
      pos = Math.max(0, Math.min(maxS, dragStartScroll - dx));
      el.scrollLeft = pos;
    };

    const onTouchEnd = () => {
      dragging = false;
      gestureDecided = null;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        autoRunning = true;
        pos = 0;
        dir = 1;
        velocity = 0;
        el.scrollLeft = 0;
      }
    }, { threshold: 0 });
    observer.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      observer.disconnect();
    };
  }, []);

  return { ref: scrollRef };
};

// Custom easing for cinematic motion simulating mass and spring physics
const premiumEasing = [0.32, 0.72, 0, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.1, duration: 1.2, ease: premiumEasing }
  })
};

const handleContact = () => {
  window.open("https://wa.me/5538991532617?text=Hi!%20I%20found%20Ideal%20Landing%20Co.%20and%20I%27d%20like%20to%20talk%20about%20a%20landing%20page%20project.", "_blank");
};

// Button-in-Button CTA Architecture (Haptic Micro-Aesthetic)
const MagneticCTA = ({ text, className = "", primary = true }: { text: string, className?: string, primary?: boolean }) => (
  <button 
    onClick={handleContact}
    className={`group relative pl-8 pr-[4.5rem] py-4 rounded-full font-bold tracking-wide active:scale-[0.98] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
      primary 
        ? "bg-[#FFDE21] text-black shadow-[0_0_30px_rgba(255,222,33,0.3)] hover:shadow-[0_0_50px_rgba(255,222,33,0.5)]" 
        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
    } ${className}`}
  >
    {text}
    <div className={`absolute right-1.5 top-0 bottom-0 my-auto h-[calc(100%-12px)] max-h-[44px] md:max-h-[48px] aspect-square rounded-full flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:scale-105 ${
      primary ? "bg-black/10" : "bg-white/10"
    }`}>
      <ArrowRight className="w-5 h-5" />
    </div>
  </button>
);

// Double-Bezel Card (Nested Architectural Layout)
const DoubleBezelCard = ({ children, className = "", delay = 0, bentoClass = "" }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 40, filter: "blur(5px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: false, margin: "-100px" }}
    transition={{ duration: 1.2, delay, ease: premiumEasing }}
    className={`p-1.5 rounded-[2rem] bg-white/5 border border-white/10 ring-1 ring-black/5 ${bentoClass}`}
  >
    <div className={`h-full rounded-[calc(2rem-0.375rem)] bg-[#050505] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-6 md:p-8 ${className}`}>
      {children}
    </div>
  </motion.div>
);

const testimonialsData = [
  { name: "Sarah Mitchell", role: "CEO, Mitchell Aesthetics Clinic", text: "We were running Meta ads and getting clicks but almost no bookings. After Ideal Landing Co. redesigned our landing page around conversions, our cost per booked consultation dropped significantly within the first two weeks." },
  { name: "James Carroll", role: "Founder, Carroll Performance Marketing", text: "As a paid media agency we were always looking for a reliable landing page partner. Ideal Landing Co. delivers fast, the quality is genuinely premium, and our clients notice the difference immediately. They've become our go-to white-label partner." },
  { name: "Daniel Reeves", role: "Owner, Apex Home Services", text: "I was skeptical about investing in a dedicated landing page when I already had a website. But the difference is real. The page they built for our Google Ads campaign converts at a much higher rate than anything we had before." }
];

const PremiumLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const processScroll = useAutoScroll();
  const portfolioScroll = useAutoScroll();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isMenuOpen]);

  return (
    <div className="min-h-[100dvh] bg-[#050505] text-white selection:bg-[#FFDE21]/30 overflow-x-hidden font-sans">
      
      {/* Vibe & Texture: Ethereal Glass */}
      <div className="fixed inset-0 z-0 opacity-100 scale-100">
        <img 
          src="/premium-bg-new.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-60 mix-blend-screen"
        />
      </div>
      <div className="fixed inset-0 bg-[#050505]/60 z-[1] pointer-events-none" />
      <div className="fixed inset-0 noise-bg z-[2] opacity-30 pointer-events-none mix-blend-overlay" />

      {/* Fluid Island Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-5xl rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl p-2 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
        <div className="flex items-center justify-between px-6 h-14">
          <LogoPremium />
          
          <div className="hidden md:flex items-center gap-8">
            {["Services", "Work", "Process", "Testimonials"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-[#FFDE21] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          
          <div className="hidden md:block">
            <button onClick={handleContact} className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-[#FFDE21] hover:text-black border border-white/10 text-xs font-bold uppercase tracking-widest transition-all duration-500">
              Get a Free Audit
            </button>
          </div>

          <button 
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`absolute h-[2px] w-6 bg-current transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
            <span className={`absolute h-[2px] w-6 bg-current transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute h-[2px] w-6 bg-current transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Modal with Staggered Reveals */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: premiumEasing }}
            className="fixed inset-0 z-[50] bg-[#050505]/95 backdrop-blur-3xl flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center gap-10">
              {["Services", "Work", "Process", "Testimonials"].map((item, i) => (
                <motion.a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 * i, duration: 0.8, ease: premiumEasing }}
                  className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white hover:text-[#FFDE21] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.8, ease: premiumEasing }}
                className="mt-8"
              >
                 <MagneticCTA text="Get a Free Audit" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-40 pb-20">
        
        {/* Hero Z-Axis Cascade & Massive Typography */}
        <section className="min-h-[90dvh] flex items-center justify-center pt-16 pb-0 lg:pt-24 lg:pb-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-2 lg:gap-20 items-center">
              
              <div className="relative z-10 text-center lg:text-left">
                <motion.h1 
                  custom={1} variants={fadeUp} initial="hidden" animate="visible"
                  className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 md:mb-10 leading-[1.1] md:leading-[0.85] tracking-tighter mt-4 md:mt-0"
                >
                  Your ads are getting clicks. <br className="hidden md:block" />
                  <span className="text-[#FFDE21] drop-shadow-[0_0_80px_rgba(255,222,33,0.3)]">
                    Your page should get customers.
                  </span>
                </motion.h1>

                <motion.p 
                  custom={2} variants={fadeUp} initial="hidden" animate="visible"
                  className="text-lg md:text-2xl text-white/50 max-w-2xl mx-auto lg:mx-0 mb-16 leading-relaxed font-medium"
                >
                  We create conversion-focused landing pages built to turn paid traffic into leads, booked calls and sales.
                </motion.p>

                <motion.div 
                  custom={3} variants={fadeUp} initial="hidden" animate="visible"
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8"
                >
                  <MagneticCTA text="Get Your Free Landing Page Audit" />
                </motion.div>
              </div>

              {/* Hero Image */}
              <motion.div 
                custom={4} variants={fadeUp} initial="hidden" animate="visible"
                className="relative mt-2 -mb-24 lg:mb-0 lg:mt-0 lg:-translate-x-8 xl:-translate-x-16"
              >
                 <div className="relative flex justify-center items-end group w-full lg:w-[130%] xl:w-[160%] lg:-ml-[15%] xl:-ml-[30%]">
                    <div className="relative inline-block">
                      {/* Yellow Flare Behind Image */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#FFDE21]/20 rounded-full blur-[100px] lg:blur-[140px] z-0 animate-[pulse_6s_ease-in-out_infinite]" />
                      
                      <motion.div
                        variants={{
                           visible: { 
                              y: [0, -15, 0],
                              transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                           }
                        }}
                        className="relative z-10"
                      >
                        <img 
                          src="/hero-image.png" 
                          alt="Ideal Landing Co. Team" 
                          className="w-full max-w-[600px] xl:max-w-[900px] h-auto object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.6)] group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" 
                        />
                      </motion.div>
                      
                      {/* Floating Element over the image */}
                      <div className="absolute bottom-[20%] -left-2 sm:bottom-[25%] sm:left-4 lg:bottom-[30%] lg:left-0 xl:bottom-[35%] xl:left-8 z-30 p-1 sm:p-1.5 rounded-[2rem] sm:rounded-[2.5rem] bg-white/10 border border-white/20 ring-1 ring-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(255,255,255,0.1)] scale-75 sm:scale-100 origin-left animate-[float-flare-sm_8s_ease-in-out_infinite_alternate] sm:animate-[float-flare_6s_ease-in-out_infinite_alternate]">
                        <div className="rounded-[calc(2rem-0.375rem)] sm:rounded-[calc(2.5rem-0.375rem)] bg-white/5 p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                          <div className="relative w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-br from-[#FFDE21] to-yellow-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                             <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-red-500 border border-[#050505]"></span>
                             </span>
                             <span className="font-black text-black text-base sm:text-xl">2</span>
                          </div>
                          <div className="text-left">
                             <p className="text-[8px] sm:text-[10px] text-white/70 uppercase font-black tracking-widest leading-none mb-0.5 sm:mb-1">This month</p>
                             <p className="text-sm sm:text-lg font-black text-white leading-none">Spots Available</p>
                          </div>
                        </div>
                      </div>
                    </div>
                 </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Asymmetrical Bento Grid - Services */}
        <section id="services" className="py-12 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-24">
              <span className="inline-block px-3 py-1 bg-[#FFDE21]/10 text-[#FFDE21] rounded-full text-[10px] font-black uppercase tracking-widest mb-6">What We Deliver</span>
              <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter">One page. One goal. <br/><span className="text-[#FFDE21]">More conversions.</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(250px,auto)]">
              
              {/* Bento Card 1 - Large */}
              <DoubleBezelCard delay={0.1} bentoClass="md:col-span-8 md:row-span-2 group">
                <div className="flex flex-col h-full justify-between">
                  <div className="w-16 h-16 bg-[#FFDE21]/10 rounded-[1.2rem] flex items-center justify-center group-hover:bg-[#FFDE21] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <Palette className="w-8 h-8 text-[#FFDE21] group-hover:text-black transition-colors" />
                  </div>
                  <div className="mt-12">
                    <h3 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">Conversion Strategy & Copy</h3>
                    <p className="text-white/50 text-lg max-w-md">Every section is designed around one clear action. Clear messaging that explains what you offer, who it's for and why they should care — written to convert, not just to look good.</p>
                  </div>
                </div>
              </DoubleBezelCard>

              {/* Bento Card 2 - Small */}
              <DoubleBezelCard delay={0.2} bentoClass="md:col-span-4 md:row-span-1 group">
                <div className="flex flex-col h-full justify-between">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Share2 className="w-5 h-5 text-white/70 group-hover:text-[#FFDE21]" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Custom Design & Development</h3>
                    <p className="text-white/40 text-sm">No generic templates. Your page is designed around your brand, offer and campaign goal — responsive, fast and ready to launch.</p>
                  </div>
                </div>
              </DoubleBezelCard>

              {/* Bento Card 3 - Small */}
              <DoubleBezelCard delay={0.3} bentoClass="md:col-span-4 md:row-span-1 group">
                <div className="flex flex-col h-full justify-between">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Globe className="w-5 h-5 text-white/70 group-hover:text-[#FFDE21]" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Integrations & Launch Support</h3>
                    <p className="text-white/40 text-sm">Forms, calendars, analytics, pixels and your existing tools. We make sure everything works before traffic hits the page.</p>
                  </div>
                </div>
              </DoubleBezelCard>

            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-12 lg:py-32 relative z-10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-20 text-center lg:text-left">
              <span className="inline-block px-3 py-1 bg-[#FFDE21]/10 text-[#FFDE21] rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Our Workflow</span>
              <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter text-white">Our <span className="text-[#FFDE21]">Process</span></h2>
            </div>
            
            <div ref={processScroll.ref} className="flex overflow-x-auto hide-scrollbar gap-6 pb-8 -mx-6 px-6 md:grid md:grid-cols-3 md:pb-0 md:mx-0 md:px-0">
              {[
                {
                  step: "01",
                  title: "Strategy & Discovery",
                  desc: "We understand your offer, audience and conversion goal — so the page is built around what actually drives action."
                },
                {
                  step: "02",
                  title: "Copy & Design",
                  desc: "We build the messaging, page structure and visual design around one clear action. Every word and every section earns its place."
                },
                {
                  step: "03",
                  title: "Build & Launch",
                  desc: "We develop, integrate and test your landing page. Tracking, forms, pixels and go-live — all handled before the first visitor arrives."
                }
              ].map((s, i) => (
                <div key={i} className="shrink-0 w-[85vw] md:w-auto h-full">
                  <DoubleBezelCard delay={0.2 * i} bentoClass="h-full">
                    <div className="text-6xl font-black text-white/5 mb-8 tracking-tighter">{s.step}</div>
                    <h3 className="text-2xl md:text-3xl font-black mb-4 uppercase tracking-tighter">{s.title}</h3>
                    <p className="text-white/50 text-base leading-relaxed">{s.desc}</p>
                  </DoubleBezelCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="work" className="py-12 lg:py-32 relative z-10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-20">
              <span className="inline-block px-3 py-1 bg-white/5 text-white/50 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Selected Work</span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 text-white uppercase tracking-tighter">Built to look good. <br className="md:hidden"/><span className="text-[#FFDE21]">Designed to perform.</span></h2>
              <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-medium">Pages designed around business goals, not just aesthetics.</p>
            </div>
  
            <div ref={portfolioScroll.ref} className="flex overflow-x-auto hide-scrollbar gap-8 pb-8 -mx-6 px-6 md:grid md:grid-cols-3 md:pb-0 md:mx-0 md:px-0">
              {[
                { 
                  label: "Professional Services", 
                  title: "Authority & Positioning", 
                  tag: "WELIS",
                  img: "/portfolio-welis.png",
                  desc: "Visual positioning and authority for a specialist engineer — landing page and content strategy."
                },
                { 
                  label: "Food & Hospitality", 
                  title: "Brand & Campaign Page", 
                  tag: "CHOP'S",
                  img: "/portfolio-chops.jpg",
                  desc: "Impactful and memorable brand built to attract a young urban audience in the food segment."
                },
                { 
                  label: "Beauty & Wellness", 
                  title: "Booking-Focused Design", 
                  tag: "GABI",
                  img: "/portfolio-gabi.png",
                  desc: "Elegant and memorable brand focused on a premium female audience in the beauty market."
                }
              ].map((p, i) => (
                <div key={i} className="shrink-0 w-[85vw] md:w-auto h-full">
                <div
                  className="group flex flex-col rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#050505] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] cursor-pointer h-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:hover:-translate-y-2.5"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/5">
                    <img 
                      src={p.img} 
                      alt={p.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110"
                      draggable={false}
                    />
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 bg-[#FFDE21] text-black rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                        {p.tag}
                      </span>
                      <p className="text-white/40 text-xs font-black uppercase tracking-[0.2em] mb-1">{p.label}</p>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-3">{p.title}</h4>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed font-medium mt-2">
                      {p.desc}
                    </p>
                  </div>
                </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cinematic Testimonial Split */}
        <section id="testimonials" className="py-12 lg:py-32 relative">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
              
              <motion.div 
                initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 1.2, ease: premiumEasing }}
                className="mb-4 lg:mb-0"
              >
                <span className="inline-block px-3 py-1 bg-white/5 text-white/50 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Social Proof</span>
                <h2 className="text-4xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter">The impact on brands that <br className="hidden md:block"/><span className="text-[#FFDE21]">perform.</span></h2>
                <MagneticCTA text="View Our Full Work" primary={false} />
              </motion.div>

              <div className="w-full max-w-xl mx-auto lg:mx-0">
                <div className="relative min-h-[360px] md:min-h-[380px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                      initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                      transition={{ duration: 0.8, ease: premiumEasing }}
                      className="absolute inset-0"
                    >
                      <DoubleBezelCard>
                        <Star className="w-6 h-6 md:w-8 md:h-8 text-[#FFDE21] mb-6 md:mb-8" />
                        <p className="text-base md:text-xl text-white/70 leading-relaxed font-medium mb-8 md:mb-10">"{testimonialsData[activeTestimonial].text}"</p>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center shrink-0">
                             <img src={`/testimonial-${activeTestimonial + 1}.png`} alt={testimonialsData[activeTestimonial].name} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                          </div>
                          <div>
                            <h4 className="font-black text-white uppercase tracking-widest text-xs md:text-sm">{testimonialsData[activeTestimonial].name}</h4>
                            <p className="text-[#FFDE21] text-[9px] md:text-[10px] font-bold tracking-[0.2em] mt-1">{testimonialsData[activeTestimonial].role}</p>
                          </div>
                        </div>
                      </DoubleBezelCard>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Dots Indicator */}
                <div className="flex gap-2 mt-4 justify-center lg:justify-start">
                  {[0, 1, 2].map(i => (
                    <button 
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`h-1.5 rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${activeTestimonial === i ? 'w-8 bg-[#FFDE21]' : 'w-2 bg-white/20'}`}
                      aria-label={`View testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Closing — nested architectural pattern */}
        <section id="planos" className="py-16 lg:py-32">
           <div className="container mx-auto px-4 lg:px-8">
              <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: false }}
                 transition={{ duration: 1.2, ease: premiumEasing }}
                 className="relative p-1.5 rounded-[2rem] lg:rounded-[3rem] bg-gradient-to-b from-[#FFDE21]/20 to-transparent"
              >
                 <div className="absolute inset-0 bg-[#FFDE21]/5 blur-3xl -z-10 rounded-[2rem] lg:rounded-[3rem]" />
                 <div className="rounded-[calc(2rem-0.375rem)] lg:rounded-[calc(3rem-0.375rem)] bg-[#050505] p-8 py-16 md:p-32 text-center relative overflow-hidden flex flex-col items-center">
                    
                    <span className="inline-block px-4 py-2 bg-[#FFDE21]/10 text-[#FFDE21] rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-8 lg:mb-10">
                      Limited Spots
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-8xl font-black mb-8 lg:mb-10 leading-[1.1] md:leading-tight tracking-tighter">
                       You're already paying for traffic. <span className="text-[#FFDE21]">Make the landing page worth the click.</span>
                    </h2>
                    <p className="text-white/40 text-lg md:text-xl max-w-2xl mb-12 lg:mb-16 leading-relaxed">
                       Send us your current landing page and we'll show you exactly what's stopping more visitors from becoming customers.
                    </p>
                    
                    <MagneticCTA text="Get My Free Audit" className="text-base sm:text-xl px-8 sm:px-12 py-4 sm:py-6" />

                 </div>
              </motion.div>
           </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 relative z-10 bg-[#020202]">
        <div className="container mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <LogoPremium />
          <p className="text-white/20 text-xs font-black uppercase tracking-[0.2em]">© {new Date().getFullYear()} Ideal Landing Co. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PremiumLanding;
