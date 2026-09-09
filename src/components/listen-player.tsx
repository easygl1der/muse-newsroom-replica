"use client";

import { useEffect, useRef, useState } from "react";
import { MEDIA } from "@/lib/content";
import { WaveformIcon } from "@/components/meta-logo";
import { cn } from "@/lib/utils";

const SPEEDS = [0.25, 0.5, 1, 1.25, 1.5, 2] as const;

export function ListenPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setProgress(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnd = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    await audio.play();
    setPlaying(true);
  };

  const seekBy = (delta: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(
      Math.max(0, audio.currentTime + delta),
      duration || audio.duration || 0
    );
  };

  const changeSpeed = (value: number) => {
    setSpeed(value);
    if (audioRef.current) audioRef.current.playbackRate = value;
  };

  const ratio = duration > 0 ? progress / duration : 0;

  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          className="group inline-flex items-center gap-3 rounded-full py-1 pr-2 transition-colors hover:bg-[#F0F7FF]"
          aria-label={playing ? "Pause article audio" : "Listen to Article"}
        >
          <span
            className={cn(
              "inline-flex h-8 items-center",
              playing && "animate-waveform"
            )}
          >
            <WaveformIcon />
          </span>
          <span className="text-[14px] text-[#0064E0]">
            {playing ? "Pause" : "Listen to Article"}
          </span>
        </button>

        <div
          className={cn(
            "flex items-center gap-1 overflow-hidden transition-all duration-300",
            playing
              ? "max-w-[420px] opacity-100"
              : "pointer-events-none max-w-0 opacity-0"
          )}
        >
          <button
            type="button"
            onClick={() => seekBy(-10)}
            className="rounded-md px-2 py-1 text-[13px] text-[#0064E0] transition-colors hover:bg-[#F0F7FF]"
            aria-label="Rewind 10 seconds"
          >
            <span className="inline-flex items-center gap-0.5">
              <RewindIcon />
              10
            </span>
          </button>
          <button
            type="button"
            onClick={() => seekBy(10)}
            className="rounded-md px-2 py-1 text-[13px] text-[#0064E0] transition-colors hover:bg-[#F0F7FF]"
            aria-label="Skip ahead 10 seconds"
          >
            <span className="inline-flex items-center gap-0.5">
              10
              <SkipIcon />
            </span>
          </button>
          <label className="sr-only" htmlFor="listen-speed">
            Playback speed
          </label>
          <select
            id="listen-speed"
            value={speed}
            onChange={(e) => changeSpeed(Number(e.target.value))}
            className="h-8 rounded-md border-0 bg-transparent px-1 text-[13px] text-[#0064E0] outline-none"
          >
            {SPEEDS.map((s) => (
              <option key={s} value={s}>
                {s}×
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        className={cn(
          "mt-2 h-[3px] overflow-hidden rounded-full bg-[#E4E6EB] transition-opacity",
          playing ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          className="h-full bg-[#0064E0] transition-[width] duration-150"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>

      <audio ref={audioRef} preload="none" src={MEDIA.audio} />
    </div>
  );
}

function RewindIcon() {
  return (
    <svg width="22" height="14" viewBox="0 0 36 20" fill="none" aria-hidden>
      <path d="M18 4L10 10L18 16V4Z" fill="#0064E0" />
      <path d="M26 4L18 10L26 16V4Z" fill="#0064E0" />
    </svg>
  );
}

function SkipIcon() {
  return (
    <svg width="22" height="14" viewBox="0 0 36 20" fill="none" aria-hidden>
      <path d="M10 4L18 10L10 16V4Z" fill="#0064E0" />
      <path d="M18 4L26 10L18 16V4Z" fill="#0064E0" />
    </svg>
  );
}
