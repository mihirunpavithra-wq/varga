import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Layout
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Sections
import { Hero } from '@/components/sections/Hero';
import { Portfolio } from '@/components/sections/Portfolio';
import { Services } from '@/components/sections/Services';
import { About } from '@/components/sections/About';
import { Process } from '@/components/sections/Process';
import { CTA } from '@/components/sections/CTA';
import { Contact } from '@/components/sections/Contact';

// ─── Page Loading Screen ──────────────────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#080808] flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center relative px-4"
      >
        <img
          src={`${import.meta.env.BASE_URL}varga-logo.png`}
          alt="VARGA"
          className="h-20 sm:h-28 w-auto object-contain mb-4 filter drop-shadow-[0_10px_25px_rgba(192,57,43,0.25)]"
        />
        <span
          className="font-display text-varga-white tracking-[0.25em] text-3xl sm:text-4xl"
        >
          VARGA
        </span>
        {/* Animated underline */}
        <motion.div
          className="h-[2px] bg-varga-red mt-2"
          initial={{ width: 0 }}
          animate={{ width: '80px' }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
      <motion.p
        className="font-heading text-varga-muted text-xs tracking-[0.3em] uppercase mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Creative Studio
      </motion.p>
    </motion.div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Film grain overlay — always present */}
      <div className="grain-overlay" aria-hidden="true" />

      <AnimatePresence mode="wait">
        {!loaded ? (
          <LoadingScreen key="loader" onDone={() => setLoaded(true)} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Skip-to-content link for accessibility */}
            <a
              href="#home"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-varga-red focus:text-white focus:px-4 focus:py-2 focus:text-sm"
            >
              Skip to content
            </a>

            <Navbar />

            <main id="main-content">
              <Hero />
              <Portfolio />
              <Services />
              <About />
              <Process />
              <CTA />
              <Contact />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
