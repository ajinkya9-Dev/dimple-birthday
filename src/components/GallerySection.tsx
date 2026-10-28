import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '../config/birthdayData';
import { Maximize2, X, Edit3, ImagePlus } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface GallerySectionProps {
  items: GalleryItem[];
  onOpenPersonalize: () => void;
  onUpdateItemCaption: (id: string, newCaption: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  items,
  onOpenPersonalize,
  onUpdateItemCaption
}) => {
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [tempCaption, setTempCaption] = useState('');

  const handleOpenLightbox = (item: GalleryItem) => {
    audioEngine.playSoftChime();
    setActiveLightboxItem(item);
    setTempCaption(item.caption);
    setIsEditingCaption(false);
  };

  const handleSaveCaption = () => {
    if (activeLightboxItem) {
      onUpdateItemCaption(activeLightboxItem.id, tempCaption);
      setActiveLightboxItem({
        ...activeLightboxItem,
        caption: tempCaption
      });
      setIsEditingCaption(false);
    }
  };

  return (
    <section id="gallery" className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-[#E5C378] mb-2">
            Visual Keepsakes
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F2] font-normal tracking-tight">
            Moments I'd Love to Keep Forever
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#FAF7F2]/60 mt-2 max-w-lg">
            An editorial collage of memories and quiet moments.
          </p>
        </div>

        {/* Action to customize photos */}
        <button
          type="button"
          onClick={onOpenPersonalize}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-sans tracking-wide text-[#E5C378] border border-[#E5C378]/30 transition-colors self-start md:self-auto cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E5C378]"
        >
          <ImagePlus className="w-4 h-4 text-[#E5C378]" />
          <span>Upload Real Photos</span>
        </button>
      </div>

      {/* Editorial Collage Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {items.map((item, index) => {
          // Asymmetric editorial spans: card 0: 7 cols, card 1: 5 cols, card 2: 4 cols, card 3: 4 cols, card 4: 4 cols, card 5: 12 cols
          let colSpan = 'md:col-span-4';
          let heightClass = 'h-72 sm:h-80';

          if (index === 0) {
            colSpan = 'md:col-span-7';
            heightClass = 'h-80 sm:h-96';
          } else if (index === 1) {
            colSpan = 'md:col-span-5';
            heightClass = 'h-80 sm:h-96';
          } else if (index === 5) {
            colSpan = 'md:col-span-12';
            heightClass = 'h-72 sm:h-96';
          }

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`${colSpan} group relative rounded-2xl overflow-hidden bg-[#15050C] border border-white/10 hover:border-[#E5C378]/50 shadow-xl transition-all duration-300 cursor-pointer`}
              onClick={() => handleOpenLightbox(item)}
            >
              <div className={`w-full ${heightClass} relative overflow-hidden bg-[#1A050D]`}>
                {/* Image with smooth hover scale */}
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    // Styled fallback container on error
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Scrim overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B070A]/90 via-[#0B070A]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Film frame subtle border line */}
                <div className="absolute inset-3 border border-white/15 rounded-xl pointer-events-none group-hover:border-[#E5C378]/40 transition-colors" />

                {/* Content Overlay */}
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between z-10">
                  <div className="pr-4">
                    <span className="text-[11px] font-mono tracking-widest text-[#E5C378] uppercase block mb-1">
                      {item.tag}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F2] font-medium leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-serif italic text-xs sm:text-sm text-[#FAF7F2]/75 line-clamp-1 mt-1">
                      {item.caption}
                    </p>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 group-hover:text-[#E5C378] group-hover:border-[#E5C378] shrink-0 transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl w-full bg-[#15050C] border border-[#E5C378]/40 rounded-2xl overflow-hidden shadow-2xl"
              role="dialog"
              aria-modal="true"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:border-[#E5C378] transition-colors cursor-pointer"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Lightbox Image Container */}
              <div className="max-h-[65vh] w-full bg-black/40 flex items-center justify-center overflow-hidden">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full max-h-[65vh] object-contain"
                />
              </div>

              {/* Lightbox Information Bar */}
              <div className="p-6 bg-[#1A050D] border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#E5C378]">
                    {activeLightboxItem.tag}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditingCaption(!isEditingCaption)}
                    className="flex items-center gap-1.5 text-xs text-[#E5C378] hover:underline cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditingCaption ? "Cancel" : "Edit Caption"}</span>
                  </button>
                </div>

                <h3 className="font-serif text-2xl text-[#FAF7F2] font-normal mb-2">
                  {activeLightboxItem.title}
                </h3>

                {isEditingCaption ? (
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      type="text"
                      value={tempCaption}
                      onChange={(e) => setTempCaption(e.target.value)}
                      className="flex-1 bg-black/50 border border-[#E5C378]/50 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#E5C378]"
                      placeholder="Enter a personal caption..."
                    />
                    <button
                      type="button"
                      onClick={handleSaveCaption}
                      className="px-4 py-2 bg-[#D4AF37] text-[#1F050C] rounded-lg text-xs font-semibold hover:bg-[#E5C378] transition-colors cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <p className="font-serif italic text-base text-[#FAF7F2]/80">
                    “{activeLightboxItem.caption}”
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
