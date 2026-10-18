import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { projects, type Project, type ProjectCategory } from '@/data/content';
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
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="project-card group cursor-pointer aspect-[4/5] md:aspect-[3/4]"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View project: ${project.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* Background: Real photo or fallback gradient */}
      {project.image ? (
        <div className="absolute inset-0 overflow-hidden">
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

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Demo badge */}
      {project.isDemo && (
        <div className="absolute top-3 right-3 z-20 bg-[#080808]/80 border border-white/10 px-2 py-1 text-[10px] font-heading tracking-widest uppercase text-varga-muted">
          Demo
        </div>
      )}

      {/* Hover overlay — visible by default with subtle gradient on mobile, stronger on hover */}
      <div className="card-overlay opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

      {/* Category badge — always visible */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
        <span className="font-heading text-[10px] font-semibold tracking-[0.2em] uppercase text-varga-red bg-[#080808]/70 px-2 py-0.5 border border-varga-red/30">
          {project.category}
        </span>
      </div>

      {/* Info — always visible on mobile, reveal on hover on desktop */}
      <div className="card-info z-10 opacity-100 md:opacity-0 group-hover:opacity-100 transform-none md:translate-y-2 group-hover:translate-y-0 transition-all duration-300 p-4 sm:p-5">
        <p className="font-heading text-varga-muted text-[10px] tracking-widest uppercase mb-1">
          {project.year}
        </p>
        <h3 className="font-display text-varga-white text-xl sm:text-2xl tracking-wide mb-1 sm:mb-2 line-clamp-1">
          {project.title}
        </h3>
        <p className="font-body text-varga-muted text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>
        <div className="flex items-center gap-1.5 text-varga-red">
          <span className="font-heading text-[11px] font-semibold tracking-widest uppercase">View Project</span>
          <ArrowUpRight size={13} />
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const bg = project.placeholder ? (placeholderPatterns[project.placeholder] ?? { background: '#1a1a1a' }) : { background: '#111111' };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-[#080808]/90 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-3xl bg-[#111111] border border-white/[0.06] overflow-hidden max-h-[92vh] md:max-h-[85vh] rounded-t-xl md:rounded-none flex flex-col"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Image area */}
          <div className="relative aspect-[16/9] sm:aspect-video overflow-hidden flex-shrink-0 bg-[#080808]" style={bg}>
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center"
              />
            ) : null}
            <div className="absolute inset-0 cinematic-gradient pointer-events-none" />
            {project.isDemo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-white/10 text-4xl sm:text-6xl tracking-widest">
                  DEMO
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 md:p-8 overflow-y-auto">
            <div className="flex items-start justify-between gap-4 mb-4 sm:mb-6">
              <div>
                <p className="font-heading text-varga-red text-[10px] tracking-[0.2em] uppercase font-semibold mb-1 sm:mb-2">
                  {project.category} · {project.year}
                </p>
                <h2 className="font-display text-varga-white text-2xl sm:text-3xl md:text-4xl tracking-wide">
                  {project.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 text-varga-muted hover:text-varga-white transition-colors p-2 -mr-2 -mt-2 touch-manipulation"
                aria-label="Close project"
              >
                <X size={22} />
              </button>
            </div>

            <p className="font-body text-varga-muted leading-relaxed mb-6">
              {project.fullDescription}
            </p>

            {project.isDemo && (
              <p className="font-body text-varga-muted/60 text-sm italic mb-6 border-l-2 border-varga-red/30 pl-4">
                This is a demo project. Real client work will be featured here as VARGA grows.
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-heading text-[11px] tracking-widest uppercase text-varga-muted border border-white/[0.08] px-3 py-1"
                >
                  {tag}
                </span>
              ))}
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
        <Reveal className="mb-12 md:mb-16">
          <p className="font-heading text-varga-red text-xs font-semibold tracking-[0.25em] uppercase mb-4">
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

        {/* Category Filters */}
        <Reveal delay={0.1} className="mb-8 md:mb-14 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap hide-scrollbar"
            role="tablist"
            aria-label="Filter by category"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={active === cat}
                onClick={() => setActive(cat)}
                className={`font-heading text-[11px] sm:text-xs font-semibold tracking-wider sm:tracking-widest uppercase px-3.5 sm:px-4 py-2 border whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  active === cat
                    ? 'bg-varga-red border-varga-red text-varga-white'
                    : 'border-white/[0.12] text-varga-muted hover:border-white/30 hover:text-varga-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
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

        {/* CTA */}
        <Stagger baseDelay={0.1} className="mt-12 text-center">
          <motion.p variants={staggerItem} className="font-body text-varga-muted mb-2">
            More projects coming soon as VARGA grows.
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
