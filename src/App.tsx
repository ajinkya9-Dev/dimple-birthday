/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialBirthdayData, BirthdayData } from './config/birthdayData';
import { OpeningSurprise } from './components/OpeningSurprise';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { HeartLetterSection } from './components/HeartLetterSection';
import { FiveWishesSection } from './components/FiveWishesSection';
import { OpenWhenSection } from './components/OpenWhenSection';
import { GallerySection } from './components/GallerySection';
import { StarWishSection } from './components/StarWishSection';
import { FinalSurpriseSection } from './components/FinalSurpriseSection';
import { PersonalizeModal } from './components/PersonalizeModal';
import { RosePetalsCanvas } from './components/RosePetalsCanvas';
import { audioEngine } from './utils/audio';

const STORAGE_KEY = 'dimple_birthday_universe_data';

export default function App() {
  const [data, setData] = useState<BirthdayData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return initialBirthdayData;
  });

  const [hasEnteredUniverse, setHasEnteredUniverse] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);

  // Sync state to local storage on save
  const handleSaveData = (newData: BirthdayData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch {
      // storage quota or disabled
    }
  };

  const handleResetDefaults = () => {
    setData(initialBirthdayData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const handleToggleMusic = () => {
    const newState = audioEngine.toggleAmbientMusic();
    setIsPlayingMusic(newState);
  };

  const handleToggleMute = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleScrollToLetter = () => {
    const letterEl = document.getElementById('letter');
    if (letterEl) {
      letterEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateItemCaption = (id: string, newCaption: string) => {
    const updatedGallery = data.gallery.map(item =>
      item.id === id ? { ...item, caption: newCaption } : item
    );
    handleSaveData({
      ...data,
      gallery: updatedGallery
    });
  };

  const handleUpdateSenderName = (newName: string) => {
    handleSaveData({
      ...data,
      senderName: newName
    });
  };

  return (
    <div className="min-h-screen bg-[#0B070A] text-[#FAF7F2] font-sans relative selection:bg-[#E5C378]/30 selection:text-[#FAF7F2]">
      {/* Opening Envelope Surprise Sequence */}
      {!hasEnteredUniverse ? (
        <OpeningSurprise
          recipientName={data.recipientName}
          onEnterUniverse={() => setHasEnteredUniverse(true)}
        />
      ) : (
        <>
          {/* Subtle Ambient Background Canvas */}
          <RosePetalsCanvas density={16} intensity="gentle" />

          {/* Top Bar Navigation (Strict 3-Zone Contract) */}
          <TopNav
            recipientName={data.recipientName}
            isPlayingMusic={isPlayingMusic}
            isMuted={isMuted}
            onToggleMusic={handleToggleMusic}
            onToggleMute={handleToggleMute}
            onOpenPersonalize={() => setIsPersonalizeOpen(true)}
          />

          <main>
            {/* 1. Hero: Her Day, Her Universe */}
            <HeroSection
              recipientName={data.recipientName}
              supportingMessage={data.heroSupporting}
              onScrollToNext={handleScrollToLetter}
            />

            {/* 2. A Letter From My Heart */}
            <HeartLetterSection
              heading={data.heartLetter.heading}
              paragraphs={data.heartLetter.paragraphs}
            />

            {/* 3. Five Wishes for Her New Year */}
            <FiveWishesSection wishes={data.fiveWishes} />

            {/* 4. Open When You Need It */}
            <OpenWhenSection
              envelopes={data.openWhenEnvelopes}
              recipientName={data.recipientName}
            />

            {/* 5. Our Little Gallery */}
            <GallerySection
              items={data.gallery}
              onOpenPersonalize={() => setIsPersonalizeOpen(true)}
              onUpdateItemCaption={handleUpdateItemCaption}
            />

            {/* 6. A Wish Under the Stars */}
            <StarWishSection
              headline={data.starWish.headline}
              message={data.starWish.message}
              buttonText={data.starWish.buttonText}
              shootingStarWish={data.starWish.shootingStarWish}
            />

            {/* 7. The Final Surprise */}
            <FinalSurpriseSection
              recipientName={data.recipientName}
              senderName={data.senderName}
              onUpdateSenderName={handleUpdateSenderName}
              onReplaySurprise={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setHasEnteredUniverse(false);
              }}
            />
          </main>

          {/* Discreet Quiet Footer */}
          <footer className="py-12 border-t border-white/5 text-center text-xs text-[#FAF7F2]/40 font-serif">
            <p className="italic">
              Created with devotion for {data.recipientName} · Happy Birthday
            </p>
          </footer>

          {/* Personalization Modal */}
          <PersonalizeModal
            isOpen={isPersonalizeOpen}
            onClose={() => setIsPersonalizeOpen(false)}
            data={data}
            onSaveData={handleSaveData}
            onResetDefaults={handleResetDefaults}
          />
        </>
      )}
    </div>
  );
}
