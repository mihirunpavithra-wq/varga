import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, MessageCircle, Phone, Mail } from 'lucide-react';
import { Instagram, Youtube, Facebook } from '@/components/ui/Icons';
import { navLinks, contactInfo } from '@/data/content';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/95 backdrop-blur-md border-b border-white/[0.08] shadow-lg'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-varga">
          <nav className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollTo('#home')}
              className="flex items-center gap-2.5 sm:gap-3 group text-left touch-manipulation"
              aria-label="VARGA — go to home"
            >
              <img
                src={`${import.meta.env.BASE_URL}varga-logo.png`}
                alt="VARGA Logo"
                className="h-9 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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
                    className={`font-heading text-xs tracking-widest uppercase transition-colors duration-200 ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-varga-red font-bold'
                        : 'text-varga-muted hover:text-varga-white font-semibold'
                    }`}
                    style={{ letterSpacing: '0.12em' }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* CTA + Mobile Controls */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              {/* Desktop Start Project */}
              <button
                onClick={() => scrollTo('#contact')}
                className="hidden md:flex btn-primary text-xs py-3 px-5"
              >
                Start a Project
                <ArrowUpRight size={14} />
              </button>

              {/* Mobile Quick WhatsApp Chip */}
              <a
                href={contactInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden flex items-center gap-1.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 active:scale-95 text-[#25D366] border border-[#25D366]/35 px-2.5 py-1.5 rounded-full text-[11px] font-heading font-semibold tracking-wider uppercase transition-all touch-manipulation"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle size={14} className="fill-current" />
                <span>Chat</span>
              </a>

              {/* Hamburger Button */}
              <button
                className="md:hidden text-varga-white p-2 -mr-1 rounded-lg border border-white/10 active:scale-95 transition-all touch-manipulation flex items-center justify-center bg-white/[0.04]"
                onClick={() => setMenuOpen((p) => !p)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[#080808]/98 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto px-5 py-6 sm:p-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top Bar inside menu */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={`${import.meta.env.BASE_URL}varga-logo.png`}
                  alt="VARGA Logo"
                  className="h-9 w-auto object-contain"
                />
                <span className="font-display text-2xl tracking-widest text-varga-white">
                  VARGA
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-varga-muted hover:text-varga-white p-2 rounded-lg border border-white/10 active:scale-90 transition-all touch-manipulation"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="py-6 sm:py-8 my-auto">
              <p className="font-heading text-[10px] tracking-[0.25em] uppercase text-varga-red font-semibold mb-4">
                Navigation
              </p>
              <ul className="flex flex-col gap-4 sm:gap-5">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                  >
                    <button
                      onClick={() => scrollTo(link.href)}
                      className={`font-display text-2xl sm:text-3xl tracking-widest transition-colors flex items-center justify-between w-full text-left py-1 touch-manipulation ${
                        activeSection === link.href.replace('#', '')
                          ? 'text-varga-red'
                          : 'text-varga-white hover:text-varga-red'
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="font-mono text-xs text-varga-muted/70">0{i + 1}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Direct Contact & Social Area inside Menu */}
            <div className="pt-5 border-t border-white/[0.08] flex flex-col gap-4">
              {/* Quick Contact Buttons Row */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={contactInfo.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] py-3 rounded text-xs font-heading font-semibold tracking-wider uppercase active:scale-95 transition-all touch-manipulation"
                >
                  <MessageCircle size={15} className="fill-current" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${contactInfo.whatsapp.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-varga-white py-3 rounded text-xs font-heading font-semibold tracking-wider uppercase active:scale-95 transition-all touch-manipulation"
                >
                  <Phone size={14} />
                  <span>Call Us</span>
                </a>
              </div>

              {/* Start Project CTA Button */}
              <button
                onClick={() => scrollTo('#contact')}
                className="btn-primary w-full justify-center py-3.5 text-xs tracking-widest active:scale-98 touch-manipulation"
              >
                Start a Project
                <ArrowUpRight size={15} />
              </button>

              {/* Social Channels Row */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <a
                    href={contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border border-white/10 flex items-center justify-center text-varga-muted hover:text-varga-red hover:border-varga-red active:scale-90 transition-all rounded"
                    aria-label="Instagram"
                  >
                    <Instagram size={15} />
                  </a>
                  <a
                    href={contactInfo.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border border-white/10 flex items-center justify-center text-varga-muted hover:text-varga-red hover:border-varga-red active:scale-90 transition-all rounded"
                    aria-label="YouTube"
                  >
                    <Youtube size={15} />
                  </a>
                  <a
                    href={contactInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border border-white/10 flex items-center justify-center text-varga-muted hover:text-varga-red hover:border-varga-red active:scale-90 transition-all rounded"
                    aria-label="Facebook"
                  >
                    <Facebook size={15} />
                  </a>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="w-9 h-9 border border-white/10 flex items-center justify-center text-varga-muted hover:text-varga-red hover:border-varga-red active:scale-90 transition-all rounded"
                    aria-label="Email"
                  >
                    <Mail size={15} />
                  </a>
                </div>
                <span className="font-heading text-[10px] text-varga-muted tracking-widest uppercase">
                  Sri Lanka
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
