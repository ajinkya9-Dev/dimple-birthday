import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EnvelopeItem } from '../config/birthdayData';
import { Mail, X, Heart } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface OpenWhenSectionProps {
  envelopes: EnvelopeItem[];
  recipientName: string;
}

export const OpenWhenSection: React.FC<OpenWhenSectionProps> = ({
  envelopes,
  recipientName
}) => {
  const [selectedEnvelope, setSelectedEnvelope] = useState<EnvelopeItem | null>(null);

  const handleOpenEnvelope = (env: EnvelopeItem) => {
    audioEngine.playSoftChime();
    setSelectedEnvelope(env);
  };

  const handleClose = () => {
    setSelectedEnvelope(null);
  };

  return (
    <section id="open-when" className="relative py-24 sm:py-32 px-4 sm:px-6 bg-[#0E070C]">
      {/* Background radial warmth */}
      <div className="absolute inset-0 bg-radial-[circle_at_50%_50%,rgba(46,11,22,0.4)_0%,transparent_80%] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-[#E5C378] mb-2">
            Letters for Any Moment
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F2] font-normal tracking-tight">
            Open When You Need It
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#FAF7F2]/60 mt-3 max-w-md mx-auto">
            Three letters for ordinary days, quiet nights, and whenever you need a reminder.
          </p>
        </div>

        {/* 3 Digital Envelopes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {envelopes.map((env, idx) => (
            <motion.div
              key={env.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col items-center"
            >
              {/* Envelope Container */}
              <button
                type="button"
                onClick={() => handleOpenEnvelope(env)}
                className="w-full h-52 rounded-xl bg-gradient-to-b from-[#2A0A15] via-[#200610] to-[#15030A] border border-[#E5C378]/30 group-hover:border-[#E5C378] shadow-xl hover:shadow-[0_0_25px_rgba(229,195,120,0.25)] transition-all flex flex-col justify-between p-6 cursor-pointer text-left relative overflow-hidden focus-visible:ring-2 focus-visible:ring-[#E5C378]"
              >
                {/* Envelope Fold Graphic overlay */}
                <div className="absolute top-0 inset-x-0 h-16 pointer-events-none opacity-40">
                  <svg className="w-full h-full" viewBox="0 0 300 80" fill="none" preserveAspectRatio="none">
                    <polygon points="0,0 300,0 150,80" fill="#421021" stroke="#E5C378" strokeWidth="0.5" />
                  </svg>
                </div>

                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className="font-mono text-xs text-[#E5C378]">
                    0{idx + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#3D0F1E] border border-[#E5C378]/40 flex items-center justify-center text-[#E5C378] group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>

                <div className="relative z-10">
                  <span className="text-[11px] uppercase tracking-wider text-[#FAF7F2]/50 font-sans block mb-1">
                    {env.sublabel}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F2] font-medium group-hover:text-[#E5C378] transition-colors">
                    {env.label}
                  </h3>
                </div>

                <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 text-xs text-[#E5C378]/80 font-sans">
                  <span>Tap to unseal</span>
                  <span className="font-script text-base text-[#FAF7F2]/70">For {recipientName}</span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Envelope Reading Lightbox Modal */}
        <AnimatePresence>
          {selectedEnvelope && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-lg w-full bg-[#FAF6EF] text-[#241017] rounded-2xl p-7 sm:p-10 shadow-2xl border border-[#D4AF37]/40 paper-texture"
                role="dialog"
                aria-modal="true"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#E8DFC8]/60 text-[#3D0F1E] transition-colors cursor-pointer"
                  aria-label="Close letter"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header inside letter */}
                <div className="mb-6 pr-8">
                  <span className="text-xs uppercase tracking-widest text-[#5C182F]/70 font-sans block mb-1">
                    {selectedEnvelope.sublabel}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#3D0F1E]">
                    {selectedEnvelope.label}
                  </h3>
                  <div className="w-12 h-0.5 bg-[#D4AF37]/50 mt-2" />
                </div>

                {/* Letter Content */}
                <div className="my-6">
                  <p className="font-serif text-lg sm:text-xl text-[#2B1019] leading-relaxed font-normal">
                    “{selectedEnvelope.content}”
                  </p>
                </div>

                {/* Footer signoff */}
                <div className="pt-6 border-t border-[#E8DFC8] flex items-center justify-between text-sm">
                  <span className="font-script text-2xl text-[#3D0F1E]">
                    Always with you
                  </span>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-2 rounded-full bg-[#3D0F1E] text-[#FAF7F2] font-serif text-sm hover:bg-[#2A0A15] transition-colors cursor-pointer"
                  >
                    Keep in heart
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
