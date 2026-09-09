# Muse Newsroom Replica

A high-fidelity recreation of Meta’s [Introducing Muse](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/) Newsroom article: typography, takeaways, hero video player, listen-to-article controls, mixed-media carousel, autoplay loop, share actions, related stories, and footer.

Videos and article audio stream from the original public `about.fb.com` media URLs. This is an independent visual replica and is not affiliated with Meta.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:43147](http://localhost:43147) if you start the server with:

```bash
npm run dev -- --port 43147
```

## What is interactive

- Sticky header with mega menus, search, language picker, and mobile sheet
- Listen to Article: play/pause, ±10s, speed, progress
- Hero sizzle video: custom play overlay, seek, mute
- Carousel: autoplay, prev/next, pause, dots, per-slide download
- In-view autoplay shopping loop
- Share to Threads / Facebook / X / email, copy link
- Download all media via a same-origin proxy

## Stack

Next.js, TypeScript, Tailwind CSS, shadcn/ui.
