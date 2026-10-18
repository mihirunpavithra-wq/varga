import { ArrowUp, Mail } from 'lucide-react';
import { Instagram, Youtube } from '@/components/ui/Icons';
import { navLinks, contactInfo } from '@/data/content';

export function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080808] border-t border-white/[0.06]" role="contentinfo">
      {/* Main footer content */}
      <div className="container-varga py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 md:gap-20">

          {/* Brand */}
          <div>
            <button
              onClick={scrollTop}
              className="flex items-center gap-3.5 group mb-4 text-left"
              aria-label="VARGA — back to top"
            >
              <img
                src={`${import.meta.env.BASE_URL}varga-logo.png`}
                alt="VARGA Logo"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-display text-3xl tracking-widest text-varga-white group-hover:text-varga-red transition-colors">
                VARGA
              </span>
            </button>
            <p className="font-body text-varga-muted text-sm leading-relaxed max-w-xs mb-6">
              A creative studio based in Sri Lanka — turning ideas into visual impact through
              photography, filmmaking, design, and digital storytelling.
            </p>
            <div className="flex gap-3">
              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/[0.1] flex items-center justify-center text-varga-muted hover:border-varga-red hover:text-varga-red transition-all"
                aria-label="VARGA on Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href={contactInfo.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/[0.1] flex items-center justify-center text-varga-muted hover:border-varga-red hover:text-varga-red transition-all"
                aria-label="VARGA on YouTube"
              >
                <Youtube size={15} />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="w-9 h-9 border border-white/[0.1] flex items-center justify-center text-varga-muted hover:border-varga-red hover:text-varga-red transition-all"
                aria-label={`Email VARGA at ${contactInfo.email}`}
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-heading text-varga-white text-xs font-semibold tracking-[0.15em] uppercase mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-body text-varga-muted text-sm hover:text-varga-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services shortlist */}
          <div>
            <p className="font-heading text-varga-white text-xs font-semibold tracking-[0.15em] uppercase mb-5">
              Services
            </p>
            <ul className="space-y-3">
              {[
                'Cinematography',
                'Photography',
                'Video Editing',
                'Brand Identity',
                'Social Media',
                'AI Visuals',
              ].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo('#services')}
                    className="font-body text-varga-muted text-sm hover:text-varga-white transition-colors"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05]">
        <div className="container-varga py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-varga-muted text-xs text-center sm:text-left">
            © {year} VARGA Creative Studio. All rights reserved.
            {' '}Based in Sri Lanka.
          </p>

          {/* Back to top */}
          <button
            onClick={scrollTop}
            className="flex items-center gap-2 font-heading text-varga-muted text-[11px] tracking-widest uppercase hover:text-varga-white transition-colors group"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <div className="w-7 h-7 border border-white/[0.1] group-hover:border-varga-red flex items-center justify-center transition-colors">
              <ArrowUp size={13} className="group-hover:text-varga-red transition-colors" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
