import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface StarWishSectionProps {
  headline: string;
  message: string;
  buttonText: string;
  shootingStarWish: string;
}

export const StarWishSection: React.FC<StarWishSectionProps> = ({
  headline,
  message,
  buttonText,
  shootingStarWish
}) => {
  const [hasWished, setHasWished] = useState(false);
  const [shootingStarKey, setShootingStarKey] = useState(0);

  const handleMakeWish = () => {
    audioEngine.playSoftChime();
    setShootingStarKey(prev => prev + 1);
    setHasWished(true);
  };

  return (
    <section id="stars" className="relative py-28 sm:py-36 px-4 sm:px-6 overflow-hidden">
      {/* Deep Celestial Gradient Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B070A] via-[#1A0512] to-[#0B070A] pointer-events-none" />

      {/* Star Particles Field */}
      <div className="absolute inset-0 pointer-events-none opacity-50" aria-hidden="true">
        <div className="absolute top-1/4 left-[15%] w-1.5 h-1.5 bg-[#FAF7F2] rounded-full animate-ping duration-1000" />
        <div className="absolute top-1/3 right-[20%] w-1 h-1 bg-[#E5C378] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-[30%] w-1 h-1 bg-[#F4B5C4] rounded-full" />
        <div className="absolute top-1/2 left-[70%] w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 right-[35%] w-1 h-1 bg-[#E5C378] rounded-full" />
      </div>

      {/* Animated Shooting Star */}
      <AnimatePresence>
        {shootingStarKey > 0 && (
          <motion.div
            key={shootingStarKey}
            initial={{ x: '-10%', y: '10%', opacity: 1, scale: 0.5 }}
            animate={{ x: '120vw', y: '80vh', opacity: [1, 1, 0], scale: 1.2 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute top-0 left-0 w-44 h-0.5 bg-gradient-to-r from-transparent via-[#FAF7F2] to-[#E5C378] shadow-[0_0_15px_#E5C378] pointer-events-none z-20 transform rotate-[25deg]"
          />
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto relative z-10 text-center flex flex-col items-center">
        {/* Constellation Icon */}
        <div className="w-12 h-12 rounded-full bg-[#2E0B16] border border-[#E5C378]/30 flex items-center justify-center text-[#E5C378] mb-6 shadow-[0_0_20px_rgba(229,195,120,0.2)]">
          <Sparkles className="w-5 h-5" />
        </div>

        {/* Section Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F2] font-normal tracking-tight mb-8">
          {headline}
        </h2>

        {/* Wish Main Message Card */}
        <div className="bg-[#180610]/80 border border-[#E5C378]/25 rounded-2xl p-8 sm:p-12 backdrop-blur-md shadow-2xl mb-10 max-w-2xl">
          <p className="font-serif italic text-xl sm:text-2xl text-[#FAF7F2]/90 leading-relaxed font-light">
            “{message}”
          </p>
        </div>

        {/* Make a Wish Button */}
        <button
          type="button"
          onClick={handleMakeWish}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#D4AF37] text-[#1F050C] font-serif font-semibold text-base sm:text-lg tracking-wide shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
        >
          <Sparkles className="w-5 h-5 text-[#1F050C] group-hover:rotate-12 transition-transform" />
          <span>{hasWished ? "Make Another Wish" : buttonText}</span>
        </button>

        {/* Shooting Star Wish Revelation */}
        <AnimatePresence>
          {hasWished && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-[#2E0B16]/90 via-[#4A1224]/80 to-[#2E0B16]/90 border border-[#E5C378]/50 shadow-[0_0_35px_rgba(229,195,120,0.25)] max-w-xl"
            >
              <span className="font-sans text-xs uppercase tracking-widest text-[#E5C378] block mb-2">
                Carried Across The Stars
              </span>
              <p className="font-serif text-xl sm:text-2xl text-[#FAF7F2] font-normal leading-relaxed">
                “{shootingStarWish}”
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
