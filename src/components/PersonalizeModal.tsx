import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, RotateCcw, Check, Music } from 'lucide-react';
import { BirthdayData, GalleryItem } from '../config/birthdayData';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BirthdayData;
  onSaveData: (newData: BirthdayData) => void;
  onResetDefaults: () => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  data,
  onSaveData,
  onResetDefaults
}) => {
  const [recipient, setRecipient] = useState(data.recipientName);
  const [sender, setSender] = useState(data.senderName);
  const [gallery, setGallery] = useState<GalleryItem[]>(data.gallery);
  const [customAudioUrl, setCustomAudioUrl] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const updated = [...gallery];
        updated[index] = {
          ...updated[index],
          image: reader.result
        };
        setGallery(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCaptionChange = (index: number, text: string) => {
    const updated = [...gallery];
    updated[index] = {
      ...updated[index],
      caption: text
    };
    setGallery(updated);
  };

  const handleTitleChange = (index: number, text: string) => {
    const updated = [...gallery];
    updated[index] = {
      ...updated[index],
      title: text
    };
    setGallery(updated);
  };

  const handleSaveAll = () => {
    const updatedData: BirthdayData = {
      ...data,
      recipientName: recipient.trim() || 'Dimple',
      senderName: sender.trim() || 'Ajinkya',
      gallery
    };
    onSaveData(updatedData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-2xl w-full bg-[#15050C] border border-[#E5C378]/35 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-[#FAF7F2]"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                Personalize Her Universe
              </h3>
              <p className="text-xs text-[#FAF7F2]/60 mt-1">
                Customize names, real photographs, and audio for Dimple.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-[#FAF7F2]/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
            {/* Names configuration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#E5C378] font-sans mb-1.5">
                  Her Name (Recipient)
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 focus:border-[#E5C378] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  placeholder="e.g. Dimple"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#E5C378] font-sans mb-1.5">
                  Your Name (Sender Signature)
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 focus:border-[#E5C378] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  placeholder="e.g. Ajinkya"
                />
              </div>
            </div>

            {/* Custom Audio configuration */}
            <div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#E5C378] font-sans mb-1.5">
                <Music className="w-3.5 h-3.5" />
                <span>Custom Song or Audio Stream (Optional)</span>
              </label>
              <input
                type="text"
                value={customAudioUrl}
                onChange={(e) => setCustomAudioUrl(e.target.value)}
                className="w-full bg-black/40 border border-white/15 focus:border-[#E5C378] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                placeholder="Leave blank to use built-in ambient serenade, or paste audio URL"
              />
              <p className="text-[11px] text-[#FAF7F2]/50 mt-1">
                When blank, the soothing built-in acoustic serenade plays via Web Audio API with zero external dependencies.
              </p>
            </div>

            {/* Gallery Photos Customizer */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-xs uppercase tracking-wider text-[#E5C378] font-sans">
                  Gallery Photographs & Captions (6 Slots)
                </label>
                <span className="text-[11px] text-[#FAF7F2]/50">
                  Upload actual photographs
                </span>
              </div>

              <div className="space-y-4">
                {gallery.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 bg-black/30 rounded-xl border border-white/10"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden relative shrink-0 bg-black/40 border border-white/20">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <label className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                        <Upload className="w-4 h-4 text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(idx, e)}
                        />
                      </label>
                    </div>

                    <div className="flex-1 space-y-1.5 w-full">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleTitleChange(idx, e.target.value)}
                        className="w-full bg-transparent border-b border-white/15 px-2 py-1 text-sm text-white font-medium focus:outline-none focus:border-[#E5C378]"
                        placeholder="Memory Title"
                      />
                      <input
                        type="text"
                        value={item.caption}
                        onChange={(e) => handleCaptionChange(idx, e.target.value)}
                        className="w-full bg-transparent border-b border-white/10 px-2 py-1 text-xs text-[#FAF7F2]/70 focus:outline-none focus:border-[#E5C378]"
                        placeholder="Personal note or memory caption..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={onResetDefaults}
              className="flex items-center gap-1.5 text-xs text-[#FAF7F2]/50 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs text-[#FAF7F2]/70 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAll}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C378] text-[#1F050C] font-semibold text-xs hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
              >
                {savedSuccess ? <Check className="w-4 h-4" /> : null}
                <span>{savedSuccess ? "Saved!" : "Save & Update"}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
