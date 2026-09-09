"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FOOTER_COLUMNS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="mt-6 border-t border-[#E4E6EB] bg-[#F7F8FA]">
      <div className="mx-auto hidden max-w-[1440px] grid-cols-2 gap-x-8 gap-y-10 px-6 py-14 md:grid lg:grid-cols-4 xl:grid-cols-7">
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 text-[15px] font-medium text-[#1C2B33]">
              {col.title}
            </h3>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="https://www.meta.com/"
                    className="text-[13px] leading-5 text-[#465A69] transition-colors hover:text-[#0064E0]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="md:hidden">
        {FOOTER_COLUMNS.map((col) => (
          <FooterAccordion key={col.title} title={col.title} links={col.links} />
        ))}
      </div>

      <div className="border-t border-[#E4E6EB] px-6 py-5 text-[12px] text-[#8A9BA8]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Meta. Recreation of the Meta Newsroom Muse announcement.</p>
          <p>Not affiliated with Meta Platforms, Inc.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterAccordion({
  title,
  links,
}: {
  title: string;
  links: readonly string[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E4E6EB]">
      <button
        type="button"
        className="flex w-full items-center justify-between px-6 py-4 text-left text-[15px] font-medium text-[#1C2B33]"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <ChevronDown
          className={cn(
            "size-4 text-[#465A69] transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <ul className="overflow-hidden px-6">
          {links.map((link) => (
            <li key={link} className="pb-2.5">
              <a href="https://www.meta.com/" className="text-[14px] text-[#465A69]">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
