import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/data/content';
import { Reveal, Stagger, staggerItem } from '@/components/ui/Reveal';

export function Services() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="services" className="section-padding bg-[#0d0d0d]" aria-labelledby="services-heading">
      {/* Marquee band */}
      <div className="overflow-hidden border-y border-white/[0.05] py-4 mb-20" aria-hidden="true">
        <div className="marquee-track">
          {Array(4).fill(
            ['Cinematography', 'Photography', 'Branding', 'Video Editing', 'Social Media', 'AI Visuals']
          ).flat().map((label, i) => (
            <span key={i} className="font-display text-white/[0.07] text-5xl tracking-widest mx-8 whitespace-nowrap">
              {label} ·
            </span>
          ))}
        </div>
      </div>

      <div className="container-varga">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 md:mb-20">
          <Reveal>
            <p className="font-heading text-varga-red text-xs font-semibold tracking-[0.25em] uppercase mb-4">
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
            <p className="font-body text-varga-muted text-base leading-relaxed max-w-sm">
              From a single product photo to a complete cinematic brand campaign — every service
              is built around your story and your audience.
            </p>
          </Reveal>
        </div>

        {/* Services Grid */}
        <Stagger staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]">
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              className="relative bg-[#0d0d0d] p-8 group cursor-default"
              onMouseEnter={() => setHovered(service.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Hover background */}
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

              <div className="relative z-10">
                {/* Icon */}
                <div className="text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 w-fit">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="font-heading text-varga-white font-semibold text-lg mb-3 leading-tight group-hover:text-varga-red transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-body text-varga-muted text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables */}
                <ul className="space-y-1.5 mb-6">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-varga-red flex-shrink-0" aria-hidden="true" />
                      <span className="font-body text-varga-muted text-xs">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-1 text-varga-red font-heading text-xs font-semibold tracking-widest uppercase hover:gap-2 transition-all duration-200"
                >
                  Enquire <ArrowUpRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
