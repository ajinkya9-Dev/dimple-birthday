import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Edit2, Check } from 'lucide-react';

interface FinalSurpriseSectionProps {
  recipientName: string;
  senderName: string;
  onUpdateSenderName: (newName: string) => void;
  onReplaySurprise: () => void;
}

export const FinalSurpriseSection: React.FC<FinalSurpriseSectionProps> = ({
  recipientName,
  senderName,
  onUpdateSenderName,
  onReplaySurprise
}) => {
  const [isEditingSender, setIsEditingSender] = useState(false);
  const [nameInput, setNameInput] = useState(senderName);

  const handleSaveSender = () => {
    onUpdateSenderName(nameInput.trim() || 'Ajinkya');
    setIsEditingSender(false);
  };

  return (
    <section id="final-surprise" className="relative min-h-screen py-32 sm:py-44 px-4 sm:px-6 flex items-center justify-center overflow-hidden bg-[#070305]">
      {/* Warm Golden Bokeh & Lantern Field */}
      <div className="absolute inset-0 bg-radial-[circle_at_50%_60%,rgba(66,16,33,0.45)_0%,rgba(7,3,5,0.98)_75%] pointer-events-none" />

      {/* Floating Golden Lantern / Bokeh Lights */}
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
        <div className="absolute bottom-[20%] left-[10%] w-32 h-32 rounded-full bg-[#E5C378]/15 blur-3xl animate-pulse" />
        <div className="absolute top-[25%] right-[12%] w-48 h-48 rounded-full bg-[#F4B5C4]/10 blur-3xl" />
        <div className="absolute bottom-[35%] right-[25%] w-24 h-24 rounded-full bg-[#E5C378]/20 blur-2xl animate-pulse" />
        <div className="absolute top-[40%] left-[20%] w-2 h-2 rounded-full bg-[#E5C378]/80 shadow-[0_0_10px_#E5C378]" />
        <div className="absolute bottom-[25%] right-[15%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-center flex flex-col items-center">
        {/* Line 1: Preamble intro */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1 }}
          className="font-serif italic text-lg sm:text-2xl text-[#E5C378]/90 font-light mb-8"
        >
          “And before this little surprise ends…”
        </motion.p>

        {/* Line 2 */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="font-serif text-xl sm:text-3xl text-[#FAF7F2]/90 leading-relaxed font-normal mb-8 max-w-2xl text-balance"
        >
          “I hope you never become so busy chasing the future that you forget to appreciate the beautiful person you already are.”
        </motion.p>

        {/* Line 3 */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="font-serif italic text-lg sm:text-2xl text-[#F8D7DF]/85 leading-relaxed font-light mb-16 max-w-2xl text-balance"
        >
          “Keep growing. Keep dreaming. Stay grateful. Protect your peace. And never let the world take away your kindness.”
        </motion.p>

        {/* Golden Hairline Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-24 h-px bg-[#E5C378]/50 my-4"
        />

        {/* Climax Grand Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="my-10"
        >
          <h2 className="font-serif text-4xl sm:text-7xl font-normal text-[#FAF7F2] tracking-tight mb-8">
            Happy Birthday,{' '}
            <span className="italic text-[#F4B5C4] drop-shadow-[0_0_35px_rgba(244,181,196,0.35)]">
              {recipientName}.
            </span>
          </h2>

          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="font-serif text-lg sm:text-2xl text-[#FAF7F2]/90 leading-relaxed font-light text-balance">
              You deserve a life filled with genuine happiness, meaningful moments, beautiful growth, and dreams that become your reality.
            </p>
            <p className="font-serif italic text-base sm:text-xl text-[#E5C378]/90 font-light text-balance">
              May you always find a reason to smile, even on ordinary days.
            </p>
          </div>
        </motion.div>

        {/* Handwritten Signoff & Customizable Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <span className="font-script text-3xl sm:text-4xl text-[#FAF7F2]/95 tracking-wide">
            With love, always. ♡
          </span>

          {/* Sender Signature & Inline Edit */}
          <div className="flex items-center gap-2 mt-1">
            {isEditingSender ? (
              <div className="flex items-center gap-2 bg-black/60 p-1 rounded-lg border border-[#E5C378]/50">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="bg-transparent px-3 py-1 text-sm text-[#E5C378] font-serif focus:outline-none w-36"
                  placeholder="Your Name"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleSaveSender}
                  className="p-1 rounded bg-[#E5C378] text-[#1F050C] hover:bg-white transition-colors cursor-pointer"
                  title="Save signature"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 group">
                <span className="font-serif text-xl sm:text-2xl text-[#E5C378] tracking-widest uppercase">
                  {senderName}
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditingSender(true)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-[#FAF7F2]/50 hover:text-[#E5C378] cursor-pointer"
                  title="Customize signature name"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Replay Opening Surprise Action */}
        <div className="mt-20 pt-8 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7F2]/40 gap-4">
          <p className="font-serif italic text-sm text-[#FAF7F2]/60">
            For Dimple, With All My Heart
          </p>

          <button
            type="button"
            onClick={onReplaySurprise}
            className="flex items-center gap-2 text-[#E5C378]/80 hover:text-[#E5C378] transition-colors py-1 cursor-pointer focus-visible:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Opening Surprise Envelope</span>
          </button>
        </div>
      </div>
    </section>
  );
};
