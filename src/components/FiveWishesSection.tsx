import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WishItem } from '../config/birthdayData';
import { Sparkles, Feather, Heart, Compass, Sun, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface FiveWishesSectionProps {
  wishes: WishItem[];
}

export const FiveWishesSection: React.FC<FiveWishesSectionProps> = ({ wishes }) => {
  const [activeWishId, setActiveWishId] = useState<string | null>(null);

  const getWishIcon = (id: string) => {
    switch (id) {
      case '01':
        return <Sparkles className="w-5 h-5 text-[#E5C378]" />;
      case '02':
        return <Feather className="w-5 h-5 text-[#F4B5C4]" />;
      case '03':
        return <Heart className="w-5 h-5 text-[#E5C378]" />;
      case '04':
        return <Compass className="w-5 h-5 text-[#F4B5C4]" />;
      case '05':
        return <Sun className="w-5 h-5 text-[#E5C378]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#E5C378]" />;
    }
  };

  const handleSelectWish = (id: string) => {
    audioEngine.playSoftChime();
    setActiveWishId(prev => (prev === id ? null : id));
  };

  return (
    <section id="wishes" className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <p className="font-sans text-xs uppercase tracking-[0.22em] text-[#E5C378] mb-2">
          New Year Blessings
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F2] font-normal tracking-tight">
          Five Wishes for Your Year
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#FAF7F2]/60 mt-3 max-w-lg mx-auto">
          Tap each card to unveil the blessing carried within my heart for you.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishes.map((wish, index) => {
          const isExpanded = activeWishId === wish.id;
          const isSpanning = index === 3 || index === 4;

          return (
            <motion.div
              key={wish.id}
              layout
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                isSpanning ? 'lg:col-span-1 md:col-span-1' : ''
              } ${
                isExpanded
                  ? 'bg-gradient-to-b from-[#2E0B16] to-[#1A050D] border-[#E5C378] shadow-[0_0_30px_rgba(212,175,55,0.2)]'
                  : 'bg-[#15050C]/80 hover:bg-[#220712] border-white/10 hover:border-[#E5C378]/40'
              }`}
              onClick={() => handleSelectWish(wish.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectWish(wish.id);
                }
              }}
              aria-expanded={isExpanded}
            >
              {/* Subtle top edge glow */}
              {isExpanded && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E5C378] to-transparent" />
              )}

              <div className="p-7 sm:p-8 flex flex-col h-full justify-between">
                <div>
                  {/* Clean unboxed metadata with editorial numbering */}
                  <div className="flex items-center justify-between gap-4 mb-4 text-xs">
                    <div className="flex items-center gap-2 text-[#E5C378]/90 font-mono">
                      <span>{wish.id}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-sans uppercase tracking-widest text-[#FAF7F2]/50">
                        {wish.tagline}
                      </span>
                    </div>
                    <div>{getWishIcon(wish.id)}</div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl text-[#FAF7F2] font-medium tracking-tight mb-3">
                    {wish.title}
                  </h3>

                  {/* Card Message Reveal */}
                  <AnimatePresence initial={false}>
                    {isExpanded ? (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="font-serif text-base sm:text-lg text-[#F8D7DF] leading-relaxed pt-2 border-t border-[#E5C378]/20">
                          “{wish.text}”
                        </p>
                      </motion.div>
                    ) : (
                      <p className="font-serif text-sm text-[#FAF7F2]/50 line-clamp-2 italic">
                        “{wish.text}”
                      </p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card Action Hint */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#E5C378]/80 font-sans">
                  <span>{isExpanded ? "Blessing revealed" : "Click to read wish"}</span>
                  {isExpanded ? (
                    <CheckCircle2 className="w-4 h-4 text-[#E5C378]" />
                  ) : (
                    <span className="text-[#FAF7F2]/40">Tap to open</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
