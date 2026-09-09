"use client";

import { useEffect, useState } from "react";
import { Globe, Menu, Search, X } from "lucide-react";
import { MetaWordmark } from "@/components/meta-logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LANGUAGES, LINKS, NAV } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setHidden(y > lastY && y > 80 && !searchOpen && !openMenu);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY, openMenu, searchOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white transition-transform duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
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
              <a
                href={item.href}
                className={cn(
                  "inline-flex items-center px-3 py-2 text-[15px] text-[#1C2B33] transition-colors hover:text-[#0064E0]",
                  openMenu === item.label && "text-[#0064E0]"
                )}
                aria-expanded={openMenu === item.label}
              >
                {item.label}
              </a>
              <div
                className={cn(
                  "absolute left-0 top-full z-40 min-w-[240px] origin-top rounded-xl border border-[#E4E6EB] bg-white p-2 shadow-[0_12px_40px_rgba(28,43,51,0.12)] transition-all duration-200",
                  openMenu === item.label
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-1 opacity-0"
                )}
              >
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
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label={searchOpen ? "Close search" : "Search"}
            onClick={() => setSearchOpen((v) => !v)}
            className="size-10 text-[#1C2B33] hover:bg-[#F0F2F5]"
          >
            {searchOpen ? <X className="size-5" /> : <Search className="size-5" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Choose language"
                  className="size-10 text-[#1C2B33] hover:bg-[#F0F2F5]"
                />
              }
            >
              <Globe className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-48">
              {LANGUAGES.map((lang) => (
                <DropdownMenuItem key={lang.code} className="cursor-pointer">
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className="size-10 text-[#1C2B33] hover:bg-[#F0F2F5] lg:hidden"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,380px)] p-0">
              <SheetHeader className="border-b border-[#E4E6EB] px-5 py-4">
                <SheetTitle className="font-display text-left text-[#1C2B33]">
                  Menu
                </SheetTitle>
              </SheetHeader>
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
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-[#E4E6EB] bg-white transition-[max-height,opacity] duration-300",
          searchOpen ? "max-h-28 opacity-100" : "max-h-0 opacity-0"
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
            autoFocus={searchOpen}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Meta Newsroom"
            className="h-11 w-full border-0 bg-transparent text-[16px] text-[#1C2B33] outline-none placeholder:text-[#8A9BA8]"
          />
          <Button
            type="submit"
            className="h-10 rounded-full bg-[#0064E0] px-5 text-white hover:bg-[#0054bd]"
          >
            Search
          </Button>
        </form>
      </div>
    </header>
  );
}
