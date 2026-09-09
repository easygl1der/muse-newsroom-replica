import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set(["about.fb.com"]);

export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get("src");
  const filename = request.nextUrl.searchParams.get("filename") || "download";

  if (!src) {
    return NextResponse.json({ error: "Missing src" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(src);
  } catch {
    return NextResponse.json({ error: "Invalid src" }, { status: 400 });
  }

  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    return NextResponse.json({ error: "Host not allowed" }, { status: 400 });
  }

  const upstream = await fetch(parsed.toString(), {
    headers: { "User-Agent": "Mozilla/5.0 MuseNewsroomReplica" },
  });

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: "Upstream failed" }, { status: 502 });
  }

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("content-type") || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
