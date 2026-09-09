import { ArticleBody } from "@/components/article-body";
import { HeroVideo } from "@/components/hero-video";
import { ListenPlayer } from "@/components/listen-player";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  FacebookGlyph,
  InstagramGlyph,
  ThreadsGlyph,
  XGlyph,
} from "@/components/social-icons";
import { LINKS, RELATED, TAKEAWAYS } from "@/lib/content";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <SiteHeader />

      <main id="main" className="flex-1">
        <div className="mx-auto max-w-[1180px] px-5 pt-6 md:px-10 md:pt-8">
          <a href={LINKS.newsroom} className="back-link">
            <svg width="22" height="16" viewBox="0 0 39 39" fill="none" aria-hidden>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.7309 13.9068C29.2311 14.3444 29.2818 15.1046 28.8441 15.6048L20.4207 25.2316C20.1921 25.4928 19.8621 25.6426 19.515 25.6426C19.168 25.6426 18.8379 25.4928 18.6094 25.2316L10.1859 15.6048C9.7482 15.1046 9.79899 14.3444 10.2991 13.9068C10.7992 13.4691 11.5595 13.5198 11.9972 14.02L19.515 22.6118L27.0329 14.02C27.4705 13.5198 28.2308 13.4691 28.7309 13.9068Z"
                fill="#1C2B33"
              />
            </svg>
            Back to Newsroom
          </a>

          <div className="mt-6 max-w-[820px]">
            <div className="news-label">
              <a href="https://about.fb.com/news/category/technologies/meta/">
                Meta
              </a>
            </div>
            <h1 className="font-display mt-3 text-[34px] leading-[42px] font-medium tracking-[0.01em] text-[#1C2B33] md:text-[40px] md:leading-[50px]">
              Introducing Muse: The World’s First Personal AI Agent Built for
              Everyone
            </h1>
            <p className="mt-3 text-[15px] text-[#8A9BA8]">
              <time dateTime="2026-09-08T12:00:51-07:00">September 8, 2026</time>
            </p>
            <ListenPlayer />
          </div>

          <div className="mt-8 max-w-[860px]">
            <HeroVideo />
          </div>

          <section className="mt-10 max-w-[820px]">
            <h2 className="highlights-title">Takeaways</h2>
            <ul className="mt-5 list-disc space-y-3 pl-6 text-[17px] leading-[1.65] text-[#1C2B33]">
              {TAKEAWAYS.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li>
                For a deeper look at how Muse was designed and how safety,
                security, and privacy were built into it, read{" "}
                <a href={LINKS.security} className="article-link">
                  How We Built Safety Into Muse
                </a>{" "}
                and{" "}
                <a href={LINKS.designed} className="article-link">
                  How We Designed Muse
                </a>
                .
              </li>
            </ul>
          </section>

          <div className="mt-10 max-w-[820px]">
            <ArticleBody />
          </div>
        </div>

        <section className="mx-auto mt-16 max-w-[1180px] px-5 md:px-10">
          <div className="grid gap-10 md:grid-cols-2">
            {RELATED.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="news-card group grid grid-cols-[2fr_3fr] gap-5"
              >
                <div className="overflow-hidden rounded-xl bg-[#F0F2F5]">
                  <div
                    className="aspect-[4/3] bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                </div>
                <div>
                  <div className="news-label">
                    <span>Meta</span>
                  </div>
                  <h3 className="mt-2 text-[18px] leading-7 text-[#1C2B33] transition-colors group-hover:text-[#0064E0]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] text-[#8A9BA8]">{item.date}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-[1180px] px-5 pb-6 md:px-10">
          <div className="flex flex-col gap-8 border-t border-[#E4E6EB] py-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-5">
              <h2 className="text-[16px] text-[#1C2B33]">Follow Meta Newsroom</h2>
              <a href="https://www.threads.net/@MetaNewsroom" className="share-icon" aria-label="Threads">
                <ThreadsGlyph />
              </a>
              <a href="https://www.instagram.com/MetaNewsroom/" className="share-icon" aria-label="Instagram">
                <InstagramGlyph />
              </a>
              <a href="https://www.facebook.com/MetaNewsroom" className="share-icon" aria-label="Facebook">
                <FacebookGlyph />
              </a>
              <a href="https://x.com/MetaNewsroom" className="share-icon" aria-label="X">
                <XGlyph />
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <h2 className="text-[16px] text-[#1C2B33]">Press Resources</h2>
              <a href="mailto:press@meta.com" className="article-link text-[15px]">
                press@meta.com
              </a>
              <a
                href="https://about.facebook.com/media-gallery/"
                className="article-link text-[15px]"
              >
                Media Gallery
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
