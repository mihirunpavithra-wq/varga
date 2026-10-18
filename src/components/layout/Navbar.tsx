import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navLinks } from '@/data/content';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace('#', ''));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.3, rootMargin: '-64px 0px 0px 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#080808]/95 backdrop-blur-md border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-varga">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollTo('#home')}
              className="flex items-center gap-3 group text-left"
              aria-label="VARGA — go to home"
            >
              <img
                src="/varga-logo.png"
                alt="VARGA Logo"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-display text-xl sm:text-2xl tracking-widest text-varga-white group-hover:text-varga-red transition-colors duration-200">
                VARGA
              </span>
            </button>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`font-heading text-xs font-600 tracking-widest uppercase transition-colors duration-200 ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-varga-red'
                        : 'text-varga-muted hover:text-varga-white'
                    }`}
                    style={{ fontWeight: 600, letterSpacing: '0.12em' }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => scrollTo('#contact')}
                className="hidden md:flex btn-primary text-xs py-3 px-5"
              >
                Start a Project
                <ArrowUpRight size={14} />
              </button>

              <button
                className="md:hidden text-varga-white p-1"
                onClick={() => setMenuOpen((p) => !p)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#080808]/98 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Top Bar inside menu */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
              <div className="flex items-center gap-3">
                <img
                  src="/varga-logo.png"
                  alt="VARGA Logo"
                  className="h-10 w-auto object-contain"
                />
                <span className="font-display text-2xl tracking-widest text-varga-white">
                  VARGA
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-varga-muted hover:text-varga-white p-2 -mr-2"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <ul className="flex flex-col items-start gap-6 my-auto py-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-display text-3xl sm:text-4xl tracking-widest text-varga-white hover:text-varga-red transition-colors flex items-center justify-between w-full text-left"
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-xs text-varga-muted">0{i + 1}</span>
                  </button>
                </motion.li>
              ))}
            </ul>

            {/* Bottom action inside menu */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-col gap-4">
              <button
                onClick={() => scrollTo('#contact')}
                className="btn-primary w-full justify-center py-4 text-xs"
              >
                Start a Project
                <ArrowUpRight size={15} />
              </button>
              <p className="font-heading text-center text-varga-muted text-[10px] tracking-widest uppercase">
                Creative Studio — Sri Lanka
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
