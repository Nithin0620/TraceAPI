import { NextResponse } from "next/server";

export function GET() {
  const mem = process.memoryUsage();

  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptimeSec: Math.round(process.uptime()),
      runtime: {
        node: process.version,
        platform: process.platform,
        arch: process.arch,
      },
      memory: {
        rss: mem.rss,
        heapUsed: mem.heapUsed,
        heapTotal: mem.heapTotal,
      },
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

