import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { processSteps } from '@/data/content';
import { Reveal } from '@/components/ui/Reveal';

function ProcessStep({
  step,
  index,
}: {
  step: (typeof processSteps)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="process-step relative pl-10 sm:pl-12 py-6 sm:py-8 group"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Vertical connector line */}
      {index < processSteps.length - 1 && (
        <motion.div
          className="absolute left-[11px] top-14 sm:top-16 w-[1px] bg-white/[0.08]"
          style={{ height: 'calc(100% - 1.5rem)' }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.4 }}
          aria-hidden="true"
        />
      )}

      {/* Step dot */}
      <div className="absolute left-0 top-7 sm:top-9 flex items-center justify-center">
        <motion.div
          className="w-6 h-6 border border-varga-red/40 group-hover:border-varga-red transition-colors duration-300"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.2, type: 'spring', stiffness: 200 }}
        >
          <div className="w-full h-full bg-varga-red/20 group-hover:bg-varga-red/40 transition-colors duration-300" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Large bg number */}
        <div className="process-number select-none text-6xl sm:text-7xl md:text-8xl opacity-70" aria-hidden="true">
          {step.number}
        </div>

        <div className="relative z-10 pt-1 sm:pt-2">
          <p className="font-heading text-varga-red text-[10px] tracking-[0.2em] uppercase font-semibold mb-1 sm:mb-2">
            Step {step.number}
          </p>
          <h3 className="font-display text-varga-white text-2xl sm:text-3xl md:text-4xl tracking-wide mb-2 sm:mb-3 group-hover:text-varga-red transition-colors duration-300">
            {step.title}
          </h3>
          <p className="font-body text-varga-muted text-xs sm:text-sm leading-relaxed max-w-sm">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Process() {
  return (
    <section className="section-padding bg-[#0d0d0d]" aria-labelledby="process-heading">
      <div className="container-varga">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Heading */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <p className="font-heading text-varga-red text-xs font-semibold tracking-[0.25em] uppercase mb-4">
                How We Work
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                id="process-heading"
                className="font-display text-varga-white red-accent"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: '0.95' }}
              >
                OUR CREATIVE<br />PROCESS
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="mt-8">
              <p className="font-body text-varga-muted leading-relaxed max-w-sm">
                A straightforward, transparent process designed to keep every project on vision,
                on schedule, and beyond expectation.
              </p>
            </Reveal>

            {/* Decorative element */}
            <Reveal delay={0.3} className="mt-12">
              <div
                className="relative overflow-hidden"
                style={{
                  width: '100%',
                  maxWidth: '280px',
                  height: '1px',
                  background: 'linear-gradient(to right, var(--varga-red), transparent)',
                }}
              />
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { n: '4', l: 'Clear Steps' },
                  { n: '∞', l: 'Revisions Until Right' },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-display text-varga-white text-3xl">{s.n}</div>
                    <div className="font-heading text-varga-muted text-xs tracking-widest uppercase mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — Steps */}
          <div className="relative">
            {processSteps.map((step, i) => (
              <ProcessStep key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
