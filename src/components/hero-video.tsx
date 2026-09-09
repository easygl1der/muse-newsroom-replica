"use client";

import { useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { MEDIA } from "@/lib/content";
import { cn } from "@/lib/utils";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hover, setHover] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      video.pause();
      return;
    }
    setPlaying(true);
    void video.play().catch(() => {
      video.muted = true;
      setMuted(true);
      void video.play().catch(() => setPlaying(false));
    });
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const onSeek = (value: number) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    video.currentTime = value * duration;
  };

  const showChrome = hover || !playing;

  return (
    <div
      className="featured-video relative overflow-hidden rounded-[24px] bg-black"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <video
        ref={videoRef}
        className="aspect-video w-full rounded-[24px] object-cover"
        preload="metadata"
        playsInline
        poster={MEDIA.poster}
        onClick={togglePlay}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      >
        <source src={MEDIA.sizzle} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={togglePlay}
        className={cn(
          "absolute inset-0 grid place-items-center transition-opacity duration-300",
          playing ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        aria-label="Play hero video"
      >
        <span className="grid size-[72px] place-items-center rounded-full bg-white/95 text-[#1C2B33] shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95">
          <Play className="ml-1 size-8 fill-current" />
        </span>
      </button>

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 transition-opacity duration-300",
          showChrome ? "opacity-100" : "opacity-0"
        )}
      >
        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={duration ? progress / duration : 0}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="hero-range mb-2 w-full"
          aria-label="Seek video"
        />
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="grid size-9 place-items-center rounded-full transition-colors hover:bg-white/15 active:scale-95"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <Pause className="size-4 fill-current" />
              ) : (
                <Play className="size-4 fill-current" />
              )}
            </button>
            <span className="text-[12px] tabular-nums text-white/90">
              {formatTime(progress)} / {formatTime(duration)}
            </span>
          </div>
          <button
            type="button"
            onClick={toggleMute}
            className="grid size-9 place-items-center rounded-full transition-colors hover:bg-white/15 active:scale-95"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
