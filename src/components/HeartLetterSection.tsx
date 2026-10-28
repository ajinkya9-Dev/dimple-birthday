import React from 'react';
import { motion } from 'motion/react';

interface HeartLetterSectionProps {
  heading: string;
  paragraphs: string[];
}

export const HeartLetterSection: React.FC<HeartLetterSectionProps> = ({
  heading,
  paragraphs
}) => {
  return (
    <section id="letter" className="relative py-24 sm:py-32 px-4 sm:px-6">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-[circle_at_50%_40%,rgba(66,16,33,0.25)_0%,transparent_70%] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-[#E5C378] mb-2">
            A Handwritten Page
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-normal">
            A Letter From My Heart
          </h2>
          <div className="w-12 h-px bg-[#E5C378]/40 mx-auto mt-4" />
        </div>

        {/* Warm Ivory Stationery Paper Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#FAF6EF] text-[#241017] rounded-2xl p-7 sm:p-14 shadow-2xl border border-[#D4AF37]/35 paper-texture overflow-hidden"
        >
          {/* Subtle gold foil corner accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/40 pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/40 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/40 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/40 pointer-events-none" />

          {/* Delicate Handwritten Salutation */}
          <div className="mb-8">
            <h3 className="font-script text-3xl sm:text-4xl text-[#3D0F1E] font-normal tracking-wide">
              {heading}
            </h3>
            <div className="w-16 h-0.5 bg-[#D4AF37]/40 mt-1" />
          </div>

          {/* Letter Body Paragraphs */}
          <div className="space-y-6 font-serif text-base sm:text-lg text-[#2A0F17] leading-[1.8] font-normal">
            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={
                  idx === 0 || idx === paragraphs.length - 1
                    ? "font-medium text-[#421021] text-lg sm:text-xl"
                    : ""
                }
              >
                {p}
              </p>
            ))}
          </div>

          {/* Letter Seal Footer */}
          <div className="mt-12 pt-6 border-t border-[#E8DFC8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#E5C378] to-[#9E7A26] flex items-center justify-center shadow-inner">
                <span className="font-script text-sm text-[#1F050C] font-bold">D</span>
              </div>
              <span className="font-sans text-xs text-[#5C182F]/70 tracking-wider">
                Penned with care
              </span>
            </div>
            <span className="font-serif italic text-sm text-[#421021]">
              Forever & always
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
