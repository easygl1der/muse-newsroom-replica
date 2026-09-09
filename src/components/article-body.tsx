"use client";

import { useEffect, useRef, useState } from "react";
import { MediaCarousel } from "@/components/media-carousel";
import {
  DownloadGlyph,
  EmailGlyph,
  FacebookGlyph,
  ThreadsGlyph,
  XGlyph,
} from "@/components/social-icons";
import {
  ARTICLE_URL,
  CATEGORIES,
  LINKS,
  MEDIA,
  SECURITY_POINTS,
} from "@/lib/content";
import { downloadMedia } from "@/lib/download";

export function ArticleBody() {
  return (
    <article className="article-prose">
      <p>
        Today, Meta is introducing Muse, a secure, private personal AI agent that
        proactively helps with people’s goals and suggests ideas. Because
        personal agents need a new kind of secure computer,{" "}
        <a href={LINKS.security}>Muse runs on Muse Secure VM</a>, a dedicated,
        virtual machine (VM) that houses both the agent and a person’s data. Muse
        is designed around the way people already communicate, so talking to it
        works just like messaging another person, in the Muse app or directly in
        WhatsApp.
      </p>
      <p>
        It’s simple to use. People just tell Muse what needs to get done, and it
        takes action, powered by <a href={LINKS.spark}>Muse Spark</a>, Meta’s
        most capable model to date, built for real-world agentic work like this.
      </p>

      <h2>How It Works</h2>
      <p>
        Unlike other agents,{" "}
        <a href={LINKS.designed}>Muse was built to work for billions</a> of
        people worldwide, so there’s no learning curve. Anyone can use it out of
        the box, no technical experience required. It can handle tasks, like
        sending an email or booking travel, and it can take on big audacious
        goals. Once a person shares a goal with Muse, it helps them develop a
        personalized plan and coordinate their time and resources, then advances
        the work on its own. It can open a browser, fill out forms, and
        negotiate on their behalf.
      </p>
      <p>
        For tasks that take more time, Muse keeps working after people close the
        app, and comes back when something changes or when it needs approval,
        like before it sends an email or makes a purchase. It gets better results
        with less effort: selling a car for more, lowering a bill, adjusting a
        training plan as the rest of someone’s life shifts.
      </p>
      <p>
        When it comes time to pay, Muse can checkout with Link built by Stripe,
        and it is the first AI agent covered by{" "}
        <a href={LINKS.linkProtections}>Link’s purchase protections</a>: free
        coverage for damaged or lost items, price drops, no-fee returns, and a
        return guarantee on eligible purchases. Link’s wallet for agents
        generates a one-time-use card so your real card details stay hidden,
        allowing you to purchase safely across the internet. Shop Pay is coming
        soon as another way to pay, along with 1Password support so Muse can use
        logins a person already has.
      </p>
      <p>
        Muse also remembers what matters to a person, so it can make suggestions
        unprompted and act on details that person only mentioned once. It can
        turn a recipe reel the person saved on Instagram into a grocery list,
        suggest a menu for their dinner party, and remember their friends’
        dietary restrictions before it sends the invites.
      </p>

      <MediaCarousel />

      <h2>Built to be Private, Safe, and Secure</h2>
      <p>
        Personal agents need a new kind of secure computer, so Meta built one
        for everyone. Muse Secure VM has first-of-its-kind privacy, safety, and
        security protections engineered into it that no other agent provides:
      </p>
      <ul>
        {SECURITY_POINTS.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <AutoplayLoopVideo src={MEDIA.shopping} label="Muse shopping" />

      <p>
        Later this year, Meta will introduce Muse Confidential VM, where the
        whole VM, including a person’s data and conversations with Muse, is
        encrypted with a key only they hold, so not even Meta can access it.
      </p>

      <h2>Looking Ahead</h2>
      <p>
        Meta thinks personal superintelligence will be one of the most
        transformative technologies of a lifetime. Muse is a first step: an
        agent that takes on more of the work so people can focus on what matters
        to them.
      </p>
      <p>
        Muse is rolling out in the US on iOS, Android, and{" "}
        <a href={LINKS.museAi}>muse.ai</a>, and coming soon to AI glasses. It’s
        free for most of what people need, with subscription plans for people
        who want to do more.
      </p>

      <hr className="my-10 border-[#E4E6EB]" />

      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div>
          <div className="mb-3 flex flex-wrap items-baseline gap-2 text-[14px]">
            <span className="text-[#8A9BA8]">Categories:</span>
            {CATEGORIES.map((cat, i) => (
              <span key={cat.label}>
                <a href={cat.href} className="article-link">
                  {cat.label}
                </a>
                {i < CATEGORIES.length - 1 ? "," : ""}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-baseline gap-2 text-[14px]">
            <span className="text-[#8A9BA8]">Tags:</span>
            <a
              href="https://about.fb.com/news/tag/ai/"
              className="article-link"
            >
              AI
            </a>
          </div>
        </div>
        <div className="md:justify-self-end">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-[#D0D5DD] px-4 py-2 text-[13px] font-medium tracking-[0.04em] text-[#1C2B33] uppercase transition-all hover:border-[#0064E0] hover:text-[#0064E0] active:scale-[0.98]"
            onClick={() => {
              downloadMedia(MEDIA.sizzle, "Introducing-Muse_Sizzle-Video.mp4");
              downloadMedia(MEDIA.fieldTrip, "Muse_FieldTrip.mp4");
              downloadMedia(MEDIA.japan, "Muse_Japan.mp4");
              downloadMedia(MEDIA.relationships, "Muse_Relationships.mp4");
              downloadMedia(MEDIA.shopping, "Muse_Shopping.mp4");
            }}
          >
            <DownloadGlyph />
            Download all images
          </button>
        </div>
      </div>

      <ShareBar />
    </article>
  );
}

function AutoplayLoopVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="my-8 overflow-hidden rounded-[24px] bg-[#0E1419]">
      <video
        ref={ref}
        className="aspect-[960/836] w-full object-cover"
        muted
        loop
        playsInline
        preload="auto"
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

function ShareBar() {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(ARTICLE_URL);
  const title = encodeURIComponent(
    "Introducing Muse: The World’s First Personal AI Agent Built for Everyone"
  );

  const popup = (url: string) => {
    window.open(url, "share", "width=626,height=436");
  };

  return (
    <div className="mt-8 flex flex-wrap items-center gap-5">
      <span className="text-[14px] text-[#465A69]">Share this article</span>
      <button
        type="button"
        className="share-icon"
        aria-label="Share on Threads"
        onClick={() =>
          popup(`https://www.threads.net/intent/post?text=${encoded}`)
        }
      >
        <ThreadsGlyph />
      </button>
      <button
        type="button"
        className="share-icon"
        aria-label="Share on Facebook"
        onClick={() =>
          popup(`https://www.facebook.com/sharer/sharer.php?u=${encoded}`)
        }
      >
        <FacebookGlyph />
      </button>
      <button
        type="button"
        className="share-icon"
        aria-label="Share on X"
        onClick={() =>
          popup(`https://twitter.com/share?text=${title}%20%23Meta&url=${encoded}`)
        }
      >
        <XGlyph />
      </button>
      <a
        className="share-icon"
        aria-label="Share by email"
        href={`mailto:?subject=Meta:%20Introducing%20Muse:%20The%20World%E2%80%99s%20First%20Personal%20AI%20Agent%20Built%20for%20Everyone&body=Muse%20is%20a%20secure,%20private%20personal%20AI%20agent%20that%20proactively%20helps%20people%20meet%20their%20goals%20and%20suggests%20ideas.%20Read%20at%20${encoded}`}
      >
        <EmailGlyph />
      </a>
      <button
        type="button"
        className="text-[13px] text-[#0064E0] hover:underline"
        onClick={async () => {
          await navigator.clipboard.writeText(ARTICLE_URL);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        }}
      >
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
