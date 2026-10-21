import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { services, contactInfo } from '@/data/content';
import { Reveal, Stagger, staggerItem } from '@/components/ui/Reveal';

export function Services() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="services" className="section-padding bg-[#0d0d0d]" aria-labelledby="services-heading">
      {/* Marquee band */}
      <div className="overflow-hidden border-y border-white/[0.05] py-3 sm:py-4 mb-14 sm:mb-20" aria-hidden="true">
        <div className="marquee-track">
          {Array(4).fill(
            ['Cinematography', 'Photography', 'Branding', 'Video Editing', 'Social Media', 'AI Visuals']
          ).flat().map((label, i) => (
            <span key={i} className="font-display text-white/[0.07] text-3xl sm:text-5xl tracking-widest mx-4 sm:mx-8 whitespace-nowrap">
              {label} ·
            </span>
          ))}
        </div>
      </div>

      <div className="container-varga">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-20">
          <Reveal>
            <p className="font-heading text-varga-red text-xs font-semibold tracking-[0.25em] uppercase mb-3 sm:mb-4">
              What We Do
            </p>
            <h2
              id="services-heading"
              className="font-display text-varga-white red-accent"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: '0.95' }}
            >
              OUR SERVICES
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex items-end">
            <p className="font-body text-varga-muted text-sm sm:text-base leading-relaxed max-w-sm">
              From a single product photo to a complete cinematic brand campaign — every service
              is built around your story and your audience.
            </p>
          </Reveal>
        </div>

        {/* Services Grid */}
        <Stagger staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-px sm:bg-white/[0.05]">
          {services.map((service) => {
            const whatsappServiceUrl = `${contactInfo.whatsappLink}?text=${encodeURIComponent(
              `Hello VARGA! I would like to enquire about your "${service.title}" services.`
            )}`;

            return (
              <motion.div
                key={service.id}
                variants={staggerItem}
                className="relative bg-[#101010] sm:bg-[#0d0d0d] p-6 sm:p-8 rounded-sm sm:rounded-none border border-white/[0.08] sm:border-none group cursor-default"
                onMouseEnter={() => setHovered(service.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Desktop hover background */}
                <motion.div
                  className="absolute inset-0 bg-varga-red/[0.04] pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hovered === service.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Top line indicator */}
                <motion.div
                  className="absolute top-0 left-0 h-[2px] bg-varga-red"
                  initial={{ width: 0 }}
                  animate={{ width: hovered === service.id ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Icon */}
                    <div className="text-3xl sm:text-4xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 w-fit">
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-varga-white font-semibold text-base sm:text-lg mb-2 sm:mb-3 leading-tight group-hover:text-varga-red transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-varga-muted text-xs sm:text-sm leading-relaxed mb-5">
                      {service.description}
                    </p>

                    {/* Deliverables */}
                    <ul className="space-y-1.5 mb-6">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-varga-red flex-shrink-0" aria-hidden="true" />
                          <span className="font-body text-varga-muted text-xs">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions for mobile & desktop */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <button
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex items-center gap-1 text-varga-white hover:text-varga-red font-heading text-xs font-semibold tracking-wider uppercase transition-colors duration-200 touch-manipulation active:scale-95"
                    >
                      Enquire <ArrowUpRight size={13} />
                    </button>

                    <a
                      href={whatsappServiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-heading text-[11px] font-semibold tracking-wider uppercase bg-emerald-500/10 px-2.5 py-1 rounded-sm border border-emerald-500/20 active:scale-95 transition-all touch-manipulation"
                      aria-label={`WhatsApp about ${service.title}`}
                    >
                      <MessageCircle size={13} className="fill-current" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
