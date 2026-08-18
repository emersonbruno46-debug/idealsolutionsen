import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Palette, Share2, Globe, ArrowRight, Star, Sparkles, Gem,
  Instagram, Linkedin, Twitter, Menu, X
} from "lucide-react";
import { LogoPremium } from "@/components/premium/LogoPremium";
import { ProjectShowcase } from "@/components/premium/ProjectShowcase";

gsap.registerPlugin(ScrollTrigger);

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

const PUBLIC_WHATSAPP_NUMBER = "5538991532617";

const handleContact = () => {
  window.open(`https://wa.me/${PUBLIC_WHATSAPP_NUMBER}?text=Hi!%20I%20found%20Ideal%20Landing%20Co.%20and%20I%27d%20like%20to%20talk%20about%20a%20landing%20page%20project.`, "_blank", "noopener,noreferrer");
};

// Button-in-Button CTA Architecture (Haptic Micro-Aesthetic)
const MagneticCTA = ({ text, className = "", primary = true, onClick }: { text: string, className?: string, primary?: boolean, onClick?: (e: React.MouseEvent) => void }) => (
  <button 
    onClick={onClick || handleContact}
    className={`group relative pl-8 pr-[4.5rem] py-4 rounded-full font-bold tracking-wide active:scale-[0.98] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] ${
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

// Grid Pattern para fundo do bento card
function GridPattern({
  width = 24,
  height = 24,
  x = "-12",
  y = "4",
  squares,
  className,
  ...props
}: React.ComponentProps<"svg"> & { width?: number; height?: number; x?: string; y?: string; squares?: number[][] }) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" className={className} {...props}>
      <defs>
        <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible animate-pulse duration-[3000ms]">
          {squares.map(([sqX, sqY], index) => (
            <rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={sqX * width} y={sqY * height} />
          ))}
        </svg>
      )}
    </svg>
  );
}

// Bento Card Customizado
const BentoCard = ({ 
  children, 
  delay = 0, 
  bentoClass = "", 
  className = "",
  squares 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  bentoClass?: string; 
  className?: string;
  squares?: number[][] ;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.0, delay, ease: premiumEasing }}
      className={`p-1.5 rounded-[2rem] bg-white/5 border border-white/10 ring-1 ring-black/5 group hover:scale-[1.01] transition-transform duration-500 ${bentoClass}`}
    >
      <div className={`relative overflow-hidden h-full rounded-[calc(2rem-0.375rem)] bg-[#050505] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-6 md:p-8 ${className}`}>
        {/* Grid Pattern Background com Máscara Radial */}
        <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-40">
          <GridPattern
            width={24}
            height={24}
            x="-12"
            y="4"
            squares={squares}
            className="fill-[#FFDE21]/10 stroke-white/5 absolute inset-0 h-full w-full mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-between">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

// Mini componentes decorativos para os Bento Cards
const StrategyFlow = () => (
  <div className="flex items-center justify-between gap-2 bg-white/[0.02] border border-white/5 p-4 rounded-2xl w-full max-w-md mx-auto my-4 overflow-x-auto text-[10px] md:text-xs font-mono select-none">
    <div className="flex flex-col items-center gap-1.5 min-w-[60px]">
      <span className="text-white/40 text-[8px]">STEP 01</span>
      <div className="px-2 py-1 bg-[#FFDE21]/15 text-[#FFDE21] border border-[#FFDE21]/30 rounded-lg font-bold">Paid Ad</div>
    </div>
    <span className="text-white/20 shrink-0">→</span>
    <div className="flex flex-col items-center gap-1.5 min-w-[60px]">
      <span className="text-white/40 text-[8px]">STEP 02</span>
      <div className="px-2 py-1 bg-white/5 text-white/80 border border-white/10 rounded-lg">Message</div>
    </div>
    <span className="text-white/20 shrink-0">→</span>
    <div className="flex flex-col items-center gap-1.5 min-w-[80px]">
      <span className="text-white/40 text-[8px]">STEP 03</span>
      <div className="px-2 py-1 bg-white/5 text-white/80 border border-white/10 rounded-lg">Landing Page</div>
    </div>
    <span className="text-[#FFDE21]/50 shrink-0 animate-pulse">→</span>
    <div className="flex flex-col items-center gap-1.5 min-w-[80px]">
      <span className="text-[#FFDE21] text-[8px]">GOAL</span>
      <div className="px-2 py-1 bg-[#FFDE21] text-black rounded-lg font-bold shadow-[0_0_15px_rgba(255,222,33,0.3)]">Conversion</div>
    </div>
  </div>
);

const CopyVisual = () => (
  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl w-full max-w-sm mx-auto my-4 text-left font-sans select-none">
    <div className="w-12 h-1.5 bg-white/10 rounded-full mb-3" />
    <div className="text-sm font-bold text-white mb-2 leading-snug">
      We build <span className="text-[#FFDE21] border-b border-[#FFDE21] pb-0.5">high-converting</span> landing pages.
    </div>
    <div className="space-y-1.5">
      <div className="w-full h-1 bg-white/5 rounded-full" />
      <div className="w-[85%] h-1 bg-white/5 rounded-full" />
    </div>
  </div>
);

const DesignVisual = () => (
  <div className="relative h-28 w-full max-w-xs mx-auto my-4 bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center">
    <div className="absolute top-4 left-6 w-32 h-20 bg-white/5 border border-white/10 rounded-lg shadow-2xl opacity-60 transform -rotate-6 transition-transform group-hover:rotate-0 duration-500" />
    <div className="absolute top-8 right-6 w-16 h-16 bg-[#FFDE21]/10 border border-[#FFDE21]/20 rounded-full flex items-center justify-center transform rotate-12 transition-transform group-hover:-translate-y-1 duration-500">
      <span className="text-[#FFDE21] text-xl font-bold">A</span>
    </div>
    <div className="absolute bottom-4 left-12 w-36 h-12 bg-black border border-white/20 rounded-xl p-2.5 flex items-center gap-2 shadow-2xl transition-transform group-hover:translate-y-[-2px] duration-500">
      <div className="w-6 h-6 bg-[#FFDE21] rounded-lg shrink-0 animate-pulse" />
      <div className="space-y-1 w-full">
        <div className="w-16 h-1.5 bg-white/30 rounded-full" />
        <div className="w-10 h-1 bg-white/15 rounded-full" />
      </div>
    </div>
  </div>
);

const DevVisual = () => (
  <div className="flex items-end justify-center gap-3 h-24 w-full max-w-xs mx-auto my-4 select-none">
    <div className="w-24 h-16 bg-white/[0.02] border border-white/10 rounded-t-lg p-1.5 flex flex-col gap-1 transition-all group-hover:border-white/20 duration-500">
      <div className="flex gap-0.5">
        <div className="w-1 h-1 bg-white/20 rounded-full" />
        <div className="w-1 h-1 bg-white/20 rounded-full" />
      </div>
      <div className="w-full h-full bg-white/5 rounded" />
    </div>
    <div className="w-12 h-20 bg-white/[0.02] border border-white/10 rounded-lg p-1 flex flex-col gap-1 transition-all group-hover:border-white/20 duration-500">
      <div className="w-full h-full bg-white/5 rounded" />
    </div>
    <div className="w-8 h-16 bg-[#FFDE21]/5 border border-[#FFDE21]/20 rounded-md p-0.5 flex flex-col gap-0.5 transition-all group-hover:border-[#FFDE21]/40 duration-500">
      <div className="w-full h-full bg-[#FFDE21]/10 rounded-sm" />
    </div>
  </div>
);

const IntegrationsVisual = () => (
  <div className="flex items-center justify-center gap-3 h-20 w-full max-w-xs mx-auto my-2 select-none relative">
    <div className="w-10 h-10 bg-[#FFDE21]/15 border border-[#FFDE21]/30 rounded-xl flex items-center justify-center text-[#FFDE21] z-10 animate-pulse">
      <span className="text-[10px] font-bold">API</span>
    </div>
    <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/50 z-10 transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-500">
      <span className="text-[9px] font-bold">PX</span>
    </div>
    <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/50 z-10 transform translate-x-1 group-hover:translate-x-0 transition-transform duration-500">
      <span className="text-[9px] font-bold">CRM</span>
    </div>
    <div className="absolute w-24 h-0.5 bg-white/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
  </div>
);

const LaunchVisual = () => (
  <div className="flex items-center justify-center gap-3 bg-[#FFDE21]/5 border border-[#FFDE21]/10 px-4 py-3 rounded-xl w-full max-w-[160px] mx-auto my-4 font-mono text-[10px] select-none">
    <div className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFDE21] opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFDE21]"></span>
    </div>
    <span className="text-[#FFDE21] font-bold tracking-widest uppercase">System Live</span>
  </div>
);

const testimonialsData = [
  { name: "Sarah Mitchell", role: "CEO, Mitchell Aesthetics Clinic", text: "We were running Meta ads and getting clicks but almost no bookings. After Ideal Landing Co. redesigned our landing page around conversions, our cost per booked consultation dropped significantly within the first two weeks." },
  { name: "James Carroll", role: "Founder, Carroll Performance Marketing", text: "As a paid media agency we were always looking for a reliable landing page partner. Ideal Landing Co. delivers fast, the quality is genuinely premium, and our clients notice the difference immediately. They've become our go-to white-label partner." },
  { name: "Daniel Reeves", role: "Owner, Apex Home Services", text: "I was skeptical about investing in a dedicated landing page when I already had a website. But the difference is real. The page they built for our Google Ads campaign converts at a much higher rate than anything we had before." }
];

const processSteps = [
  {
    number: "01",
    title: "STRATEGY",
    desc: "We understand your offer, audience and conversion goal."
  },
  {
    number: "02",
    title: "COPY & STRUCTURE",
    desc: "We build the messaging and page flow around one clear action."
  },
  {
    number: "03",
    title: "DESIGN & BUILD",
    desc: "We turn the strategy into a premium, responsive landing page."
  },
  {
    number: "04",
    title: "LAUNCH",
    desc: "Tracking, integrations, testing and go-live."
  }
];

const pricingPackages = [
  {
    id: "launch",
    name: "LAUNCH",
    price: "690",
    tagline: "Design + Build",
    desc: "Best for businesses that already have their copy and strategy.",
    features: [
      "Custom landing page design",
      "Development",
      "Responsive on all devices",
      "Basic integrations",
      "Client provides the copy"
    ],
    ctaText: "START YOUR PROJECT",
    recommended: false,
    orderClass: "order-2 lg:order-1"
  },
  {
    id: "conversion",
    name: "CONVERSION",
    price: "990",
    tagline: "MOST POPULAR",
    desc: "Best for businesses that want the complete conversion-focused landing page package.",
    features: [
      "Conversion strategy",
      "Conversion-focused copywriting",
      "Custom landing page design",
      "Full development",
      "Mobile responsive",
      "Forms and integrations",
      "Analytics setup",
      "Launch support"
    ],
    ctaText: "BUILD MY LANDING PAGE",
    recommended: true,
    orderClass: "order-1 lg:order-2"
  },
  {
    id: "campaign",
    name: "CAMPAIGN",
    price: "1,490",
    tagline: "Advanced Campaigns",
    desc: "Best for paid traffic campaigns requiring deeper tracking and optimization.",
    features: [
      "Everything in Conversion",
      "Ad-to-page message matching",
      "Advanced tracking setup",
      "Additional page or campaign variation",
      "Post-launch optimization"
    ],
    ctaText: "START MY CAMPAIGN",
    recommended: false,
    orderClass: "order-3 lg:order-3"
  }
];

const PremiumLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  // portfolioScroll removed — replaced by ProjectShowcase component
  const heroRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const auditRef = useRef<HTMLDivElement>(null);

  const handleAuditScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const auditEl = document.getElementById("audit");
    if (auditEl) {
      auditEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [formData, setFormData] = useState({
    landingPageUrl: "",
    hasLandingPage: true,
    primaryGoal: "",
    trafficSource: "",
    name: "",
    company: "",
    notes: ""
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [urlError, setUrlError] = useState("");
  const [nameError, setNameError] = useState("");
  const [companyError, setCompanyError] = useState("");

  const handleNext = () => {
    if (currentStep === 1) {
      if (formData.hasLandingPage) {
        const url = formData.landingPageUrl.trim();
        if (!url) {
          setUrlError("Please enter a valid website URL.");
          return;
        }
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/i;
        if (!urlRegex.test(url)) {
          setUrlError("Please enter a valid website URL.");
          return;
        }
      }
      setUrlError("");
    } else if (currentStep === 2) {
      if (!formData.primaryGoal) return;
    } else if (currentStep === 3) {
      if (!formData.trafficSource) return;
    } else if (currentStep === 4) {
      let valid = true;
      if (!formData.name.trim()) {
        setNameError("Please enter your name.");
        valid = false;
      } else {
        setNameError("");
      }
      if (!formData.company.trim()) {
        setCompanyError("Please enter your company name.");
        valid = false;
      } else {
        setCompanyError("");
      }
      if (!valid) return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  useGSAP(() => {
    if (!heroRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set([
        ".hero-eyebrow",
        ".hero-title-line",
        ".hero-desc",
        ".hero-ctas",
        ".hero-image-container",
        ".hero-floating-badge"
      ], { opacity: 1, y: 0, yPercent: 0 });
      return;
    }
    const isMobile = window.innerWidth < 768;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Eyebrow
    tl.fromTo(
      ".hero-eyebrow",
      { opacity: 0, y: isMobile ? 8 : 15 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    // Title lines
    tl.fromTo(
      ".hero-title-line",
      { opacity: 0, yPercent: isMobile ? 40 : 110 },
      { opacity: 1, yPercent: 0, duration: isMobile ? 0.6 : 0.8, stagger: isMobile ? 0.08 : 0.12 },
      "-=0.3"
    );

    // Desc
    tl.fromTo(
      ".hero-desc",
      { opacity: 0, y: isMobile ? 10 : 20 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.4"
    );

    // CTAs
    tl.fromTo(
      ".hero-ctas",
      { opacity: 0, y: isMobile ? 8 : 15 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.4"
    );

    // Image container
    tl.fromTo(
      ".hero-image-container",
      { opacity: 0, scale: 0.98, y: isMobile ? 10 : 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.9 },
      "-=0.7"
    );

    // Floating Badge
    tl.fromTo(
      ".hero-floating-badge",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5 },
      "-=0.4"
    );
  }, { scope: heroRef });

  useGSAP(() => {
    if (!problemRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set([
        ".problem-eyebrow",
        ".problem-text-traffic",
        ".problem-text-conversion",
        ".vanity-word",
        ".problem-details"
      ], { opacity: 1, y: 0, yPercent: 0, scale: 1 });
      return;
    }

    const mm = gsap.matchMedia();

    // Desktop: Pinned scroll sequence
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: problemRef.current,
          start: "top top",
          end: "+=180%",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // 1. Exibir eyebrow e iniciar "TRAFFIC ISN'T THE PROBLEM"
      tl.to(".problem-eyebrow", { opacity: 1, y: 0, duration: 1 })
        .to(".problem-text-traffic", { opacity: 1, duration: 1 }, "-=0.5")
        
        // 2. Trazer palavras secundárias
        .to(".vanity-word", { opacity: 0.35, scale: 1, duration: 2, stagger: 0.6 }, "-=0.5")
        
        // 3. Diminuir dominância de "TRAFFIC"
        .to(".problem-text-traffic", { opacity: 0.15, duration: 1.5 }, "-=0.5")
        
        // 4. Mostrar "CONVERSION IS"
        .to(".problem-text-conversion", { opacity: 1, y: 0, duration: 2 }, "-=0.8")
        
        // 5. Detalhes finais e "WE FIX THAT"
        .to(".problem-details", { opacity: 1, y: 0, duration: 2.5 }, "-=0.5");
    });

    // Mobile: Normal scroll entry
    mm.add("(max-width: 1023px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: problemRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      tl.to(".problem-eyebrow", { opacity: 1, y: 0, duration: 0.5 })
        .to(".problem-text-traffic", { opacity: 1, duration: 0.5 }, "-=0.3")
        .to(".problem-text-conversion", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
        .to(".problem-details", { opacity: 1, y: 0, duration: 0.8 }, "-=0.3");

      gsap.to(".vanity-word", {
        opacity: 0.25,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: problemRef.current,
          start: "top 60%"
        }
      });
    });

    return () => {
      mm.revert();
    };
  }, { scope: problemRef });

  useGSAP(() => {
    if (!processRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(".process-progress-line", { scaleY: 1 });
      gsap.set(".process-step-bullet", {
        backgroundColor: "#FFDE21",
        borderColor: "#FFDE21",
        color: "#000000"
      });
      gsap.set(".process-step-content h3", { color: "#ffffff" });
      gsap.set(".process-step-content p", { color: "rgba(255,255,255,0.7)" });
      return;
    }

    const mm = gsap.matchMedia();

    // Desktop Animation: Pinned timeline scroll sequence
    mm.add("(min-width: 1024px)", () => {
      const bullets = gsap.utils.toArray(".process-step-bullet");
      const titles = gsap.utils.toArray(".process-step-content h3");
      const descs = gsap.utils.toArray(".process-step-content p");

      // Set initial desktop states (first is active, others are muted)
      gsap.set(bullets, { backgroundColor: "#050505", borderColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)", scale: 1.0 });
      gsap.set(titles, { color: "rgba(255,255,255,0.2)" });
      gsap.set(descs, { color: "rgba(255,255,255,0.1)" });
      
      gsap.set(bullets[0], { backgroundColor: "#FFDE21", borderColor: "#FFDE21", color: "#000000", scale: 1.1 });
      gsap.set(titles[0], { color: "#ffffff" });
      gsap.set(descs[0], { color: "rgba(255,255,255,0.7)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: processRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1
        }
      });

      // Animate progress line scale
      tl.to(".process-progress-line", { scaleY: 1, ease: "none", duration: 3 });

      // Step 1 -> Completed, Step 2 -> Active
      tl.to(bullets[0], { backgroundColor: "#050505", borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.6)", scale: 1.0, duration: 0.3 }, 0.7)
        .to(titles[0], { color: "rgba(255,255,255,0.6)", duration: 0.3 }, 0.7)
        .to(descs[0], { color: "rgba(255,255,255,0.4)", duration: 0.3 }, 0.7)
        .to(bullets[1], { backgroundColor: "#FFDE21", borderColor: "#FFDE21", color: "#000000", scale: 1.1, duration: 0.3 }, 1.0)
        .to(titles[1], { color: "#ffffff", duration: 0.3 }, 1.0)
        .to(descs[1], { color: "rgba(255,255,255,0.7)", duration: 0.3 }, 1.0);

      // Step 2 -> Completed, Step 3 -> Active
      tl.to(bullets[1], { backgroundColor: "#050505", borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.6)", scale: 1.0, duration: 0.3 }, 1.7)
        .to(titles[1], { color: "rgba(255,255,255,0.6)", duration: 0.3 }, 1.7)
        .to(descs[1], { color: "rgba(255,255,255,0.4)", duration: 0.3 }, 1.7)
        .to(bullets[2], { backgroundColor: "#FFDE21", borderColor: "#FFDE21", color: "#000000", scale: 1.1, duration: 0.3 }, 2.0)
        .to(titles[2], { color: "#ffffff", duration: 0.3 }, 2.0)
        .to(descs[2], { color: "rgba(255,255,255,0.7)", duration: 0.3 }, 2.0);

      // Step 3 -> Completed, Step 4 -> Active
      tl.to(bullets[2], { backgroundColor: "#050505", borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.6)", scale: 1.0, duration: 0.3 }, 2.7)
        .to(titles[2], { color: "rgba(255,255,255,0.6)", duration: 0.3 }, 2.7)
        .to(descs[2], { color: "rgba(255,255,255,0.4)", duration: 0.3 }, 2.7)
        .to(bullets[3], { backgroundColor: "#FFDE21", borderColor: "#FFDE21", color: "#000000", scale: 1.1, duration: 0.3 }, 3.0)
        .to(titles[3], { color: "#ffffff", duration: 0.3 }, 3.0)
        .to(descs[3], { color: "rgba(255,255,255,0.7)", duration: 0.3 }, 3.0);
    });

    // Mobile Animation: Normal scroll entry
    mm.add("(max-width: 1023px)", () => {
      const bullets = gsap.utils.toArray(".process-step-bullet");
      const titles = gsap.utils.toArray(".process-step-content h3");
      const descs = gsap.utils.toArray(".process-step-content p");

      // Mobile style is fully visible, but with a reveal and progress line
      gsap.set(bullets, { backgroundColor: "#050505", borderColor: "#FFDE21", color: "#FFDE21" });
      gsap.set(titles, { color: "#ffffff" });
      gsap.set(descs, { color: "rgba(255,255,255,0.6)" });

      gsap.fromTo(".process-step",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(".process-progress-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-timeline-container",
            start: "top 70%",
            end: "bottom 70%",
            scrub: 0.5
          }
        }
      );
    });

    return () => {
      mm.revert();
    };
  }, { scope: processRef });

  useGSAP(() => {
    if (!pricingRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(".pricing-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pricingRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: pricingRef });

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
            <button onClick={handleAuditScroll} className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-[#FFDE21] hover:text-black border border-white/10 text-xs font-bold uppercase tracking-widest transition-all duration-500">
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
                 <MagneticCTA text="Get a Free Audit" onClick={(e) => { setIsMenuOpen(false); handleAuditScroll(e); }} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-28 pb-12">
        
        {/* Hero Z-Axis Cascade & Massive Typography */}
        <section ref={heroRef} className="min-h-[90dvh] flex items-center justify-center pt-8 pb-0 lg:pt-12 lg:pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-2 lg:gap-20 items-center">
              
              <div className="relative z-10 text-center lg:text-left">
                <div className="hero-eyebrow inline-block px-3 py-1 bg-[#FFDE21]/10 text-[#FFDE21] rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                  CONVERSION-FOCUSED LANDING PAGES
                </div>

                <h1 className="hero-title text-4xl sm:text-6xl md:text-8xl font-black mb-8 md:mb-10 leading-[1.1] md:leading-[0.85] tracking-tighter mt-4 md:mt-0">
                  <span className="hero-title-line-wrapper block overflow-hidden">
                    <span className="hero-title-line block">
                      Your ads are getting clicks.
                    </span>
                  </span>
                  <span className="hero-title-line-wrapper block overflow-hidden">
                    <span className="hero-title-line block text-[#FFDE21] drop-shadow-[0_0_80px_rgba(255,222,33,0.3)]">
                      Your page should get customers.
                    </span>
                  </span>
                </h1>

                <p className="hero-desc text-lg md:text-2xl text-white/50 max-w-2xl mx-auto lg:mx-0 mb-16 leading-relaxed font-medium">
                  We create conversion-focused landing pages built to turn paid traffic into leads, booked calls and sales.
                </p>

                <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                  <MagneticCTA text="Get Your Free Landing Page Audit" onClick={handleAuditScroll} />
                </div>
              </div>

              {/* Hero Image */}
              <div className="hero-image-container relative mt-2 -mb-24 lg:mb-0 lg:mt-0 lg:-translate-x-8 xl:-translate-x-16">
                 <div className="relative flex justify-center items-end group w-full lg:w-[130%] xl:w-[160%] lg:-ml-[15%] xl:-ml-[30%]">
                    <div className="relative inline-block">
                      {/* Yellow Flare Behind Image */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#FFDE21]/20 rounded-full blur-[100px] lg:blur-[140px] z-0 animate-[pulse_6s_ease-in-out_infinite]" />
                      
                      <motion.div
                        animate={{ 
                           y: [0, -15, 0]
                        }}
                        transition={{ 
                           duration: 6, 
                           repeat: Infinity, 
                           ease: "easeInOut" 
                        }}
                        className="relative z-10 hero-image-loop"
                      >
                        <img 
                          src="/hero-image.png" 
                          alt="Ideal Landing Co. Team" 
                          className="w-full max-w-[600px] xl:max-w-[900px] h-auto object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.6)] group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" 
                        />
                      </motion.div>
                      
                      {/* Floating Element over the image */}
                      <div className="hero-floating-badge absolute bottom-[20%] -left-2 sm:bottom-[25%] sm:left-4 lg:bottom-[30%] lg:left-0 xl:bottom-[35%] xl:left-8 z-30 p-1 sm:p-1.5 rounded-[2rem] sm:rounded-[2.5rem] bg-white/10 border border-white/20 ring-1 ring-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(255,255,255,0.1)] scale-75 sm:scale-100 origin-left animate-[float-flare-sm_8s_ease-in-out_infinite_alternate] sm:animate-[float-flare_6s_ease-in-out_infinite_alternate]">
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
              </div>

            </div>
          </div>
        </section>

        {/* Asymmetrical Bento Grid - Services */}
        <section id="services" className="py-8 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-12">
              <span className="inline-block px-3 py-1 bg-[#FFDE21]/10 text-[#FFDE21] rounded-full text-[10px] font-black uppercase tracking-widest mb-6">What We Deliver</span>
              <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter">One page. One goal. <br/><span className="text-[#FFDE21]">More conversions.</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Card 1 - Conversion Strategy (Largest) */}
              <BentoCard delay={0.1} bentoClass="md:col-span-8" squares={[[1, 0], [4, 1], [7, 2]]}>
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between h-full">
                  <div className="flex flex-col justify-between h-full max-w-md">
                    <div className="w-12 h-12 bg-[#FFDE21]/10 rounded-xl flex items-center justify-center text-[#FFDE21] mb-6">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black mb-3 uppercase tracking-tighter">Conversion Strategy</h3>
                      <p className="text-white/50 text-sm leading-relaxed">Every section is designed around one clear action. We align user behavior with your campaign goals to eliminate friction points.</p>
                    </div>
                  </div>
                  <div className="w-full md:w-auto shrink-0">
                    <StrategyFlow />
                  </div>
                </div>
              </BentoCard>

              {/* Card 2 - Conversion Copy (Medium) */}
              <BentoCard delay={0.2} bentoClass="md:col-span-4" squares={[[2, 1], [3, 0]]}>
                <div className="flex flex-col justify-between h-full">
                  <div className="w-12 h-12 bg-[#FFDE21]/10 rounded-xl flex items-center justify-center text-[#FFDE21] mb-6">
                    <Gem className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Conversion Copy</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">Clear messaging that explains what you offer, who it's for and why they should care.</p>
                    <CopyVisual />
                  </div>
                </div>
              </BentoCard>

              {/* Card 3 - Custom Design (Large) */}
              <BentoCard delay={0.3} bentoClass="md:col-span-7" squares={[[0, 2], [3, 1], [5, 0]]}>
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between h-full">
                  <div className="flex flex-col justify-between h-full max-w-xs">
                    <div className="w-12 h-12 bg-[#FFDE21]/10 rounded-xl flex items-center justify-center text-[#FFDE21] mb-6">
                      <Palette className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-black mb-3 uppercase tracking-tight">Custom Design</h3>
                      <p className="text-white/50 text-sm leading-relaxed">No generic templates. Your page is designed around your brand guidelines and your specific conversion goals.</p>
                    </div>
                  </div>
                  <div className="w-full md:w-auto shrink-0">
                    <DesignVisual />
                  </div>
                </div>
              </BentoCard>

              {/* Card 4 - Development (Medium) */}
              <BentoCard delay={0.4} bentoClass="md:col-span-5" squares={[[1, 1], [4, 2]]}>
                <div className="flex flex-col justify-between h-full">
                  <div className="w-12 h-12 bg-[#FFDE21]/10 rounded-xl flex items-center justify-center text-[#FFDE21] mb-6">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Development</h3>
                    <p className="text-white/50 text-sm leading-relaxed">Responsive, lightning-fast and ready to launch. Clean code optimized for maximum conversion performance.</p>
                    <DevVisual />
                  </div>
                </div>
              </BentoCard>

              {/* Card 5 - Integrations (Smaller) */}
              <BentoCard delay={0.5} bentoClass="md:col-span-6" squares={[[2, 0], [4, 1]]}>
                <div className="flex flex-col justify-between h-full">
                  <div className="w-12 h-12 bg-[#FFDE21]/10 rounded-xl flex items-center justify-center text-[#FFDE21] mb-6">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Integrations</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">Forms, calendars, analytics, tracking pixels and your existing CRM tools seamlessly connected.</p>
                    <IntegrationsVisual />
                  </div>
                </div>
              </BentoCard>

              {/* Card 6 - Launch Support (Smaller) */}
              <BentoCard delay={0.6} bentoClass="md:col-span-6" squares={[[1, 2], [3, 0]]}>
                <div className="flex flex-col justify-between h-full">
                  <div className="w-12 h-12 bg-[#FFDE21]/10 rounded-xl flex items-center justify-center text-[#FFDE21] mb-6">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Launch Support</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">We perform rigorous QA and make sure everything is technically sound before paid traffic hits the page.</p>
                    <LaunchVisual />
                  </div>
                </div>
              </BentoCard>

            </div>
          </div>
        </section>

        {/* Storytelling Problem Section */}
        <section ref={problemRef} id="problem-section" className="relative bg-[#050505] overflow-hidden lg:h-[200vh] z-20">
          <div className="problem-container min-h-screen flex flex-col justify-center items-center px-4 lg:px-8 max-w-5xl mx-auto py-20 lg:py-0 relative">
            
            {/* Eyebrow */}
            <span className="problem-eyebrow inline-block px-3 py-1 bg-[#FFDE21]/10 text-[#FFDE21] rounded-full text-[10px] font-black uppercase tracking-widest mb-8 opacity-0 lg:translate-y-4 z-10">
              THE REAL PROBLEM
            </span>
            
            {/* Headline */}
            <div className="relative text-center w-full z-10 mb-8 md:mb-12">
              <h2 className="problem-title text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
                <span className="problem-text-traffic block text-white/90">
                  TRAFFIC ISN'T THE PROBLEM.
                </span>
                <span className="problem-text-conversion block text-[#FFDE21] drop-shadow-[0_0_80px_rgba(255,222,33,0.3)] mt-4 opacity-0 lg:translate-y-4">
                  CONVERSION IS.
                </span>
              </h2>
            </div>

            {/* Secondary floating background vanity words */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
              <span className="vanity-word absolute text-4xl md:text-8xl font-black text-white/10 border border-white/5 px-4 py-2 rounded-xl top-[15%] left-[2%] lg:left-[5%] uppercase tracking-widest opacity-0 lg:scale-95">
                CLICKS
              </span>
              <span className="vanity-word absolute text-4xl md:text-8xl font-black text-white/10 border border-white/5 px-4 py-2 rounded-xl top-[48%] right-[2%] lg:right-[5%] uppercase tracking-widest opacity-0 lg:scale-95">
                VISITORS
              </span>
              <span className="vanity-word absolute text-5xl md:text-9xl font-black text-white/10 border border-white/5 px-4 py-2 rounded-xl bottom-[18%] left-[5%] lg:left-[8%] uppercase tracking-widest opacity-0 lg:scale-95">
                TRAFFIC
              </span>
            </div>

            {/* Supporting copy & end statement */}
            <div className="problem-details relative text-center max-w-2xl mx-auto mt-6 flex flex-col items-center gap-6 opacity-0 lg:translate-y-8 z-10">
              <p className="text-lg md:text-2xl text-white/60 leading-relaxed font-medium">
                Getting people to click your ad is only half the job.
              </p>
              <p className="text-base md:text-xl text-white/40 leading-relaxed font-normal">
                If your landing page is slow, unclear or generic, you're paying for visitors who never become customers.
              </p>
              <div className="problem-fix text-2xl md:text-4xl font-black text-[#FFDE21] uppercase tracking-widest mt-8 border-b-2 border-[#FFDE21] pb-2">
                WE FIX THAT.
              </div>
            </div>

          </div>
        </section>

        {/* Process Section */}
        <section ref={processRef} id="process" className="py-20 lg:py-0 min-h-screen lg:h-screen lg:flex lg:items-center relative z-10 bg-[#050505] overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full">
              
              {/* Left Column: Heading */}
              <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
                <span className="text-[#FFDE21] text-xs font-black uppercase tracking-[0.2em] block process-eyebrow">
                  OUR PROCESS
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-white process-heading">
                  FROM IDEA<br />
                  TO LIVE PAGE.
                </h2>
              </div>

              {/* Right Column: Editorial Timeline */}
              <div className="lg:col-span-7 relative pl-8 lg:pl-16 process-timeline-container text-left">
                {/* Progress line */}
                <div className="absolute left-[16px] lg:left-[24px] top-[16px] lg:top-[24px] bottom-[16px] lg:bottom-[24px] w-[2px] bg-white/10 rounded-full">
                  <div className="process-progress-line absolute top-0 left-0 w-full bg-[#FFDE21] origin-top scale-y-0 h-full rounded-full" />
                </div>

                {/* Steps */}
                <div className="space-y-12 lg:space-y-16">
                  {processSteps.map((step, idx) => (
                    <div key={idx} className="process-step relative flex gap-6 lg:gap-10 items-start">
                      {/* Bullet */}
                      <div className="process-step-bullet flex-shrink-0 w-8 h-8 lg:w-12 lg:h-12 rounded-full border bg-[#050505] border-white/10 flex items-center justify-center text-xs lg:text-sm font-bold z-10 text-white/40 transition-colors duration-500">
                        {step.number}
                      </div>

                      {/* Content */}
                      <div className="process-step-content flex-grow pt-1 lg:pt-2 space-y-2">
                        <h3 className="text-xl lg:text-3xl font-black uppercase tracking-tighter text-white/30 transition-colors duration-500">
                          {step.title}
                        </h3>
                        <p className="text-white/20 text-sm lg:text-lg leading-relaxed font-medium transition-colors duration-500 max-w-xl">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Portfolio Section — ProjectShowcase */}
        <ProjectShowcase />

        {/* Cinematic Testimonial Split */}
        <section id="testimonials" className="py-8 lg:py-20 relative">
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

        {/* Pricing Section */}
        <section ref={pricingRef} id="pricing" className="py-20 lg:py-32 relative z-10 bg-[#050505] border-t border-white/5">
          <div className="container mx-auto px-4 lg:px-8">
            
            {/* Section Header */}
            <div className="mb-16 lg:mb-24 text-center max-w-3xl mx-auto space-y-4">
              <span className="text-[#FFDE21] text-xs font-black uppercase tracking-[0.2em] block">
                PRICING
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-white">
                Simple, transparent pricing.
              </h2>
              <p className="text-white/40 text-base sm:text-lg leading-relaxed font-medium">
                Choose the level of support that fits your project.
              </p>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
              {pricingPackages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className={`pricing-card flex flex-col justify-between rounded-[2rem] p-8 lg:p-10 relative transition-all duration-500 hover:scale-[1.01] ${pkg.orderClass} ${
                    pkg.recommended 
                      ? "bg-white/[0.04] border-2 border-[#FFDE21]/80 shadow-[0_0_40px_rgba(255,222,33,0.15)]" 
                      : "bg-white/[0.01] border border-white/10"
                  }`}
                >
                  {/* Badge for Recommended */}
                  {pkg.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFDE21] text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-[0_4px_20px_rgba(255,222,33,0.3)]">
                      {pkg.tagline}
                    </div>
                  )}

                  {/* Top content */}
                  <div>
                    {/* Header */}
                    <div className="mb-6">
                      <span className="text-[10px] font-black tracking-widest text-[#FFDE21]/70 uppercase block mb-2">
                        {pkg.recommended ? "RECOMMENDED" : pkg.tagline}
                      </span>
                      <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                        {pkg.name}
                      </h3>
                      <p className="text-white/40 text-xs mt-2 leading-relaxed font-medium min-h-[32px]">
                        {pkg.desc}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="border-y border-white/5 py-6 my-6 flex flex-col items-start justify-center">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl lg:text-6xl font-black text-white tracking-tighter">
                          ${pkg.price}
                        </span>
                      </div>
                      <span className="text-[9px] font-black tracking-widest text-white/30 uppercase mt-2">
                        ONE-TIME PROJECT
                      </span>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start text-xs sm:text-sm text-white/70 font-medium">
                          {/* Check Icon */}
                          <svg className="w-4 h-4 text-[#FFDE21] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={handleContact}
                    className={`w-full group font-bold tracking-wider text-xs py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 ${
                      pkg.recommended
                        ? "bg-[#FFDE21] text-black shadow-[0_0_20px_rgba(255,222,33,0.2)] hover:shadow-[0_0_30px_rgba(255,222,33,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Trust Banner / Microcopy */}
            <div className="mt-16 lg:mt-24 text-center max-w-2xl mx-auto space-y-6 border-t border-white/5 pt-12">
              <p className="text-white/60 text-base sm:text-lg leading-relaxed font-medium">
                Not sure which option fits your project?
              </p>
              <p className="text-white/40 text-sm leading-relaxed font-normal -mt-4">
                Get a free landing page audit and we'll help you identify what you actually need.
              </p>
              <button 
                onClick={handleAuditScroll}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#FFDE21] hover:text-white transition-colors duration-300 border-b border-[#FFDE21] hover:border-white pb-1"
              >
                GET A FREE AUDIT →
              </button>
            </div>

          </div>
        </section>

        {/* Free Landing Page Audit Section */}
        <section ref={auditRef} id="audit" className="py-20 lg:py-32 relative z-10 bg-[#050505] border-t border-white/5 overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start w-full">
              
              {/* Left Column: Intro */}
              <div className="lg:col-span-5 space-y-6 text-center lg:text-left lg:sticky lg:top-36">
                <span className="text-[#FFDE21] text-xs font-black uppercase tracking-[0.2em] block">
                  FREE LANDING PAGE AUDIT
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none text-white">
                  Let's find out what's costing you conversions.
                </h2>
                <p className="text-white/40 text-base leading-relaxed font-medium">
                  Answer a few quick questions and we'll review your landing page for opportunities to improve clarity, conversion and performance.
                </p>
              </div>

              {/* Right Column: Multi-step Form */}
              <div className="lg:col-span-7 bg-white/[0.01] border border-white/10 rounded-[2rem] p-6 sm:p-8 lg:p-10 relative text-left">
                
                {/* Step indicators */}
                {currentStep <= 4 && (
                  <div className="flex items-center justify-between max-w-md mx-auto mb-10 select-none">
                    {[
                      { number: "01", label: "Page" },
                      { number: "02", label: "Goal" },
                      { number: "03", label: "Traffic" },
                      { number: "04", label: "Contact" }
                    ].map((step, idx) => (
                      <React.Fragment key={idx}>
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                            currentStep === idx + 1
                              ? "border-[#FFDE21] text-[#FFDE21] bg-[#FFDE21]/10 font-black scale-105"
                              : currentStep > idx + 1
                              ? "border-[#FFDE21] text-black bg-[#FFDE21]"
                              : "border-white/10 text-white/30 bg-transparent"
                          }`}>
                            {step.number}
                          </div>
                        </div>
                        {idx < 3 && (
                          <div className={`flex-grow h-[2px] mx-2 sm:mx-4 transition-colors duration-300 ${
                            currentStep > idx + 1 ? "bg-[#FFDE21]" : "bg-white/10"
                          }`} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* Form Steps */}
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: Landing Page URL */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                          What's your current landing page?
                        </h3>
                        <p className="text-white/50 text-xs sm:text-sm font-medium">
                          Share the page you'd like us to review.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="landingPageUrl" className="text-xs font-bold uppercase tracking-wider text-white/40 block">
                            Website / Landing Page URL
                          </label>
                          <input
                            type="text"
                            id="landingPageUrl"
                            disabled={!formData.hasLandingPage}
                            placeholder="https://yourwebsite.com"
                            value={formData.landingPageUrl}
                            onChange={(e) => {
                              setFormData(prev => ({ ...prev, landingPageUrl: e.target.value }));
                              setUrlError("");
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && formData.hasLandingPage) {
                                e.preventDefault();
                                handleNext();
                              }
                            }}
                            className={`w-full h-14 px-4 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:outline-none transition-all duration-300 font-medium ${
                              urlError 
                                ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
                                : !formData.hasLandingPage
                                ? "border-white/5 opacity-30 select-none"
                                : "border-white/10 focus:border-[#FFDE21] focus:ring-1 focus:ring-[#FFDE21]"
                            }`}
                          />
                          {urlError && (
                            <p className="text-red-500 text-xs font-semibold mt-1">
                              {urlError}
                            </p>
                          )}
                        </div>

                        {/* Checkbox option */}
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              hasLandingPage: !prev.hasLandingPage,
                              landingPageUrl: !prev.hasLandingPage ? "" : prev.landingPageUrl
                            }));
                            setUrlError("");
                          }}
                          className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 ${
                            !formData.hasLandingPage
                              ? "border-[#FFDE21] bg-[#FFDE21]/5 text-white"
                              : "border-white/10 bg-transparent text-white/50 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          <span className="text-xs sm:text-sm font-semibold">I don't have a landing page yet</span>
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                            !formData.hasLandingPage ? "border-[#FFDE21] bg-[#FFDE21]" : "border-white/20 bg-transparent"
                          }`}>
                            {!formData.hasLandingPage && (
                              <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </button>
                      </div>

                      {/* Primary CTA */}
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-full bg-[#FFDE21] text-black font-bold uppercase tracking-wider text-xs py-4 rounded-full flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                      >
                        <span>CONTINUE</span>
                        <span>→</span>
                      </button>
                    </motion.div>
                  )}

                  {/* STEP 2: Primary Goal */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                          What do you want more of?
                        </h3>
                        <p className="text-white/50 text-xs sm:text-sm font-medium">
                          Choose the primary result you want your landing page to generate.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {["Leads", "Booked Calls", "Sales", "Purchases", "Other"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, primaryGoal: opt }));
                            }}
                            className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 ${
                              formData.primaryGoal === opt
                                ? "border-[#FFDE21] bg-[#FFDE21]/5 text-white shadow-[0_0_15px_rgba(255,222,33,0.1)]"
                                : "border-white/10 bg-transparent text-white/50 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            <span className="text-xs sm:text-sm font-semibold">{opt}</span>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                              formData.primaryGoal === opt ? "border-[#FFDE21] bg-[#FFDE21]" : "border-white/20 bg-transparent"
                            }`}>
                              {formData.primaryGoal === opt && (
                                <div className="w-2 h-2 rounded-full bg-black" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Navigation buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="w-full sm:w-1/3 bg-transparent border border-white/10 hover:bg-white/5 text-white font-bold uppercase tracking-wider text-xs py-4 rounded-full transition-all duration-300"
                        >
                          ← BACK
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          disabled={!formData.primaryGoal}
                          className={`w-full sm:w-2/3 font-bold uppercase tracking-wider text-xs py-4 rounded-full flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ${
                            formData.primaryGoal 
                              ? "bg-[#FFDE21] text-black" 
                              : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
                          }`}
                        >
                          <span>CONTINUE</span>
                          <span>→</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Traffic Source */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                          Where does most of your traffic come from?
                        </h3>
                        <p className="text-white/50 text-xs sm:text-sm font-medium">
                          Choose the main source currently sending visitors to your business.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          "Google Ads", "Meta Ads", "Organic Search", 
                          "Social Media", "Not running traffic yet", "Other"
                        ].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, trafficSource: opt }));
                            }}
                            className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 ${
                              formData.trafficSource === opt
                                ? "border-[#FFDE21] bg-[#FFDE21]/5 text-white shadow-[0_0_15px_rgba(255,222,33,0.1)]"
                                : "border-white/10 bg-transparent text-white/50 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            <span className="text-xs sm:text-sm font-semibold">{opt}</span>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                              formData.trafficSource === opt ? "border-[#FFDE21] bg-[#FFDE21]" : "border-white/20 bg-transparent"
                            }`}>
                              {formData.trafficSource === opt && (
                                <div className="w-2 h-2 rounded-full bg-black" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Navigation buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="w-full sm:w-1/3 bg-transparent border border-white/10 hover:bg-white/5 text-white font-bold uppercase tracking-wider text-xs py-4 rounded-full transition-all duration-300"
                        >
                          ← BACK
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          disabled={!formData.trafficSource}
                          className={`w-full sm:w-2/3 font-bold uppercase tracking-wider text-xs py-4 rounded-full flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ${
                            formData.trafficSource 
                              ? "bg-[#FFDE21] text-black" 
                              : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
                          }`}
                        >
                          <span>CONTINUE</span>
                          <span>→</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Contact Context */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                          Tell us who we're talking to.
                        </h3>
                        <p className="text-white/50 text-xs sm:text-sm font-medium">
                          Let us know your context so we can tailor the audit.
                        </p>
                      </div>

                      <div className="space-y-4">
                        
                        {/* Name field */}
                        <div className="space-y-2">
                          <label htmlFor="clientName" className="text-xs font-bold uppercase tracking-wider text-white/40 block">
                            Name
                          </label>
                          <input
                            type="text"
                            id="clientName"
                            placeholder="John Smith"
                            value={formData.name}
                            onChange={(e) => {
                              setFormData(prev => ({ ...prev, name: e.target.value }));
                              setNameError("");
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleNext();
                              }
                            }}
                            className={`w-full h-14 px-4 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:outline-none transition-all duration-300 font-medium ${
                              nameError ? "border-red-500/80 focus:border-red-500" : "border-white/10 focus:border-[#FFDE21]"
                            }`}
                          />
                          {nameError && (
                            <p className="text-red-500 text-xs font-semibold mt-1">
                              {nameError}
                            </p>
                          )}
                        </div>

                        {/* Company field */}
                        <div className="space-y-2">
                          <label htmlFor="companyName" className="text-xs font-bold uppercase tracking-wider text-white/40 block">
                            Company / Business Name
                          </label>
                          <input
                            type="text"
                            id="companyName"
                            placeholder="Smith Dental"
                            value={formData.company}
                            onChange={(e) => {
                              setFormData(prev => ({ ...prev, company: e.target.value }));
                              setCompanyError("");
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleNext();
                              }
                            }}
                            className={`w-full h-14 px-4 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:outline-none transition-all duration-300 font-medium ${
                              companyError ? "border-red-500/80 focus:border-red-500" : "border-white/10 focus:border-[#FFDE21]"
                            }`}
                          />
                          {companyError && (
                            <p className="text-red-500 text-xs font-semibold mt-1">
                              {companyError}
                            </p>
                          )}
                        </div>

                        {/* Notes field */}
                        <div className="space-y-2">
                          <label htmlFor="auditNotes" className="text-xs font-bold uppercase tracking-wider text-white/40 block">
                            Anything we should know? <span className="text-white/20 lowercase font-medium">(optional)</span>
                          </label>
                          <textarea
                            id="auditNotes"
                            placeholder="Tell us anything that could help us understand your landing page or campaign."
                            value={formData.notes}
                            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                            rows={3}
                            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#FFDE21] transition-all duration-300 font-medium resize-y"
                          />
                        </div>

                      </div>

                      {/* Navigation buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="w-full sm:w-1/3 bg-transparent border border-white/10 hover:bg-white/5 text-white font-bold uppercase tracking-wider text-xs py-4 rounded-full transition-all duration-300"
                        >
                          ← BACK
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          className="w-full sm:w-2/3 bg-[#FFDE21] text-black font-bold uppercase tracking-wider text-xs py-4 rounded-full flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                        >
                          <span>REVIEW MY ANSWERS</span>
                          <span>→</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5: Final Summary Screen */}
                  {currentStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <span className="text-[#FFDE21] text-[10px] font-black uppercase tracking-[0.2em] block">
                          YOUR AUDIT REQUEST IS READY
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                          Let's take this to WhatsApp.
                        </h3>
                        <p className="text-white/50 text-xs sm:text-sm font-medium">
                          We've organized your answers into a message. Send it to our team and we'll take it from there.
                        </p>
                      </div>

                      {/* Polished Summary Panel */}
                      <div className="border border-white/10 rounded-2xl bg-white/[0.02] p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-white/5">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1">
                              LANDING PAGE
                            </span>
                            <span className="text-white font-semibold break-all">
                              {formData.hasLandingPage ? formData.landingPageUrl : "Not created yet"}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1">
                              MAIN GOAL
                            </span>
                            <span className="text-white font-semibold">
                              {formData.primaryGoal}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-white/5">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1">
                              TRAFFIC SOURCE
                            </span>
                            <span className="text-white font-semibold">
                              {formData.trafficSource}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1">
                              NAME
                            </span>
                            <span className="text-white font-semibold">
                              {formData.name}
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1">
                            COMPANY
                          </span>
                          <span className="text-white font-semibold">
                            {formData.company}
                          </span>
                        </div>

                        {formData.notes.trim() && (
                          <div className="pt-4 border-t border-white/5">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1">
                              ADDITIONAL CONTEXT
                            </span>
                            <p className="text-white/70 font-medium whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto pr-2">
                              {formData.notes}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Edit option */}
                      <div className="text-center sm:text-left">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="text-xs font-black uppercase tracking-[0.2em] text-[#FFDE21] hover:text-white transition-colors duration-300 border-b border-[#FFDE21]/40 hover:border-white pb-0.5"
                        >
                          EDIT MY ANSWERS
                        </button>
                      </div>

                      {/* Primary WhatsApp CTA & reassurance */}
                      <div className="space-y-4 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            const message = `Hi! I found Ideal Landing Co. and I'd like to request a free landing page audit.

Name: ${formData.name.trim()}
Company: ${formData.company.trim()}
Current landing page: ${formData.hasLandingPage ? formData.landingPageUrl.trim() : "I don't have one yet"}
Main goal: ${formData.primaryGoal}
Traffic source: ${formData.trafficSource}${formData.notes.trim() ? `

Additional context:
${formData.notes.trim()}` : ""}

I'd like to know what could be improved to increase conversions.`;

                            const encodedMessage = encodeURIComponent(message);
                            const url = `https://wa.me/${PUBLIC_WHATSAPP_NUMBER}?text=${encodedMessage}`;
                            window.open(url, "_blank", "noopener,noreferrer");
                          }}
                          className="w-full bg-[#FFDE21] text-black font-bold uppercase tracking-wider text-xs py-4 rounded-full flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(255,222,33,0.2)] hover:shadow-[0_0_40px_rgba(255,222,33,0.3)] transition-all duration-300"
                        >
                          <span>SEND MY REQUEST ON WHATSAPP</span>
                          <span>→</span>
                        </button>
                        
                        <div className="text-center text-[10px] sm:text-xs text-white/30 space-y-1 font-medium select-none">
                          <p>Your answers will be included automatically.</p>
                          <p>You'll be able to review the message before sending it.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

              </div>

            </div>
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
