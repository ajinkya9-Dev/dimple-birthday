import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  recipientName: string;
  supportingMessage: string;
  onScrollToNext: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  recipientName,
  supportingMessage,
  onScrollToNext
}) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Moonlit Celestial Gradient Backdrop */}
      <div className="absolute inset-0 bg-radial-[circle_at_50%_25%,rgba(74,18,36,0.35)_0%,rgba(11,7,10,0.95)_70%] pointer-events-none" />

      {/* Stylized Luminous Crescent Moon */}
      <div className="absolute top-12 sm:top-16 right-8 sm:right-24 w-28 h-28 sm:w-36 sm:h-36 pointer-events-none opacity-80">
        <div className="relative w-full h-full">
          {/* Moon Glow */}
          <div className="absolute inset-0 rounded-full bg-[#E5C378]/20 blur-2xl" />
          {/* Crescent */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-[inset_-8px_-4px_0_0_#FAF6EF,0_0_24px_rgba(229,195,120,0.45)] transform -rotate-12" />
          {/* Delicate Star Pair */}
          <div className="absolute top-2 left-[-12px] w-1 h-1 bg-white rounded-full animate-ping duration-1000" />
          <div className="absolute bottom-4 left-[-20px] w-1.5 h-1.5 bg-[#E5C378] rounded-full animate-pulse" />
        </div>
      </div>

      {/* Floating Constellation Dust */}
      <div className="absolute inset-0 pointer-events-none opacity-60" aria-hidden="true">
        <div className="absolute top-1/4 left-[10%] w-1 h-1 bg-[#F4B5C4] rounded-full animate-pulse" />
        <div className="absolute top-1/3 left-[22%] w-1 h-1 bg-[#E5C378] rounded-full" />
        <div className="absolute bottom-1/3 right-[15%] w-1.5 h-1.5 bg-[#FAF7F2] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-[30%] w-1 h-1 bg-[#F8D7DF] rounded-full" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Subtle Date / Occasion Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="flex items-center gap-2 mb-6 text-xs sm:text-sm font-sans tracking-[0.25em] uppercase text-[#E5C378]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
          <span>A Celebration of You</span>
          <span aria-hidden="true">·</span>
          <span>Today & Always</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#FAF7F2] tracking-tight leading-[1.1] mb-6 text-balance"
        >
          Happy Birthday,{' '}
          <span className="italic font-serif text-[#F4B5C4] drop-shadow-[0_0_25px_rgba(244,181,196,0.25)]">
            {recipientName}
          </span>
        </motion.h1>

        {/* Supporting Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="font-serif text-lg sm:text-2xl text-[#FAF7F2]/85 font-light leading-relaxed max-w-2xl mb-12 tracking-wide text-balance"
        >
          “{supportingMessage}”
        </motion.p>

        {/* Smooth-Scroll Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <button
            type="button"
            onClick={onScrollToNext}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#1F050C]/80 hover:bg-[#2E0B16] text-[#FAF7F2] border border-[#E5C378]/40 hover:border-[#E5C378] shadow-[0_0_20px_rgba(229,195,120,0.15)] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E5C378]"
          >
            <span className="font-serif text-base sm:text-lg tracking-wide text-[#E5C378] group-hover:text-white transition-colors">
              A Little Something for You
            </span>
            <ChevronDown className="w-4 h-4 text-[#E5C378] group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
