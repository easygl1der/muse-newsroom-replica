import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Introducing Muse: The World’s First Personal AI Agent Built for Everyone",
  description:
    "Muse is a secure, private personal AI agent that proactively helps people meet their goals and suggests ideas.",
  openGraph: {
    title:
      "Introducing Muse: The World’s First Personal AI Agent Built for Everyone",
    description:
      "Muse is a secure, private personal AI agent that proactively helps people meet their goals and suggests ideas.",
    images: [
      "https://about.fb.com/wp-content/uploads/2026/09/Introducing-Muse_-Personal-AI-Agent_SocialShare.jpg?w=1200",
    ],
  },
  icons: {
    icon: "/icons/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-[#1C2B33]">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
