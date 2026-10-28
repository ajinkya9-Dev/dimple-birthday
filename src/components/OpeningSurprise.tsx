import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RosePetalsCanvas } from './RosePetalsCanvas';
import { audioEngine } from '../utils/audio';

interface OpeningSurpriseProps {
  recipientName: string;
  onEnterUniverse: () => void;
}

export const OpeningSurprise: React.FC<OpeningSurpriseProps> = ({
  recipientName,
  onEnterUniverse
}) => {
  const [isOpenStage, setIsOpenStage] = useState<'sealed' | 'opening' | 'revealed'>('sealed');

  const handleOpenEnvelope = () => {
    if (isOpenStage !== 'sealed') return;
    audioEngine.playSoftChime();
    setIsOpenStage('opening');

    // Reveal note after flap folds
    setTimeout(() => {
      setIsOpenStage('revealed');
    }, 900);
  };

  const handleCompleteAndEnter = () => {
    audioEngine.playSoftChime();
    onEnterUniverse();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B070A] overflow-hidden px-4">
      {/* Cinematic Midnight Starfield & Rose Petals */}
      <div 
        className="absolute inset-0 bg-radial-[circle_at_center,rgba(66,16,33,0.35)_0%,rgba(11,7,10,0.98)_75%] pointer-events-none" 
      />
      
      {/* Background Star Dots */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[12%] left-[18%] w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-[28%] left-[76%] w-1.5 h-1.5 bg-[#E5C378] rounded-full animate-ping duration-1000" />
        <div className="absolute top-[65%] left-[15%] w-1 h-1 bg-[#F4B5C4] rounded-full animate-pulse" />
        <div className="absolute top-[75%] left-[82%] w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        <div className="absolute top-[38%] left-[48%] w-1 h-1 bg-[#E5C378] rounded-full" />
      </div>

      <RosePetalsCanvas density={isOpenStage === 'revealed' ? 40 : 20} intensity={isOpenStage === 'revealed' ? 'celebration' : 'gentle'} />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center">
        {/* Poetic Opening Lines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 space-y-3"
        >
          <p className="font-serif italic text-lg sm:text-2xl text-[#F8D7DF]/90 font-light tracking-wide max-w-md mx-auto">
            “Some people make the world more beautiful just by being in it.”
          </p>
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-[#E5C378]/80">
            {recipientName}, this little universe is for you.
          </p>
        </motion.div>

        {/* The Sealed Glowing Envelope */}
        <div className="relative w-72 sm:w-88 h-48 sm:h-56 my-2 perspective-1000">
          {/* Subtle Ambient Glow behind Envelope */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/15 via-[#F4B5C4]/20 to-[#D4AF37]/15 rounded-3xl blur-2xl opacity-70 pointer-events-none" />

          {/* Envelope Body */}
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-[#2E0B16] to-[#1A050D] border border-[#E5C378]/30 shadow-2xl flex items-center justify-center">
            
            {/* Envelope Interior Lining Pattern */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#E5C378_1px,transparent_1px)] [background-size:14px_14px]" />

            {/* Revealed Letter emerging from inside */}
            <AnimatePresence>
              {(isOpenStage === 'opening' || isOpenStage === 'revealed') && (
                <motion.div
                  initial={{ y: 70, opacity: 0, scale: 0.85 }}
                  animate={{ y: isOpenStage === 'revealed' ? -25 : 5, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-4 top-2 bottom-6 bg-[#FAF6EF] rounded-lg shadow-xl p-5 flex flex-col justify-between text-left border border-[#D4AF37]/40 z-20 paper-texture"
                >
                  <div>
                    <span className="font-script text-2xl text-[#2E0B16] block">
                      Dearest {recipientName},
                    </span>
                    <p className="font-serif text-sm sm:text-base text-[#3A141E] mt-2 leading-relaxed">
                      Today is about celebrating you—your kind soul, your radiant warmth, and every quiet dream you carry.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#E8DFC8]/60 text-xs text-[#5C182F]/80">
                    <span className="font-serif italic">Your Special Day</span>
                    <span className="font-sans font-medium text-[#2E0B16]">With love, always</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lower Envelope Fold Triangles */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <svg className="w-full h-full" viewBox="0 0 352 224" fill="none" preserveAspectRatio="none">
                {/* Left fold */}
                <polygon points="0,0 176,130 0,224" fill="rgba(33, 7, 16, 0.85)" />
                {/* Right fold */}
                <polygon points="352,0 176,130 352,224" fill="rgba(42, 10, 21, 0.9)" />
                {/* Bottom fold */}
                <polygon points="0,224 176,110 352,224" fill="rgba(49, 12, 24, 0.98)" stroke="rgba(229,195,120,0.25)" strokeWidth="0.8" />
              </svg>
            </div>

            {/* Top Flap (Folds open upward) */}
            <motion.div
              animate={{
                rotateX: isOpenStage === 'sealed' ? 0 : 180,
                zIndex: isOpenStage === 'sealed' ? 25 : 5
              }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top center' }}
              className="absolute inset-x-0 top-0 h-1/2 pointer-events-none z-25"
            >
              <svg className="w-full h-full drop-shadow-md" viewBox="0 0 352 112" fill="none" preserveAspectRatio="none">
                <polygon points="0,0 352,0 176,112" fill="#3D0F1E" stroke="rgba(229,195,120,0.35)" strokeWidth="1" />
              </svg>
            </motion.div>

            {/* Wax Seal with letter 'D' */}
            {isOpenStage === 'sealed' && (
              <motion.button
                type="button"
                onClick={handleOpenEnvelope}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="absolute z-30 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#E5C378] via-[#C5A059] to-[#8C6D28] shadow-[0_0_20px_rgba(212,175,55,0.6)] flex items-center justify-center border-2 border-[#FAF7F2]/40 cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#E5C378]"
                aria-label="Open Birthday Surprise envelope"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#FAF7F2]/30 flex items-center justify-center bg-gradient-to-b from-[#D4AF37] to-[#A37C27]">
                  <span className="font-script text-2xl sm:text-3xl text-[#1F050C] font-bold select-none group-hover:scale-110 transition-transform">
                    {recipientName.charAt(0) || 'D'}
                  </span>
                </div>
              </motion.button>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-col items-center gap-4">
          {isOpenStage === 'sealed' ? (
            <button
              type="button"
              onClick={handleOpenEnvelope}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#D4AF37] text-[#1F050C] font-serif font-semibold text-base tracking-wide shadow-[0_4px_24px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_32px_rgba(212,175,55,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
            >
              Open Your Birthday Surprise
            </button>
          ) : (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              type="button"
              onClick={handleCompleteAndEnter}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FAF7F2] via-[#F4B5C4] to-[#FAF7F2] text-[#2E0B16] font-serif font-semibold text-base tracking-wide shadow-[0_4px_24px_rgba(244,181,196,0.3)] hover:shadow-[0_4px_32px_rgba(244,181,196,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
            >
              Enter Dimple's Universe →
            </motion.button>
          )}

          {/* Discreet Skip Option */}
          <button
            type="button"
            onClick={onEnterUniverse}
            className="text-xs text-[#FAF7F2]/40 hover:text-[#E5C378] transition-colors py-1 cursor-pointer focus-visible:underline"
          >
            Skip directly into the celebration
          </button>
        </div>
      </div>
    </div>
  );
};
