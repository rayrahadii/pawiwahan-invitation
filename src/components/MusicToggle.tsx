import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { invitationData } from "../data/invitation";

interface MusicToggleProps {
  /** Try to auto-start playback once this becomes true (e.g. right after the guest opens the invitation). */
  autoStart: boolean;
}

export function MusicToggle({ autoStart }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!autoStart || !audioRef.current) return;
    // Browsers block autoplay with sound unless it follows a user gesture
    // (the "Buka Undangan" click satisfies that) — but we still guard the
    // promise in case a browser blocks it anyway.
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [autoStart]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <>
      {/* Letakkan file musik Anda di /public/audio/song.mp3 */}
      <audio ref={audioRef} src={invitationData.music.src} loop />
      <button
        type="button"
        className="music-toggle"
        data-playing={isPlaying}
        onClick={toggle}
        aria-label={isPlaying ? "Matikan musik" : "Putar musik"}
        title={invitationData.music.title}
      >
        {isPlaying ? <Music size={18} /> : <VolumeX size={18} />}
      </button>
    </>
  );
}
