import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects, ProjectData } from "@/data/projects";

const premiumEasing = [0.32, 0.72, 0, 1] as const;

const imageVariants = {
  enter: { opacity: 0, y: 24, scale: 0.98 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -16, scale: 0.99 },
};

const textVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// ─── Desktop Project Preview ─────────────────────────────────
const ProjectPreview = ({ project }: { project: ProjectData }) => {
  const [hoverImg, setHoverImg] = useState<number | null>(null);
  const displayImg = hoverImg !== null ? project.sectionImages[hoverImg] : project.coverImage;

  return (
    <div className="relative w-full h-full flex flex-col gap-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={displayImg}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.65, ease: premiumEasing }}
          className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.6)] bg-[#0a0a0a]"
          style={{ aspectRatio: "16/10" }}
        >
          <img
            src={displayImg}
            alt={`${project.name} — ${hoverImg !== null ? `Section ${hoverImg + 1}` : "cover"}`}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3 items-center">
        <button
          onClick={() => setHoverImg(null)}
          className={`relative flex-shrink-0 overflow-hidden rounded-lg border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDE21] ${
            hoverImg === null
              ? "border-[#FFDE21] shadow-[0_0_12px_rgba(255,222,33,0.25)]"
              : "border-white/10 opacity-60 hover:opacity-100"
          }`}
          style={{ width: 72, height: 48 }}
          aria-label={`Show ${project.name} cover image`}
        >
          <img src={project.coverImage} alt={`${project.name} Cover`} className="w-full h-full object-cover object-top" loading="lazy" />
        </button>

        {project.sectionImages.map((src, i) => (
          <button
            key={src}
            onClick={() => setHoverImg(i)}
            className={`relative flex-shrink-0 overflow-hidden rounded-lg border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDE21] ${
              hoverImg === i
                ? "border-[#FFDE21] shadow-[0_0_12px_rgba(255,222,33,0.25)]"
                : "border-white/10 opacity-60 hover:opacity-100"
            }`}
            style={{ width: 72, height: 48 }}
            aria-label={`Show ${project.name} section ${i + 1}`}
          >
            <img src={src} alt={`${project.name} Section ${i + 1}`} className="w-full h-full object-cover object-top" loading="lazy" />
          </button>
        ))}

        <div
          className="relative flex-shrink-0 overflow-hidden rounded-lg border border-white/10 opacity-60"
          style={{ width: 28, height: 48 }}
        >
          <img src={project.mobileImage} alt={`${project.name} Mobile view`} className="w-full h-full object-cover object-top" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

// ─── Desktop: Single project view ───────────────────────────
const DesktopShowcase = () => {
  const [active, setActive] = useState(0);
  const project = projects[active];
  const goTo = useCallback((idx: number) => { setActive(idx); }, []);

  return (
    <div className="hidden lg:grid grid-cols-[1fr_1.4fr] gap-16 xl:gap-24 items-start min-h-[640px]">
      <div className="flex flex-col justify-between h-full py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id + "-meta"}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: premiumEasing }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#FFDE21] font-black text-sm tracking-[0.25em] tabular-nums">
                {project.number}
              </span>
              <div className="flex gap-1 items-center">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDE21] rounded"
                    aria-label={`Go to project ${i + 1}`}
                  >
                    <span className={`block h-1 transition-all duration-500 rounded-full ${
                      i === active ? "w-8 bg-[#FFDE21]" : "w-4 bg-white/40 hover:bg-white/70"
                    }`} />
                  </button>
                ))}
              </div>
              <span className="text-white/70 text-sm tracking-widest font-medium">
                / {String(projects.length).padStart(2, "0")}
              </span>
            </div>

            <p className="text-[#FFDE21] text-[11px] font-black uppercase tracking-[0.3em] mb-4">
              {project.category}
            </p>

            <div className="mb-4">
              {project.nameLines.map((line, i) => (
                <h3
                  key={i}
                  className="text-5xl xl:text-7xl font-black uppercase tracking-tighter leading-none text-white block"
                >
                  {line}
                </h3>
              ))}
            </div>

            <p className="text-white/70 text-xs font-black uppercase tracking-[0.2em] mb-4">
              {project.projectType}
            </p>

            <p className="text-white/80 text-base leading-relaxed mb-6 max-w-sm font-medium">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.services.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[11px] font-bold uppercase tracking-[0.15em]"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-wrap items-center gap-4">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFDE21] text-black text-sm font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(255,222,33,0.4)] transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDE21] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              View Live Site
              <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <span className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-black uppercase tracking-widest cursor-default">
              View Case Study
              <ArrowUpRight className="w-4 h-4" />
            </span>
          )}
        </div>

        <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goTo(i)}
              className={`text-left transition-all duration-400 p-1.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDE21] ${
                i === active ? "opacity-100" : "opacity-60 hover:opacity-100"
              }`}
              aria-label={`Select ${p.name}`}
            >
              <span className="block text-[10px] font-black text-[#FFDE21] tracking-widest mb-0.5">
                {p.number}
              </span>
              <span className="block text-xs font-bold text-white uppercase tracking-tight">
                {p.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={project.id + "-preview"}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: premiumEasing }}
          className="w-full"
        >
          <ProjectPreview project={project} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── Mobile: Vertical editorial list ────────────────────────
const MobileShowcase = () => (
  <div className="lg:hidden flex flex-col gap-16">
    {projects.map((p, idx) => (
      <div key={p.id} className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[#FFDE21] font-black text-sm tracking-[0.25em]">{p.number}</span>
          <span className="text-white/70 text-[10px] font-black uppercase tracking-[0.25em]">{p.category}</span>
        </div>

        <div>
          {p.nameLines.map((line, i) => (
            <h3 key={i} className="text-4xl font-black uppercase tracking-tighter leading-none text-white block">
              {line}
            </h3>
          ))}
        </div>

        <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">{p.projectType}</p>

        <div
          className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
          style={{ aspectRatio: "16/10" }}
        >
          <img
            src={p.coverImage}
            alt={p.name}
            className="w-full h-full object-cover object-top"
            loading={idx === 0 ? "eager" : "lazy"}
          />
        </div>

        <p className="text-white/80 text-sm leading-relaxed font-medium">{p.description}</p>

        <div className="flex flex-wrap gap-2">
          {p.services.map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[10px] font-bold uppercase tracking-[0.15em]"
            >
              {s}
            </span>
          ))}
        </div>

        {p.liveUrl ? (
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFDE21] text-black text-xs font-black uppercase tracking-widest focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDE21] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
          >
            View Live Site
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <div className="self-start flex items-center gap-2 text-white/60 text-xs font-black uppercase tracking-widest">
            View Case Study
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        )}

        {idx < projects.length - 1 && <div className="border-t border-white/10 mt-2" />}
      </div>
    ))}
  </div>
);

// ─── Main export ─────────────────────────────────────────────
export const ProjectShowcase: React.FC = () => {
  return (
    <section id="work" className="relative py-12 lg:py-16 bg-[#050505] z-10">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.1, ease: premiumEasing }}
          className="mb-10 lg:mb-12"
        >
          <span className="inline-block px-3 py-1 bg-[#FFDE21]/10 text-[#FFDE21] rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            Selected Work
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-white mb-4">
            Built to look good.{" "}
            <span className="text-[#FFDE21]">Designed to perform.</span>
          </h2>
          <p className="text-white/70 text-lg max-w-xl font-medium">
            Pages designed around business goals, not just aesthetics.
          </p>
        </motion.div>

        <DesktopShowcase />
        <MobileShowcase />
      </div>
    </section>
  );
};

export default ProjectShowcase;
