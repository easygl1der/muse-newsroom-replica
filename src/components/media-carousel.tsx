"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { DownloadGlyph } from "@/components/social-icons";
import { CAROUSEL_SLIDES } from "@/lib/content";
import { downloadMedia } from "@/lib/download";
import { cn } from "@/lib/utils";

export function MediaCarousel() {
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(true);
  const [tip, setTip] = useState<string | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const goTo = useCallback(
    (next: number) => {
      const wrapped = (next + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length;
      setIndex(wrapped);
    },
    []
  );

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index && running) {
        video.currentTime = 0;
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [index, running]);

  const onEnded = () => {
    if (running) goTo(index + 1);
  };

  return (
    <section
      className="fbcorp-mixed-media-carousel my-10"
      aria-roledescription="carousel"
      aria-label="Muse in action"
    >
      <div className="relative overflow-hidden rounded-[24px] bg-[#0E1419]">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {CAROUSEL_SLIDES.map((slide, i) => (
            <figure
              key={slide.id}
              className="relative m-0 min-w-full"
              aria-hidden={i !== index}
            >
              <div className="relative aspect-[960/836] w-full">
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  className="h-full w-full object-cover"
                  muted
                  playsInline
                  preload="auto"
                  onEnded={i === index ? onEnded : undefined}
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
                <button
                  type="button"
                  className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-black/45 backdrop-blur-sm transition-transform hover:scale-105 hover:bg-black/60 active:scale-95"
                  aria-label={`Download ${slide.label} video`}
                  title="Download video"
                  onClick={() => {
                    downloadMedia(slide.src, `Muse_${slide.label.replace(/\s+/g, "")}.mp4`);
                    setTip("Download started");
                    window.setTimeout(() => setTip(null), 1800);
                  }}
                >
                  <DownloadGlyph className="text-white" />
                </button>
              </div>
            </figure>
          ))}
        </div>

        <button
          type="button"
          className="carousel-arrow left-3"
          aria-label="Previous slide"
          onClick={() => goTo(index - 1)}
        />
        <button
          type="button"
          className="carousel-arrow right-3 rotate-180"
          aria-label="Next slide"
          onClick={() => goTo(index + 1)}
        />

        <button
          type="button"
          className="absolute bottom-4 left-4 inline-flex h-10 items-center gap-2 rounded-full bg-black/45 px-3 text-white backdrop-blur-sm transition-transform hover:scale-[1.03] hover:bg-black/60 active:scale-95"
          aria-label={running ? "Pause carousel" : "Play carousel"}
          onClick={() => setRunning((v) => !v)}
        >
          {running ? <Pause className="size-3.5 fill-current" /> : <Play className="size-3.5 fill-current" />}
          <span className="text-[12px]">{running ? "Pause" : "Play"}</span>
        </button>

        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {CAROUSEL_SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to ${slide.label}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70"
              )}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>

      {tip ? (
        <p className="mt-3 text-[13px] text-[#0064E0]" role="status">
          {tip}
        </p>
      ) : null}
    </section>
  );
}
