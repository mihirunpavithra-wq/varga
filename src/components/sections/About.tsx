import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Instagram } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { founderInfo, contactInfo } from '@/data/content';

export function About() {
  return (
    <section id="about" className="section-padding overflow-hidden bg-[#080808]" aria-labelledby="about-heading">
      <div className="container-varga">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Creator Visual Panel */}
          <Reveal direction="left" className="relative order-2 lg:order-1 pt-4 sm:pt-6 pr-2 sm:pr-0">
            {/* Visual Frame */}
            <div className="relative aspect-[4/5] sm:aspect-[3/4] max-w-md mx-auto lg:mx-0 w-full overflow-hidden border border-white/[0.1] rounded-sm shadow-2xl bg-[#111111] group">
              {/* Founder Image */}
              <img
                src={`${import.meta.env.BASE_URL}founder-about.jpg`}
                alt="Matheesha Mihisara — Founder & Creative Mind behind VARGA"
                className="w-full h-full object-cover object-top filter brightness-[0.95] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Cinematic Vignette Overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.5) 45%, rgba(8,8,8,0.1) 100%)',
                }}
              />

              {/* Creator Card over bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 backdrop-blur-[3px] bg-gradient-to-t from-[#080808] to-transparent">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-varga-red animate-pulse" />
                  <p className="font-heading text-varga-red text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold">
                    Creator &amp; Visionary
                  </p>
                </div>

                <h3 className="font-display text-varga-white text-2xl sm:text-3xl tracking-wide leading-tight mb-1">
                  Matheesha Mihisara
                </h3>
                <p className="font-heading text-varga-muted text-xs tracking-wider uppercase mb-3">
                  Creative Mind behind VARGA
                </p>

                {/* Core Disciplines Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {founderInfo.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="font-heading text-[10px] tracking-wider uppercase text-white/80 bg-white/[0.08] border border-white/[0.1] px-2.5 py-0.5 rounded-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Origin Stamp */}
            <motion.div
              className="absolute -top-3 right-1 sm:-top-5 sm:-right-4 md:-right-6 bg-varga-red p-3 sm:p-5 w-20 h-20 sm:w-28 sm:h-28 flex flex-col justify-center shadow-2xl z-20 rounded-sm"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <div className="font-display text-white text-2xl sm:text-4xl leading-none">SL</div>
              <div className="font-heading text-white/90 text-[7px] sm:text-[9px] tracking-widest uppercase mt-0.5 sm:mt-1">
                Sri Lanka
              </div>
            </motion.div>
          </Reveal>

          {/* Right — Story & Bio */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Sparkles size={14} className="text-varga-red" />
                <p className="font-heading text-varga-red text-xs font-semibold tracking-[0.25em] uppercase">
                  About The Creator
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                id="about-heading"
                className="font-display text-varga-white red-accent leading-[0.95]"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5.2rem)' }}
              >
                THE CREATIVE MIND<br />BEHIND <span className="text-varga-red">VARGA.</span>
              </h2>
            </Reveal>

            {/* Introduction highlight */}
            <Reveal delay={0.15} className="mt-8">
              <div className="bg-white/[0.03] border-l-2 border-varga-red p-4 sm:p-5 rounded-r-sm">
                <p className="font-heading text-varga-white text-base sm:text-lg font-medium leading-relaxed">
                  &ldquo;Hi, I&apos;m <span className="text-varga-red font-semibold">Matheesha Mihisara</span>, the creative mind behind VARGA.&rdquo;
                </p>
              </div>
            </Reveal>

            {/* Story Paragraphs */}
            <Reveal delay={0.2} className="mt-6">
              <div className="space-y-4 font-body text-varga-muted text-sm sm:text-base leading-relaxed">
                <p>
                  I&apos;m a passionate creative enthusiast interested in graphic design, photography,
                  cinematography, video editing, filmmaking, and digital content creation. I love turning
                  ideas into powerful visual experiences through creativity, technology, and storytelling.
                </p>
                <p>
                  My vision is to create unique designs, build memorable brand identities, and produce
                  cinematic content that inspires people. I&apos;m constantly exploring new creative techniques,
                  AI-powered tools, and digital technologies to expand my skills and bring imaginative ideas to life.
                </p>
                <p>
                  <strong className="text-varga-white font-medium">VARGA</strong> is more than just a brand —
                  it&apos;s my creative identity, representing my passion, vision, and ambition to make a
                  mark in the creative industry.
                </p>
                <p>
                  I&apos;m on a journey to transform my creativity into meaningful work, collaborate with
                  inspiring people, and build a brand that stands out through originality and innovation.
                </p>
              </div>
            </Reveal>

            {/* Creator Motto Banner */}
            <Reveal delay={0.25} className="mt-7">
              <div className="border border-white/[0.08] bg-[#101010] p-4 sm:p-5 rounded-sm">
                <p className="font-heading text-varga-red text-[10px] tracking-[0.25em] uppercase font-semibold mb-1">
                  Creative Philosophy
                </p>
                <p className="font-display text-varga-white text-xl sm:text-2xl md:text-3xl tracking-wide">
                  Think creatively. Create differently. Make it memorable.
                </p>
              </div>
            </Reveal>

            {/* Action Buttons */}
            <Reveal delay={0.3} className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary justify-center py-3.5 px-6 text-xs tracking-wider uppercase active:scale-95 touch-manipulation"
              >
                Work With Matheesha
                <ArrowUpRight size={15} />
              </button>

              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline justify-center gap-2 py-3.5 px-5 text-xs font-heading font-semibold tracking-wider uppercase active:scale-95 touch-manipulation"
                aria-label="Follow Matheesha Mihisara on Instagram"
              >
                <Instagram size={15} />
                <span>Follow @matheesha.sk</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
