import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { contactInfo } from '@/data/content';

export function QuickWhatsApp() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="fixed z-40 flex flex-col items-end gap-2.5 right-4 sm:right-6 pointer-events-auto"
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#161616]/95 border border-white/20 text-varga-muted hover:text-white active:scale-95 flex items-center justify-center shadow-xl backdrop-blur-md transition-all touch-manipulation"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Action Button */}
      <motion.a
        href={contactInfo.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat directly on WhatsApp"
        className="group relative flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.45)] border border-emerald-300/40 backdrop-blur-sm transition-all duration-300 touch-manipulation select-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <MessageCircle size={20} className="fill-current text-white flex-shrink-0" />
        <span className="font-heading text-xs font-bold tracking-wider uppercase pr-0.5">
          WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
