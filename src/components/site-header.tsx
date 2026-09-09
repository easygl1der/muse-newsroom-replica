"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Menu, Search, X } from "lucide-react";
import { MetaWordmark } from "@/components/meta-logo";
import { LANGUAGES, LINKS, NAV } from "@/lib/content";
import { cn } from "@/lib/utils";

const iconBtn =
  "grid size-10 place-items-center rounded-lg text-[#1C2B33] transition-colors hover:bg-[#F0F2F5] active:scale-95";

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!langRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white",
        scrolled && "shadow-[0_1px_0_rgba(28,43,51,0.08)]"
      )}
    >
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center gap-4 px-4 md:px-8">
        <a
          href={LINKS.aboutMeta}
          className="text-[#1C2B33] transition-opacity hover:opacity-70"
          aria-label="Meta"
        >
          <MetaWordmark className="h-[18px] w-[90px]" />
        </a>

        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                type="button"
                className={cn(
                  "inline-flex items-center px-3 py-2 text-[15px] text-[#1C2B33] transition-colors hover:text-[#0064E0]",
                  openMenu === item.label && "text-[#0064E0]"
                )}
                aria-expanded={openMenu === item.label}
                onClick={() =>
                  setOpenMenu((current) => (current === item.label ? null : item.label))
                }
              >
                {item.label}
              </button>
              <div
                className={cn(
                  "absolute left-0 top-full z-40 min-w-[240px] origin-top pt-2 transition-all duration-200",
                  openMenu === item.label
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-1 opacity-0"
                )}
              >
                <div className="rounded-xl border border-[#E4E6EB] bg-white p-2 shadow-[0_12px_40px_rgba(28,43,51,0.12)]">
                  {item.items.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.href}
                      className="block rounded-lg px-3 py-2.5 text-[14px] text-[#1C2B33] transition-colors hover:bg-[#F0F2F5] hover:text-[#0064E0]"
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            className={iconBtn}
            aria-label={searchOpen ? "Close search" : "Search"}
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((v) => !v);
              setLangOpen(false);
            }}
          >
            {searchOpen ? <X className="size-5" /> : <Search className="size-5" />}
          </button>

          <div className="relative" ref={langRef}>
            <button
              type="button"
              className={iconBtn}
              aria-label="Choose language"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((v) => !v)}
            >
              <Globe className="size-5" />
            </button>
            {langOpen ? (
              <div className="absolute right-0 top-full z-50 mt-1 min-w-48 rounded-xl border border-[#E4E6EB] bg-white p-1 shadow-[0_12px_40px_rgba(28,43,51,0.12)]">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    className="block w-full rounded-lg px-3 py-2 text-left text-[14px] text-[#1C2B33] hover:bg-[#F0F2F5]"
                    onClick={() => setLangOpen(false)}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            className={cn(iconBtn, "lg:hidden")}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-[#E4E6EB] bg-white transition-[max-height,opacity] duration-300",
          searchOpen ? "max-h-28 opacity-100" : "max-h-0 border-t-0 opacity-0"
        )}
      >
        <form
          className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-4 md:px-8"
          onSubmit={(e) => {
            e.preventDefault();
            const q = query.trim();
            if (q) {
              window.open(
                `https://about.fb.com/news/?s=${encodeURIComponent(q)}`,
                "_blank"
              );
            }
          }}
        >
          <Search className="size-5 shrink-0 text-[#0064E0]" />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Meta Newsroom"
            className="h-11 w-full border-0 bg-transparent text-[16px] text-[#1C2B33] outline-none placeholder:text-[#8A9BA8]"
          />
          <button
            type="submit"
            className="h-10 rounded-full bg-[#0064E0] px-5 text-[14px] text-white transition-colors hover:bg-[#0054bd] active:scale-[0.98]"
          >
            Search
          </button>
        </form>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 right-0 flex w-[min(100%,380px)] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E4E6EB] px-5 py-4">
              <p className="font-display text-[18px] text-[#1C2B33]">Menu</p>
              <button
                type="button"
                className={iconBtn}
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="overflow-y-auto px-3 py-3">
              {NAV.map((item) => (
                <div key={item.label} className="mb-4">
                  <a
                    href={item.href}
                    className="block px-2 py-2 text-[17px] font-medium text-[#1C2B33]"
                  >
                    {item.label}
                  </a>
                  <div className="ml-2 border-l border-[#E4E6EB] pl-3">
                    {item.items.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        className="block rounded-md px-2 py-2 text-[15px] text-[#465A69] hover:text-[#0064E0]"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
