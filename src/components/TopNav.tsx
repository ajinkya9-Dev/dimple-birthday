import React from 'react';
import { Volume2, VolumeX, Music, Settings2 } from 'lucide-react';

interface TopNavProps {
  recipientName: string;
  isPlayingMusic: boolean;
  isMuted: boolean;
  onToggleMusic: () => void;
  onToggleMute: () => void;
  onOpenPersonalize: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  recipientName,
  isPlayingMusic,
  isMuted,
  onToggleMusic,
  onToggleMute,
  onOpenPersonalize
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0B070A]/80 border-b border-[#E5C378]/15 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#hero"
          className="font-serif text-lg sm:text-xl font-medium tracking-wide text-[#FAF7F2] hover:text-[#E5C378] transition-colors whitespace-nowrap shrink-0"
        >
          For {recipientName}
        </a>

        {/* Zone 2: 4-5 clean single-line text links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.18em] font-medium text-[#FAF7F2]/70">
          <a href="#letter" className="hover:text-[#E5C378] transition-colors whitespace-nowrap shrink-0">
            The Letter
          </a>
          <a href="#wishes" className="hover:text-[#E5C378] transition-colors whitespace-nowrap shrink-0">
            Five Wishes
          </a>
          <a href="#open-when" className="hover:text-[#E5C378] transition-colors whitespace-nowrap shrink-0">
            Open When
          </a>
          <a href="#gallery" className="hover:text-[#E5C378] transition-colors whitespace-nowrap shrink-0">
            Our Gallery
          </a>
          <a href="#stars" className="hover:text-[#E5C378] transition-colors whitespace-nowrap shrink-0">
            Star Wish
          </a>
        </nav>

        {/* Zone 3: Primary Action & Audio Control */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Ambient Music Button */}
          <button
            type="button"
            onClick={onToggleMusic}
            title={isPlayingMusic ? "Pause Serenade" : "Play Ambient Serenade"}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              isPlayingMusic
                ? "bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#E5C378] shadow-[0_0_12px_rgba(212,175,55,0.25)]"
                : "bg-white/5 border-white/10 text-[#FAF7F2]/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isPlayingMusic ? "animate-pulse text-[#E5C378]" : ""}`} />
            <span className="hidden sm:inline whitespace-nowrap">
              {isPlayingMusic ? "Serenade Playing" : "Play Serenade"}
            </span>
          </button>

          {/* Mute toggle if music active */}
          {isPlayingMusic && (
            <button
              type="button"
              onClick={onToggleMute}
              title={isMuted ? "Unmute" : "Mute"}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Personalize Button */}
          <button
            type="button"
            onClick={onOpenPersonalize}
            title="Personalize Details (Names, Photos)"
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#E5C378]/25 text-[#E5C378] transition-colors cursor-pointer"
          >
            <Settings2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
