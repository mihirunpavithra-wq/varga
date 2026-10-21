import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      aria-label="Hero — VARGA Creative Studio"
    >
      {/* ── Cinematic Video Background ─────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Responsive looping YouTube background video */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vw] h-[160vh] min-w-[100%] min-h-[100%] opacity-45 scale-105 sm:scale-110">
          <iframe
            src="https://www.youtube.com/embed/AQtnBSXYVK8?autoplay=1&mute=1&loop=1&playlist=AQtnBSXYVK8&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
            title="VARGA Cinematic Showreel"
            className="w-full h-full pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>

        {/* Cinematic dark tint & vignette overlay */}
        <div
          className="absolute inset-0 bg-[#080808]/65"
          style={{
            background: `
              radial-gradient(ellipse 90% 80% at 50% 50%, rgba(8, 8, 8, 0.4) 0%, rgba(8, 8, 8, 0.85) 100%),
              linear-gradient(180deg, rgba(8, 8, 8, 0.6) 0%, rgba(8, 8, 8, 0.3) 50%, #080808 100%)
            `,
          }}
          aria-hidden="true"
        />

        {/* Letterbox bars */}
        <div className="absolute top-0 left-0 right-0 h-[2vw] max-h-8 bg-[#080808] z-10" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 h-[2vw] max-h-8 bg-[#080808] z-10" aria-hidden="true" />

        {/* Bottom smooth gradient transition */}
        <div className="absolute inset-0 cinematic-gradient z-20" aria-hidden="true" />
      </div>

      {/* ── VARGA watermark ──────────────────────────────────────── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none select-none flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <img
          src={`${import.meta.env.BASE_URL}varga-logo.png`}
          alt=""
          className="w-[280px] sm:w-[420px] md:w-[580px] opacity-[0.035] filter invert pointer-events-none"
        />
      </motion.div>

      {/* ── Red accent line left ──────────────────────────────────── */}
      <motion.div
        className="absolute left-0 top-1/3 w-[1px] bg-varga-red z-20"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: '20vh' }}
        aria-hidden="true"
      />

      {/* ── Main Content ──────────────────────────────────────────── */}
      <div className="container-varga relative z-30 pb-20 sm:pb-24 md:pb-32 pt-28 sm:pt-32">
        <div className="max-w-4xl">

          {/* Eyebrow label */}
          <motion.p
            className="font-heading text-varga-red text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-4 sm:mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Creative Studio — Sri Lanka
          </motion.p>

          {/* Main headline */}
          <motion.h1
            className="font-display text-varga-white leading-[0.92] sm:leading-[0.9] mb-6 sm:mb-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] tracking-tight sm:tracking-normal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            WE TURN IDEAS<br />
            INTO{' '}
            <span className="text-varga-red">VISUAL</span>
            <br />IMPACT.
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            className="font-body text-varga-muted text-sm sm:text-base md:text-lg max-w-lg leading-relaxed mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            Photography, filmmaking, design, and digital experiences crafted to
            make brands impossible to ignore.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <button onClick={scrollToPortfolio} className="btn-primary w-full sm:w-auto justify-center text-center">
              Explore Our Work
              <ArrowUpRight size={15} />
            </button>
            <button onClick={scrollToContact} className="btn-outline w-full sm:w-auto justify-center text-center">
              Start a Project
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-3 gap-3 sm:gap-8 mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/[0.08]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            {[
              { value: '6+', label: 'Creative Services' },
              { value: '100%', label: 'Original Work' },
              { value: 'SL', label: 'Based in Sri Lanka' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-varga-white text-xl sm:text-2xl md:text-3xl tracking-wide">
                  {stat.value}
                </div>
                <div className="font-heading text-varga-muted text-[9px] sm:text-[11px] md:text-xs tracking-wider sm:tracking-widest uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll hint ───────────────────────────────────────────── */}
      <motion.button
        onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-varga-muted hover:text-varga-white transition-colors group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-label="Scroll down"
      >
        <span className="font-heading text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
