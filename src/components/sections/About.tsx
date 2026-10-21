import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, Stagger, staggerItem } from '@/components/ui/Reveal';

const values = [
  { label: 'Visual-First', desc: 'Every decision starts with how it looks and how it feels.' },
  { label: 'Purpose-Driven', desc: 'Creative work without strategy is just decoration.' },
  { label: 'Honest Craft', desc: 'We are an emerging studio — hungry, focused, and genuinely invested in your work.' },
];

export function About() {
  return (
    <section id="about" className="section-padding overflow-hidden" aria-labelledby="about-heading">
      <div className="container-varga">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Visual Panel */}
          <Reveal direction="left" className="relative order-2 lg:order-1 pt-6 pr-4 sm:pr-0">
            {/* Main visual block */}
            <div className="relative aspect-[4/5] sm:aspect-[3/4] max-w-md mx-auto lg:mx-0 w-full overflow-hidden border border-white/[0.08] shadow-2xl">
              {/* Founder Image */}
              <img
                src={`${import.meta.env.BASE_URL}founder-about.jpg`}
                alt="VARGA Creative Direction"
                className="w-full h-full object-cover object-top"
              />

              {/* Cinematic gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.5) 45%, rgba(8,8,8,0.15) 100%)',
                }}
              />

              {/* Grid of values over image */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 backdrop-blur-[2px]">
                {values.map((v, i) => (
                  <div key={v.label} className={`pb-2.5 sm:pb-3 mb-2.5 sm:mb-3 ${i < values.length - 1 ? 'border-b border-white/[0.08]' : ''}`}>
                    <p className="font-heading text-varga-red text-[10px] tracking-[0.2em] uppercase font-semibold mb-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <p className="font-heading text-varga-white text-xs sm:text-sm font-semibold mb-0.5">{v.label}</p>
                    <p className="font-body text-varga-muted text-[11px] sm:text-xs leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating accent box */}
            <motion.div
              className="absolute -top-3 right-2 sm:-top-6 sm:-right-6 md:-right-10 bg-varga-red p-3 sm:p-6 w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 flex flex-col justify-center shadow-2xl z-20"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <div className="font-display text-white text-2xl sm:text-4xl md:text-5xl leading-none">SL</div>
              <div className="font-heading text-white/80 text-[7px] sm:text-[10px] tracking-widest uppercase mt-0.5 sm:mt-2">Sri Lanka</div>
            </motion.div>
          </Reveal>

          {/* Right — Text */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="font-heading text-varga-red text-xs font-semibold tracking-[0.25em] uppercase mb-4">
                About VARGA
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                id="about-heading"
                className="font-display text-varga-white red-accent"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: '0.95' }}
              >
                CREATIVITY<br />WITH A<br />PURPOSE.
              </h2>
            </Reveal>

            <Reveal delay={0.2} className="mt-10">
              <div className="space-y-5 font-body text-varga-muted leading-relaxed">
                <p>
                  VARGA is a creative studio based in Sri Lanka, built around one belief: that
                  great visual storytelling has the power to transform how a brand is seen, felt,
                  and remembered.
                </p>
                <p>
                  We combine photography, cinematography, design, and emerging technology to
                  produce content that does more than look good — it makes an impression that
                  lasts.
                </p>
                <p>
                  We are an emerging studio: lean, focused, and genuinely invested in every
                  project we take on. We do not pretend to be a large agency — we offer the
                  attention, craft, and honesty that only a small, dedicated team can provide.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3} className="mt-10">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Work With Us
                <ArrowUpRight size={15} />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
