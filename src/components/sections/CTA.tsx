import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export function CTA() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-32 md:py-40"
      aria-labelledby="cta-heading"
    >
      {/* Cinematic BG */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 50%, rgba(192, 57, 43, 0.07) 0%, transparent 70%),
            linear-gradient(180deg, #080808 0%, #0f0808 50%, #080808 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Horizontal rule top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" aria-hidden="true" />

      {/* Large BG text */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-display text-white/[0.025]"
          style={{ fontSize: 'clamp(8rem, 20vw, 20rem)', lineHeight: 1 }}
        >
          LET'S GO
        </span>
      </div>

      <div className="container-varga relative z-10 text-center">
        <Reveal>
          <p className="font-heading text-varga-red text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-4 sm:mb-6">
            Ready to Begin
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            id="cta-heading"
            className="font-display text-varga-white mx-auto text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95]"
          >
            HAVE AN IDEA?<br />
            LET'S MAKE IT{' '}
            <span className="text-varga-red">REAL.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2} className="mt-6 sm:mt-8">
          <p className="font-body text-varga-muted text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed px-2">
            From a single promotional video to a complete visual identity — let's create
            something worth remembering.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-8 sm:mt-12 flex justify-center px-4 sm:px-0">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary text-xs sm:text-sm py-3.5 sm:py-4 px-6 sm:px-8 w-full sm:w-auto justify-center active:scale-[0.98] touch-manipulation"
          >
            Start Your Project
            <ArrowUpRight size={16} />
          </button>
        </Reveal>

        {/* Decorative lines */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-px bg-varga-red/30"
          style={{ height: '60%' }}
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-px bg-varga-red/30"
          style={{ height: '60%' }}
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        />
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" aria-hidden="true" />
    </section>
  );
}
