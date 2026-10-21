import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, MessageCircle } from 'lucide-react';
import { projects, type Project, type ProjectCategory, contactInfo } from '@/data/content';
import { Reveal, Stagger, staggerItem } from '@/components/ui/Reveal';

const ALL = 'All';
const categories: (typeof ALL | ProjectCategory)[] = [
  ALL,
  'Cinematography',
  'Commercial Videos',
  'Photography',
  'Brand Identity',
  'Digital Content',
  'AI & Experimental',
];

// Placeholder image backgrounds keyed by project
const placeholderPatterns: Record<string, React.CSSProperties> = {
  '#1a1a2e': { background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' },
  '#2d1b1b': { background: 'linear-gradient(135deg, #2d1b1b 0%, #4a1515 50%, #1a0a0a 100%)' },
  '#1c1a2e': { background: 'linear-gradient(135deg, #1c1a2e 0%, #2d1b69 50%, #1a0a2e 100%)' },
  '#111111': { background: 'linear-gradient(135deg, #111111 0%, #222222 50%, #0a0a0a 100%)' },
  '#1a2d1a': { background: 'linear-gradient(135deg, #1a2d1a 0%, #0d3b1e 50%, #0a1a0a 100%)' },
  '#0d1b2a': { background: 'linear-gradient(135deg, #0d1b2a 0%, #1b2838 50%, #0a1428 100%)' },
};

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const bg = project.placeholder ? (placeholderPatterns[project.placeholder] ?? { background: '#1a1a1a' }) : { background: '#111111' };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="project-card group cursor-pointer aspect-[4/5] md:aspect-[3/4] rounded-sm border border-white/[0.08] overflow-hidden select-none touch-manipulation"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View project: ${project.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* Background: Real photo or fallback gradient */}
      {project.image ? (
        <div className="absolute inset-0 overflow-hidden bg-[#080808]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-placeholder transition-transform duration-700 group-hover:scale-105" style={bg} />
      )}

      {/* Film grain / Noise texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Demo badge */}
      {project.isDemo && (
        <div className="absolute top-3 right-3 z-20 bg-[#080808]/85 border border-white/10 px-2 py-0.5 text-[10px] font-heading tracking-widest uppercase text-varga-muted backdrop-blur-sm rounded-sm">
          Demo
        </div>
      )}

      {/* Dark gradient for mobile readability (always active on mobile, hover-enhanced on desktop) */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#080808]/95 via-[#080808]/50 to-transparent opacity-85 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Category badge */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
        <span className="font-heading text-[10px] font-semibold tracking-[0.2em] uppercase text-varga-red bg-[#080808]/85 backdrop-blur-sm px-2.5 py-1 border border-varga-red/40 rounded-sm">
          {project.category}
        </span>
      </div>

      {/* Info: always visible on mobile, reveal on hover on desktop */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-5 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-300">
        <p className="font-heading text-varga-muted text-[10px] tracking-widest uppercase mb-1">
          {project.year}
        </p>
        <h3 className="font-display text-varga-white text-xl sm:text-2xl tracking-wide mb-1 sm:mb-1.5 line-clamp-1 group-hover:text-varga-red transition-colors">
          {project.title}
        </h3>
        <p className="font-body text-varga-muted text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>
        <div className="flex items-center gap-1.5 text-varga-red">
          <span className="font-heading text-[11px] font-semibold tracking-widest uppercase">View Details</span>
          <ArrowUpRight size={13} />
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const bg = project.placeholder ? (placeholderPatterns[project.placeholder] ?? { background: '#1a1a1a' }) : { background: '#111111' };

  const whatsappInquiryUrl = `${contactInfo.whatsappLink}?text=${encodeURIComponent(
    `Hello VARGA! I'm interested in discussing a project similar to "${project.title}" (${project.category}).`
  )}`;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-[#080808]/90 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal Window */}
        <motion.div
          className="relative w-full max-w-3xl bg-[#111111] border border-white/10 overflow-hidden max-h-[92vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-lg flex flex-col shadow-2xl z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top Bar for Mobile Close Handle */}
          <div className="sm:hidden w-12 h-1 bg-white/20 rounded-full mx-auto my-2.5 flex-shrink-0" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 bg-[#080808]/80 hover:bg-[#080808] text-varga-muted hover:text-varga-white border border-white/10 p-2 sm:p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90 touch-manipulation"
            aria-label="Close project modal"
          >
            <X size={18} />
          </button>

          {/* Image area */}
          <div className="relative aspect-[16/10] sm:aspect-video overflow-hidden flex-shrink-0 bg-[#080808]" style={bg}>
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center"
              />
            ) : null}
            <div className="absolute inset-0 cinematic-gradient pointer-events-none" />
            {project.isDemo && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-display text-white/10 text-4xl sm:text-6xl tracking-widest">
                  DEMO
                </span>
              </div>
            )}
          </div>

          {/* Scrollable Content */}
          <div className="p-5 sm:p-6 md:p-8 overflow-y-auto space-y-5">
            <div>
              <p className="font-heading text-varga-red text-[11px] tracking-[0.2em] uppercase font-semibold mb-1 sm:mb-2">
                {project.category} · {project.year}
              </p>
              <h2 className="font-display text-varga-white text-2xl sm:text-3xl md:text-4xl tracking-wide leading-tight">
                {project.title}
              </h2>
            </div>

            <p className="font-body text-varga-muted text-sm sm:text-base leading-relaxed">
              {project.fullDescription}
            </p>

            {project.isDemo && (
              <p className="font-body text-varga-muted/60 text-xs sm:text-sm italic border-l-2 border-varga-red/40 pl-4 py-0.5">
                This is a demo showcase project. Real client work will be featured here as VARGA continues to grow.
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-heading text-[10px] sm:text-[11px] tracking-wider uppercase text-varga-muted bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Direct WhatsApp Action inside Modal */}
            <div className="pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center py-3.5 text-xs tracking-wider uppercase active:scale-98 touch-manipulation w-full"
              >
                <MessageCircle size={16} />
                Discuss Similar Project on WhatsApp
              </a>
              <button
                onClick={onClose}
                className="btn-outline justify-center py-3.5 text-xs tracking-wider uppercase active:scale-98 touch-manipulation sm:w-auto"
              >
                Back to Gallery
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Portfolio() {
  const [active, setActive] = useState<typeof ALL | ProjectCategory>(ALL);
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = active === ALL ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="section-padding" aria-labelledby="portfolio-heading">
      <div className="container-varga">
        {/* Heading */}
        <Reveal className="mb-10 sm:mb-14">
          <p className="font-heading text-varga-red text-xs font-semibold tracking-[0.25em] uppercase mb-3 sm:mb-4">
            Featured Work
          </p>
          <h2
            id="portfolio-heading"
            className="font-display text-varga-white red-accent"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: '0.95' }}
          >
            OUR PORTFOLIO
          </h2>
        </Reveal>

        {/* Category Filters — Smooth Horizontal Scroll on Mobile */}
        <Reveal delay={0.1} className="mb-8 md:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-0 sm:flex-wrap hide-scrollbar scroll-smooth"
            role="tablist"
            aria-label="Filter by category"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={active === cat}
                onClick={() => setActive(cat)}
                className={`font-heading text-[11px] sm:text-xs font-semibold tracking-wider sm:tracking-widest uppercase px-3.5 sm:px-4 py-2 border rounded-sm whitespace-nowrap transition-all duration-200 flex-shrink-0 touch-manipulation active:scale-95 ${
                  active === cat
                    ? 'bg-varga-red border-varga-red text-varga-white shadow-[0_4px_16px_rgba(192,57,43,0.35)]'
                    : 'border-white/[0.12] bg-white/[0.02] text-varga-muted hover:border-white/30 hover:text-varga-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Portfolio Cards Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelected(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA note */}
        <Stagger baseDelay={0.1} className="mt-12 text-center">
          <motion.p variants={staggerItem} className="font-body text-varga-muted text-xs sm:text-sm">
            More cinematic visuals &amp; client campaigns coming soon as VARGA grows.
          </motion.p>
        </Stagger>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
